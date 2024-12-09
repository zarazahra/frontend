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

const BeritaDashboard = () => {
  const [dataBerita, setDataBerita] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    gambar: '',
    deskripsi: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Data Berita from API
  const fetchDataBerita = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/berita');
      setDataBerita(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Berita
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/berita', formData);
      setDataBerita([...dataBerita, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ judul: '', gambar: '', deskripsi: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Berita
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/berita/${editData.uuid}`, editData);
      setDataBerita(dataBerita.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Berita
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/berita/${uuid}`);
      setDataBerita(dataBerita.filter(item => item.uuid !== uuid));
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
    fetchDataBerita(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Berita Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Berita</CButton>

              {/* Add Berita Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}>
                      {/* Input fields for adding a new Berita */}
                      <div className="mb-3">
                        <label htmlFor="judul" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judul"
                          name="judul"
                          value={formData.judul}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">Gambar (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambar"
                          name="gambar"
                          value={formData.gambar}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsi"
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Berita Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      {/* Input fields for editing an existing Berita */}
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
                        <label htmlFor="gambar" className="form-label">Gambar (URL)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="gambar"
                          name="gambar"
                          value={editData.gambar}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsi"
                          name="deskripsi"
                          value={editData.deskripsi}
                          onChange={handleEditInputChange}
                        ></textarea>
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

              {/* Data Berita Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Judul</CTableHeaderCell>
                      <CTableHeaderCell>Gambar</CTableHeaderCell>
                      <CTableHeaderCell>Deskripsi</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {dataBerita.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell>{data.judul}</CTableDataCell>
                        <CTableDataCell>
                          <img
                            src={data.gambar}
                            alt={data.judul}
                            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{data.deskripsi}</CTableDataCell>
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

export default BeritaDashboard;
