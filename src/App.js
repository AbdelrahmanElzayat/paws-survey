import { Suspense, useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoadingPage from "./pages/LoadingPage";
import NotFound from "./pages/not-found/NotFound";

import i18n from "./i18n";
import { LanguageContext } from "./context/LanguageContext";
import ThankYou from "./pages/thankyou/ThankYou";
import SurveyNokhba from "./pages/Survey2/SurveyNokhba";
function App() {
  const { lang } = useContext(LanguageContext);
  const langLocal = localStorage.getItem("lang");

  useEffect(() => {
    if (langLocal && ["en", "ar"].includes(langLocal)) {
      i18n.changeLanguage(langLocal); // Set the language from local storage
    }
  }, [langLocal, lang]);

  const router = createBrowserRouter([
    {
      path: "/survey",
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <SurveyNokhba />
            </Suspense>
          ),
        },
        {
          path: "/survey/thankYou",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <ThankYou />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <div
      className=""
      style={{
        direction: `${lang === "ar" ? "rtl" : "ltr"}`,
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
