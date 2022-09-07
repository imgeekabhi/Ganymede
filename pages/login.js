import React, { useContext, useEffect } from 'react';
import Layout from '../Components/Layout';
import Head from 'next/head';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';
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
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const classes = useStyles();
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('api/users/login', { email, password });
      dispatch({ type: 'USER_LOGIN', payload: data });

      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
      alert('Login Successfully!');
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  };
  return (
    <>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <Container maxWidth={`md`}>
          <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <Typography component={`h1`} variant={`h1`}>
              Login
            </Typography>
            <List>
              <ListItem>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is not valid'
                            : 'Email is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === 'minLength'
                            ? 'Password length is more than 5'
                            : 'Password is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
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
                <NextLink
                  href={`/register?redirect=${redirect || '/'}`}
                  passHref
                >
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
