import express from 'express';
import {mkdir,appendFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=express();app.disable('x-powered-by');app.use(express.json({limit:'12kb'}));
const attempts=new Map();
setInterval(()=>{const now=Date.now();for(const [ip,v] of attempts)if(now-v.time>600000)attempts.delete(ip)},600000).unref();
app.post('/api/contact',async(req,res)=>{const ip=req.ip;const now=Date.now();const v=attempts.get(ip);if(v&&now-v.time<600000&&v.count>=5)return res.status(429).json({error:'Tente novamente mais tarde.'});attempts.set(ip,{time:v?.time&&now-v.time<600000?v.time:now,count:v&&now-v.time<600000?v.count+1:1});const {name,email,phone,company}=req.body??{};if(req.body.consent!=="yes"||![name,email,phone,company].every(x=>typeof x==='string'&&x.trim().length>1&&x.length<=200)||!/^\S+@\S+\.\S+$/.test(email)||phone.replace(/\D/g,'').length<8)return res.status(400).json({error:'Confira os dados informados.'});try{await mkdir(path.join(root,'data'),{recursive:true});await appendFile(path.join(root,'data','contacts.jsonl'),JSON.stringify({name:name.trim(),email:email.trim(),phone:phone.trim(),company:company.trim(),consent:true,createdAt:new Date().toISOString()})+'\n',{mode:0o600});return res.status(201).json({ok:true})}catch{return res.status(500).json({error:'Não foi possível registrar a solicitação.'})}});
app.use(express.static(path.join(root,'dist')));app.get('/{*path}',(_req,res)=>res.sendFile(path.join(root,'dist','index.html')));app.use((err,req,res,next)=>res.status(400).json({error:'Requisição inválida.'}));
app.listen(Number(process.env.PORT)||3001,'127.0.0.1',()=>console.log('Solux disponível em http://127.0.0.1:3001'));

