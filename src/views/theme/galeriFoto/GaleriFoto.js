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

const GaleriFotoDashboard = () => {
  const [galeriFoto, setGaleriFoto] = useState([]);
  const [formData, setFormData] = useState({
    no: '',
    gambarFoto: '',
    judulFoto: '',
    album: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Galeri Foto data from API
  const fetchGaleriFotoData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/galerifoto');
      setGaleriFoto(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Galeri Foto
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/galerifoto', formData);
      setGaleriFoto([...galeriFoto, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ no: '', gambarFoto: '', judulFoto: '', album: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Galeri Foto
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/galerifoto/${editData.uuid}`, editData);
      setGaleriFoto(galeriFoto.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Galeri Foto
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/galerifoto/${uuid}`);
      setGaleriFoto(galeriFoto.filter(item => item.uuid !== uuid));
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
    fetchGaleriFotoData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Galeri Foto Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Galeri Foto</CButton>

              {/* Add Galeri Foto Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Galeri Foto */}
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
                        <label htmlFor="judulFoto" className="form-label">Judul Foto</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulFoto"
                          name="judulFoto"
                          value={formData.judulFoto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="album" className="form-label">Album</label>
                        <input
                          type="text"
                          className="form-control"
                          id="album"
                          name="album"
                          value={formData.album}
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

              {/* Edit Galeri Foto Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Galeri Foto */}
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
                        <label htmlFor="judulFoto" className="form-label">Judul Foto</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulFoto"
                          name="judulFoto"
                          value={editData.judulFoto}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="album" className="form-label">Album</label>
                        <input
                          type="text"
                          className="form-control"
                          id="album"
                          name="album"
                          value={editData.album}
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

              {/* Galeri Foto Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Gambar Foto</CTableHeaderCell>
                      <CTableHeaderCell>Judul Foto</CTableHeaderCell>
                      <CTableHeaderCell>Album</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {galeriFoto.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>{data.no}</CTableDataCell>
                        <CTableDataCell>
                          <img src={data.gambarFoto} alt={data.judulFoto} style={{ width: '100px', height: 'auto' }} />
                        </CTableDataCell>
                        <CTableDataCell>{data.judulFoto}</CTableDataCell>
                        <CTableDataCell>{data.album}</CTableDataCell>
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

export default GaleriFotoDashboard;
