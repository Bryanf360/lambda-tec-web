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
import { AddUserModal, CardLayout, DeleteModal, Table } from '../components';
import { Button } from '../../auth/components';
import { useUsersStore } from '../hooks';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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
    const { isLoading, isDeleting, users, meta, getUsers, deleteUser } = useUsersStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        getUsers({ page: page + 1, limit });
    }, [page, limit]);

    const handleAddButtonClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleAddUserModalClose = () => {
        setIsAddUserModalOpen(false);
        setSelectedUser(null);
    };

    const StatusChip = ({ status }) => (
        <Chip
            label={status === 'active' ? 'activo' : 'inactivo'}
            size="small"
            color={status === 'active' ? 'success' : 'default'}
            sx={{ borderRadius: 1 }}
        />
    );

    const handleChangePage = (event, newPage) => {
        // TODO: test pagination to reset to 5
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditButtonClick = (user) => {
        setIsAddUserModalOpen(true);
        setSelectedUser(user);
    };

    const handleDeleteButtonClick = (user) => {
        setIsDeleteModalOpen(true);
        setSelectedUser(user);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const handleUserDelete = async () => {
        try {
            const message = await deleteUser(selectedUser.user_id);
            toast.success(message);
            setIsDeleteModalOpen(false);
            getUsers({ page: page + 1, limit: 5 });
        } catch (error) {
            console.log('errror: ', error);
            toast.error(error || 'Error interno del servidor');
        }
    };

    const columns = [
        { id: 'names', label: 'Nombres', minWidth: 75 },
        { id: 'lastnames', label: 'Apellidos', minWidth: 75 },
        { id: 'email', label: 'Email', minWidth: 50 },
        {
            id: 'role',
            label: 'Tipo',
            minWidth: 75,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {row.role === 'admin' ? 'Administrador' : 'Técnico'}
                </Typography>
            ),
        },
        {
            id: 'created_at',
            label: 'Agregado',
            minWidth: 50,
            render: (_, row) => (
                <Typography variant="tableCell">
                    {dayjs(row.created_at).format('DD-MM-YYYY')}
                </Typography>
            ),
        },
        {
            id: 'status',
            label: 'Estado',
            minWidth: 50,
            render: (_, row) => {
                return <StatusChip status={row.status} />;
            },
        },
        {
            id: 'actions',
            label: 'Acciones',
            minWidth: 75,
            render: (_, row) => (
                <>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEditButtonClick(row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteButtonClick(row)}
                        disabled={row?.status === 'inactive'}
                    >
                        <Delete />
                    </IconButton>
                    {/* <IconButton color="info" size="small" onClick={() => {}}>
                        <Visibility />
                    </IconButton> */}
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
                <Grid xs={12}></Grid>
            </Grid>
            <Button
                kind="tertiary"
                sx={{
                    mt: 2,
                    mb: 2,
                }}
                startIcon={<AddIcon />}
                onClick={handleAddButtonClick}
            >
                Añadir
            </Button>
            <Table
                data={users}
                columns={columns}
                isLoading={isLoading}
                page={page}
                limit={limit}
                total={meta.total}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <AddUserModal
                open={isAddUserModalOpen}
                onClose={handleAddUserModalClose}
                mode={selectedUser ? 'edit' : 'create'}
                user={selectedUser}
            />
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onDelete={handleUserDelete}
                isDeleting={isDeleting}
                question="¿Está seguro de eliminar este registro?"
                subtitle=""
            />
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
