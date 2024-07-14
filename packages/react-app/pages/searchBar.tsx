// components/SearchBar.tsx
import React, { useRef, useEffect } from 'react';

type SearchBarProps = {
  isVisible: boolean;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`flex transition-all duration-300`}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-l-md p-2 w-full sm:w-auto"
        // ^ Adjust width to auto on small screens
      />
      <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition ml-1 sm:ml-0 mt-1 sm:mt-0">
        {/* ^ Adjust margin on small screens */}
        Search
      </button>
    </div>
  );
};

export default SearchBar;
