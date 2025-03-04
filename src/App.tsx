import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const App: React.FC = () => (
  <RouterProvider router={router} />
);

export default App;