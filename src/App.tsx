import AppRouter from "./router/appRouter";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </div>
  );
}
//end
export default App;
