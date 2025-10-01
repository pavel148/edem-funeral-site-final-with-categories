function getParam(n){const u=new URL(window.location.href);return u.searchParams.get(n);}
async function loadDetail(){
  const id=getParam('id'); const res=await fetch('assets/data/images.json'); const data=await res.json(); const c=document.querySelector('.image-detail');
  const f=(data.images||[]).find(x=>x.id===id);
  if(!f){c.innerHTML='<div class="card">Изображение не найдено. <a href="gallery.html">Назад</a>.</div>';return;}
  c.innerHTML=`<div class="card"><img src="images/${f.file}" alt="${f.title}" style="width:100%;border-radius:14px"/><h1 style="margin:14px 0 6px">${f.title}</h1><div class="breadcrumbs"><a href="gallery.html">Галерея</a> / ${f.category}</div><p>${f.description}</p></div>`;
}
document.addEventListener('DOMContentLoaded', loadDetail);
