import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { 
  Search, Upload, Image as ImageIcon, Video, Music, 
  AppWindow, FileText, Download, Folder, File, Trash, MoreVertical
} from 'lucide-react';

const FileManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFiles, setRecentFiles] = useState([
    { id: 1, name: "Dashboard UI.fig", size: "1.2 MB", date: "Oct 12, 2024", type: "Figma" },
    { id: 2, name: "Project Presentation.pptx", size: "2.4 MB", date: "Oct 10, 2024", type: "PowerPoint" },
    { id: 3, name: "Logo Design.ai", size: "4.8 MB", date: "Oct 08, 2024", type: "Illustrator" },
    { id: 4, name: "Video Intro.mp4", size: "124 MB", date: "Oct 05, 2024", type: "Video" },
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: file.type || "Unknown"
      };
      setRecentFiles([newFile, ...recentFiles]);
    }
  };

  const summaryCards = [
    { title: "Images", count: "1,432 Files", size: "15 GB", percent: 45, icon: <ImageIcon className="w-5 h-5" />, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", bar: "bg-blue-500" },
    { title: "Videos", count: "232 Files", size: "32 GB", percent: 70, icon: <Video className="w-5 h-5" />, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", bar: "bg-red-500" },
    { title: "Audio", count: "89 Files", size: "3 GB", percent: 15, icon: <Music className="w-5 h-5" />, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", bar: "bg-yellow-500" },
    { title: "Apps", count: "12 Files", size: "8 GB", percent: 25, icon: <AppWindow className="w-5 h-5" />, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", bar: "bg-purple-500" },
    { title: "Docs", count: "5,432 Files", size: "5 GB", percent: 20, icon: <FileText className="w-5 h-5" />, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", bar: "bg-green-500" },
    { title: "Downloads", count: "112 Files", size: "12 GB", percent: 35, icon: <Download className="w-5 h-5" />, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", bar: "bg-orange-500" },
  ];

  const folders = [
    { title: "Images", count: "1,432 Files", size: "15 GB", icon: <Folder className="w-6 h-6 text-blue-500" /> },
    { title: "Documents", count: "5,432 Files", size: "5 GB", icon: <Folder className="w-6 h-6 text-green-500" /> },
    { title: "Apps", count: "12 Files", size: "8 GB", icon: <Folder className="w-6 h-6 text-purple-500" /> },
    { title: "Downloads", count: "112 Files", size: "12 GB", icon: <Folder className="w-6 h-6 text-orange-500" /> },
  ];

  const donutOptions = {
    chart: { fontFamily: 'Satoshi, sans-serif', type: 'donut' },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: ['Images', 'Documents', 'Media', 'Other'],
    legend: { show: false, position: 'bottom' },
    plotOptions: { pie: { donut: { size: '75%', background: 'transparent' } } },
    dataLabels: { enabled: false },
    responsive: [
      { breakpoint: 2600, options: { chart: { width: 300 } } },
      { breakpoint: 640, options: { chart: { width: 250 } } },
    ],
  };

  const donutSeries = [45, 25, 20, 10];

  const filteredFiles = recentFiles.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Top Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body dark:text-bodydark">
            <Search className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-stroke bg-white py-3 pl-12 pr-4 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-white"
          />
        </div>
        <div>
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90">
            <Upload className="w-5 h-5" />
            <span>Upload File</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Top Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {summaryCards.map((card, idx) => (
              <div key={idx} className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${card.bg} ${card.color}`}>
                  {card.icon}
                </div>
                <h4 className="font-bold text-black dark:text-white">{card.title}</h4>
                <p className="text-xs font-medium text-body dark:text-bodydark">{card.count}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-body dark:text-bodydark">{card.size}</span>
                    <span className="text-black dark:text-white">{card.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-stroke dark:bg-strokedark">
                    <div className={`h-full rounded-full ${card.bar}`} style={{ width: `${card.percent}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Folders */}
          <div>
            <h3 className="text-title-md font-semibold text-black dark:text-white mb-4">All Folders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {folders.map((f, i) => (
                <div key={i} className="flex items-center gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-2 dark:bg-meta-4">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">{f.title}</h4>
                    <p className="text-xs font-medium text-body dark:text-bodydark">{f.count} • {f.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files Table */}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Recent Files
            </h4>

            <div className="flex flex-col overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
                  <div className="p-2.5 xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">File Name</h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">Date</h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">Size</h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">Action</h5>
                  </div>
                </div>

                {filteredFiles.map((file, key) => (
                  <div
                    className={`grid grid-cols-4 ${
                      key === filteredFiles.length - 1
                        ? ''
                        : 'border-b border-stroke dark:border-strokedark'
                    }`}
                    key={file.id}
                  >
                    <div className="flex items-center gap-3 p-2.5 xl:p-5">
                      <div className="flex-shrink-0">
                        <File className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-black dark:text-white sm:block truncate">
                        {file.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-black dark:text-white text-sm">{file.date}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                      <p className="text-black dark:text-white text-sm">{file.size}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5 gap-3 text-body dark:text-bodydark">
                      <button className="hover:text-primary transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button 
                        className="hover:text-danger transition-colors"
                        onClick={() => setRecentFiles(recentFiles.filter(f => f.id !== file.id))}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredFiles.length === 0 && (
                  <div className="p-5 text-center text-body dark:text-bodydark">
                    No files found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Aside (Storage Details) */}
        <div className="w-full xl:w-96 flex-shrink-0">
          <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-title-md font-semibold text-black dark:text-white mb-6">Storage Details</h3>
            
            <div className="mb-6 flex justify-center">
              <ReactApexChart options={donutOptions} series={donutSeries} type="donut" />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#3C50E0]"></span>
                  <span className="font-medium text-black dark:text-white">Images</span>
                </div>
                <span className="font-medium text-body dark:text-bodydark">45 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#6577F3]"></span>
                  <span className="font-medium text-black dark:text-white">Documents</span>
                </div>
                <span className="font-medium text-body dark:text-bodydark">25 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#8FD0EF]"></span>
                  <span className="font-medium text-black dark:text-white">Media</span>
                </div>
                <span className="font-medium text-body dark:text-bodydark">20 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#0FADCF]"></span>
                  <span className="font-medium text-black dark:text-white">Other</span>
                </div>
                <span className="font-medium text-body dark:text-bodydark">10 GB</span>
              </div>
            </div>
            
            <div className="mt-8 border-t border-stroke pt-6 dark:border-strokedark">
              <p className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-black dark:text-white">Available: 250 GB</span>
                <span className="text-black dark:text-white">Used: 100 GB</span>
              </p>
              <div className="h-2.5 w-full rounded-full bg-stroke dark:bg-strokedark">
                <div className="h-full rounded-full bg-primary" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
