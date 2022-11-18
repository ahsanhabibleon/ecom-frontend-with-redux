import { Badge, Button, notification } from 'antd';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, selectCart } from '../../store/reducers/cartReducer';
import { ProductDataTypes } from '../ProductList/ProductList.types'
import Styles from './ProductSingle.module.scss'

const ProductSingle = (props: { product: ProductDataTypes | null, className?: string }) => {
    const { product, className } = props;
    // @ts-ignore

    const dispatch = useDispatch()

    const { cartItems } = useSelector(selectCart)

    const handleClick = (event: any) => {
        event.preventDefault();
        const existedItem = cartItems?.find((c: ProductDataTypes) => c._id === product?._id)
        const quantity = existedItem ? ((existedItem?.quantity || 0) + 1) : 1

        if (!product?.countInStock || (product?.countInStock < quantity)) {
            notification.error({
                message: 'Sorry, product is out of stock!'
            })
            return;
        }
        dispatch(addItemToCart({ ...product, quantity }))
    }

    const badgeColor = !product?.countInStock ? 'red' : product?.countInStock < 6 ? 'purple' : 'green'
    const badgeText = !product?.countInStock ? 'Out of Stock' : product?.countInStock < 6 ? 'Limited Stock' : 'In Stock'

    return (
        <div className={Styles.product_card + ` ${className && className}`}>

            <Badge.Ribbon text={badgeText} color={badgeColor}>
                <Link href={`/product-details/${product?.slug}`}>
                    <a>
                        <div className={Styles.img_container}>
                            {product?.image && <img src={product?.image} alt={product?.name || ''} />}
                        </div>
                        <div className={Styles.text_content}>
                            <h4>{product?.name || 'Product Name'}</h4>
                            <p>{product?.description || "Description not available."}</p>
                            <h5>${product?.price || '---'}</h5>
                            {product && product?.countInStock > 0 ?
                                <Button onClick={(event) => handleClick(event)}>
                                    Add to cart
                                </Button>
                                : <Button disabled>Out of Stock</Button>}
                        </div>
                    </a>
                </Link>
            </Badge.Ribbon>
        </div>

    )
}

export default ProductSingle
