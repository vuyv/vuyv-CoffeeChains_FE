import OwnerHome from "./pages/Owner/home/Home";
import Login from "./pages/login/Login";
import TableEmployee from "./pages/Owner/employee/tableEmployee/TableEmployee";
import DetailEmployee from "./pages/Owner/employee/detailEmployee/Detail";
import CreateEmployee from "./pages/Owner/employee/createEmployee/CreateEmployee";
import TableProduct from "./pages/Owner/product/tableProduct/TableProduct";
import DetailProduct from "./pages/Owner/product/detailProduct/DetailProduct";
import CreateProduct from "./pages/Owner/product/createProduct/CreateProduct";
import Branch from "./pages/Owner/branch/Branch";
import DetailDiscount from "./pages/Owner/discount/detail/DetailDiscount";
import DiscountHome from "./pages/Owner/discount/home/DiscountHome";
import CreateDiscount from "./pages/Owner/discount/create/CreateDiscount";
import ManagerHome from "./pages/Manager/home/Home";
import EmployeeTable from "./pages/Manager/employee/tableEmployee/EmployeeTable";
import CreateEmployeeInBranch from "./pages/Manager/employee/createEmployee/CreateEmployeeInBranch";
import EmployeeDetail from "./pages/Manager/employee/detailEmployee/EmployeeDetail";
import ProfileSeller from "./pages/Seller/profile/Profile";
import ProfileManager from "./pages/Manager/profile/ProfileManager";
import ProfileOwner from "./pages/Owner/profile/Profile";
import Order from "./pages/Seller/order/Order";
import FindOrder from "./pages/Seller/order/FindOrder";
import HappeningDiscount from "./pages/Seller/discount/Discount";
import ViewDiscount from "./pages/Manager/discount/ViewDiscount";
import ViewOrder from "./pages/Manager/order/ViewOrder";
import OrderDetail from "./pages/Manager/order/OrderDetail";
import Report from "./pages/Owner/report/Report";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  Navigate,
} from "react-router-dom";

const RouteOwner = () => {
  let route = useRoutes([
    {
      path: "/owner",
      children: [
        { path: "", element: <OwnerHome /> },
        { path: "profile", element: <ProfileOwner /> },
        {
          path: "employees",
          children: [
            { path: "", element: <TableEmployee /> },
            { path: ":employeeId", element: <DetailEmployee /> },
            { path: "new", element: <CreateEmployee /> },
          ],
        },
        {
          path: "branch",
          element: <Branch />,
        },
        {
          path: "products",
          children: [
            { path: "", element: <TableProduct /> },
            { path: ":productId", element: <DetailProduct /> },
            { path: "new", element: <CreateProduct /> },
          ],
        },
        {
          path: "discounts",
          children: [
            { path: "", element: <DiscountHome /> },
            { path: ":discountCode", element: <DetailDiscount /> },
            { path: "new", element: <CreateDiscount /> },
          ],
        },
      ],
    },
  ]);
  return route;
};

const RouteManager = () => {
  let route = useRoutes([
    {
      path: "/manager",
      children: [
        { path: "", element: <ManagerHome /> },
        { path: "profile", element: <ProfileManager /> },
        {
          path: "employees",
          children: [
            { path: "", element: <EmployeeTable /> },
            { path: ":employeeId", element: <EmployeeDetail /> },
            { path: "new", element: <CreateEmployeeInBranch /> },
          ],
        },
        { path: "discounts", element: <ViewDiscount /> },
        {
          path: "orders",
          children: [
            { path: "", element: <ViewOrder /> },
            { path: ":orderId", element: <OrderDetail /> },
          ],
        },
      ],
    },
  ]);
  return route;
};

const RouteSeller = () => {
  let route = useRoutes([
    {
      path: "/seller",
      children: [
        { path: "", element: <Order /> },
        { path: "profile", element: <ProfileSeller /> },
        {
          path: "orders",
          children: [{ path: ":orderId", element: <FindOrder /> }],
        },
        { path: "discounts", element: <HappeningDiscount /> },
      ],
    },
  ]);
  return route;
};

function App() {
  const auth = useSelector((state) => state.authReducer);
  const user = JSON.parse(localStorage.getItem("current_user"));

  const RequireAuth = ({ children, redirectTo }) => {
    if (auth.token && auth.role) {
      return children;
    }

    switch (user.role.name) {
      case "OWNER":
        return <RouteOwner />;
      case "MANAGER":
        return <RouteManager />;
      case "SELLER":
        return <RouteSeller />;
      default:
        return <Navigate to={redirectTo} />;
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

            <Route path="owner">
              <Route index element={<OwnerHome />} />

              <Route path="employees">
                <Route index element={<TableEmployee />} />
                <Route path=":employeeId" element={<DetailEmployee />} />
                <Route path="new" element={<CreateEmployee />} />
              </Route>

              <Route path="report">
                <Route index element={<Report />} />
              </Route>

              <Route path="branch">
                <Route index element={<Branch />} />
              </Route>

              <Route path="products">
                <Route index element={<TableProduct />} />
                <Route path=":productId" element={<DetailProduct />} />
                <Route path="new" element={<CreateProduct />} />
              </Route>

              <Route path="discounts">
                <Route index element={<DiscountHome />} />
                <Route path=":discountCode" element={<DetailDiscount />} />
                <Route path="new" element={<CreateDiscount />} />
              </Route>
            </Route>

            <Route path="manager">
              <Route index element={<ManagerHome />} />
              <Route path="employees">
                <Route index element={<EmployeeTable />} />
                <Route path=":employeeId" element={<EmployeeDetail />} />
                <Route path="new" element={<CreateEmployeeInBranch />} />
              </Route>
              <Route path="discounts" element={<ViewDiscount />} />
              <Route path="orders">
                <Route index element={<ViewOrder />} />
                <Route path=":orderId" element={<OrderDetail />} />
              </Route>
            </Route>

            <Route
              path="*"
              element={
                <RequireAuth redirectTo="/login">
                  <RouteOwner />
                  <RouteManager />
                  <RouteSeller />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
