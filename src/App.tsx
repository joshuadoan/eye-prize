

import "./app.css"
import Pagination from "./components/Pagination";
import { SearchForm } from "./components/SearchForm";
import { debounce } from "./utils/debounce";
import useFetchData from "./hooks/api/useFetchData";

function App() {
  const {
    isLoading,
    error,
    data,
    totalPages,
    currentPage,
    setSearchTerm,
    setCurrentPage
  } = useFetchData()

  const debouncedSetSearchTerm = debounce(setSearchTerm, 1000);

  if (error) {
    return <main className="h-screen flex justify-center items-center">{error.message}</main>
  }

  return (
    <main className="h-screen flex flex-col p-4 ">
      <header className="navbar bg-base-100 flex items-center gap-2">
        <div className="">total pages: {totalPages}</div>
        <div className="p-1">current page: {currentPage} </div>
        <SearchForm onChange={debouncedSetSearchTerm} />
        {isLoading && <div className="animate-bounce bg-red-400  p-1 " >loading...</div>}
      </header>
      <ul className=" space-y-2 overflow-auto">
        {
          data.map(i => {
            return <li key={i.id} className="p-1">{i.name} {i.description}</li>
          })
        }
        {
          !data.length && <li className="p-2">No data found</li>
        }
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </main>
  );
}

export default App
