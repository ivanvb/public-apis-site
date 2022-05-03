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
} from '@mui/material';
import { useTheme } from '@mui/system';

const DataTable = ({ headings, rows = [] }) => {
    const theme = useTheme();
    return (
        <TableContainer component={Paper} sx={{ mb: 12 }}>
            <Table
                sx={{
                    '& tbody tr:last-child td': {
                        border: '0px',
                    },
                }}
            >
                <TableHead
                    sx={{ position: 'sticky', top: 0, background: theme.palette.background.darker }}
                >
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
                    {rows.map((row, i) => {
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
        </TableContainer>
    );
};

export default DataTable;
