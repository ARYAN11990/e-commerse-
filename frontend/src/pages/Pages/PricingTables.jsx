import React, { useState } from 'react';

const CheckIcon = ({ className = "text-green-500" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PricingTables = () => {
  const [isAnnual1, setIsAnnual1] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-10 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Pricing Tables</h1>
      </div>

      {/* Pricing Table 1 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing Table 1</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Choose the plan that fits your needs.</p>
          
          <div className="mt-6 flex justify-center items-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual1(!isAnnual1)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none"
            >
              <span className={`${isAnnual1 ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Annually</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Basic */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Perfect for starters.</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">${isAnnual1 ? '12.00' : '25.00'}</span>
              <span className="text-gray-500 dark:text-gray-400">/{isAnnual1 ? 'year' : 'month'}</span>
            </div>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">1 User</span></li>
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">10 Projects</span></li>
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">5GB Storage</span></li>
            </ul>
            <button className="mt-8 w-full py-2.5 px-4 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Choose Plan</button>
          </div>

          {/* Professional */}
          <div className="border-2 border-blue-600 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-xl bg-blue-600 text-white">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
            </div>
            <h3 className="text-lg font-medium text-white">Professional</h3>
            <p className="text-blue-100 mt-2 text-sm">For growing businesses.</p>
            <div className="my-6">
              <span className="text-4xl font-bold">${isAnnual1 ? '59.00' : '99.00'}</span>
              <span className="text-blue-100">/{isAnnual1 ? 'year' : 'month'}</span>
            </div>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3"><CheckIcon className="text-white" /> <span className="text-sm">5 Users</span></li>
              <li className="flex items-center gap-3"><CheckIcon className="text-white" /> <span className="text-sm">50 Projects</span></li>
              <li className="flex items-center gap-3"><CheckIcon className="text-white" /> <span className="text-sm">100GB Storage</span></li>
              <li className="flex items-center gap-3"><CheckIcon className="text-white" /> <span className="text-sm">Priority Support</span></li>
            </ul>
            <button className="mt-8 w-full py-2.5 px-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">Choose Plan</button>
          </div>

          {/* Business */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">For large enterprises.</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">${isAnnual1 ? '199.00' : '299.00'}</span>
              <span className="text-gray-500 dark:text-gray-400">/{isAnnual1 ? 'year' : 'month'}</span>
            </div>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">Unlimited Users</span></li>
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">Unlimited Projects</span></li>
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">1TB Storage</span></li>
              <li className="flex items-center gap-3"><CheckIcon /> <span className="text-sm">24/7 Support</span></li>
            </ul>
            <button className="mt-8 w-full py-2.5 px-4 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Choose Plan</button>
          </div>
        </div>
      </section>

      {/* Pricing Table 2 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing Table 2</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Simple, transparent pricing for everyone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Starter</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Free</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Get started with basic features.</p>
            <ul className="space-y-3 flex-1">
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ 1 Project</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Basic Analytics</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Start Free</button>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col bg-white dark:bg-gray-800 relative shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$29</span><span className="text-gray-500 dark:text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Ideal for small teams.</p>
            <ul className="space-y-3 flex-1">
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ 5 Projects</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Advanced Analytics</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ 24-hour support</li>
            </ul>
            <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">Upgrade</button>
          </div>

          {/* Card 3 (Highlighted) */}
          <div className="border-2 border-indigo-500 rounded-xl p-6 flex flex-col bg-indigo-50 dark:bg-indigo-900/20 relative shadow-md">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">Recommended</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Agency</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$99</span><span className="text-gray-500 dark:text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">For growing agencies.</p>
            <ul className="space-y-3 flex-1">
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Unlimited Projects</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Custom Analytics</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ 1-hour support</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Custom Domain</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">Upgrade</button>
          </div>

          {/* Card 4 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Enterprise</h3>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Custom</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">For large organizations.</p>
            <ul className="space-y-3 flex-1">
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Everything in Agency</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ Dedicated Account Manager</li>
              <li className="text-sm text-gray-600 dark:text-gray-300">✓ SLA</li>
            </ul>
            <button className="mt-6 w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Pricing Table 3 */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing Table 3</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Pay per use. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-8 md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Standard</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">All the basics for businesses that are just getting started.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">API Access</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Email Support</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 h-full w-full">
              <div className="text-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$49</span>
                <span className="text-gray-500 dark:text-gray-400">/mo</span>
              </div>
              <button className="mt-6 w-full py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Buy Now</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col md:flex-row items-center bg-gray-900 dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden relative transform md:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="p-8 md:w-2/3">
              <h3 className="text-2xl font-semibold text-white mb-2">Premium</h3>
              <p className="text-gray-300 mb-4">Advanced features for pros who need more control.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Priority Support</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Custom Domain</span>
              </div>
            </div>
            <div className="bg-gray-800 dark:bg-gray-600 p-8 md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-700 h-full w-full">
              <div className="text-center">
                <span className="text-4xl font-bold text-white">$149</span>
                <span className="text-gray-300">/mo</span>
              </div>
              <button className="mt-6 w-full py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors shadow-lg shadow-blue-500/30">Buy Now</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingTables;
