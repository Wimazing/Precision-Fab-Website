import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react'
import cadModelingImage from '../assets/cad-modeling.png'
import printingProcessImage from '../assets/3d-printing-process.png'
import laserEngravingImage from '../assets/laser-engraving.jpg'
import laserCuttingImage from '../assets/laser-cutting.jpeg'

const Services = () => {
  const services = [
    {
      id: 'cad',
      title: 'CAD Design',
      subtitle: 'Professional 3D Modeling & Engineering',
      description: 'Transform your concepts into precise 3D models with our expert CAD design services. Our team has 20+ years of experience in mechanical engineering and product design.',
      image: cadModelingImage,
      features: [
        '3D Modeling & Visualization',
        'Technical Drawings & Documentation',
        'Design for Manufacturing (DFM)',
        'Reverse Engineering',
        'Product Optimization',
        'File Format Conversion'
      ],
      applications: [
        'Product Prototyping',
        'Mechanical Components',
        'Consumer Products',
        'Industrial Equipment',
        'Architectural Models',
        'Custom Fixtures'
      ],
      pricing: 'Starting from €50/hour'
    },
    {
      id: '3d-printing',
      title: '3D Printing',
      subtitle: 'High-Precision Additive Manufacturing',
      description: 'State-of-the-art 3D printing services with multiple material options and finishing techniques. From rapid prototyping to small-batch production.',
      image: printingProcessImage,
      features: [
        'Multiple Material Options (PLA, ABS, PETG, Resin)',
        'Layer Heights from 0.1mm to 0.3mm',
        'Support Structure Optimization',
        'Post-Processing & Finishing',
        'Quality Inspection',
        'Fast Turnaround Times'
      ],
      applications: [
        'Functional Prototypes',
        'End-Use Parts',
        'Architectural Models',
        'Medical Devices',
        'Automotive Components',
        'Consumer Products'
      ],
      pricing: 'From €0.12/cm³ + setup fee'
    },
    {
      id: 'laser-engraving',
      title: 'Laser Engraving',
      subtitle: 'Precision Marking & Personalization',
      description: 'High-quality laser engraving services for personalization, branding, and detailed marking on various materials with exceptional precision.',
      image: laserEngravingImage,
      features: [
        'Multi-Material Compatibility',
        'High-Resolution Engraving',
        'Vector & Raster Processing',
        'Custom Depth Control',
        'Batch Processing',
        'Quality Assurance'
      ],
      applications: [
        'Product Branding',
        'Personalized Gifts',
        'Industrial Marking',
        'Signage & Displays',
        'Awards & Trophies',
        'Electronic Enclosures'
      ],
      pricing: 'From €0.05/cm² + setup fee'
    },
    {
      id: 'laser-cutting',
      title: 'Laser Cutting',
      subtitle: 'Precision Material Processing',
      description: 'Advanced laser cutting services for precise material processing. Clean cuts, minimal waste, and excellent edge quality for various materials.',
      image: laserCuttingImage,
      features: [
        'Clean, Precise Cuts',
        'Minimal Heat Affected Zone',
        'Complex Geometry Capability',
        'Automated Nesting',
        'Quality Edge Finishing',
        'Fast Production Times'
      ],
      applications: [
        'Sheet Metal Fabrication',
        'Acrylic Displays',
        'Wooden Components',
        'Gaskets & Seals',
        'Decorative Elements',
        'Prototype Parts'
      ],
      pricing: 'From €0.03/cm cut length'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive fabrication services from concept to completion. 
            We combine cutting-edge technology with expert craftsmanship to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                      {service.subtitle}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                        <ul className="space-y-2">
                          {service.applications.map((application, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{application}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Pricing</h4>
                          <p className="text-2xl font-bold text-blue-600">{service.pricing}</p>
                        </div>
                        <Button asChild className="bg-orange-500 hover:bg-orange-600">
                          <Link to="/quote" className="flex items-center space-x-2">
                            <Calculator className="w-4 h-4" />
                            <span>Calculate Cost</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="rounded-2xl shadow-2xl w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your file now and get an instant quote for any of our services.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/quote" className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Get Instant Quote</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Services

