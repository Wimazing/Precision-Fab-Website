import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our simple 4-step process from concept to delivery.
          </p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link to="/quote">Start Your Project</Link>
          </Button>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600">Detailed process timeline coming soon...</p>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks

