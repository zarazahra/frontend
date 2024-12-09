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

// Component for managing JadwalPoliFisioterapi
const JadwalPoliFisioterapiDashboard = () => {
  const [jadwalPoliFisioterapi, setJadwalPoliFisioterapi] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    senin: '',
    selasa: '',
    rabu: '',
    kamis: '',
    jumat: '',
    sabtu: '',
    minggu: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch JadwalPoliFisioterapi data from API
  const fetchJadwalPoliFisioterapiData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jadwalPoliFisioterapi');
      setJadwalPoliFisioterapi(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new JadwalPoliFisioterapi
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/jadwalPoliFisioterapi', formData);
      setJadwalPoliFisioterapi([...jadwalPoliFisioterapi, response.data]);
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update JadwalPoliFisioterapi
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/jadwalPoliFisioterapi/${editData.uuid}`, editData);
      setJadwalPoliFisioterapi(jadwalPoliFisioterapi.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete JadwalPoliFisioterapi
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/jadwalPoliFisioterapi/${uuid}`);
      setJadwalPoliFisioterapi(jadwalPoliFisioterapi.filter(item => item.uuid !== uuid));
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
    fetchJadwalPoliFisioterapiData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Jadwal Poli Fisioterapi Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Jadwal Poli Fisioterapi</CButton>

              {/* Add JadwalPoliFisioterapi Form */}
              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleCreate(); // Call create handler
                    }}>
                      <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nama"
                          name="nama"
                          value={formData.nama}
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
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit JadwalPoliFisioterapi Form */}
              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleUpdate(); // Call update handler
                    }}>
                      {['nama', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((field) => (
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

              {/* JadwalPoliFisioterapi Data Table */}
              <div style={{ overflowX: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className='text-center'>Nama</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Senin</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Selasa</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Rabu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Kamis</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Jumat</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Sabtu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Minggu</CTableHeaderCell>
                    <CTableHeaderCell className='text-center'>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {jadwalPoliFisioterapi.map((data) => (
                    <CTableRow key={data.uuid}>
                      <CTableDataCell className='text-center'>{data.nama}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.senin}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.selasa}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.rabu}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.kamis}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.jumat}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.sabtu}</CTableDataCell>
                      <CTableDataCell className='text-center'>{data.minggu}</CTableDataCell>
                      {/* <CTableDataCell className='text-center'>
                        <CButton color="warning" className="me-2" onClick={() => {
                          setEditData(data);
                          setShowEditForm(true); // Show edit form
                        }}>Edit</CButton>
                        <CButton color="danger" onClick={() => handleDelete(data.uuid)}>Delete</CButton>
                      </CTableDataCell> */}
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

export default JadwalPoliFisioterapiDashboard;
