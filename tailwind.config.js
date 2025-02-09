/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        expoArabic: ["ExpoArabic-Book", "sans-serif"], // اسم الخط الذي ستستخدمه
      },
      backgroundImage: {
        mianBg: "#1E3D2D",
        "custom-gradient": "linear-gradient(to top, #FFF, #C8A04F)",
        "custom-gradient-img":
          "linear-gradient(to left, #FFF, rgba(255, 255, 255, 0.00))",
      },
      boxShadow: {
        custom: "10px 20px 20px 0px rgba(110, 96, 69, 0.39)",
        btn: "0px 15px 12.5px 0px rgba(64, 64, 64, 0.11)",
        btnsb: "15px 15px 25px 0px rgba(112, 66, 220, 0.17)",
        video: "-30px 20px 20px 0px rgba(0, 0, 0, 0.34);",
      },
      backdropBlur: {
        custom: "15px",
      },
      screens: {
        xs: "480px",
      },
      colors: {
        textPrimary: "#090909",
        textSecondary: "#1F1F1F",
        textMain: "#000",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
