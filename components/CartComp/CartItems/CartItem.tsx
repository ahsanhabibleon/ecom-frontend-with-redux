import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Popconfirm } from "antd";
import Image from "next/image"
import { addItemToCart, removeItemFromCart, updateQuantity } from "../../../store/reducers/cartReducer";
import Styles from './CartItem.module.scss';
import { PropObjTypes } from "./CartItem.types";

const CartItem = ({ propObj, forPreview = false }: { propObj: PropObjTypes, forPreview?: boolean }) => {

    const { item, dispatch } = propObj

    console.log({ item })

    const handleRemoveItem = () => {
        dispatch(removeItemFromCart({ id: item._id }))
    };

    const handleUpdateQuantity = (param: string) => {
        const newItem = { ...item };
        if (newItem?.quantity || newItem?.quantity === 0) {
            if (param === 'decrement' && newItem.quantity > 0) {
                dispatch(updateQuantity({
                    id: newItem?._id,
                    quantity: -1
                }))

            }
            if (param === 'increment') {
                dispatch(updateQuantity({
                    id: newItem?._id,
                    quantity: 1
                }))
            }
        }
    }

    return (
        <div className={Styles.cart_item} key={item._id} >
            <div className={Styles.img_container}>
                {item?.image ? <Image src={item.image} alt={item.name} width={50} height={50} /> : 'No image'}
            </div>
            <div className={Styles.item_name}>{item?.name || ''}</div>
            {forPreview && <span>{item.quantity}</span>}
            <div className={Styles.item_price}>${item?.price || 'Not available'}</div>
            {!forPreview &&
                <>
                    <div className={Styles.item_quantity}>
                        <span className={!item?.quantity || item?.quantity < 2 ? 'disabled' : ''} onClick={() => handleUpdateQuantity('decrement')}>
                            <MinusOutlined />
                        </span>
                        <span>{item.quantity}</span>
                        <span className={(item?.quantity || item?.quantity === 0) && item?.quantity < item.countInStock ? '' : 'disabled'} onClick={() => handleUpdateQuantity('increment')}>
                            <PlusOutlined />
                        </span>
                    </div>
                    <Popconfirm
                        className={Styles.remove_icon}
                        title="Remove this item from cart?"
                        placement="topRight"
                        onConfirm={handleRemoveItem}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </>
            }
        </div>
    )
}

export default CartItem