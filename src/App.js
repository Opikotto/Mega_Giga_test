import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ButtonAdd from "./components/ButtonAdd"
import ButtonEdit from "./components/ButtonEdit";
function App() {
  return (
     <Router>
          <Routes>
               <Route exact path="/" element={<Login/>} />
               <Route exact path="/register" element={<Register/>} />
               <Route exact path="/dashboard" element={<Dashboard/>}/>
               <Route exact path="/buttonadd" element={<ButtonAdd/>}/>
               <Route exact path="/buttonaedit" element={<ButtonEdit/>}/>
          </Routes>
     </Router>
  );
}

export default App;
