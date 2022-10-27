import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AuthService from '../../services/auth.service'
import {Box,Drawer,CssBaseline,Toolbar,List,Typography,Divider,IconButton,ListItem,ListItemButton,
ListItemIcon,ListItemText,Button,Link,Accordion,AccordionSummary,AccordionDetails,} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children }) {
    const user = AuthService.getCurrentUser();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [showSuperAdminBoard, setShowSuperAdminBoard] = React.useState(false)
    const [showAdminBoard, setShowAdminBoard] = React.useState(false)
    const [userBoard, setUserBoard] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState(undefined)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        AuthService.logout();
    }

    React.useEffect(() => {
        if (user) {
            setCurrentUser(user)
            setUserBoard(user.roles.includes("ROLE_USER"))
            setShowSuperAdminBoard(user.roles.includes("ROLE_SUPERADMIN"))
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
        }// eslint-disable-next-line
    },[])

    const Menu = [
        { href: '/home', name: 'Home', icon: <HomeOutlinedIcon /> },
        { href: `/top-up/${user && user.username}`, name: 'TopUP Saldo', icon: <AccountBalanceWalletOutlinedIcon /> },
        { href: '/keranjang', name: 'Keranjang', icon: <ShoppingCartOutlinedIcon /> },
    ]
    const Kategori = [
        { href: '/category/laptop', name: 'Laptop', icon: <LaptopChromebookOutlinedIcon /> },
        { href: '/category/hp', name: 'Hp', icon: <PhoneIphoneOutlinedIcon /> },
        { href: '/category/kamera', name: 'Kamera', icon: <CameraAltOutlinedIcon /> },
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"

                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="/" underline="none" sx={{ color: 'white' }}>
                            SALES
                        </Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {/* <Button
                            href="/home"
                            sx={{ color: '#fff' }}>
                            Home
                        </Button> */}
                        {showSuperAdminBoard && (
                            <Button
                                href="/mod"
                                sx={{ color: '#fff' }}>
                                SuperAdmin Page
                            </Button>
                        )}
                        {showAdminBoard && (
                            <Button
                                href="/admin"
                                sx={{ color: '#fff' }}>
                                Tambah Produk
                            </Button>
                        )}
                        {currentUser ? (
                            <>
                                <Button
                                    href={`/profile/${user.username}`}
                                    sx={{ color: '#fff' }}>
                                    {/* {currentUser.username} */}
                                    Profile
                                </Button>
                                <Button
                                    href="/login"
                                    onClick={logOut}
                                    sx={{ color: '#fff' }}>
                                    LogOut
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    href="/login"
                                    sx={{ color: '#fff' }}>
                                    LogIn
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <img src="https://www.wgs.co.id/assets/logo_wgs_fullBlack.svg" alt='logo' />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {Menu.map((content, index) => (
                        <>
                            {(userBoard) && (content.name === "TopUP Saldo" || content.name === "Keranjang" || content.name === "Home") ? (
                                <Link href={content.href} underline="none" key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                                            <ListItemIcon sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                            >
                                                {content.icon}
                                            </ListItemIcon >
                                            <ListItemText primary={content.name} sx={{ color: 'black', opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ) : ''}
                        </>
                    ))}
                </List>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Kategori</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {Kategori.map((content, index) => (
                                <Link href={content.href} underline="none" key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}>
                                            <ListItemIcon sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                            >
                                                {content.icon}
                                            </ListItemIcon >
                                            <ListItemText primary={content.name} sx={{ color: 'black', opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <List>
                {(showAdminBoard || showSuperAdminBoard) ? (
                    <Link href={'/log'} underline="none">
                        <ListItem disablePadding>
                            <ListItemButton sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                                <ListItemIcon sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                >
                                    <DescriptionOutlinedIcon />
                                </ListItemIcon >
                                <ListItemText primary="Log-APP" sx={{ color: 'black', opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ):''}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}
