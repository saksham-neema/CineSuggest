// src/components/Loader.jsx
import { motion } from 'framer-motion';
import './Loader.css'; // We will create this file next

// Variants for the container to orchestrate the stagger effect
const loaderContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2, // Each dot animates 0.2s after the other
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variants for each individual dot
const loaderDotVariants = {
  start: {
    y: "0%", // Start at the original position
  },
  end: {
    y: "100%", // Animate down
  },
};

// Transition for the dots to make them bounce forever
const loaderDotTransition = {
  duration: 0.5,
  repeat: Infinity, // Loop the animation indefinitely
  repeatType: "reverse", // Reverse the animation on each loop (bounce up and down)
  ease: "easeInOut",
};

function Loader({ message }) {
  return (
    <div className="loader-wrapper">
      <motion.div
        className="loader-container"
        variants={loaderContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="loader-dot"
          variants={loaderDotVariants}
          transition={loaderDotTransition}
        />
        <motion.span
          className="loader-dot"
          variants={loaderDotVariants}
          transition={loaderDotTransition}
        />
        <motion.span
          className="loader-dot"
          variants={loaderDotVariants}
          transition={loaderDotTransition}
        />
      </motion.div>
      <p className="loader-message">{message}</p>
    </div>
  );
}

export default Loader;