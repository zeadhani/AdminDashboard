import React from "react";
import CustomContainer from "../global/CustomContainer";
import useContactUs from "../../components/hooks/contactus/useContactUs";
import useCommonFilters from "../../components/hooks/general/useCommonFilters";
import { useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import { useState } from "react";
import usePage from "../../components/hooks/general/usePage";
import useContactUsFilters from "../../components/hooks/contactus/useContactUsFilters";
import FilterContainer from "../../components/filters/FilterContainer";
import CustomFilter from "../../components/filters/CustomSingleFilter";
import EmailsSectionCard from "../../components/contactUs/EmailsSectionCard";

const sortArray = ["createdAt"];
function NotificationsDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { page, handleChangePage, handleChangeRowsPerPage, rowsPerPage } =
    usePage();
  const {
    handleOrderByChange,
    handleSearchChange,
    handleSortChange,
    orderBy,
    resetCommonFilters,
    search,
    sort,
  } = useCommonFilters();
  const {
    handleRepliedFilterChange,
    repliedArray,
    repliedFilter,
    resetContactUsFilter,
  } = useContactUsFilters();
  const { contactUs, count, getcontactUs } = useContactUs(
    setLoading,
    rowsPerPage,
    page,
    sort,
    orderBy,
    search,
    setError,
    repliedFilter
  );
  const handleRestFilters = () => {
    resetContactUsFilter();
    resetCommonFilters();
  };

  return (
    <CustomContainer
      title={"Bogo messages"}
      subtitle={"viewing your  messages"}
    >
      <FilterContainer
        handleRestFilters={handleRestFilters}
        theme={theme}
        colors={colors}
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange}
        sort={sort}
        handleOrderByChange={handleOrderByChange}
        orderBy={orderBy}
        sortArray={sortArray}
        searchLabel={"Search By User Email"}
      >
        <CustomFilter
          label={"Replied"}
          value={repliedFilter}
          filterarray={repliedArray}
          itemitself="true"
          onChange={handleRepliedFilterChange}
          sx={{ flex: 1 }}
        />
      </FilterContainer>
      <EmailsSectionCard
        count={count}
        error={error}
        handleChangePage={handleChangePage}
        loading={loading}
        model={contactUs}
        page={page}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        getcontactUs={getcontactUs}
      />
    </CustomContainer>
  );
}

export default NotificationsDashboard;
