import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Head from 'next/head'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../store/reducers/cartReducer';
const Banner = dynamic(() => import('../components/Banner'));
const MainLayout = dynamic(() => import('../components/MainLayout'));
const ProductList = dynamic(() => import('../components/ProductList'));

const Home: NextPage = () => {

  return (
    <MainLayout>
      <Head>
        <title>E-COM</title>
      </Head>
      <Banner />
      <ProductList />
    </MainLayout>
  )
}

export default Home
