import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FormControl from '@mui/material/FormControl';
import {
  Box, Card, CardMedia, CardContent, CardActions
} from "@mui/material";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{ height: '100vh' }}
      >
        <Card className="card card-container">
          <CardMedia
            component="img"
            height='auto'
            image="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <CardContent>
            <Form onSubmit={handleLogin} ref={form}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <label htmlFor="input-username">
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
                {message && (
                  <div className="form-group">
                    <div role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </FormControl>

              <CardActions>
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : <span>Login</span>}
                </button>
                <a href='/register' className="btn btn-secondary btn-block" style={{ marginLeft: '72px', backgroundColor: 'white', color: 'black' }}>
                  Register</a>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </CardActions>
            </Form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;