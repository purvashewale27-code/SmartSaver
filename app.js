// ==========================================================================
// SMARTSAVER — MASTER INTERACTION CONTROLLER
// Neo-Brutalist Client-Side Interactivity & Financial Calculator
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      });
    });
  }

  // 2. Instrument Category Filtering
  const filterPills = document.querySelectorAll('.filter-tab-pill');
  const instrumentCards = document.querySelectorAll('.instrument-card');

  if (filterPills.length && instrumentCards.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');
        instrumentCards.forEach(card => {
          const categories = card.getAttribute('data-categories') || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Interactive Compound Interest & Smart Recommendation Calculator
  const customAmountInput = document.getElementById('calcCustomAmount');
  const amountPillBtns = document.querySelectorAll('.amount-pill-btn');
  const horizonCards = document.querySelectorAll('.horizon-radio-card');
  
  let selectedAmount = 10000;
  let selectedHorizon = 'medium'; // short | medium | long

  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function updateCalculator() {
    // 1. Get amount
    let principal = parseInt(customAmountInput.value, 10) || selectedAmount || 1000;
    if (principal < 100) principal = 100;

    // 2. Determine recommendation & returns based on horizon
    let recName = '';
    let recBadge = '';
    let recReason = '';
    let rate = 0;
    let years = 1;

    if (selectedHorizon === 'short') {
      years = 1;
      rate = 7.0; // Fixed Deposit or Liquid Fund
      recName = 'Fixed Deposit (FD) / Liquid Fund';
      recBadge = '🛡️ Safe & Liquid (< 1 Year)';
      recReason = 'For short-term needs, capital protection and immediate access matter most. Banks offer 6.5% - 7.5% guaranteed returns with zero stock market volatility.';
    } else if (selectedHorizon === 'medium') {
      years = 3;
      rate = 7.5; // Post Office / Recurring Deposit
      recName = 'Post Office Schemes / RD';
      recBadge = '⚖️ Steady Growth (1 - 3 Years)';
      recReason = 'For medium-term milestones, Post Office Time Deposits (7.1% - 7.5%) and Bank FDs provide guaranteed sovereign safety and compound growth without market crashes.';
    } else {
      years = 5;
      rate = 13.5; // Equity Mutual Fund Index SIP / PPF
      recName = 'Equity Mutual Fund (SIP) / PPF';
      recBadge = '🚀 High Growth Wealth Builder (3 - 5+ Years)';
      recReason = 'For long-term horizons, Equity Index Mutual Funds historically deliver 12% - 15% annual compounding, beating inflation while building substantial wealth.';
    }

    // Compound Interest Formula: A = P * (1 + r/n)^(n*t), compounded annually
    const maturity = principal * Math.pow((1 + (rate / 100)), years);
    const interestEarned = maturity - principal;

    // Update UI elements
    const recBadgeEl = document.getElementById('calcRecBadge');
    const recNameEl = document.getElementById('calcRecName');
    const recReasonEl = document.getElementById('calcRecReason');
    const principalEl = document.getElementById('calcPrincipalVal');
    const rateEl = document.getElementById('calcRateVal');
    const interestEl = document.getElementById('calcInterestVal');
    const totalEl = document.getElementById('calcTotalVal');

    if (recBadgeEl) recBadgeEl.textContent = recBadge;
    if (recNameEl) recNameEl.textContent = recName;
    if (recReasonEl) recReasonEl.textContent = recReason;
    if (principalEl) principalEl.textContent = formatINR(principal);
    if (rateEl) rateEl.textContent = `${rate}% p.a. (${years} ${years === 1 ? 'Year' : 'Years'})`;
    if (interestEl) interestEl.textContent = `+ ${formatINR(interestEarned)}`;
    if (totalEl) totalEl.textContent = formatINR(maturity);
  }

  // Amount Pill Click Handler
  if (amountPillBtns.length) {
    amountPillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountPillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = parseInt(btn.getAttribute('data-amount'), 10);
        if (customAmountInput) customAmountInput.value = selectedAmount;
        updateCalculator();
      });
    });
  }

  // Custom Input Change Handler
  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      amountPillBtns.forEach(btn => {
        if (parseInt(btn.getAttribute('data-amount'), 10) === val) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      updateCalculator();
    });
  }

  // Horizon Card Click Handler
  if (horizonCards.length) {
    horizonCards.forEach(card => {
      card.addEventListener('click', () => {
        horizonCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedHorizon = card.getAttribute('data-horizon');
        updateCalculator();
      });
    });
  }

  // Initialize Calculator on Load
  updateCalculator();

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item-retro');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-btn-retro');
      btn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

});
