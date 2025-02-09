import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

const ThankYou = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("thank_you_title")}</h1>
        <p className="text-gray-600">{t("thank_you_message")}</p>
      </div>
    </motion.div>
  );
};

export default ThankYou;
