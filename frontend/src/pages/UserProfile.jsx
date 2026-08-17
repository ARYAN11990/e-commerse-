import { useState } from 'react';
import MyProfile from '../components/UserProfile/MyProfile';
import Address from '../components/UserProfile/Address';
import Security from '../components/UserProfile/Security';
import DangerZone from '../components/UserProfile/DangerZone';
import { ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import DataState from '../components/DataState';
import { Form, Input, Textarea, useFormContext } from '../components/Form';
import { useToast } from '../context/ToastContext';

const UserProfile = () => {
  const { showToast } = useToast();
  const { data, setData, loading, error, fetchData: fetchProfileData } = useApi('/profile/');
  
  // Modal States
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  
  // Form States
  const [profileForm, setProfileForm] = useState({});
  const [addressForm, setAddressForm] = useState({});

  const handleUpdateProfile = async (values) => {
    try {
      await api.put('/profile/', values);
      setEditProfileOpen(false);
      showToast('Profile updated successfully', 'success');
      fetchProfileData();
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    }
  };

  const handleUpdateAddress = async (values) => {
    try {
      await api.put('/profile/address', values);
      setEditAddressOpen(false);
      showToast('Address updated successfully', 'success');
      fetchProfileData();
    } catch (err) {
      showToast(err.message || 'Failed to update address', 'error');
    }
  };

  const handleUpdate2FA = (securityData) => {
    setData(prev => ({ ...prev, security: securityData }));
  };

  const openProfileEdit = () => {
    setProfileForm(data.profile);
    setEditProfileOpen(true);
  };

  const openAddressEdit = () => {
    setAddressForm(data.address);
    setEditAddressOpen(true);
  };

  return (
    <DataState
      loading={loading}
      error={error}
      onRetry={fetchProfileData}
      isEmpty={!data}
      skeleton={<div className="animate-pulse h-[800px]" />}
    >
      {data && (
        <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">User Profile</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <span className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">User Profile</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <MyProfile data={data.profile} onEdit={openProfileEdit} />
        <Address data={data.address} onEdit={openAddressEdit} />
        <Security data={data.security} onUpdate2FA={handleUpdate2FA} />
        <DangerZone />
      </div>

      {/* Profile Edit Modal */}
      {editProfileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setEditProfileOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl rounded-lg bg-white dark:bg-[#24303F] shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stroke dark:border-[#2E3A47]">
              <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">Edit Profile</h3>
            </div>
            <Form 
              initialValues={profileForm} 
              validationRules={{
                first_name: { required: 'First name is required' },
                last_name: { required: 'Last name is required' },
                email: { required: 'Email is required', email: 'Invalid email' },
              }}
              onSubmit={handleUpdateProfile} 
              className="flex-1 overflow-y-auto p-6 flex flex-col"
            >
              <div className="grid grid-cols-2 gap-4 flex-1">
                <Input name="first_name" label="First Name" containerClassName="" />
                <Input name="last_name" label="Last Name" containerClassName="" />
                <Input name="email" type="email" label="Email" containerClassName="" />
                <Input name="phone" label="Phone" containerClassName="" />
                <Input name="job_title" label="Job Title" containerClassName="" />
                <Input name="location" label="Location" containerClassName="" />
                <Textarea name="bio" label="Bio" containerClassName="col-span-2" rows={3} />
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setEditProfileOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
                <SubmitButton text="Save Changes" loadingText="Saving..." />
              </div>
            </Form>
          </div>
        </>
      )}

      {/* Address Edit Modal */}
      {editAddressOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setEditAddressOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl rounded-lg bg-white dark:bg-[#24303F] shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stroke dark:border-[#2E3A47]">
              <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">Edit Address</h3>
            </div>
            <Form 
              initialValues={addressForm} 
              validationRules={{
                country: { required: 'Country is required' },
                city_state: { required: 'City/State is required' },
              }}
              onSubmit={handleUpdateAddress} 
              className="flex-1 overflow-y-auto p-6 flex flex-col"
            >
              <div className="grid grid-cols-2 gap-4 flex-1">
                <Input name="country" label="Country" containerClassName="" />
                <Input name="city_state" label="City/State" containerClassName="" />
                <Input name="postal_code" label="Postal Code" containerClassName="" />
                <Input name="tax_id" label="TAX ID" containerClassName="" />
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setEditAddressOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
                <SubmitButton text="Save Changes" loadingText="Saving..." />
              </div>
            </Form>
          </div>
        </>
      )}
        </>
      )}
    </DataState>
  );
};

const SubmitButton = ({ text, loadingText }) => {
  const { isSubmitting } = useFormContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};

export default UserProfile;
