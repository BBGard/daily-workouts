/**
 * @fileoverview This file provides the ResponsiveAppBar component.
 */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Slide } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link } from "react-router-dom";


const pages = ['Workouts', 'Warmups', 'Recovery'];

export function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };


  return (
    <Slide direction="down" timeout={500} in={true} mountOnEnter unmountOnExit>
      <AppBar component={"nav"}>
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
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                paddingLeft: "1rem",
              }}
            >
              Daily Workouts
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={
                  open ? toggleDrawer(false) : toggleDrawer(true)
                }
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <MenuItem key={'Home'}>
                    <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                      <Typography textAlign="center">Home</Typography>
                    </Link>
                  </MenuItem>
                  {pages.map((page) => (
                    <MenuItem key={page} >
                      <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography textAlign="center">{page}</Typography>
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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    window.location.href = `/${page.toLowerCase()}`;
                  }
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
