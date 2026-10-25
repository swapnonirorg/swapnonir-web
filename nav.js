/* nav.js — injects notice bar + navbar + footer; dark mode, Bangla/English toggle, mobile menu */
(function(){
  // Language: pages carry <body class="lang-bn"> by default; swap early if saved.
  // Body must always end up with exactly one lang class so only one of
  // .text-bn / .text-en is ever visible.
  (function(){
    const body = document.body;
    const en = localStorage.getItem('swapnonir-lang') === 'en';
    body.classList.toggle('lang-en', en);
    body.classList.toggle('lang-bn', !en);
    document.documentElement.lang = en ? 'en' : 'bn';
  })();

  // Dismissible top notice — stays hidden once dismissed for this notice id
  const NOTICE_ID = 'notice-board';
  const noticeDismissed = localStorage.getItem('swapnonir-notice') === NOTICE_ID;
  const NOTICE = `
<div id="site-notice" role="region" aria-label="নোটিশ / Notice" style="background:var(--coral);color:#fff">
  <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px">
    <a href="notice.html" style="font-size:14px;font-weight:600;line-height:1.5;color:#fff;text-decoration:underline;text-underline-offset:3px">
      <span class="text-bn">সাম্প্রতিক আপডেট ও নোটিশ দেখতে ক্লিক করুন।</span>
      <span class="text-en">Click to see recent updates and notices.</span>
    </a>
    <button id="notice-dismiss" aria-label="বন্ধ করুন / Close notice" style="width:28px;height:28px;border:none;background:transparent;cursor:pointer;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</div>`;

  const NAV = `<nav class="navbar" aria-label="Main navigation">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark"><img src="icon/Shonponir_logo.svg" alt="Swapnonir Logo" style="width:100%;height:100%;object-fit:contain;border-radius:var(--r-md);"></div>
      <div class="nav-logo-text">
        <span>স্বপ্ননীড়</span><span>Swapnonir</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html"><span class="text-bn">হোম</span><span class="text-en">Home</span></a></li>
      <li><a href="about.html"><span class="text-bn">সম্পর্কে</span><span class="text-en">About</span></a></li>
      <li><a href="journey.html"><span class="text-bn">যাত্রা</span><span class="text-en">Journey</span></a></li>
      <li><a href="programs.html"><span class="text-bn">কার্যক্রম</span><span class="text-en">Programs</span></a></li>
      <li><a href="impact.html"><span class="text-bn">প্রভাব</span><span class="text-en">Impact</span></a></li>
      <li><a href="stories.html"><span class="text-bn">গল্প</span><span class="text-en">Stories</span></a></li>
      <li><a href="team.html"><span class="text-bn">টিম</span><span class="text-en">Team</span></a></li>
      <li><a href="get-involved.html"><span class="text-bn">যোগ দিন</span><span class="text-en">Get Involved</span></a></li>
      <li><a href="notice.html"><span class="text-bn">নোটিশ</span><span class="text-en">Notice</span></a></li>
      <li><a href="contact.html"><span class="text-bn">যোগাযোগ</span><span class="text-en">Contact</span></a></li>
    </ul>
    <div class="nav-actions">
      <button class="lang-toggle" id="lang-toggle" aria-label="ভাষা বদলান / Switch language">বাং / EN</button>
      <button class="btn-icon" data-dark-toggle aria-label="ডার্ক মোড / Dark mode">
        <span data-dark-icon></span>
      </button>
      <a href="donate.html" class="btn btn-primary btn-sm" style="display:none" id="nav-donate"><span class="text-bn">অনুদান দিন</span><span class="text-en">Donate</span></a>
      <button class="btn-icon nav-toggle" id="nav-toggle" style="display:none" aria-expanded="false" aria-label="মেনু / Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <ul>
      <li><a href="index.html"><span class="text-bn">হোম</span><span class="text-en">Home</span></a></li>
      <li><a href="about.html"><span class="text-bn">আমাদের সম্পর্কে</span><span class="text-en">About Us</span></a></li>
      <li><a href="journey.html"><span class="text-bn">আমাদের যাত্রা</span><span class="text-en">Our Journey</span></a></li>
      <li><a href="programs.html"><span class="text-bn">কার্যক্রম</span><span class="text-en">Programs</span></a></li>
      <li><a href="impact.html"><span class="text-bn">প্রভাব</span><span class="text-en">Impact</span></a></li>
      <li><a href="stories.html"><span class="text-bn">লেখা ও গল্প</span><span class="text-en">Stories</span></a></li>
      <li><a href="team.html"><span class="text-bn">টিম</span><span class="text-en">Team</span></a></li>
      <li><a href="get-involved.html"><span class="text-bn">যোগ দিন</span><span class="text-en">Get Involved</span></a></li>
      <li><a href="why-us.html"><span class="text-bn">কেন আমরা</span><span class="text-en">Why Us</span></a></li>
      <li><a href="notice.html"><span class="text-bn">নোটিশ বোর্ড</span><span class="text-en">Notice Board</span></a></li>
      <li><a href="contact.html"><span class="text-bn">যোগাযোগ</span><span class="text-en">Contact</span></a></li>
    </ul>
    <div class="mobile-actions">
      <a href="donate.html" class="btn btn-primary btn-sm" style="flex:1;text-align:center"><span class="text-bn">অনুদান দিন</span><span class="text-en">Donate</span></a>
    </div>
  </div>
</nav>`;

  const FOOTER = `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,.18);overflow:hidden;display:flex;align-items:center;justify-content:center"><img src="icon/Shonponir_logo.svg" alt="Swapnonir Logo" style="width:100%;height:100%;object-fit:contain"></div>
          <span style="color:#fff;font-weight:700;font-size:15px">স্বপ্ননীড় | Swapnonir</span>
        </div>
        <p class="footer-tagline"><span class="text-bn">বিপরীতমুখী সমাজের বাস্তবতাকে মেনে নিয়ে নিশ্চিত ভবিষ্যৎ গড়ার প্রত্যয়ে...</span><span class="text-en">Facing the reality of an adverse society, determined to build a secure future...</span></p>
        <a href="https://www.facebook.com/swapnonirorg/" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:14px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          facebook.com/swapnonirorg
        </a>
        <div class="footer-notice"><span class="text-bn">শুধুমাত্র অনুদান পেজে উল্লিখিত নম্বরে অনুদান পাঠান। স্বপ্ননীড় কখনো ফোনে বা মেসেঞ্জারে টাকা চায় না।</span><span class="text-en">Donate only to the numbers listed on the Donate page. Swapnonir never asks for money over phone or messenger.</span></div>
      </div>
      <div>
        <h4><span class="text-bn">পেজসমূহ</span><span class="text-en">Pages</span></h4>
        <ul class="footer-links">
          <li><a href="index.html"><span class="text-bn">হোম</span><span class="text-en">Home</span></a></li>
          <li><a href="about.html"><span class="text-bn">আমাদের সম্পর্কে</span><span class="text-en">About Us</span></a></li>
          <li><a href="journey.html"><span class="text-bn">আমাদের যাত্রা</span><span class="text-en">Our Journey</span></a></li>
          <li><a href="team.html"><span class="text-bn">আমাদের টিম</span><span class="text-en">Our Team</span></a></li>
          <li><a href="programs.html"><span class="text-bn">কার্যক্রম</span><span class="text-en">Programs</span></a></li>
          <li><a href="impact.html"><span class="text-bn">প্রভাব</span><span class="text-en">Impact</span></a></li>
          <li><a href="stories.html"><span class="text-bn">লেখা ও গল্প</span><span class="text-en">Stories</span></a></li>
        </ul>
      </div>
      <div>
        <h4><span class="text-bn">অংশগ্রহণ</span><span class="text-en">Participation</span></h4>
        <ul class="footer-links">
          <li><a href="donate.html"><span class="text-bn">অনুদান দিন</span><span class="text-en">Donate</span></a></li>
          <li><a href="get-involved.html"><span class="text-bn">স্বেচ্ছাসেবী হন</span><span class="text-en">Volunteer</span></a></li>
          <li><a href="why-us.html"><span class="text-bn">কেন আমরা</span><span class="text-en">Why Us</span></a></li>
        </ul>
      </div>
      <div>
        <h4><span class="text-bn">যোগাযোগ</span><span class="text-en">Contact</span></h4>
        <ul class="footer-links">
          <li><a href="mailto:org.swapnonir@gmail.com" style="display:flex;align-items:center;gap:6px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            org.swapnonir@gmail.com
          </a></li>
          <li style="display:flex;align-items:flex-start;gap:6px;font-size:14px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:4px"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span><span class="text-bn">শ্রীপুর, দেবীদ্বার, কুমিল্লা - ৩৫১০</span><span class="text-en">Sreepur, Debidwar, Cumilla - 3510, Bangladesh</span></span>
          </li>
          <li style="margin-top:8px"><a href="contact.html" class="btn btn-ghost btn-sm"><span class="text-bn">বার্তা পাঠান</span><span class="text-en">Send a Message</span></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="fy"></span> স্বপ্ননীড় (Swapnonir). <span class="text-bn">সর্বস্বত্ব সংরক্ষিত।</span><span class="text-en">All rights reserved.</span></span>
      <div class="footer-legal">
        <a href="legal.html"><span class="text-bn">গোপনীয়তা নীতি</span><span class="text-en">Privacy</span></a>
        <a href="legal.html"><span class="text-bn">ব্যবহারের শর্ত</span><span class="text-en">Terms</span></a>
      </div>
    </div>
  </div>
</footer>`;

  const SUN=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const MOON=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  // Apply saved theme immediately
  if(localStorage.getItem('swapnonir-theme')==='dark') document.documentElement.classList.add('dark');

  document.addEventListener('DOMContentLoaded',()=>{
    // Inject — notice bar (if not dismissed) sits directly above the navbar
    document.body.insertAdjacentHTML('afterbegin', NAV);
    if(!noticeDismissed) document.body.insertAdjacentHTML('afterbegin', NOTICE);
    document.body.insertAdjacentHTML('beforeend', FOOTER);
    document.getElementById('fy').textContent = new Date().getFullYear();
    document.getElementById('nav-donate').style.display='inline-flex';

    // Notice dismissal (persisted per notice id)
    document.getElementById('notice-dismiss')?.addEventListener('click',()=>{
      localStorage.setItem('swapnonir-notice', NOTICE_ID);
      document.getElementById('site-notice')?.remove();
    });

    // Active link
    const page = location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a=>{
      if(a.getAttribute('href')===page) a.classList.add('active');
    });

    // Language toggle
    document.getElementById('lang-toggle')?.addEventListener('click',()=>{
      const en = !document.body.classList.contains('lang-en');
      document.body.classList.toggle('lang-en', en);
      document.body.classList.toggle('lang-bn', !en);
      document.documentElement.lang = en ? 'en' : 'bn';
      localStorage.setItem('swapnonir-lang', en ? 'en' : 'bn');
    });

    // Dark mode icons
    function syncIcons(){
      const dark = document.documentElement.classList.contains('dark');
      document.querySelectorAll('[data-dark-icon]').forEach(el=>{ el.innerHTML=dark?SUN:MOON; });
    }
    syncIcons();
    document.querySelectorAll('[data-dark-toggle]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('swapnonir-theme', document.documentElement.classList.contains('dark')?'dark':'light');
        syncIcons();
      });
    });

    // Mobile menu
    const tog=document.getElementById('nav-toggle');
    const mob=document.getElementById('mobile-menu');
    tog?.addEventListener('click',()=>{
      const open=mob.classList.toggle('open');
      tog.setAttribute('aria-expanded',open);
    });
  });
})();
