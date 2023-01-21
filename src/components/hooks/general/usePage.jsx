import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

function usePage() {
  const [searchParams] = useSearchParams();
    const [page, setPage] = useState(
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 0
      );
      const [rowsPerPage, setRowsPerPage] = useState(
        searchParams.get("rowsPerPage")
          ? parseInt(searchParams.get("rowsPerPage"))
          : 10
      );

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return { page, handleChangePage ,rowsPerPage,handleChangeRowsPerPage};
}

export default usePage