import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateABook from './CreateABook';
import Nav from './Nav';

function App(props) {


return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
            <Route path="/create" element={<CreateABook />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
