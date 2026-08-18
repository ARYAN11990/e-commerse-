import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, User, Upload, Camera, Trash2, Key, Bell, Moon, Sun, Monitor } from 'lucide-react';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import { useToast } from '../context/ToastContext';
import DataState from '../components/DataState';

const Settings = () => {
  const { showToast } = useToast();
  const { data, loading, error, fetchData } = useApi('/profile/');
  
  const [personalForm, setPersonalForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', bio: '', job_title: '', location: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  const [notifSettings, setNotifSettings] = useState({
    email: true, sms: false, push: true
  });

  const [profilePhoto, setProfilePhoto] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const fileInputRef = useRef(null);

  const [theme, setTheme] = useState(
    localStorage.getItem('color-theme') || 'light'
  );

  useEffect(() => {
    if (data?.profile) {
      setPersonalForm(data.profile);
    }
  }, [data]);

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile/', personalForm);
      showToast('Personal information updated successfully', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message || 'Failed to update personal info', 'error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      showToast('Password updated successfully', 'success');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showToast('Failed to update password', 'error');
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image size should be less than 2MB', 'error');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
      showToast('Profile photo updated successfully', 'success');
    }
  };

  const handleDeletePhoto = () => {
    setProfilePhoto('https://ui-avatars.com/api/?name=' + (personalForm.first_name || 'User') + '&background=random');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('Profile photo deleted', 'success');
  };

  if (loading) return <DataState loading />;

  return (
    <DataState
      loading={loading}
      error={error}
      onRetry={fetchData}
      isEmpty={!data}
      skeleton={<div className="animate-pulse h-[800px] w-full bg-white dark:bg-boxdark rounded-sm" />}
    >
      <div className="mx-auto max-w-270">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">Settings</h2>
          <nav>
            <ol className="flex items-center gap-2 text-sm">
              <li><NavLink className="font-medium hover:text-primary" to="/">Dashboard /</NavLink></li>
              <li className="font-medium text-primary">Settings</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            
            {/* Personal Information */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handlePersonalSubmit}>
                  <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">First Name</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <User className="w-4 h-4 text-[#64748B]" />
                        </span>
                        <input
                          type="text"
                          value={personalForm.first_name || ''}
                          onChange={(e) => setPersonalForm({...personalForm, first_name: e.target.value})}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Last Name</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <User className="w-4 h-4 text-[#64748B]" />
                        </span>
                        <input
                          type="text"
                          value={personalForm.last_name || ''}
                          onChange={(e) => setPersonalForm({...personalForm, last_name: e.target.value})}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <Mail className="w-4 h-4 text-[#64748B]" />
                        </span>
                        <input
                          type="email"
                          value={personalForm.email || ''}
                          onChange={(e) => setPersonalForm({...personalForm, email: e.target.value})}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                          <Phone className="w-4 h-4 text-[#64748B]" />
                        </span>
                        <input
                          type="text"
                          value={personalForm.phone || ''}
                          onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">BIO</label>
                    <textarea
                      rows={4}
                      value={personalForm.bio || ''}
                      onChange={(e) => setPersonalForm({...personalForm, bio: e.target.value})}
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button type="button" className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition">
                      Cancel
                    </button>
                    <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 transition text-white">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Change Password */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Change Password</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Current Password</label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <Key className="w-4 h-4 text-[#64748B]" />
                      </span>
                      <input
                        type="password"
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">New Password</label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <Key className="w-4 h-4 text-[#64748B]" />
                      </span>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Confirm New Password</label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <Key className="w-4 h-4 text-[#64748B]" />
                      </span>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 transition text-white">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-8">
            
            {/* Your Photo */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
              </div>
              <div className="p-7 text-center flex flex-col items-center">
                <div 
                  className="mb-4 h-28 w-28 rounded-full overflow-hidden relative group cursor-pointer border border-stroke dark:border-strokedark"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h5 className="mb-1 text-sm font-medium text-black dark:text-white">Edit your photo</h5>
                <p className="mb-6 text-xs text-[#64748B]">Click on the image to update</p>

                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <div className="flex gap-3 justify-center w-full">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded border border-stroke py-2 px-4 text-sm font-medium text-black hover:bg-gray dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition"
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                  <button 
                    onClick={handleDeletePhoto}
                    className="flex items-center gap-2 rounded border border-stroke py-2 px-4 text-sm font-medium text-danger hover:bg-danger/10 dark:border-strokedark transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Notification Settings
                </h3>
              </div>
              <div className="p-7">
                <div className="flex flex-col gap-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-black dark:text-white">Email Notifications</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={notifSettings.email} onChange={(e) => {
                        setNotifSettings({...notifSettings, email: e.target.checked});
                        showToast('Notification settings updated', 'success');
                      }} />
                      <div className={`block h-6 w-10 rounded-full transition ${notifSettings.email ? 'bg-primary' : 'bg-stroke dark:bg-strokedark'}`}></div>
                      <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifSettings.email ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-black dark:text-white">SMS Alerts</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={notifSettings.sms} onChange={(e) => {
                        setNotifSettings({...notifSettings, sms: e.target.checked});
                        showToast('Notification settings updated', 'success');
                      }} />
                      <div className={`block h-6 w-10 rounded-full transition ${notifSettings.sms ? 'bg-primary' : 'bg-stroke dark:bg-strokedark'}`}></div>
                      <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifSettings.sms ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-black dark:text-white">Push Notifications</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={notifSettings.push} onChange={(e) => {
                        setNotifSettings({...notifSettings, push: e.target.checked});
                        showToast('Notification settings updated', 'success');
                      }} />
                      <div className={`block h-6 w-10 rounded-full transition ${notifSettings.push ? 'bg-primary' : 'bg-stroke dark:bg-strokedark'}`}></div>
                      <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifSettings.push ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Theme Settings
                </h3>
              </div>
              <div className="p-7">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleThemeChange('light')}
                    className={`flex flex-col items-center gap-2 rounded border py-4 transition ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-stroke text-[#64748B] hover:border-primary dark:border-strokedark dark:text-white'}`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button 
                    onClick={() => handleThemeChange('dark')}
                    className={`flex flex-col items-center gap-2 rounded border py-4 transition ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-stroke text-[#64748B] hover:border-primary dark:border-strokedark dark:text-white'}`}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DataState>
  );
};

export default Settings;
