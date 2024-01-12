import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import Loading from "components/Loading";
import Router from "routes";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ScrollToTop />
          <Router />
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  );
}
