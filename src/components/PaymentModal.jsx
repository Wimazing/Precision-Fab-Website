import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { X, CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import apiService from '../services/api'

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_...')

const PaymentForm = ({ order, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { t, formatCurrency } = useLanguage()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await apiService.createPaymentIntent({
          order_id: order.id
        })
        setClientSecret(response.client_secret)
      } catch (error) {
        console.error('Failed to create payment intent:', error)
        setError('Failed to initialize payment. Please try again.')
      }
    }

    if (order?.id) {
      createPaymentIntent()
    }
  }, [order])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setProcessing(true)
    setError('')

    const cardElement = elements.getElement(CardElement)

    // Confirm payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: order.customer_name,
            email: order.customer_email,
          },
        },
      }
    )

    if (stripeError) {
      setError(stripeError.message)
      setProcessing(false)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      try {
        // Confirm payment with our backend
        await apiService.confirmPayment({
          payment_intent_id: paymentIntent.id
        })
        
        onSuccess(paymentIntent)
      } catch (error) {
        console.error('Failed to confirm payment:', error)
        setError('Payment succeeded but confirmation failed. Please contact support.')
      }
    }

    setProcessing(false)
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{t('quote.quoteSummary')}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t('quote.service')}:</span>
            <span className="font-medium">{order.service_type?.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('quote.file')}:</span>
            <span className="font-medium">{order.original_filename}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-blue-800 border-t border-gray-200 pt-2">
            <span>{t('quote.totalCost')}:</span>
            <span>{formatCurrency(order.total_cost)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <CreditCard className="w-4 h-4 inline mr-2" />
          {t('payment.cardDetails')}
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <Button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {processing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t('payment.processing')}
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            {t('payment.payNow')} {formatCurrency(order.total_cost)}
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="text-xs text-gray-500 text-center">
        <p>{t('payment.securityNotice')}</p>
      </div>
    </form>
  )
}

const PaymentModal = ({ isOpen, onClose, order, onPaymentSuccess }) => {
  const { t } = useLanguage()
  const [paymentStatus, setPaymentStatus] = useState('form') // 'form', 'success', 'error'
  const [paymentResult, setPaymentResult] = useState(null)

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentStatus('success')
    setPaymentResult(paymentIntent)
    if (onPaymentSuccess) {
      onPaymentSuccess(paymentIntent)
    }
  }

  const handlePaymentError = (error) => {
    setPaymentStatus('error')
    console.error('Payment error:', error)
  }

  const handleClose = () => {
    setPaymentStatus('form')
    setPaymentResult(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {paymentStatus === 'success' ? t('payment.paymentSuccess') : t('payment.securePayment')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStatus === 'form' && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                order={order}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {t('payment.paymentSuccessful')}
                </h3>
                <p className="text-gray-600">
                  {t('payment.paymentSuccessMessage')}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>{t('payment.transactionId')}:</span>
                    <span className="font-mono text-xs">{paymentResult?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('payment.amount')}:</span>
                    <span className="font-bold">{order && formatCurrency(order.total_cost)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {t('payment.nextSteps')}
                </p>
                
                <Button
                  onClick={handleClose}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t('common.continue')}
                </Button>
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">
                  {t('payment.paymentFailed')}
                </h3>
                <p className="text-gray-600">
                  {t('payment.paymentFailedMessage')}
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setPaymentStatus('form')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t('common.tryAgain')}
                </Button>
                
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full"
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal

