import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children, className = '', magneticPull = 30 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Smooth fractional mapping based on pull factor
    setPosition({ 
      x: middleX * (magneticPull / width), 
      y: middleY * (magneticPull / height) 
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      className={className}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      data-cursor="true"
    >
      {children}
    </motion.div>
  );
}
