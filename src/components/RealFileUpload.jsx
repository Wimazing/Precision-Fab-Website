import React, { useState, useCallback } from 'react'
import { Upload, File, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import apiService from '../services/api'

const RealFileUpload = ({ onFileUploaded, onFileRemoved, acceptedTypes = ['.stl', '.obj', '.svg', '.dxf', '.dwg', '.pdf'] }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [fileInfo, setFileInfo] = useState(null)

  // File validation
  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024 // 50MB
    const allowedExtensions = acceptedTypes.map(type => type.toLowerCase())
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()

    if (file.size > maxSize) {
      return 'File size must be less than 50MB'
    }

    if (!allowedExtensions.includes(fileExtension)) {
      return `File type not supported. Allowed types: ${acceptedTypes.join(', ')}`
    }

    return null
  }

  // Handle file upload
  const handleFileUpload = async (file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setUploading(true)
    setError(null)

    try {
      const response = await apiService.uploadFile(file)
      
      const fileData = {
        id: response.file_id,
        name: response.original_filename,
        size: response.file_size,
        info: response.file_info
      }

      setUploadedFile(fileData)
      setFileInfo(response.file_info)
      
      // Notify parent component
      if (onFileUploaded) {
        onFileUploaded(fileData)
      }

    } catch (error) {
      console.error('Upload failed:', error)
      setError(error.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // Handle file removal
  const handleFileRemove = () => {
    setUploadedFile(null)
    setFileInfo(null)
    setError(null)
    
    if (onFileRemoved) {
      onFileRemoved()
    }
  }

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }, [])

  // File input change handler
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get file type icon
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase()
    const iconClass = "w-8 h-8"
    
    switch (extension) {
      case 'stl':
      case 'obj':
      case 'ply':
        return <File className={`${iconClass} text-blue-500`} />
      case 'svg':
      case 'dxf':
      case 'dwg':
        return <File className={`${iconClass} text-green-500`} />
      case 'pdf':
        return <File className={`${iconClass} text-red-500`} />
      default:
        return <File className={`${iconClass} text-gray-500`} />
    }
  }

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="space-y-4">
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-lg font-medium text-gray-700">Uploading and analyzing file...</p>
                <p className="text-sm text-gray-500">This may take a moment for large files</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: {acceptedTypes.join(', ')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum file size: 50MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getFileIcon(uploadedFile.name)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                
                {fileInfo && (
                  <div className="mt-2 space-y-1">
                    {fileInfo.dimensions && (
                      <p className="text-xs text-gray-600">
                        Dimensions: {fileInfo.dimensions.x} × {fileInfo.dimensions.y} × {fileInfo.dimensions.z} mm
                      </p>
                    )}
                    {fileInfo.estimated_volume && (
                      <p className="text-xs text-gray-600">
                        Volume: {fileInfo.estimated_volume} cm³
                      </p>
                    )}
                    {fileInfo.triangle_count && (
                      <p className="text-xs text-gray-600">
                        Triangles: {fileInfo.triangle_count.toLocaleString()}
                      </p>
                    )}
                    {fileInfo.complexity && (
                      <p className="text-xs text-gray-600">
                        Complexity: {fileInfo.complexity}
                      </p>
                    )}
                    {fileInfo.estimated_print_time && (
                      <p className="text-xs text-gray-600">
                        Est. Print Time: {fileInfo.estimated_print_time.estimated_hours}h
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileRemove}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}

export default RealFileUpload

