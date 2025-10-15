import {
    AppBar as MuiAppBar,
    Box,
    styled,
    Toolbar,
    IconButton,
    useTheme,
    Grid,
} from "@mui/material"
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { Button } from "../../../auth/components";
import { DrawerHeader } from "../atoms";
import { Drawer } from "../organisms";
import { useAuthStore } from "../../../auth/hooks/useAuthStore";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    // transition: theme.transitions.create(['margin', 'width'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    backgroundColor: theme.palette.white[100],
    border: 'none',
    // variants: [
    //     {
    //         props: ({ open }) => open,
    //         style: {
    //             width: `calc(100% - ${drawerWidth}px)`,
    //             marginLeft: `${drawerWidth}px`,
    //             transition: theme.transitions.create(['margin', 'width'], {
    //                 easing: theme.transitions.easing.easeOut,
    //                 duration: theme.transitions.duration.enteringScreen,
    //             }),
    //         },
    //     },
    // ],
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
        // marginLeft: `-${drawerWidth}px`,
        backgroundColor: "background.default",
        // variants: [
        //     {
        //         props: ({ open }) => open,
        //         style: {
        //             transition: theme.transitions.create('margin', {
        //                 easing: theme.transitions.easing.easeOut,
        //                 duration: theme.transitions.duration.enteringScreen,
        //             }),
        //             marginLeft: 0,
        //         },
        //     },  
        // ],
    }),
);


export const AdminLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { startLogout } = useAuthStore();

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleLogoutButtonClick = () => {
        startLogout();
    }

    return (
        <>
            <Box sx={{ display: 'flex', }}>
                <AppBar position="fixed" open={isDrawerOpen} elevation={0}>
                    <Toolbar
                        sx={{
                            '&.MuiToolbar-root': {
                                display: 'flex',
                                justifyContent: isDrawerOpen ? 'flex-end' : 'space-between',
                            },
                            boxShadow: '0 4px 8px -1px rgba(0, 0, 0, 0.08)',
                            height: 80,
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
                            startIcon={<LogoutIcon />}
                            sx={{
                                px: 3,
                                borderRadius: 1.5,
                                py: 0.8,
                                fontWeight: 700,
                                fontSize: '0.813rem',
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    width={drawerWidth}
                    isOpen={isDrawerOpen}
                    onClose={handleDrawerClose}
                />
                <Main open={isDrawerOpen}>
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
        </>
    )
}
