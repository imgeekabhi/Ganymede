import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Head from 'next/head';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Container,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
const LoginPage = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const classes = useStyles();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/users/login', { email, password });
      dispatch({ type: 'USER_LOGIN', payload: data });
      //   Cookies.set('userInfo', data);
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
      alert('Login Successfully!');
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };
  return (
    <>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <Container maxWidth={`md`}>
          <form className={classes.form} onSubmit={submitHandler}>
            <Typography component={`h1`} variant={`h1`}>
              Login
            </Typography>
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </ListItem>
              <ListItem>
                Do not have an account?
                <NextLink href={`/register`} passHref>
                  <Link>Register</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default LoginPage;
