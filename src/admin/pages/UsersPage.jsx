import { useEffect, useState } from 'react';

import { Chip, Grid, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import { AddUserModal, CardLayout, DeleteModal, Table, UpdatePasswordModal } from '../components';
import { Button } from '../../auth/components';
import { useUsersStore } from '../hooks';

export default function UsersPage() {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const { isLoading, isDeleting, users, meta, getUsers, deleteUser } = useUsersStore();
    const [page, setPage] = useState(meta.page - 1);
    const [limit, setLimit] = useState(meta.limit);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);

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

    const handleChangePasswordButtonClick = (user) => {
        setIsUpdatePasswordModalOpen(true);
        setSelectedUser(user);
    };

    const handleUpdatePasswordModalClose = () => {
        setIsUpdatePasswordModalOpen(false);
        setSelectedUser(null);
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
                    <IconButton
                        color="info"
                        size="small"
                        onClick={() => handleChangePasswordButtonClick(row)}
                    >
                        <SettingsIcon />
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
            <UpdatePasswordModal
                open={isUpdatePasswordModalOpen}
                onClose={handleUpdatePasswordModalClose}
                user={selectedUser}
            />
        </CardLayout>
    );
}
