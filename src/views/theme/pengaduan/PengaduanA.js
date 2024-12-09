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

const DataPengaduanDashboard = () => {
  const [dataPengaduan, setDataPengaduan] = useState([]);
  const [formData, setFormData] = useState({
    no: '',
    nama: '',
    email: '',
    nohp: '',
    kualitas: '',
    tanggal: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Pengaduan from API
  const fetchDataPengaduan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pengaduan');
      setDataPengaduan(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Data Pengaduan
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/pengaduan', formData);
      setDataPengaduan([...dataPengaduan, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ no: '', nama: '', email: '', nohp: '', kualitas: '', tanggal: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Data Pengaduan
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/pengaduan/${editData.uuid}`, editData);
      setDataPengaduan(dataPengaduan.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Data Pengaduan
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/pengaduan/${uuid}`);
      setDataPengaduan(dataPengaduan.filter(item => item.uuid !== uuid));
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  // Handle input change for create form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change for edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  useEffect(() => {
    fetchDataPengaduan(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Data Pengaduan Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Data Pengaduan</CButton>

              {/* Add Data Pengaduan Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Data Pengaduan */}
                      <div className="mb-3">
                        <label htmlFor="no" className="form-label">No</label>
                        <input
                          type="text"
                          className="form-control"
                          id="no"
                          name="no"
                          value={formData.no}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nama"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nohp" className="form-label">No HP</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nohp"
                          name="nohp"
                          value={formData.nohp}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="kualitas" className="form-label">Kualitas</label>
                        <input
                          type="text"
                          className="form-control"
                          id="kualitas"
                          name="kualitas"
                          value={formData.kualitas}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tanggal" className="form-label">Tanggal</label>
                        <input
                          type="date"
                          className="form-control"
                          id="tanggal"
                          name="tanggal"
                          value={formData.tanggal}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Submit and Cancel buttons */}
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Data Pengaduan Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Data Pengaduan */}
                      <div className="mb-3">
                        <label htmlFor="no" className="form-label">No</label>
                        <input
                          type="text"
                          className="form-control"
                          id="no"
                          name="no"
                          value={editData.no}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nama"
                          name="nama"
                          value={editData.nama}
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
                        <label htmlFor="nohp" className="form-label">No HP</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nohp"
                          name="nohp"
                          value={editData.nohp}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="kualitas" className="form-label">Kualitas</label>
                        <input
                          type="text"
                          className="form-control"
                          id="kualitas"
                          name="kualitas"
                          value={editData.kualitas}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tanggal" className="form-label">Tanggal</label>
                        <input
                          type="date"
                          className="form-control"
                          id="tanggal"
                          name="tanggal"
                          value={editData.tanggal}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      {/* Update and Cancel buttons */}
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false);
                        setEditData(null);
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Data Pengaduan Table */}
              <CTable responsive striped className="mt-3">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Nama</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>No HP</CTableHeaderCell>
                    <CTableHeaderCell>Kualitas</CTableHeaderCell>
                    <CTableHeaderCell>Tanggal</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataPengaduan.map((item) => (
                    <CTableRow key={item.uuid}>
                      <CTableDataCell>{item.no}</CTableDataCell>
                      <CTableDataCell>{item.nama}</CTableDataCell>
                      <CTableDataCell>{item.email}</CTableDataCell>
                      <CTableDataCell>{item.nohp}</CTableDataCell>
                      <CTableDataCell>{item.kualitas}</CTableDataCell>
                      <CTableDataCell>{item.tanggal}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          size="sm"
                          onClick={() => {
                            setEditData(item);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => handleDelete(item.uuid)}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default DataPengaduanDashboard;
