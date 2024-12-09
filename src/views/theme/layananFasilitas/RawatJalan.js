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

// Component for managing Rawat Jalan
const RawatJalanDashboard = () => {
  const [rawatJalan, setRawatJalan] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Rawat Jalan data from API
  const fetchRawatJalanData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rawat-jalan');
      setRawatJalan(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Rawat Jalan
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rawat-jalan', formData);
      setRawatJalan([...rawatJalan, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Rawat Jalan
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/rawat-jalan/${editData.uuid}`, editData);
      setRawatJalan(rawatJalan.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Rawat Jalan
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/rawat-jalan/${uuid}`);
      setRawatJalan(rawatJalan.filter(item => item.uuid !== uuid));
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
    fetchRawatJalanData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Rawat Jalan Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Rawat Jalan</CButton>

              {/* Add Rawat Jalan Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judul"
                          name="judul"
                          value={formData.judul}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                        <input
                          type="text"
                          className="form-control"
                          id="deskripsi"
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Rawat Jalan Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judul"
                          name="judul"
                          value={editData.judul}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                        <input
                          type="text"
                          className="form-control"
                          id="deskripsi"
                          name="deskripsi"
                          value={editData.deskripsi}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false); // Hide edit form
                        setEditData(null); // Clear edit data
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Rawat Jalan Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Judul</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Deskripsi</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {rawatJalan.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judul}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.deskripsi}</CTableDataCell>
                        

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

export default RawatJalanDashboard;
