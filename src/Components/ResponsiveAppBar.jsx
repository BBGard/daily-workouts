/**
 * @fileoverview This file provides the ResponsiveAppBar component.
 */
import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {AppBar, Avatar, Box, Toolbar, IconButton, Typography, Container, Button, MenuItem, Slide, Drawer} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import { useGetUserInfo } from '../hooks/useGetUserInfo';

const pages = ['Workouts', 'Warmups', 'Recovery', 'Stretches'];

export function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const currentPage = window.location.pathname;
  const userInfo = useGetUserInfo();
  console.log(userInfo);



  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };



  return (
    <Slide direction="down" timeout={500} in={true} mountOnEnter unmountOnExit>
      <AppBar component={"nav"} color="primary">
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
                  {userInfo && userInfo.user.name ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>

                      <Avatar
                        alt={userInfo.user.name}
                        src={userInfo.user.photo}
                        onClick={() => {
                          navigate(`/profile/${userInfo.user._id}`);
                        }}
                      />
                      <Button
                        onClick={() => {
                          navigate(`/profile/${userInfo.user._id}`);
                        }}
                        variant="outlined"
                        color="info"
                        sx={{
                          marginLeft: "1.5rem",
                          height: "50%",
                          maxHeight: "2rem",
                          alignSelf: "center",
                          border: "2px solid",
                          "&:hover": { border: "2px solid", color: "#A7C957" },
                        }}
                      >
                        {userInfo.user.name.split(" ")[0]}
                      </Button>
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
                      }}
                    >
                      Sign In
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
                <Box
                  sx={{
                    width: "50vw",
                    maxWidth: "300px",
                    marginTop: "10vh",
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

              {userInfo && userInfo.user.name ? (
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "1.5rem", gap: "1rem"}}>

                <Avatar
                  alt={userInfo.user.name}
                  src={userInfo.user.photo}
                  onClick={() => {
                    navigate(`/profile/${userInfo.user._id}`);
                  }}
                />
                <Button
                  onClick={() => {
                    navigate(`/profile/${userInfo.user._id}`);
                  }}
                  variant="outlined"
                  color="info"
                  sx={{
                    height: "50%",
                    maxHeight: "2rem",
                    alignSelf: "center",
                    border: "2px solid",
                    "&:hover": { border: "2px solid", color: "#A7C957" },
                  }}
                >
                  {userInfo.user.name.split(" ")[0]}
                </Button>
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
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
