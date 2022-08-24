import React, { Children } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';

import useStyles from '../utils/styles';
const Layout = ({ children }) => {
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
      type: 'light',
      primary: {
        main: '#565044',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
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
              <NextLink href={`/cart`} passHref>
                <Link>Cart</Link>
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
