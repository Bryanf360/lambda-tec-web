import {
    Box,
    Chip,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';

import { useFetch } from "../../core/hooks";
import { CardLayout } from "../components";

const userList = [
    {
        name: 'Jhon Doe',
        email: 'jhondoe@gmail.com',
        role: 'Technician',
        createdAt: '01-01-2025',
        status: 'active',
    },
    {
        name: 'Jorge Vedón',
        email: 'jorge.vedon@gmail.com',
        role: 'Administrator',
        createdAt: '01-02-2025',
        status: 'inactive',
    },
    {
        name: 'Liseth Vargas',
        email: 'liseth.vargas@gmail.com',
        role: 'Manager',
        createdAt: '02-01-2025',
        status: 'inactive',
    },
    {
        name: 'Andrés Hernández',
        email: 'andres.hernandez@gmail.com',
        role: 'Technician',
        createdAt: '01-03-2025',
        status: 'active',
    },
    {
        name: 'Jhon Smith',
        email: 'jhon.smith@gmail.com',
        role: 'Administrator',
        createdAt: '01-01-2025',
        status: 'inactive',
    },
];



export const UsersPage = () => {
    const { } = useFetch('https://jsonplaceholder.typicode.com/users');

    const StatusChip = ({ status }) => (
        <Chip
            label={status}
            size="small"
            color={status === 'active' ? 'success' : 'default'}
        />
    );

    return (
        <CardLayout
            title="Usuarios"
        >
        </CardLayout>
    )

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
                                <TableCell><StatusChip status={user.status} /></TableCell>
                                <TableCell>
                                    <IconButton color="warning"><EditIcon /></IconButton>
                                    <IconButton color="error"><DeleteIcon /></IconButton>
                                    <IconButton color="default"><LockIcon /></IconButton>
                                    <IconButton color="default"><SettingsIcon /></IconButton>
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
    )
}
