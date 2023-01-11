import React, { useEffect, useState } from "react";
import CustomContainer from "../global/CustomContainer";
import TableCard from "../../components/Table/TableCard";
import { Box, TableCell } from "@mui/material";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import CustomTableRow from "../../components/Table/TableRow";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import TableImage from "../../components/Table/TableImage";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";

import FilterContainer from "../../components/filters/FilterContainer";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import RowIdentifier from "../../components/Table/rowIdentifier";
import DateCell from "../../components/Table/DateCell";
const sortArray = ["createdAt", "name"];
function BrandsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    searchParams.get("rowsPerPage")
      ? parseInt(searchParams.get("rowsPerPage"))
      : 10
  );
  const [search, setSearch] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") ? searchParams.get("sort") : "createdAt"
  );
  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") ? searchParams.get("orderBy") : "asc"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const [pref, setPref] = useState([]);
  const [preferencesFilter, setPrefFilter] = useState(
    searchParams.get("preferences")
      ? searchParams.get("preferences").split(",")
      : []
  );
  const handleFilterPrefChange = (e) => {
    const {
      target: { value },
    } = e;
    setPrefFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDeleteBrand = async (name) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/brand/${name}`);
      getBrands();
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  const getBrands = async () => {
    setLoading(true);
    try {
      const brands = await axios.get(
        `${process.env.REACT_APP_API_URL}/brand?limit=${rowsPerPage}&page=${
          page + 1
        }&sort=${sort},${orderBy}&search=${search}&filter=${preferencesFilter}`
      );
      setBrands(brands.data.data.data);
      setCount(brands.data.data.totalCount);
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    navigate({
      search: `?${createSearchParams({
        rowsPerPage,
        page,
        sort,
        orderBy,
        search,
        preferences: [preferencesFilter],
      })}`,
    });
    getBrands();
  }, [rowsPerPage, page, count, sort, orderBy, search, preferencesFilter]);

  useEffect(() => {
    const getFilteredData = async () => {
      const filterData = await axios.get(
        `${process.env.REACT_APP_API_URL}/pref`
      );
      setPref(filterData.data);
    };
    getFilteredData();
  }, []);

  const handleRestFilters = () => {
    setPrefFilter([]);
    setOrderBy("asc");
    setSort("createdAt");
    setSearch("");
  };

  const columns = [
    { id: "name", label: "Name" },
    { id: "image", label: "Image" },
    { id: "preference", label: "Preference" },
    { id: "contract", label: "Contract Expire" },
    { id: "created_at", label: "Created_At" },
  ];

  const handleTitleClick = () => {
    navigate("/Merchants/add-brand");
  };

  const editAction = (name) => {
    navigate(`/Merchants/${name}`, {
      state: { editable: true },
    });
  };
  const viewAction = (name) => {
    navigate(`/Merchants/${name}`, {
      state: { editable: false },
    });
  };

  return (
    <CustomContainer
      title={"BOGO MERCHANTS"}
      subtitle={"Managing bogo merchants!"}
    >
      <FilterContainer
        handleRestFilters={handleRestFilters}
        name={"Brand"}
        theme={theme}
        addNav={handleTitleClick}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
      >
        <CustomFilter
          label={"Preferences"}
          value={preferencesFilter}
          filterArray={pref}
          onChange={handleFilterPrefChange}
          itemItself={false}
          multiple={true}
          sx={{ flex: 1 }}
        />
      </FilterContainer>
      <TableCard
        columns={columns}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      >
        {error && <Box p={2}>Error , could not fetch data</Box>}
        {brands.length === 0 && !error && !loading && (
          <Box p={2}>No items Found</Box>
        )}

        {!error &&
          brands.map((row, index) => (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row.name}</RowIdentifier>
              <TableImage image={row.image} />
              <TableCell>{row.Preferences.name}</TableCell>
              <DateCell
                sx={{
                  color:
                    new Date() > row.contrat_Expire
                      ? colors.redAccent[500]
                      : colors.greenAccent[500],
                  fontWeight: "bold",
                }}
                date={row.contrat_Expire}
              />
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={() => handleDeleteBrand(row.name)}
                editAction={() => editAction(row?.name)}
                viewAction={() => viewAction(row?.name)}
                colors={colors}
              />
            </CustomTableRow>
          ))}
      </TableCard>
    </CustomContainer>
  );
}

export default BrandsDashboard;
