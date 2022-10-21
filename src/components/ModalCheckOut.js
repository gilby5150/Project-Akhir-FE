import * as React from 'react';
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
import { faker } from "@faker-js/faker";

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

export default function ModalCheckOut({subTotal}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Saldo');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeSaldo = (event) => {
    setValue(event.target.value);
  };

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
                  {faker.commerce.price(1000, 50000, 0, 'Rp. ')}
                </Typography>
              </Stack>
              <FormControlLabel value="COD" control={<Radio />} label="COD" />
            </RadioGroup>
          </FormControl>
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ marginBottom: '10%', marginTop: '10%' }}>
            <Typography variant="h5">
              Total Harga
            </Typography>
            <Typography variant="h5" align="right">
              Rp. {subTotal}
            </Typography>
          </Stack>
          <Button variant="contained">Beli</Button>
        </Box>
      </Modal>
    </div>
  );
}
