import {useEffect, useRef, useState, type ReactNode} from 'react';
import {motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, useInView} from 'framer-motion';
import {Play, Volume2, VolumeX, Pause} from 'lucide-react';

/** Linguagem do prompt cinematic: sequência de scroll, materiais físicos e luz interativa. */
export function CinematicLaptop({preview,onPlay,embedded=false,playbackEnabled=true,forceMotion=false}:{preview:ReactNode,onPlay:()=>void,embedded?:boolean,playbackEnabled?:boolean,forceMotion?:boolean}) {
  const stage=useRef<HTMLDivElement>(null);
  const screen=useRef<HTMLDivElement>(null);
  const video=useRef<HTMLVideoElement>(null);
  const systemReduced=useReducedMotion();
  const reduced=systemReduced&&!forceMotion;
  const visible=useInView(screen,{amount:.65});
  const [muted,setMuted]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [error,setError]=useState(false);
  const [manualPause,setManualPause]=useState(false);
  const src=import.meta.env.VITE_EXPLAINER_VIDEO_URL;
  const {scrollYProgress}=useScroll({target:stage,offset:['start end','end end']});
  const progress=useSpring(scrollYProgress,{stiffness:65,damping:24,restDelta:.001});
  const x=useTransform(progress,[0,.3,.62,1],['-38%','-14%','0%','0%']);
  const y=useTransform(progress,[0,.55,1],[-150,0,0]);
  const scale=useTransform(progress,[0,.35,.7,1],[.22,.62,.98,1]);
  const spin=useTransform(progress,[0,.32,.62,1],[-360,-180,0,0]);
  const roll=useTransform(progress,[0,.6,1],[-18,0,0]);
  const lid=useTransform(progress,[0,.34,.72,1],[-87,-78,-9,-9]);
  const shadowOpacity=useTransform(progress,[0,.7],[.1,.5]);
  const tiltX=useSpring(useMotionValue(0),{stiffness:90,damping:22});
  const tiltY=useSpring(useMotionValue(0),{stiffness:90,damping:22});
  useEffect(()=>{
    const player=video.current;if(!player||!src)return;
    if(visible&&playbackEnabled&&!manualPause&&!document.hidden)player.play().catch(()=>setPlaying(false));else player.pause();
    const visibility=()=>{if(document.hidden)player.pause();else if(visible&&playbackEnabled&&!manualPause)player.play().catch(()=>setPlaying(false));};
    document.addEventListener('visibilitychange',visibility);
    return ()=>document.removeEventListener('visibilitychange',visibility);
  },[visible,src,manualPause,playbackEnabled]);
  return <div ref={stage} className={'cinematic-stage'+(reduced?' motion-reduced':'')+(embedded?' embedded-laptop':'')}>
    <div className="cinematic-sticky">
      <div className="laptop-scene" onPointerMove={e=>{if(reduced||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();const mx=(e.clientX-r.left)/r.width;const my=(e.clientY-r.top)/r.height;tiltY.set((mx-.5)*8);tiltX.set((.5-my)*5);e.currentTarget.style.setProperty('--light-x',`${mx*100}%`);e.currentTarget.style.setProperty('--light-y',`${my*100}%`);}} onPointerLeave={()=>{tiltX.set(0);tiltY.set(0)}}>
        <motion.div className="cinematic-flight" style={reduced||embedded?{}:{x,y,scale,rotateY:spin,rotateZ:roll}}>
          <motion.div className="physical-laptop" style={reduced?{}:{rotateX:tiltX,rotateY:tiltY}}>
            <motion.div className="physical-lid" style={{rotateX:reduced||embedded?-9:lid}}>
              <div className="lid-rear" aria-hidden="true"><span>SOLU<b>X</b></span></div>
              <div className="display-frame"><div className="camera-array"><i/><b/><i/></div>
                <div ref={screen} className="physical-screen">
                  {src&&!error?<><video ref={video} className="embedded-video" src={src} muted={muted} playsInline loop preload="metadata" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setError(true)}/><div className="video-controls"><button onClick={()=>{if(playing){video.current?.pause();setManualPause(true)}else{setManualPause(false);video.current?.play().catch(()=>setPlaying(false))}}} aria-label={playing?'Pausar vídeo':'Reproduzir vídeo'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button><span>CONHEÇA O SOLUX</span><button aria-label={muted?'Ativar som':'Silenciar vídeo'} onClick={()=>setMuted(!muted)}>{muted?<VolumeX size={16}/>:<Volume2 size={16}/>}</button></div></>:<div className="blank-laptop-display" aria-label="Tela do notebook reservada para o vídeo"/>}
                  <div className="glass-reflection" aria-hidden="true"/>
                </div><span className="display-signature">SOLUX</span>
              </div>
            </motion.div>
            <div className="physical-hinge" aria-hidden="true"/>
            <div className="physical-deck" aria-hidden="true"><div className="speaker speaker-left"/><div className="keyboard">{Array.from({length:6},(_,row)=><div className={'key-row key-row-'+row} key={row}>{Array.from({length:row===5?8:14},(_,key)=><span className={row===5&&key===3?'space-key':''} key={key}>{row===0?['esc','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','◉'][key]:row===5?'':[['`','1','2','3','4','5','6','7','8','9','0','−','=','⌫'],['⇥','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],['⇪','A','S','D','F','G','H','J','K','L',';','’','↵',''],['⇧','Z','X','C','V','B','N','M',',','.','/','↑','⇧','']][row-1]?.[key]}</span>)}</div>)}</div><div className="speaker speaker-right"/><div className="trackpad"/><div className="deck-notch"/></div>
            <div className="physical-front" aria-hidden="true"><i/><span/><i/></div>
          </motion.div>
        </motion.div>
        <motion.div className="ground-shadow" style={reduced?{}:{scale,opacity:shadowOpacity}}/>
      </div>
      <div className="cinematic-caption"><span className="green-dot"/>{src&&!error?'SEU SISTEMA EM AÇÃO · VÍDEO AUTOMÁTICO':'DO CANTEIRO À TELA · EXPLORE O SOLUX'}<span>ROLE PARA EXPLORAR ↓</span></div>
    </div>
  </div>;
}


