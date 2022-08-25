import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Head from 'next/head';
import Layout from '../Components/Layout';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Typography,
  Link,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  Container,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
const CartPage = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  console.log(cartItems);
  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <Container maxWidth={`md`}>
        <Typography component={`h1`} variant={`h1`}>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div>
            Cart is Empty.
            <NextLink href={`/`} passHref>
              <Link>Go for Shopping</Link>
            </NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <Select value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">₹ {item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color={`secondary`}>
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Subtotal (
                      {cartItems.reduce(
                        (accumulator, current) =>
                          accumulator + current.quantity,
                        0
                      )}{' '}
                      items ) : ₹{' '}
                      {cartItems.reduce(
                        (accumulator, current) =>
                          accumulator + current.quantity * current.price,
                        0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="primary" fullWidth>
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
