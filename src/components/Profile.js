import React, { useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia'
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import TableOrder from './TableOrder';
import ModalEditProfile from "./ModalEditProfile";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemBiodata = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const { username } = useParams()
  const [detailUser, setDetailUser] = useState('')
  const getDetailUser = async () => {
    const userProfile = await UserService.getDetailUser(username);
    setDetailUser(userProfile)
  }
  const user = AuthService.getCurrentUser();
  console.log(detailUser?.data);
  React.useEffect(() => {
    getDetailUser()
    // eslint-disable-next-line
    },[])

  return (
    <Box sx={{ height: '100vh', marginTop: '5%' }}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
          <>
          {detailUser ? (
            <CardMedia
              component="img"
              height='345px'
              image={`http://localhost:8080/uploads/`+detailUser?.data.image}
              alt="Profile"
              
            />
          ) : (<h1>Loading</h1>)}
          </>
            <CardContent>
              <Typography variant="caption">
                Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
              </Typography>
            </CardContent>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{ height: '100%' }}>
            <Typography variant="h5" align='left' sx={{ fontWeight: 'bold', marginBottom: '3%' }}>
              Biodata Diri
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: '5%' }}>
              <Grid item xs={4}>
                <ItemBiodata>
                  <Typography variant="body1" align='left'>
                    Username
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Nama Lengkap
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Tanggal Lahir
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Jenis Kelamin
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Email
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Nomor Hp
                  </Typography>
                  <Typography variant="body1" align='left'>
                    Alamat
                  </Typography>
                </ItemBiodata>
              </Grid>
              <Grid item xs={4}>
                <>
                  {detailUser ? (
                    <ItemBiodata>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                      {/* {user.username} */}
                      {detailUser?.data.username}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                      {/* {user.username} */}
                      {detailUser?.data.fullname}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                        {detailUser?.data.birthday}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                        {detailUser?.data.gender}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                        {/* {user.email} */}
                        {detailUser?.data.email}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                        {detailUser?.data.mobile}
                      </Typography>
                      <Typography variant="body1" align='left' sx={{ fontWeight: 'bold' }}>
                        {detailUser?.data.address}
                      </Typography>
                    </ItemBiodata>
                  ) : (<h1>Loading</h1>)}
                </>
              </Grid>
            </Grid>
            <ModalEditProfile id={user.id} userName={user.userName}/>
          </Item>
        </Grid>
      </Grid >
      <Grid>
        <Item>
          <Typography variant='h3'>Riwayat Order</Typography>
          <TableOrder />
        </Item>
      </Grid>
    </Box >
  );
};

export default Profile;