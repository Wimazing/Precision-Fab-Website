import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Euro, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RealFileUpload from '../components/RealFileUpload'
import RealCostCalculator from '../components/RealCostCalculator'
import apiService from '../services/api'

const InstantQuote = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [pricing, setPricing] = useState(null)
  const [parameters, setParameters] = useState({})
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [quoteCreated, setQuoteCreated] = useState(null)

  const services = [
    {
      id: '3d_printing',
      name: '3D Printing',
      description: 'High-quality 3D prints in various materials',
      icon: '🖨️',
      acceptedFiles: ['.stl', '.obj', '.ply'],
      features: ['Multiple materials', 'Various layer heights', 'Support structures', 'Post-processing']
    },
    {
      id: 'laser_engraving',
      name: 'Laser Engraving',
      description: 'Precision engraving on multiple materials',
      icon: '⚡',
      acceptedFiles: ['.svg', '.dxf', '.pdf'],
      features: ['Wood, metal, acrylic', 'Variable depth', 'High precision', 'Custom designs']
    },
    {
      id: 'laser_cutting',
      name: 'Laser Cutting',
      description: 'Accurate cutting for various materials',
      icon: '✂️',
      acceptedFiles: ['.svg', '.dxf', '.dwg'],
      features: ['Multiple materials', 'Clean edges', 'Complex shapes', 'Batch processing']
    }
  ]

  const steps = [
    { number: 1, title: 'Select Service', description: 'Choose your fabrication service' },
    { number: 2, title: 'Upload File', description: 'Upload your design file' },
    { number: 3, title: 'Configure & Price', description: 'Set parameters and get pricing' },
    { number: 4, title: 'Customer Info', description: 'Provide your contact details' },
    { number: 5, title: 'Quote Complete', description: 'Review and confirm your quote' }
  ]

  // Handle service selection
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId)
    setCurrentStep(2)
  }

  // Handle file upload
  const handleFileUploaded = (fileData) => {
    setUploadedFile(fileData)
    setCurrentStep(3)
  }

  // Handle file removal
  const handleFileRemoved = () => {
    setUploadedFile(null)
    setPricing(null)
    setParameters({})
  }

  // Handle quote calculation
  const handleQuoteCalculated = (pricingData, params) => {
    setPricing(pricingData)
    setParameters(params)
  }

  // Handle customer info change
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Proceed to customer info
  const proceedToCustomerInfo = () => {
    if (pricing) {
      setCurrentStep(4)
    }
  }

  // Submit quote request
  const submitQuote = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Please provide your name and email address')
      return
    }

    setSubmitting(true)

    try {
      const quoteData = {
        file_id: uploadedFile.id,
        original_filename: uploadedFile.name,
        service_type: selectedService,
        parameters: parameters,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_company: customerInfo.company
      }

      const response = await apiService.createQuote(quoteData)
      setQuoteCreated(response.quote)
      setCurrentStep(5)

    } catch (error) {
      console.error('Quote submission failed:', error)
      alert('Failed to create quote. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Reset quote process
  const startNewQuote = () => {
    setCurrentStep(1)
    setSelectedService('')
    setUploadedFile(null)
    setPricing(null)
    setParameters({})
    setCustomerInfo({ name: '', email: '', phone: '', company: '' })
    setQuoteCreated(null)
  }

  // Get current service info
  const currentService = services.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Your Instant Quote</h1>
          <p className="text-lg text-gray-600">
            Upload your file and get professional pricing in minutes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1]?.title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1]?.description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Choose Your Service</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="text-sm text-gray-500 mb-4">
                        <strong>Accepted files:</strong> {service.acceptedFiles.join(', ')}
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: File Upload */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Upload Your File</h3>
                <p className="text-gray-600">
                  Selected service: <span className="font-semibold text-blue-600">{currentService?.name}</span>
                </p>
              </div>
              
              <RealFileUpload
                onFileUploaded={handleFileUploaded}
                onFileRemoved={handleFileRemoved}
                acceptedTypes={currentService?.acceptedFiles || []}
              />

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Configure & Price */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Configure & Calculate Price</h3>
                <p className="text-gray-600">
                  File: <span className="font-semibold">{uploadedFile?.name}</span>
                </p>
              </div>

              <RealCostCalculator
                fileData={uploadedFile}
                serviceType={selectedService}
                onQuoteCalculated={handleQuoteCalculated}
              />

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change File</span>
                </Button>
                
                {pricing && (
                  <Button
                    onClick={proceedToCustomerInfo}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                  >
                    <span>Continue to Contact Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Customer Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Your Contact Information</h3>
                <p className="text-gray-600">We'll send your quote to this email address</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+31 6 12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerInfo.company}
                    onChange={(e) => handleCustomerInfoChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Quote Summary */}
              {pricing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Quote Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">{currentService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File:</span>
                      <span className="font-medium">{uploadedFile?.name}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-blue-800 border-t border-blue-200 pt-2">
                      <span>Total Cost:</span>
                      <span>€{pricing.total_cost?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Pricing</span>
                </Button>
                
                <Button
                  onClick={submitQuote}
                  disabled={submitting || !customerInfo.name || !customerInfo.email}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Quote...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Create Quote</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Quote Complete */}
          {currentStep === 5 && quoteCreated && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Quote Created Successfully!</h3>
                <p className="text-gray-600">
                  Your quote has been generated and sent to your email address.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-green-800 mb-3">Quote Details</h4>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span>Quote Number:</span>
                    <span className="font-medium">{quoteCreated.quote_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{currentService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-bold text-green-800">€{quoteCreated.total_cost?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="font-medium">
                      {new Date(quoteCreated.expires_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  We'll contact you within 24 hours to discuss your project and next steps.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={startNewQuote}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <span>Get Another Quote</span>
                  </Button>
                  
                  <Button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstantQuote

