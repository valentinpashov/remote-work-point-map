import SearchBar from './SearchBar';

interface User {
  id: number;
  username: string;
  email: string;
}

interface TopBarProps {
  user: User | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredCount: number;
  totalCount: number;
}

export default function TopBar({ user, searchTerm, setSearchTerm, filteredCount, totalCount }: TopBarProps) {
  return (
    <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm whitespace-nowrap">
        {user ? `Hello, ${user.username}` : '👀 Guest Mode'}
      </div>
      
      <div className="flex-1 w-full flex justify-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="text-sm text-gray-500 font-semibold whitespace-nowrap flex flex-col text-right">
        <span>Found: <span className="text-blue-600">{filteredCount}</span> / {totalCount}</span>
        {!user && <span className="text-xs font-normal text-gray-400 mt-1">Only logged-in users can add locations</span>}
      </div>
    </div>
  );
}