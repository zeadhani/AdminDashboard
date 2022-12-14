<Box mx="20px">
  <Header title={"BOGO PRODUCTS"} subtitle={"Managing bogo products!"} />
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "20px",
      paddingBottom: "20px",
    }}
  >
    <Box width={"450px"} display="flex" justifyContent={"space-between"}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          onChange={handleSortChange}
        >
          <MenuItem value={"createdAt"}>Created At</MenuItem>
          <MenuItem value={"price"}>Price</MenuItem>
          <MenuItem value={"name"}>Name</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderBy}
          onChange={handleOrderByChange}
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <FormControl sx={{ width: 400 }}>
      <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={filtered}
        onChange={handleFilterChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {["Admin", "Manager", "Frontend", "Backend"].map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
  <Box sx={{ width: "100%" }} height={5}>
    {loading && (
      <LinearProgress
        color={theme.palette.mode === "dark" ? "info" : "primary"}
        sx={{ height: "5px" }}
      />
    )}
  </Box>
  <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
    <Table stickyHeader sx={{ minWidth: 1200 }}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
          ))}
          <StyledTableCell sx={{ textAlign: "center" }}>
            Actions
          </StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((row) => (
          <StyledTableRow
            key={row._id}
            onClick={() => alert(row.name)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: colors.grey[900],
              },
            }}
          >
            <StyledTableCell>{row._id}</StyledTableCell>
            <StyledTableCell>{row.name}</StyledTableCell>
            <StyledTableCell>{row.slug}</StyledTableCell>
            <StyledTableCell>{row.price}</StyledTableCell>
            <StyledTableCell>
              {moment(row.createdAt).format("YYYY-MM-DD")}
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.redAccent[600],
                    borderRadius: "5px",
                    marginRight: "5px",
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.blueAccent[600],
                    borderRadius: "5px",
                    marginLeft: "5px",
                  }}
                >
                  Edit
                </Button>
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>

      <TableFooter
        sx={{
          position: "sticky",
          insetBlockEnd: 0,
          backgroundColor: colors.blueAccent[600],
        }}
      >
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 25, 50]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
</Box>;
