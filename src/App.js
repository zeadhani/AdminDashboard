import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./screens/dashboard/index";
import { Route, Routes } from "react-router-dom";
import TeamDashboard from "./screens/Team/Index";
import ProductsDashboard from "./screens/products";
import ProductDetails from "./screens/products/productDetails";
import AddProduct from "./screens/products/AddProduct";
import ToastMessage from "./components/global/ToastMessage";
import BrandsDashboard from "./screens/brands";
import AddBrand from "./screens/brands/AddBrand";
import BrandDetails from "./screens/brands/BrandDetails";
import Login from "./screens/auth/Login";
import Profile from "./screens/profile/Profile";
import BrandOffers from "./screens/brands/offers";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import AuthRoutes from "./components/auth/AuthRoutes";
import SideBarContainer from "./components/global/sidebar/sideBarContainer";
import UserDashbaord from "./screens/Users/Index";
import UserDetails from "./screens/Users/userDetails";
import OrdersDashboard from "./screens/orders";
import OrderDetails from "./screens/orders/orderDetails";
import SettingDashboard from "./screens/setting";
import BogoProfile from "./screens/setting/BogoProfile";
import BogoDataEdit from "./screens/setting/BogoDataEit";
import NotificationsDashboard from "./screens/notifications";
import MessageDetails from "./screens/notifications/MessageDetails";
import ChangePassword from "./screens/setting/changePassword";
import { useProSidebar } from "react-pro-sidebar";

function App() {
  const [theme, colorMode] = useMode();
  const { collapseSidebar, collapsed } = useProSidebar();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBarContainer />
          <main className={`content ${!collapsed ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Team" element={<TeamDashboard />} />
                <Route path="/Users" element={<UserDashbaord />} />
                <Route path="/Users/details/:email" element={<UserDetails />} />
                <Route path="/Users/details" element={<UserDetails />} />
                <Route exact path="/Products" element={<ProductsDashboard />} />
                <Route path="/Products/add-product" element={<AddProduct />} />
                <Route path="/Products/:id" element={<ProductDetails />} />
                <Route exact path="/Merchants" element={<BrandsDashboard />} />
                <Route path="/Merchants/:id/offers" element={<BrandOffers />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<SettingDashboard />} />
                <Route path="/setting/userData" element={<BogoProfile />} />
                <Route path="/setting/userData/changePassword" element={<ChangePassword />} />
                <Route path="/setting/BogoData" element={<BogoDataEdit />} />
                <Route
                  path="/notifications"
                  element={<NotificationsDashboard />}
                />
                <Route
                  path="/notifications/reply/:id"
                  element={<MessageDetails />}
                />
                <Route path="/Orders" element={<OrdersDashboard />} />
                <Route path="/Orders/:id" element={<OrderDetails />} />
                <Route
                  exact
                  path="/Merchants/:add-brand"
                  element={<AddBrand />}
                />
                <Route path="/Merchants/:id" element={<BrandDetails />} />
              </Route>
              <Route element={<AuthRoutes />}>
                <Route path="/Auth/Login" element={<Login />} />
              </Route>
            </Routes>
            <ToastMessage />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
