import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import { Toaster } from "react-hot-toast";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <div>
        <Provider store={appStore}>
          <BrowserRouter>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />

              {/* PROTECTED APP */}
              <Route path="/app" element={<Body />}>
                <Route path="profile" element={<Profile />} />
                <Route path="connections" element={<Connections />} />
                <Route path="requests" element={<Requests />} />
                <Route path="premium" element={<Premium />} />
                <Route path="chat/:targetUserId" element={<Chat />} />
                <Route path="feed" element={<Feed />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
