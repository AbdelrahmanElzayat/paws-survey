import React from "react";
import annualcermony from "../../assets/images/annualcermony.png";
import yearsAnniversary from "../../assets/images/yearsAnniversary.png";
const Footer = () => {
  return (
    <footer className="mt-[50px] py-7">
      <div className="container">
        <div className="w-full flex justify-between items-center">
          <img src={annualcermony} alt="" className="max-w-[120px]" />
          <img src={yearsAnniversary} alt="" className="max-w-[120px]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
