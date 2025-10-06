import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HorizontalPageAnimation from "./common/HorizontalPageAnimation";
import PageAnimation from "./common/PageAnimation";
import Home from "./pages/Home";
import Page1 from "./pages/RouterSample/Page1";
import Page2 from "./pages/RouterSample/Page2";
import Page3 from "./pages/RouterSample/Page3";
import Page4 from "./pages/RouterSample/Page4";
import Page5 from "./pages/RouterSample/Page5";
import ToDo from "./pages/ToDO";
// import ToDo from "./pages/ToDo";
import TypingTest from "./pages/TypingTest";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageAnimation keyValue={location.pathname}>
              <Home />
            </PageAnimation>
          }
        />
        <Route
          path="/typing"
          element={
            <PageAnimation keyValue={location.pathname}>
              <TypingTest />
            </PageAnimation>
          }
        />
        <Route
          path="/ToDo"
          element={
            <PageAnimation keyValue={location.pathname}>
              <ToDo />
            </PageAnimation>
          }
        />
        <Route
          path="/Page1"
          element={
            <HorizontalPageAnimation keyValue={location.pathname}>
              <Page1 />
            </HorizontalPageAnimation>
          }
        />
        <Route
          path="/Page2"
          element={
            <HorizontalPageAnimation keyValue={location.pathname}>
              <Page2 />
            </HorizontalPageAnimation>
          }
        />
        <Route
          path="/Page3"
          element={
            <HorizontalPageAnimation keyValue={location.pathname}>
              <Page3 />
            </HorizontalPageAnimation>
          }
        />
        <Route
          path="/Page4"
          element={
            <HorizontalPageAnimation keyValue={location.pathname}>
              <Page4 />
            </HorizontalPageAnimation>
          }
        />
        <Route
          path="/Page5"
          element={
            <HorizontalPageAnimation keyValue={location.pathname}>
              <Page5 />
            </HorizontalPageAnimation>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen w-full">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
