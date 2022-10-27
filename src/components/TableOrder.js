import React, { useEffect } from 'react';
import OrderService from '../services/order.service';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { faker } from "@faker-js/faker";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function createData(nama, photo, harga, quantity, payment, status) {
    return { nama, photo, harga, quantity, payment, status };
}

const rows = [
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Cod', 'shipped'),
    createData(faker.commerce.productName(), faker.image.food(50, 50, false), faker.commerce.price(1000, 20000, 2, 'Rp. '), faker.commerce.price(1, 50, 0), 'Saldo', 'success'),
];

export default function CustomizedTables() {
    const [order, setOrder] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        OrderService.getAllOrder().then(
            (response) => {
                setOrder(response.data);
            },
            (error) => {
                const _order =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setOrder(_order);
            }
        );
    }, []);

    return (
        <Box component="main" sx={{}}>
            <Box sx={{ height: 'auto' }}>
                <TableContainer component={Paper} sx={{ height: 'auto' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead >
                            <TableRow>
                                <StyledTableCell>Nama Produk</StyledTableCell>
                                <StyledTableCell align="center">Photo</StyledTableCell>
                                <StyledTableCell align="center">Quantitas</StyledTableCell>
                                <StyledTableCell align="center">Total Harga</StyledTableCell>
                                <StyledTableCell align="center">Payment Method</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : order
                            ).map((row) => (
                                <StyledTableRow key={row.productName}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.productName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img
                                            width='50px'
                                            height='50px'
                                            src={`http://localhost:8080/uploads/` + row.image}
                                            alt='product'>
                                        </img>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.totalPrice}</StyledTableCell>
                                    <StyledTableCell align="center">{row.payment}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={order.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
