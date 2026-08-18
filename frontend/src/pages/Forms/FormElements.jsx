import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, Calendar, Clock, CreditCard, Mail, Phone, Link, Copy, UploadCloud, User, Lock, Send, ChevronDown } from 'lucide-react';

const FormElements = () => {
  const [checkboxState, setCheckboxState] = useState({
    default: false,
    checked: true,
  });

  const [radioState, setRadioState] = useState('default');

  const [toggleState, setToggleState] = useState({
    toggle1: true,
    toggle2: true,
    toggle3: false,
    toggle4: false,
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Form Elements</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Form Elements</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Default Inputs */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Default Inputs</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Input</label>
                <input type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Input with Placeholder</label>
                <input type="text" placeholder="info@gmail.com" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Input</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select Option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Password Input</label>
                <input type="password" placeholder="Enter your password" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Date Picker Input</label>
                <div className="relative">
                  <input type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 pl-5 pr-12 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Time Select Input</label>
                <div className="relative">
                  <input type="time" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 pl-5 pr-12 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Input with Payment</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Card number" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 pl-12 pr-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Select Inputs */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Select Inputs</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Input</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select Option</option>
                    <option value="1">Option 1</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Multiple Select Options</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <div className="flex flex-wrap items-center gap-2 rounded border border-stroke py-3 px-5 dark:border-form-strokedark">
                    <span className="flex items-center gap-1.5 rounded bg-gray-100 py-1 px-2.5 text-sm font-medium dark:bg-meta-4">
                      Option 1 <button className="hover:text-danger">×</button>
                    </span>
                    <span className="flex items-center gap-1.5 rounded bg-gray-100 py-1 px-2.5 text-sm font-medium dark:bg-meta-4">
                      Option 3 <button className="hover:text-danger">×</button>
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Textarea input field</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Description</label>
                <textarea rows="6" placeholder="Enter a description..." className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Description</label>
                <textarea rows="6" disabled placeholder="Enter a description..." className="w-full rounded-lg border-[1.5px] border-stroke bg-whiter py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Description</label>
                <textarea rows="6" placeholder="Enter a description..." className="w-full rounded-lg border-[1.5px] border-danger bg-transparent py-3 px-5 text-black outline-none transition focus:border-danger active:border-danger dark:bg-form-input dark:text-white"></textarea>
                <p className="mt-2 text-sm text-danger">Please enter a message in the textarea.</p>
              </div>
            </div>
          </div>

          {/* Input States */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Input States</h3>
              <p className="text-sm font-medium">Validation styles for error, success and disabled states on form controls.</p>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                <input type="email" placeholder="demoemail" className="w-full rounded-lg border-[1.5px] border-danger bg-transparent py-3 px-5 text-black outline-none transition focus:border-danger active:border-danger dark:bg-form-input dark:text-white" />
                <p className="mt-2 text-sm text-danger">This is an error message.</p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                <input type="email" placeholder="demoemail@gmail.com" className="w-full rounded-lg border-[1.5px] border-success bg-transparent py-3 px-5 text-black outline-none transition focus:border-success active:border-success dark:bg-form-input dark:text-white" />
                <p className="mt-2 text-sm text-success">This is a success message.</p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                <input type="email" disabled placeholder="info@gmail.com" className="w-full rounded-lg border-[1.5px] border-stroke bg-whiter py-3 px-5 text-black outline-none transition dark:border-form-strokedark dark:bg-form-input dark:text-white" />
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-9">
          {/* Input Group */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Input Group</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </span>
                  <input type="email" placeholder="info@gmail.com" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11 pr-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Phone</label>
                <div className="flex">
                  <select className="rounded-l border-[1.5px] border-r-0 border-stroke bg-transparent py-3 px-4 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white">
                    <option>US</option>
                  </select>
                  <input type="text" placeholder="+1 (555) 000-0000" className="w-full rounded-r border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Phone</label>
                <div className="flex">
                  <input type="text" placeholder="+1 (555) 000-0000" className="w-full rounded-l border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  <select className="rounded-r border-[1.5px] border-l-0 border-stroke bg-transparent py-3 px-4 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white">
                    <option>US</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">URL</label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l border-[1.5px] border-r-0 border-stroke bg-gray-100 py-3 px-4 text-sm font-medium text-black dark:border-form-strokedark dark:bg-meta-4 dark:text-white">http://</span>
                  <input type="text" placeholder="www.tailadmin.com" className="w-full rounded-r border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Website</label>
                <div className="flex">
                  <input type="text" placeholder="www.tailadmin.com" className="w-full rounded-l border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  <button className="inline-flex items-center justify-center gap-2 rounded-r border-[1.5px] border-l-0 border-stroke bg-gray-100 py-3 px-4 text-sm font-medium text-black dark:border-form-strokedark dark:bg-meta-4 dark:text-white hover:bg-gray-200 transition">
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Input */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">File Input</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Upload file</label>
                <input type="file" className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white" />
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Checkboxes</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                    <input type="checkbox" className="sr-only" checked={checkboxState.default} onChange={() => setCheckboxState(prev => ({...prev, default: !prev.default}))} />
                    <span className={`opacity-0 ${checkboxState.default ? '!opacity-100' : ''}`}>
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="#3C50E0" stroke="#3C50E0" strokeWidth="0.4"></path>
                      </svg>
                    </span>
                  </div>
                  <span className="text-sm font-medium">Default</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <div className={`relative flex h-5 w-5 items-center justify-center rounded border ${checkboxState.checked ? 'border-primary bg-primary' : 'border-stroke dark:border-strokedark'}`}>
                    <input type="checkbox" className="sr-only" checked={checkboxState.checked} onChange={() => setCheckboxState(prev => ({...prev, checked: !prev.checked}))} />
                    <span className={`opacity-0 ${checkboxState.checked ? '!opacity-100' : ''}`}>
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="white" stroke="white" strokeWidth="0.4"></path>
                      </svg>
                    </span>
                  </div>
                  <span className="text-sm font-medium">Checked</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark opacity-50">
                    <input type="checkbox" className="sr-only" disabled />
                    <span className="opacity-100">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z" fill="#64748B" stroke="#64748B" strokeWidth="0.4"></path>
                      </svg>
                    </span>
                  </div>
                  <span className="text-sm font-medium opacity-50">Disabled</span>
                </label>
              </div>
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Radio Buttons</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-stroke dark:border-strokedark">
                    <input type="radio" name="radio-group" className="sr-only" checked={radioState === 'default'} onChange={() => setRadioState('default')} />
                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${radioState === 'default' ? 'block' : 'hidden'}`}></span>
                  </div>
                  <span className="text-sm font-medium">Default</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <div className={`relative flex h-5 w-5 items-center justify-center rounded-full border ${radioState === 'secondary' ? 'border-primary' : 'border-stroke dark:border-strokedark'}`}>
                    <input type="radio" name="radio-group" className="sr-only" checked={radioState === 'secondary'} onChange={() => setRadioState('secondary')} />
                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${radioState === 'secondary' ? 'block' : 'hidden'}`}></span>
                  </div>
                  <span className="text-sm font-medium text-primary">Secondary</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-stroke dark:border-strokedark opacity-50">
                    <input type="radio" name="disabled-radio" className="sr-only" disabled checked />
                    <span className="block h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <span className="text-sm font-medium opacity-50 text-primary">Disabled Secondary</span>
                </label>
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Toggle switch input</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={toggleState.toggle1} onChange={() => setToggleState(p => ({...p, toggle1: !p.toggle1}))} />
                    <div className="block h-8 w-14 rounded-full bg-stroke dark:bg-strokedark"></div>
                    <div className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${toggleState.toggle1 ? '!right-1 !translate-x-full !bg-primary' : ''}`}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium">Default</span>
                </label>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={toggleState.toggle2} onChange={() => setToggleState(p => ({...p, toggle2: !p.toggle2}))} />
                    <div className={`block h-8 w-14 rounded-full bg-stroke dark:bg-strokedark ${toggleState.toggle2 ? '!bg-primary' : ''}`}></div>
                    <div className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${toggleState.toggle2 ? '!right-1 !translate-x-full' : ''}`}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium">Checked</span>
                </label>
                <label className="flex cursor-pointer select-none items-center opacity-50">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" disabled />
                    <div className="block h-8 w-14 rounded-full bg-stroke dark:bg-strokedark"></div>
                    <div className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium">Disabled</span>
                </label>
              </div>
            </div>
          </div>

          {/* Dropzone */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Dropzone</h3>
            </div>
            <div className="p-6.5">
              <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 hover:bg-gray-2 transition">
                <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <UploadCloud className="w-5 h-5 text-primary" />
                  </span>
                  <p className="text-sm font-medium">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FormElements;
