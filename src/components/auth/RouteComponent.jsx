import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomSuspense from "../global/CustomSuspense";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import Login from "../../screens/auth/Login";
import Dashboard from "../../screens/dashboard";

const ReviewsDashboard = React.lazy(() =>
  import("../../screens/products/reviews")
);
const TeamDashboard = React.lazy(() => import("../../screens/Team/Index"));
const UserDashbaord = React.lazy(() => import("../../screens/Users/Index"));
const UserDetails = React.lazy(() => import("../../screens/Users/userDetails"));
const ProductsDashboard = React.lazy(() => import("../../screens/products"));
const AddProduct = React.lazy(() =>
  import("../../screens/products/AddProduct")
);
const ProductDetails = React.lazy(() =>
  import("../../screens/products/productDetails")
);
const BrandsDashboard = React.lazy(() => import("../../screens/brands"));
const BrandOffers = React.lazy(() => import("../../screens/brands/offers"));
const Profile = React.lazy(() => import("../../screens/profile/Profile"));
const SettingDashboard = React.lazy(() => import("../../screens/setting"));
const BogoProfile = React.lazy(() =>
  import("../../screens/setting/BogoProfile")
);
const ChangePassword = React.lazy(() =>
  import("../../screens/setting/changePassword")
);
const BogoDataEdit = React.lazy(() =>
  import("../../screens/setting/BogoDataEit")
);
const NotificationsDashboard = React.lazy(() =>
  import("../../screens/notifications")
);
const MessageDetails = React.lazy(() =>
  import("../../screens/notifications/MessageDetails")
);
const OrdersDashboard = React.lazy(() => import("../../screens/orders"));
const OrderDetails = React.lazy(() =>
  import("../../screens/orders/orderDetails")
);
const AddBrand = React.lazy(() => import("../../screens/brands/AddBrand"));
const BrandDetails = React.lazy(() =>
  import("../../screens/brands/BrandDetails")
);
const CategoriesDashboard = React.lazy(() =>
  import("../../screens/categories")
);
const AttributeDashboard = React.lazy(() => import("../../screens/attributes"));
const OfferRangeDashboard = React.lazy(() =>
  import("../../screens/offerRanges")
);
const OfferRangeDetails = React.lazy(() =>
  import("../../screens/offerRanges/offerRangeDetails")
);
const OfferTypesDashboard = React.lazy(() =>
  import("../../screens/offerTypes")
);
const PreferencesDashboard = React.lazy(() =>
  import("../../screens/preferences")
);
const AddNew = React.lazy(() => import("../commonDataModelUI/addNew"));
const RequestsDashboard = React.lazy(() => import("../../screens/Requests"));
const HomeSliderDashboard = React.lazy(() =>
  import("../../screens/HomeSlider")
);
const HomeSliderDetails = React.lazy(() =>
  import("../../screens/HomeSlider/homeSilderDetails")
);
const NoMatch = React.lazy(() => import("../global/NoMatch"));

function RouteComponent() {
  return (
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
          path="/Reviews/:id"
          element={
            <CustomSuspense>
              <ReviewsDashboard />
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
          path="/OfferRanges"
          element={
            <CustomSuspense>
              <OfferRangeDashboard />
            </CustomSuspense>
          }
        />
        <Route
          path="/OfferRanges/add-new"
          element={
            <CustomSuspense>
              <OfferRangeDetails />
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
          path="/home-slider"
          element={
            <CustomSuspense>
              <HomeSliderDashboard />
            </CustomSuspense>
          }
        />
        <Route
          path="/home-slider/:id"
          element={
            <CustomSuspense>
              <HomeSliderDetails />
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
  );
}

export default RouteComponent;
