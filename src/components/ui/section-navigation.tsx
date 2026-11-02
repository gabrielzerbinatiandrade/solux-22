import {useEffect} from 'react';

/** Évite de traverser toute la timeline épinglée lors d'un clic de navigation. */
export function SectionNavigation(){
  useEffect(()=>{
    const navigate=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const anchor=(event.target as Element)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if(!anchor)return;
      const hash=anchor.getAttribute('href');if(!hash||hash==='#')return;
      const target=document.getElementById(hash.slice(1));if(!target)return;
      event.preventDefault();
      const top=hash==='#inicio'?0:Math.max(0,window.scrollY+target.getBoundingClientRect().top-95);
      history.pushState(null,'',hash);
      window.scrollTo({top,behavior:Math.abs(top-window.scrollY)>window.innerHeight*1.5?'instant':'smooth'});
    };
    document.addEventListener('click',navigate);
    return()=>document.removeEventListener('click',navigate);
  },[]);
  return null;
}
