import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('auth_user')
        
        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setToken(storedToken)
          setUser(parsedUser)
          
          // Set token in API service
          apiService.setAuthToken(storedToken)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear invalid data
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials)
      
      if (response.token && response.user) {
        setToken(response.token)
        setUser(response.user)
        
        // Store in localStorage
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        
        // Set token in API service
        apiService.setAuthToken(response.token)
        
        return { success: true, user: response.user }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      
      if (response.token && response.user) {
        setToken(response.token)
        setUser(response.user)
        
        // Store in localStorage
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        
        // Set token in API service
        apiService.setAuthToken(response.token)
        
        return { success: true, user: response.user }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    
    // Clear token from API service
    apiService.setAuthToken(null)
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await apiService.updateProfile(profileData)
      
      if (response.user) {
        setUser(response.user)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        return { success: true, user: response.user }
      }
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!(token && user)
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role
  }

  // Refresh user data
  const refreshUser = async () => {
    if (!token) return
    
    try {
      const response = await apiService.getCurrentUser()
      if (response.user) {
        setUser(response.user)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
      // If token is invalid, logout
      if (error.status === 401) {
        logout()
      }
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    hasRole,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

