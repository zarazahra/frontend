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

// Component for managing FAQ
const FaqDashboard = () => {
  const [faq, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    pertanyaan: '',
    jawaban: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch FAQ data from API
  const fetchFaqData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faq');
      setFaqs(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new FAQ
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/faq', formData);
      setFaqs([...faq, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update FAQ
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/faq/${editData.uuid}`, editData);
      setFaqs(faq.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete FAQ
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/faq/${uuid}`);
      setFaqs(faq.filter(item => item.uuid !== uuid));
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
    fetchFaqData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>FAQ Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add FAQ</CButton>

              {/* Add FAQ Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="pertanyaan" className="form-label">Pertanyaan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pertanyaan"
                          name="pertanyaan"
                          value={formData.pertanyaan}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jawaban" className="form-label">Jawaban</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jawaban"
                          name="jawaban"
                          value={formData.jawaban}
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

              {/* Edit FAQ Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="pertanyaan" className="form-label">Pertanyaan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pertanyaan"
                          name="pertanyaan"
                          value={editData.pertanyaan}
                          onChange={handleEditInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="jawaban" className="form-label">Jawaban</label>
                        <input
                          type="text"
                          className="form-control"
                          id="jawaban"
                          name="jawaban"
                          value={editData.jawaban}
                          onChange={handleEditInputChange}
                          required
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

              {/* FAQ Data Table */}
              <div style={{ overflowX: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='text-center'>Pertanyaan</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Jawaban</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {faq.map((data) => (
                    <CTableRow key={data.uuid}>
                      <CTableDataCell className='text-center'>{data.pertanyaan}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.jawaban}</CTableDataCell>
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

export default FaqDashboard;
