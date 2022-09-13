import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import Rating from '@material-ui/lab/Rating';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia title={product.name}>
            <Image
              src={product.image}
              width={400}
              height={400}
              alt={product.name}
              layout={`responsive`}
            />
          </CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>₹{product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductItem;
