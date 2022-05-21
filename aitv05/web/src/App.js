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
import EditStudent from "./Pages/EditStudent";
import EditProfessor from "./Pages/EditProfessor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createStudent" element={<CreateStudent />} />
        <Route path="/createProfessor" element={<CreateProfessor />} />
        <Route path="/editStudent/:id" element={<EditStudent />} />
        <Route path="/editProfessor/:id" element={<EditProfessor />} />
        <Route path="/listStudent" element={<ListStudent />} />
        <Route path="/listProfessor" element={<ListProfessor />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
