import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { Form } from '../components/Form/Form';
import { Input } from '../components/Form/Input';
import { Select } from '../components/Form/Select';
import { api } from '../services/api';
import { Plus, X, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import FormModal from '../components/FormModal';
import { useToast } from '../context/ToastContext';

const Users = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  
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
      showToast('User deleted successfully', 'success');
      fetchUsers();
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      // In a real app, you would have a bulk delete endpoint. 
      // Here we simulate it by deleting one by one via the mock provider.
      for (const user of selectedUsers) {
        await api.delete(`/users/${user.id}`);
      }
      showToast(`${selectedUsers.length} users deleted successfully`, 'success');
      setSelectedUsers([]);
      setBulkDeleteModalOpen(false);
      fetchUsers();
    } catch (err) {
      showToast(err.message || 'Failed to perform bulk delete', 'error');
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
        const payload = { ...values };
        if (!payload.password) {
            delete payload.password;
        }
        await api.put(`/users/${editingUser.id}`, payload);
        showToast('User updated successfully', 'success');
      } else {
        await api.post('/users', values);
        showToast('User created successfully', 'success');
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

  const filterOptions = [
    { key: 'role', label: 'Role', options: ['Admin', 'Manager', 'Employee', 'Customer'] },
    { key: 'status', label: 'Status', options: ['Active', 'Inactive'] }
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          {selectedUsers.length > 0 && (
            <button 
              onClick={() => setBulkDeleteModalOpen(true)}
              className="flex items-center gap-2 rounded-md bg-[#EF4444] px-4 py-2 font-medium text-white hover:bg-opacity-90 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedUsers.length})
            </button>
          )}
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 font-medium text-white hover:bg-opacity-90 transition"
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
        showFilter={true}
        filterOptions={filterOptions}
        selectable={true}
        onSelectionChange={setSelectedUsers}
        loading={loading}
        error={error}
        onRetry={fetchUsers}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User' : 'Add New User'}
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
      </FormModal>
      {/* Bulk Delete Confirm Modal */}
      <ConfirmModal 
        isOpen={bulkDeleteModalOpen}
        onClose={() => setBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Delete Multiple Users"
        message={`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`}
        confirmText="Delete Users"
        isDanger={true}
      />
    </div>
  );
};

export default Users;
