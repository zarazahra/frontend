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

// Component for managing Modul
const ModulDashboard = () => {
  const [modul, setModul] = useState([]);
  const [formData, setFormData] = useState({
    namaModul: '',
    link: '',
    publish: '',
    aktif: '',
    status: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Modul data from API
  const fetchModulData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/modul');
      setModul(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Modul
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/modul', formData);
      setModul([...modul, response.data]);
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Modul
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/modul/${editData.uuid}`, editData);
      setModul(modul.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Modul
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/modul/${uuid}`);
      setModul(modul.filter(item => item.uuid !== uuid));
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
    fetchModulData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Modul Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Modul</CButton>

              {/* Add Modul Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Modul */}
                      <div className="mb-3">
                        <label htmlFor="namaModul" className="form-label">Nama Modul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaModul"
                          name="namaModul"
                          value={formData.namaModul}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input
                          type="text"
                          className="form-control"
                          id="link"
                          name="link"
                          value={formData.link}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="publish" className="form-label">Publish</label>
                        <input
                          type="text"
                          className="form-control"
                          id="publish"
                          name="publish"
                          value={formData.publish}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aktif" className="form-label">Aktif</label>
                        <input
                          type="text"
                          className="form-control"
                          id="aktif"
                          name="aktif"
                          value={formData.aktif}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                          type="text"
                          className="form-control"
                          id="status"
                          name="status"
                          value={formData.status}
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

              {/* Edit Modul Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Modul */}
                      <div className="mb-3">
                        <label htmlFor="namaModul" className="form-label">Nama Modul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaModul"
                          name="namaModul"
                          value={editData.namaModul}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input
                          type="text"
                          className="form-control"
                          id="link"
                          name="link"
                          value={editData.link}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="publish" className="form-label">Publish</label>
                        <input
                          type="text"
                          className="form-control"
                          id="publish"
                          name="publish"
                          value={editData.publish}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aktif" className="form-label">Aktif</label>
                        <input
                          type="text"
                          className="form-control"
                          id="aktif"
                          name="aktif"
                          value={editData.aktif}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                          type="text"
                          className="form-control"
                          id="status"
                          name="status"
                          value={editData.status}
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

              {/* Modul Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Nama Modul</CTableHeaderCell>
                      <CTableHeaderCell>Link</CTableHeaderCell>
                      <CTableHeaderCell>Publish</CTableHeaderCell>
                      <CTableHeaderCell>Aktif</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {modul.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>{data.namaModul}</CTableDataCell>
                        <CTableDataCell>{data.link}</CTableDataCell>
                        <CTableDataCell>{data.publish}</CTableDataCell>
                        <CTableDataCell>{data.aktif}</CTableDataCell>
                        <CTableDataCell>{data.status}</CTableDataCell>
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

export default ModulDashboard;
