/* Share card shown after a successful whitelist entry. Edit the lines below. */
const SHARE={apes:[9,12,16,19,23,24,25,27,45],
 note:"Share your Ape on X to lock in your guaranteed spot.",
 captions:[
 "I just registered for an Ape spot on Ink \uD83E\uDD8D\n\nTomorrow might be late for you.\n\nFirst Ape Collection on Ink @ApeonInk",
 "Whitelist spot secured for Ink Genesis Apes \uD83E\uDD8D\n\nFirst Ape Collection on Ink. Don't sleep on this one.\n\n@ApeonInk",
 "Early on the first Ape collection on Ink \uD83E\uDD8D\n\n2,222 hand-drawn Apes. My whitelist spot is in. Is yours?\n\n@ApeonInk",
 "gm Ink \uD83E\uDD8D Just joined the Ink Genesis Apes whitelist.\n\nFirst Ape Collection on Ink. Join before it's too late.\n\n@ApeonInk"]};
(()=>{const f=document.querySelector('form');if(!f)return;const host=f.parentElement;let done=false,cur=0,file=null,cap='';
const st=document.createElement('style');st.textContent='.shr{margin-top:22px;text-align:center;border-top:3px solid #000;padding-top:22px}.shr img{width:220px;max-width:60%;border:3px solid #000;border-radius:20px;box-shadow:6px 6px 0 var(--pink)}.shr h3{font-size:26px;margin:18px 0 4px}.shr p{color:var(--lilac);margin-bottom:14px}.shr .cap{background:#2a1560;border:3px solid #000;border-radius:14px;padding:12px 14px;font-size:15px;text-align:left;white-space:pre-line;margin-bottom:16px}.shr .btn{margin:4px}';document.head.appendChild(st);
function show(){done=true;const b=document.createElement('div');b.className='shr';
b.innerHTML='<img alt="Your Ape"><h3>Share your Ape</h3><p>'+SHARE.note+'</p><div class="cap"></div><a class="btn pink" target="_blank" rel="noopener">Share on X</a><a class="btn sm" download="ink-ape.jpg">Save Ape image</a><button type="button" class="btn sm" id="cp">Copy caption</button><button type="button" class="btn sm" id="nx">Show another Ape</button>';
host.appendChild(b);const img=b.querySelector('img'),a=b.querySelector('a.pink'),dl=b.querySelector('a.sm'),cp=b.querySelector('#cp');
const set=()=>{let n;do n=SHARE.apes[Math.random()*SHARE.apes.length|0];while(n===cur&&SHARE.apes.length>1);cur=n;
cap=SHARE.captions[Math.random()*SHARE.captions.length|0];file=null;img.src='/ape-'+n+'.jpg';dl.href='/ape-'+n+'.jpg';b.querySelector('.cap').textContent=cap;
a.href='https://x.com/intent/tweet?text='+encodeURIComponent(cap)+'&url='+encodeURIComponent(location.origin+'/share-'+n);
fetch('/ape-'+n+'.jpg').then(r=>r.blob()).then(bl=>{file=new File([bl],'ink-ape.jpg',{type:'image/jpeg'})}).catch(()=>{})};
a.onclick=e=>{if(file&&navigator.canShare&&navigator.canShare({files:[file]})){e.preventDefault();navigator.share({files:[file],text:cap}).catch(()=>{})}};
cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(cap).then(()=>{cp.textContent='Copied'})};
b.querySelector('#nx').onclick=()=>{cp.textContent='Copy caption';set()};set()}
const gone=()=>!f.isConnected||f.hidden||getComputedStyle(f).display==='none';
new MutationObserver(()=>{if(!done&&gone())show()}).observe(document.body,{childList:true,subtree:true,attributes:true})})();
