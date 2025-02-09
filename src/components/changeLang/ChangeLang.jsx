import React, { useContext, useState } from "react";
import world from "../../assets/icons/world.svg";
import arrow from "../../assets/icons/arrow.svg";
import { LanguageContext } from "../../context/LanguageContext";
const ChangeLang = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { lang, setLang, changeLanguage } = useContext(LanguageContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language) => {
    setLang(language);
    changeLanguage(language);
    setIsOpen(false);
  };
  return (
    <div
      className="relative inline-block text-left py-6"
    //   style={{ direction: "rtl" }}
    >
      <div className="container">
        <button
          onClick={toggleDropdown}
          className="flex items-center w-fit gap-2 px-4 py-2 border border-white bg-transparent hover:bg-green-800 focus:outline-none ml-auto"
        >
          <img src={world} alt="change-lang" className="w-5 h-5" />
          <span className="flex items-center gap-2 text-white text-base">
            {lang === "ar" ? "العربية" : "ENGLISH"}
            <img src={arrow} alt="arrow" className="w-4 h-4" />
          </span>
        </button>

        {/* محتوى الدروب داون */}
        {isOpen && (
          <div className="absolute  mt-2 w-40 bg-white border border-gray-300 shadow-lg">
            <ul className="py-1">
              <li>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  العربية
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  English
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* زر الدروب داون */}
      </div>
    </div>
  );
};

export default ChangeLang;
