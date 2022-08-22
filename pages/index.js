import Head from 'next/head';
import Layout from '../Components/Layout';
export default function Home() {
  return (
    <div>
      <Layout>
        <h1>Product</h1>
        <ul>
          <li>Product - 1</li>
          <li>Product - 2</li>
          <li>Product - 3</li>
        </ul>
      </Layout>
    </div>
  );
}
