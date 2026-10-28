/* Share card shown after a successful whitelist entry. Edit the lines below. */
const SHARE={apes:[9,12,16,19,23,24,25,27,45],
 note:"Share your Ape on X to lock in your guaranteed spot.",
 captions:[
 "I just registered for an Ape spot on Ink \uD83E\uDD8D\n\nTomorrow might be late for you.\n\nFirst Ape Collection on Ink @ApeonInk",
 "Whitelist spot secured for Ink Genesis Apes \uD83E\uDD8D\n\nFirst Ape Collection on Ink. Don't sleep on this one.\n\n@ApeonInk",
 "Early on the first Ape collection on Ink \uD83E\uDD8D\n\n2,222 hand-drawn Apes. My whitelist spot is in. Is yours?\n\n@ApeonInk",
 "gm Ink \uD83E\uDD8D Just joined the Ink Genesis Apes whitelist.\n\nFirst Ape Collection on Ink. Join before it's too late.\n\n@ApeonInk"]};
(()=>{const f=document.querySelector('form');if(!f)return;const host=f.parentElement;let done=false,n=0,file=null,cap='';
const mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform));
const st=document.createElement('style');st.textContent='.shr{margin-top:22px;text-align:center;border-top:3px solid #000;padding-top:22px}.shr img{width:220px;max-width:60%;border:3px solid #000;border-radius:20px;box-shadow:6px 6px 0 var(--pink)}.shr h3{font-size:26px;margin:18px 0 4px}.shr p{color:var(--lilac);margin-bottom:14px}.shr .cap{background:#2a1560;border:3px solid #000;border-radius:14px;padding:12px 14px;font-size:15px;text-align:left;white-space:pre-line;margin-bottom:16px;color:#fff}.shr .btn{margin:4px}.shr .nt{font-size:14px;margin:10px 0 0;min-height:20px}';document.head.appendChild(st);
function show(){done=true;const b=document.createElement('div');b.className='shr';
b.innerHTML='<img alt="Your Ape"><h3>Share your Ape</h3><p>'+SHARE.note+'</p><div class="cap"></div><button type="button" class="btn pink go">Share on X</button><button type="button" class="btn sm cp">Copy caption</button><button type="button" class="btn sm nx">Show another Ape</button><p class="nt"></p>';
host.appendChild(b);const img=b.querySelector('img'),nt=b.querySelector('.nt'),cp=b.querySelector('.cp');
const set=()=>{let k;do k=SHARE.apes[Math.random()*SHARE.apes.length|0];while(k===n&&SHARE.apes.length>1);n=k;
cap=SHARE.captions[Math.random()*SHARE.captions.length|0];file=null;nt.textContent='';cp.textContent='Copy caption';img.src='/ape-'+n+'.jpg';b.querySelector('.cap').textContent=cap;
fetch('/ape-'+n+'.jpg').then(r=>r.blob()).then(bl=>{file=new File([bl],'ink-ape.jpg',{type:'image/jpeg'})}).catch(()=>{})};
b.querySelector('.go').onclick=async()=>{
 if(file&&navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],text:cap})}catch(e){}return}
 const d=document.createElement('a');d.href='/ape-'+n+'.jpg';d.download='ink-ape-'+n+'.jpg';document.body.appendChild(d);d.click();d.remove();
 nt.textContent='Your Ape is saving to your Downloads. Attach it to your post when X opens.';
 const u='https://x.com/intent/post?text='+encodeURIComponent(cap);
 if(!window.open(u,'xshare',mobile?undefined:'width=620,height=560'))window.open(u,'_blank')};
cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(cap).then(()=>{cp.textContent='Copied'})};
b.querySelector('.nx').onclick=set;set()}
const gone=()=>!f.isConnected||f.hidden||getComputedStyle(f).display==='none';
new MutationObserver(()=>{if(!done&&gone())show()}).observe(document.body,{childList:true,subtree:true,attributes:true})})();
