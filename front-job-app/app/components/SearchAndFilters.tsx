export default function SearchAndFilters() {
  return (
    <div className="grid grid-cols-[75%_1fr] py-3 items-center text-center">
      <form action="POST" className="bg-amber-100 h-10 rounded-xl relative">
        <button className="absolute text-black inset-y-0 right-2 flex items-center">
          Icon
        </button>
        <input type="text" name="search" className="w-full h-full" />
      </form>
      <button>Filters</button>
    </div>
  );
}
