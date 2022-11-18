import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
// import { APP_BASE_API } from "../../api";
import { Button } from "antd";
import Styles from './CheckoutForm.module.scss'

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>(false);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:3000/payment-status'
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form className={Styles.payment_form} id="payment-form" onSubmit={handleSubmit}>
            <div className={Styles.stripe_element_wrapper}>
                <PaymentElement id="payment-element" />
                <Button htmlType="submit" type="primary" loading={isLoading} disabled={isLoading || !stripe || !elements} style={{ marginTop: 10 }}>
                    <span id="button-text">
                        Pay now
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </div>
        </form>
    );
}
