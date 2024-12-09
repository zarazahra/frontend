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

// Component for managing Fasilitas Unggulan
const FasilitasUnggulanDashboard = () => {
  const [fasilitasUnggulan, setFasilitasUnggulan] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    subJudul: '',
    image: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Fasilitas Unggulan data from API
  const fetchFasilitasUnggulanData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fasilitas-unggulan');
      setFasilitasUnggulan(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Fasilitas Unggulan
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fasilitas-unggulan', formData);
      setFasilitasUnggulan([...fasilitasUnggulan, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Fasilitas Unggulan
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/fasilitas-unggulan/${editData.uuid}`, editData);
      setFasilitasUnggulan(fasilitasUnggulan.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Fasilitas Unggulan
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/fasilitas-unggulan/${uuid}`);
      setFasilitasUnggulan(fasilitasUnggulan.filter(item => item.uuid !== uuid));
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
    fetchFasilitasUnggulanData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Fasilitas Unggulan Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Fasilitas Unggulan</CButton>

              {/* Add Fasilitas Unggulan Form */}
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
                        <label htmlFor="subJudul" className="form-label">Sub Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subJudul"
                          name="subJudul"
                          value={formData.subJudul}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="image"
                          name="image"
                          value={formData.image}
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

              {/* Edit Fasilitas Unggulan Form */}
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
                        <label htmlFor="subJudul" className="form-label">Sub Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subJudul"
                          name="subJudul"
                          value={editData.subJudul}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="image"
                          name="image"
                          value={editData.image}
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

              {/* Fasilitas Unggulan Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Judul</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Sub Judul</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Image</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {fasilitasUnggulan.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judul}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.subJudul}</CTableDataCell>
                        <CTableDataCell className='text-center'>
  <img src={data.image} alt={data.judul} style={{ width: '100px', height: 'auto' }} />
</CTableDataCell>

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

export default FasilitasUnggulanDashboard;
