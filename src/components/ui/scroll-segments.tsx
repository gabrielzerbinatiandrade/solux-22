import {assetUrl} from '../../assets';
import {useEffect, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight} from 'lucide-react';
import {GlassLayers} from './liquid-glass';
import {animate, motion, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent, useTransform, type MotionValue} from 'framer-motion';
import './scroll-segments.css';

const segments=[
  {title:'Terraplenagem',image:'/images/solux-operacao.webp',alt:'Cena ilustrativa de escavadeira carregando um caminhão',description:'Gestão 360º de máquinas pesadas, caçambas, manutenções, estoque de peças e finanças.'},
  {title:'Montagem industrial',image:'/images/solux-industrial.webp',alt:'Cena ilustrativa de técnicos trabalhando em uma estrutura metálica industrial',description:'Apuração rigorosa de H/H (Homem/Hora), diário de obra digital, custos de materiais e impostos.'},
  {title:'Construção civil',image:'/images/solux-civil.webp',alt:'Cena ilustrativa de profissionais conferindo um projeto na construção de um edifício',description:'Orçamentos dinâmicos, acompanhamento físico-financeiro, alertas preventivos e gestão de suprimentos.'},
  {title:'Locação de equipamentos',image:'/images/solux-locacao.webp',alt:'Cena ilustrativa de máquinas em um pátio de locação de equipamentos',description:'Contratos, medições por hora/franquia, faturamento automático e agenda de disponibilidade.'},
];

function StepProgress({progress,index}:{progress:MotionValue<number>,index:number}){
  const scaleX=useTransform(progress,value=>Math.max(0,Math.min(1,value*segments.length-index)));
  return <motion.span className="segment-step-fill" style={{scaleX}}/>;
}

function ScrollPhoto({item,index,active,progress}:{item:typeof segments[number],index:number,active:number,progress:MotionValue<number>}){
  // Les photos se superposent directement selon le scroll, sans relancer un tween à chaque cran.
  const opacity=useTransform(progress,[index/4-.045,index/4+.045],[0,1]);
  const y=useTransform(progress,[(index-.3)/4,(index+1.3)/4],[12,-12]);
  return <motion.img className={'segment-photo '+(index===active?'is-active':'')} src={assetUrl(item.image)} alt={index===active?item.alt:''} aria-hidden={index!==active} loading="lazy" decoding="async" style={{opacity:index===0?1:opacity,y,scale:1.045,zIndex:index}}/>;
}

