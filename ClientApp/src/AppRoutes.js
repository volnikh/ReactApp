import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";

const AppRoutes = [
  {
    index: true,
    element: <Employees />
  },
  {
    path: '/employee',
    element: <AddEmployee mode="Add" method="POST" />
  },
  {
    path: '/employee/:id',
    element: <AddEmployee mode="Edit" method="PUT" />
  }
];

export default AppRoutes;
