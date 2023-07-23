import "./App.css";
import Menu from "./components/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <ToastContainer />
    </div>
  );
}

export default App;
