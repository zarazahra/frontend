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

const GridColumnDashboard = () => {
  const [gridColumns, setGridColumns] = useState([]);
  const [formData, setFormData] = useState({
    judulGrid: '',
    shortText: '',
    longText: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Grid Columns from API
  const fetchGridColumns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gridcolumn');
      setGridColumns(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Grid Column
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/gridcolumn', formData);
      setGridColumns([...gridColumns, response.data]);
      setShowForm(false); // Hide form after submission
      setFormData({ judulGrid: '', shortText: '', longText: '' }); // Reset form data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Grid Column
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/gridcolumn/${editData.uuid}`, editData);
      setGridColumns(gridColumns.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Grid Column
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/gridcolumn/${uuid}`);
      setGridColumns(gridColumns.filter(item => item.uuid !== uuid));
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
    fetchGridColumns(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Grid Column Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Grid Column</CButton>

              {/* Add Grid Column Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      {/* Input fields for adding a new Grid Column */}
                      <div className="mb-3">
                        <label htmlFor="judulGrid" className="form-label">Judul Grid</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulGrid"
                          name="judulGrid"
                          value={formData.judulGrid}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="shortText" className="form-label">Short Text</label>
                        <textarea
                          className="form-control"
                          id="shortText"
                          name="shortText"
                          value={formData.shortText}
                          onChange={handleInputChange}
                          rows={5} // Adjust rows for more input space
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="longText" className="form-label">Long Text</label>
                        <textarea
                          className="form-control"
                          id="longText"
                          name="longText"
                          value={formData.longText}
                          onChange={handleInputChange}
                          rows={10} // Adjust rows for more input space
                        />
                      </div>
                      {/* Submit and Cancel buttons */}
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Grid Column Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {/* Input fields for editing an existing Grid Column */}
                      <div className="mb-3">
                        <label htmlFor="judulGrid" className="form-label">Judul Grid</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulGrid"
                          name="judulGrid"
                          value={editData.judulGrid}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="shortText" className="form-label">Short Text</label>
                        <textarea
                          className="form-control"
                          id="shortText"
                          name="shortText"
                          value={editData.shortText}
                          onChange={handleEditInputChange}
                          rows={5} // Adjust rows for more input space
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="longText" className="form-label">Long Text</label>
                        <textarea
                          className="form-control"
                          id="longText"
                          name="longText"
                          value={editData.longText}
                          onChange={handleEditInputChange}
                          rows={10} // Adjust rows for more input space
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

              {/* Grid Column Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Judul Grid</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Short Text</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Long Text</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {gridColumns.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judulGrid}</CTableDataCell>
                        <CTableDataCell >{data.shortText}</CTableDataCell>
                        <CTableDataCell >{data.longText}</CTableDataCell>
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

export default GridColumnDashboard;
