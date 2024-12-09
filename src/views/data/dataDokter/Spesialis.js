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

const SpesialisDashboard = () => {
  const [spesialis, setSpesialis] = useState([]);
  const [formData, setFormData] = useState({
    name_Spesialis: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Spesialis data from API
  const fetchSpesialis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/spesialis');
      setSpesialis(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Spesialis
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/spesialis', formData);
      console.log("respon")
      setSpesialis([...spesialis, response.data]);
      setShowForm(false);
      setFormData({ name_Spesialis: '' });
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Spesialis
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/spesialis/${editData.id}`, editData);
      setSpesialis(spesialis.map(item => (item.id === response.data.id ? response.data : item)));
      setShowEditForm(false);
      setEditData(null);
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Spesialis
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/spesialis/${id}`);
      setSpesialis(spesialis.filter(item => item.id !== id));
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
    fetchSpesialis(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Spesialis Dashboard</CCardHeader>
            <CCardBody>
              <CButton color="info" onClick={() => setShowForm(true)}>Add Spesialis</CButton>

              {/* Add Spesialis Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="name_Spesialis" className="form-label">Nama Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name_Spesialis"
                          name="name_Spesialis"
                          value={formData.name_Spesialis}
                          onChange={handleInputChange}
                        />
                      </div>
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Spesialis Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="name_Spesialis" className="form-label">Nama Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name_Spesialis"
                          name="name_Spesialis"
                          value={editData.name_Spesialis}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false);
                        setEditData(null);
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Spesialis Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Nama Spesialis</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {spesialis.map((data, index) => (
                      <CTableRow key={data.id}>
                        <CTableDataCell>{index+1}</CTableDataCell>
                        <CTableDataCell>{data.name_Spesialis}</CTableDataCell>
                        <CTableDataCell>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <CButton
                              color="warning"
                              onClick={() => {
                                setEditData(data);
                                setShowEditForm(true);
                              }}
                            >
                              Edit
                            </CButton>
                            <CButton
                              color="danger"
                              onClick={() => handleDelete(data.id)}
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

export default SpesialisDashboard;
