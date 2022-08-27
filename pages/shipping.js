import React, { useContext, useEffect } from 'react';
import Layout from '../Components/Layout';
import Head from 'next/head';
import Cookies from 'js-cookie';
import CheckoutWizard from '../Components/checkoutWizard';
// import NextLink from 'next/link';

import { useForm, Controller } from 'react-hook-form';
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import useStyles from '../utils/styles';

import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
const ShippingPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);
  const classes = useStyles();
  const submitHandler = async ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    router.push('/payment');
  };
  return (
    <>
      <Layout>
        <Head>
          <title>Shipping</title>
        </Head>
        <Container maxWidth={`md`}>
          <CheckoutWizard activeStep={1} />
          <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <Typography component={`h1`} variant={`h1`}>
              Shipping
            </Typography>
            <List>
              <ListItem>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.fullName)}
                      helperText={
                        errors.fullName
                          ? errors.fullName.type === 'minLength'
                            ? 'Full Name length is more than 1'
                            : 'Full Name is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Address"
                      error={Boolean(errors.address)}
                      helperText={
                        errors.address
                          ? errors.address.type === 'minLength'
                            ? 'Address length is more than 1'
                            : 'Address is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="City"
                      error={Boolean(errors.city)}
                      helperText={
                        errors.city
                          ? errors.city.type === 'minLength'
                            ? 'City length is more than 1'
                            : 'City is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="postalCode"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="postalCode"
                      label="Postal Code"
                      error={Boolean(errors.postalCode)}
                      helperText={
                        errors.postalCode
                          ? errors.postalCode.type === 'minLength'
                            ? 'Postal Code length is more than 1'
                            : 'Postal Code is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="country"
                      label="Country"
                      error={Boolean(errors.country)}
                      helperText={
                        errors.country
                          ? errors.country.type === 'minLength'
                            ? 'Country length is more than 1'
                            : 'Country is required'
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
                  Continue
                </Button>
              </ListItem>
            </List>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default ShippingPage;
