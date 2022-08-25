import React from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Store } from '../utils/Store';
import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Switch,
  Badge,
} from '@material-ui/core';

import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#565044',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>Ganymede.com</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href={`/`} passHref>
              <Link>
                <Typography className={classes.brand} variant="h6">
                  Ganymede
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
                name="checkedB"
              />
              <NextLink href={`/cart`} passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              <NextLink href={`/login`} passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography variant="h6">
            All rights reserved. Ganymede.com
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
