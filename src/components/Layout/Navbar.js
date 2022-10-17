import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AuthService from '../../services/auth.service'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
    const [showModeratorBoard, setShowModeratorBoard] = React.useState(false)
    const [showAdminBoard, setShowAdminBoard] = React.useState(false)
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
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
        }
    }, [])

    const Menu = [
        { href: '/home', name: 'Home', icon: <HomeOutlinedIcon /> },
        { href: '/top-up', name: 'TopUP Saldo', icon: <AccountBalanceWalletOutlinedIcon /> },
        { href: '/keranjang', name: 'Keranjang', icon: <ShoppingCartOutlinedIcon /> },
    ]
    const Kategori = [
        { href: '/home', name: 'Laptop', icon: <LaptopChromebookOutlinedIcon /> },
        { href: '/home', name: 'Hp', icon: <PhoneIphoneOutlinedIcon /> },
        { href: '/home', name: 'Kamera', icon: <CameraAltOutlinedIcon /> },
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
                        {showModeratorBoard && (
                            <Button
                                href="/mod"
                                sx={{ color: '#fff' }}>
                                Moderator Page
                            </Button>
                        )}
                        {showAdminBoard && (
                            <Button
                                href="/admin"
                                sx={{ color: '#fff' }}>
                                Tambah Produk
                            </Button>
                        )}

                        {/* {currentUser && (
                            <Button
                                href="/user"
                                sx={{ color: '#fff' }}>
                                User Page
                            </Button>
                        )} */}
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
                    {Menu.map((text, index) => (
                        <>
                        {/* { (user.roles[0] === "ROLE_MODERATOR" || user.roles[0] === "ROLE_ADMIN") && (text.name !== "TopUP Saldo" && text.name !== "Keranjang") ?( */}
                        
                        { (showModeratorBoard || showAdminBoard) && (text.name !== "TopUP Saldo" && text.name !== "Keranjang") ?(
                            <Link href={text.href} underline="none" key={index}>
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
                                            {text.icon}
                                        </ListItemIcon >
                                        <ListItemText primary={text.name} sx={{ color: 'black', opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ):''}
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
                            {Kategori.map((text, index) => (
                                <Link href={text.href} underline="none" key={index}>
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
                                                {text.icon}
                                            </ListItemIcon >
                                            <ListItemText primary={text.name} sx={{ color: 'black', opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <List>
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
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}
