import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Portfolio = () => {
  const { t } = useLanguage()

  const portfolioItems = [
    // 3D Printing Projects (Bambu Lab X1 Carbon)
    {
      id: 1,
      category: '3d_printing',
      title: 'Precision Mechanical Parts',
      description: 'High-precision mechanical components for industrial applications',
      image: '/portfolio/3d-printing-mechanical-parts.jpg',
      equipment: 'Bambu Lab X1 Carbon',
      materials: ['PLA', 'PETG', 'ABS', 'ASA'],
      specs: '±0.1mm tolerance, 0.1mm layer height'
    },
    {
      id: 2,
      category: '3d_printing',
      title: 'Functional Prototypes',
      description: 'Working prototypes for product development and testing',
      image: '/portfolio/3d-printing-functional-parts.jpg',
      equipment: 'Bambu Lab X1 Carbon',
      materials: ['Carbon Fiber', 'Glass Fiber', 'Metal Fill'],
      specs: 'Functional testing ready, multi-material support'
    },
    {
      id: 3,
      category: '3d_printing',
      title: 'Precision Tooling',
      description: 'Custom jigs, fixtures, and manufacturing aids',
      image: '/portfolio/3d-printing-tooling.jpg',
      equipment: 'Bambu Lab X1 Carbon',
      materials: ['PA-CF', 'PC', 'TPU'],
      specs: 'Industrial grade materials, high durability'
    },

    // Laser Cutting Projects (xTool P2S CO2)
    {
      id: 4,
      category: 'laser_cutting',
      title: 'Precision Metal Cutting',
      description: 'Clean, precise cuts in various materials up to 20mm thick',
      image: '/portfolio/laser-cutting-metal.jpg',
      equipment: 'xTool P2S CO2 Laser (55W)',
      materials: ['Acrylic', 'Wood', 'Leather', 'Fabric'],
      specs: '±0.1mm cutting precision, smooth edges'
    },
    {
      id: 5,
      category: 'laser_cutting',
      title: 'Complex Geometric Shapes',
      description: 'Intricate patterns and complex geometries with perfect accuracy',
      image: '/portfolio/laser-cutting-precision.jpg',
      equipment: 'xTool P2S CO2 Laser',
      materials: ['Plywood', 'MDF', 'Cardboard', 'Cork'],
      specs: 'Complex nested cutting, minimal material waste'
    },

    // Laser Engraving Projects (xTool F1 & M1 Ultra)
    {
      id: 6,
      category: 'laser_engraving',
      title: 'Metal Engraving & Marking',
      description: 'Permanent marking on metals with fiber laser precision',
      image: '/portfolio/xtool-f1-fiber-laser.jpg',
      equipment: 'xTool F1 Fiber Laser (20W)',
      materials: ['Stainless Steel', 'Aluminum', 'Brass', 'Titanium'],
      specs: 'Permanent marking, corrosion resistant'
    },
    {
      id: 7,
      category: 'laser_engraving',
      title: 'Wood Engraving & Personalization',
      description: 'Beautiful engravings on wood with variable depth control',
      image: '/portfolio/laser-engraving-wood.jpg',
      equipment: 'xTool M1 Ultra (10W)',
      materials: ['Hardwood', 'Bamboo', 'Plywood', 'Veneer'],
      specs: 'Variable depth, photo-quality engraving'
    },
    {
      id: 8,
      category: 'laser_engraving',
      title: 'Leather Products & Accessories',
      description: 'Custom leather engraving for personalized products',
      image: '/portfolio/laser-engraving-leather.jpg',
      equipment: 'xTool M1 Ultra',
      materials: ['Genuine Leather', 'Faux Leather', 'Suede'],
      specs: 'Clean edges, no burning, professional finish'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: '3d_printing', name: '3D Printing' },
    { id: 'laser_cutting', name: 'Laser Cutting' },
    { id: 'laser_engraving', name: 'Laser Engraving' }
  ]

  const [activeCategory, setActiveCategory] = React.useState('all')

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing precision fabrication with professional-grade equipment and expert craftsmanship
          </p>
        </div>

        {/* Equipment Showcase */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Professional Equipment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">🖨️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Bambu Lab X1 Carbon</h3>
              <p className="text-sm text-gray-600">Professional 3D printer with AMS multi-material system</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900">xTool P2S CO2</h3>
              <p className="text-sm text-gray-600">55W CO2 laser for cutting and engraving</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">🔥</span>
              </div>
              <h3 className="font-semibold text-gray-900">xTool F1 Fiber</h3>
              <p className="text-sm text-gray-600">20W fiber laser for metal marking and engraving</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900">xTool M1 Ultra</h3>
              <p className="text-sm text-gray-600">4-in-1 versatile laser engraver and cutter</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.category === '3d_printing' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'laser_cutting' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Equipment:</h4>
                    <p className="text-sm text-gray-600">{item.equipment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Materials:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.materials.map((material, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Specifications:</h4>
                    <p className="text-sm text-gray-600">{item.specs}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-6">Get professional fabrication services with our premium equipment</p>
            <a
              href="/quote"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio

