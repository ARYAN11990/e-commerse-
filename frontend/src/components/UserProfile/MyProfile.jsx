import { useState } from 'react';
import { Pencil } from 'lucide-react';

const MyProfile = ({ data, onEdit }) => {
  if (!data) return <div className="h-64 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-medium text-[#1C2434] dark:text-white text-lg">My Profile</h3>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="flex items-center gap-5 mb-8">
        <div className="h-16 w-16 rounded-full overflow-hidden">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">{data.first_name} {data.last_name}</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mt-1">
            {data.job_title} <span className="mx-2">•</span> {data.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">First Name</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.first_name}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Last Name</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.last_name}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Email address</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.email}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Phone</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.phone}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Bio</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.bio}</span>
        </div>
        <div className="lg:col-span-3">
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Social Links</span>
          <div className="flex items-center gap-4">
            <a href={data.social?.facebook} className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href={data.social?.twitter} className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href={data.social?.linkedin} className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href={data.social?.instagram} className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
