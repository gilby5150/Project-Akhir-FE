import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import {
    Box, Card, CardContent, Container, Typography, Button, TextField, Stack, Grid, CardActions
} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import { useMutation } from "react-query";
import api from '../services/api';
import TableLog from './TableLog';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator=","
            isnumericstring="true"
            prefix="Rp."
        />
    );
});

const TopUp = () => {
    const currency = format => format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const { username } = useParams()
    const [saldo, setSaldo] = useState(0)
    const [jumlahSaldo, setJumlahSaldo] = useState(0)
    const [detailUser, setDetailUser] = useState([])
    const navigate = useNavigate();
    const getDetailUser = async () => {
        const userProfile = await UserService.getDetailUser(username);
        setDetailUser(userProfile?.data)
        
    }
    
    React.useEffect(() => {
        getDetailUser()
    }, [])
    
    const handleChangeInput = (e) => {
        const jumlah = Number(detailUser.saldo) + Number(e.target.value)
        setJumlahSaldo(jumlah)
        setSaldo(
            Number(e.target.value),
        );
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData()
            formData.set('saldo', jumlahSaldo)
            formData.set('_method', 'PATCH')

            const response = await api.post(`/users/${detailUser.id}`, formData, config);
            // localStorage.setItem("user", JSON.stringify(user));
            console.log(response)
            window.location.reload();
            navigate(`/top-up/${detailUser.username}`)
        } catch (err) {
            console.log(err);
        }
    });


    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: '5%' }}>
                <Box sx={{ marginTop: '5%' }}>
                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Grid item xs={12}>
                            <TableLog/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default TopUp;