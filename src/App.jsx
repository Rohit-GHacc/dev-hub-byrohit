import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import Connections from './components/Connections'
import Requests from "./components/Requests";
import Premium from "./components/Premium";

function App() {
  return (
    <>
{/* themes: light --default, dark --prefersdark, cupcake, bumblebee, emerald, nord, cyberpunk, lemonade, caramellatte, silk, valentine, aqua, coffee, corporate; */}
    <div data-theme="abyss" >
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      </div>
    </>
  );
}

export default App;
