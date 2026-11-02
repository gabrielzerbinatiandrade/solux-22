import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {assetUrl} from '../../assets';
import {Truck, Wallet, ChartNoAxesCombined, Package, Wrench, Fuel, ArrowUpRight, FileText, ShoppingCart, CircleCheck, Pause, Play, ChevronLeft, ChevronRight} from 'lucide-react';

const modules=[
  {title:'Controle de frota',short:'Frota',icon:Truck,kicker:'CADA MÁQUINA. CADA DETALHE.',heading:<>O trabalho é pesado.<br/>O controle fica <em>mais leve.</em></>,description:'Monitore manutenção preventiva, custos de combustível e rotas em tempo real com precisão.',items:['Histórico e plano de manutenção','Controle de abastecimento','Custos de operação por máquina'],nodes:[['Manutenção',Wrench],['Abastecimento',Fuel],['Operação',Truck]],caption:'Da manutenção ao custo de cada máquina.'},
  {title:'Financeiro',short:'Financeiro',icon:Wallet,kicker:'CLAREZA PARA DECIDIR.',heading:<>Mais clareza nas contas.<br/>Mais confiança <em>para decidir.</em></>,description:'Contas a pagar e receber, fluxo de caixa e DRE automatizados em dashboards visuais.',items:['Contas a pagar e receber','Visão do fluxo de caixa','Relatórios para acompanhar os resultados'],nodes:[['Contas',FileText],['Fluxo de caixa',Wallet],['Resultados',ChartNoAxesCombined]],caption:'Informações financeiras que conversam entre si.'},
  {title:'Obras e orçamentos',short:'Obras',icon:ChartNoAxesCombined,kicker:'DO PLANEJAMENTO AO RESULTADO.',heading:<>Acompanhe a obra.<br/>Entenda <em>cada custo.</em></>,description:'Apropriação de despesas detalhada para que seus orçamentos nunca saiam do trilho.',items:['Apropriação de despesas','Organização dos orçamentos','Acompanhamento físico-financeiro'],nodes:[['Orçamento',FileText],['Despesas',Wallet],['Obra',ChartNoAxesCombined]],caption:'Do que foi planejado ao que acontece no campo.'},
  {title:'Estoque inteligente',short:'Estoque',icon:Package,kicker:'TUDO NO LUGAR CERTO.',heading:<>A peça certa.<br/>Na hora em que a obra <em>precisa.</em></>,description:'Evite gargalos na obra com nosso gerenciador de compras, peças e materiais.',items:['Gestão de compras','Controle de peças e materiais','Organização dos suprimentos'],nodes:[['Compras',ShoppingCart],['Materiais',Package],['Suprimentos',Wrench]],caption:'Compras, peças e materiais na mesma visão.'},
];

const photographs=[
  {src:'solux-locacao.webp',alt:'Cena ilustrativa de máquinas no pátio de manutenção',label:'CADA MÁQUINA CONTA.'},
  {src:'solux-equipe.webp',alt:'Cena ilustrativa de profissionais analisando informações da obra',label:'DECISÕES COM CONTEXTO.'},
  {src:'solux-civil.webp',alt:'Cena ilustrativa de um canteiro de construção civil',label:'DO PLANEJAMENTO AO CAMPO.'},
  {src:'solux-industrial.webp',alt:'Cena ilustrativa de uma operação industrial',label:'RECURSOS NO LUGAR CERTO.'},
];
export function ModuleExplorer(){
  const [selected,setSelected]=useState(0);
  const [paused,setPaused]=useState(false);
  const [engaged,setEngaged]=useState(false);
  const [visible,setVisible]=useState(false);
  const [pageVisible,setPageVisible]=useState(true);
  const reduce=useReducedMotion();
  const root=useRef<HTMLDivElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  const playing=visible && pageVisible && !paused && !engaged && !reduce;
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});if(root.current)observer.observe(root.current);const update=()=>setPageVisible(!document.hidden);update();document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update)}},[]);
  useEffect(()=>{if(!playing)return;const timer=window.setTimeout(()=>setSelected(i=>(i+1)%modules.length),6500);return()=>clearTimeout(timer)},[playing,selected]);
  const current=modules[selected];const photo=photographs[selected];
  return <div ref={root} className="module-explorer module-photographic" onMouseEnter={()=>setEngaged(true)} onMouseLeave={()=>setEngaged(false)} onFocusCapture={()=>setEngaged(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setEngaged(false)}}>
    <div className="module-navigation" role="tablist" aria-label="Explorar funcionalidades">{modules.map((module,i)=>{const Icon=module.icon;return <button key={module.title} id={'module-tab-'+i} ref={el=>{buttons.current[i]=el}} role="tab" aria-selected={selected===i} aria-controls="module-panel" tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%4;else if(e.key==='ArrowLeft')next=(i+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();setSelected(next);buttons.current[next]?.focus()}}><small>0{i+1}</small><Icon size={18} strokeWidth={1.5}/><span>{module.short}</span>{selected===i&&<span className="photo-tab-progress"><span key={selected+'-'+playing} style={{animationPlayState:playing?'running':'paused'}}/></span>}</button>})}</div>
    <div className="module-body" role="tabpanel" id="module-panel" aria-labelledby={'module-tab-'+selected}>
      <AnimatePresence mode="wait" initial={false}><motion.div key={selected} className="module-information" initial={{opacity:0,y:reduce?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduce?0:-6}} transition={{duration:reduce?0:.25}}><span className="module-kicker">{current.kicker}</span><h3>{current.heading}</h3><p>{current.description}</p><ul>{current.items.map(text=><li key={text}><CircleCheck size={14} strokeWidth={1.4}/>{text}</li>)}</ul><a href="#contato">Conhecer {current.title.toLowerCase()} <ArrowUpRight size={17}/></a></motion.div></AnimatePresence>
      <div className="module-photograph">{photographs.map((image,i)=><motion.img key={image.src} src={assetUrl('/images/'+image.src)} alt={image.alt} width="1440" height="1024" loading="lazy" initial={false} animate={{opacity:selected===i?1:0,scale:selected===i?1:1.035}} transition={{duration:reduce?0:.7,ease:[.22,1,.36,1]}} aria-hidden={selected!==i}/>)}<div className="module-photo-shade"/><span className="module-photo-index">EM CAMPO / 0{selected+1}</span><div className="module-photo-caption"><span>{photo.label}</span><strong>{current.title}</strong><p>{current.caption}</p></div></div>
    </div>
    <div className="module-player"><span>Uma operação. Todos os detalhes.</span><div><button type="button" onClick={()=>setPaused(p=>!p)} aria-label={paused||reduce?'Ativar troca automática':'Pausar troca automática'} disabled={!!reduce}>{paused||reduce?<Play size={14}/>:<Pause size={14}/>}<span>{reduce?'Troca manual':paused?'Retomar':'Automático'}</span></button><span className="module-page">0{selected+1} / 04</span><button type="button" aria-label="Módulo anterior" onClick={()=>setSelected(i=>(i+3)%4)}><ChevronLeft size={18}/></button><button type="button" aria-label="Próximo módulo" onClick={()=>setSelected(i=>(i+1)%4)}><ChevronRight size={18}/></button></div></div>
  </div>;
}
