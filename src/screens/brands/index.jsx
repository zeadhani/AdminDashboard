import React, { useState } from "react";
import CustomContainer from "../global/CustomContainer";
import TableCard from "../../components/Table/TableCard";
import { TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTableRow from "../../components/Table/TableRow";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import TableImage from "../../components/Table/TableImage";
import ActionsButtonsTable from "../../components/Table/ActionsButtonsTable";
import FilterContainer from "../../components/filters/FilterContainer";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import RowIdentifier from "../../components/Table/rowIdentifier";
import DateCell from "../../components/Table/DateCell";
import usePage from "../../components/hooks/general/usePage";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import useBrandFilters from "../../components/hooks/merchants/useBrandFilters";

import authFetch from "../../services/interceptors";
import useBrandsPage from "../../components/hooks/merchants/useBrandsPage";

const columns = [
  { id: "name", label: "Name" },
  { id: "image", label: "Image" },
  { id: "preference", label: "Preference" },
  { id: "contract", label: "Contract Expire" },
  { id: "created_at", label: "Created_At" },
];
const sortArray = ["createdAt", "name"];
function BrandsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    sort,
    search,
    orderBy,
    handleOrderByChange,
    handleSearchChange,
    resetCommonFilters,
    handleSortChange,
  } = useCommonFilters();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { preferencesFilter, handleFilterPrefChange, resetBrandFilters } =
    useBrandFilters();

  const { brands, count, getBrands, pref } = useBrandsPage({
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    preferencesFilter,
  });
  const handleDeleteBrand = (name) => {
    return async () => {
      setLoading(true);
      try {
        await authFetch.delete(`/brand/${name}`);
        getBrands();
        setError(false);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
  };
  const handleRestFilters = () => {
    resetBrandFilters();
    resetCommonFilters();
  };
  const handleTitleClick = () => {
    navigate("/Merchants/add-brand");
  };
  const editAction = (id) => {
    return () => {
      navigate(`/Merchants/${id}`, {
        state: { editable: true.toString() },
      });
    };
  };
  const viewAction = (id) => {
    return () => {
      navigate(`/Merchants/${id}`, {
        state: { editable: false.toString() },
      });
    };
  };

  return (
    <CustomContainer
      title={"BOGO MERCHANTS"}
      subtitle={"Managing bogo merchants! "}
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
        searchLabel={"Search By Brand Name"}
      >
        <CustomFilter
          label={"Preferences"}
          value={preferencesFilter}
          filterarray={pref}
          onChange={handleFilterPrefChange}
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
        error={error}
        loading={loading}
        model={brands}
      >
        {brands?.map((row, index) => {
          const dateIsBiggerThanCurrentDate =
            new Date().toISOString() > row.contrat_Expire;
          return (
            <CustomTableRow colors={colors} key={row.id}>
              <RowIdentifier>{row.name}</RowIdentifier>
              <TableImage image={row.image} />
              <TableCell>{row.Preferences.name}</TableCell>
              <DateCell
                sx={{
                  color: dateIsBiggerThanCurrentDate
                    ? colors.redAccent[500]
                    : colors.greenAccent[500],
                  fontWeight: "bold",
                }}
                date={row.contrat_Expire}
              />
              <DateCell date={row.createdAt} />
              <ActionsButtonsTable
                deleteAction={handleDeleteBrand(row.name)}
                editAction={editAction(row?.id)}
                viewAction={viewAction(row?.id)}
                colors={colors}
              />
            </CustomTableRow>
          );
        })}
      </TableCard>
    </CustomContainer>
  );
}

export default BrandsDashboard;
// const { brands, count, getBrands } = useBrands(
//   setLoading,
//   rowsPerPage,
//   page,
//   sort,
//   orderBy,
//   search,
//   setError,
//   preferencesFilter
// );
// const { pref } = usePreferences();
