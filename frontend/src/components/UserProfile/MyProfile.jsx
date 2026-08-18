import React, { useState, useRef } from 'react';
import { Pencil, Camera, Trash2, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';

const MyProfile = ({ data, onEdit, onAvatarUpdate }) => {
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!data) return <div className="h-64 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image must be less than 2MB', 'error');
      return;
    }

    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      await api.post('/profile/avatar', { avatar: url });
      onAvatarUpdate(url);
      showToast('Profile picture updated successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update avatar', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async () => {
    setUploading(true);
    try {
      const defaultAvatar = `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=random`;
      await api.post('/profile/avatar', { avatar: defaultAvatar });
      onAvatarUpdate(defaultAvatar);
      showToast('Profile picture removed', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to remove avatar', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Profile Summary Card (Header) */}
      <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] shadow-default overflow-hidden">
         <div className="h-32 bg-primary/10 relative">
          <div className="absolute right-4 top-4">
            <button onClick={onEdit} className="flex items-center gap-2 rounded-md bg-white dark:bg-boxdark px-4 py-1.5 text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] shadow-sm"> <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
        <div className="px-6 pb-6 relative text-center sm:text-left sm:flex items-end gap-6">
          <div className="relative inline-block mx-auto sm:mx-0 -mt-12 sm:-mt-16 z-10">
            <div className="h-30 w-30 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white dark:border-boxdark bg-gray relative">
              <img src={data.avatar || `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=random`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            {/* Persistent Camera Button */}
            <button 
              onClick={handleImageClick}
              disabled={uploading}
              className="absolute bottom-1 right-1 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              aria-label="Upload profile photo"
              title="Update photo"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            
            {data.avatar && !data.avatar.includes('ui-avatars') && (
              <button 
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 flex items-center justify-center h-6 w-6 bg-danger text-white rounded-full hover:bg-opacity-90 transition shadow-sm"
                aria-label="Remove profile photo"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg, image/png, image/webp" className="hidden" />
          </div>
          <div className="mt-4 sm:mt-0 pb-1 sm:pb-3">
            <h3 className="mb-1 text-2xl font-bold text-black dark:text-white">{data.first_name} {data.last_name}</h3>
            <p className="font-medium text-[#64748B] dark:text-[#8A99AF]">{data.job_title}</p>
            <p className="text-sm text-[#64748B] dark:text-[#8A99AF] mt-1">{data.location}</p>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-medium text-[#1C2434] dark:text-white text-lg">Personal Information</h3>
          <button onClick={onEdit} className="text-[#3C50E0] hover:underline text-sm font-medium flex items-center gap-1">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">First Name</span>
            <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.first_name}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Last Name</span>
            <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.last_name}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Email Address</span>
            <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.email}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Phone Number</span>
            <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.phone}</span>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Bio</span>
            <span className="block text-sm text-[#1C2434] dark:text-white leading-relaxed">{data.bio}</span>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-3">Social Links</span>
          <div className="flex items-center gap-4">
            <a href={data.social?.facebook || '#'} target="_blank" rel="noreferrer" className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] dark:hover:text-[#3C50E0] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href={data.social?.twitter || '#'} target="_blank" rel="noreferrer" className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] dark:hover:text-[#3C50E0] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href={data.social?.linkedin || '#'} target="_blank" rel="noreferrer" className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] dark:hover:text-[#3C50E0] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href={data.social?.instagram || '#'} target="_blank" rel="noreferrer" className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] dark:hover:text-[#3C50E0] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
