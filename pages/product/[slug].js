import { useRouter } from 'next/router';
import React from 'react';
import data from '../../utils/data';
import ProductDetail from '../../Components/ProductDetail';
const ProductDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const product = data.products.find((product) => product.slug === slug);
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
