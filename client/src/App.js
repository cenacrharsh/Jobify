import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//! Components
import { Dashboard, Error, Landing, Register } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/landing" element={<Landing />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
