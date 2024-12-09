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

const DataSpesialisDashboard = () => {
  const [dataSpesialis, setDataSpesialis] = useState([]);
  const [formData, setFormData] = useState({
    no: '',
    namaSpesialis: '',
    keterangan: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Spesialis from API
  const fetchDataSpesialis = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dataspesialis');
      setDataSpesialis(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Data Spesialis
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/dataspesialis', formData);
      setDataSpesialis([...dataSpesialis, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ no: '', namaSpesialis: '', keterangan: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Data Spesialis
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/dataspesialis/${editData.uuid}`, editData);
      setDataSpesialis(dataSpesialis.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Data Spesialis
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/dataspesialis/${uuid}`);
      setDataSpesialis(dataSpesialis.filter(item => item.uuid !== uuid));
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
    fetchDataSpesialis(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Data Spesialis Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Data Spesialis</CButton>

              {/* Add Data Spesialis Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Data Spesialis */}
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
                        <label htmlFor="namaSpesialis" className="form-label">Nama Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaSpesialis"
                          name="namaSpesialis"
                          value={formData.namaSpesialis}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="keterangan" className="form-label">Keterangan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="keterangan"
                          name="keterangan"
                          value={formData.keterangan}
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

              {/* Edit Data Spesialis Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Data Spesialis */}
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
                        <label htmlFor="namaSpesialis" className="form-label">Nama Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaSpesialis"
                          name="namaSpesialis"
                          value={editData.namaSpesialis}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="keterangan" className="form-label">Keterangan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="keterangan"
                          name="keterangan"
                          value={editData.keterangan}
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

              {/* Data Spesialis Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>No</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Nama Spesialis</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Keterangan</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataSpesialis.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.no}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.namaSpesialis}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.keterangan}</CTableDataCell>
                        <CTableDataCell>
                          {/* Responsive styling for buttons */}
                          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
                            <CButton
                              color="warning"
                              style={{ whiteSpace: 'nowrap', flex: '1 1 auto' }}
                              onClick={() => {
                                setEditData(data); // Set data to be edited
                                setShowEditForm(true); // Show edit form
                              }}>
                              Edit
                            </CButton>
                            <CButton
                              color="danger"
                              style={{ whiteSpace: 'nowrap', flex: '1 1 auto' }}
                              onClick={() => handleDelete(data.uuid)}>
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

export default DataSpesialisDashboard;
