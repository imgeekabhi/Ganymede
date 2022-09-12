import React, { useEffect, useState } from 'react';
import {
  Link,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  TextField,
  CircularProgress,
  Card,
  Button,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { getError } from '../utils/error';
import { useSnackbar } from 'notistack';
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
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const { userInfo } = state;

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry! Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
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
                <Rating value={product.rating} readOnly></Rating>
                <Link href="#reviews">
                  <Typography>({product.numReviews} reviews)</Typography>
                </Link>
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
        <List>
          <ListItem>
            <Typography name="reviews" id="reviews" variant="h2">
              Customer Reviews
            </Typography>
          </ListItem>
          {reviews.length === 0 && <ListItem>No review</ListItem>}
          {reviews.map((review) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item className={classes.reviewItem}>
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            {userInfo ? (
              <form onSubmit={submitHandler} className={classes.reviewForm}>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      We love to hear your comment on this product
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      name="review"
                      label="Enter comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </ListItem>
                  <ListItem>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>

                    {loading && <CircularProgress />}
                  </ListItem>
                </List>
              </form>
            ) : (
              <Typography variant="h2">
                Please{' '}
                <Link href={`/login?redirect=/product/${product.slug}`}>
                  login
                </Link>{' '}
                to write a review
              </Typography>
            )}
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default ProductDetail;
