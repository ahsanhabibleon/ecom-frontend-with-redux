import { Breadcrumb, Layout, Menu } from 'antd'
import React from 'react'
import { propTypes } from './MainLayout.types'
const { Header, Content, Footer } = Layout
import Styles from './MainLayout.module.scss'
import Navbar from '../Navbar'
import Link from 'next/link'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../../store'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const MainLayout = ({ children }: propTypes) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Header className=" ecom-header">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <Link href={'/'}>
                <a className={Styles.logo}>E-COM</a>
              </Link>
              <Navbar />
            </div>
          </div>
        </Header>

        <Content className={Styles.site_layout}>
          <div className="container">
            <Breadcrumb style={{ marginTop: 20 }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className={Styles.main_content_wrapper}>{children}</div>
        </Content>

        <Footer style={{ textAlign: 'center', background: '#fafafa' }}>
          <Link href={'https://arrayinobject.com'}>
            <a data-testid="gulu" style={{ color: '#111' }} target="_blank">
              arrayinobject.com
            </a>
          </Link>
        </Footer>
      </Layout>
    </PersistGate>
  </Provider>
)

export default MainLayout
