async function pickByCategory(cat, titleHint){
  try{
    const r = await fetch('assets/data/images.json'); const data = await r.json(); const arr = data.images||[];
    if(cat){ const f = arr.find(x => x.category===cat); if(f) return `images/${f.file}`; }
    if(titleHint){ const f = arr.find(x => (x.title||'').toLowerCase().includes(titleHint.toLowerCase())); if(f) return `images/${f.file}`; }
  }catch(e){ console.warn(e); }
  return null;
}
async function applyPreviews(){
  const map = [
    {sel:'[data-rep="hero-agent"]', cat:'Срочно', title:'агент', fb:'images/agent.jpg'},
    {sel:'[data-rep="hero-coffin"]', cat:'Гробы', fb:'images/coffin.jpg'},
    {sel:'[data-rep="tile-coffins"]', cat:'Гробы', fb:'images/coffin.jpg'},
    {sel:'[data-rep="tile-wreaths"]', cat:'Венки', fb:'images/wreaths.jpg'},
    {sel:'[data-rep="tile-monuments"]', cat:'Памятники', fb:'images/monuments.jpg'},
    {sel:'[data-rep="tile-agent"]', cat:'Срочно', title:'агент', fb:'images/agent.jpg'},
    {sel:'[data-rep="tile-transport"]', cat:'Логистика', fb:'images/transport.jpg'},
    {sel:'[data-rep="tile-cleanup"]', title:'уборка', fb:'images/cleanup.jpg'},
    // services
    {sel:'[data-rep="svc-coffins"]', cat:'Гробы', fb:'images/coffin.jpg'},
    {sel:'[data-rep="svc-wreaths"]', cat:'Венки', fb:'images/wreaths.jpg'},
    {sel:'[data-rep="svc-monuments"]', cat:'Памятники', fb:'images/monuments.jpg'},
    {sel:'[data-rep="svc-transport"]', cat:'Логистика', fb:'images/transport.jpg'},
    {sel:'[data-rep="svc-cremation"]', title:'урна', fb:'images/cremation.jpg'},
    {sel:'[data-rep="svc-cleanup"]', title:'уборка', fb:'images/cleanup.jpg'},
    {sel:'[data-rep="svc-crosses"]', cat:'Атрибутика', fb:'images/crosses.jpg'},
    {sel:'[data-rep="svc-farewell"]', title:'зал', fb:'images/farewell.jpg'},
    {sel:'[data-rep="svc-paperwork"]', title:'документ', fb:'images/paperwork.jpg'},
  ];
  for(const m of map){
    const el = document.querySelector(m.sel);
    if(el){
      const src = await pickByCategory(m.cat, m.title) || m.fb;
      el.src = src;
    }
  }
}
document.addEventListener('DOMContentLoaded', applyPreviews);
