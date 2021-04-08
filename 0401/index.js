// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// const a = (
//   <h1>
//     <h1>123</h1>
//     <h1>123</h1>
//   </h1>
// );
// function Car() {
//   return <h2>Hi, I am also a Car!</h2>;
// }
// ReactDOM.render(
//   <React.StrictMode>
//     <React.Fragment>
//       <Car />
//        <App/>
//     </React.Fragment>
//     {a}
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom";
import Car from "./test/car";
import App1 from "./test/App1";
import App2 from "./test/App2";
import App3 from "./test/App3";

ReactDOM.render(
  <React.Fragment>
    <App1 />
    <App2 />
    <App3 />
  </React.Fragment>,
  document.getElementById("root")
);
