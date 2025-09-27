import { 
    AppBar as MuiAppBar, 
    Box, 
    styled, 
    Toolbar, 
    IconButton, 
    useTheme,
} from "@mui/material"
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

import { Drawer, DrawerHeader } from "../components";
import { Button } from "../../auth/components";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'white',
    border: 'none',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);


export const AdminLayoutPage = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleLogoutButtonClick = () => {
        navigate('/auth/login')
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open} elevation={0}>
                    <Toolbar 
                        sx={{ 
                            '&.MuiToolbar-root': {
                                display: 'flex',
                                justifyContent: open ? 'flex-end' : 'space-between',
                            }
                        }}
                    >
                        <IconButton
                            color="#276921"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button 
                            kind="success" 
                            size="small" 
                            fullWidth={false}
                            onClick={handleLogoutButtonClick}
                        >
                                Cerrar Sesión
                            </Button>
                    </Toolbar>  
                </AppBar>
                <Drawer
                    drawerWidth={drawerWidth}
                    open={open}
                    onClick={handleListItemClick}
                    onClose={handleDrawerClose}
                />
                <Main open={open}>
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
        </>
    )
}
