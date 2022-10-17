import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import {
    Box, Card, CardContent, Container, Typography, Button, InputLabel, OutlinedInput, InputAdornment, Stack, Grid, CardActions
} from "@mui/material";
import { faker } from "@faker-js/faker";

const TopUp = () => {
    const [values, setValues] = useState({
        amount: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: '5%' }}>
                <Box sx={{ marginTop: '5%' }}>
                    <Grid container sx={{justifyContent:'center'}}>
                        <Grid item xs={6}>
                            <Card sx={{ marginTop: '5%' }}>
                                <CardContent sx={{height:'300px'}}>
                                    <Stack direction="row" spacing={2} justifyContent="space-between">
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='left' gutterBottom>
                                            Saldo
                                        </Typography>
                                        <Typography variant="h5" align="right">
                                            {faker.commerce.price(1000, 20000, 2, 'Rp. ')}
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        Mau Top-up berapa?
                                    </Typography>
                                    <FormControl fullWidth sx={{ marginTop: '10%' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={values.amount}
                                            onChange={handleChange('amount')}
                                            startAdornment={<InputAdornment position="start" sx={{ fontWeight: 'bold' }}>Rp</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center',marginBottom:'5%' }}>
                                    <Button variant="contained">Submit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default TopUp;