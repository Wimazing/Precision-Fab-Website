import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Users, Clock, Shield, User } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Maintaining the highest standards in every project, ensuring precision and reliability in all fabrication services.'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Understanding the importance of deadlines and consistently delivering projects on time without compromising quality.'
    },
    {
      icon: Shield,
      title: 'Trusted Partner',
      description: 'Building long-term relationships with clients through transparency, reliability, and exceptional service.'
    },
    {
      icon: User,
      title: 'Personal Touch',
      description: 'Direct communication with the founder ensures your project gets the attention and expertise it deserves.'
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Precision Fab
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for precision CAD design, 3D printing, and laser fabrication services. 
              Founded and operated by Glenn Houkes since 2003.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2003 by Glenn Houkes, Precision Fab began as a vision to bridge the gap 
                  between innovative ideas and physical reality. What started as a one-person CAD design 
                  consultancy has evolved into a comprehensive fabrication service provider.
                </p>
                <p>
                  Over the past two decades, Glenn has continuously evolved with technology, adding 
                  state-of-the-art 3D printing and laser fabrication capabilities to the services. 
                  His commitment to precision, quality, and customer satisfaction has remained constant 
                  throughout this growth.
                </p>
                <p>
                  Today, Precision Fab serves clients across Europe, from individual inventors and 
                  startups to established corporations, helping them bring their concepts to life with 
                  comprehensive design and manufacturing services.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">20+</div>
                  <div className="text-gray-700">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">500+</div>
                  <div className="text-gray-700">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-700">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24h</div>
                  <div className="text-gray-700">Avg. Turnaround</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define our commitment to excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Founder
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professional dedicated to bringing your projects to life with precision and expertise
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Glenn Houkes
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  Founder & Lead Engineer
                </p>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Experience:</strong> 20+ years in mechanical engineering and fabrication</p>
                  <p><strong>Specialization:</strong> CAD Design, 3D Printing, Laser Fabrication</p>
                  <p><strong>Education:</strong> Mechanical Engineering</p>
                  <p><strong>Expertise:</strong> Product Development, Manufacturing Optimization</p>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "I founded Precision Fab with a simple mission: to help innovators and businesses 
                    bring their ideas to life with precision, quality, and personal attention. Every 
                    project is important to me, and I'm personally involved in ensuring the best results."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Equipment */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art equipment and software ensuring the highest quality results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CAD Software</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SolidWorks Professional</li>
                <li>• AutoCAD Mechanical</li>
                <li>• Fusion 360</li>
                <li>• KeyShot Rendering</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Printers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Ultimaker S5 Pro Bundle</li>
                <li>• Formlabs Form 3L</li>
                <li>• Markforged X7</li>
                <li>• Stratasys F370</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Laser Systems</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Trotec Speedy 400</li>
                <li>• Universal Laser VLS6.60</li>
                <li>• Epilog Fusion Pro 48</li>
                <li>• Fiber Laser Marking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project and see how Glenn can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/quote" className="flex items-center space-x-2">
                <span>Get Quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <a href="/contact" className="flex items-center space-x-2">
                <span>Contact Glenn</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

