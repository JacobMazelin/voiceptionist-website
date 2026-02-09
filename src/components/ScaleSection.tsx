import React from 'react';

const ScaleSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl font-medium tracking-tight text-gray-900">For startups, global enterprises, and everyone in between.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Simple defaults, direct integrations, and advanced customization means Voiceptionist will scale with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Completely flexible.</h3>
              <p className="text-gray-500">Customize Voiceptionist to fit your business and give you the controls you need with policies, roles, and approval workflows.</p>
              <div className="pt-10">
                 <div className="bg-gray-50 rounded-2xl p-6 h-40 flex items-center justify-center border border-gray-100">
                    <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between w-full max-w-xs">
                       <span className="font-bold text-gray-900">Over</span>
                       <span className="text-3xl font-bold text-gray-900">$75</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">An extension of your team.</h3>
              <p className="text-gray-500">Get dedicated support anytime, anywhere. We're always ready to help.</p>
              <div className="pt-10 flex justify-center">
                 <div className="bg-[#bfdbfe] w-full max-w-xs rounded-3xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-sm">
                       <img src="https://picsum.photos/seed/nathan/100/100" alt="Support" />
                    </div>
                    <div>
                       <p className="text-blue-900 font-bold">How can I help?</p>
                       <p className="text-blue-700 text-sm">Nathan, Voiceptionist</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Integrate and stay synced.</h3>
              <p className="text-gray-500">Seamlessly integrate Voiceptionist with your accounting systems and consolidate your finance stack.</p>
              <div className="grid grid-cols-2 gap-4 pt-10">
                 <div className="h-24 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-3xl">sage</div>
                 <div className="h-24 bg-gray-50 rounded-xl flex items-center justify-center text-sky-500 font-bold text-3xl">xero</div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-3xl space-y-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Operate globally.</h3>
              <p className="text-gray-500">Send payments to 195 countries in over 40 currencies and reimburse employees in their local currencies within 2 days.</p>
              <div className="pt-10 space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900">£550</span>
                    <span className="text-xs bg-yellow-100 px-2 py-1 rounded font-bold">£ GBP</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900">€230</span>
                    <span className="text-xs bg-emerald-100 px-2 py-1 rounded font-bold">€ EUR</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleSection;