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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleID: '',
    password: '',
    confPassword: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${uuid}`); // Corrected backticks
      setUsers(users.filter(item => item.uuid !== uuid)); // Remove user from the state
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  const handleCreate = async () => {
    if (formData.password !== formData.confPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      setUsers([...users, response.data]);
      setShowForm(false);
      setFormData({ name: '', email: '', roleID: '', password: '', confPassword: '' });
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  const handleEdit = (uuid) => {
    const dataToEdit = users.find(item => item.uuid === uuid);
    setEditData(dataToEdit);
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    if (editData.password !== editData.confPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/${editData.uuid}`, editData);
      setUsers(users.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false);
      setEditData(null);
      
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>User Management</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CButton color="info" onClick={() => setShowForm(true)}>Add User</CButton>
                </CCol>
              </CRow>
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCreate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="roleID" className="form-label">Role ID</label>
                        <input
                          type="text"
                          className="form-control"
                          id="roleID"
                          name="roleID"
                          value={formData.roleID}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confPassword"
                          name="confPassword"
                          value={formData.confPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={editData.name}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={editData.email}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="roleID" className="form-label">Role ID</label>
                        <input
                          type="text"
                          className="form-control"
                          id="roleID"
                          name="roleID"
                          value={editData.roleID}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={editData.password || ''}
                          onChange={handleEditInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confPassword"
                          name="confPassword"
                          value={editData.confPassword || ''}
                          onChange={handleEditInputChange}
                        />
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

              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className='text-center'>Name</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Email</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Role ID</CTableHeaderCell>
                      <CTableHeaderCell className='text-center'>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users.map((user) => (
                      <CTableRow key={user.uuid}>
                        <CTableDataCell className='text-center'>{user.name}</CTableDataCell>
                        <CTableDataCell className='text-center'>{user.email}</CTableDataCell>
                        <CTableDataCell className='text-center' >{user.roleID}</CTableDataCell>
                        <CTableDataCell className="d-flex justify-content-center">
  {/* <CButton color="warning" onClick={() => handleEdit(user.uuid)}>Edit</CButton> */}
  <CButton color="danger" className="ms-2" onClick={() => handleDelete(user.uuid)}>Delete</CButton>
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

export default Dashboard;
