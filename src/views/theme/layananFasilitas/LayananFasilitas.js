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
import DataFasilitasUnggulanDashboard from './FasilitasUnggulan';
import DataFasilitasPendukungDashboard from './FasilitasPendukung';
import LayananPenunjangDashboard from './LayananPenunjang';
import RawatInapDashboard from './RawatInap';
import RawatJalanDashboard from './RawatJalan';
import TarifPersalinanDashboard from './TarifPersalinan';

// Component for managing LayananFasilitas
const LayananFasilitasDashboard = () => {
  const [layananFasilitas, setLayananFasilitas] = useState([]);
  const [formData, setFormData] = useState({
    judulLF: '',
    deskripsiLF: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch LayananFasilitas data from API
  const fetchLayananFasilitasData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/layananfasilitas');
      setLayananFasilitas(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new LayananFasilitas
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/layananfasilitas', formData);
      setLayananFasilitas([...layananFasilitas, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update LayananFasilitas
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/layananfasilitas/${editData.uuid}`, editData);
      setLayananFasilitas(layananFasilitas.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete LayananFasilitas
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/layananfasilitas/${uuid}`);
      setLayananFasilitas(layananFasilitas.filter(item => item.uuid !== uuid));
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
    fetchLayananFasilitasData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Layanan & Fasilitas Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Layanan & Fasilitas</CButton>

              {/* Add LayananFasilitas Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judulLF" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulLF"
                          name="judulLF"
                          value={formData.judulLF}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsiLF" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsiLF"
                          name="deskripsiLF"
                          value={formData.deskripsiLF}
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

              {/* Edit LayananFasilitas Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="judulLF" className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          id="judulLF"
                          name="judulLF"
                          value={editData.judulLF}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsiLF" className="form-label">Deskripsi</label>
                        <textarea
                          className="form-control"
                          id="deskripsiLF"
                          name="deskripsiLF"
                          value={editData.deskripsiLF}
                          onChange={handleEditInputChange}
                        ></textarea>
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

              {/* LayananFasilitas Data Table */}
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
                    {layananFasilitas.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.judulLF}</CTableDataCell>
                        <CTableDataCell className='text-center'>
                          {/* <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}> */}
                            {data.deskripsiLF}
                          {/* </div> */}
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
      <DataFasilitasUnggulanDashboard/>
      <DataFasilitasPendukungDashboard/>
      <LayananPenunjangDashboard/>
      <RawatInapDashboard/>
      <RawatJalanDashboard/>
      <TarifPersalinanDashboard/>
    </>
    
  );
};

export default LayananFasilitasDashboard;
