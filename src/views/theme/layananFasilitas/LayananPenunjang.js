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

// Component for managing Layanan Penunjang
const LayananPenunjangDashboard = () => {
  const [layananPenunjang, setLayananPenunjang] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    image: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Layanan Penunjang data from API
  const fetchLayananPenunjangData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/layanan-penunjang');
      setLayananPenunjang(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Layanan Penunjang
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/layanan-penunjang', formData);
      setLayananPenunjang([...layananPenunjang, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Layanan Penunjang
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/layanan-penunjang/${editData.uuid}`, editData);
      setLayananPenunjang(layananPenunjang.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Layanan Penunjang
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/layanan-penunjang/${uuid}`);
      setLayananPenunjang(layananPenunjang.filter(item => item.uuid !== uuid));
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
    fetchLayananPenunjangData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Layanan Penunjang Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Layanan Penunjang</CButton>

              {/* Add Layanan Penunjang Form */}
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

              {/* Edit Layanan Penunjang Form */}
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

              {/* Layanan Penunjang Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Judul</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Deskripsi</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Image</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {layananPenunjang.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judul}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.deskripsi}</CTableDataCell>
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

export default LayananPenunjangDashboard;
