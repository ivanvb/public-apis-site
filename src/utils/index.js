export function csvApiDataToJson(csv) {
    const categoriesValues = new Set();
    const authValues = new Set();
    const httpsValues = ['Yes', 'No'];
    const corsValues = ['Yes', 'No'];

    let currentCategory = '';
    const mappedData = csv.map((resource) => {
        const [category, title, url, description, auth, https, cors] = resource;
        if (category.length > 0) {
            currentCategory = category;
            categoriesValues.add(currentCategory);
        }
        authValues.add(auth);

        return {
            category: currentCategory,
            title,
            url,
            description,
            auth,
            https,
            cors,
            id: title.toLowerCase().replace(/ /g, '-'),
        };
    });

    return {
        mappedData,
        categoriesValues,
        authValues,
        httpsValues,
        corsValues,
    };
}

export function itemPassesPropertyFilter(value, filterCategory) {
    // if no filter is selected for this category then the item is valid
    if (Object.values(filterCategory).includes(true) === false) return true;

    return Object.entries(filterCategory).reduce((acc, curr) => {
        if (acc) return true;

        const [key, val] = curr;
        return val && key === value;
    }, false);
}

export function itemPassesSearchFilter(item, searchValue) {
    if (searchValue.length === 0) return true;

    return (
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
}

export function itemPassesLikedFilter(item, likedItems){
    return Boolean(likedItems[item.id])
}

export function parseQueryString(queryString) {
    const filterRegex = /(?<category>.*?)\[(?<values>.*?)\]/g;
    const result = {
        Categories: {},
        Auth: {},
        Https: {},
        Cors: {},
    };
    for (const match of queryString.matchAll(filterRegex)) {
        const { category, values } = match.groups;
        result[category] = values.split(',').reduce((acc, curr) => {
            return { ...acc, [curr]: true };
        }, {});
    }

    return result;
}

export function filtersToQueryString(filters) {
    const serializeFilters = Object.entries(filters).reduce((acc, curr) => {
        const [filterName, selectedValues] = curr;
        const selectedKeys = Object.keys(selectedValues);
        if (selectedKeys.length === 0) return acc;

        const activeKeys = selectedKeys.filter((key) => selectedValues[key]);
        if (activeKeys.length === 0) return acc;

        return `${acc}${filterName}[${activeKeys.join(',')}]`;
    }, '');

    return serializeFilters;
}
