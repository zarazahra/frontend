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

// Component for managing Tarif Persalinan
const TarifPersalinanDashboard = () => {
  const [tarifPersalinan, setTarifPersalinan] = useState([]);
  const [formData, setFormData] = useState({
    ruangPerawat: '',
    partusSpontanDokter: '',
    partusSpontanBidan: '',
    sectioCaesariaDokter: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Tarif Persalinan data from API
  const fetchTarifPersalinanData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tarif-persalinan');
      setTarifPersalinan(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Tarif Persalinan
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tarif-persalinan', formData);
      setTarifPersalinan([...tarifPersalinan, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Tarif Persalinan
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/tarif-persalinan/${editData.uuid}`, editData);
      setTarifPersalinan(tarifPersalinan.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Tarif Persalinan
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/tarif-persalinan/${uuid}`);
      setTarifPersalinan(tarifPersalinan.filter(item => item.uuid !== uuid));
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
    fetchTarifPersalinanData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Tarif Persalinan Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Tarif Persalinan</CButton>

              {/* Add Tarif Persalinan Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="ruangPerawat" className="form-label">Ruang Perawatan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ruangPerawat"
                          name="ruangPerawat"
                          value={formData.ruangPerawat}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="partusSpontanDokter" className="form-label">Partus Spontan (Dokter)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partusSpontanDokter"
                          name="partusSpontanDokter"
                          value={formData.partusSpontanDokter}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="partusSpontanBidan" className="form-label">Partus Spontan (Bidan)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partusSpontanBidan"
                          name="partusSpontanBidan"
                          value={formData.partusSpontanBidan}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="sectioCaesariaDokter" className="form-label">Sectio Caesaria (Dokter)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sectioCaesariaDokter"
                          name="sectioCaesariaDokter"
                          value={formData.sectioCaesariaDokter}
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

              {/* Edit Tarif Persalinan Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="ruangPerawat" className="form-label">Ruang Perawatan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ruangPerawat"
                          name="ruangPerawat"
                          value={editData.ruangPerawat}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="partusSpontanDokter" className="form-label">Partus Spontan (Dokter)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partusSpontanDokter"
                          name="partusSpontanDokter"
                          value={editData.partusSpontanDokter}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="partusSpontanBidan" className="form-label">Partus Spontan (Bidan)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partusSpontanBidan"
                          name="partusSpontanBidan"
                          value={editData.partusSpontanBidan}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="sectioCaesariaDokter" className="form-label">Sectio Caesaria (Dokter)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sectioCaesariaDokter"
                          name="sectioCaesariaDokter"
                          value={editData.sectioCaesariaDokter}
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

              {/* Tarif Persalinan Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Ruang Perawatan</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Partus Spontan (Dokter)</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Partus Spontan (Bidan)</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Sectio Caesaria (Dokter)</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tarifPersalinan.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.ruangPerawat}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.partusSpontanDokter}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.partusSpontanBidan}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.sectioCaesariaDokter}</CTableDataCell>

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

export default TarifPersalinanDashboard;
