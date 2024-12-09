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

// Component for managing SenamHamil
const SenamHamilDashboard = () => {
  const [senamHamil, setSenamHamil] = useState([]);
  const [formData, setFormData] = useState({
    syarat: '',
    tahapan: '',
    manfaat: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch SenamHamil data from API
  const fetchSenamHamilData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/senam-hamil');
      setSenamHamil(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new SenamHamil
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/senam-hamil', formData);
      setSenamHamil([...senamHamil, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update SenamHamil
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/senam-hamil/${editData.uuid}`, editData);
      setSenamHamil(senamHamil.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete SenamHamil
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/senam-hamil/${uuid}`);
      setSenamHamil(senamHamil.filter(item => item.uuid !== uuid));
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
    fetchSenamHamilData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Senam Hamil Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Senam Hamil</CButton>

              {/* Add SenamHamil Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="syarat" className="form-label">Syarat</label>
                        <input
                          type="text"
                          className="form-control"
                          id="syarat"
                          name="syarat"
                          value={formData.syarat}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tahapan" className="form-label">Tahapan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="tahapan"
                          name="tahapan"
                          value={formData.tahapan}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="manfaat" className="form-label">Manfaat</label>
                        <input
                          type="text"
                          className="form-control"
                          id="manfaat"
                          name="manfaat"
                          value={formData.manfaat}
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

              {/* Edit SenamHamil Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {['syarat', 'tahapan', 'manfaat'].map((field) => (
                        <div className="mb-3" key={field}>
                          <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                          <input
                            type="text"
                            className="form-control"
                            id={field}
                            name={field}
                            value={editData[field]}
                            onChange={handleEditInputChange}
                          />
                        </div>
                      ))}
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false); // Hide edit form
                        setEditData(null); // Clear edit data
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* SenamHamil Data Table */}
              <div style={{ overflowX: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='text-center'>Syarat</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Tahapan</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Manfaat</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {senamHamil.map((data) => (
                    <CTableRow key={data.uuid}>
                      <CTableDataCell >{data.syarat}</CTableDataCell>
                      <CTableDataCell >{data.tahapan}</CTableDataCell>
                      <CTableDataCell >{data.manfaat}</CTableDataCell>
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

export default SenamHamilDashboard;
