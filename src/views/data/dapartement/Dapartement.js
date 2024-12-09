import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import axios from 'axios';

const DataDapartemenDashboard = () => {
  const [dataDapartemen, setDataDapartemen] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    subJudul: '',
    deskripsi: '',
    image: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchDataDapartemen = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments');
      setDataDapartemen(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data!", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/departments', formData);
      setDataDapartemen([...dataDapartemen, response.data]);
      setShowForm(false);
      setFormData({ judul: '', subJudul: '', deskripsi: '', image: '' });
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat data!", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/departments/${editData.uuid}`, editData);
      setDataDapartemen(dataDapartemen.map(dep => (dep.uuid === editData.uuid ? editData : dep)));
      setShowEditForm(false);
      setEditData(null);
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data!", error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${uuid}`);
      setDataDapartemen(dataDapartemen.filter(dep => dep.uuid !== uuid));
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus data!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  useEffect(() => {
    fetchDataDapartemen();
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>Data Departemen Dashboard</CCardHeader>
          <CCardBody>
            <CButton color="info" onClick={() => setShowForm(true)}>Tambah Data Departemen</CButton>

            {/* Form Tambah Data Departemen */}
            {showForm && (
              <CCard className="mt-3">
                <CCardBody>
                  <form onSubmit={handleCreate}>
                    <div className="mb-3">
                      <label htmlFor="judul" className="form-label">Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        id="judul"
                        name="judul"
                        value={formData.judul}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subJudul" className="form-label">Sub Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subJudul"
                        name="subJudul"
                        value={formData.subJudul}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                      <textarea
                        className="form-control"
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image (URL)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <CButton type="submit" color="primary">Submit</CButton>
                    <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Batal</CButton>
                  </form>
                </CCardBody>
              </CCard>
            )}

            {/* Form Edit Data Departemen */}
            {showEditForm && editData && (
              <CCard className="mt-3">
                <CCardBody>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="editJudul" className="form-label">Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editJudul"
                        name="judul"
                        value={editData.judul}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editSubJudul" className="form-label">Sub Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editSubJudul"
                        name="subJudul"
                        value={editData.subJudul}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editDeskripsi" className="form-label">Deskripsi</label>
                      <textarea
                        className="form-control"
                        id="editDeskripsi"
                        name="deskripsi"
                        value={editData.deskripsi}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editImage" className="form-label">Image (URL)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editImage"
                        name="image"
                        value={editData.image}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <CButton type="submit" color="primary">Update</CButton>
                    <CButton color="secondary" className="ms-2" onClick={() => setShowEditForm(false)}>Batal</CButton>
                  </form>
                </CCardBody>
              </CCard>
            )}

            {/* Tabel Data Departemen */}
            <div style={{ overflowX: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Judul</CTableHeaderCell>
                    <CTableHeaderCell>Sub Judul</CTableHeaderCell>
                    <CTableHeaderCell>Deskripsi</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataDapartemen.map((data) => (
                    <CTableRow key={data.uuid}>
                      <CTableDataCell>{data.judul}</CTableDataCell>
                      <CTableDataCell>{data.subJudul}</CTableDataCell>
                      <CTableDataCell>{data.deskripsi}</CTableDataCell>
                      <CTableDataCell>
                        <div style={{ width: '50px', height: '50px' }}>
                          <img
                            src={data.image}
                            alt={data.judul}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
                          <CButton
                            color="warning"
                            style={{ whiteSpace: 'nowrap', flex: '1 1 auto' }}
                            onClick={() => {
                              setEditData(data);
                              setShowEditForm(true);
                            }}
                          >
                            Edit
                          </CButton>
                          <CButton
                            color="danger"
                            style={{ whiteSpace: 'nowrap', flex: '1 1 auto' }}
                            onClick={() => handleDelete(data.uuid)}
                          >
                            Delete
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default DataDapartemenDashboard;
