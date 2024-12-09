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

const DataDokterDashboard = () => {
  const [dataDokter, setDataDokter] = useState([]);
  const [formData, setFormData] = useState({
    no: '',
    gambarFoto: '',
    namaDokter: '',
    spesialis: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Dokter from API
  const fetchDataDokter = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/datadokter');
      setDataDokter(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Data Dokter
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/datadokter', formData);
      setDataDokter([...dataDokter, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ no: '', gambarFoto: '', namaDokter: '', spesialis: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Data Dokter
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/datadokter/${editData.uuid}`, editData);
      setDataDokter(dataDokter.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Data Dokter
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/datadokter/${uuid}`);
      setDataDokter(dataDokter.filter(item => item.uuid !== uuid));
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
    fetchDataDokter(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Data Dokter Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Data Dokter</CButton>

              {/* Add Data Dokter Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Data Dokter */}
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
                        <label htmlFor="namaDokter" className="form-label">Nama Dokter</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaDokter"
                          name="namaDokter"
                          value={formData.namaDokter}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="spesialis" className="form-label">Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="spesialis"
                          name="spesialis"
                          value={formData.spesialis}
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

              {/* Edit Data Dokter Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Data Dokter */}
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
                        <label htmlFor="namaDokter" className="form-label">Nama Dokter</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaDokter"
                          name="namaDokter"
                          value={editData.namaDokter}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="spesialis" className="form-label">Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="spesialis"
                          name="spesialis"
                          value={editData.spesialis}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      {/* Update and Cancel buttons */}
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false); // Hide edit form
                        setEditData(null); // Clear edit data
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Data Dokter Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Gambar Foto</CTableHeaderCell>
                      <CTableHeaderCell>Nama Dokter</CTableHeaderCell>
                      <CTableHeaderCell>Spesialis</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataDokter.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>{data.no}</CTableDataCell>
                        <CTableDataCell>
                          {/* Display image */}
                          <img
                            src={data.gambarFoto}
                            alt={data.namaDokter}
                            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{data.namaDokter}</CTableDataCell>
                        <CTableDataCell>{data.spesialis}</CTableDataCell>
                        <CTableDataCell>
                          {/* Responsive styling for buttons */}
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
    </>
  );
};

export default DataDokterDashboard;