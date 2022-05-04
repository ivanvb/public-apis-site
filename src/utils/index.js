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
