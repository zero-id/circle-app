import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Follows from "./pages/Follows";
import Profile from "./pages/Profile";
import DetailThread from "./pages/DetailThread";
import ThreadDetailImage from "./pages/DetaillThreadImage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/detail-thread/:id" element={<DetailThread />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follows" element={<Follows />} />
          <Route path="/detail-profile/:id" element={<Profile />} />
        </Route>
        <Route path="/detail-image/:id" element={<ThreadDetailImage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
