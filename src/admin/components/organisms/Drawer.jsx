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
}  from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { Link } from 'react-router';

import { DrawerHeader } from '../atoms';

const menuItems = [
    {
        text: 'Inicio',
        path: '/admin/dashboard',
        icon: <HomeOutlinedIcon sx={{ color: 'white', }} />,
    },
    {
        text: 'Artículos',
        path: '/admin/products',
        icon: <InventoryOutlinedIcon sx={{ color: 'white', }} />,
    },
    {
        text: 'Ingresos',
        path: '/admin/inputs',
        icon: <ArchiveOutlinedIcon sx={{ color: 'white', }} />,
    },
    {
        text: 'Salidas',
        path: '/admin/outputs',
        icon: <UnarchiveOutlinedIcon sx={{ color: 'white', }} />,
    },
    {
        text: 'Reportes',
        path: '/admin/reports',
        icon: <AssignmentTurnedInOutlinedIcon sx={{ color: 'white', }} />,
    },
]

export default ({
    width,
    isOpen,
    selectedIndex,
    onListItemClick,
    onClose,
}) => {
    const theme = useTheme();
    
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
                    color: 'white',
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                }
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <DrawerHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    <Avatar src="/broken-image.jpg" sx={{ color: '#276921', bgcolor: '#C8EFC3', mr: 1, }} />
                    <Typography variant="h2">Jhon Doe</Typography>
                </Box>
                <IconButton onClick={onClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: 'white' }} /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <List>
                {menuItems.map(({ text, path, icon }, index) => (
                    <ListItem key={path} disablePadding>
                        <ListItemButton
                            component={Link} 
                            to={path}
                            selected={selectedIndex === index}
                            onClick={(event) => onListItemClick(event, index)}
                            sx={{
                                '&.MuiListItemButton-root': {
                                    mx: 3,
                                    borderRadius: 3,
                                    paddingInline: 1,
                                },
                                '&.Mui-selected, &.MuiListItemButton-root:hover': {
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    mx: 3,
                                    color: '#2D2D2D',
                                },
                                '&.Mui-selected .MuiSvgIcon-root, &.MuiListItemButton-root:hover .MuiSvgIcon-root': {
                                    color: '#2D2D2D',
                                },
                                marginBlock: 0.675,
                            }}
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
