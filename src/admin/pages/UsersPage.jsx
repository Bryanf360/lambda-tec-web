import { useEffect, useState } from 'react';

import {
    Box,
    Chip,
    Grid,
    IconButton,
    Pagination,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import { useFetch } from '../../core/hooks';
import { AddUserModal, CardLayout, Table } from '../components';
import { Button } from '../../auth/components';
import { useUsersStore } from '../hooks';

const data = [
    {
        names: 'Jhon Doe',
        lastnames: 'Smith',
        email: 'jhondoe@gmail.com',
        role: 'Technician',
        created_at: '01-01-2025',
        status: 'active',
    },
    {
        names: 'Jorge Vedón',
        lastnames: 'Andrade',
        email: 'jorge.vedon@gmail.com',
        role: 'Administrator',
        created_at: '01-02-2025',
        status: 'inactive',
    },
    {
        names: 'Liseth Vargas',
        lastnames: 'Castillo',
        email: 'liseth.vargas@gmail.com',
        role: 'Manager',
        created_at: '02-01-2025',
        status: 'inactive',
    },
    {
        names: 'Andrés Hernández',
        lastnames: 'Hernández',
        email: 'andres.hernandez@gmail.com',
        role: 'Technician',
        created_at: '01-03-2025',
        status: 'active',
    },
    {
        names: 'Jhon Smith',
        lastnames: 'Gutierrez',
        email: 'jhon.smith@gmail.com',
        role: 'Administrator',
        created_at: '01-01-2025',
        status: 'inactive',
    },
];

export default function UsersPage() {
    const {} = useFetch('https://jsonplaceholder.typicode.com/users');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const { isLoading, users, meta, getUsers } = useUsersStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);

    useEffect(() => {
        getUsers({ page: page + 1, limit });
    }, [page, limit]);

    const handleAddButtonClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleAddUserModalClose = () => {
        setIsAddUserModalOpen(false);
    };

    const StatusChip = ({ status }) => (
        <Chip label={status} size="small" color={status === 'active' ? 'success' : 'default'} />
    );

    const handleChangePage = (event, newPage) => {
        // TODO: test pagination to reset to 5
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: 'names', label: 'Nombres', minWidth: 200 },
        { id: 'lastnames', label: 'Apellidos', minWidth: 200 },
        { id: 'email', label: 'Email', minWidth: 200 },
        { id: 'role', label: 'Tipo', minWidth: 200 },
        { id: 'created_at', label: 'Agregado', minWidth: 200 },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 200,
            render: (_, row) => <StatusChip status={row.status} />,
        },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 150,
            render: (_, row) => (
                <>
                    <IconButton color="primary" size="small" onClick={() => {}}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => {}}>
                        <Delete />
                    </IconButton>
                    <IconButton color="info" size="small" onClick={() => {}}>
                        <Visibility />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <CardLayout>
            <Grid container>
                <Grid xs={12}>
                    <Typography variant="h1" sx={{ mr: 5 }}>
                        Usuarios
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Button
                        kind="tertiary"
                        sx={
                            {
                                // mr: 5,
                            }
                        }
                        startIcon={<AddIcon />}
                        onClick={handleAddButtonClick}
                    >
                        Añadir
                    </Button>
                </Grid>
            </Grid>
            <Table
                data={users}
                columns={columns}
                isLoading={isLoading}
                page={page}
                limit={limit}
                // TODO: review if is a neccessary
                // rowsPerPage={limit}
                total={meta.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <AddUserModal open={isAddUserModalOpen} onClose={handleAddUserModalClose} />
        </CardLayout>
    );

    return (
        <Box sx={{ p: 2 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#3d0d99' }}>
                        <TableRow>
                            {['Name', 'Email', 'Role', 'Added', 'Status', 'Actions'].map((col) => (
                                <TableCell key={col} sx={{ color: 'white', fontWeight: 'bold' }}>
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ backgroundColor: index % 2 === 0 ? '#f8f8fc' : 'white' }}
                            >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>
                                    <StatusChip status={user.status} />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="warning">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton color="default">
                                        <LockIcon />
                                    </IconButton>
                                    <IconButton color="default">
                                        <SettingsIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="end" mt={2}>
                <Pagination count={5} page={1} color="primary" showFirstButton showLastButton />
            </Box>
        </Box>
    );
}
