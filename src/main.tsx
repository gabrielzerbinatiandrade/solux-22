import {assetUrl} from './assets';
import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion} from 'framer-motion';
import {ArrowUpRight, Check, Truck, Wallet, Package, ChartNoAxesCombined, Users, Wrench, Fuel, X, Cloud, ShieldCheck, Headphones} from 'lucide-react';
import {SectionNavigation} from './components/ui/section-navigation';
import {SiteNavigation} from './components/ui/site-navigation';
import {ContactSection} from './components/ui/contact-section';
import {SiteFaq} from './components/ui/site-faq';
import {OriginalVideos} from './components/ui/original-videos';
import {ModuleExplorer} from './components/ui/module-explorer';
import {ScrollSegments} from './components/ui/scroll-segments';
import {CinematicHero} from './components/ui/immersive-solux-hero';
import {CinematicLaptop} from './components/ui/cinematic-laptop';
import './styles.css';
import './laptop.css';
import './cinematic-hero.css';
import './glass.css';
import {GlassFilter, GlassLayers} from './components/ui/liquid-glass';
import './liquid-glass.css';
import './brand-palette.css';
import './hero-impact.css';
import './about-editorial.css';
import './refinement.css';
import './second-pass.css';
import './studio-refinement.css';

const whatsapp='https://wa.me/5516992411353';
function Logo({light=false}:{light?:boolean}){return <a href="#inicio" aria-label="Solux início" className={'logo '+(light?'light':'')}><img src={assetUrl('/solux-logo-transparent.png')} alt="SOLUX Sistema Gerencial"/></a>}
function Reveal({children,className=''}:{children:React.ReactNode,className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7}}>{children}</motion.div>}
function Dashboard(){return <div className="dashboard"><aside><b>SOLU<span>X</span></b><small>WORKSPACE</small>{['Visão geral','Obras','Minha frota','Financeiro','Estoque','Relatórios'].map((x,i)=><div key={x} className={i===0?'selected':''}><Package size={12}/> <span>{x}</span></div>)}<small className="dash-help">Central de ajuda</small></aside><div className="dash-main"><header><div><small>QUARTA-FEIRA, 21 DE OUTUBRO</small><h4>Sua operação, em tempo real<span>Online</span></h4></div><span className="avatar">SL</span></header><div className="demo-note">Prévia ilustrativa · dados de demonstração</div><div className="metrics">{[['Receita no período','R$ 248.520','+12,8%'],['Máquinas em operação','24 / 28','85,7%'],['Obras em andamento','08','Ativas']].map(x=><div key={x[0]}><small>{x[0]}</small><strong>{x[1]}</strong><em>{x[2]} <span>neste mês</span></em></div>)}</div><div className="dash-chart"><div><b>Resultado da operação</b><span>Receita <i/> Despesas</span></div><div className="bars">{[40,58,44,68,53,77,64,89,70,95,82,100].map((v,i)=><div key={i}><i style={{height:v+'%'}}/><i style={{height:v*.62+'%'}}/></div>)}</div><footer><span>01 out</span><span>10 out</span><span>20 out</span><span>31 out</span></footer></div><div className="dash-bottom"><b>Frota em atividade</b><span>Ver todas</span></div><div className="machine-row"><span className="machine-icon"></span><b>Escavadeira CAT 320</b><span>Obra Jardim Europa</span><em>Em operação</em></div></div></div>}
export function App(){const [video,setVideo]=useState(false);
return <><SectionNavigation/><a className="skip-content" href="#sistema">Ir para o conteúdo</a><GlassFilter/><SiteNavigation/><main><div id="inicio" className="hero-anchor"><CinematicHero/></div>
<section id="apresentacao" className="notebook-presentation" aria-label="Apresentação do Solux"><div className="notebook-section-heading"><span>DO CAMPO À TELA</span><h2>Sua operação, em uma só visão.</h2></div><CinematicLaptop preview={null} onPlay={()=>setVideo(true)}/></section>
<div className="trust-strip"><span>O SEU NEGÓCIO NÃO PARA.<br/><b>SUA GESTÃO TAMBÉM NÃO.</b></span><div><Cloud/>100% online</div><div><ShieldCheck/>Informações integradas</div><div><Headphones/>Suporte dedicado</div><div><Truck/>Do campo ao escritório</div></div>
<section id="sistema" className="about-glass-section"><div className="section about about-editorial about-glass-panel"><GlassLayers/>
  <Reveal className="about-editorial-photo"><div className="about-photo-frame"><img src={assetUrl('/images/solux-equipe.webp')} alt="Cena ilustrativa de profissionais conferindo informações no escritório da obra" loading="lazy"/></div><div className="about-photo-note"><span className="about-note-mark"/><div><strong>Feito para a rotina da obra.</strong><span>Do campo ao escritório, a mesma informação.</span></div></div><span className="about-photo-label">PESSOAS, PROCESSOS E RESULTADOS.</span></Reveal>
  <Reveal className="about-editorial-copy"><div className="eyebrow"><span className="about-orange-dot"/>01 / CONHEÇA O SOLUX</div><h2>Você cuida da obra.<br/><span>A gente simplifica<br/>a gestão.</span></h2><p className="about-lead">Mais de uma década simplificando a vida de quem faz a operação acontecer.</p><p className="about-description">O Solux centraliza suas operações em nuvem para você decidir com dados reais da obra. Um sistema desenvolvido para trazer mais controle à frota, clareza ao financeiro e melhores resultados para a empresa.</p>
    <div className="about-benefits"><div className="about-benefit"><span className="about-benefit-icon"><ChartNoAxesCombined size={21} strokeWidth={1.5}/></span><div><h3>O todo, sem perder os detalhes.</h3><p>Financeiro, estoque e frota integrados. Menos informação espalhada, mais segurança para decidir.</p></div></div><div className="about-benefit"><span className="about-benefit-icon"><Users size={21} strokeWidth={1.5}/></span><div><h3>Simples para quem usa todos os dias.</h3><p>Interface intuitiva e fluxos pensados para a realidade de quem está no canteiro de obras.</p></div></div></div>
    <a href="#funcionalidades" className="about-editorial-link">Veja o que o Solux faz pela sua operação <span><ArrowUpRight size={19}/></span></a>
  </Reveal>
  <Reveal className="about-bottom-line"><span>Uma visão completa.<br/><strong>Uma operação conectada.</strong></span><div><Truck size={20} strokeWidth={1.4}/><span>Frota</span></div><div><Wallet size={20} strokeWidth={1.4}/><span>Financeiro</span></div><div><Package size={20} strokeWidth={1.4}/><span>Estoque</span></div><div><Cloud size={20} strokeWidth={1.4}/><span>100% em nuvem</span></div></Reveal>
</div></section>
<section className="features section" id="funcionalidades"><Reveal className="section-heading"><div><div className="eyebrow">02 / FUNCIONALIDADES DO SISTEMA</div><h2>Frota, obras e financeiro.<br/><span>Uma gestão conectada.</span></h2></div><p>Módulos especializados para garantir que nenhum centavo ou recurso seja desperdiçado na sua operação.</p></Reveal><ModuleExplorer/><div className="secondary-modules">{[[Users,'RH & colaboradores'],[Wrench,'Plano de manutenção'],[Fuel,'Controle de abastecimento']].map(([Icon,t])=>{const I=Icon as typeof Users;return <div key={String(t)}><I size={21}/><span>{String(t)}</span><Check size={16}/></div>})}</div></section>
<ScrollSegments/>
<section className="section video-section" id="conteudos"><Reveal className="section-heading"><div><div className="eyebrow">04 / VEJA NA PRÁTICA</div><h2>Conhecer é bom.<br/><span>Ver funcionando é melhor.</span></h2></div><a className="under-link" href="https://www.youtube.com/@soluxbrasil9002" target="_blank" rel="noreferrer">Solux no YouTube <ArrowUpRight size={18}/></a></Reveal><OriginalVideos/></section>
<SiteFaq/><ContactSection/></main>
<footer className="footer footer-refined"><div className="footer-top"><div className="footer-brand"><Logo/><p>Gestão para quem<br/>faz a operação acontecer.</p></div><div className="footer-navigation"><span>EXPLORE O SOLUX</span><a href="#sistema">O sistema</a><a href="#funcionalidades">Funcionalidades</a><a href="#segmentos">Segmentos</a><a href="#conteudos">Na prática</a></div><div className="footer-location"><span>PERTO DA SUA EMPRESA</span><p>Rua 06, 46A<br/>Orlândia, São Paulo</p><a href="mailto:soluxsistema@gmail.com">soluxsistema@gmail.com</a><a href="tel:+551638260061">(16) 3826-0061</a></div><a href="#inicio" className="back-top" aria-label="Voltar ao início"><ArrowUpRight size={21}/></a></div><div className="footer-wordmark" aria-hidden="true">SOLU<span>X</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Solux Sistemas.</span><span>Controle no campo. Clareza na gestão.</span><a href="mailto:soluxsistema@gmail.com?subject=Privacidade%20e%20dados">Privacidade e dados <ArrowUpRight size={12}/></a></div></footer>{video&&<div className="modal-backdrop" onClick={()=>setVideo(false)}><div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onClick={e=>e.stopPropagation()} ref={el=>el?.focus()} tabIndex={-1} onKeyDown={e=>{if(e.key==='Escape')setVideo(false);if(e.key==='Tab'){e.preventDefault();const buttons=e.currentTarget.querySelectorAll<HTMLElement>('button,a');const idx=Array.from(buttons).indexOf(document.activeElement as HTMLElement);buttons[(idx+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus()}}}><button className="modal-close" autoFocus onClick={()=>setVideo(false)} aria-label="Fechar prévia"><X/></button><div className="eyebrow">CONHEÇA O SOLUX</div><h2 id="video-title">Sua operação em uma só visão.</h2>{import.meta.env.VITE_EXPLAINER_VIDEO_URL?<video controls autoPlay playsInline src={import.meta.env.VITE_EXPLAINER_VIDEO_URL}/>:<><Dashboard/><p>Prévia ilustrativa. O vídeo de apresentação será disponibilizado em breve.</p><a className="button liquid-action" href="#contato" onClick={()=>setVideo(false)}><GlassLayers/>Agendar uma demonstração <ArrowUpRight size={18}/></a></>}</div></div>}</>}
if(typeof document!=='undefined')createRoot(document.getElementById('root')!).render(<App/>);








