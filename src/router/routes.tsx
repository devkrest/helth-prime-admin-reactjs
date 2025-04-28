import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "@/app/auth/login";
// import { setToken } from "@/network/axios.services";
// import { IUserModel } from "@/model/user_model";
import Wrapper from "@/components/wrapper/wrapper";
import NotFoundErrorPage from "@/app/authenticated/not-found/not-found";
import UserPage from "@/app/authenticated/user/user";
import RolePage from "@/app/authenticated/role/role";
import ModulePage from "@/app/authenticated/module/module";
import AgencyPage from "@/app/authenticated/agency/agency";
import { LocalStorageUserStore } from "@/lib/const-value";
import DepartmentPage from "@/app/authenticated/department/department";
import SOPPage from "@/app/authenticated/sop/sop";
import ViewSopPage from "@/app/authenticated/sop/sop-view/sop-view";
import BlogPage from "@/app/authenticated/blog/blog";
import BlogCreateUpdate from "@/app/authenticated/blog/components/blog-create-update/blog-create-update";
import NotificationPage from "@/app/authenticated/notification/notification";
import CustomerPage from "@/app/authenticated/customer/customer";
import LeadAgentPage from "@/app/authenticated/lead-territory/agent/agent";
import CustomerServioceCategoryPage from "@/app/authenticated/customer-service-category/category";
import CustomerServioceCustomerPage from "@/app/authenticated/customer-service-customer/customer";
import CustomerServiceAgentPage from "@/app/authenticated/customer-service-user-lead/agent";
import OepPage from "@/app/authenticated/oep/oep";
import CheckEligibility from "@/app/authenticated/check-eligibility/check-eligibility";
import AorDetailsPage from "@/app/authenticated/oep-new/aor-details/aor-details";
import AppointmentPage from "@/app/authenticated/oep-new/appointment-status/appointment";
import LicenseTypePage from "@/app/authenticated/oep-new/license-type/license-type";
import OEPManagePage from "@/app/authenticated/oep-new/oep-manage/oep-manage";
import PolicyManagementPage from "@/app/authenticated/policy-management/policy-management";
import PolicyEscalatedPage from "@/app/authenticated/policy-escalated/policy-escalated";
import PolicyAttamptsPage from "@/app/authenticated/policy-attampts/policy-escalated";
// import { IUserModel } from "@/model/user_model";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => {
      const user = localStorage.getItem(LocalStorageUserStore);
      if (user) {
        return redirect("/user");
      }

      localStorage.clear();
      return null;
    },
  },
  {
    path: "/",
    element: <Wrapper />,
    loader: () => {
      const user = localStorage.getItem(LocalStorageUserStore);

      //console.log("user ==>",user, typeof user)
      if (!user) {
        //console.log("come here ==>");
        localStorage.clear();
        return redirect("/");
      }

      //const u: IUserModel = JSON.parse(user);

      //setToken({ token: u.token });

      return JSON.parse(user);
    },
    children: [
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "role",
        element: <RolePage />,
      },
      {
        path: "module",
        element: <ModulePage />,
      },
      {
        path: "agency",
        element: <AgencyPage />,
      },
      {
        path: "department",
        element: <DepartmentPage />,
      },
      {
        path: "sop",
        element: <SOPPage />,
      },
      {
        path: "sop/:id",
        element: <ViewSopPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/create",
        element: <BlogCreateUpdate />,
      },
      {
        path: "blog/update/:id",
        element: <BlogCreateUpdate />,
      },
      {
        path: "notification",
        element: <NotificationPage />,
      },
      {
        path: "lead-customer",
        element: <CustomerPage />,
      },
      {
        path: "lead-territory",
        element: <LeadAgentPage />,
      },
      {
        path: "customer-service-category",
        element: <CustomerServioceCategoryPage />,
      },
      {
        path: "customer-service-customer",
        element: <CustomerServioceCustomerPage />,
      },
      {
        path: "customer-service-agent",
        element: <CustomerServiceAgentPage />,
      },
      {
        path: "oep",
        element: <OepPage />,
      },
      {
        path: "check-eligibility",
        element: <CheckEligibility />,
      },
      {
        path: "oep-aor",
        element: <AorDetailsPage />,
      },
      {
        path: "oep-appointment",
        element: <AppointmentPage />,
      },
      {
        path: "oep-license-type",
        element: <LicenseTypePage />,
      },
      {
        path: "oep-manage",
        element: <OEPManagePage />,
      },
      {
        path: "policy-management",
        element: <PolicyManagementPage />,
      },
      {
        path: "policy-escalated",
        element: <PolicyEscalatedPage />,
      },
      {
        path: "policy-alert",
        element: <PolicyAttamptsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
]);

export default routes;
