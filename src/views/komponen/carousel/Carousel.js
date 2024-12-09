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

const CarouselDashboard = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [formData, setFormData] = useState({
    judulSlide: '',
    deskripsiSlide: '',
  });
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Carousel data from API
  const fetchCarouselData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/carousel');
      setCarouselData(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Carousel Slide
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/carousel', formData);
      setCarouselData([...carouselData, response.data]);
      setShowForm(false);
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Carousel Slide
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/carousel/${editData.uuid}`, editData);
      setCarouselData(carouselData.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false);
      setEditData(null);
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Carousel Slide
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/carousel/${uuid}`);
      setCarouselData(carouselData.filter(item => item.uuid !== uuid));
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  // Handle input change for forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditForm) {
      setEditData({ ...editData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Carousel Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Slide</CButton>

              {/* Add Carousel Slide Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judulSlide" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulSlide"
                          name="judulSlide"
                          value={formData.judulSlide}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsiSlide" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsiSlide"
                          name="deskripsiSlide"
                          value={formData.deskripsiSlide}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Carousel Slide Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judulSlide" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulSlide"
                          name="judulSlide"
                          value={editData.judulSlide}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsiSlide" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsiSlide"
                          name="deskripsiSlide"
                          value={editData.deskripsiSlide}
                          onChange={handleInputChange}
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

              {/* Carousel Data Table */}
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
                    {carouselData.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judulSlide}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.deskripsiSlide}</CTableDataCell>
                        <CTableDataCell>
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

export default CarouselDashboard;
