import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Form } from '../components/Form/Form';
import { Input } from '../components/Form/Input';
import { Select } from '../components/Form/Select';
import { api } from '../services/api';
import { Plus, X } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/users');
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      await api.delete(`/users/${user.id}`);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (values, { setApiError }) => {
    try {
      if (editingUser) {
        // Remove password if empty during edit, or omit it from update payload
        const payload = { ...values };
        if (!payload.password) {
            delete payload.password;
        }
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        await api.post('/users', values);
      }
      handleCloseModal();
      fetchUsers();
    } catch (err) {
      setApiError(err.message || 'Failed to save user');
      throw err;
    }
  };

  const columns = [
    { header: 'Full Name', accessor: 'full_name' },
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      accessor: 'role',
      renderCell: (row) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
          row.role === 'Admin' ? 'bg-[#10B981]/10 text-[#10B981]' : 
          row.role === 'Manager' ? 'bg-[#3C50E0]/10 text-[#3C50E0]' :
          row.role === 'Employee' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        }`}>
          {row.role}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
          row.status === 'Active' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-[#1C2434] dark:text-white">
          User Management
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li><span className="font-medium">Dashboard /</span></li>
            <li className="font-medium text-[#3C50E0]">Users</li>
          </ol>
        </nav>
      </div>

      {/* Header Actions */}
      <div className="mb-6 flex justify-end">
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 font-medium text-white hover:bg-opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <DataTable 
        title="All Users"
        columns={columns}
        data={users}
        searchable={true}
        loading={loading}
        error={error}
        onRetry={fetchUsers}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-default dark:bg-[#24303F]">
            <div className="mb-4 flex items-center justify-between border-b border-stroke pb-4 dark:border-[#2E3A47]">
              <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <Form
              initialValues={editingUser || { username: '', email: '', password: '', full_name: '', role: 'Customer', status: 'Active' }}
              validationRules={{
                username: { required: true, minLength: 3 },
                email: { required: true, email: true },
                password: { required: !editingUser, minLength: editingUser ? undefined : 6 },
                role: { required: true },
                status: { required: true }
              }}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input name="full_name" label="Full Name" placeholder="Enter full name" />
                <Input name="username" label="Username" placeholder="Enter username" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input name="email" type="email" label="Email" placeholder="Enter email address" />
                <Input name="password" type="password" label={editingUser ? "New Password (Optional)" : "Password"} placeholder="Enter password" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select name="role" label="Role" options={[
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Employee', label: 'Employee' },
                  { value: 'Customer', label: 'Customer' },
                ]} />
                <Select name="status" label="Status" options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                ]} />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="rounded-md border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="rounded-md bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90"
                >
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
