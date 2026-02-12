import React from 'react';

const ScaleSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl font-medium tracking-tight text-gray-900">For entrepreneurs, property management companies,<br />and everyone in between.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Simple to start. Powerful as you scale. Voiceptionist grows with your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Completely flexible.</h3>
              <p className="text-gray-500">Customize Voiceptionist to fit your operations with<br />policies, roles, and approval workflows built in.</p>
              <div className="pt-10">
                 <div className="bg-gray-50 rounded-2xl p-6 h-40 flex items-center justify-center border border-gray-100">
                    <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between w-full max-w-xs">
                       <span className="font-bold text-gray-900">After hours</span>
                       <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">AI Active</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">An extension of your team.</h3>
              <p className="text-gray-500">Get dedicated support anytime, anywhere.<br />We're always ready to help.</p>
              <div className="pt-10 flex justify-center">
                 <div className="bg-[#bfdbfe] w-full max-w-xs rounded-3xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                       <span className="font-bold text-lg italic text-slate-900">V</span>
                    </div>
                    <div>
                       <p className="text-blue-900 font-bold">How can I help?</p>
                       <p className="text-blue-700 text-sm">Voiceptionist AI</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Integrate and stay synced.</h3>
              <p className="text-gray-500">Seamlessly integrate Voiceptionist with your management<br />systems and consolidate your finance stack.</p>
              <div className="grid grid-cols-2 gap-4 pt-10">
                 <div className="h-24 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-sm">Yardi</div>
                 <div className="h-24 bg-gray-50 rounded-xl flex items-center justify-center text-sky-500 font-bold text-sm">AppFolio</div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Operate at scale.</h3>
              <p className="text-gray-500">Manage calls, tours, and maintenance across your<br />entire portfolio from a single dashboard.</p>
              <div className="pt-10 space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900">Oakwood Apts</span>
                    <span className="text-xs bg-emerald-100 px-2 py-1 rounded font-bold">120 Units</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900">Pine Ridge</span>
                    <span className="text-xs bg-sky-100 px-2 py-1 rounded font-bold">85 Units</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleSection;