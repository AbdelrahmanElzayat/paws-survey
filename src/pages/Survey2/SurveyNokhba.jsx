import React, { useContext, useLayoutEffect } from "react";
import Header from "../../components/header/Header";
import SurveyForm from "../../components/surveyForm/SurveyForm";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LoadingPage from "../LoadingPage";
import { LanguageContext } from "../../context/LanguageContext";
import { useSurveyNokhba } from "../../context/Questions2Context";

const SurveyNokhba = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);
  const { questions2, loading, error } = useSurveyNokhba();

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {lang === "ar" ? (
        <>
          <title>
            ستبيان ملتقى نخبة الأعمال في قطاع رعاية الحيوانات الأليفة
          </title>
          <link rel="icon" href="/favicon.ico" />
        </>
      ) : (
        <>
          <title>shareek || survey</title>
          <link rel="icon" href="/faviconen.ico" />
        </>
      )}
      <Header class="bg-gray-900" />
      <main className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
        <div className="w-full max-w-3xl bg-gray-800 p-4 md:p-8 rounded-xl shadow-lg">
          {/* عنوان الاستطلاع */}
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="w-full max-w-[400px] md:max-w-full py-2 md:py-4 px-4 md:px-8 border border-[#BBA577] bg-gray-700 rounded-lg shadow-md">
              <p className="text-white text-xs md:text-lg font-semibold text-center uppercase tracking-wider">
                {t("business_elite_survey")}
              </p>
            </div>
            <p className="max-w-[400px] md:max-w-full text-white text-sm md:text-lg text-center leading-6">
              {t("survey_appreciation")}{" "}
            </p>
          </div>

          {/* نموذج الاستطلاع */}
          <div>
            <SurveyForm
              questions={questions2}
              baseurl={"https://hub.ppte.sa/survey/api"}
            />
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default SurveyNokhba;
