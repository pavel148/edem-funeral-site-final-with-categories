function getParam(n){const u=new URL(window.location.href);return u.searchParams.get(n);}
async function loadCategory(){
  const cat = getParam('cat');
  const res = await fetch('assets/data/images.json'); const data = await res.json();
  const grid = document.querySelector('.gallery-grid');
  const title = document.querySelector('[data-cat-title]');
  title.textContent = cat || 'Категория';
  grid.innerHTML='';
  (data.images||[]).filter(x=>!cat || x.category===cat).forEach(img=>{
    const a=document.createElement('a'); a.href=`image-detail.html?id=${encodeURIComponent(img.id)}`; a.className='tile';
    a.innerHTML=`<img src="images/${img.file}" alt="${img.title}"><div class="t"><h3>${img.title}</h3><span class="badge">${img.category}</span></div>`;
    grid.appendChild(a);
  });
}
document.addEventListener('DOMContentLoaded', loadCategory);
