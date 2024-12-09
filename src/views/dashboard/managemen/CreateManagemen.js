import React from 'react'

const CreateManagemen = () => {
  return (
    <div>
      <CCard className="mt-3">
        <CCardBody>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
        }}>
            <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={editData.userName}
                onChange={handleEditInputChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="namaLengkap" className="form-label">Nama Lengkap</label>
            <input
                type="text"
                className="form-control"
                id="namaLengkap"
                name="namaLengkap"
                value={editData.namaLengkap}
                onChange={handleEditInputChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleEditInputChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="noTelpn" className="form-label">No Telpon</label>
            <input
                type="text"
                className="form-control"
                id="noTelpn"
                name="noTelpn"
                value={editData.noTelpn}
                onChange={handleEditInputChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="level" className="form-label">Level</label>
            <input
                type="text"
                className="form-control"
                id="level"
                name="level"
                value={editData.level}
                onChange={handleEditInputChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="blokir" className="form-label">Blokir</label>
            <input
                type="text"
                className="form-control"
                id="blokir"
                name="blokir"
                value={editData.blokir}
                onChange={handleEditInputChange}
            />
            </div>
            <CButton type="submit" color="primary">Update</CButton>
            <CButton color="secondary" className="ms-2" onClick={() => {
            setShowEditForm(false);
            setEditData(null);
            }}>Cancel</CButton>
        </form>
        </CCardBody>
    </CCard>
    </div>
  )
}

export default CreateManagemen
