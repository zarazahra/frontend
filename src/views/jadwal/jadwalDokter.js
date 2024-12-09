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

// Component for managing JadwalDokter
const JadwalDokterDashboard = () => {
  const [jadwalDokter, setJadwalDokter] = useState([]);
  const [formData, setFormData] = useState({
    namaDokter: '',
    spesialis: '',
    senin: '',
    selasa: '',
    rabu: '',
    kamis: '',
    jumat: '',
    sabtu: '',
    minggu: '',
    aktif: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch JadwalDokter data from API
  const fetchJadwalDokterData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jadwaldokter');
      setJadwalDokter(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new JadwalDokter
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/jadwaldokter', formData);
      setJadwalDokter([...jadwalDokter, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update JadwalDokter
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/jadwaldokter/${editData.uuid}`, editData);
      setJadwalDokter(jadwalDokter.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete JadwalDokter
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/jadwaldokter/${uuid}`);
      setJadwalDokter(jadwalDokter.filter(item => item.uuid !== uuid));
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
    fetchJadwalDokterData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Jadwal Dokter Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Jadwal Dokter</CButton>

              {/* Add JadwalDokter Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="namaDokter" className="form-label">Nama Dokter</label>
                        <input
                          type="text"
                          className="form-control"
                          id="namaDokter"
                          name="namaDokter"
                          value={formData.namaDokter}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="spesialis" className="form-label">Spesialis</label>
                        <input
                          type="text"
                          className="form-control"
                          id="spesialis"
                          name="spesialis"
                          value={formData.spesialis}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => (
                        <div className="mb-3" key={day}>
                          <label htmlFor={day} className="form-label">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                          <input
                            type="text"
                            className="form-control"
                            id={day}
                            name={day}
                            value={formData[day]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}
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
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit JadwalDokter Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {['namaDokter', 'spesialis', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu', 'aktif'].map((field) => (
                        <div className="mb-3" key={field}>
                          <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                          <input
                            type="text"
                            className="form-control"
                            id={field}
                            name={field}
                            value={editData[field]}
                            onChange={handleEditInputChange}
                          />
                        </div>
                      ))}
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false); // Hide edit form
                        setEditData(null); // Clear edit data
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* JadwalDokter Data Table */}
              <div style={{ overflowX: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='text-center'>Nama Dokter</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Spesialis</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Senin</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Selasa</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Rabu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Kamis</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Jumat</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Sabtu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Minggu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Aktif</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {jadwalDokter.map((data) => (
                    <CTableRow key={data.uuid}>
                      <CTableDataCell className='text-center'>{data.namaDokter}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.spesialis}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.senin}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.selasa}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.rabu}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.kamis}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.jumat}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.sabtu}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.minggu}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.aktif}</CTableDataCell>
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

export default JadwalDokterDashboard;
