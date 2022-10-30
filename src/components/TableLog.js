import React, { useEffect } from 'react';
import LogServices from '../services/log.service';
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


export default function CustomizedTables() {
    const [order, setOrder] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    console.log(order)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        LogServices.getAllLog().then(
            (response) => {
                setOrder(response.data.result);
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
                                <StyledTableCell>Request Method</StyledTableCell>
                                <StyledTableCell align="center">Endpoint</StyledTableCell>
                                <StyledTableCell align="center">Status Code</StyledTableCell>
                                <StyledTableCell align="center">Content Length</StyledTableCell>
                                <StyledTableCell align="center">Response Time</StyledTableCell>
                                <StyledTableCell align="center">TimeStamp</StyledTableCell>
                                {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : order
                            ).map((row) => (
                                <StyledTableRow key={row.request_method}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.request_method}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.endpoint}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status_code}</StyledTableCell>
                                    <StyledTableCell align="center">{row.content_length}</StyledTableCell>
                                    <StyledTableCell align="center">{row.response_time}</StyledTableCell>
                                    <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
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
