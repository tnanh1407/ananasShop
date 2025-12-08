import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/main.scss";
import App from "./App.jsx";
import "animate.css";

createRoot(document.getElementById("root")).render(<App />);
