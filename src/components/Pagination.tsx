export type PaginationProps = {
  currentPage: number,
  totalPages: number,
  onChange: (page: number) => void,
}


function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onChange: setCurrentPage } = props;

  return <footer style={{
    display: "flex",
    gap: "1rem"
  }}>
    <button disabled={currentPage === 1}
      className="btn btn-primary"
      onClick={() => {
        setCurrentPage(1);
      }}>First</button>

    <div className="join grid grid-cols-2">
      <button disabled={currentPage === 1}
        className="join-item btn btn-outline"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}>Prev</button>
      <button disabled={currentPage >= totalPages}
        className="join-item btn btn-outline"
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}>Next</button>
    </div>

    <button disabled={currentPage >= totalPages}
      className="btn btn-primary"
      onClick={() => {
        setCurrentPage(totalPages);

      }}>Last</button>
    <select value={currentPage} onChange={(e) => {
      setCurrentPage(Number(e.target.value));
    }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        return <option key={page} value={page}>{page}</option>
      })}
    </select>
  </footer>;
}

export default Pagination;
