import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilContrast, cilMenu, cilMoon, cilSun } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate() // Menambahkan navigate untuk redirect

  // State untuk menyimpan nama admin
  const [adminName, setAdminName] = useState('')
  const [loading, setLoading] = useState(true) // Add a loading state

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.replace('/login') // Menggunakan replace agar riwayat halaman diganti dengan halaman login
  }

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setAdminName(storedName)
      setLoading(false)
    } else {
      const fetchAdminName = async () => {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const response = await axios.get('/currentUser', {
              headers: { Authorization: `Bearer ${token}` },
            })
            const nameFromAPI = response.data.name
            localStorage.setItem('name', nameFromAPI)
            setAdminName(nameFromAPI)
            setLoading(false)
          } catch (error) {
            console.error('Failed to retrieve admin name:', error)
            setLoading(false)
          }
        } else {
          setLoading(false) // Consider handling this case more gracefully
        }
      }
      fetchAdminName()
    }
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/home/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CButton color="light" onClick={handleLogout}>
              Logout
            </CButton>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <div className="d-flex align-items-center">
            <span style={{ fontWeight: 'bold', fontSize: '16px', paddingLeft: '5px' }}>
              {loading ? 'Loading...' : adminName || 'name'}
            </span>
          </div>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader

// ProtectedRoute Component
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace /> // Redirect ke halaman login jika tidak ada token
  }
  return children
}

// Contoh penggunaan ProtectedRoute di dalam App.js

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import AppHeader from './AppHeader'
// import Dashboard from './Dashboard'
// import Login from './Login'

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/home/dashboard" element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   )
// }

// export default App
