import React, { useState } from "react";
import TableCart from "./TableCart";
import { styled } from '@mui/material/styles';
import ModalCheckOut from './ModalCheckOut';
import {
    Box, Typography, Button, ButtonGroup, Grid, Paper, Stack
} from "@mui/material";
import { faker } from "@faker-js/faker";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Keranjang = () => {
    const [values, setValues] = useState(0);

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
                            <Item>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                    Ringkasan belanja
                                </Typography>
                                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginBottom: '10%', marginTop: '10%' }}>
                                    <Typography variant="h5">
                                        Total Harga
                                    </Typography>
                                    <Typography variant="h5" align="right">
                                        {faker.commerce.price(1000, 50000, 0, 'Rp. ')}
                                    </Typography>
                                </Stack>
                                <ButtonGroup variant="contained" aria-label="outlined button group">
                                    <Button variant="contained"><ModalCheckOut/></Button>
                                </ButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Keranjang