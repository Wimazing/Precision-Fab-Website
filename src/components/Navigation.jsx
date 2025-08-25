import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Upload, Menu, X, User, LogOut } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import LanguageToggle from './LanguageToggle'
import AuthModal from './AuthModal'
import UserDashboard from './UserDashboard'

const Navigation = () => {
  const { t } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const handleAuthSuccess = (userData, token) => {
    setAuthModalOpen(false)
    // Optionally show a success message or redirect
  }

  const handleLogout = () => {
    logout()
    setShowDashboard(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // If showing dashboard, render it instead of navigation
  if (showDashboard && isAuthenticated()) {
    return <UserDashboard user={user} onLogout={handleLogout} />
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PF</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Precision Fab</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {t('nav.services')}
              </Link>
              <Link 
                to="/portfolio" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {t('nav.portfolio')}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {t('nav.about')}
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle />
              
              {isAuthenticated() ? (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowDashboard(true)}
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.first_name || user?.username}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{t('nav.login')}</span>
                </Button>
              )}

              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link to="/quote" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>{t('nav.instantQuote')}</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle />
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/services"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('nav.services')}
                </Link>
                <Link
                  to="/portfolio"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('nav.portfolio')}
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {t('nav.about')}
                </Link>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {isAuthenticated() ? (
                    <>
                      <button
                        onClick={() => {
                          setShowDashboard(true)
                          closeMobileMenu()
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{t('nav.dashboard')}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          handleLogout()
                          closeMobileMenu()
                        }}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalOpen(true)
                        closeMobileMenu()
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{t('nav.login')}</span>
                      </div>
                    </button>
                  )}
                  
                  <Link
                    to="/quote"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 mt-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>{t('nav.instantQuote')}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  )
}

export default Navigation

