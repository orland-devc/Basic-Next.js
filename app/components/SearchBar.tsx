import { Search } from "lucide-react";

// Components/SearchBar.tsx
export const SearchBar = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-64 px-4 py-2 pr-8 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );