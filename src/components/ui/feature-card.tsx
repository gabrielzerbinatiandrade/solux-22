import {useMotionValue, useSpring, useMotionTemplate, motion} from 'framer-motion';
import {ArrowUpRight, type LucideIcon} from 'lucide-react';
import './feature-card.css';

export function FeatureCard({icon:Icon,title,text,tag,index}:{icon:LucideIcon,title:string,text:string,tag:string,index:number}){
  const rx=useMotionValue(0),ry=useMotionValue(0);
  const rotateX=useSpring(rx,{stiffness:180,damping:22});
  const rotateY=useSpring(ry,{stiffness:180,damping:22});
  const mx=useMotionValue(50),my=useMotionValue(30);
  const glow=useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%,rgba(244,123,32,.10),transparent 70%)`;
  const reset=()=>{rx.set(0);ry.set(0)};
  return <motion.a href="#contato" className="modern-feature-card" aria-label={`Conhecer ${title}`} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,delay:index*.055}} whileHover={{y:-8,boxShadow:'0 22px 50px rgba(0,0,0,.07),0 3px 10px rgba(244,123,32,.06)',transition:{type:'spring',stiffness:260,damping:24,delay:0}}} whileTap={{scale:.98,y:-2,transition:{duration:.15,delay:0}}} style={{rotateX,rotateY,transformPerspective:1100}} onPointerMove={e=>{if(e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;mx.set(x*100);my.set(y*100);rx.set((.5-y)*5);ry.set((x-.5)*5)}} onPointerLeave={reset} onBlur={reset}>
    <motion.span className="feature-pointer-glow" style={{background:glow}} aria-hidden="true"/>
    <div className="modern-feature-top"><span className="modern-feature-icon"><Icon size={26} strokeWidth={1.45}/></span><span className="modern-feature-index">{String(index+1).padStart(2,'0')}</span></div>
    <div className="modern-feature-copy"><small>{tag}</small><h3>{title}</h3><p>{text}</p></div>
    <div className="modern-feature-footer"><span>Conhecer módulo</span><span className="modern-feature-arrow"><ArrowUpRight size={18}/></span></div>
  </motion.a>;
}
