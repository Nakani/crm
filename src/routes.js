import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import TableListImeis from "views/TableList/TableListImeis.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    menu: true
  },
  {
    path: "/user",
    name: "Financeiro",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    menu: true
  },
  {
    path: "/table",
    name: " Lista De Produtos",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    menu: true
  },
  {
    path: "/imeis",
    name: "Lista De Imeis",
    icon: "content_paste",
    component: TableListImeis,
    layout: "/admin",
    menu: false
  }

];

const childrenRoutes = [
  {
    path: "/table/imeis/:upc",
    name: "Imeis",
    component: TableListImeis,
    layout: "/admin"
  },]



export const routes = {
  dashboardRoutes,
  childrenRoutes
};
