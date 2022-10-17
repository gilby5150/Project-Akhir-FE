import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, Select, MenuItem } from '@mui/material'
import UserService from '../services/user.service';

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

export default function ModalEditProfile({ id, userName }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const { username } = useParams()
  const [detailUser, setDetailUser] = useState('')
  // const {id} = useParams()

  const [content, setContent] = useState({
    fullname: '',
    birthday: '',
    gender: '',
    email: '',
    mobile: '',
    address: '',
  });
  console.log(content)

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setContent(
      { ...content, [e.target.name]: e.target.value }
    );
  };

  const getDetailUser = async () => {
    const userProfile = await UserService.getDetailUser(username);
    setDetailUser(userProfile)
  }

  React.useEffect(() => {
    getDetailUser()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    if (content.userName ? content.userName : userName, content.birthday, content.gender, content.email, content.mobile, content.address) {
      UserService.updateUser(id, content).then(
        (response) => {
          setContent(response.data);
          window.location.reload();
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
          // setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}><EditIcon /> Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Profile
          </Typography>
          {detailUser ? (
            <form style={{ margin: '3%' }} onSubmit={handleSubmit}>
              <input hidden
                onChange={handleChangeInput}
                name='id'
                value={content.id}
              ></input>
              <TextField InputProps={{
                readOnly: true,
              }} onChange={handleChangeInput} name="userName" fullWidth id="outlined-basic" label="Nama" variant="outlined" defaultValue={detailUser?.data.username} sx={{ marginBottom: '3%' }}></TextField>
              <TextField onChange={handleChangeInput} name="fullname" fullWidth id="outlined-basic" label="Nama Lengkap" variant="outlined" defaultValue={detailUser?.data.fullname} sx={{ marginBottom: '3%' }}></TextField>
              <TextField
                // inputFormat="YYYY-MM-DD"
                fullWidth
                variant="outlined"
                name="birthday"
                id="outlined"
                label="Birthday"
                type="date"
                onChange={handleChangeInput}
                defaultValue={detailUser?.data.username}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //  name="birthday"
                  inputFormat="YYYY-MM-DD"
                  label="Tanggal lahir"
                  value={value}
                  // onChange={handleChangeInput}
                  onChange={(newValue) => {
                    setContent({ birthday: newValue });
                  }}
                  renderInput={(params) => <TextField name="birthday" value={content.birthday} onChange={handleChangeInput} fullWidth id="outlined-basic" varian="outlined" sx={{ marginBottom: '3%' }} {...params} ></TextField>}
                />
              </LocalizationProvider> */}
              <FormControl fullWidth sx={{ marginBottom: '1%', textAlign: 'start' }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  required
                  name='gender'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={content.gender}
                  label="Gender"
                  onChange={handleChangeInput}
                  defaultValue={detailUser?.data.gender}
                >
                  <MenuItem value={'Laki-Laki'}>Laki-Laki</MenuItem>
                  <MenuItem value={'Perempuan'}>Perempuan</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                onChange={handleChangeInput}
                name="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={detailUser?.data.email}
                sx={{ marginBottom: '3%' }}></TextField>
              <TextField
                required
                onChange={handleChangeInput}
                name="mobile"
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id="outlined-basic"
                label="Nomor Hp"
                variant="outlined"
                defaultValue={detailUser?.data.mobile}
                sx={{ marginBottom: '3%' }}></TextField>
              <TextField
                required
                onChange={handleChangeInput}
                name="address"
                fullWidth
                multiline
                id="outlined-basic"
                label="Alamat"
                variant="outlined"
                defaultValue={detailUser?.data.address}
                sx={{ marginBottom: '3%' }}></TextField>
              <Button type="submit" sx={{ marginTop: '3%' }} variant="contained">save</Button>
            </form>
          ) : (<h1>Loading</h1>)}
        </Box>
      </Modal>
    </div>
  );
}
