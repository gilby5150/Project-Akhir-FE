import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import CartService from "../services/cart.service";
import ProductService from "../services/product.service";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModalCheckOut from './ModalCheckOut';
import {
    Container, Box, CardMedia, Typography, Button, ButtonGroup, Grid, Paper, TextField, Stack
} from "@mui/material";
import Loader from './Layout/Loader';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DetailProduct = () => {
    const currency = format => format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [values, setValues] = useState(1);
    const user = AuthService.getCurrentUser([]);
    // const { username } = AuthService.getCurrentUser();
    const [userBoard, setUserBoard] = React.useState(false);
    const [detailUser, setDetailUser] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const getDetailUser = async () => {
        const userProfile = await UserService.getDetailUser(user.username);
        setDetailUser(userProfile)
    }
    React.useEffect(() => {
        if (user) {
            setUserBoard(user.roles.includes("ROLE_USER"))
        }
        getDetailUser()
        // eslint-disable-next-line
    }, [user])
    const [cart, setCart] = useState({
        userId: 0,
        productId: 0,
        quantity: 0,
        totalPrice: 0
    })
    
    const handleChangeInput = (e) => {
        
    }

    const handleSubmitCart = (e) => {
        e.preventDefault();
        const harga = (content.price * values);
        CartService.createCart(user.id, content.id, values, harga).then(
            () => {
                navigate(`/keranjang/${user.username}`);
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    }

    useEffect(() => {
        ProductService.getDetailProduct(id).then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, [id]);

    const handleClickAdd = () => {
        setValues(values + 1);
    }
    const handleClickRemove = () => {
        if (values <= 1) {
            setValues(1)
        } else {
            setValues(values - 1);
        }
    }

    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: '5%' }}>
                <Box sx={{ height: 'auto', marginTop: '5%' }} >
                    <>
                        {content ? (
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Item sx={{ height: '100%' }}>
                                        <CardMedia
                                            name="image"
                                            component="img"
                                            height='auto'
                                            image={`http://localhost:8080/uploads/` + content.image}
                                            alt="Product Phone"
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Item sx={{ height: '50%' }}>
                                        {/* <CardContent> */}
                                        <Typography gutterBottom variant="caption" component="div" sx={{ textoverflow: 'elipsis' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                                {content.productName}
                                            </Typography>
                                            <Typography variant="h5" align='left' gutterBottom>
                                                Rp.{currency(content?.price)}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1" align='left' gutterBottom sx={{ fontWeight: 'bold' }}>
                                            Kategori :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display='block' align='left' gutterBottom>
                                            {content.category}
                                        </Typography>
                                        {/* </CardContent> */}
                                    </Item>
                                    <Item sx={{ minHeight: '50%' }}>
                                        {/* <CardContent> */}
                                        <Typography variant="body1" align='left' gutterBottom sx={{ fontWeight: 'bold' }}>
                                            Description product :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display='block' align='left' gutterBottom>
                                            {/* {faker.commerce.productDescription()} */}
                                            {content.description}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Item sx={{ height: '75%' }}>
                                        <input hidden
                                            onChange={handleChangeInput}
                                            name='userId'
                                            value={detailUser?.id}
                                        ></input>
                                        <input hidden
                                            onChange={handleChangeInput}
                                            name='productId'
                                            value={content?.id}
                                        ></input>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                            Atur Jumlah
                                        </Typography>
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button onClick={handleClickRemove}><RemoveIcon /></Button>
                                            <TextField name="quantity" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', }} value={values} />
                                            {(content?.stock - values) === 0 ? (

                                                <Button disabled onClick={handleClickAdd}><AddIcon /></Button>
                                            ) : (
                                                <Button onClick={handleClickAdd}><AddIcon /></Button>
                                            )}
                                        </ButtonGroup>
                                        <Typography variant="h6" align='left' gutterBottom sx={{ marginTop: '5%' }}>
                                            Stok total : {content?.stock - values}
                                        </Typography>
                                        <Stack direction="row" spacing={2} justifyContent="space-between">
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                                Subtotal
                                            </Typography>
                                            <Typography variant="h4" align="right">
                                                <input hidden
                                                    onChange={handleChangeInput}
                                                    name='productId'
                                                    value={currency && currency(content?.price * values)}
                                                ></input>
                                                Rp.{currency && currency(content?.price * values)}
                                            </Typography>
                                        </Stack>
                                        {userBoard ? (
                                            <Stack
                                                sx={{ marginTop: '15%' }}
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={2}>
                                                <ModalCheckOut subTotal={currency && currency(content?.price * values)} userId={user.id} productId={content.id} quantity={values} saldoUser={currency && currency(detailUser?.data.saldo)} />
                                                <Button variant="contained" onClick={handleSubmitCart}><ShoppingCartIcon /></Button>
                                            </Stack>
                                        ) : ('')}
                                        {/* </ButtonGroup> */}
                                    </Item>
                                    <>
                                        {userBoard ? (
                                            <Item sx={{ height: '25%' }}>
                                                <Stack direction="row" spacing={2} justifyContent="space-between">
                                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                                        Saldo
                                                    </Typography>
                                                    <Typography variant="h5" align="right">
                                                        {/* Rp.{currency(detailUser?.saldo)} ini saldo */}
                                                        Rp. {currency(detailUser?.data.saldo)}
                                                    </Typography>
                                                </Stack>
                                                <Button size='large' href={`/top-up/${detailUser.data && detailUser.data.username}`}>Tambah saldo ?</Button>
                                            </Item>
                                        ) : ('')}
                                    </>
                                </Grid>
                            </Grid>
                        ) : <div className="Loader" style={{ marginTop: '20%', marginLeft: '50%' }}>
                            <Loader />
                        </div>}
                    </>
                </Box>
            </Container>
        </>
    );
};

export default DetailProduct;