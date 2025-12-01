(function(){
  // typing message
  const msg = "Loving Bhaiya — always with you";
  const out = document.getElementById('typed');
  let i=0;
  function type(){
    if(!out) return;
    out.textContent = msg.slice(0, ++i);
    if(i < msg.length) setTimeout(type, 55);
  }
  setTimeout(type, 250);

  // heart spawner
  const heartsRoot = document.getElementById('hearts');
  const btn = document.getElementById('heart-btn');

  function createHeart(x,y){
    if(!heartsRoot) return;
    const el = document.createElement('div');
    el.className = 'heart';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    // inner core to form heart
    const core = document.createElement('div');
    core.className = 'core';
    el.appendChild(core);
    heartsRoot.appendChild(el);
    // trigger animation in next frame
    requestAnimationFrame(()=> el.classList.add('float'));
    // cleanup
    setTimeout(()=> el.remove(), 1400);
  }

  // click heart
  btn && btn.addEventListener('click', (e)=>{
    const rect = document.body.getBoundingClientRect();
    createHeart(e.clientX, e.clientY);
  });

  // gentle hearts on mouse move, throttled
  let last = 0;
  window.addEventListener('mousemove', (e)=>{
    const now = Date.now();
    if(now - last < 120) return;
    last = now;
    // small random offset to spread hearts
    createHeart(e.clientX + (Math.random()-0.5)*30, e.clientY + (Math.random()-0.5)*30);
  });

  // accessible quick spawn on load
  window.addEventListener('load', ()=> {
    const cx = innerWidth/2, cy = innerHeight/2;
    for(let k=0;k<6;k++){
      setTimeout(()=> createHeart(cx + (k-3)*20, cy + (Math.random()-0.5)*40), k*90);
    }
  });
})();
