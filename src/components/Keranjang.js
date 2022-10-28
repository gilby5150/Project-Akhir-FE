import React, { useState, useEffect } from "react";
import TableCart from "./TableCart";
import { styled } from '@mui/material/styles';
import CartService from '../services/cart.service';
import ModalCheckOut from './ModalCheckOut';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import {
    Box, Typography, Button, ButtonGroup, Grid, Paper, Stack
} from "@mui/material";
import Loader from './Layout/Loader';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Keranjang = () => {
    const currency = format => format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const [values, setValues] = useState(0);
    const [cart, setCart] = React.useState([]);
    const user = AuthService.getCurrentUser([]);
    const [detailUser, setDetailUser] = useState('');
    console.log(detailUser)
    const getDetailUser = async () => {
        const userProfile = await UserService.getDetailUser(user.username);
        setDetailUser(userProfile.data)
    }
    useEffect(() => {
        CartService.getAllCart().then(
            (response) => {
                setCart(response.data);
            },
            (error) => {
                const _cart =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setCart(_cart);
            }
        );
        getDetailUser()
    }, []);
    let result = cart.map(({ totalPrice }) => totalPrice)
    let totalPriceCart = 0;
    for (let index = 0; index < result.length; index++) {
        totalPriceCart += result[index];

    }

    return (
        <>
            <div style={{ height: 400, width: '100%', marginTop: '5%' }}>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Item>
                                <TableCart />
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item sx={{ height: '100%' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                    Ringkasan belanja
                                </Typography>
                                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginBottom: '10%', marginTop: '10%' }}>
                                    <Typography variant="h5">
                                        Total Harga
                                    </Typography>
                                    {cart.length ? (
                                        <Typography variant="h5" align="right">
                                            Rp. {totalPriceCart}
                                        </Typography>

                                    ) :
                                        <div style={{ marginTop: '20%' }}>
                                            <Loader />
                                        </div>
                                    }
                                </Stack>
                                {detailUser ? (
                                    <ButtonGroup variant="contained" aria-label="outlined button group">
                                        <ModalCheckOut subTotal={totalPriceCart} saldoUser={currency && currency(detailUser?.saldo)} />
                                    </ButtonGroup>

                                ) : <div style={{ marginTop: '20%' }}>
                                    <Loader />
                                </div>}
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Keranjang