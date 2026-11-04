import {useRef,useState} from 'react';
import {motion,useScroll,useTransform,useSpring,useMotionValueEvent,useReducedMotion,type MotionValue} from 'framer-motion';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import {assetUrl} from '../../assets';
const scenes=[{label:'Escritório',lines:['SOLUX'],copy:'A obra não para. Sua gestão acompanha.'},{label:'Operação',lines:['DO ESCRITÓRIO','PARA O CAMPO.'],copy:'Frota, abastecimentos e manutenção conectados à sua operação.'},{label:'Visão integrada',lines:['CADA OBRA.','UMA VISÃO COMPLETA.'],copy:'Obras, estoque e financeiro no mesmo sistema, 100% em nuvem.'},{label:'Sua gestão',lines:['QUEM MOVE A TERRA','PRECISA DE VISÃO.'],copy:'Conheça o software de gestão para terraplenagem feito para a sua rotina.'}];
function Scene({index,progress,quiet,active}:{index:number,progress:MotionValue<number>,quiet:boolean|null,active:boolean}){
 const start=index*.24;const end=start+.23;
 const opacity=useTransform(progress,[Math.max(0,start-.01),start+.025,end-.035,end],[index===0?1:0,1,1,index===3?1:0]);
 const lift=useTransform(progress,[start,start+.035,end-.035,end],[index===0?0:105,0,0,index===3?0:-105]);
 const scene=scenes[index];
 return <motion.div className={'solux-scroll-scene scene-'+index} style={{opacity}} aria-hidden={!active} inert={!active}>
  <span className="solux-scene-label"><i/>0{index+1} / {scene.label.toUpperCase()}</span>
  {index===0?<h1><span className="scene-line"><motion.span style={quiet?{}:{y:lift}}>{scene.lines[0]}</motion.span></span></h1>:<h2>{scene.lines.map(line=><span className="scene-line" key={line}><motion.span style={quiet?{}:{y:lift}}>{line}</motion.span></span>)}</h2>}
  <div className="solux-scene-copy"><p>{scene.copy}</p>{index===3&&<a href="#contato">Agendar demonstração <ArrowUpRight size={19}/></a>}</div>
 </motion.div>
}
export function CinematicHero(){
 const root=useRef<HTMLElement>(null);const quiet=useReducedMotion();const [active,setActive]=useState(0);
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end end']});
 const smooth=useSpring(scrollYProgress,{stiffness:95,damping:30,mass:.35});
 const progress=quiet?scrollYProgress:smooth;
 useMotionValueEvent(progress,'change',v=>setActive(Math.min(3,Math.floor(Math.max(0,v)*4))));
 const scale=useTransform(progress,[0,.04,.85,1],[1.85,1.85,1,1]);
 const x=useTransform(progress,[0,.85],['-8%','0%']);
 const exit=useTransform(progress,[.82,.91],[1,0]);
 const transitionOpacity=useTransform(progress,[.83,.99],[0,1]);
 const frame=useTransform(progress,[.82,1],['inset(0% 0% 0% 0% round 0px)','inset(7% 6% 11% 6% round 22px)']);
 const interfaceOpacity=useTransform(progress,[.83,.94],[1,0]);
 return <section ref={root} className="solux-immersive solux-story" aria-label="Solux, gestão para terraplenagem">
  <div className="solux-immersive-sticky">
   <motion.div className="solux-exit-frame" style={quiet?{}:{clipPath:frame}}>
   <motion.img className="solux-immersive-bg" src={assetUrl('/images/solux-escritorio-campo.webp')} alt="Cena ilustrativa de um escritório de obra com vista para a terraplanagem" fetchPriority="high" width="1536" height="1024" style={quiet?{}:{scale,x}}/>
   <div className="solux-immersive-shade"/>
   </motion.div>
   <motion.div className="solux-notebook-wash" style={{opacity:transitionOpacity}} aria-hidden="true"/>
   <motion.div className="solux-story-scenes" style={{opacity:exit}}>{scenes.map((_,i)=><Scene key={i} index={i} progress={progress} quiet={quiet} active={active===i}/>)}</motion.div>
   <motion.div className="solux-story-top" style={{opacity:interfaceOpacity}} aria-live="off"><span>0{active+1} <i>/</i> {scenes[active].label}</span><a href="#sistema">Conhecer o sistema <ArrowUpRight size={13}/></a></motion.div>
   <motion.div className="solux-immersive-foot" style={{opacity:interfaceOpacity}}><motion.div className="solux-scene-progress" style={{scaleX:progress}}/><span>SOLUX / DO CAMPO À GESTÃO</span><a href="#sistema">[ role para explorar ] <ArrowDown size={15}/></a><span>0{active+1} / 04</span></motion.div>
  </div>
 </section>
}
