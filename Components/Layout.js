import React, { Children } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

import useStyles from '../utils/styles';
const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Ganymede.com</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6">Ganymede</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography variant="h6">All rights reserved. Ganymede.com</Typography>
      </footer>
    </div>
  );
};

export default Layout;
