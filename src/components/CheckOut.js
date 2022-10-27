import React, { useState } from "react";
import TableCheckOut from "./TableCheckOut";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModalCheckOut from './ModalCheckOut';
import {
    Box, Typography, Button, ButtonGroup, Grid, Paper, TextField, Stack
} from "@mui/material";
import { faker } from "@faker-js/faker";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CheckOut = () => {
    const [values, setValues] = useState(0);

    const handleClickAdd = () => {
        setValues(values + 1);
    }
    const handleClickRemove = () => {
        if (values <= 0) {
            setValues(0)
        } else {
            setValues(values - 1);
        }
    }
    return (
        <>
            <div style={{ height: 400, width: '100%', marginTop: '5%' }}>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Item>
                                <TableCheckOut />
                            </Item>
                        </Grid>
                        <Grid item xs={4} >
                            <Item>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                    Ringkasan belanja
                                </Typography>
                                {/* <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button onClick={handleClickRemove}><RemoveIcon /></Button>
                                    <TextField min='0' value={values} inputProps={{ inputMode: 'string', pattern: '[0-9]*' }}></TextField>
                                    <Button onClick={handleClickAdd}><AddIcon /></Button>
                                </ButtonGroup> */}
                                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginBottom: '10%', marginTop: '10%' }}>
                                    <Typography variant="h5">
                                        Total Harga
                                    </Typography>
                                    <Typography variant="h5" align="right">
                                        {faker.commerce.price(100000, 5000000, 0, 'Rp. ')}
                                    </Typography>
                                </Stack>
                                <ButtonGroup variant="contained" aria-label="outlined button group">
                                    <ModalCheckOut/>
                                </ButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default CheckOut