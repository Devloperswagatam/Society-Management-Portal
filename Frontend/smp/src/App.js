import "./App.css";
import Menu from "./components/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkMode from "./components/DarkMode";

function App() {
  return (
    <div className="App">
      <DarkMode />
      <Menu />
      <ToastContainer />
    </div>
  );
}

export default App;
