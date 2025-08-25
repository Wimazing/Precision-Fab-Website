import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calculator, Info } from 'lucide-react'

const CostCalculator = ({ file, serviceType }) => {
  const [parameters, setParameters] = useState({
    // 3D Printing parameters
    volume: 50, // cm³
    material: 'PLA',
    printTime: 2, // hours
    infill: 20, // percentage
    layerHeight: 0.2, // mm
    
    // Laser Engraving parameters
    engravingArea: 100, // cm²
    engravingMaterial: 'wood',
    engravingTime: 30, // minutes
    complexity: 'medium',
    
    // Laser Cutting parameters
    cutLength: 150, // cm
    cuttingMaterial: 'MDF',
    thickness: 4, // mm
  })

  const [cost, setCost] = useState(0)
  const [breakdown, setBreakdown] = useState({})

  // Material rates and pricing constants
  const pricing = {
    '3d_printing': {
      materials: {
        'PLA': { rate: 0.12, name: 'PLA' },
        'ABS': { rate: 0.15, name: 'ABS' },
        'PETG': { rate: 0.18, name: 'PETG' },
        'Resin': { rate: 0.25, name: 'Resin' }
      },
      machineRate: 5, // €/hour
      setupFee: 5,
      complexityFactors: {
        'low': 1.0,
        'medium': 1.15,
        'high': 1.25
      }
    },
    'laser_engraving': {
      materials: {
        'wood': { rate: 0.05, name: 'Wood' },
        'acrylic': { rate: 0.08, name: 'Acrylic' },
        'metal': { rate: 0.15, name: 'Metal' }
      },
      machineRate: 0.75, // €/minute
      setupFee: 5,
      complexityFactors: {
        'simple': 1.0,
        'medium': 1.10,
        'complex': 1.20
      }
    },
    'laser_cutting': {
      materials: {
        'MDF': { rate: 0.03, name: 'MDF' },
        'Acrylic': { rate: 0.05, name: 'Acrylic' },
        'Metal': { rate: 0.15, name: 'Metal' }
      },
      machineRate: 8, // €/hour base
      setupFee: 5,
      thicknessFactor: 0.10 // 10% per 2mm
    }
  }

  const calculate3DPrintingCost = () => {
    const materialRate = pricing['3d_printing'].materials[parameters.material].rate
    const machineRate = pricing['3d_printing'].machineRate
    const setupFee = pricing['3d_printing'].setupFee
    
    // Determine complexity based on infill and layer height
    let complexityFactor = 1.0
    if (parameters.infill > 50 || parameters.layerHeight < 0.15) {
      complexityFactor = 1.25 // high
    } else if (parameters.infill > 25 || parameters.layerHeight < 0.2) {
      complexityFactor = 1.15 // medium
    }

    const materialCost = parameters.volume * materialRate
    const machineCost = parameters.printTime * machineRate
    const subtotal = setupFee + materialCost + machineCost
    const complexityCost = subtotal * (complexityFactor - 1)
    const total = subtotal + complexityCost

    return {
      setupFee,
      materialCost,
      machineCost,
      complexityCost,
      total,
      breakdown: {
        'Setup Fee': `€${setupFee.toFixed(2)}`,
        'Material Cost': `€${materialCost.toFixed(2)} (${parameters.volume}cm³ × €${materialRate}/cm³)`,
        'Machine Time': `€${machineCost.toFixed(2)} (${parameters.printTime}h × €${machineRate}/h)`,
        'Complexity Factor': `€${complexityCost.toFixed(2)} (+${((complexityFactor - 1) * 100).toFixed(0)}%)`,
        'Total': `€${total.toFixed(2)}`
      }
    }
  }

  const calculateLaserEngravingCost = () => {
    const materialRate = pricing['laser_engraving'].materials[parameters.engravingMaterial].rate
    const machineRate = pricing['laser_engraving'].machineRate
    const setupFee = pricing['laser_engraving'].setupFee
    const complexityFactor = pricing['laser_engraving'].complexityFactors[parameters.complexity]

    const materialCost = parameters.engravingArea * materialRate
    const machineCost = parameters.engravingTime * machineRate
    const subtotal = setupFee + materialCost + machineCost
    const complexityCost = subtotal * (complexityFactor - 1)
    const total = subtotal + complexityCost

    return {
      setupFee,
      materialCost,
      machineCost,
      complexityCost,
      total,
      breakdown: {
        'Setup Fee': `€${setupFee.toFixed(2)}`,
        'Material Cost': `€${materialCost.toFixed(2)} (${parameters.engravingArea}cm² × €${materialRate}/cm²)`,
        'Machine Time': `€${machineCost.toFixed(2)} (${parameters.engravingTime}min × €${machineRate}/min)`,
        'Complexity Factor': `€${complexityCost.toFixed(2)} (+${((complexityFactor - 1) * 100).toFixed(0)}%)`,
        'Total': `€${total.toFixed(2)}`
      }
    }
  }

  const calculateLaserCuttingCost = () => {
    const materialRate = pricing['laser_cutting'].materials[parameters.cuttingMaterial].rate
    const machineRate = pricing['laser_cutting'].machineRate
    const setupFee = pricing['laser_cutting'].setupFee
    const thicknessFactor = pricing['laser_cutting'].thicknessFactor

    const materialCost = parameters.cutLength * materialRate
    const thicknessMultiplier = 1 + (Math.floor(parameters.thickness / 2) * thicknessFactor)
    const machineCost = machineRate * thicknessMultiplier
    const total = setupFee + materialCost + machineCost

    return {
      setupFee,
      materialCost,
      machineCost: machineCost,
      thicknessMultiplier,
      total,
      breakdown: {
        'Setup Fee': `€${setupFee.toFixed(2)}`,
        'Material Cost': `€${materialCost.toFixed(2)} (${parameters.cutLength}cm × €${materialRate}/cm)`,
        'Machine Cost': `€${machineCost.toFixed(2)} (Base €${machineRate} × ${thicknessMultiplier.toFixed(2)} thickness factor)`,
        'Total': `€${total.toFixed(2)}`
      }
    }
  }

  useEffect(() => {
    let result
    switch (serviceType) {
      case '3d_printing':
        result = calculate3DPrintingCost()
        break
      case 'laser_engraving':
        result = calculateLaserEngravingCost()
        break
      case 'laser_cutting':
        result = calculateLaserCuttingCost()
        break
      default:
        result = { total: 0, breakdown: {} }
    }
    setCost(result.total)
    setBreakdown(result.breakdown)
  }, [parameters, serviceType])

  const updateParameter = (key, value) => {
    setParameters(prev => ({ ...prev, [key]: value }))
  }

  const renderParameterInputs = () => {
    switch (serviceType) {
      case '3d_printing':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume (cm³)
                </label>
                <input
                  type="number"
                  value={parameters.volume}
                  onChange={(e) => updateParameter('volume', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <select
                  value={parameters.material}
                  onChange={(e) => updateParameter('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(pricing['3d_printing'].materials).map(([key, material]) => (
                    <option key={key} value={key}>{material.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Print Time (hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={parameters.printTime}
                  onChange={(e) => updateParameter('printTime', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Infill (%)
                </label>
                <input
                  type="number"
                  value={parameters.infill}
                  onChange={(e) => updateParameter('infill', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 'laser_engraving':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engraving Area (cm²)
                </label>
                <input
                  type="number"
                  value={parameters.engravingArea}
                  onChange={(e) => updateParameter('engravingArea', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <select
                  value={parameters.engravingMaterial}
                  onChange={(e) => updateParameter('engravingMaterial', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(pricing['laser_engraving'].materials).map(([key, material]) => (
                    <option key={key} value={key}>{material.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engraving Time (minutes)
                </label>
                <input
                  type="number"
                  value={parameters.engravingTime}
                  onChange={(e) => updateParameter('engravingTime', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity
                </label>
                <select
                  value={parameters.complexity}
                  onChange={(e) => updateParameter('complexity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="simple">Simple</option>
                  <option value="medium">Medium</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'laser_cutting':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cut Length (cm)
                </label>
                <input
                  type="number"
                  value={parameters.cutLength}
                  onChange={(e) => updateParameter('cutLength', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <select
                  value={parameters.cuttingMaterial}
                  onChange={(e) => updateParameter('cuttingMaterial', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(pricing['laser_cutting'].materials).map(([key, material]) => (
                    <option key={key} value={key}>{material.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thickness (mm)
                </label>
                <input
                  type="number"
                  value={parameters.thickness}
                  onChange={(e) => updateParameter('thickness', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )

      default:
        return <div>Please select a service type</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Cost Calculator</h3>
      </div>

      {renderParameterInputs()}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Cost Breakdown</h4>
        <div className="space-y-2">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}:</span>
              <span className={key === 'Total' ? 'font-bold text-blue-600' : 'text-gray-900'}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> Deze prijsberekening is een indicatie. 
            Na beoordeling van uw bestand ontvangt u een definitieve offerte.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Proceed with Order
        </Button>
      </div>
    </div>
  )
}

export default CostCalculator

