import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage, getCurrentLanguage } = useLanguage()
  const currentLang = getCurrentLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 ${className}`}
      title={`Switch to ${language === 'en' ? 'Nederlands' : 'English'}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-lg">{currentLang.flag}</span>
      <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
    </button>
  )
}

export default LanguageToggle

