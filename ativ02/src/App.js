import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import CreateStudent from "./Pages/CreateStudent";
import CreateProfessor from "./Pages/CreateProfessor";
import ListStudent from "./Pages/ListStudent";
import ListProfessor from "./Pages/ListProfessor"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createStudent" element={<CreateStudent />} />
        <Route path="/createProfessor" element={<CreateProfessor />} />
        <Route path="/listStudent" element={<ListStudent />} />
        <Route path="/listProfessor" element={<ListProfessor />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
