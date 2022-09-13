import React from 'react';
import db from '../../utils/db';
import Product from '../../models/Product';
import ProductDetail from '../../Components/ProductDetail';
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
  const product = await Product.findOne({ slug }, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