export function ScrollSegments(){
  const ref=useRef<HTMLElement>(null);

  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const [active,setActive]=useState(0);
  const activeRef=useRef(0);
  const rawProgress=useMotionValue(0);
  const entryRaw=useMotionValue(0);
  const entryProgress=entryRaw;
  const panelClip=useTransform(entryProgress,[0,.18,.78,1],['inset(36% 28% 20% 28% round 48px)','inset(30% 24% 16% 24% round 40px)','inset(1% 1% 1% 1% round 14px)','inset(0% 0% 0% 0% round 0px)']);
  const panelRotate=useTransform(entryProgress,[0,.7,1],[-7,-1,0]);
  const panelTilt=useTransform(entryProgress,[0,.75,1],[16,2,0]);
  const orangeClip=useTransform(entryProgress,[0,.6,1],['inset(34% 26% 18% 26% round 48px)','inset(0% 0% 0% 0% round 8px)','inset(0% 0% 0% 0% round 0px)']);
  const orangeOpacity=useTransform(entryProgress,[0,.1,.8,1],[0,1,1,0]);
  const sheenX=useTransform(entryProgress,[0,.25,1],['-180%','-130%','220%']);
  const sheenOpacity=useTransform(entryProgress,[0,.3,.75,1],[0,.18,.08,0]);


  const contentRaw=useMotionValue(0);
  const contentProgress=contentRaw;
  const contentY=useTransform(contentProgress,[0,1],[48,0]);
  const contentScale=useTransform(contentProgress,[0,1],[.97,1]);
  const contentOpacity=useTransform(contentProgress,[0,1],[0,1]);
  const smoothProgress=useSpring(rawProgress,{stiffness:85,damping:26,mass:.65,restDelta:.0001});
  useMotionValueEvent(smoothProgress,'change',value=>{
    const current=activeRef.current;
    // Petite zone de stabilité: pas de clignotement au bord entre deux étapes.
    const candidate=Math.min(segments.length-1,Math.floor(Math.max(0,value)*segments.length));
    const boundary=candidate>current?(current+1)/segments.length:current/segments.length;
    if(candidate!==current&&Math.abs(value-boundary)>.009){activeRef.current=candidate;setActive(candidate)}
  });
  useEffect(()=>{
    let frame=0;
    let opened=false;
    let entryAnimation:ReturnType<typeof animate>|undefined;
    let contentAnimation:ReturnType<typeof animate>|undefined;
    const update=()=>{
      frame=0;const element=ref.current;if(!element)return;
      const rect=element.getBoundingClientRect();
      const viewport=window.innerHeight;
      const entryDistance=viewport*.15;
      if(!opened&&rect.top<viewport*.6){
        opened=true;entryAnimation?.stop();contentAnimation?.stop();
        entryAnimation=animate(entryRaw,1,{duration:.95,ease:[.65,0,.2,1]});
        contentAnimation=animate(contentRaw,1,{duration:.6,delay:.5,ease:[.22,1,.36,1]});
      }else if(opened&&rect.top>viewport*.95){
        opened=false;entryAnimation?.stop();contentAnimation?.stop();entryRaw.set(0);contentRaw.set(0);
      }
      const travel=Math.max(1,rect.height-viewport-entryDistance);
      const progress=Math.max(0,Math.min(1,(-rect.top-entryDistance)/travel));
      rawProgress.set(progress);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    const observer=new ResizeObserver(schedule);if(ref.current)observer.observe(ref.current);
    update();
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);observer.disconnect();cancelAnimationFrame(frame);entryAnimation?.stop();contentAnimation?.stop()};
  },[rawProgress,entryRaw,contentRaw]);
  const select=(index:number)=>{
    const element=ref.current;if(!element)return;
    const rect=element.getBoundingClientRect();
    const top=window.scrollY+rect.top;
    const entryDistance=window.innerHeight*.15;
    const travel=Math.max(1,rect.height-window.innerHeight-entryDistance);
    // Positionner au centre de l'étape évite les changements au seuil suivant.
    window.scrollTo({top:top+entryDistance+travel*(index+.45)/segments.length,behavior:'smooth'});
  };
  return <section ref={ref} id="segmentos" className="segments scroll-segments app-opening-segments" aria-label="Soluções por segmento">
    <div className="segments-sticky"><motion.div className="segment-orange-underlay" style={{clipPath:orangeClip,opacity:orangeOpacity,rotate:panelRotate}} aria-hidden="true"/><motion.div className="segment-expanding-panel" style={{clipPath:panelClip,rotate:panelRotate,rotateX:panelTilt,transformPerspective:1800}} aria-hidden="true"><motion.div className="segment-entry-sheen" style={{x:sheenX,opacity:sheenOpacity}}/></motion.div><motion.div className="section segments-inner" style={{y:contentY,opacity:contentOpacity,scale:contentScale}}>
      <div className="segments-copy"><div className="eyebrow">03 / ESPECIALISTA NA SUA REALIDADE</div><h2>O seu terreno.<br/>A nossa <span>especialidade.</span></h2><p>Nosso software não foi feito apenas em escritórios. Ele nasce e evolui com base no dia a dia real das operações pesadas.</p>
        <div className="sector-tabs" role="tablist" aria-label="Segmentos" aria-orientation="vertical">{segments.map((item,i)=><motion.button animate={{color:active===i?"#f47b20":"#ffffffa6"}} transition={{duration:.5,ease:[.22,1,.36,1]}} key={item.title} ref={el=>{tabs.current[i]=el}} type="button" role="tab" id={`segment-tab-${i}`} aria-controls="segment-panel" aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>{let next=i;if(event.key==='ArrowDown')next=(i+1)%segments.length;else if(event.key==='ArrowUp')next=(i+segments.length-1)%segments.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=segments.length-1;else return;event.preventDefault();tabs.current[next]?.focus();select(next)}}><motion.small animate={{color:active===i?"#f47b20":"#ffffff66",y:0,scale:1}} transition={{type:"spring",stiffness:150,damping:22}}>{String(i+1).padStart(2,'0')}</motion.small><motion.span className="segment-tab-title" animate={{x:active===i?3:0}} transition={{type:"spring",stiffness:120,damping:24}}>{item.title}</motion.span><motion.span className="segment-tab-arrow" animate={{rotate:active===i?45:0,opacity:active===i?1:.5}} transition={{duration:.5}}><ArrowUpRight size={20}/></motion.span>{active===i&&<motion.span className="segment-active-marker" layoutId="segment-active-marker" transition={{type:"spring",stiffness:180,damping:28}}/>}</motion.button>)}</div>
        <div className="segment-scroll-hint"><ArrowDown size={13}/><span>Role para conhecer cada segmento</span><b><AnimatePresence mode="popLayout" initial={false}><motion.span key={active} initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-8,opacity:0}} transition={{duration:.3}}>{String(active+1).padStart(2,'0')}</motion.span></AnimatePresence> / 04</b></div>
      </div>
      <div className="sector-visual" role="tabpanel" id="segment-panel" aria-labelledby={`segment-tab-${active}`}>
        {segments.map((item,i)=><ScrollPhoto key={item.image} item={item} index={i} active={active} progress={smoothProgress}/>)}
        <div className="sector-overlay"/>
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.2,ease:[.22,1,.36,1]}} className="sector-detail"><span>SOLUX EM CAMPO / {String(active+1).padStart(2,'0')}</span><h3>{segments[active].title}</h3><p>{segments[active].description}</p><a className="button liquid-action" href="#contato"><GlassLayers/>Solução para meu negócio <ArrowUpRight size={17}/></a></motion.div></AnimatePresence><span className="photo-corner">GESTÃO 360°</span>
        <div className="segment-photo-progress" aria-hidden="true">{segments.map((s,i)=><span key={s.title} className={i===active?'is-active':''}/>)}</div>
      </div>
    </motion.div></div>
  </section>;
}











