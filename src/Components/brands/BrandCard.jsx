import { useInView , motion} from "framer-motion";
import { useRef } from "react";

function BrandCard({ brand, onClick ,index}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ delay: index * 0.01, ease: "easeIn", duration: 0.5 }}
      className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 p-0 p-sm-2"
    >
      <div className="brands-info" onClick={onClick}>
        <img
          className="w-100"
          src={brand.image}
          alt={brand.name}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export default BrandCard;
