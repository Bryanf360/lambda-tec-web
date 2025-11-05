import { useState } from 'react';

import {
    Paper,
    styled,
    Table as MuiTable,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
    CircularProgress,
    Box,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { TablePaginationActions } from '../molecules';

const CustomTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-root': {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '8px',
    },
    borderRadius: 20,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 'none',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.white[100],
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Table({
    isLoading = true,
    page = 0,
    limit = 5,
    total = 10,
    columns = [],
    data = [],
    onPageChange,
    onRowsPerPageChange,
    ...props
}) {
    return (
        <>
            <TableContainer
                component={Paper}
                style={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    boxShadow: 'none',
                    overflowX: 'auto',
                }}
                {...props}
            >
                <MuiTable aria-label="customized table">
                    <CustomTableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ minWidth: 75 }}>
                                <Typography variant="tableHead">Nro</Typography>
                            </StyledTableCell>

                            {columns.map((col) => (
                                <StyledTableCell
                                    align="center"
                                    sx={{ minWidth: col.minWidth || 100 }}
                                    key={col.id}
                                >
                                    <Typography variant="tableHead">{col.label}</Typography>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </CustomTableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Box sx={{ py: 4 }}>
                                        <CircularProgress size={28} />
                                        <Box sx={{ mt: 1, fontSize: 14, color: 'text.secondary' }}>
                                            Cargando datos...
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <StyledTableRow key={rowIndex}>
                                    <StyledTableCell align={'center'}>
                                        <Typography variant="tableCell">
                                            {page * limit + rowIndex + 1}
                                        </Typography>
                                    </StyledTableCell>
                                    {columns.map(({ id, align, render, field }) => (
                                        <StyledTableCell key={id} align={align || 'center'}>
                                            {render ? (
                                                render(row[id], row)
                                            ) : (
                                                <Typography variant="tableCell">
                                                    {row[id]}
                                                </Typography>
                                            )}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No se encontraron resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={limit}
                onRowsPerPageChange={onRowsPerPageChange}
                labelRowsPerPage="Filas por página"
                rowsPerPageOptions={[5, 10, 25]}
                ActionsComponent={TablePaginationActions} // <- nuestro componente custom
                sx={{
                    '& .MuiTablePagination-toolbar': {
                        justifyContent: 'center', // centrar los botones
                    },
                    '& .MuiTablePagination-input': {
                        mr: 1,
                    },
                    '& .MuiTablePagination-displayedRows': {
                        mr: 2,
                    },
                    '& .MuiTablePagination-selectLabel': {
                        paddingLeft: 17.5,
                    },
                    '.MuiTablePagination-toolbar': {
                        display: 'flex',
                        justifyContent: 'flex-end', // ✅ reparte uniformemente
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        pb: 1,
                    },
                }}
                labelDisplayedRows={
                    ({ from, to, count }) => `${from} - ${to} de ${count}` // aquí cambias el texto
                }
            />
        </>
    );
}
