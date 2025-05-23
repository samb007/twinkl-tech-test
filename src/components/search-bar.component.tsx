interface SearchBarProps {
  setFilter: (filter: string) => void;
}

export const SearchBar = ({ setFilter }: SearchBarProps) => {
  return (
    <div className="flex items-center justify-center w-full md:w-1/2 mb-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
