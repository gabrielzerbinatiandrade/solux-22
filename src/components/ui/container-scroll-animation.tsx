import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/** Adaptado do componente anexado: perspectiva e escala vinculadas ao scroll. */
export function ContainerScroll({children}:{children:ReactNode}) {
  const ref=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const rotate=useTransform(scrollYProgress,[0,.5,1],[9,0,-4]);
  const scale=useTransform(scrollYProgress,[0,.5,1],[.92,1,.97]);
  const reduced=useReducedMotion();
  return <div ref={ref} className="scroll-container"><motion.div style={reduced?{}:{rotateX:rotate,scale}}>{children}</motion.div></div>;
}
