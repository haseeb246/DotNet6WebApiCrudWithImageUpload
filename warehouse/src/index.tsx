import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderProvider from "./contexts/OrderContext";
import "../src/index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// root.render(
//   <React.StrictMode>
//     <OrderProvider>
//       <App />
//     </OrderProvider>
//   </React.StrictMode>
// );
