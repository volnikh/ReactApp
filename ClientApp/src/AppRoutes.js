import { Counter } from "./components/Counter";
import Employees from "./components/Employees";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import AddEmployee from "./components/AddEmployee";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/employees',
    element: <Employees />
  },
  {
    path: '/employees/add-employee',
    element: <AddEmployee mode="Add" method="POST"/>
  },
  {
    path: '/employees/edit-employee/:id',
    element: <AddEmployee mode="Edit" method="PUT"/>
  }

];

export default AppRoutes;
