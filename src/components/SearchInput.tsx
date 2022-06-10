export const SearchInput = () => {
  return (
    <div className="flex justify-center mt-5">
      <input
        type="text"
        className="w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 border border-gray-300 rounded-lg"
        placeholder="Search for a book..."
      />
    </div>
  );
};
