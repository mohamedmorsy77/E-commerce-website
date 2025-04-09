import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

function ShopCard({ title, description, code, buttonText, link }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
      ref={ref}
      className="p-4 flex-grow-1 rounded-4 overflow-hidden"
    >
      <h2 className="text-dark fs-2">{title}</h2>
      <p className="mt-3 fw-medium text-muted">{description}</p>
      <span className="mt-3 text-muted fs-5">
        Code: <strong className="fs-4">{code}</strong>
      </span>
      <Link
        to={link}
        className="mt-4 btn btn-dark fw-bold text-decoration-none d-block w-50"
      >
        {buttonText}
      </Link>
    </motion.div>
  );
}

export default ShopCard;
