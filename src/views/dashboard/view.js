import React from 'react'

function view() {
  return (
    <div>
        <CRow>
            <CCol xs={12} md={6} xl={6}>
                <CButton color="info" onClick={() => setShowForm(true)}>Add User</CButton>
            </CCol>
        </CRow>
    </div>
  )
}

export default view
