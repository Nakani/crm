import Dashboard from "@material-ui/icons/Dashboard";
import { Person, People, MonetizationOn } from "@material-ui/icons";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import UsersList from "views/UsersList/UsersList.js";
import TableListImeis from "views/TableList/TableListImeis.js";
import SellsTable from "views/SellsTable/SellsTable.js";

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
  },
  {
    path: "/sellers",
    name: "Lista De Usuários",
    icon: People,
    component: UsersList,
    layout: "/admin",
    menu: true
  },
  {
    path: "/sells",
    name: "Vendas",
    icon: MonetizationOn,
    component: SellsTable,
    layout: "/admin",
    menu: true
  }
];

const childrenRoutes = [
  {
    path: "/table/imeis/:upc",
    name: "Imeis",
    component: TableListImeis,
    layout: "/admin"
  }
];

export const routes = {
  dashboardRoutes,
  childrenRoutes
};
