import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Carousel } from 'antd'
import Styles from './Banner.module.scss'
import { bannerData } from './data'
import axios from 'axios'

const Banner = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const handleClick = async () => {
    axios
      .get(`/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data?.data)
      })
      .catch((error) => {
        console.log({ error })
      })
  }
  return (
    <div className={Styles.banner_wrapper}>
      <div className="container">
        <button role="button" onClick={handleClick}>
          Click me
        </button>
        <Carousel autoplay>
          {bannerData.map((ban) => (
            <div key={ban.key}>
              <div
                className={Styles.banner}
                style={{ backgroundImage: `url(${ban?.backgroundImg})` }}
              >
                <div className={Styles.banner_content}>
                  <h1>{ban?.title || 'Banner Title'}</h1>
                  <Button href="#product-list">
                    Explore
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Banner
