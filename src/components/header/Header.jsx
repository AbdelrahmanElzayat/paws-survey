import React from "react";
import ChangeLang from "../changeLang/ChangeLang";

const Header = (props) => {
  return (
    <header className={props.class}>
      <ChangeLang />
    </header>
  );
};

export default Header;
