(function() {
  // ═══════════════════════════════════════
  // CLIENT CONFIG — change this per client
  // ═══════════════════════════════════════
  var CFG = {
    name:       "DINTELMA",
    tagline:    "AI-Powered Marketing Agency",
    letter:     "D",
    hours:      "24/7",
    ownerEmail: "hello.dintelma@gmail.com",
    webhookUrl: "https://hook.us2.make.com/fs96yhj1wkz24c7bzvwa9nsq7rh09fd7",
    slotsUrl:   "https://script.google.com/macros/s/AKfycbz19jE2NstVPhQ8aJfB2fr2SeXl_0deEDK1Tbo6Oqealcm-6Zu_vIMNmIjBGxmrcrxf/exec",
    color:      "#2563eb",
    colorDark:  "#1d4ed8",
    bg:         "#0f172a",
    faqs: {
      "service":    "We offer: AI Agent Setup, Lead Generation, Social Media Management, SEO, Paid Ads & Marketing Automation. Which interests you most?",
      "pric":       "Pricing depends on your business size and goals — no one-size-fits-all. Book a Free Strategy Call and we'll give you an exact plan with transparent pricing.",
      "cost":       "Pricing depends on your business size and goals — no one-size-fits-all. Book a Free Strategy Call and we'll give you an exact plan with transparent pricing.",
      "how much":   "Pricing depends on your business size and goals — no one-size-fits-all. Book a Free Strategy Call and we'll give you an exact plan with transparent pricing.",
      "start":      "Simple — book a Free Strategy Call. We review your business, find the gaps, and show you exactly what we'd do. No commitment needed.",
      "result":     "Most clients see measurable results within 30–60 days. Our AI systems move fast once set up.",
      "location":   "We work globally — specialising in US, UK, Canada & Europe. Based in Morocco (GMT+1).",
      "small":      "Absolutely — we work with businesses of all sizes. Every plan is custom-built for your situation.",
      "hour":       "We are available 24/7. Book a call any time and we confirm within 1 hour.",
      "open":       "We are available 24/7. Book a call any time and we confirm within 1 hour.",
      "what is":    "A free 30-minute call where we analyse your marketing and present a custom growth plan. Zero pressure, pure value.",
      "hi":         "Hello! 👋 Great to have you here. How can I help you today?",
      "hello":      "Hello! 👋 Great to have you here. How can I help you today?",
      "hey":        "Hello! 👋 Great to have you here. How can I help you today?",
      "thank":      "You're very welcome! 😊 Anything else I can help with?"
    }
  };

  // ═══════════════════════════════════════
  // BOOKED SLOTS
  // ═══════════════════════════════════════
  var BOOKED = new Set();
  var ALL_SLOTS = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"];
  var formUID = 0;

  function slotKey(d,t){ return d+'||'+t; }
  function isTaken(d,t){ return BOOKED.has(slotKey(d,t)); }
  function lockSlot(d,t){ BOOKED.add(slotKey(d,t)); }

  function loadSlots(){
    fetch(CFG.slotsUrl)
      .then(function(r){ return r.json(); })
      .then(function(data){
        BOOKED.clear();
        data.forEach(function(row){
          if(row.date && row.time) lockSlot(row.date, row.time);
        });
      })
      .catch(function(){});
  }

  function getAvailable(date){
    return date ? ALL_SLOTS.filter(function(t){ return !isTaken(date,t); }) : ALL_SLOTS;
  }

  // ═══════════════════════════════════════
  // INJECT STYLES
  // ═══════════════════════════════════════
  var style = document.createElement('style');
  style.textContent = `
    #_w-toggle {
      position:fixed; bottom:24px; right:24px;
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,${CFG.color},${CFG.colorDark});
      border:none; cursor:pointer; z-index:2147483647;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 8px 32px rgba(37,99,235,0.5);
      transition:transform .3s cubic-bezier(.34,1.56,.64,1);
      font-family:sans-serif;
    }
    #_w-toggle:hover { transform:scale(1.1); }
    #_w-toggle svg { position:absolute; transition:transform .3s,opacity .3s; }
    #_w-toggle .ic-close { opacity:0; transform:rotate(-90deg); }
    #_w-toggle.open .ic-chat { opacity:0; transform:rotate(90deg); }
    #_w-toggle.open .ic-close { opacity:1; transform:rotate(0deg); }
    #_w-dot {
      position:fixed; bottom:70px; right:24px;
      width:10px; height:10px; background:#ef4444;
      border-radius:50%; z-index:2147483647;
      border:2px solid #fff;
      animation:_wdotpop .4s cubic-bezier(.34,1.56,.64,1) forwards;
    }
    @keyframes _wdotpop { from{transform:scale(0)} to{transform:scale(1)} }
    #_w-win {
      position:fixed; bottom:92px; right:24px;
      width:360px; max-width:calc(100vw - 32px);
      height:580px; max-height:calc(100vh - 120px);
      background:#111; border-radius:16px;
      box-shadow:0 24px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.07);
      display:flex; flex-direction:column; z-index:2147483646;
      overflow:hidden; font-family:'Inter',sans-serif;
      transform:scale(0.85) translateY(20px); opacity:0; pointer-events:none;
      transform-origin:bottom right;
      transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .3s;
    }
    #_w-win.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all; }
    #_w-hdr {
      background:linear-gradient(135deg,#0f172a,#1e3a8a);
      padding:16px 18px 12px; border-bottom:1px solid rgba(37,99,235,0.25); flex-shrink:0;
    }
    #_w-hdr-top { display:flex; align-items:center; gap:10px; margin-bottom:4px; }
    #_w-av {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,${CFG.color},${CFG.colorDark});
      display:flex; align-items:center; justify-content:center;
      font-weight:700; font-size:15px; color:#fff; flex-shrink:0;
    }
    #_w-hdr-name { font-size:16px; font-weight:700; color:#fff; letter-spacing:-0.3px; }
    #_w-hdr-status {
      font-size:11px; color:rgba(255,255,255,0.5);
      display:flex; align-items:center; gap:4px; margin-top:1px;
    }
    #_w-hdr-status::before {
      content:''; width:6px; height:6px; background:#22c55e;
      border-radius:50%; display:inline-block; animation:_wblink 2s infinite;
    }
    @keyframes _wblink { 0%,100%{opacity:1} 50%{opacity:.4} }
    #_w-hdr-tag { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#93c5fd; opacity:.8; }
    #_w-msgs { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:8px; scroll-behavior:smooth; }
    #_w-msgs::-webkit-scrollbar { width:3px; }
    #_w-msgs::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
    ._wm { display:flex; gap:7px; animation:_wmin .3s cubic-bezier(.34,1.56,.64,1) forwards; opacity:0; transform:translateY(8px); }
    @keyframes _wmin { to{opacity:1;transform:translateY(0);} }
    ._wm.u { flex-direction:row-reverse; }
    ._wav {
      width:26px; height:26px; border-radius:50%;
      background:linear-gradient(135deg,${CFG.color},${CFG.colorDark});
      display:flex; align-items:center; justify-content:center;
      font-size:10px; font-weight:700; color:#fff; flex-shrink:0; margin-top:2px;
    }
    ._wm.u ._wav { background:#222; color:#fff; font-size:12px; }
    ._wb {
      max-width:82%; padding:9px 13px; border-radius:13px;
      font-size:13px; line-height:1.55; color:#f0f0f0; caret-color:#ffffff;
    }
    ._wm.b ._wb { background:#1a1a1a; border:1px solid rgba(255,255,255,0.08); border-bottom-left-radius:3px; }
    ._wm.u ._wb { background:${CFG.color}; color:#fff; border-bottom-right-radius:3px; font-weight:500; }
    ._wb strong { color:#93c5fd; font-weight:600; }
    ._wm.u ._wb strong { color:#fff; }
    ._wts { font-size:10px; color:rgba(255,255,255,0.3); margin-top:2px; padding:0 3px; }
    ._wm.u ._wts { text-align:right; }
    #_w-typ { display:none; align-items:center; gap:7px; padding:0 14px 7px; }
    #_w-typ.on { display:flex; }
    ._wdots { background:#1a1a1a; border:1px solid rgba(255,255,255,0.08); border-radius:13px; padding:9px 13px; display:flex; gap:4px; }
    ._wdots span { width:5px; height:5px; background:${CFG.color}; border-radius:50%; animation:_wtd 1.2s infinite; opacity:.4; }
    ._wdots span:nth-child(2){animation-delay:.2s} ._wdots span:nth-child(3){animation-delay:.4s}
    @keyframes _wtd { 0%,80%,100%{opacity:.4;transform:scale(1)} 40%{opacity:1;transform:scale(1.3)} }
    #_w-qk { padding:6px 12px 3px; display:flex; flex-wrap:wrap; gap:6px; flex-shrink:0; }
    ._wq {
      background:transparent; border:1px solid rgba(37,99,235,0.3); color:${CFG.color};
      font-family:inherit; font-size:11.5px; padding:6px 12px;
      border-radius:20px; cursor:pointer; transition:all .2s; white-space:nowrap;
    }
    ._wq:hover { background:rgba(37,99,235,0.12); border-color:${CFG.color}; }
    #_w-inp-area {
      padding:10px 14px 14px; border-top:1px solid rgba(255,255,255,0.07);
      display:flex; gap:8px; align-items:flex-end; flex-shrink:0; background:#111;
    }
    #_w-inp {
      flex:1; background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:11px;
      padding:9px 13px; color:#f0f0f0; font-family:inherit; font-size:13px;
      outline:none; resize:none; min-height:40px; max-height:90px;
      transition:border-color .2s; line-height:1.5;
    }
    #_w-inp::placeholder { color:rgba(255,255,255,0.3); }
    #_w-inp:focus { border-color:rgba(37,99,235,0.5); }
    #_w-snd {
      width:40px; height:40px; border-radius:11px;
      background:linear-gradient(135deg,${CFG.color},${CFG.colorDark});
      border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition:transform .2s;
    }
    #_w-snd:hover { transform:scale(1.05); }
    ._wff { width:100%; display:flex; flex-direction:column; gap:8px; margin-top:8px; }
    ._wfl { font-size:10px; letter-spacing:1px; text-transform:uppercase; color:${CFG.color}; opacity:.8; margin-bottom:-4px; }
    ._wfi {
      background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:9px;
      padding:9px 12px; color:#f0f0f0; font-family:inherit; font-size:13px;
      outline:none; width:100%; transition:border-color .2s;
    }
    ._wfi:focus { border-color:rgba(37,99,235,0.5); }
    ._wfi.err { border-color:#ef4444; animation:_wshake .3s; }
    @keyframes _wshake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
    ._wfi:disabled { opacity:.5; }
    ._wfi option { background:#1a1a1a; }
    ._www {
      display:none; background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.3);
      border-radius:7px; padding:8px 11px; font-size:12px; color:#fca5a5;
    }
    ._www.on { display:block; }
    ._wfb {
      background:linear-gradient(135deg,${CFG.color},${CFG.colorDark}); color:#fff;
      border:none; border-radius:9px; padding:10px; font-family:inherit;
      font-size:13px; font-weight:600; cursor:pointer; width:100%; margin-top:2px;
      transition:transform .2s; box-shadow:0 4px 12px rgba(37,99,235,.3);
    }
    ._wfb:hover:not(:disabled) { transform:translateY(-1px); }
    ._wfb:disabled { opacity:.4; cursor:not-allowed; transform:none; }
    #_w-ftr { text-align:center; padding:4px 0 8px; font-size:10px; color:rgba(255,255,255,0.15); flex-shrink:0; font-family:inherit; }
    #_w-ftr span { color:rgba(37,99,235,0.5); }
  `;
  document.head.appendChild(style);

  // ═══════════════════════════════════════
  // BUILD HTML
  // ═══════════════════════════════════════
  var dot = document.createElement('div');
  dot.id = '_w-dot';
  document.body.appendChild(dot);

  var btn = document.createElement('button');
  btn.id = '_w-toggle';
  btn.setAttribute('aria-label','Chat');
  btn.innerHTML = `
    <svg class="ic-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <svg class="ic-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  `;
  document.body.appendChild(btn);

  var win = document.createElement('div');
  win.id = '_w-win';
  win.innerHTML = `
    <div id="_w-hdr">
      <div id="_w-hdr-top">
        <div id="_w-av">${CFG.letter}</div>
        <div>
          <div id="_w-hdr-name">${CFG.name}</div>
          <div id="_w-hdr-status">Online — Available ${CFG.hours}</div>
        </div>
      </div>
      <div id="_w-hdr-tag">${CFG.tagline}</div>
    </div>
    <div id="_w-msgs"></div>
    <div id="_w-typ"><div class="_wdots"><span></span><span></span><span></span></div></div>
    <div id="_w-qk"></div>
    <div id="_w-inp-area">
      <textarea id="_w-inp" placeholder="Type your message..." rows="1"></textarea>
      <button id="_w-snd">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
    <div id="_w-ftr">Powered by <span>${CFG.name}</span></div>
  `;
  document.body.appendChild(win);

  // ═══════════════════════════════════════
  // WIDGET LOGIC
  // ═══════════════════════════════════════
  var isOpen = false;
  var state  = 'idle';
  var msgs   = document.getElementById('_w-msgs');
  var typ    = document.getElementById('_w-typ');
  var qk     = document.getElementById('_w-qk');
  var inp    = document.getElementById('_w-inp');

  function now(){ return new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}); }

  function addMsg(html, type){
    var m  = document.createElement('div');
    m.className = '_wm '+(type==='bot'?'b':'u');
    var av = document.createElement('div');
    av.className = '_wav';
    av.textContent = type==='bot' ? CFG.letter : '👤';
    var wrap = document.createElement('div');
    wrap.style.maxWidth = '82%';
    var bub = document.createElement('div');
    bub.className = '_wb';
    bub.innerHTML = html;
    var ts = document.createElement('div');
    ts.className = '_wts'; ts.textContent = now();
    wrap.appendChild(bub); wrap.appendChild(ts);
    m.appendChild(av); m.appendChild(wrap);
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function setQuick(opts){
    qk.innerHTML='';
    opts.forEach(function(o){
      var b=document.createElement('button');
      b.className='_wq'; b.textContent=o;
      b.onclick=function(){ userMsg(o); qk.innerHTML=''; };
      qk.appendChild(b);
    });
  }

  function bot(html, quick){
    quick = quick || [];
    typ.classList.add('on');
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(function(){
      typ.classList.remove('on');
      addMsg(html,'bot');
      if(quick.length) setQuick(quick);
      msgs.scrollTop = msgs.scrollHeight;
    }, 800+Math.random()*400);
  }

  function userMsg(text){
    addMsg(text,'user');
    qk.innerHTML='';
    process(text);
  }

  function process(text){
    if(state==='booking') return;
    var t = text.toLowerCase();
    var matched = false;
    Object.keys(CFG.faqs).forEach(function(key){
      if(!matched && t.indexOf(key) !== -1){
        matched = true;
        if(key==='hi'||key==='hello'||key==='hey'){
          bot(CFG.faqs[key], ["💼 Our Services","💰 Pricing","📞 Book a Call"]);
        } else if(key==='thank'){
          bot(CFG.faqs[key], ["📞 Book a Call","💼 Services"]);
        } else if(key.indexOf('pric')!==-1||key==='cost'||key==='how much'){
          bot(CFG.faqs[key], ["📞 Book a Free Call"]);
        } else {
          bot(CFG.faqs[key], ["📞 Book a Call","💼 Our Services"]);
        }
      }
    });
    if(!matched){
      if(t.indexOf('book')!==-1||t.indexOf('call')!==-1||t.indexOf('appointment')!==-1||t.indexOf('schedule')!==-1){
        startBooking();
      } else {
        bot('For a personalised answer, I recommend booking a <strong>Free Strategy Call</strong> — our team will answer you in under 30 minutes. 🚀', ["📞 Book a Call","💼 Services","💰 Pricing"]);
      }
    }
  }

  function startBooking(){
    state='booking';
    formUID++;
    var uid=formUID;
    bot("Let's schedule your <strong>Free Strategy Call</strong> 🎯<br>Fill in your details below:",[]);
    setTimeout(function(){
      var m=document.createElement('div');
      m.className='_wm b';
      var av=document.createElement('div');
      av.className='_wav'; av.textContent=CFG.letter;
      var wrap=document.createElement('div');
      wrap.style.width='92%';
      var bub=document.createElement('div');
      bub.className='_wb';
      var tomorrow=new Date();
      tomorrow.setDate(tomorrow.getDate()+1);
      var minDate=tomorrow.toISOString().split('T')[0];
      bub.innerHTML=`<div class="_wff">
        <label class="_wfl">Full Name</label>
        <input class="_wfi" id="_wf${uid}-name" type="text" placeholder="e.g. John Smith" autocomplete="off">
        <label class="_wfl">Email Address</label>
        <input class="_wfi" id="_wf${uid}-email" type="email" placeholder="e.g. john@company.com" autocomplete="off">
        <label class="_wfl">Your Business Type</label>
        <input class="_wfi" id="_wf${uid}-biz" type="text" placeholder="e.g. Restaurant, Clinic..." autocomplete="off">
        <label class="_wfl">Preferred Date</label>
        <input class="_wfi" id="_wf${uid}-date" type="date" min="${minDate}">
        <label class="_wfl">Preferred Time</label>
        <select class="_wfi" id="_wf${uid}-time"><option value="">— Pick a date first —</option></select>
        <div class="_www" id="_wf${uid}-warn">⚠️ This slot is already booked. Please choose a different time.</div>
        <button class="_wfb" id="_wf${uid}-submit" onclick="window._wSubmit(${uid})" disabled>Confirm My Strategy Call ✅</button>
      </div>`;
      wrap.appendChild(bub); m.appendChild(av); m.appendChild(wrap);
      msgs.appendChild(m);
      msgs.scrollTop=msgs.scrollHeight;

      document.getElementById('_wf'+uid+'-date').addEventListener('change',function(){
        var date=this.value;
        var sel=document.getElementById('_wf'+uid+'-time');
        loadSlots();
        setTimeout(function(){
          var available=getAvailable(date);
          sel.innerHTML='';
          if(available.length===0){
            sel.innerHTML='<option value="">⚠️ No slots — pick another date</option>';
            document.getElementById('_wf'+uid+'-submit').disabled=true;
          } else {
            sel.innerHTML='<option value="">— Select a time —</option>';
            available.forEach(function(t){
              var o=document.createElement('option');
              o.value=t; o.textContent=t; sel.appendChild(o);
            });
          }
          document.getElementById('_wf'+uid+'-warn').classList.remove('on');
          document.getElementById('_wf'+uid+'-submit').disabled=true;
        },500);
      });

      document.getElementById('_wf'+uid+'-time').addEventListener('change',function(){
        var date=document.getElementById('_wf'+uid+'-date').value;
        var time=this.value;
        var warn=document.getElementById('_wf'+uid+'-warn');
        var sbmt=document.getElementById('_wf'+uid+'-submit');
        if(!date||!time){sbmt.disabled=true;warn.classList.remove('on');return;}
        if(isTaken(date,time)){warn.classList.add('on');sbmt.disabled=true;}
        else{warn.classList.remove('on');sbmt.disabled=false;}
      });
    },1200);
  }

  window._wSubmit=function(uid){
    var g=function(f){return (document.getElementById('_wf'+uid+'-'+f)||{}).value||'';};
    var name=g('name').trim(), email=g('email').trim(), biz=g('biz').trim(), date=g('date').trim(), time=g('time').trim();
    var ok=true;
    ['name','email','biz','date','time'].forEach(function(f){
      if(!g(f).trim()){
        var el=document.getElementById('_wf'+uid+'-'+f);
        if(el){el.classList.add('err');setTimeout(function(){el.classList.remove('err');},2000);}
        ok=false;
      }
    });
    if(!ok){bot("⚠️ Please fill in all fields before confirming.");return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      var em=document.getElementById('_wf'+uid+'-email');
      if(em) em.classList.add('err');
      bot("⚠️ Please enter a valid email address.");return;
    }
    if(isTaken(date,time)){
      var w=document.getElementById('_wf'+uid+'-warn');
      if(w) w.classList.add('on');
      var sb=document.getElementById('_wf'+uid+'-submit');
      if(sb) sb.disabled=true;
      bot("⚠️ That slot was just taken! Please choose a different time.");return;
    }
    lockSlot(date,time);
    state='idle';
    var sb2=document.getElementById('_wf'+uid+'-submit');
    if(sb2){sb2.disabled=true;sb2.textContent='✅ Booked!';}
    document.querySelectorAll('#_wf'+uid+'-name,#_wf'+uid+'-email,#_wf'+uid+'-biz,#_wf'+uid+'-date,#_wf'+uid+'-time').forEach(function(f){f.disabled=true;});
    addMsg(name+' · '+email+' · '+biz+' · '+date+' at '+time,'user');
    setTimeout(function(){
      bot('🎉 <strong>Booking Confirmed!</strong><br><br>📋 <strong>Summary:</strong><br>• Name: <strong>'+name+'</strong><br>• Email: <strong>'+email+'</strong><br>• Business: <strong>'+biz+'</strong><br>• Date: <strong>'+date+'</strong><br>• Time: <strong>'+time+'</strong><br><br>✅ Confirmation sent to <strong>'+email+'</strong><br>📩 Our team will reach out within 1 hour.',["📞 Book Another Call","💼 Our Services"]);
      fetch(CFG.webhookUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ownerEmail:CFG.ownerEmail,name:name,email:email,biz:biz,date:date,time:time})}).catch(function(){});
    },600);
  };

  btn.onclick=function(){
    isOpen=!isOpen;
    btn.classList.toggle('open',isOpen);
    win.classList.toggle('open',isOpen);
    var d=document.getElementById('_w-dot');
    if(d) d.remove();
    if(isOpen && msgs.children.length===0){
      loadSlots();
      setTimeout(function(){
        bot('👋 Welcome to <strong>'+CFG.name+'</strong>!<br><br>How can I help you today?',["💼 Our Services","💰 Pricing","🚀 Get Started","📞 Book a Call","⏰ Our Hours"]);
      },400);
    }
  };

  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();var v=inp.value.trim();if(!v)return;inp.value='';inp.style.height='auto';userMsg(v);}
  });
  inp.addEventListener('input',function(){this.style.height='auto';this.style.height=this.scrollHeight+'px';});
  document.getElementById('_w-snd').onclick=function(){var v=inp.value.trim();if(!v)return;inp.value='';inp.style.height='auto';userMsg(v);};

  setTimeout(function(){
    if(!isOpen){var d=document.getElementById('_w-dot');if(d)d.style.display='block';}
  },3000);

  loadSlots();
})();
