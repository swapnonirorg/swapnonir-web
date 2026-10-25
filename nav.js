/* nav.js — injects navbar + footer, handles dark mode, mobile menu */
(function(){
  const NAV = `<nav class="navbar" aria-label="Main navigation">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark">স্ব</div>
      <div class="nav-logo-text">
        <span>স্বপ্ননীড়</span><span>Swapnonir</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">হোম</a></li>
      <li><a href="about.html">সম্পর্কে</a></li>
      <li><a href="programs.html">কার্যক্রম</a></li>
      <li><a href="impact.html">প্রভাব</a></li>
      <li><a href="stories.html">গল্প</a></li>
      <li><a href="team.html">দল</a></li>
      <li><a href="members.html">সদস্য</a></li>
      <li><a href="get-involved.html">যোগ দিন</a></li>
      <li><a href="contact.html">যোগাযোগ</a></li>
    </ul>
    <div class="nav-actions">
      <button class="btn-icon" data-dark-toggle aria-label="ডার্ক মোড">
        <span data-dark-icon></span>
      </button>
      <a href="donate.html" class="btn btn-primary btn-sm" style="display:none" id="nav-donate">অনুদান দিন</a>
      <button class="btn-icon nav-toggle" id="nav-toggle" style="display:none" aria-expanded="false" aria-label="মেনু">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <ul>
      <li><a href="index.html">হোম</a></li>
      <li><a href="about.html">আমাদের সম্পর্কে</a></li>
      <li><a href="programs.html">কার্যক্রম</a></li>
      <li><a href="impact.html">প্রভাব</a></li>
      <li><a href="stories.html">সাফল্যের গল্প</a></li>
      <li><a href="team.html">দল</a></li>
      <li><a href="members.html">সদস্যরা</a></li>
      <li><a href="advisors.html">উপদেষ্টা পরিষদ</a></li>
      <li><a href="doctor-bari.html">ডাক্তার বাড়ি</a></li>
      <li><a href="get-involved.html">যোগ দিন</a></li>
      <li><a href="why-us.html">কেন আমরা</a></li>
      <li><a href="contact.html">যোগাযোগ</a></li>
    </ul>
    <div class="mobile-actions">
      <a href="donate.html" class="btn btn-primary btn-sm" style="flex:1;text-align:center">অনুদান দিন</a>
    </div>
  </div>
</nav>`;

  const FOOTER = `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-family:var(--bangla);font-weight:700;color:#fff;font-size:13px">স্ব</div>
          <span style="color:#fff;font-weight:700;font-size:15px">স্বপ্ননীড় | Swapnonir</span>
        </div>
        <p class="footer-tagline">শ্রীপুরের পাশে, প্রতিদিন।</p>
        <a href="https://facebook.com/swapnonirorg" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:14px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          facebook.com/swapnonirorg
        </a>
        <div class="footer-notice">শুধুমাত্র অনুদান পেজে উল্লিখিত নম্বরে অনুদান পাঠান। স্বপ্ননীড় কখনো ফোনে বা মেসেঞ্জারে টাকা চায় না।</div>
      </div>
      <div>
        <h4>পেজসমূহ</h4>
        <ul class="footer-links">
          <li><a href="index.html">হোম</a></li>
          <li><a href="about.html">আমাদের সম্পর্কে</a></li>
          <li><a href="programs.html">কার্যক্রম</a></li>
          <li><a href="impact.html">প্রভাব</a></li>
          <li><a href="stories.html">সাফল্যের গল্প</a></li>
          <li><a href="team.html">আমাদের দল</a></li>
        </ul>
      </div>
      <div>
        <h4>অংশগ্রহণ</h4>
        <ul class="footer-links">
          <li><a href="donate.html">অনুদান দিন</a></li>
          <li><a href="get-involved.html">স্বেচ্ছাসেবী হন</a></li>
          <li><a href="members.html">সদস্যরা</a></li>
          <li><a href="advisors.html">উপদেষ্টা পরিষদ</a></li>
          <li><a href="doctor-bari.html">ডাক্তার বাড়ি</a></li>
          <li><a href="why-us.html">কেন আমরা</a></li>
        </ul>
      </div>
      <div>
        <h4>যোগাযোগ</h4>
        <ul class="footer-links">
          <li><a href="mailto:org.swapnonir@gmail.com" style="display:flex;align-items:center;gap:6px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            org.swapnonir@gmail.com
          </a></li>
          <li style="display:flex;align-items:center;gap:6px;font-size:14px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            শ্রীপুর, গাজীপুর, বাংলাদেশ
          </li>
          <li style="margin-top:8px"><a href="contact.html" class="btn btn-ghost btn-sm">বার্তা পাঠান</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="fy"></span> স্বপ্ননীড় (Swapnonir). সর্বস্বত্ব সংরক্ষিত।</span>
      <div class="footer-legal">
        <a href="legal.html">গোপনীয়তা নীতি</a>
        <a href="legal.html">ব্যবহারের শর্ত</a>
      </div>
    </div>
  </div>
</footer>`;

  const SUN=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const MOON=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  // Apply saved theme immediately
  if(localStorage.getItem('swapnonir-theme')==='dark') document.documentElement.classList.add('dark');

  document.addEventListener('DOMContentLoaded',()=>{
    // Inject
    document.body.insertAdjacentHTML('afterbegin', NAV);
    document.body.insertAdjacentHTML('beforeend', FOOTER);
    document.getElementById('fy').textContent = new Date().getFullYear();
    document.getElementById('nav-donate').style.display='inline-flex';

    // Active link
    const page = location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a=>{
      if(a.getAttribute('href')===page) a.classList.add('active');
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
