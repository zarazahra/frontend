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

const DataPenghargaanDashboard = () => {
  const [dataPenghargaan, setDataPenghargaan] = useState([]);
  const [formData, setFormData] = useState({
    gambarPenghargaan: '',
    namaPenghargaan: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Penghargaan from API
  const fetchDataPenghargaan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/penghargaan');
      setDataPenghargaan(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Penghargaan
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/penghargaan', formData);
      setDataPenghargaan([...dataPenghargaan, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ gambarPenghargaan: '', namaPenghargaan: '' }); // Reset form data
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Penghargaan
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/penghargaan/${editData.uuid}`, editData);
      setDataPenghargaan(dataPenghargaan.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Penghargaan
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/penghargaan/${uuid}`);
      setDataPenghargaan(dataPenghargaan.filter(item => item.uuid !== uuid));
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
    fetchDataPenghargaan(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Data Penghargaan Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Penghargaan</CButton>

              {/* Add Penghargaan Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Penghargaan */}
                      <div className="mb-3">
                        <label htmlFor="gambarPenghargaan" className="form-label">Gambar Penghargaan (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambarPenghargaan"
                          name="gambarPenghargaan"
                          value={formData.gambarPenghargaan}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="namaPenghargaan" className="form-label">Nama Penghargaan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaPenghargaan"
                          name="namaPenghargaan"
                          value={formData.namaPenghargaan}
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

              {/* Edit Penghargaan Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Penghargaan */}
                      <div className="mb-3">
                        <label htmlFor="gambarPenghargaan" className="form-label">Gambar Penghargaan (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambarPenghargaan"
                          name="gambarPenghargaan"
                          value={editData.gambarPenghargaan}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="namaPenghargaan" className="form-label">Nama Penghargaan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaPenghargaan"
                          name="namaPenghargaan"
                          value={editData.namaPenghargaan}
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

              {/* Penghargaan Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Gambar Penghargaan</CTableHeaderCell>
                      <CTableHeaderCell>Nama Penghargaan</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataPenghargaan.map((data, index) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>
                          {/* Display image */}
                          <img
                            src={data.gambarPenghargaan}
                            alt={data.namaPenghargaan}
                            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{data.namaPenghargaan}</CTableDataCell>
                        <CTableDataCell>
                          {/* Edit and Delete buttons */}
                          <CButton color="warning" className="me-2" onClick={() => {
                            setEditData(data); // Set data for editing
                            setShowEditForm(true); // Show edit form
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

export default DataPenghargaanDashboard;
