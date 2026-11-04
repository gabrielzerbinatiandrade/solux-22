import {assetUrl} from '../../assets';
import {useEffect, useRef, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {GlassLayers} from './liquid-glass';

const links=[['O sistema','sistema'],['Funcionalidades','funcionalidades'],['Segmentos','segmentos'],['Conteúdos','conteudos']];
export function SiteNavigation(){
  const [active,setActive]=useState('');
  const [dark,setDark]=useState(false);
  const nav=useRef<HTMLElement>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;const line=window.innerHeight*.35;let current='';for(const [,id]of links){const r=document.getElementById(id)?.getBoundingClientRect();if(r&&r.top<=line&&r.bottom>line)current=id}setActive(current);const segments=document.getElementById('segmentos')?.getBoundingClientRect();const y=(nav.current?.getBoundingClientRect().bottom??85);const hero=document.querySelector('.unified-hero')?.getBoundingClientRect();setDark((!!segments&&segments.top<y&&segments.bottom>y)||(!!hero&&hero.top<y&&hero.bottom>y))};
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cancelAnimationFrame(frame)};
  },[]);
  return <nav ref={nav} className={'floating-glass-nav refined-nav '+(dark?'nav-on-dark':'')} aria-label="Navegação principal"><GlassLayers/><a className="nav-wordmark" href="#inicio" aria-label="Solux início"><img src={assetUrl('/solux-logo-transparent.png')} alt="Solux Sistema Gerencial"/></a><div className="floating-nav-links">{links.map(([title,id])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined}>{title}</a>)}</div><a className="nav-demo" href="#contato">Demonstração <ArrowUpRight size={14}/></a></nav>;
}

