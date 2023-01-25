import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./screens/dashboard/index";
import { Route, Routes } from "react-router-dom";
import SideBar from "./screens/global/SideBar";
import TeamDashboard from "./screens/Team/Index";
import UsersDashboard from "./screens/Users/Index";
import ProductsDashboard from "./screens/products";
import ProductDetails from "./screens/products/productDetails";
import AddProduct from "./screens/products/AddProduct";
import ToastMessage from "./components/global/ToastMessage";
import BrandsDashboard from "./screens/brands";
import AddBrand from "./screens/brands/AddBrand";
import BrandDetails from "./screens/brands/BrandDetails";

function App() {
  const [theme, colorMode] = useMode();
  // const colors = tokens(theme.palette.mode);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="sidebar">
            <SideBar />
          </div>
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Team" element={<TeamDashboard />} />
              <Route path="/Users" element={<UsersDashboard />} />
              <Route exact path="/Products" element={<ProductsDashboard />} />
              <Route path="/Products/add-product" element={<AddProduct />} />
              <Route path="/Products/:id" element={<ProductDetails />} />
              <Route exact path="/Merchants" element={<BrandsDashboard />} />
              <Route
                exact
                path="/Merchants/:add-brand"
                element={<AddBrand />}
              />
              <Route path="/Merchants/:id" element={<BrandDetails />} />
            </Routes>
            <ToastMessage />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
