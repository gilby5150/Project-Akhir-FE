import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TableUser from './TableOrder';

const drawerWidth = 240;

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
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
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1,  width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <TableUser/>
        </Box>
      </Box>
    </div>
  );
};

export default BoardUser;