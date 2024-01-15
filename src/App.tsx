import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import Loader from "components/Loader";
import Router from "routes";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  );
}
