import React, { useEffect } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Link,
    TablePagination,
} from '@mui/material';
import { useTheme } from '@mui/system';
import DataTableToolbar from './DataTableToolbar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQueryState, queryTypes } from 'next-usequerystate';

const DataTableRow = React.memo(({ rowData, isRowLiked, onRemoveLike, onLike }) => {
    const LikedStatusIcon = isRowLiked ? FavoriteIcon : FavoriteBorderIcon;
    return (
        <TableRow>
            <TableCell>
                <IconButton
                    aria-label={
                        isRowLiked
                            ? `Remove "${rowData.title}" from favorites`
                            : `Add "${rowData.title}" to favorites`
                    }
                    onClick={() => (isRowLiked ? onRemoveLike(rowData.id) : onLike(rowData.id))}
                >
                    <LikedStatusIcon color="primary" />
                </IconButton>
            </TableCell>
            <TableCell>
                <Link href={rowData.url}>{rowData.title}</Link>
            </TableCell>
            <TableCell>{rowData.description}</TableCell>
            <TableCell align="right">{rowData.category}</TableCell>
            <TableCell align="right">{rowData.auth}</TableCell>
            <TableCell align="right">{rowData.https}</TableCell>
            <TableCell align="right">{rowData.cors}</TableCell>
        </TableRow>
    );
});

const DataTable = React.memo(({ headings, search, liked, onLike, onRemoveLike, rows = [] }) => {
    const rowsPerPageOptions = [10, 25, 50, { value: rows.length, label: 'All' }];
    const theme = useTheme();
    const [rowsPerPage, setRowsPerPage] = useQueryState(
        'rowsPerPage',
        queryTypes.integer.withDefault(rowsPerPageOptions[0])
    );
    const [page, setPage] = useQueryState('page', queryTypes.integer.withDefault(1));
    // The first page in the query string is 1, but internally the first page is
    const computedPage = page - 1;

    function handlePageChange(event, newPage) {
        setPage(newPage + 1);
    }

    async function handleRowsPerPageChange(event) {
        await setRowsPerPage(Number.parseInt(event.target.value));
        await setPage(1);
    }

    const currentRows = rows.slice(
        computedPage * rowsPerPage,
        computedPage * rowsPerPage + rowsPerPage
    );

    const extraRows = [...new Array(rowsPerPage - currentRows.length)];

    useEffect(() => {
        setPage(1);
    }, [search]);

    return (
        <Paper sx={{ mb: 12 }}>
            <DataTableToolbar title="Public APIs" />
            <TableContainer>
                <Table>
                    <TableHead sx={{ background: theme.palette.background.darker }}>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}></TableCell>
                            {headings.map((heading, i) => {
                                return (
                                    <TableCell
                                        align={i > 1 ? 'right' : 'left'}
                                        sx={{ border: 'none' }}
                                        key={i}
                                    >
                                        {heading}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, i) => {
                            const isRowLiked = liked[row.id];

                            return (
                                <DataTableRow
                                    key={i}
                                    rowData={row}
                                    isRowLiked={isRowLiked}
                                    onRemoveLike={onRemoveLike}
                                    onLike={onLike}
                                />
                            );
                        })}
                        {extraRows.map((_, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell
                                        sx={{ border: 'none', opacity: 0, pointerEvents: 'none' }}
                                    >
                                        <FavoriteBorderIcon sx={{ height: '36px' }} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    '& .MuiTablePagination-toolbar': {
                        flexWrap: {
                            xs: 'wrap',
                            sm: 'nowrap',
                        },
                    },
                    '& [class*="MuiInputBase-root-MuiTablePagination-select"]': {
                        marginRight: {
                            xs: '50%',
                            sm: '24px',
                        },
                    },
                    '& .MuiTablePagination-displayedRows': {
                        marginTop: {
                            xs: '5px',
                            sm: '14px',
                        },
                    },
                    '& .MuiTablePagination-actions': {
                        marginTop: {
                            xs: '-10px',
                            sm: 'initial',
                        },
                    },
                }}
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={rows.length === 0 ? 0 : computedPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
});

export default DataTable;
