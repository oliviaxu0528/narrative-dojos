import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'
// import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import BookPageAdd from "./pages/BookPageAdd/BookPageAdd.jsx";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}></Route>
//         <Route path="/bookPageAdd" element={<BookPageAdd />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
// )
