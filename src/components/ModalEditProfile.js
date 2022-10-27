import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import { useMutation } from "react-query";
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, Select, MenuItem } from '@mui/material'
import UserService from '../services/user.service';
import api from '../services/api';

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
  const { username } = useParams();
  const [detailUser, setDetailUser] = useState('');
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setDetailUser(
      {
        ...detailUser,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      }
    );
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url)
    }
  };

  const getDetailUser = async () => {
    const userProfile = await UserService.getDetailUser(username);
    setDetailUser(userProfile?.data)
  }

  React.useEffect(() => {
    getDetailUser()
  }, [])

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData()
      formData.set('fullname', detailUser?.fullname)
      formData.set('image', detailUser?.image[0])
      formData.set('birthday', detailUser?.birthday)
      formData.set('gender', detailUser?.gender)
      formData.set('mobile', detailUser?.mobile)
      formData.set('address', detailUser?.address)
      formData.set('_method', 'PATCH')

      const response = await api.post(`/users/${detailUser.id}`, formData, config);
      // const response = await ProductService.createProduct(content.productName, content.image.name, content.price, content.category, content.stock, content.description, config);

      console.log(response.data.data);
      window.location.reload();
      navigate(`/profile/${detailUser?.username}`)
    } catch (err) {
      console.log(err);
    }
  });

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
            <form style={{ margin: '3%' }} onSubmit={(e) => handleSubmit.mutate(e)}>
              { detailUser?.image ? (
                <>
                {preview ? (
                  <CardMedia
                  className='profile-img-card'
                    component="img"
                    image={preview}
                    alt="Product"
                  />
                ) : (
                  <CardMedia
                  className='profile-img-card'
                    component="img"
                    image={`http://localhost:8080/uploads/` + detailUser?.image}
                    alt="Product"
                  />
                )}
                </>
              ):(<CardMedia
                className='profile-img-card'
                  component="img"
                  image='https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'
                  alt="Product"
                />)}
              <input hidden
                onChange={handleChangeInput}
                name='id'
                value={detailUser?.id}
              ></input>
              <TextField disabled onChange={handleChangeInput} name="userName" fullWidth id="outlined-basic" label="Nama" variant="outlined" defaultValue={detailUser?.username} sx={{ marginBottom: '3%' }}></TextField>
              <TextField required onChange={handleChangeInput} name="fullname" fullWidth id="outlined-basic" label="Nama Lengkap" variant="outlined" defaultValue={detailUser?.fullname} sx={{ marginBottom: '3%' }}></TextField>
              <TextField
                // inputFormat="YYYY-MM-DD"
                required
                fullWidth
                variant="outlined"
                name="birthday"
                id="outlined"
                label="Birthday"
                type="date"
                onChange={handleChangeInput}
                defaultValue={detailUser?.birthday}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth sx={{ marginBottom: '1%', textAlign: 'start' }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  required
                  name='gender'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={detailUser?.gender}
                  label="Gender"
                  onChange={handleChangeInput}
                >
                  <MenuItem value={'Laki-Laki'}>Laki-Laki</MenuItem>
                  <MenuItem value={'Perempuan'}>Perempuan</MenuItem>
                </Select>
              </FormControl>
              <TextField
                disabled
                onChange={handleChangeInput}
                name="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={detailUser?.email}
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
                defaultValue={detailUser?.mobile}
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
                defaultValue={detailUser?.address}
                sx={{ marginBottom: '3%' }}></TextField>
              
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  onChange={handleChangeInput}
                  name="image"
                  id="upload"
                  hidden
                />
              </Button>
              <Button type="submit" sx={{ marginLeft: '45%' }} variant="contained">save</Button>
            </form>
          ) : (<h1>Loading</h1>)}
        </Box>
      </Modal>
    </div>
  );
}
