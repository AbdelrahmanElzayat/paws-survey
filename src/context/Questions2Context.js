import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// إنشاء الـ Context
const SurveyNokhbaContext = createContext();

// Provider الخاص بـ Context
export const SurveyNokhbaProvider = ({ children }) => {
  const [questions2, setQuestions2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة لجلب البيانات من الـ API
  const fetchQuestions2 = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hub.ppte.sa/survey/api/surveys/questions`
      );
      if (response.data && response.data.questions) {
        setQuestions2(response.data.questions);
      } else {
        setQuestions2([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل الـ Provider
  useEffect(() => {
    fetchQuestions2();
  }, []);

  return (
    <SurveyNokhbaContext.Provider
      value={{ questions2, loading, error, fetchQuestions2 }}
    >
      {children}
    </SurveyNokhbaContext.Provider>
  );
};

// Hook لاستخدام الـ Context بسهولة
export const useSurveyNokhba = () => useContext(SurveyNokhbaContext);
