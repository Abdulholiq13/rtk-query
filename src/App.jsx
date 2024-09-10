import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/detail-page/DetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
