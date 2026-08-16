import { useState, useEffect } from 'react';
import MyProfile from '../components/UserProfile/MyProfile';
import Address from '../components/UserProfile/Address';
import Security from '../components/UserProfile/Security';
import DangerZone from '../components/UserProfile/DangerZone';
import { ChevronRight } from 'lucide-react';
import { api } from '../services/api';

const UserProfile = () => {
  const [data, setData] = useState(null);
  
  // Modal States
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  
  // Form States
  const [profileForm, setProfileForm] = useState({});
  const [addressForm, setAddressForm] = useState({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    api.get('/profile/')
      .then(resData => setData(resData))
      .catch(err => console.error(err));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/profile/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileForm)
    })
      .then(() => {
        setEditProfileOpen(false);
        fetchProfileData();
      });
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/profile/address', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressForm)
    })
      .then(() => {
        setEditAddressOpen(false);
        fetchProfileData();
      });
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

  if (!data) return <div className="animate-pulse h-[800px]" />;

  return (
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
            <form onSubmit={handleUpdateProfile} className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">First Name</label>
                <input type="text" value={profileForm.first_name || ''} onChange={e => setProfileForm({...profileForm, first_name: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Last Name</label>
                <input type="text" value={profileForm.last_name || ''} onChange={e => setProfileForm({...profileForm, last_name: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Email</label>
                <input type="email" value={profileForm.email || ''} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Phone</label>
                <input type="text" value={profileForm.phone || ''} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Job Title</label>
                <input type="text" value={profileForm.job_title || ''} onChange={e => setProfileForm({...profileForm, job_title: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Location</label>
                <input type="text" value={profileForm.location || ''} onChange={e => setProfileForm({...profileForm, location: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div className="col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Bio</label>
                <textarea value={profileForm.bio || ''} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" rows="3" required></textarea>
              </div>
              
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setEditProfileOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
                <button type="submit" className="rounded bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90">Save Changes</button>
              </div>
            </form>
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
            <form onSubmit={handleUpdateAddress} className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Country</label>
                <input type="text" value={addressForm.country || ''} onChange={e => setAddressForm({...addressForm, country: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">City/State</label>
                <input type="text" value={addressForm.city_state || ''} onChange={e => setAddressForm({...addressForm, city_state: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">Postal Code</label>
                <input type="text" value={addressForm.postal_code || ''} onChange={e => setAddressForm({...addressForm, postal_code: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">TAX ID</label>
                <input type="text" value={addressForm.tax_id || ''} onChange={e => setAddressForm({...addressForm, tax_id: e.target.value})} className="w-full rounded border border-stroke dark:border-[#2E3A47] px-4 py-2 outline-none focus:border-[#3C50E0]" required />
              </div>
              
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setEditAddressOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
                <button type="submit" className="rounded bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90">Save Changes</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
