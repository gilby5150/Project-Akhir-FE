import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ProductService from "../services/product.service";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModalCheckOut from './ModalCheckOut';
import {
    Container, Box, CardMedia, Typography, Button, ButtonGroup, Grid, Paper, TextField, Stack
} from "@mui/material";
import { faker } from "@faker-js/faker";

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
    console.log(content)

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
                                    <Item>
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
                                    <Item>
                                        {/* <CardContent> */}
                                        <Typography gutterBottom variant="caption" component="div" sx={{ textoverflow: 'elipsis' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                                {content.productName}
                                            </Typography>
                                            <Typography variant="h5" align='left' gutterBottom>
                                                Rp.{currency(content?.price)}
                                            </Typography>
                                        </Typography>
                                        {/* </CardContent> */}
                                    </Item>
                                    <Item>
                                        {/* <CardContent> */}
                                        <Typography variant="body1" align='left' gutterBottom sx={{ fontWeight: 'bold' }}>
                                            Kategori :
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display='block' align='left' gutterBottom>
                                            {content.category}
                                        </Typography>
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
                                    <Item>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                            Atur Jumlah
                                        </Typography>
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button onClick={handleClickRemove}><RemoveIcon /></Button>
                                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', }} value={values} />
                                        {(content?.stock - values) === 0 ? (

                                            <Button disabled onClick={handleClickAdd}><AddIcon /></Button>    
                                        ): (
                                            <Button onClick={handleClickAdd}><AddIcon /></Button>    
                                        )}
                                        </ButtonGroup>
                                        <Typography variant="body1" align='left' gutterBottom>
                                            Stok total : {content?.stock - values}
                                        </Typography>
                                        <Stack direction="row" spacing={2} justifyContent="space-between">
                                            <Typography variant="body1">
                                                Subtotal
                                            </Typography>
                                            <Typography variant="body1" align="right">
                                                Rp.{currency(content?.price * values)}
                                            </Typography>
                                        </Stack>
                                        {/* <ButtonGroup variant="contained" aria-label="outlined button group"> */}
                                        <Stack direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}>
                                            <ModalCheckOut subTotal={currency(content?.price * values)} />
                                            <Button variant="contained" href='/keranjang'><ShoppingCartIcon /></Button>
                                        </Stack>
                                        {/* </ButtonGroup> */}
                                    </Item>
                                    <Item>
                                        <Stack direction="row" spacing={2} justifyContent="space-between">
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                                Saldo
                                            </Typography>
                                            <Typography variant="h5" align="right">
                                                {faker.commerce.price(1000, 20000, 2, 'Rp. ')}
                                            </Typography>
                                        </Stack>
                                        <Button size='large' href='/top-up'>Tambah saldo ?</Button>
                                    </Item>
                                </Grid>
                            </Grid>
                        ) : (<h1>Loading</h1>)}
                    </>
                </Box>
            </Container>
        </>
    );
};

export default DetailProduct;