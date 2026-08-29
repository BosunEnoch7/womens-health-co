// ============================================
// WOMEN'S HEALTH CO. — LANDING PAGE LOGIC
// ============================================

// ---- CONFIG: EDIT THESE BEFORE DEPLOYING ----
const CURRENT_PRICE = 4999;
const FUTURE_PRICE = 14999;
// Replace the line below with the real launch-price deadline before deploying.
// Format: "YYYY-MM-DDTHH:MM:SS+01:00"  (+01:00 = West Africa Time / Nigeria)
// Example: "2026-09-15T23:59:59+01:00"
const PRICE_INCREASE_DATE = 2026-09-15T23:59:59+01:00;

const SELAR_LINK = "https://selar.com/8arv3007y1";

function formatNaira(n){
  return "₦" + n.toLocaleString("en-NG");
}
function formatUSD(n){
  return "$" + n;
}

// ---- COUNTDOWN ----
function initCountdown(){
  const deadline = new Date(PRICE_INCREASE_DATE);
  const isValidDeadline = PRICE_INCREASE_DATE !== "REPLACE_WITH_REAL_DATE" && !isNaN(deadline.getTime());

  const topbarTimer = document.getElementById('topbar-timer');
  const stickyTimer = document.getElementById('sticky-timer');
  const stickyPrice = document.getElementById('sticky-price');
  const priceNodes = [document.getElementById('price-now'), document.getElementById('price-now-2')];
  const priceWasNodes = [document.getElementById('price-was'), document.getElementById('price-was-2')];
  const priceUsdNodes = [document.getElementById('price-usd'), document.getElementById('price-usd-2')];
  const priceUsdWasNodes = [document.getElementById('price-usd-was'), document.getElementById('price-usd-was-2')];
  const captionNodes = [document.getElementById('price-caption'), document.getElementById('price-caption-2')];
  const savingsNote = document.getElementById('savings-note');
  const countdownBlocks = [document.getElementById('countdown-1'), document.getElementById('countdown-2')];
  const ctaButtons = [
    document.getElementById('cta-hero'),
    document.getElementById('cta-offer'),
    document.getElementById('cta-sticky')
  ];

  function setExpiredState(){
    priceNodes.forEach(n => { if(n) n.textContent = formatNaira(FUTURE_PRICE); });
    priceWasNodes.forEach(n => { if(n) n.style.display = 'none'; });
    priceUsdNodes.forEach(n => { if(n) n.textContent = formatUSD(FUTURE_PRICE_USD); });
    priceUsdWasNodes.forEach(n => { if(n) n.style.display = 'none'; });
    captionNodes.forEach(n => { if(n) n.textContent = 'Launch price has ended'; });
    if (savingsNote) savingsNote.style.display = 'none';
    countdownBlocks.forEach(cb => { if (cb) cb.style.display = 'none'; });
    if (topbarTimer) topbarTimer.textContent = 'now ' + formatNaira(FUTURE_PRICE);
    if (stickyTimer) stickyTimer.textContent = '';
    if (stickyPrice) stickyPrice.textContent = formatNaira(FUTURE_PRICE);
    ctaButtons.forEach(btn => {
      if (!btn) return;
      btn.textContent = btn.id === 'cta-offer'
        ? `Get the guide — ${formatNaira(FUTURE_PRICE)}`
        : `Get the guide — ${formatNaira(FUTURE_PRICE)}`;
    });
  }

  function setNoDeadlineState(){
    // No real deadline configured yet — show launch price without a ticking countdown.
    priceNodes.forEach(n => { if(n) n.textContent = formatNaira(CURRENT_PRICE); });
    priceWasNodes.forEach(n => { if(n) n.textContent = formatNaira(FUTURE_PRICE); });
    priceUsdNodes.forEach(n => { if(n) n.textContent = formatUSD(CURRENT_PRICE_USD); });
    priceUsdWasNodes.forEach(n => { if(n) n.textContent = formatUSD(FUTURE_PRICE_USD); });
    captionNodes.forEach(n => { if(n) n.textContent = 'Launch price'; });
    if (topbarTimer) topbarTimer.textContent = 'limited-time launch price';
    countdownBlocks.forEach(cb => { if (cb) cb.style.display = 'none'; });
    if (stickyTimer) stickyTimer.textContent = '';
  }

  function tick(){
    const now = new Date().getTime();
    const distance = deadline.getTime() - now;

    if (distance <= 0){
      setExpiredState();
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((distance % (1000*60*60)) / (1000*60));
    const secs = Math.floor((distance % (1000*60)) / 1000);

    const pad = v => String(v).padStart(2,'0');

    ['1','2'].forEach(suffix => {
      const d = document.getElementById('cd-days-' + suffix);
      const h = document.getElementById('cd-hours-' + suffix);
      const m = document.getElementById('cd-mins-' + suffix);
      const s = document.getElementById('cd-secs-' + suffix);
      if (d) d.textContent = pad(days);
      if (h) h.textContent = pad(hours);
      if (m) m.textContent = pad(mins);
      if (s) s.textContent = pad(secs);
    });

    const shortLabel = days > 0 ? `${days}d ${pad(hours)}h left` : `${pad(hours)}h ${pad(mins)}m left`;
    if (topbarTimer) topbarTimer.textContent = `ends in ${shortLabel}`;
    if (stickyTimer) stickyTimer.textContent = shortLabel;
  }

  let timerInterval;

  if (!isValidDeadline){
    setNoDeadlineState();
    return;
  }

  // Already past deadline on load
  if (deadline.getTime() - new Date().getTime() <= 0){
    setExpiredState();
    return;
  }

  priceNodes.forEach(n => { if(n) n.textContent = formatNaira(CURRENT_PRICE); });
  priceWasNodes.forEach(n => { if(n) n.textContent = formatNaira(FUTURE_PRICE); });
  priceUsdNodes.forEach(n => { if(n) n.textContent = formatUSD(CURRENT_PRICE_USD); });
  priceUsdWasNodes.forEach(n => { if(n) n.textContent = formatUSD(FUTURE_PRICE_USD); });
  tick();
  timerInterval = setInterval(tick, 1000);
}

// ---- REMEDY DATA (matches ebook evidence levels exactly) ----
const REMEDIES = [
  { name: "Heat Therapy", level: "strong", desc: "A heating pad or hot water bottle on the lower abdomen — one of the fastest, most supported comfort approaches." },
  { name: "Ginger", level: "some", desc: "Traditionally used and studied as tea and concentrated preparations for easing cramp intensity." },
  { name: "Gentle Walking", level: "some", desc: "Light aerobic movement to support circulation and natural pain relief." },
  { name: "Yoga & Relaxation", level: "some", desc: "Gentle stretching and relaxation-based exercise to ease tension in the lower back and pelvis." },
  { name: "TENS", level: "some", desc: "A small device delivering mild electrical currents to help manage pain signals." },
  { name: "SP6 Acupressure", level: "some", desc: "Firm pressure at a specific point, used traditionally and studied for menstrual discomfort." },
  { name: "Omega-3s", level: "some", desc: "Fatty fish or fish oil, studied for their anti-inflammatory potential." },
  { name: "Magnesium", level: "limited", desc: "A muscle-relaxing mineral from food or supplements — evidence is still developing." },
  { name: "Vitamin D", level: "limited", desc: "Most relevant for those with a deficiency — not a universal recommendation." },
  { name: "Aromatherapy Massage", level: "some", desc: "Gentle abdominal massage with a properly diluted essential oil." },
  { name: "Warm Baths", level: "limited", desc: "The comfort of warm water and rest, applying the same principle as heat therapy." },
  { name: "Chamomile Tea", level: "limited", desc: "A traditional calming tea with mild relaxant properties." },
  { name: "Peppermint Tea", level: "limited", desc: "Traditionally used to ease digestive discomfort alongside cramping." },
  { name: "Mindful Eating", level: "limited", desc: "Moderating sugar, caffeine, and sodium as a general comfort measure." },
  { name: "Sleep & Stress Care", level: "limited", desc: "Consistent rest and simple breathing practices to support overall comfort." },
];

const LEVEL_LABEL = { strong: "Stronger evidence", some: "Some evidence", limited: "Limited / emerging" };

function renderRemedies(){
  const grid = document.getElementById('remedy-grid');
  if (!grid) return;
  grid.innerHTML = REMEDIES.map(r => `
    <div class="remedy-card">
      <span class="evidence-pill pill--${r.level}"><i class="dot dot--${r.level}"></i>${LEVEL_LABEL[r.level]}</span>
      <h3>${r.name}</h3>
      <p>${r.desc}</p>
    </div>
  `).join('');
}

// ---- 5-DAY CYCLE WHEEL ----
const PLAN_DAYS = [
  { n: 1, title: "Reset", desc: "Get ahead of inflammation before pain fully sets in — tea, light stretching, an early start." },
  { n: 2, title: "Relax", desc: "Heat and gentle movement work together to ease building tension." },
  { n: 3, title: "Support", desc: "Layered relief for the toughest day — heat, rest, and calming routines combined." },
  { n: 4, title: "Restore", desc: "Recovery-focused — replenishing, light movement, and gentle care." },
  { n: 5, title: "Build Your Routine", desc: "Reflect on what helped and carry one habit forward into next month." },
];

function renderPlan(){
  const wheel = document.getElementById('cycle-wheel');
  if (!wheel) return;
  wheel.innerHTML = PLAN_DAYS.map(d => `
    <div class="cycle-node">
      <div class="cycle-node__num">${d.n}</div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
    </div>
  `).join('');
}

// ---- FAQ ----
const FAQS = [
  { q: "What exactly do I get?", a: "A downloadable PDF guide — 48 pages covering 15 natural remedies, a structured 5-day comfort plan, nutrition and movement guidance, and printable bonus tools like a symptom tracker and grocery list." },
  { q: "Is this a physical book?", a: "No — it's a digital PDF you download instantly after purchase. There's nothing shipped to you." },
  { q: "How do I receive the ebook?", a: "Right after checkout on Selar, you'll get a download link. It's also accessible from your Selar account any time." },
  { q: "How much does it cost?", a: `The current launch price is ${formatNaira(CURRENT_PRICE)}. The price increases to ${formatNaira(FUTURE_PRICE)} after the launch period ends.` },
  { q: "Can I read it on my phone?", a: "Yes — it's a standard PDF, readable on any phone, tablet, or computer." },
  { q: "Is this a medical treatment?", a: "No. This is an educational, self-care guide. It's not a substitute for professional medical diagnosis or treatment, and it doesn't replace advice from a healthcare provider." },
  { q: "When should I see a doctor about period pain?", a: "If your pain is severe, suddenly worse or different from usual, comes with heavy bleeding, fever, or fainting, or happens outside your period, it's worth seeking medical evaluation rather than relying on self-care alone. Chapter 7 of the guide covers this in detail." },
  { q: "Is the 5-day plan a guaranteed cure?", a: "No. It's a structured self-care framework designed to help you try natural approaches in a clear order — not a guarantee that pain will disappear within five days. Responses vary from person to person." },
];

function renderFAQ(){
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-item__q" aria-expanded="false">
        <span>${f.q}</span>
        <span class="faq-item__icon">+</span>
      </button>
      <div class="faq-item__a">${f.a}</div>
    </div>
  `).join('');

  list.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-item__q').setAttribute('aria-expanded','false'); });
      if (!isOpen){
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderRemedies();
  renderPlan();
  renderFAQ();
  initCountdown();
});
