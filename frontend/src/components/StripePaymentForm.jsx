import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { shopService } from '../services/shopService';

const StripePaymentForm = ({ clientSecret, externalOrderId, totalAmount, onOrderSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        // 1. Confirm the payment with Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required', // We handle navigation manually
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // 2. PAYMENT SUCCESSFUL: Call our Backend Webhook Simulation
            // In a real production app, the S2S Webhook handles this, 
            // but we call it here to finish the "Happy Path" immediately.
            try {
                setTimeout(() => {
                    onOrderSuccess(); // Redirect to /orders
                }, 2000);
            } catch (err) {
                console.error(err);
                setErrorMessage("Payment succeeded but order update failed. Contact support.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {errorMessage && <div className="text-red-500 text-sm font-bold">{errorMessage}</div>}

            <button
                disabled={isProcessing || !stripe || !elements}
                className="w-full bg-orange-600 text-white py-4 font-bold uppercase rounded-sm shadow-lg disabled:bg-gray-400"
            >
                {isProcessing ? "Validating Card..." : `Pay ₹${totalAmount.toLocaleString()}`}
            </button>
        </form>
    );
};

export default StripePaymentForm;