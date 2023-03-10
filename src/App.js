import React from "react";
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./screens/dashboard/index";
import { Route, Routes } from "react-router-dom";
import CustomSuspense from "./components/global/CustomSuspense";
import Login from "./screens/auth/Login";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import AuthRoutes from "./components/auth/AuthRoutes";
import SideBarContainer from "./components/global/sidebar/sideBarContainer";
import ToastMessage from "./components/global/ToastMessage";
import "react-toastify/dist/ReactToastify.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
const TeamDashboard = React.lazy(() => import("./screens/Team/Index"));
const ProductsDashboard = React.lazy(() => import("./screens/products/index"));
const ProductDetails = React.lazy(() =>
  import("./screens/products/productDetails")
);
const AddProduct = React.lazy(() => import("./screens/products/AddProduct"));
const BrandsDashboard = React.lazy(() => import("./screens/brands/index"));
const BrandDetails = React.lazy(() => import("./screens/brands/BrandDetails"));
const AddBrand = React.lazy(() => import("./screens/brands/AddBrand"));
const BrandOffers = React.lazy(() => import("./screens/brands/offers/index"));
const NoMatch = React.lazy(() => import("./components/global/NoMatch"));
const Profile = React.lazy(() => import("./screens/profile/Profile"));
const UserDashbaord = React.lazy(() => import("./screens/Users/Index"));
const UserDetails = React.lazy(() => import("./screens/Users/userDetails"));
const OrdersDashboard = React.lazy(() => import("./screens/orders"));
const OrderDetails = React.lazy(() => import("./screens/orders/orderDetails"));
const SettingDashboard = React.lazy(() => import("./screens/setting"));
const BogoProfile = React.lazy(() => import("./screens/setting/BogoProfile"));
const BogoDataEdit = React.lazy(() => import("./screens/setting/BogoDataEit"));
const NotificationsDashboard = React.lazy(() =>
  import("./screens/notifications")
);
const MessageDetails = React.lazy(() =>
  import("./screens/notifications/MessageDetails")
);
const ChangePassword = React.lazy(() =>
  import("./screens/setting/changePassword")
);
const CategoriesDashboard = React.lazy(() => import("./screens/categories"));
const AttributeDashboard = React.lazy(() => import("./screens/attributes"));
const RolesDashboard = React.lazy(() => import("./screens/roles"));
const OfferRangeDashboard = React.lazy(() => import("./screens/offerRanges"));
const OfferTypesDashboard = React.lazy(() => import("./screens/offerTypes"));
const PreferencesDashboard = React.lazy(() => import("./screens/preferences"));
const RequestsDashboard = React.lazy(() => import("./screens/Requests"));
const ExpensesDashboard = React.lazy(() => import("./screens/Expenses"));
const HomeSliderDashboard = React.lazy(() => import("./screens/HomeSlider"));
const AddNew = React.lazy(() =>
  import("./components/commonDataModelUI/addNew")
);
function App() {
  const [theme, colorMode] = useMode();
  const queryClient = new QueryClient();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <SideBarContainer />
            <main className="content">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/Team"
                    element={
                      <CustomSuspense>
                        <TeamDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Users"
                    element={
                      <CustomSuspense>
                        <UserDashbaord />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Users/details/:email"
                    element={
                      <CustomSuspense>
                        <UserDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Users/details"
                    element={
                      <CustomSuspense>
                        <UserDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    exact
                    path="/Products"
                    element={
                      <CustomSuspense>
                        <ProductsDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Products/add-product"
                    element={
                      <CustomSuspense>
                        <AddProduct />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Products/:id"
                    element={
                      <CustomSuspense>
                        <ProductDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    exact
                    path="/Merchants"
                    element={
                      <CustomSuspense>
                        <BrandsDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Merchants/:id/offers"
                    element={
                      <CustomSuspense>
                        <BrandOffers />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <CustomSuspense>
                        <Profile />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/setting"
                    element={
                      <CustomSuspense>
                        <SettingDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/setting/userData"
                    element={
                      <CustomSuspense>
                        <BogoProfile />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/setting/userData/changePassword"
                    element={
                      <CustomSuspense>
                        <ChangePassword />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/setting/BogoData"
                    element={
                      <CustomSuspense>
                        <BogoDataEdit />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <CustomSuspense>
                        <NotificationsDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/notifications/reply/:id"
                    element={
                      <CustomSuspense>
                        <MessageDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Orders"
                    element={
                      <CustomSuspense>
                        <OrdersDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Orders/:id"
                    element={
                      <CustomSuspense>
                        <OrderDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    exact
                    path="/Merchants/:add-brand"
                    element={
                      <CustomSuspense>
                        <AddBrand />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Merchants/:id"
                    element={
                      <CustomSuspense>
                        <BrandDetails />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Categories"
                    element={
                      <CustomSuspense>
                        <CategoriesDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Attributes"
                    element={
                      <CustomSuspense>
                        <AttributeDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Roles"
                    element={
                      <CustomSuspense>
                        <RolesDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/OfferRanges"
                    element={
                      <CustomSuspense>
                        <OfferRangeDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/OfferTypes"
                    element={
                      <CustomSuspense>
                        <OfferTypesDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Preferences"
                    element={
                      <CustomSuspense>
                        <PreferencesDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/add-new/:model"
                    element={
                      <CustomSuspense>
                        <AddNew />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Requests"
                    element={
                      <CustomSuspense>
                        <RequestsDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/Expenses"
                    element={
                      <CustomSuspense>
                        <ExpensesDashboard />
                      </CustomSuspense>
                    }
                  />
                  <Route
                    path="/home-slider"
                    element={
                      <CustomSuspense>
                        <HomeSliderDashboard />
                      </CustomSuspense>
                    }
                  />
                </Route>
                <Route element={<AuthRoutes />}>
                  <Route path="/Auth/Login" element={<Login />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <CustomSuspense>
                      <NoMatch />
                    </CustomSuspense>
                  }
                />
              </Routes>
              <ToastMessage />
            </main>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
