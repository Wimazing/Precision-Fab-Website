import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      instantQuote: 'Instant Quote',
      login: 'Login',
      logout: 'Logout',
      dashboard: 'Dashboard'
    },
    
    // Homepage
    home: {
      heroTitle: 'From Concept to',
      heroTitleHighlight: 'Creation',
      heroSubtitle: 'Precision CAD, 3D Printing & Laser Fabrication services. Transform your ideas into reality with our state-of-the-art technology and expert craftsmanship.',
      uploadFile: 'Upload Your File',
      viewPortfolio: 'View Portfolio',
      stats: {
        projectsCompleted: 'Projects Completed',
        yearsExperience: 'Years Experience',
        clientSatisfaction: 'Client Satisfaction',
        averageTurnaround: 'Average Turnaround'
      },
      process: {
        title: 'Our Process',
        subtitle: 'From idea to finished product in 4 simple steps',
        steps: {
          upload: {
            title: 'Upload Your Design',
            description: 'Upload your CAD files or sketches. We support all major formats including STL, DXF, and SVG.'
          },
          quote: {
            title: 'Get Instant Quote',
            description: 'Our advanced pricing engine provides transparent, competitive pricing in real-time.'
          },
          production: {
            title: 'We Manufacture',
            description: 'Your project goes into production using our precision equipment and quality materials.'
          },
          delivery: {
            title: 'Fast Delivery',
            description: 'Quality-checked products delivered to your door within our promised timeframe.'
          }
        }
      }
    },
    
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Professional fabrication services for all your needs',
      cadDesign: {
        title: 'CAD Design',
        description: 'Professional 3D modeling and engineering design services',
        features: ['3D Modeling', 'Technical Drawings', 'Design Optimization', 'File Conversion']
      },
      printing3d: {
        title: '3D Printing',
        description: 'High-quality 3D prints in various materials',
        features: ['Multiple Materials', 'Various Layer Heights', 'Support Structures', 'Post-Processing']
      },
      laserEngraving: {
        title: 'Laser Engraving',
        description: 'Precision engraving on multiple materials',
        features: ['Wood, Metal, Acrylic', 'Variable Depth', 'High Precision', 'Custom Designs']
      },
      laserCutting: {
        title: 'Laser Cutting',
        description: 'Accurate cutting for various materials',
        features: ['Multiple Materials', 'Clean Edges', 'Complex Shapes', 'Batch Processing']
      }
    },
    
    // Quote System
    quote: {
      title: 'Get Your Instant Quote',
      subtitle: 'Upload your file and get professional pricing in minutes',
      steps: {
        selectService: {
          title: 'Select Service',
          description: 'Choose your fabrication service'
        },
        uploadFile: {
          title: 'Upload File',
          description: 'Upload your design file'
        },
        configure: {
          title: 'Configure & Price',
          description: 'Set parameters and get pricing'
        },
        customerInfo: {
          title: 'Customer Info',
          description: 'Provide your contact details'
        },
        complete: {
          title: 'Quote Complete',
          description: 'Review and confirm your quote'
        }
      },
      chooseService: 'Choose Your Service',
      selectedService: 'Selected service:',
      acceptedFiles: 'Accepted files:',
      uploadYourFile: 'Upload Your File',
      configurePrice: 'Configure & Calculate Price',
      file: 'File:',
      backToServices: 'Back to Services',
      changeFile: 'Change File',
      continueToContact: 'Continue to Contact Info',
      backToPricing: 'Back to Pricing',
      contactInfo: 'Your Contact Information',
      contactSubtitle: "We'll send your quote to this email address",
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      company: 'Company (Optional)',
      quoteSummary: 'Quote Summary',
      service: 'Service:',
      totalCost: 'Total Cost:',
      createQuote: 'Create Quote',
      creatingQuote: 'Creating Quote...',
      quoteCreated: 'Quote Created Successfully!',
      quoteCreatedSubtitle: 'Your quote has been generated and sent to your email address.',
      quoteDetails: 'Quote Details',
      quoteNumber: 'Quote Number:',
      validUntil: 'Valid Until:',
      contactWithin24h: "We'll contact you within 24 hours to discuss your project and next steps.",
      getAnotherQuote: 'Get Another Quote',
      backToHome: 'Back to Home'
    },
    
    // About
    about: {
      title: 'About Precision Fab',
      subtitle: 'Your trusted partner in precision manufacturing',
      story: {
        title: 'Our Story',
        content: 'Founded in 2003, Precision Fab has been at the forefront of digital manufacturing and precision fabrication. What started as a passion project has grown into a trusted partner for businesses and individuals seeking high-quality, custom manufacturing solutions.'
      },
      founder: {
        title: 'Meet the Founder',
        name: 'Glenn Houkes',
        role: 'Founder & Lead Engineer',
        bio: 'With over 20 years of experience in mechanical engineering and digital fabrication, Glenn combines technical expertise with a passion for innovation. Every project receives his personal attention to ensure the highest quality standards.',
        quote: '"Quality is never an accident; it is always the result of intelligent effort."'
      },
      values: {
        title: 'Our Values',
        quality: {
          title: 'Quality First',
          description: 'Every project meets our rigorous quality standards before delivery.'
        },
        innovation: {
          title: 'Innovation',
          description: 'We stay ahead with the latest technology and manufacturing techniques.'
        },
        service: {
          title: 'Personal Service',
          description: 'Direct communication with Glenn ensures your project gets personal attention.'
        }
      }
    },
    
    // Authentication
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      createAccount: 'Create Account',
      username: 'Username',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phone: 'Phone Number',
      company: 'Company',
      signingIn: 'Signing In...',
      creatingAccount: 'Creating Account...',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signInLink: 'Sign in',
      signUpLink: 'Sign up'
    },
    
    // Dashboard
    dashboard: {
      welcomeBack: 'Welcome back',
      manageAccount: 'Manage your orders, quotes, and account settings',
      signOut: 'Sign Out',
      myOrders: 'My Orders',
      myQuotes: 'My Quotes',
      profile: 'Profile',
      settings: 'Settings',
      noOrders: 'No orders yet',
      noOrdersSubtitle: 'Your orders will appear here once you place them',
      noQuotes: 'No quotes yet',
      noQuotesSubtitle: 'Your quotes will appear here once you request them',
      loadingOrders: 'Loading orders...',
      loadingQuotes: 'Loading quotes...',
      orderNumber: 'Order #',
      quoteNumber: 'Quote #',
      status: 'Status',
      estimatedCompletion: 'Est. Completion',
      viewDetails: 'View Details',
      download: 'Download',
      convertToOrder: 'Convert to Order',
      valid: 'Valid',
      expired: 'Expired',
      profileInfo: 'Profile Information',
      accountSettings: 'Account Settings',
      emailNotifications: 'Email Notifications',
      orderStatusUpdates: 'Order status updates',
      quoteNotifications: 'Quote notifications',
      marketingEmails: 'Marketing emails',
      changePassword: 'Change Password',
      currentPassword: 'Current password',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password',
      updateProfile: 'Update Profile',
      updatePassword: 'Update Password'
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      tryAgain: 'Try Again',
      required: 'Required',
      optional: 'Optional',
      yes: 'Yes',
      no: 'No',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      close: 'Close'
    },
    
    // Footer
    footer: {
      company: 'Precision Fab',
      tagline: 'Professional CAD, 3D Printing & Laser Fabrication',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      newsletterText: 'Stay updated with our latest projects and offers',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    }
  },
  
  nl: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Diensten',
      portfolio: 'Portfolio',
      about: 'Over Ons',
      contact: 'Contact',
      instantQuote: 'Directe Offerte',
      login: 'Inloggen',
      logout: 'Uitloggen',
      dashboard: 'Dashboard'
    },
    
    // Homepage
    home: {
      heroTitle: 'Van Concept naar',
      heroTitleHighlight: 'Creatie',
      heroSubtitle: 'Precisie CAD, 3D Printen & Laser Fabricage diensten. Transformeer uw ideeën naar realiteit met onze state-of-the-art technologie en vakmanschap.',
      uploadFile: 'Upload Uw Bestand',
      viewPortfolio: 'Bekijk Portfolio',
      stats: {
        projectsCompleted: 'Projecten Voltooid',
        yearsExperience: 'Jaar Ervaring',
        clientSatisfaction: 'Klanttevredenheid',
        averageTurnaround: 'Gemiddelde Doorlooptijd'
      },
      process: {
        title: 'Ons Proces',
        subtitle: 'Van idee tot eindproduct in 4 eenvoudige stappen',
        steps: {
          upload: {
            title: 'Upload Uw Ontwerp',
            description: 'Upload uw CAD bestanden of schetsen. Wij ondersteunen alle belangrijke formaten zoals STL, DXF en SVG.'
          },
          quote: {
            title: 'Krijg Directe Offerte',
            description: 'Onze geavanceerde prijsengine biedt transparante, concurrerende prijzen in real-time.'
          },
          production: {
            title: 'Wij Produceren',
            description: 'Uw project gaat in productie met onze precisie-apparatuur en kwaliteitsmaterialen.'
          },
          delivery: {
            title: 'Snelle Levering',
            description: 'Kwaliteitsgecontroleerde producten geleverd aan uw deur binnen onze beloofde tijdsbestek.'
          }
        }
      }
    },
    
    // Services
    services: {
      title: 'Onze Diensten',
      subtitle: 'Professionele fabricage diensten voor al uw behoeften',
      cadDesign: {
        title: 'CAD Ontwerp',
        description: 'Professionele 3D modellering en technische ontwerpdiensten',
        features: ['3D Modellering', 'Technische Tekeningen', 'Ontwerp Optimalisatie', 'Bestand Conversie']
      },
      printing3d: {
        title: '3D Printen',
        description: 'Hoogwaardige 3D prints in verschillende materialen',
        features: ['Meerdere Materialen', 'Verschillende Laag Hoogtes', 'Ondersteuningsstructuren', 'Nabewerking']
      },
      laserEngraving: {
        title: 'Laser Graveren',
        description: 'Precisie graveren op meerdere materialen',
        features: ['Hout, Metaal, Acryl', 'Variabele Diepte', 'Hoge Precisie', 'Aangepaste Ontwerpen']
      },
      laserCutting: {
        title: 'Laser Snijden',
        description: 'Nauwkeurig snijden voor verschillende materialen',
        features: ['Meerdere Materialen', 'Schone Randen', 'Complexe Vormen', 'Batch Verwerking']
      }
    },
    
    // Quote System
    quote: {
      title: 'Krijg Uw Directe Offerte',
      subtitle: 'Upload uw bestand en krijg professionele prijzen binnen minuten',
      steps: {
        selectService: {
          title: 'Selecteer Dienst',
          description: 'Kies uw fabricage dienst'
        },
        uploadFile: {
          title: 'Upload Bestand',
          description: 'Upload uw ontwerpbestand'
        },
        configure: {
          title: 'Configureer & Prijs',
          description: 'Stel parameters in en krijg prijzen'
        },
        customerInfo: {
          title: 'Klantgegevens',
          description: 'Verstrek uw contactgegevens'
        },
        complete: {
          title: 'Offerte Compleet',
          description: 'Bekijk en bevestig uw offerte'
        }
      },
      chooseService: 'Kies Uw Dienst',
      selectedService: 'Geselecteerde dienst:',
      acceptedFiles: 'Geaccepteerde bestanden:',
      uploadYourFile: 'Upload Uw Bestand',
      configurePrice: 'Configureer & Bereken Prijs',
      file: 'Bestand:',
      backToServices: 'Terug naar Diensten',
      changeFile: 'Wijzig Bestand',
      continueToContact: 'Ga door naar Contactgegevens',
      backToPricing: 'Terug naar Prijzen',
      contactInfo: 'Uw Contactgegevens',
      contactSubtitle: 'We sturen uw offerte naar dit e-mailadres',
      fullName: 'Volledige Naam',
      emailAddress: 'E-mailadres',
      phoneNumber: 'Telefoonnummer',
      company: 'Bedrijf (Optioneel)',
      quoteSummary: 'Offerte Samenvatting',
      service: 'Dienst:',
      totalCost: 'Totale Kosten:',
      createQuote: 'Maak Offerte',
      creatingQuote: 'Offerte Maken...',
      quoteCreated: 'Offerte Succesvol Aangemaakt!',
      quoteCreatedSubtitle: 'Uw offerte is gegenereerd en verzonden naar uw e-mailadres.',
      quoteDetails: 'Offerte Details',
      quoteNumber: 'Offerte Nummer:',
      validUntil: 'Geldig Tot:',
      contactWithin24h: 'We nemen binnen 24 uur contact met u op om uw project en volgende stappen te bespreken.',
      getAnotherQuote: 'Krijg Nog Een Offerte',
      backToHome: 'Terug naar Home'
    },
    
    // About
    about: {
      title: 'Over Precision Fab',
      subtitle: 'Uw vertrouwde partner in precisie fabricage',
      story: {
        title: 'Ons Verhaal',
        content: 'Opgericht in 2003, staat Precision Fab aan de voorhoede van digitale fabricage en precisie productie. Wat begon als een passieproject is uitgegroeid tot een vertrouwde partner voor bedrijven en particulieren die op zoek zijn naar hoogwaardige, op maat gemaakte fabricage oplossingen.'
      },
      founder: {
        title: 'Ontmoet de Oprichter',
        name: 'Glenn Houkes',
        role: 'Oprichter & Hoofdingenieur',
        bio: 'Met meer dan 20 jaar ervaring in werktuigbouwkunde en digitale fabricage, combineert Glenn technische expertise met een passie voor innovatie. Elk project krijgt zijn persoonlijke aandacht om de hoogste kwaliteitsnormen te waarborgen.',
        quote: '"Kwaliteit is nooit een toeval; het is altijd het resultaat van intelligente inspanning."'
      },
      values: {
        title: 'Onze Waarden',
        quality: {
          title: 'Kwaliteit Eerst',
          description: 'Elk project voldoet aan onze strenge kwaliteitsnormen voor levering.'
        },
        innovation: {
          title: 'Innovatie',
          description: 'We blijven voorop met de nieuwste technologie en fabricagetechnieken.'
        },
        service: {
          title: 'Persoonlijke Service',
          description: 'Directe communicatie met Glenn zorgt ervoor dat uw project persoonlijke aandacht krijgt.'
        }
      }
    },
    
    // Authentication
    auth: {
      signIn: 'Inloggen',
      signUp: 'Registreren',
      createAccount: 'Account Aanmaken',
      username: 'Gebruikersnaam',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      confirmPassword: 'Bevestig Wachtwoord',
      phone: 'Telefoonnummer',
      company: 'Bedrijf',
      signingIn: 'Inloggen...',
      creatingAccount: 'Account Aanmaken...',
      dontHaveAccount: 'Heeft u geen account?',
      alreadyHaveAccount: 'Heeft u al een account?',
      signInLink: 'Inloggen',
      signUpLink: 'Registreren'
    },
    
    // Dashboard
    dashboard: {
      welcomeBack: 'Welkom terug',
      manageAccount: 'Beheer uw bestellingen, offertes en accountinstellingen',
      signOut: 'Uitloggen',
      myOrders: 'Mijn Bestellingen',
      myQuotes: 'Mijn Offertes',
      profile: 'Profiel',
      settings: 'Instellingen',
      noOrders: 'Nog geen bestellingen',
      noOrdersSubtitle: 'Uw bestellingen verschijnen hier zodra u ze plaatst',
      noQuotes: 'Nog geen offertes',
      noQuotesSubtitle: 'Uw offertes verschijnen hier zodra u ze aanvraagt',
      loadingOrders: 'Bestellingen laden...',
      loadingQuotes: 'Offertes laden...',
      orderNumber: 'Bestelling #',
      quoteNumber: 'Offerte #',
      status: 'Status',
      estimatedCompletion: 'Geschatte Voltooiing',
      viewDetails: 'Bekijk Details',
      download: 'Download',
      convertToOrder: 'Converteer naar Bestelling',
      valid: 'Geldig',
      expired: 'Verlopen',
      profileInfo: 'Profielinformatie',
      accountSettings: 'Accountinstellingen',
      emailNotifications: 'E-mail Notificaties',
      orderStatusUpdates: 'Bestelling status updates',
      quoteNotifications: 'Offerte notificaties',
      marketingEmails: 'Marketing e-mails',
      changePassword: 'Wachtwoord Wijzigen',
      currentPassword: 'Huidig wachtwoord',
      newPassword: 'Nieuw wachtwoord',
      confirmNewPassword: 'Bevestig nieuw wachtwoord',
      updateProfile: 'Profiel Bijwerken',
      updatePassword: 'Wachtwoord Bijwerken'
    },
    
    // Common
    common: {
      loading: 'Laden...',
      error: 'Fout',
      success: 'Succes',
      cancel: 'Annuleren',
      save: 'Opslaan',
      edit: 'Bewerken',
      delete: 'Verwijderen',
      confirm: 'Bevestigen',
      tryAgain: 'Probeer Opnieuw',
      required: 'Verplicht',
      optional: 'Optioneel',
      yes: 'Ja',
      no: 'Nee',
      continue: 'Doorgaan',
      back: 'Terug',
      next: 'Volgende',
      finish: 'Voltooien',
      close: 'Sluiten'
    },
    
    // Footer
    footer: {
      company: 'Precision Fab',
      tagline: 'Professionele CAD, 3D Printen & Laser Fabricage',
      quickLinks: 'Snelle Links',
      services: 'Diensten',
      contact: 'Contact',
      followUs: 'Volg Ons',
      newsletter: 'Nieuwsbrief',
      newsletterText: 'Blijf op de hoogte van onze laatste projecten en aanbiedingen',
      emailPlaceholder: 'Voer uw e-mail in',
      subscribe: 'Abonneren',
      allRightsReserved: 'Alle rechten voorbehouden.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Servicevoorwaarden'
    }
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('preferred_language')
    return savedLanguage || 'en'
  })

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferred_language', language)
  }, [language])

  // Get translation function
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // Fallback to English if translation not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey]
          } else {
            return key // Return key if no translation found
          }
        }
        break
      }
    }
    
    return value || key
  }

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'nl' : 'en')
  }

  // Set specific language
  const setLang = (lang) => {
    if (lang === 'en' || lang === 'nl') {
      setLanguage(lang)
    }
  }

  // Get current language info
  const getCurrentLanguage = () => {
    return {
      code: language,
      name: language === 'en' ? 'English' : 'Nederlands',
      flag: language === 'en' ? '🇺🇸' : '🇳🇱'
    }
  }

  // Format currency based on language
  const formatCurrency = (amount) => {
    if (language === 'nl') {
      return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)
    }
  }

  // Format date based on language
  const formatDate = (date) => {
    const dateObj = new Date(date)
    if (language === 'nl') {
      return dateObj.toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } else {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  const value = {
    language,
    setLanguage: setLang,
    toggleLanguage,
    getCurrentLanguage,
    t,
    formatCurrency,
    formatDate,
    isEnglish: language === 'en',
    isDutch: language === 'nl'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

