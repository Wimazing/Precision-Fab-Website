import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload, Zap, Shield, Award } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import heroImage from '../assets/cad-design-hero.jpg'

const Home = () => {
  const { t, formatCurrency } = useLanguage()

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('home.heroTitle')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  {t('home.heroTitleHighlight')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link to="/quote" className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>{t('home.uploadFile')}</span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/portfolio" className="flex items-center space-x-2">
                    <span>{t('home.viewPortfolio')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="CAD Design and 3D Printing" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: t('home.stats.projectsCompleted') },
              { number: '20+', label: t('home.stats.yearsExperience') },
              { number: '98%', label: t('home.stats.clientSatisfaction') },
              { number: '24h', label: t('home.stats.averageTurnaround') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t('home.process.title')}
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              {t('home.process.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: '1', 
                title: t('home.process.steps.upload.title'), 
                description: t('home.process.steps.upload.description'), 
                icon: Upload 
              },
              { 
                step: '2', 
                title: t('home.process.steps.quote.title'), 
                description: t('home.process.steps.quote.description'), 
                icon: Zap 
              },
              { 
                step: '3', 
                title: t('home.process.steps.production.title'), 
                description: t('home.process.steps.production.description'), 
                icon: Shield 
              },
              { 
                step: '4', 
                title: t('home.process.steps.delivery.title'), 
                description: t('home.process.steps.delivery.description'), 
                icon: Award 
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t('services.printing3d.title'),
                description: t('services.printing3d.description'),
                icon: '🖨️',
                features: t('services.printing3d.features')
              },
              {
                title: t('services.laserEngraving.title'),
                description: t('services.laserEngraving.description'),
                icon: '⚡',
                features: t('services.laserEngraving.features')
              },
              {
                title: t('services.laserCutting.title'),
                description: t('services.laserCutting.description'),
                icon: '✂️',
                features: t('services.laserCutting.features')
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/services" className="flex items-center space-x-2">
                <span>{t('nav.services')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your file now and get an instant quote. No commitments, just transparent pricing.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/quote" className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>{t('nav.instantQuote')}</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home

