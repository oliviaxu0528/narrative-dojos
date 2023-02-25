import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BookList from "./books/viewbooks";
import MainPage from "./MainPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
