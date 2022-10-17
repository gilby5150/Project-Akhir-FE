import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import ProductService from "../services/product.service";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from "@mui/material";
import { faker } from "@faker-js/faker";
import Stack from '@mui/material/Stack';

// const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Home = () => {
  const [content, setContent] = useState([]);
  console.log(content)

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="MuiDrawer-root">
      <CssBaseline />
      <DrawerHeader />
      <Box
        component="main"
        sx={{ display: 'flex' }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 6, md: 12 }}>
          {content.length ? content.map((content, index) => (
            <Grid item xs={0} sm={3} md={3} key={index}>
              <Card sx={{ maxWidth: 345, height: '470px' }}>
                <CardActionArea href={`/detailProduct/${content.id}`}>
                  <CardMedia
                    component="img"
                    height='auto'
                    image={`http://localhost:8080/uploads/`+content.image}
                    alt="Product Phone"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="caption" component="div" sx={{ textoverflow: 'elipsis' }}>
                      <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="body2" sx={{
                          fontWeight: 'bold',
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: '1'
                        }}>
                          {/* {faker.commerce.product()} */}
                          {content.productName}
                        </Typography>
                        <Typography variant="body2" >
                          Rp.{content.price}
                        </Typography>
                      </Stack>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: '2'
                    }}>
                      {content.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" size="small" href={`/detailProduct/${content.id}`}>More info</Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          )):<h1>Data Kosong</h1>}
        </Grid>
      </Box>
      {/* </Box> */}
    </div >
  );
};

export default Home;