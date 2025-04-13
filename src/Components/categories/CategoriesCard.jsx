import React, { useRef } from "react";
import { motion , useInView} from "framer-motion";
import "./Categories.css";

function CategoriesCard({ category, onClick, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 1, ease: "easeInOut" }}
      ref={ref}
      className="col-12 col-sm-6 col-md-4 col-xl-3 mt-5"
    >
      <div
        onClick={onClick}
        className="category-item d-flex transition  flex-column align-items-center gap-2 "
      >
        <div className="category-image w-100 d-flex justify-content-center">
          <img
            className=" object-fit-contain rounded-4 transition"
            src={`${category.image}?width=240&height=200`}
            alt={category.name}
          />
        </div>
        <h4 className="text-center mt-3 text-success fs-6">{category.name}</h4>
      </div>
    </motion.div>
  );
}

export default React.memo(CategoriesCard);
