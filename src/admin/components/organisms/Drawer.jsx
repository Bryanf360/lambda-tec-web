import {
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { NavLink, useLocation, useNavigate, useNavigation } from 'react-router-dom';

import { DrawerHeader } from '../atoms';
import { useAuthStore } from '../../../auth/hooks/useAuthStore';

export default ({
    width,
    isOpen,
    onClose,
}) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const { user } = useAuthStore(state => state.auth);

    const menuItems = [
        {
            text: 'Inicio',
            path: '/dashboard',
            icon: <HomeOutlinedIcon sx={{ color: theme.palette.white[100], }} />,
        },
        {
            text: 'Artículos',
            path: '/products',
            icon: <InventoryOutlinedIcon sx={{ color: theme.palette.white[100], }} />,
        },
        {
            text: 'Ingresos',
            path: '/inputs',
            icon: <ArchiveOutlinedIcon sx={{ color: theme.palette.white[100], }} />,
        },
        {
            text: 'Salidas',
            path: '/outputs',
            icon: <UnarchiveOutlinedIcon sx={{ color: theme.palette.white[100], }} />,
        },
        {
            text: 'Reportes',
            path: '/reports',
            icon: <AssignmentTurnedInOutlinedIcon sx={{ color: theme.palette.white[100], }} />,
        },
    ]

    const handleItemButtonClick = () => {
        onClose()
    }

    return (
        <Drawer
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                },
                '& .MuiPaper-root': {
                    backgroundColor: 'primary.main',
                    color: theme.palette.white[100],
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                }
            }}
            // variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <DrawerHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar src="/broken-image.jpg" sx={{ color: '#276921', bgcolor: '#C8EFC3', mr: 1, }} />
                    <Typography variant="h2">{user?.names} {user?.lastnames}</Typography>
                </Box>
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: theme.palette.white[100] }} /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <List>
                {menuItems.map(({ text, path, icon }, index) => (
                    <ListItem key={path} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={path}
                            selected={path === pathname}
                            sx={{
                                '&.MuiListItemButton-root': {
                                    mx: 3,
                                    borderRadius: 3,
                                    paddingInline: 1,
                                },
                                '&.Mui-selected, &.MuiListItemButton-root:hover': {
                                    backgroundColor: theme.palette.white[100],
                                    borderRadius: 3,
                                    mx: 3,
                                    color: theme.palette.black[50],
                                },
                                '&.Mui-selected .MuiSvgIcon-root, &.MuiListItemButton-root:hover .MuiSvgIcon-root': {
                                    color: theme.palette.black[50],
                                },
                                marginBlock: 0.675,
                            }}
                            onClick={handleItemButtonClick}
                        >
                            <ListItemIcon
                                sx={{
                                    '&.MuiListItemIcon-root': {
                                        minWidth: 35,
                                    }
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
