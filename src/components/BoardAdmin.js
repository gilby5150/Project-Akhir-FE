import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Box, CardActions, Button, Paper, CardMedia, Grid, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useMutation } from "react-query";
import api from '../services/api'
import { NumericFormat } from 'react-number-format';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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


const BoardAdmin = () => {
  // const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  const [preview, setPreview] = useState();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    productName: '',
    image: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });

  const handleChangeInput = (e) => {
    setContent(
      {
        ...content,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      }
    );
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url)
    }
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
      formData.set('productName', content.productName)
      formData.set('image', content.image[0])
      formData.set('price', content.price)
      formData.set('category', content.category)
      formData.set('stock', content.stock)
      formData.set('description', content.description)

      const response = await api.post('/products', formData, config);
      // const response = await ProductService.createProduct(content.productName, content.image.name, content.price, content.category, content.stock, content.description, config);

      console.log(response.data.data);
      navigate('/home')
    } catch (err) {
      console.log(err);
    }
  });


  return (

    <div>
      <Box sx={{ display: 'flex', marginTop: '5%' }}>
        <Grid container spacing={2}>

          <Grid item xs={8}>
            <Item>
              <Typography variant="h3" sx={{ marginBottom: '1%' }}>
                Tambah Produk
              </Typography>
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Grid container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="stretch">
                  <TextField name="productName" id="outlined-basic" label="Nama" variant="outlined" sx={{ marginBottom: '1%' }} onChange={handleChangeInput} />
                  <TextField
                    name="price"
                    id="formatted-numberformat-input"
                    value={content.price.numberformat}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    label="Harga"
                    variant="outlined"
                    sx={{ marginBottom: '1%' }}
                    onChange={handleChangeInput} />
                  <FormControl sx={{ marginBottom: '1%', textAlign: 'start' }}>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={content.category}
                      label="Kategori"
                      // onChange={handleChangeCategory}
                      onChange={handleChangeInput}
                    >
                      <MenuItem value={'laptop'}>Laptop</MenuItem>
                      <MenuItem value={'hp'}>HP</MenuItem>
                      <MenuItem value={'kamera'}>Kamera</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField name="stock" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" label="Stok" variant="outlined" sx={{ marginBottom: '1%' }} onChange={handleChangeInput} />
                  <TextField
                    name="description"
                    id="outlined-multiline-static"
                    label="Deskripsi"
                    multiline
                    rows={4}
                    onChange={handleChangeInput}

                  // defaultValue="Default Value"
                  />
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
                  <Button type='submit'>save</Button>
                </Grid>
              </form>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: '100%' }}>
              <>
                {preview ? (
                  <CardMedia
                    className='img-card'
                    width="auto"
                    height='auto'
                    component="img"
                    image={preview}
                    alt="Product"
                  />
                ) : (
                  <CardMedia
                    className='img-card'
                    width="auto"
                    height='auto'
                    component="img"
                    image='https://cdn-icons-png.flaticon.com/512/1242/1242418.png?w=740&t=st=1666856732~exp=1666857332~hmac=0e1769f494e4cab9d67e66c73c9ab5dd72590b33ad834e459e8b0ee296f1fc3b'
                    alt="Product"
                  />
                )}

              </>
              <CardContent>
                <Typography variant="caption">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                </Typography>
              </CardContent>
            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};

export default BoardAdmin;