import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="relative w-full mt-10">
      {/* Banner for larger screens */}
      <div className="hidden md:block">
        <img 
          src="https://example.com/large-banner.jpg" 
          alt="Large Banner" 
          className="w-full h-auto" 
        />
      </div>
      {/* Banner for smaller screens */}
      <div className="block md:hidden">
        <img 
          src="https://example.com/small-banner.jpg" 
          alt="Small Banner" 
          className="w-full h-auto" 
        />
      </div>
    </div>
  );
};

export default Banner;
