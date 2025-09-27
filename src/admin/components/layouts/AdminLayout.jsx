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

import { Button } from "../../../auth/components";
import { DrawerHeader } from "../atoms";
import { Drawer } from "../organisms";

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


export const AdminLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
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
                <AppBar position="fixed" open={isDrawerOpen} elevation={0}>
                    <Toolbar
                        sx={{
                            '&.MuiToolbar-root': {
                                display: 'flex',
                                justifyContent: isDrawerOpen ? 'flex-end' : 'space-between',
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
                                isDrawerOpen && { display: 'none' },
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
                    width={drawerWidth}
                    isOpen={isDrawerOpen}
                    onListItemClick={handleListItemClick}
                    onClose={handleDrawerClose}
                    selectedIndex={selectedIndex}
                />
                <Main open={isDrawerOpen}>
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
        </>
    )
}
