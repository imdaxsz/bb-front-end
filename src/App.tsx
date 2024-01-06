import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import Router from "routes";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  );
}
