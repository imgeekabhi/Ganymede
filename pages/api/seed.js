import nc from 'next-connect';
import db from '../../utils/db';
import Product from '../../models/Product';
import data from '../../utils/data';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'Seeded Successfully!!' });
});

export default handler;