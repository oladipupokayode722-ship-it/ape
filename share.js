/* Share card shown after a successful whitelist entry. Edit the lines below. */
const SHARE={apes:[9,12,16,19,23,24,25,27,45],
 note:"Share your Ape on X to lock in your guaranteed spot.",
 captions:[
 "I just registered for an Ape spot on Ink \uD83E\uDD8D\n\nTomorrow might be late for you.\n\nFirst Ape Collection on Ink @ApeonInk",
 "Whitelist spot secured for Ink Genesis Apes \uD83E\uDD8D\n\nFirst Ape Collection on Ink. Don't sleep on this one.\n\n@ApeonInk",
 "Early on the first Ape collection on Ink \uD83E\uDD8D\n\n2,222 hand-drawn Apes. My whitelist spot is in. Is yours?\n\n@ApeonInk",
 "gm Ink \uD83E\uDD8D Just joined the Ink Genesis Apes whitelist.\n\nFirst Ape Collection on Ink. Join before it's too late.\n\n@ApeonInk"]};
(()=>{const f=document.querySelector('form');if(!f)return;const host=f.parentElement;let done=false,cur=0,url='';
const mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform));
const st=document.createElement('style');st.textContent='.shr{margin-top:22px;text-align:center;border-top:3px solid #000;padding-top:22px}.shr img{width:220px;max-width:60%;border:3px solid #000;border-radius:20px;box-shadow:6px 6px 0 var(--pink)}.shr h3{font-size:26px;margin:18px 0 4px}.shr p{color:var(--lilac);margin-bottom:14px}.shr .cap{background:#2a1560;border:3px solid #000;border-radius:14px;padding:12px 14px;font-size:15px;text-align:left;white-space:pre-line;margin-bottom:16px}.shr .btn{margin:4px}';document.head.appendChild(st);
function show(){done=true;const b=document.createElement('div');b.className='shr';
b.innerHTML='<img alt="Your Ape"><h3>Share your Ape</h3><p>'+SHARE.note+'</p><div class="cap"></div><a class="btn pink" target="_blank" rel="noopener">Share on X</a><button type="button" class="btn sm">Show another Ape</button>';
host.appendChild(b);const img=b.querySelector('img'),a=b.querySelector('a');
const set=()=>{let n;do n=SHARE.apes[Math.random()*SHARE.apes.length|0];while(n===cur&&SHARE.apes.length>1);cur=n;
const cap=SHARE.captions[Math.random()*SHARE.captions.length|0];img.src='/ape-'+n+'.jpg';b.querySelector('.cap').textContent=cap;
url='https://x.com/intent/post?text='+encodeURIComponent(cap)+'&url='+encodeURIComponent(location.origin+'/share-'+n);a.href=url};
a.onclick=e=>{if(!mobile){e.preventDefault();if(!window.open(url,'xshare','width=620,height=560'))window.open(url,'_blank')}};
b.querySelector('button').onclick=set;set()}
const gone=()=>!f.isConnected||f.hidden||getComputedStyle(f).display==='none';
new MutationObserver(()=>{if(!done&&gone())show()}).observe(document.body,{childList:true,subtree:true,attributes:true})})();
