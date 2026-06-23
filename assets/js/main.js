// Mobile menu toggle
(function () {
  const btn  = document.getElementById('bc-hamburger');
  const menu = document.getElementById('bc-mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const open = menu.classList.toggle('is-open');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open);
  });

  // Close on any menu link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('is-open');
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Timeslot picker (homepage only)
(function () {
  const tabs  = document.querySelectorAll('.bc-day-tab');
  const slots = document.querySelectorAll('.bc-slot');
  const label = document.getElementById('bc-selected-day');
  if (!tabs.length) return;

  const DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const TIMES     = ['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm'];
  // 0=booked 1=available 2=BC Hour
  const MATRIX = [
    [0,1,1,0,1,0,1,1,0],
    [0,1,1,2,1,0,0,1,1],
    [1,0,1,1,0,1,1,0,1],
    [1,1,0,1,1,0,1,0,1],
    [0,1,1,0,1,1,1,0,0],
  ];

  function renderSlots(dayIdx) {
    const slotsWrap = document.getElementById('bc-slots');
    if (!slotsWrap) return;
    slotsWrap.innerHTML = '';
    MATRIX[dayIdx].forEach(function (t, i) {
      const cls = t === 2 ? 'bc-slot--bc-hour' : t === 0 ? 'bc-slot--booked' : 'bc-slot--available';
      const lbl = t === 2 ? 'BC Hour' : t === 0 ? 'Booked' : 'Available';
      slotsWrap.innerHTML += `
        <div class="bc-slot ${cls}">
          <div class="bc-slot-time">${TIMES[i]}</div>
          <div class="bc-slot-label">${lbl}</div>
        </div>`;
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      if (label) label.textContent = DAY_NAMES[i];
      renderSlots(i);
    });
  });

  // Init first tab
  if (tabs[0]) { tabs[0].classList.add('is-active'); renderSlots(0); }
  if (label) label.textContent = DAY_NAMES[0];
})();
