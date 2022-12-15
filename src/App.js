import { ColorModeContext, tokens, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./screens/global/TopBar";
import Dashboard from "./screens/dashboard/index";
import { Route, Routes } from "react-router-dom";
import SideBar from "./screens/global/SideBar";
import TeamDashboard from "./screens/Team/Index";
import UsersDashboard from "./screens/Users/Index";
import ProductsDashboard from "./screens/products";
import ProductDetails from "./screens/products/productDetails";
function App() {
  const [theme, colorMode] = useMode();
  // const colors = tokens(theme.palette.mode);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Team" element={<TeamDashboard />} />
              <Route path="/Users" element={<UsersDashboard />} />
              <Route exact path="/Products" element={<ProductsDashboard />} />
              <Route path="/Products/:slug" element={<ProductDetails />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
