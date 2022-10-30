import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalCheckOut({ subTotal, saldoUser, userId, productId, quantity }) {
  const currency = format => format.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Saldo');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser([]);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] =React.useState('Success');
  const handleChangeSaldo = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(value === 'Saldo' ? 'Success' : 'Delivered')
    OrderService.createOrderCart(userId, productId, quantity, subTotal, value, status).then(
      () => {
        navigate(`/profile/${user.username}`);
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

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Beli</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Pembayaran
          </Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontWeight: 'bold' }}>Metode Pembayaran</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeSaldo}
            >
              <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginTop: '10%', alignItems: 'center' }}>
                <FormControlLabel value="Saldo" control={<Radio />} label="Saldo" sx={{ marginTop: 0 }} />
                <Typography variant="body1">
                  Rp.{currency(saldoUser)}
                </Typography>
              </Stack>
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
            </RadioGroup>
          </FormControl>
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginBottom: '10%', marginTop: '10%' }}>
            <Typography variant="h5">
              Total Harga
            </Typography>
            <Typography variant="h5" align="right">
              Rp. {currency(subTotal)}
            </Typography>
          </Stack>
          <Button variant="contained" onClick={handleSubmit}>Beli</Button>
        </Box>
      </Modal>
    </div>
  );
}
