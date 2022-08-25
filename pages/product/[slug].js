// import { useRouter } from 'next/router';
import React from 'react';
// import data from '../../utils/data';
import db from '../../utils/db';
import Product from '../../models/Product';
import ProductDetail from '../../Components/ProductDetail';
// import { Container } from '@material-ui/core';
const ProductDetailPage = ({ product }) => {
  if (!product) {
    return <h3>Product Not Found!!</h3>;
  }
  return (
    <>
      <ProductDetail product={product} />
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
