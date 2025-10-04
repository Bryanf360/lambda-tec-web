import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, IconButton, TablePagination, Typography } from '@mui/material';
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Chip } from '../../../auth/components';
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

function createData(name, description, type, brand, model, partNumber, unitType, stock, status) {
  return { name, description, type, brand, model, partNumber, unitType, stock, status };
}

const rows = [
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internet', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'active'),
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internet', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'active'),
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internet', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'inactive'),
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internet', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'inactive'),
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internet', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'active'),
  createData('Cable Utp RJ45 Internet', 'Cable para instalación de internetasdfasdfasdfasdf', 'Consumible', 'Tecratronik', 'Interior Blanco', 'PA-121-AZ', 'm-Metros', 30, 'active'),
  createData('Cable adicional', 'Otra descripción', 'Pieza', 'XYZ', 'Modelo A', 'PART-999', 'unidad', 10, 'inactive'),
  createData('Switch', 'Red gigabit', 'Equipo', 'TP-Link', 'TL-SG1005D', 'SW-001', 'unidad', 5, 'active'),
  createData('Router', 'Con wifi 5G', 'Equipo', 'MikroTik', 'RB3011', 'RT-123', 'unidad', 2, 'active'),
];

export default function CustomizedTables() {
  const theme = useTheme();

  // ✅ 1. Estados para paginación
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // ✅ 2. Manejadores
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ✅ 3. Cortar filas para paginación
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        >
          <Table aria-label="customized table">
            <CustomTableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                  <Typography variant="tableHead">Nombre</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                  <Typography variant="tableHead">Descripción</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 50 }}>
                  <Typography variant="tableHead">Tipo</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 50 }}>
                  <Typography variant="tableHead">Marca</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                  <Typography variant="tableHead">Modelo</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                  <Typography variant="tableHead">Nro de Parte</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                  <Typography variant="tableHead">Tipo de Unidad</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 50 }}>
                  <Typography variant="tableHead">Stock</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                  <Typography variant="tableHead">Estado</Typography>
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                  <Typography variant="tableHead">Acciones</Typography>
                </StyledTableCell>
              </TableRow>
            </CustomTableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                    <Typography variant="tableCell">{row.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.description}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.type}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.brand}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.model}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.partNumber}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.unitType}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="tableCell">{row.stock}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip status={row.status} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton color="tertiary" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <Delete />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <Visibility />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={rows.length}
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
            }
          }}
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} de ${count}`  // aquí cambias el texto
          }
        />
    </>
  );
}
