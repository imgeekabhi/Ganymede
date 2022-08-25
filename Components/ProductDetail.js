import React from 'react';
import {
  Link,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import Layout from './Layout';
import axios from 'axios';
import NextLink from 'next/link';
import Head from 'next/head';
import { useContext } from 'react';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { useRouter } from 'next/router';
const ProductDetail = ({ product }) => {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const classes = useStyles();
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('Sorry! Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };

  return (
    <Layout>
      <Head>
        <title>{`${product.name} - Ganymede.com`}</title>
        <meta name="description" content={product.description} />
      </Head>
      <Container fixed>
        <div className={classes.section}>
          <NextLink href={`/`} passHref>
            <Link>
              <Typography>Back to Products</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Image
              src={product.image}
              width={630}
              height={600}
              alt={product.name}
              layout={`responsive`}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem>
                <Typography component={`h1`} variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category : {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand : {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating : {product.rating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Description : {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProductDetail;
