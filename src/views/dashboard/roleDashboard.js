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

const RoleDashboard = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nameRole: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch Roles data from API
  const fetchRoleData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/role');
      setRoles(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handle create new Role
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/api/role', formData);
      setRoles([...roles, response.data]);
      setFormData({ nameRole: '' }); // Reset form data after submission
      setShowForm(false); // Hide form after submission
      window.location.reload(false);
    } catch (error) {
      console.error("There was an error creating the data!", error);
    }
  };

  // Handle update Role
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.patch(`http://localhost:5000/api/role/${editData.uuid}`, editData);
      setRoles(roles.map(item => (item.uuid === response.data.uuid ? response.data : item)));
      setShowEditForm(false); // Hide form after update
      setEditData(null); // Clear edit data
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  // Handle delete Role
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/api/role/${uuid}`);
      setRoles(roles.filter(item => item.uuid !== uuid));
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
    fetchRoleData(); // Fetch data on component mount
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>Role Dashboard</CCardHeader>
            <CCardBody>
              {/* Button to show the create form */}
              <CButton color="info" onClick={() => setShowForm(true)}>Add Role</CButton>

              {/* Add Role Form */}
              {showForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={handleCreate}>
                      {/* Input field for adding a new Role */}
                      <div className="mb-3">
                        <label htmlFor="nameRole" className="form-label">Name Role</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameRole"
                          name="nameRole"
                          value={formData.nameRole}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Submit and Cancel buttons */}
                      <CButton type="submit" color="primary">Submit</CButton>
                      <CButton color="secondary" className="ms-2" onClick={() => setShowForm(false)}>Cancel</CButton>
                    </form>
                  </CCardBody>
                </CCard>
              )}

              {/* Edit Role Form */}
              {showEditForm && (
                <CCard className="mt-3">
                  <CCardBody>
                    <form onSubmit={handleUpdate}>
                      {/* Input field for editing an existing Role */}
                      <div className="mb-3">
                        <label htmlFor="nameRole" className="form-label">Name Role</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameRole"
                          name="nameRole"
                          value={editData?.nameRole || ''}
                          onChange={handleEditInputChange}
                          required
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

              {/* Role Data Table */}
              <div style={{ overflowX: 'auto' }}>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name Role</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {roles.map((role) => (
                      <CTableRow key={role.uuid}>
                        <CTableDataCell>{role.nameRole}</CTableDataCell>
                        <CTableDataCell>
  {/* Responsive styling for buttons */}
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2px' }}>
    <CButton
      color="warning"
      style={{ whiteSpace: 'nowrap', flex: '1 1 auto', width: '10px' }} // Atur lebar tombol Edit
      onClick={() => {
        setEditData(role);
        setShowEditForm(true);
      }}
    >
      Edit
    </CButton>
    <CButton
      color="danger"
      style={{ whiteSpace: 'nowrap', flex: '1 1 auto', width: '10px' }} // Atur lebar tombol Delete
      onClick={() => handleDelete(role.uuid)}
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

export default RoleDashboard;
