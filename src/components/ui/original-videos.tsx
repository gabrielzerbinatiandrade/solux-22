import {useState} from 'react';
import {Play, ArrowUpRight} from 'lucide-react';
import './original-videos.css';

const videos=[
  {id:'KXhC0N2Tk9Q',category:'TUTORIAL / PEDIDO DE COMPRA',title:'Lançando um pedido de compra no sistema'},
  {id:'0VxFWTbipGM',category:'TUTORIAL / TODOS OS MÓDULOS',title:'Todos os módulos do sistema Solux'},
  {id:'uhS7tNfRTms',category:'APRESENTAÇÃO / GERAL',title:'Conheça o Solux em 5 minutos'},
];

export function OriginalVideos(){
  const [playing,setPlaying]=useState<string|null>(null);
  return <div className="original-videos">{videos.map((video,index)=><article key={video.id} className="original-video-card"><div className="original-video-frame">{playing===video.id?<iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button type="button" onClick={()=>setPlaying(video.id)} aria-label={`Reproduzir: ${video.title}`}><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy"/><span className="original-video-shade"/><span className="original-video-play"><Play size={20} fill="currentColor"/></span><span className="original-video-index">0{index+1}</span></button>}</div><div className="original-video-copy"><span>{video.category}</span><h3>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">Abrir no YouTube <ArrowUpRight size={15}/></a></div></article>)}</div>;
}
