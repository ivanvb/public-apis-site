import React from 'react';
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
    Container,
} from '@mui/material';
import { useTheme } from '@mui/system';
import DataTableToolbar from './DataTableToolbar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useQueryState, queryTypes } from 'next-usequerystate';

const DataTable = ({ headings, liked, onLike, onRemoveLike, rows = [] }) => {
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
                                <TableRow key={i} sx={{ cursor: 'pointer' }}>
                                    <TableCell>
                                        <IconButton
                                            aria-label={
                                                isRowLiked
                                                    ? `Remove "${row.title}" from favorites`
                                                    : `Add "${row.title}" to favorites`
                                            }
                                            onClick={() =>
                                                isRowLiked ? onRemoveLike(row.id) : onLike(row.id)
                                            }
                                        >
                                            {isRowLiked ? (
                                                <FavoriteIcon color="primary" />
                                            ) : (
                                                <FavoriteBorderIcon color="primary" />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={row.url}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">{row.category}</TableCell>
                                    <TableCell align="right">{row.auth}</TableCell>
                                    <TableCell align="right">{row.https}</TableCell>
                                    <TableCell align="right">{row.cors}</TableCell>
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
                page={computedPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
};

export default DataTable;
