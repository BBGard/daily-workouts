import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Zoom } from '@mui/material';


export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible} timeout={500} unmountOnExit>
        <Fab sx={{position: "fixed", bottom: "1rem", right: "1rem"}} color="secondary" size="medium" onClick={handleClick}>
          <KeyboardArrowUpIcon />
        </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
