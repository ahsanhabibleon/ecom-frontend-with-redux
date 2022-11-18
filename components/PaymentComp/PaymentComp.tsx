import { Button, Radio, RadioChangeEvent } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod, selectCart } from '../../store/reducers/cartReducer'
import Styles from './PaymentComp.module.scss'

const PaymentComp = () => {
    const router = useRouter()
    // @ts-ignore
    const { paymentMethod: _paymentMethod } = useSelector(selectCart)
    const [paymentMethod, setPaymentMethod] = useState(_paymentMethod || 'bkash')

    const dispatch = useDispatch()

    const handlePaymentMethod = ({ target: { value } }: RadioChangeEvent) => {
        setPaymentMethod(value);
    };
    const handleProceedToPayment = () => {
        dispatch(savePaymentMethod(paymentMethod))
        router.push('/review-order')
    };

    useEffect(() => {
        setPaymentMethod(paymentMethod || 'bkash')
    }, [_paymentMethod])

    return (
        <div className='login_register_form' style={{ maxWidth: 500 }}>
            <h1>Choose payment method:</h1>

            <Radio.Group onChange={handlePaymentMethod} value={paymentMethod}>
                <Radio value="bkash">Bkash</Radio>
                <Radio value="stripe">Stripe</Radio>
                <Radio value='card'>Credit/debit Cart</Radio>
            </Radio.Group>

            <div className={Styles.btn}>
                <Button onClick={handleProceedToPayment} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: "#333" }}>
                    Proceed to Payment
                </Button>
            </div>
        </div>
    )
}

export default PaymentComp
