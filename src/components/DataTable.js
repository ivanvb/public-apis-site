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
} from '@mui/material';
import { useTheme } from '@mui/system';
import DataTableToolbar from './DataTableToolbar';
import { useQueryState, queryTypes } from 'next-usequerystate';

const DataTable = ({ headings, rows = [] }) => {
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

    const currentRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer component={Paper} sx={{ mb: 12 }}>
                <DataTableToolbar title="Public APIs" />
                <Table>
                    <TableHead sx={{ background: theme.palette.background.darker }}>
                        <TableRow>
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
                            return (
                                <TableRow key={i}>
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
            </TableContainer>
        </>
    );
};

export default DataTable;
