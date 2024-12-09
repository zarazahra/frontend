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

const JadwalPoliPsikologDashboard = () => {
  const [jadwalPoliPsikolog, setJadwalPoliPsikolog] = useState([]);
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

  const fetchJadwalPoliPsikologData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jadwalPoliPsikolog');
      setJadwalPoliPsikolog(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/jadwalPoliPsikolog', formData);
      setJadwalPoliPsikolog([...jadwalPoliPsikolog, response.data]);
      setShowForm(false);
      setFormData({
        nama: '',
        senin: '',
        selasa: '',
        rabu: '',
        kamis: '',
        jumat: '',
        sabtu: '',
        minggu: '',
      }); // Reset form data after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/jadwalPoliPsikolog/${editData.uuid}`, editData);
      setJadwalPoliPsikolog(jadwalPoliPsikolog.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false);
      setEditData(null);
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/jadwalPoliPsikolog/${uuid}`);
      setJadwalPoliPsikolog(jadwalPoliPsikolog.filter(item => item.uuid !== uuid));
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  useEffect(() => {
    fetchJadwalPoliPsikologData();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Jadwal Poli Psikolog Dashboard</CCardHeader>
            <CCardBody>
              <CButton color="info" onClick={() => setShowForm(true)} className="mb-3">Add Jadwal Poli Psikolog</CButton>

              {showForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
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

              {showEditForm && (
                <CCard className="mb-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      {['nama', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((field) => (
                        <div className="mb-3" key={field}>
                          <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                          <input
                            type="text"
                            className="form-control"
                            id={field}
                            name={field}
                            value={editData ? editData[field] : ''}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                      ))}
                      <CButton type="submit" color="success">Update</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => {
                        setShowEditForm(false);
                        setEditData(null);
                      }}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

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
                    {jadwalPoliPsikolog.map((data) => (
                      <CTableRow key={data.uuid}>
                        <CTableDataCell className='text-center'>{data.nama}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.senin}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.selasa}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.rabu}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.kamis}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.jumat}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.sabtu}</CTableDataCell>
                        <CTableDataCell className='text-center'>{data.minggu}</CTableDataCell>
                        <CTableDataCell className='text-center'>
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

export default JadwalPoliPsikologDashboard;
