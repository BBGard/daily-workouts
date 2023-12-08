/**
 * @fileoverview This file provides the ResponsiveAppBar component.
 */
import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {AppBar, Avatar, Box, Card, Toolbar, IconButton, Typography, Container, Button, MenuItem, Slide, Drawer, Modal, ButtonGroup} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import { useGetUserInfo } from '../hooks/useGetUserInfo';

import 'firebase/auth';
import {auth} from '../Config/firebase';
import { signOut } from 'firebase/auth';

const pages = ['Workouts', 'Warmups', 'Recovery', 'Stretches'];

export function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const currentPage = window.location.pathname;
  const userInfo = useGetUserInfo();
  const [openLogout, setOpenLogout] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  const openLogoutModal = () => {
    // Open the logout modal
    setOpenLogout(true);
  }

  const closeLogoutModal = () => {
    // Close the logout modal
    setOpenLogout(false);
  }

  const logoutUser = () => {
    // Logout the user
    signOut(auth).then(() => {
      // Remove the user cookie
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Redirect to home page
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }



  return (
    <Slide direction="down" timeout={500} in={true} mountOnEnter unmountOnExit>
      <AppBar component={"nav"} color="primary" sx={{ position: "sticky" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile View */}
            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              justifyContent={"center"}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                paddingLeft: "1rem",
              }}
            >
              Daily Workouts
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: "primary.main",
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="open menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={open ? toggleDrawer(false) : toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={open}
                onClose={toggleDrawer(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    color: "white",
                    bgcolor: "primary.main",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    bgcolor: "primary.main",
                  }}
                >
                  {userInfo && userInfo.user.name !== null ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        // On click show logout modal
                        onClick={openLogoutModal}
                        variant="outlined"
                        color="info"
                        sx={{
                          marginRight: "1rem",
                          height: "50%",
                          maxHeight: "2rem",
                          alignSelf: "center",
                          border: "2px solid",
                          "&:hover": { border: "2px solid", color: "#A7C957" },
                          textTransform: "capitalize",
                        }}
                      >
                        {/* {userInfo.user.name.split(" ")[0]} */}
                        Log out
                      </Button>

                      <Modal
                        open={openLogout}
                        onClose={closeLogoutModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Card
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #fff",
                            borderRadius: "25px",
                            boxShadow: 24,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                          >
                            Do you want to logout?
                          </Typography>
                          <div>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={closeLogoutModal}
                            >
                              No
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={logoutUser}
                              sx={{ marginLeft: "1rem" }}
                            >
                              Yes
                            </Button>
                          </div>
                        </Card>
                      </Modal>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        navigate(`/auth`);
                      }}
                      sx={{
                        height: "50%",
                        maxHeight: "2rem",
                        alignSelf: "center",
                        border: "2px solid",
                        padding: "1rem",
                        "&:hover": { border: "2px solid", color: "#A7C957" },
                        textTransform: "capitalize",
                      }}
                    >
                      Log In
                    </Button>
                  )}

                  <IconButton
                    size="large"
                    aria-label="close menu"
                    onClick={toggleDrawer(false)}
                    color="info"
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    sx={{ width: "5rem", height: "5rem" }}
                    alt={userInfo?.user?.name || ""}
                    src={userInfo?.user?.photo || ""}
                  />
                </Box>

                <Box
                  sx={{
                    width: "50vw",
                    maxWidth: "300px",
                    marginTop: "2rem",
                    bgcolor: "primary.main",
                  }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <MenuItem key={"Home"}>
                    <Link
                      to={`/`}
                      style={{
                        textDecoration: "none",
                        color: currentPage === `/` ? "#7EC4CF" : "inherit",
                        width: "100%",
                        height: "100%",
                        padding: "0.5rem",
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HomeIcon
                        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                      />
                      <Typography
                        textAlign="left"
                        fontSize={"1.2rem"}
                        fontWeight={500}
                      >
                        Home
                      </Typography>
                    </Link>
                  </MenuItem>
                  {pages.map((page) => (
                    <MenuItem key={page}>
                      <Link
                        to={`/${page.toLowerCase()}`}
                        style={{
                          textDecoration: "none",
                          color:
                            currentPage === `/${page.toLowerCase()}`
                              ? "#7EC4CF"
                              : "inherit",
                          width: "100%",
                          height: "100%",
                          padding: "0.5rem",
                          margin: "0",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": { color: "#A7C957" },
                        }}
                      >
                        {page === "Workouts" ? (
                          <FitnessCenterIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                          />
                        ) : page === "Warmups" ? (
                          <WhatshotOutlinedIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                          />
                        ) : page === "Recovery" ? (
                          <RestoreOutlinedIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                          />
                        ) : page === "Stretches" ? (
                          <SelfImprovementIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                          />
                        ) : (
                          <DirectionsRunIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                          />
                        )}

                        <Typography
                          textAlign="left"
                          fontSize={"1.2rem"}
                          fontWeight={500}
                        >
                          {page}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Box>
              </Drawer>
            </Box>

            {/* Medium View or Larger */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {currentPage !== "/" && (
                <Button
                  onClick={() => {
                    window.location.href = `/`;
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Home
                </Button>
              )}

              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    window.location.href = `/${page.toLowerCase()}`;
                  }}
                  sx={{
                    my: 2,
                    color:
                      currentPage === `/${page.toLowerCase()}`
                        ? "#7EC4CF"
                        : "inherit",
                    display: "block",
                    fontWeight:
                      currentPage === `/${page.toLowerCase()}`
                        ? "bold"
                        : "normal",
                    "&:hover": { color: "#A7C957" },
                  }}
                >
                  {page}
                </Button>
              ))}

              {userInfo && userInfo.user.name !== null ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "1.5rem",
                    gap: "1rem",
                  }}
                >
                  <Button
                    onClick={openLogoutModal}
                    variant="outlined"
                    color="info"
                    sx={{
                      height: "50%",
                      maxHeight: "2rem",
                      alignSelf: "center",
                      border: "2px solid",
                      "&:hover": { border: "2px solid", color: "#A7C957" },
                      textTransform: "capitalize",
                    }}
                  >
                    {/* {userInfo.user.name.split(" ")[0]} */}
                    Log out
                  </Button>
                  {/* <Avatar alt={userInfo.user.name} src={userInfo.user.photo} /> */}
                  <Modal
                    open={openLogout}
                    onClose={closeLogoutModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Card
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #fff",
                        borderRadius: "25px",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                      >
                        Do you want to logout?
                      </Typography>
                      <div>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={closeLogoutModal}
                        >
                          No
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={logoutUser}
                          sx={{ marginLeft: "1rem" }}
                        >
                          Yes
                        </Button>
                      </div>
                    </Card>
                  </Modal>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="info"
                  href="/auth"
                  sx={{
                    marginLeft: "1.5rem",
                    height: "50%",
                    maxHeight: "2rem",
                    alignSelf: "center",
                    border: "2px solid",
                    "&:hover": { border: "2px solid", color: "#A7C957" },
                    textTransform: "capitalize",
                  }}
                >
                  Log In
                </Button>
              )}
                  <Avatar
                  sx={{alignSelf: "center", marginLeft: "1rem"}}
                    alt={userInfo?.user?.name || ""}
                    src={userInfo?.user?.photo || ""}
                  />
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
