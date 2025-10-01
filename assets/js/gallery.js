async function loadGallery(){
  const res = await fetch('assets/data/images.json');
  const data = await res.json();
  const grid = document.querySelector('.gallery-grid');
  const chips = document.querySelector('.filter-chips');

  const cats = [...new Set((data.images||[]).map(x=>x.category))].filter(Boolean).sort();
  // Chips
  const allChip = document.createElement('button'); allChip.className='chip active'; allChip.textContent='Все'; allChip.dataset.cat='';
  chips.appendChild(allChip);
  cats.forEach(c=>{ const b=document.createElement('button'); b.className='chip'; b.textContent=c; b.dataset.cat=c; chips.appendChild(b); });

  function render(cat){
    grid.innerHTML='';
    (data.images||[]).filter(x=>!cat || x.category===cat).forEach(img=>{
      const a=document.createElement('a'); a.href=`image-detail.html?id=${encodeURIComponent(img.id)}`; a.className='tile';
      a.innerHTML=`<img src="images/${img.file}" alt="${img.title}"><div class="t"><h3>${img.title}</h3><span class="badge">${img.category}</span></div>`;
      grid.appendChild(a);
    });
  }
  chips.addEventListener('click', e=>{
    const b = e.target.closest('.chip'); if(!b) return;
    for(const el of chips.children) el.classList.remove('active'); b.classList.add('active'); render(b.dataset.cat);
  });

  render('');
}
document.addEventListener('DOMContentLoaded', loadGallery);
