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

const DataLaborDashboard = () => {
  const [dataLabor, setDataLabor] = useState([]);
  const [formData, setFormData] = useState({
    gambarFoto: '',
    namaLabor: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Laboratorium from API
  const fetchDataLabor = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/datalabor');
      setDataLabor(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Data Laboratorium
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/datalabor', formData);
      setDataLabor([...dataLabor, response.data]);
      setShowForm(false);
      setFormData({ gambarFoto: '', namaLabor: '' });
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Data Laboratorium
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/datalabor/${editData.uuid}`, editData);
      setDataLabor(dataLabor.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false);
      setEditData(null);
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Data Laboratorium
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/datalabor/${uuid}`);
      setDataLabor(dataLabor.filter(item => item.uuid !== uuid));
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
    fetchDataLabor(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Data Laboratorium Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Data Laboratorium</CButton>

              {/* Add Data Laboratorium Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}>
                      {/* Input fields for adding a new Data Laboratorium */}
                      <div className="mb-3">
                        <label htmlFor="gambarFoto" className="form-label">Gambar Foto (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambarFoto"
                          name="gambarFoto"
                          value={formData.gambarFoto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="namaLabor" className="form-label">Nama Laboratorium</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaLabor"
                          name="namaLabor"
                          value={formData.namaLabor}
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

              {/* Edit Data Laboratorium Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      {/* Input fields for editing an existing Data Laboratorium */}
                      <div className="mb-3">
                        <label htmlFor="gambarFoto" className="form-label">Gambar Foto (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambarFoto"
                          name="gambarFoto"
                          value={editData.gambarFoto}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="namaLabor" className="form-label">Nama Laboratorium</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaLabor"
                          name="namaLabor"
                          value={editData.namaLabor}
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

              {/* Data Laboratorium Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Gambar Foto</CTableHeaderCell>
                      <CTableHeaderCell>Nama Laboratorium</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataLabor.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>
                          <img
                            src={data.gambarFoto}
                            alt={data.namaLabor}
                            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{data.namaLabor}</CTableDataCell>
                        <CTableDataCell>
                          {/* Edit and Delete buttons */}
                          <CButton color="warning" className="me-2" onClick={() => {
                            setEditData(data);
                            setShowEditForm(true);
                          }}>Edit</CButton>
                          <CButton color="danger" onClick={() => handleDelete(data.uuid)}>Delete</CButton>
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
    </>
  );
};

export default DataLaborDashboard;
