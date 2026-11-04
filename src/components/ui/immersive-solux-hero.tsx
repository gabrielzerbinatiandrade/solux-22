import {useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowDown,ArrowUpRight,Pause,Play} from 'lucide-react';
import {assetUrl} from '../../assets';
import {CinematicLaptop} from './cinematic-laptop';
import './unified-hero.css';

// Seconds: adjust these values to tune the opening without changing the layout.
const timing={photo:.95,text:.8,laptop:1.65,laptopDelay:.25};
const ease=[.22,1,.36,1] as const;
export function CinematicHero(){
 const reduce=useReducedMotion();
 const [paused,setPaused]=useState(false);
 const animate=!reduce&&!paused;
 return <section className="unified-hero" aria-label="Solux, software de gestão para terraplenagem">
  <motion.img className="unified-photo" src={assetUrl('/images/solux-escritorio-campo.webp')} alt="Cena ilustrativa de um escritório com vista para a operação de terraplenagem" width="1920" height="1080" fetchPriority="high" initial={reduce?false:{opacity:0,scale:1.045}} animate={{opacity:1,scale:1}} transition={{duration:animate?timing.photo:0,ease}}/>
  <div className="unified-shade" aria-hidden="true"/>
  <div className="unified-layout">
   <motion.div className="unified-copy" initial={reduce?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:animate?timing.text:0,delay:animate?.12:0,ease}}>
    <span className="unified-eyebrow"><i/>SOLUX / GESTÃO PARA TERRAPLENAGEM</span>
    <h1>A obra não para.<br/><span>Sua gestão<br/>acompanha.</span></h1>
    <p>Do campo ao escritório, a mesma informação. Controle frota, obras, estoque e financeiro em um só sistema, 100% em nuvem.</p>
    <div className="unified-actions"><a href="#contato">Agendar demonstração <ArrowUpRight size={18}/></a><a href="#sistema">Conhecer o sistema <ArrowDown size={16}/></a></div>
   </motion.div>
   <div className="unified-device-stage" id="apresentacao">
    <div className="unified-device-light" aria-hidden="true"/>
    <motion.div className="unified-device" initial={reduce?false:{opacity:0,x:-230,y:35,rotateY:-42,rotateZ:-7,scale:.72}} animate={{opacity:1,x:0,y:0,rotateY:-7,rotateZ:0,scale:1}} transition={{duration:animate?timing.laptop:0,delay:animate?timing.laptopDelay:0,ease}}>
     <CinematicLaptop embedded preview={null} onPlay={()=>{}} playbackEnabled={!paused}/>
    </motion.div>
    <div className="unified-device-foot"><span>DO CAMPO À TELA</span><span>UMA OPERAÇÃO CONECTADA.</span></div>
   </div>
  </div>
  <div className="unified-footer"><span>FROTA / OBRAS / FINANCEIRO</span><a href="#sistema">Explore o Solux <ArrowDown size={14}/></a><button onClick={()=>setPaused(v=>!v)} aria-pressed={paused} aria-label={paused?'Ativar movimento':'Pausar movimento'}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?'Ativar':'Pausar'} motion</button></div>
 </section>
}
