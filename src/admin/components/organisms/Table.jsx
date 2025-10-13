import { useState } from 'react';

import {
    Paper,
    styled,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { TablePaginationActions } from '../molecules';

const CustomTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& .MuiTableCell-root": {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        padding: "8px",
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
        border: 'none'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.white[100],
    },
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ({
    columns = [],
    data = [],
    ...props
}) {

    // ✅ 1. Estados para paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // ✅ 2. Manejadores
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // ✅ 3. Cortar filas para paginación
    const paginatedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer
                component={Paper}
                style={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    boxShadow: 'none',
                    overflowX: "auto",
                }}
                {...props}
            >
                <Table aria-label="customized table">
                    <CustomTableHead>
                        <TableRow>
                            {columns.map(col => (
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
                        {paginatedRows.map((row, rowIndex) => (
                            <StyledTableRow key={rowIndex}>
                                {columns.map(({ id, align, render }) => (
                                    <StyledTableCell
                                        key={id}
                                        align={align || 'center'}
                                    >
                                        {render
                                            ? render(row[id], row)
                                            : <Typography variant="tableCell">{row[id]}</Typography>}
                                    </StyledTableCell>
                                ))}

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
                    }
                }}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from} - ${to} de ${count}`  // aquí cambias el texto
                }
            />
        </>
    );
}
