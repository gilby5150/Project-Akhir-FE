import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { styled } from '@mui/material/styles';
import { Box, CardActions, Button, Paper, Card, CardMedia, Grid, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { faker } from "@faker-js/faker";
import TableUser from './TableUser';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const BoardSuperAdmin = () => {
  const [content, setContent] = useState("");
  const [kategori, setKategori] = React.useState('');

  const handleChange = (event) => {
    setKategori(event.target.value);
  };

  useEffect(() => {
    UserService.getSuperAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', marginTop: '5%' }}>
        <Grid container>
          <Grid item xs={12}>
            <Item>
              {/* <Typography variant="h3" sx={{marginBottom:'5%'}}>
                Ganti Role
              </Typography> */}
              <TableUser/>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BoardSuperAdmin;