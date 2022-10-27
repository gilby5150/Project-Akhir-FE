import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, Select, MenuItem } from '@mui/material'
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

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

export default function ModalEditRole({ userId, roleId }) {
  // const {id} = useParams();
  const user = AuthService.getCurrentUser();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    UserService.getUserId(userId)
  };
  const handleClose = () => setOpen(false);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  
  const [editRole, setEditRole] = useState({
    roleId: 0
  });
  console.log(editRole)
  
  const [showSuperAdminBoard, setShowSuperAdminBoard] = React.useState(false)
  React.useEffect(() => {
    if (user) {
      setShowSuperAdminBoard(user.roles.includes("ROLE_SUPERADMIN"))
    }// eslint-disable-next-line
  }, [])

  const handleChangeInput = (e) => {
    setEditRole(
      { ...editRole, [e.target.name]: e.target.value }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (editRole.roleId) {
      UserService.updateRoleId(userId, editRole).then(
        () => {
          navigate(`/mod`);
          window.location.reload();
        }, (response) => {
          setEditRole(response.data);
        },
        (error) => {
          const _editRole =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setEditRole(_editRole);
          // setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  }

  return (
    <div>
      {showSuperAdminBoard ? (
        <Button disabled onClick={handleOpen}><EditIcon /></Button>
      ): (<Button onClick={handleOpen}><EditIcon /></Button>)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Role
          </Typography>
          <form style={{ margin: '3%' }} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: '1%', textAlign: 'start' }}>
              <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
              <Select
                name="roleId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editRole.roleId}
                label="role"
                onChange={handleChangeInput}
              >
                <MenuItem value={3}>Admin</MenuItem>
                <MenuItem value={1}>User</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" sx={{ marginTop: '3%' }} variant="contained">save</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
