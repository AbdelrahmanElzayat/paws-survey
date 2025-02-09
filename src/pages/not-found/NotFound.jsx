import { useEffect } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="not-found"
    >
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard">Go back to the homepage</Link>
    </motion.div>
  );
};

export default Portfolio;
