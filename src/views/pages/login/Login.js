import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const decodeJwt = (token) => {
    try {
      const payload = token.split('.')[1]
      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
      return decodedPayload // Returns the decoded payload
    } catch (error) {
      console.error('Failed to decode JWT', error)
      return null // Return null if decoding fails
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.msg || 'Login failed')
        return
      }

      localStorage.setItem('accessToken', data.accessToken) // Save the token

      const decodedToken = decodeJwt(data.accessToken) // Decode the token

      if (decodedToken) {
        localStorage.setItem('userName', decodedToken.name) // Save the user's name
        localStorage.setItem('userId', decodedToken.userId) // Save the user's ID if needed
      } else {
        setErrorMessage('Failed to decode token')
      }

      navigate('/home') // Redirect to home after successful login
    } catch (error) {
      console.error('Error during login:', error)
      setErrorMessage('An error occurred while logging in. Please try again.')
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: '#E0E7FF' }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={5}>
            <CCard className="p-4 shadow-lg rounded" style={{ border: 'none' }}>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: '#4A56E2' }}>Welcome Back</h2>
                    <p className="text-muted">Please sign in to your account</p>
                  </div>
                  
                  {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText style={{ backgroundColor: '#E0E7FF' }}>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ border: '2px solid #4A56E2' }}
                    />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-4">
                    <CInputGroupText style={{ backgroundColor: '#E0E7FF' }}>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ border: '2px solid #4A56E2' }}
                    />
                  </CInputGroup>
                  
                  <CRow>
                    <CCol>
                      <CButton
                        color="primary"
                        className="px-4 py-2"
                        type="submit"
                        style={{ width: '100%', backgroundColor: '#4A56E2', border: 'none' }}
                      >
                        Sign In
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
