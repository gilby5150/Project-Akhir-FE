import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Navbar from "./components/Layout/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
import BoardSuperAdmin from "./components/BoardSuperAdmin";
import BoardAdmin from "./components/BoardAdmin";
import DetailProduct from "./components/DetailProduk";
import TopUp from "./components/TopUp";
import Keranjang from "./components/Keranjang";
import CheckOut from "./components/CheckOut";
import  Category  from "./components/Category";

// import AuthVerify from "./common/AuthVerify";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showSuperAdminBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showSuperAdminBoard: user.roles.includes("ROLE_SUPERADMIN"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  };

  logOut() {
    AuthService.logout();
    this.setState({
      showSuperAdminBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
      return (
        <div>
          <Navbar>
            <Routes>
              <Route exact path={"/"} element={<Home />} />
              <Route exact path={"/home"} element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/profile/:username" element={<Profile />} />
              {/* <Route path="/user" element={<BoardUser />} /> */}
              <Route path="/mod" element={<BoardSuperAdmin />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/detailProduct/:id" element={<DetailProduct/>}/>
              <Route path="/top-up/:username" element={<TopUp/>}/>
              <Route path="/keranjang" element={<Keranjang/>}/>
              <Route path="/check-out" element={<CheckOut/>}/>
              <Route path="/category/:Categoryname" element={<Category/>}/>
            </Routes>
          </Navbar>
        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    );
  };
};

export default App;