import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calculator, Loader2, AlertCircle, CheckCircle, Euro } from 'lucide-react'
import apiService from '../services/api'

const RealCostCalculator = ({ fileData, serviceType, onQuoteCalculated }) => {
  const [parameters, setParameters] = useState({})
  const [calculating, setCalculating] = useState(false)
  const [pricing, setPricing] = useState(null)
  const [error, setError] = useState(null)

  // Service-specific parameter configurations
  const parameterConfigs = {
    '3d_printing': {
      material: {
        label: 'Material',
        type: 'select',
        options: [
          { value: 'pla', label: 'PLA (Standard)', multiplier: 1.0 },
          { value: 'abs', label: 'ABS (Durable)', multiplier: 1.2 },
          { value: 'petg', label: 'PETG (Chemical Resistant)', multiplier: 1.4 },
          { value: 'tpu', label: 'TPU (Flexible)', multiplier: 2.0 },
          { value: 'resin', label: 'Resin (High Detail)', multiplier: 1.8 },
          { value: 'peek', label: 'PEEK (Industrial)', multiplier: 5.0 }
        ],
        default: 'pla'
      },
      infill: {
        label: 'Infill Density (%)',
        type: 'range',
        min: 10,
        max: 100,
        step: 5,
        default: 20
      },
      layer_height: {
        label: 'Layer Height (mm)',
        type: 'select',
        options: [
          { value: 0.1, label: '0.1mm (Ultra Fine)' },
          { value: 0.15, label: '0.15mm (Fine)' },
          { value: 0.2, label: '0.2mm (Standard)' },
          { value: 0.25, label: '0.25mm (Fast)' },
          { value: 0.3, label: '0.3mm (Draft)' }
        ],
        default: 0.2
      },
      quality: {
        label: 'Quality Level',
        type: 'select',
        options: [
          { value: 'draft', label: 'Draft (Fast & Economical)' },
          { value: 'standard', label: 'Standard (Balanced)' },
          { value: 'high', label: 'High (Detailed)' },
          { value: 'ultra', label: 'Ultra (Maximum Detail)' }
        ],
        default: 'standard'
      },
      support_material: {
        label: 'Support Material',
        type: 'checkbox',
        default: false
      },
      quantity: {
        label: 'Quantity',
        type: 'number',
        min: 1,
        max: 100,
        default: 1
      }
    },
    'laser_engraving': {
      material: {
        label: 'Material',
        type: 'select',
        options: [
          { value: 'wood', label: 'Wood', multiplier: 1.0 },
          { value: 'acrylic', label: 'Acrylic', multiplier: 1.3 },
          { value: 'metal', label: 'Metal', multiplier: 2.5 },
          { value: 'leather', label: 'Leather', multiplier: 1.5 },
          { value: 'cardboard', label: 'Cardboard', multiplier: 0.5 }
        ],
        default: 'wood'
      },
      area: {
        label: 'Engraving Area (cm²)',
        type: 'number',
        min: 1,
        max: 1000,
        step: 0.1,
        default: 10
      },
      depth: {
        label: 'Engraving Depth (mm)',
        type: 'range',
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.5
      },
      complexity: {
        label: 'Design Complexity',
        type: 'select',
        options: [
          { value: 'low', label: 'Low (Simple text/shapes)' },
          { value: 'medium', label: 'Medium (Detailed graphics)' },
          { value: 'high', label: 'High (Complex artwork)' },
          { value: 'very_high', label: 'Very High (Photo engraving)' }
        ],
        default: 'medium'
      },
      quantity: {
        label: 'Quantity',
        type: 'number',
        min: 1,
        max: 1000,
        default: 1
      }
    },
    'laser_cutting': {
      material: {
        label: 'Material',
        type: 'select',
        options: [
          { value: 'mdf', label: 'MDF', multiplier: 0.8 },
          { value: 'plywood', label: 'Plywood', multiplier: 1.1 },
          { value: 'acrylic', label: 'Acrylic', multiplier: 1.3 },
          { value: 'aluminum', label: 'Aluminum', multiplier: 2.0 },
          { value: 'stainless_steel', label: 'Stainless Steel', multiplier: 3.0 }
        ],
        default: 'mdf'
      },
      cut_length: {
        label: 'Cut Length (cm)',
        type: 'number',
        min: 1,
        max: 10000,
        step: 0.1,
        default: 100
      },
      thickness: {
        label: 'Material Thickness (mm)',
        type: 'range',
        min: 1,
        max: 20,
        step: 0.5,
        default: 3
      },
      complexity: {
        label: 'Cut Complexity',
        type: 'select',
        options: [
          { value: 'low', label: 'Low (Simple shapes)' },
          { value: 'medium', label: 'Medium (Moderate detail)' },
          { value: 'high', label: 'High (Intricate patterns)' },
          { value: 'very_high', label: 'Very High (Ultra-fine detail)' }
        ],
        default: 'medium'
      },
      quantity: {
        label: 'Quantity',
        type: 'number',
        min: 1,
        max: 1000,
        default: 1
      }
    }
  }

  // Initialize parameters when service type changes
  useEffect(() => {
    if (serviceType && parameterConfigs[serviceType]) {
      const config = parameterConfigs[serviceType]
      const initialParams = {}
      
      Object.keys(config).forEach(key => {
        initialParams[key] = config[key].default
      })

      // Use file info to set intelligent defaults
      if (fileData?.info) {
        const info = fileData.info
        
        if (serviceType === '3d_printing' && info.estimated_volume) {
          initialParams.volume = info.estimated_volume
        }
        
        if (info.complexity) {
          initialParams.complexity = info.complexity
        }
      }

      setParameters(initialParams)
      setPricing(null)
      setError(null)
    }
  }, [serviceType, fileData])

  // Handle parameter changes
  const handleParameterChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Calculate pricing
  const calculatePricing = async () => {
    if (!fileData || !serviceType) {
      setError('Please upload a file and select a service first')
      return
    }

    setCalculating(true)
    setError(null)

    try {
      const quoteData = {
        file_id: fileData.id,
        service_type: serviceType,
        parameters: {
          ...parameters,
          // Add file-derived parameters
          ...(fileData.info?.estimated_volume && { volume: fileData.info.estimated_volume }),
          ...(fileData.info?.complexity && { file_complexity: fileData.info.complexity })
        }
      }

      const response = await apiService.calculateQuote(quoteData)
      setPricing(response.pricing)
      
      if (onQuoteCalculated) {
        onQuoteCalculated(response.pricing, parameters)
      }

    } catch (error) {
      console.error('Pricing calculation failed:', error)
      setError(error.message || 'Failed to calculate pricing. Please try again.')
    } finally {
      setCalculating(false)
    }
  }

  // Render parameter input
  const renderParameterInput = (key, config) => {
    const value = parameters[key]

    switch (config.type) {
      case 'select':
        return (
          <select
            value={value || config.default}
            onChange={(e) => handleParameterChange(key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {config.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value || config.default}
              onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 text-center">
              {value || config.default} {config.unit || ''}
            </div>
          </div>
        )

      case 'number':
        return (
          <input
            type="number"
            min={config.min}
            max={config.max}
            step={config.step || 1}
            value={value || config.default}
            onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || config.default}
              onChange={(e) => handleParameterChange(key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Required</span>
          </label>
        )

      default:
        return null
    }
  }

  if (!serviceType) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a service to configure pricing parameters
      </div>
    )
  }

  const config = parameterConfigs[serviceType]
  if (!config) {
    return (
      <div className="text-center py-8 text-red-500">
        Service configuration not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Parameters Configuration */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(config).map(([key, paramConfig]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {paramConfig.label}
            </label>
            {renderParameterInput(key, paramConfig)}
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <Button
          onClick={calculatePricing}
          disabled={calculating || !fileData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
        >
          {calculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Price
            </>
          )}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Pricing Results */}
      {pricing && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Pricing Calculated</h3>
          </div>

          {/* Pricing Breakdown */}
          {pricing.breakdown && (
            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-gray-700">Cost Breakdown:</h4>
              <ul className="space-y-1 text-sm">
                {Object.entries(pricing.breakdown).map(([item, cost]) => 
                  cost && (
                    <li key={item} className="flex justify-between">
                      <span className="text-gray-600">{item}:</span>
                      <span className="font-medium">{cost}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Total Cost */}
          <div className="border-t border-green-200 pt-4">
            <div className="flex items-center justify-between text-xl font-bold text-green-800">
              <span>Total Cost:</span>
              <div className="flex items-center space-x-1">
                <Euro className="w-5 h-5" />
                <span>{pricing.total_cost?.toFixed(2)}</span>
              </div>
            </div>
            
            {pricing.quantity > 1 && (
              <div className="text-sm text-gray-600 mt-1">
                €{pricing.cost_per_unit?.toFixed(2)} per unit × {pricing.quantity} units
              </div>
            )}

            {pricing.discount_amount > 0 && (
              <div className="text-sm text-green-600 mt-1">
                You saved €{pricing.discount_amount?.toFixed(2)} ({pricing.discount_percentage}% discount)
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-green-200 text-sm text-gray-600">
            {pricing.estimated_print_time_hours && (
              <p>Estimated production time: {pricing.estimated_print_time_hours} hours</p>
            )}
            {pricing.estimated_time_minutes && (
              <p>Estimated production time: {pricing.estimated_time_minutes} minutes</p>
            )}
            <p className="text-xs mt-2 text-gray-500">
              * Prices are estimates and may vary based on final specifications. 
              Valid for 30 days from calculation date.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealCostCalculator

