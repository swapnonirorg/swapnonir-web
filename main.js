/* ============================================================
   SWAPNONIR — main.js
   ============================================================ */

/* ── CONFIG ── */
const CFG = {
  bkash:      '01515610661',    // bKash (বাহার / Bahar)
  nagad:      '01515610661',    // Nagad
  wa:         '8801515610661',  // WhatsApp with country code
  api_donate: '/api/donate',   // local endpoints, handled by server.js
  api_vol:    '/api/volunteer',
  api_con:    '/api/contact',
};

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded',()=>{
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} });
  },{threshold:.12});
  els.forEach(el=>io.observe(el));
});

/* ── ANIMATED COUNTERS (Impact Stats spec) ── */
document.addEventListener('DOMContentLoaded',()=>{
  const counters = document.querySelectorAll('[data-count]');
  if(!counters.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target, target=+el.dataset.count, dur=1800;
      const t0=performance.now();
      const tick=now=>{
        const p=Math.min((now-t0)/dur,1);
        const ease=1-Math.pow(1-p,3);
        el.textContent=Math.floor(ease*target).toLocaleString();
        if(p<1) requestAnimationFrame(tick); else el.textContent=target.toLocaleString();
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  },{threshold:.3});
  counters.forEach(el=>io.observe(el));
});

/* ── PROGRESS BARS (animate on scroll) ── */
document.addEventListener('DOMContentLoaded',()=>{
  const bars = document.querySelectorAll('[data-progress]');
  if(!bars.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.progress+'%';
      io.unobserve(e.target);
    });
  },{threshold:.3});
  bars.forEach(b=>{ b.style.width='0'; io.observe(b); });
});

/* ── PIE CHART (pure SVG, no library) ── */
window.drawPie = function(id, slices){
  const el=document.getElementById(id); if(!el) return;
  const W=200,H=200,cx=W/2,cy=H/2,r=86,ri=44;
  let a=-Math.PI/2;
  const paths=slices.map(s=>{
    const sweep=(s.pct/100)*2*Math.PI;
    const x1=cx+r*Math.cos(a),y1=cy+r*Math.sin(a);
    const x2=cx+r*Math.cos(a+sweep),y2=cy+r*Math.sin(a+sweep);
    const large=sweep>Math.PI?1:0;
    const d=`M${cx},${cy}L${x1},${y1}A${r},${r} 0 ${large} 1 ${x2},${y2}Z`;
    a+=sweep;
    return `<path d="${d}" fill="${s.color}" stroke="var(--bg)" stroke-width="2.5"/>`;
  }).join('');
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="আর্থিক বিতরণ চার্ট">
    ${paths}
    <circle cx="${cx}" cy="${cy}" r="${ri}" fill="var(--bg)"/>
    <text x="${cx}" y="${cy-5}" text-anchor="middle" font-size="11" fill="var(--forest)" font-weight="600" font-family="Newsreader,serif">১,০০০</text>
    <text x="${cx}" y="${cy+9}" text-anchor="middle" font-size="9" fill="var(--muted)" font-family="Public Sans,sans-serif">টাকা</text>
  </svg>`;
};

/* ── EVENT SLIDERS (programs page) ── */
window.initSliders=function(){
  document.querySelectorAll('.ev-slider').forEach(sl=>{
    const slides=sl.querySelector('.slides');
    const n=slides.children.length; if(n<1) return;
    let i=0;
    const go=k=>{
      i=(k+n)%n;
      slides.style.transform=`translateX(-${i*100}%)`;
      sl.querySelectorAll('.s-dot').forEach((d,di)=>d.classList.toggle('active',di===i));
    };
    sl.querySelector('.s-prev').addEventListener('click',()=>go(i-1));
    sl.querySelector('.s-next').addEventListener('click',()=>go(i+1));
    const dots=sl.querySelector('.s-dots');
    if(dots){
      for(let d=0;d<n;d++){
        const b=document.createElement('button');
        b.className='s-dot'+(d===0?' active':'');
        b.setAttribute('aria-label','ছবি '+(d+1)+' / Image '+(d+1));
        b.addEventListener('click',()=>go(d));
        dots.appendChild(b);
      }
    }
  });
};

/* ── DONATE REVEAL + COPY ── */
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('reveal-btn');
  const box=document.getElementById('numbers-box');
  if(!btn||!box) return;

  // Inject real numbers
  ['bkash-num','nagad-num'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el) el.textContent = i===0?CFG.bkash:CFG.nagad;
  });

  btn.addEventListener('click',()=>{
    box.hidden=false; btn.closest('#reveal-prompt').style.display='none';
    box.querySelectorAll('.reveal').forEach(el=>setTimeout(()=>el.classList.add('visible'),50));
  });

  document.querySelectorAll('[data-copy]').forEach(b=>{
    b.addEventListener('click',async()=>{
      const num=b.dataset.copy==='bkash'?CFG.bkash:CFG.nagad;
      try{ await navigator.clipboard.writeText(num); }catch{}
      const orig=b.innerHTML;
      b.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> কপি হয়েছে!';
      setTimeout(()=>b.innerHTML=orig,2000);
    });
  });
});

/* ── FORM HELPER ── */
function showFieldError(form, name, msg){
  const f=form.querySelector(`[name="${name}"]`); if(!f) return;
  f.classList.add('error');
  const e=f.parentElement.querySelector('.form-error');
  if(e) e.textContent=msg;
}

async function sendForm(formId, endpoint, successId, errorId){
  const form=document.getElementById(formId); if(!form) return;
  let ok=true;
  form.querySelectorAll('[required]').forEach(f=>{
    f.classList.remove('error');
    const err=f.parentElement.querySelector('.form-error');
    if(err) err.textContent='';
    if(!f.value.trim()){
      ok=false; f.classList.add('error');
      if(err) err.textContent=f.dataset.errRequired||'এই তথ্যটি প্রয়োজন।';
    }
  });
  // BD phone
  const ph=form.querySelector('[data-phone]');
  if(ph&&ph.value&&!/^01[3-9]\d{8}$/.test(ph.value.trim())){
    ok=false; ph.classList.add('error');
    const e=ph.parentElement.querySelector('.form-error');
    if(e) e.textContent='সঠিক বাংলাদেশি নম্বর দিন (01X-XXXXXXXX)';
  }
  // TxID
  const tx=form.querySelector('[data-txid]');
  if(tx&&tx.value){
    const ch=form.querySelector('[name="channel"]');
    const pat=ch&&ch.value==='nagad'?/^\d{8,12}$/:/^[A-Z0-9]{8,15}$/i;
    if(!pat.test(tx.value.trim())){
      ok=false; tx.classList.add('error');
      const e=tx.parentElement.querySelector('.form-error');
      if(e) e.textContent='সঠিক TxID দিন।';
    }
  }
  if(!ok) return;
  if(form.querySelector('[name="_gotcha"]')?.value) return; // honeypot

  const sub=form.querySelector('[type="submit"]');
  const orig=sub.textContent; sub.disabled=true; sub.textContent='পাঠানো হচ্ছে...';
  try{
    const res=await fetch(endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data=await res.json().catch(()=>null);
    if(res.ok){
      form.closest('[data-form-wrap]').querySelector('#'+successId).hidden=false;
      form.style.display='none';
    } else if(res.status===400&&data&&data.errors){
      // server-side validation — mirror errors onto the inline field messages
      Object.entries(data.errors).forEach(([name,msg])=>showFieldError(form,name,msg));
      sub.disabled=false; sub.textContent=orig;
    } else throw new Error();
  } catch{
    const errEl=document.getElementById(errorId);
    if(errEl) errEl.hidden=false;
    sub.disabled=false; sub.textContent=orig;
  }
}

window.initDonateForm=()=>{
  document.getElementById('donate-form')?.addEventListener('submit',e=>{
    e.preventDefault(); sendForm('donate-form',CFG.api_donate,'don-ok','don-err');
  });
  const wa=document.getElementById('wa-btn');
  if(wa) wa.href=`https://wa.me/${CFG.wa}?text=${encodeURIComponent('স্বপ্ননীড়ে অনুদান দিয়েছি।')}`;
};
window.initVolForm=()=>{
  document.getElementById('vol-form')?.addEventListener('submit',e=>{
    e.preventDefault(); sendForm('vol-form',CFG.api_vol,'vol-ok','vol-err');
  });
};
window.initConForm=()=>{
  document.getElementById('con-form')?.addEventListener('submit',e=>{
    e.preventDefault(); sendForm('con-form',CFG.api_con,'con-ok','con-err');
  });
  const wa=document.getElementById('wa-con');
  if(wa) wa.href=`https://wa.me/${CFG.wa}`;
};

/* ── MEMBER FILTER + SEARCH ──
   (retired — the members directory merged into team.html) */
