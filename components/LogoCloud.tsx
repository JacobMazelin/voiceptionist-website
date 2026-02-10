import React from 'react';

const LogoCloud: React.FC = () => {
  const logos = [
    'Discord', 'GoodRx', "BARRY'S", 'eventbrite', 'VALCOURT', 'ANDURIL', 'shopify', 'Opendoor', 'ZOLA', 'KUMON', 'Webflow', 'Quora', 'VISA'
  ];

  return (
    <div className="bg-white pt-5 pb-9 border-b border-gray-50 overflow-hidden">
      {/* Centered header text */}
      <div className="max-w-7xl mx-auto px-4 mb-2">
        <p className="text-center text-sm font-medium text-gray-500">
          100+ apartment teams have saved thousands of hours with Voiceptionist
        </p>
      </div>
      
      {/* Edge-to-edge carousel */}
      <div className="relative overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw]">
         <div className="animate-scroll opacity-40 grayscale flex items-center space-x-24 py-2">
            {/* Double items for seamless scroll */}
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <span key={i} className="text-3xl font-bold tracking-tighter whitespace-nowrap cursor-default hover:text-black transition-colors">{logo}</span>
            ))}
         </div>
      </div>
    </div>
  );
};

export default LogoCloud;