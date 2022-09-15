// MONGODB_URI = mongodb://localhost/ganymede
import { Grid } from '@material-ui/core';
import ProductItem from '../Components/ProductItem';
import Layout from '../Components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Store } from '../utils/Store';
export default function Home({ products }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      // window.alert('Sorry! Product is out of stock');
      enqueueSnackbar('Sorry! Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
