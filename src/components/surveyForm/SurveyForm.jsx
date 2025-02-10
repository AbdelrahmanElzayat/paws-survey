import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SurveyForm = ({ questions, baseurl }) => {
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [selectedValues, setSelectedValues] = useState({});
  const [showRating, setShowRating] = useState(false);
  // const [title, setTitle] = useState(false);

  const options = t("options", { returnObjects: true });

  const handleSelection = (key, value, isRadio) => {
    setSelectedValues((prev) => {
      if (isRadio) {
        return { ...prev, [key]: value };
      }

      const selectedOptions = prev[key] || [];
      const isSelected = selectedOptions.includes(value);
      const newOptions = isSelected
        ? selectedOptions.filter((v) => v !== value)
        : [...selectedOptions, value];

      // التحكم في حالة showRating بناءً على الاختيارات
      if (
        newOptions.includes("لم أحضر") ||
        newOptions.includes("Did not attend")
      ) {
        setShowRating(false);
      } else {
        setShowRating(newOptions.length > 0);
        // setTitle(
        //   newOptions.length > 1 ? t("questionRates") : t("questionRate")
        // );
      }

      return { ...prev, [key]: newOptions };
    });
  };

  const validationSchema = Yup.object(
    questions.reduce(
      (schema, question) => {
        const ratingKey = `rating_${question.id}`;
        schema[ratingKey] = question.is_radio
          ? Yup.number()
              .required(t("rateRequired"))
              .min(1, t("rateMin"))
              .max(5, t("rateMax"))
          : Yup.array().of(Yup.string()).min(1, t("selectAtLeastOne"));
        return schema;
      },
      {
        name: Yup.string().required(t("nameRequired")),
        phone: Yup.string().required(t("phoneRequired")),
        company: Yup.string().required(t("companyRequired")),
        notes: Yup.string().max(500, t("noteMax")),
        new_rating: showRating
          ? Yup.number()
              .required(t("rateRequired"))
              .min(1, t("rateMin"))
              .max(5, t("rateMax"))
          : Yup.number().notRequired(),
      }
    )
  );

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const qs = questions?.map((item) => ({
      question_id: item?.id,
      answer: Array.isArray(values[`rating_${item?.id}`])
        ? values[`rating_${item?.id}`]
        : +values[`rating_${item?.id}`],
    }));

    try {
      await axios.post(`${baseurl}/surveys/answers`, {
        respondent: {
          name: values.name,
          phone: values.phone,
          company: values.company,
        },

        answers: qs,
        rating: values.new_rating,
        comments: values?.notes,
      });
      toast.success(t("formSuccess"));
      resetForm();
      setSelectedValues({});
      navigate("/survey/thankYou");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("formError"));
    }
  };

  return (
    <section className="SurveyForm flex flex-col justify-center items-center mt-4 lg:mt-10 px-4 sm:px-8 md:px-16">
      <Formik
        initialValues={{
          name: "",
          phone: "",
          company: "",
          notes: "",
          new_rating: showRating ? "" : 0,
          ...questions.reduce((values, question) => {
            values[`rating_${question.id}`] = "";
            return values;
          }, {}),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full max-w-full lg:max-w-md flex flex-col">
            {/* Adding Name, Phone, Company fields */}
            <div className="mb-4 flex flex-col">
              <label
                className={`leading-7 block text-white mb-2 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("name")}
              </label>
              <Field
                type="text"
                name="name"
                placeholder={t("nameHolder")}
                className="w-full bg-[rgba(161,255,230,0.2)] py-3 px-4 text-right text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <div className="mb-4 flex flex-col">
              <label
                className={`leading-7 block text-white mb-2 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("phone")}
              </label>
              <Field
                type="text"
                name="phone"
                placeholder={t("phoneHolder")}
                className="w-full bg-[rgba(161,255,230,0.2)] py-3 px-4 text-right text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4 flex flex-col">
              <label
                className={`leading-7 block text-white mb-2 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("company")}
              </label>
              <Field
                type="text"
                name="company"
                placeholder={t("companyHolder")}
                className="w-full bg-[rgba(161,255,230,0.2)] py-3 px-4 text-right text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.company && touched.company && (
                <p className="text-red-500 text-sm mt-2">{errors.company}</p>
              )}
            </div>
            <h4 className="md:text-lg text-xs font-[500] text-right text-white leading-5 md:leading-7 ">
              {t("rateHint")}
            </h4>

            {/* Existing Questions */}
            {questions.map((item) => {
              const ratingKey = `rating_${item.id}`;
              return (
                <div key={item?.id} className="mb-4 flex flex-col mt-6 gap-3">
                  <label
                    className={`block text-white mb-2 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {lang === "ar" ? item.question : item.question_en}
                  </label>
                  <div className="flex flex-wrap justify-start gap-3 md:gap-4">
                    {item.is_radio
                      ? item?.options.map((value) => (
                          <React.Fragment key={value}>
                            <Field
                              type={item.is_radio ? "radio" : "checkbox"}
                              name={ratingKey}
                              value={String(value)}
                              className="hidden peer"
                              id={`${ratingKey}-${value}`}
                              onClick={() =>
                                handleSelection(ratingKey, value, item.is_radio)
                              }
                            />
                            <label
                              htmlFor={`${ratingKey}-${value}`}
                              className={`p-1 leading-7 md:min-w-12 md:min-h-12 min-w-8 min-h-8 flex items-center justify-center flex-wrap text-white cursor-pointer transition-all duration-200 ${
                                Array.isArray(selectedValues[ratingKey])
                                  ? selectedValues[ratingKey].includes(value)
                                    ? "bg-[#BFA879]"
                                    : "bg-[rgba(161,255,230,0.20)]"
                                  : selectedValues[ratingKey] === value
                                  ? "bg-[#BFA879]"
                                  : "bg-[rgba(161,255,230,0.20)]"
                              }`}
                            >
                              {value}
                            </label>
                          </React.Fragment>
                        ))
                      : options.map((value) => (
                          <React.Fragment key={value}>
                            <Field
                              type={item.is_radio ? "radio" : "checkbox"}
                              name={ratingKey}
                              value={String(value)}
                              className="hidden peer"
                              id={`${ratingKey}-${value}`}
                              onClick={() =>
                                handleSelection(ratingKey, value, item.is_radio)
                              }
                            />
                            <label
                              htmlFor={`${ratingKey}-${value}`}
                              className={`p-1 leading-7 md:min-w-12 md:min-h-12 min-w-8 min-h-8 flex items-center justify-center flex-wrap text-white cursor-pointer transition-all duration-200 ${
                                Array.isArray(selectedValues[ratingKey])
                                  ? selectedValues[ratingKey].includes(value)
                                    ? "bg-[#BFA879]"
                                    : "bg-[rgba(161,255,230,0.20)]"
                                  : selectedValues[ratingKey] === value
                                  ? "bg-[#BFA879]"
                                  : "bg-[rgba(161,255,230,0.20)]"
                              }`}
                            >
                              {value}
                            </label>
                          </React.Fragment>
                        ))}
                  </div>
                  {errors[ratingKey] && touched[ratingKey] && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors[ratingKey]}
                    </p>
                  )}
                </div>
              );
            })}

            {showRating && (
              <div className="mb-4 flex flex-col mt-6 gap-3">
                <label className="block text-white mb-2">
                  {t("questionRate")}
                </label>
                <div className="flex flex-wrap justify-start gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <React.Fragment key={value}>
                      <Field
                        type="radio"
                        name={"new_rating"}
                        value={String(value)}
                        className="hidden peer"
                        id={`new_rating-${value}`}
                        onClick={() =>
                          handleSelection("new_rating", value, true)
                        }
                      />
                      <label
                        htmlFor={`new_rating-${value}`}
                        className={`leading-7 md:w-12 md:h-12 w-8 h-8 flex items-center justify-center text-white cursor-pointer transition-all duration-200 ${
                          selectedValues["new_rating"] === value
                            ? "bg-[#BFA879]"
                            : "bg-[rgba(161,255,230,0.20)]"
                        }`}
                      >
                        {value}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                {errors.new_rating && touched.new_rating && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.new_rating}
                  </p>
                )}
              </div>
            )}

            {/* Notes Field */}
            <div className="mb-4 flex flex-col gap-3">
              <label
                className={`leading-7 block text-white mb-2 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("note")}
              </label>
              <Field
                as="textarea"
                name="notes"
                placeholder={t("noteHolder")}
                className="w-full h-[100px] resize-none bg-[rgba(161,255,230,0.2)] py-3 px-4 text-right text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.notes && touched.notes && (
                <p className="text-red-500 text-sm mt-2">{errors.notes}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#BFA879] text-white text-sm font-[600] text-center py-2 h-[40px] hover:bg-green-800"
            >
              {t("confirm")}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SurveyForm;
