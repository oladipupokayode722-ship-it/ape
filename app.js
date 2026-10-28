/* ===== EDIT THESE ===== */
const CFG={
  mintDate:null,                       // e.g. "2026-12-01T18:00:00Z" when announced
  xHandle:"ApeonInk",
  firstPostUrl:"https://x.com/ApeonInk", // replace with the first post link
  telegramUrl:"",                       // add when the group is live
  formEndpoint:"https://gxkkhgzslqdjmbpkieaj.supabase.co/functions/v1/whitelist" // Supabase function that checks and saves entries
};
const PAGES=[["Home","/"],["Sneak Peek","/sneak-peek"],["The Ape Den","/ape-den"],["Roadmap","/roadmap"],["FAQ","/faq"],["Whitelist","/whitelist"]];
const here='/'+location.pathname.split('/').pop().replace(/\.html$/,'').replace(/^index$/,'');
document.querySelector('header').innerHTML=`<div class="wrap"><a class="brand" href="/"><img src="logo.png" alt="">Ink Genesis Apes</a>
<nav id="nav">${PAGES.map(([n,h])=>`<a href="${h}"${h===here?' aria-current="page"':''}>${n}</a>`).join('')}</nav>
<a class="btn sm pink" href="/whitelist">Join the Whitelist</a><button class="menu" aria-label="Menu" onclick="nav.classList.toggle('open')">&#9776;</button></div>`;
document.querySelector('footer').innerHTML=`<div class="wrap"><div><b>Ink Genesis Apes</b><br><span style="opacity:.7">First Ape Collection on Ink</span></div>
<div><a href="https://x.com/${CFG.xHandle}" target="_blank" rel="noopener">X</a>${CFG.telegramUrl?`<a href="${CFG.telegramUrl}" target="_blank" rel="noopener">Telegram</a>`:'<span class="soon">Telegram soon</span>'}</div></div>`;

/* countdown */
const cd=document.getElementById('countdown');
if(cd){
  if(!CFG.mintDate)cd.innerHTML='<span class="pill">Mint date announced soon on X</span>';
  else{const t=()=>{let s=Math.max(0,(new Date(CFG.mintDate)-Date.now())/1e3|0);
    const v=[['Days',s/86400|0],['Hours',s/3600%24|0],['Mins',s/60%60|0],['Secs',s%60]];
    cd.innerHTML='<div class="tiles">'+v.map(([l,n])=>`<div>${String(n).padStart(2,'0')}<small>${l}</small></div>`).join('')+'</div>'};t();setInterval(t,1e3)}
}

/* whitelist */
const form=document.getElementById('wlform');
if(form){
  const pid=(CFG.firstPostUrl.match(/status\/(\d+)/)||[])[1];
  const tasks=[["Follow @"+CFG.xHandle,"https://x.com/intent/follow?screen_name="+CFG.xHandle],["Like the first post",pid?"https://x.com/intent/like?tweet_id="+pid:CFG.firstPostUrl],["Repost the first post",pid?"https://x.com/intent/retweet?tweet_id="+pid:CFG.firstPostUrl]];
  const done=new Set();
  document.getElementById('tasks').innerHTML=tasks.map(([l,h],i)=>`<a class="task" href="${h}" target="_blank" rel="noopener" data-i="${i}"><i class="tick"></i><span>${l}</span><b>Open</b></a>`).join('');
  document.querySelectorAll('.task').forEach(a=>a.addEventListener('click',()=>{done.add(a.dataset.i);a.classList.add('done')}));
  const IMG={9:'Ape with sunglasses and lollipop',12:'Ape with 3D glasses and pizza',16:'Ape in a camo helmet with cash in its mouth',19:'Ape in a flat cap with cash in its mouth',23:'Ape with red cap, sunglasses and pizza',24:'Ape with bubblegum',25:'Ape showing teeth',27:'Ape in a red cap, sunglasses and floral shirt',45:'Ape with red beanie and bubblegum',61:'Ape with X eyes and a pipe',62:'Ape in a captain hat with a pipe'};
  const QS=[['pizza in its mouth',[12,23]],['bubblegum',[24,45]],['black sunglasses',[9,23,27]],['a lollipop',[9,27]],['bared teeth',[25]],['a red beanie',[45]],['3D glasses',[12]],['a red baseball cap',[23,27]],['cash in its mouth',[16,19]],['a camo helmet',[16]],['a captain hat',[62]],['a pipe',[61,62]],['X eyes',[61]],['a floral shirt',[27]]];
  let q,sel=new Set(),last=-1;const grid=document.getElementById('grid'),err=document.getElementById('cerr');
  function newQ(){let i;do i=Math.random()*QS.length|0;while(i===last);last=i;q=QS[i];sel.clear();
    document.getElementById('q').textContent='Select the Ape with '+q[0];
    const c=q[1][Math.random()*q[1].length|0];const ids=[c,...Object.keys(IMG).map(Number).filter(n=>!q[1].includes(n)).sort(()=>Math.random()-.5).slice(0,2)].sort(()=>Math.random()-.5);
    grid.innerHTML=ids.map(n=>`<button type="button" aria-pressed="false" data-n="${n}"><img src="ape-${n}.webp" alt="${IMG[n]}"></button>`).join('');}
  grid.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const n=+b.dataset.n;
    sel.clear();sel.add(n);grid.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
  document.getElementById('refresh').onclick=newQ;newQ();
  form.addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(form),m=[];
    const h=(f.get('x')||'').trim().replace(/^@/,''),w=(f.get('wallet')||'').trim(),rp=(f.get('repost')||'').trim();
    if(done.size<3)m.push('Complete all three X tasks first.');
    if(!/^[A-Za-z0-9_]{1,15}$/.test(h))m.push('Enter your X username (letters, numbers or underscores, up to 15 characters).');
    if(!/^0x[a-fA-F0-9]{40}$/.test(w))m.push('Enter a valid wallet address (0x followed by 40 characters).');
    const rm=rp.match(/^https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/status\/\d+/i);
    if(!rm)m.push('Paste the link to your repost.');
    else if(h&&rm[1].toLowerCase()!==h.toLowerCase())m.push('The repost link must come from your own X account.');
    const ok=sel.size===1&&q[1].includes([...sel][0]);
    if(!ok){m.push('Wrong Ape selected. Try the new challenge.');grid.classList.add('shake');setTimeout(()=>grid.classList.remove('shake'),400);newQ()}
    err.textContent=m.join(' ');if(m.length)return;
    const btn=form.querySelector('button.pink');btn.disabled=true;
    try{const r=await fetch(CFG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({x_handle:h,wallet:w,repost_link:rp,website:f.get('website')||''})});
      if(!r.ok){const j=await r.json().catch(()=>({}));throw j.error||0}
      document.getElementById('formbox').innerHTML='<div class="ok"><img src="ape-23.webp" alt=""><h2>You\'re on the list</h2><p style="color:var(--lilac);margin-top:8px">Watch @'+CFG.xHandle+' on X for the mint date.</p></div>'}
    catch(x){err.textContent=typeof x==='string'?x:'Could not send your entry. Please try again.';btn.disabled=false}});
}

/* lightbox */
const lb=document.getElementById('lb');
if(lb)document.querySelectorAll('.gal button').forEach(b=>b.onclick=()=>{lb.querySelector('img').src=b.dataset.src;lb.querySelector('img').alt=b.dataset.alt;lb.showModal()});
if(lb)lb.onclick=()=>lb.close();
