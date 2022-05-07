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

const DataTable = ({ headings, rows = [] }) => {
    const rowsPerPageOptions = [...new Set([10, 25, 50, rows.length])];
    const theme = useTheme();
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [page, setPage] = React.useState(0);

    function handlePageChange(event, newPage) {
        setPage(newPage);
    }

    function handleRowsPerPageChange(event) {
        setRowsPerPage(Number.parseInt(event.target.value));
        setPage(0);
    }

    const currentRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper} sx={{ mb: 12 }}>
            <DataTableToolbar title="Public APIs" />
            <Table
                sx={{
                    '& tbody tr:last-child td': {
                        border: '0px',
                    },
                }}
            >
                <TableHead sx={{ background: theme.palette.background.darker }}>
                    <TableRow>
                        {headings.map((heading, i) => {
                            return (
                                <TableCell sx={{ border: 'none' }} key={i}>
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
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.auth}</TableCell>
                                <TableCell>{row.https}</TableCell>
                                <TableCell>{row.cors}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </TableContainer>
    );
};

export default DataTable;
