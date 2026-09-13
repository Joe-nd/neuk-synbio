/* ===========================================================================
   NEUK SynBio — site behaviour
   You should not normally need to edit this file. Content lives in data.js.
   =========================================================================== */

(function () {
  'use strict';

  /* --- helpers ----------------------------------------------------------- */

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const MONTHS_LONG = ['January','February','March','April','May','June',
                       'July','August','September','October','November','December'];

  const parse = (iso) => {
    const [y, m, d] = String(iso).split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  const longDate = (iso) => {
    const d = parse(iso);
    return d.getDate() + ' ' + MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear();
  };
  const shortDate = (iso) => {
    const d = parse(iso);
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  };

  /* each event gets a web address built from its title */
  const slugify = (str) => String(str).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  /* Luma: when an event has a lumaEventId, the button opens Luma's
     registration pop-up in place instead of sending people off-site.
     The Luma script is only loaded if one of these buttons exists. */
  let needsLuma = false;
  const registerButton = (ev, cls, label) => {
    if (ev.lumaEventId) {
      needsLuma = true;
      return '<button class="' + cls + '" type="button" data-luma-action="checkout"' +
        ' data-luma-event-id="' + esc(ev.lumaEventId) + '">' + label + '</button>';
    }
    if (ev.registerUrl) {
      return '<a class="' + cls + '" href="' + esc(ev.registerUrl) + '" rel="noopener">' + label + '</a>';
    }
    return '';
  };

  const loadLuma = () => {
    if (!needsLuma || document.getElementById('luma-checkout')) return;
    const sc = document.createElement('script');
    sc.id = 'luma-checkout';
    sc.src = 'https://embed.lu.ma/checkout-button.js';
    document.body.appendChild(sc);
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const hasDate = (x) => Boolean(x && x.date);
  const isUpcoming = (ev) => hasDate(ev) && parse(ev.date) >= today;

  /* entries with no date sort to the bottom of whichever list they're in */
  const byDateAsc = (a, b) => {
    if (!hasDate(a)) return 1;
    if (!hasDate(b)) return -1;
    return parse(a.date) - parse(b.date);
  };
  const byDateDesc = (a, b) => {
    if (!hasDate(a)) return 1;
    if (!hasDate(b)) return -1;
    return parse(b.date) - parse(a.date);
  };

  /* anything marked  draft: true  in data.js is hidden from the live site */
  const live = (list) => (list || []).filter((x) => !x.draft);

  const events   = live(typeof EVENTS !== 'undefined' ? EVENTS : []).slice();
  const upcoming = events.filter(isUpcoming).sort(byDateAsc);
  const past     = events.filter((e) => !isUpcoming(e)).sort(byDateDesc);


  /* --- mobile navigation -------------------------------------------------- */

  const toggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }


  /* --- next event strip --------------------------------------------------- */

  const nextSlot = $('#next-event');
  if (nextSlot) {
    if (upcoming.length) {
      const ev = upcoming[0];
      const d = parse(ev.date);
      const link = registerButton(ev, 'btn btn-primary', 'Register to attend') ||
        '<a class="btn btn-secondary" href="event.html?id=' +
        encodeURIComponent(slugify(ev.title)) + '">Event details</a>';

            const thumb = ev.image
        ? '<img class="next-poster" src="' + esc(ev.image) + '" alt="">'
        : '';
      if (ev.image) nextSlot.style.gridTemplateColumns = 'auto auto 1fr auto';

      nextSlot.innerHTML = thumb +
        '<div class="when"><span class="d">' + d.getDate() + '</span>' +
        '<span class="m">' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + '</span></div>' +
        '<div><p class="tag">Next event</p>' +
        '<h3>' + esc(ev.title) + '</h3>' +
        '<p class="meta">' + esc([ev.speaker, ev.time, ev.venue].filter(Boolean).join(' — ')) + '</p></div>' +
        '<div>' + link + '</div>';
    } else {
      nextSlot.innerHTML =
        '<div><p class="tag">Programme</p>' +
        '<h3>The next season of seminars is being scheduled</h3>' +
        '<p class="meta">Join the mailing list and we will send dates as soon as they are confirmed.</p></div>' +
        '<div><a class="btn btn-primary" href="#get-involved">Join the mailing list</a></div>';
      nextSlot.style.gridTemplateColumns = '1fr auto';
    }
  }


  /* --- event lists -------------------------------------------------------- */

  function renderEvents(slot, list, limit) {
    if (!slot) return;
    const items = limit ? list.slice(0, limit) : list;
    if (!items.length) {
      slot.innerHTML = '<li class="event-row"><p class="e-meta mb-0">Nothing listed yet.</p></li>';
      return;
    }
    slot.innerHTML = items.map((ev) => {
      const meta = [ev.speaker, ev.affiliation, ev.venue].filter(Boolean).join(' — ');
      const href = 'event.html?id=' + encodeURIComponent(slugify(ev.title));
      const action = (isUpcoming(ev) && registerButton(ev, 'btn btn-secondary', 'Register')) ||
        '<a class="event-more" href="' + href + '">Details</a>';
      return '<li class="event-row">' +
        '<div class="e-date">' + (ev.date
          ? '<time datetime="' + esc(ev.date) + '">' + shortDate(ev.date) + '</time>'
          : 'Date to confirm') + '</div>' +
        '<div><h3><a href="' + href + '">' + esc(ev.title) + '</a></h3>' +
        '<p class="e-meta">' + esc(meta) + '</p></div>' +
        action + '</li>';
    }).join('');
  }

  renderEvents($('#upcoming-events'), upcoming);
  renderEvents($('#past-events'), past);
  renderEvents($('#home-upcoming'), upcoming, 3);


  /* --- speakers ----------------------------------------------------------- */

  function renderSpeakers(slot, limit) {
    if (!slot || typeof SPEAKERS === 'undefined') return;
    const list = live(SPEAKERS).sort(byDateDesc);
    const items = limit ? list.slice(0, limit) : list;
    slot.innerHTML = items.map((s) => {
      const pic = s.photo
        ? '<img class="pic" src="' + esc(s.photo) + '" alt="' + esc(s.name) + '" loading="lazy">'
        : '<div class="pic" aria-hidden="true"></div>';
      const name = s.link
        ? '<a href="' + esc(s.link) + '">' + esc(s.name) + '</a>'
        : esc(s.name);
      return '<article class="speaker-card">' + pic +
        '<h3>' + name + '</h3>' +
        '<p class="role">' + esc(s.role) + '</p>' +
        (s.talk ? '<p class="talk">' + esc(s.talk) + '</p>' : '') +
        (s.date ? '<p class="date">' + longDate(s.date) + '</p>' : '') +
        '</article>';
    }).join('');
  }

  renderSpeakers($('#speakers'), 3);
  renderSpeakers($('#all-speakers'));


  /* --- institutions ------------------------------------------------------- */

  const instSlot = $('#institutions');
  if (instSlot && typeof INSTITUTIONS !== 'undefined') {
    instSlot.innerHTML = live(INSTITUTIONS).map((i) =>
      '<div class="institution"><strong>' + esc(i.name) + '</strong>' +
      '<span>' + esc(i.note) + '</span></div>'
    ).join('');
  }


  /* --- partners ----------------------------------------------------------- */

  const partSlot = $('#partners');
  if (partSlot && typeof PARTNERS !== 'undefined') {
    const tiers = ['Funder', 'Sponsor', 'Partner'];
    const labels = {
      Funder: 'Funders',
      Sponsor: 'Sponsors',
      Partner: 'Partner organisations'
    };
    partSlot.innerHTML = tiers.map((tier) => {
      const group = live(PARTNERS).filter((p) => p.tier === tier);
      if (!group.length) return '';
      const cells = group.map((p) => {
        const inner = p.logo
          ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.name) + '" loading="lazy">'
          : '<span>' + esc(p.name) + '</span>';
        return p.url
          ? '<a class="logo-cell" href="' + esc(p.url) + '" rel="noopener">' + inner + '</a>'
          : '<div class="logo-cell">' + inner + '</div>';
      }).join('');
      return '<p class="tier-label">' + labels[tier] + '</p><div class="logo-wall">' + cells + '</div>';
    }).join('');
  }


  /* --- figures ------------------------------------------------------------ */

  const figSlot = $('#figures');
  if (figSlot && typeof FIGURES !== 'undefined') {
    figSlot.innerHTML = live(FIGURES).map((f) =>
      '<div class="figure"><span class="n">' + esc(f.n) + '</span>' +
      '<p>' + esc(f.label) + '</p></div>'
    ).join('');
  }


  /* --- organising committee ------------------------------------------------ */

  const teamSlot = $('#team');
  const teamSection = $('#team-section');
  if (teamSlot && typeof TEAM !== 'undefined') {
    const members = live(TEAM);
    if (!members.length) {
      /* no names yet — hide the whole section rather than show empty cards */
      if (teamSection) teamSection.hidden = true;
    } else {
      teamSlot.innerHTML = members.map((m) => {
        const pic = m.photo
          ? '<img class="pic" src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy">'
          : '<div class="pic" aria-hidden="true"></div>';
        const name = m.link
          ? '<a href="' + esc(m.link) + '">' + esc(m.name) + '</a>'
          : esc(m.name);
        return '<article class="speaker-card">' + pic +
          '<h3>' + name + '</h3>' +
          '<p class="role">' + esc(m.role) + '</p>' +
          (m.does ? '<p class="talk">' + esc(m.does) + '</p>' : '') +
          '</article>';
      }).join('');
    }
  }


  /* --- site-wide settings from data.js ------------------------------------- */

  if (typeof SITE !== 'undefined') {
    if (SITE.contactEmail) {
      document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
        const query = a.getAttribute('href').split('?')[1];
        a.setAttribute('href', 'mailto:' + SITE.contactEmail + (query ? '?' + query : ''));
        if (a.textContent.indexOf('@') > -1) a.textContent = SITE.contactEmail;
      });
    }
    document.querySelectorAll('[data-social]').forEach((a) => {
      const url = SITE[a.getAttribute('data-social')];
      if (url) { a.setAttribute('href', url); }
      else if (a.parentElement) { a.parentElement.hidden = true; }
    });
  }


  /* --- single event page (event.html?id=...) ------------------------------- */

  const detail = $('#event-detail');
  if (detail) {
    const wanted = new URLSearchParams(location.search).get('id');
    const ev = live(typeof EVENTS !== 'undefined' ? EVENTS : [])
      .find((e) => slugify(e.title) === wanted);

    if (!ev) {
      detail.innerHTML =
        '<h1>That event is not here</h1>' +
        '<p>The link may be out of date, or the event may still be being confirmed.</p>' +
        '<p><a class="btn btn-primary" href="events.html">See all events</a></p>';
    } else {
      document.title = ev.title + ' \u2014 NEUK SynBio';
      const upcomingNow = isUpcoming(ev);
      const meta = [];
      if (ev.date) meta.push(longDate(ev.date));
      if (ev.time) meta.push(ev.time);
      if (ev.venue) meta.push(ev.venue);
      if (ev.type) meta.push(ev.type);

      let extras = '';
      if (ev.recordingUrl) {
        extras += '<a class="resource" href="' + esc(ev.recordingUrl) + '" rel="noopener">' +
          '<strong>Watch the recording</strong><span>Opens on YouTube</span></a>';
      }
      if (ev.resourcesUrl) {
        extras += '<a class="resource" href="' + esc(ev.resourcesUrl) + '" rel="noopener">' +
          '<strong>Slides and resources</strong><span>Shared by the speaker</span></a>';
      }

      const actions = [];
      if (upcomingNow) {
        const reg = registerButton(ev, 'btn btn-primary', 'Register to attend');
        if (reg) actions.push(reg);
      }
      if (ev.date && upcomingNow) {
        actions.push('<button class="btn btn-secondary" id="add-cal" type="button">Add to calendar</button>');
      }
      actions.push('<button class="btn btn-secondary" id="share-event" type="button">Copy link</button>');
      
       const poster = ev.image
        ? '<img class="event-poster" src="' + esc(ev.image) + '" alt="Poster for ' +
          esc(ev.title) + '" loading="lazy">'
        : '';
      detail.innerHTML =
        '<p class="tag" style="color:' + (upcomingNow ? 'var(--accent)' : 'var(--ink-3)') + '">' +
        (upcomingNow ? 'Upcoming event' : 'Past event') + '</p>' +
        '<h1 style="font-size:clamp(1.9rem,4vw,3rem)">' + esc(ev.title) + '</h1>' +
        (ev.speaker ? '<p class="lede-speaker">' + esc(ev.speaker) +
          (ev.affiliation ? ' \u2014 ' + esc(ev.affiliation) : '') + '</p>' : '') +
        '<p class="e-meta">' + esc(meta.join('. ')) + '</p>' +
                poster +
        (ev.summary ? '<p class="detail-summary">' + esc(ev.summary) + '</p>' : '') +
        (extras ? '<div class="resource-grid">' + extras + '</div>' : '') +
        '<div class="hero-actions">' + actions.join('') + '</div>';

      const shareBtn = $('#share-event');
      if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            shareBtn.textContent = 'Link copied';
          } catch (err) {
            shareBtn.textContent = location.href;
          }
        });
      }

      const calBtn = $('#add-cal');
      if (calBtn) {
        calBtn.addEventListener('click', () => {
          const d = ev.date.replace(/-/g, '');
          const ics = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NEUK SynBio//EN',
            'BEGIN:VEVENT',
            'UID:' + slugify(ev.title) + '@neuksynbio',
            'DTSTART;VALUE=DATE:' + d,
            'DTEND;VALUE=DATE:' + d,
            'SUMMARY:' + ev.title.replace(/,/g, '\\,'),
            'LOCATION:' + String(ev.venue || '').replace(/,/g, '\\,'),
            'END:VEVENT', 'END:VCALENDAR'
          ].join('\r\n');
          const a = document.createElement('a');
          a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
          a.download = slugify(ev.title) + '.ics';
          a.click();
        });
      }
    }
  }


  /* --- forms --------------------------------------------------------------- */

  const formspree = (typeof SITE !== 'undefined' && SITE.formspreeId) ? SITE.formspreeId : '';
  const contact = (typeof SITE !== 'undefined' && SITE.contactEmail) ? SITE.contactEmail : '';

  document.querySelectorAll('form[data-form]').forEach((form) => {
    if (formspree) {
      form.setAttribute('action', 'https://formspree.io/f/' + formspree);
      form.setAttribute('method', 'POST');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending'; }
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });
          if (!res.ok) throw new Error('failed');
          form.innerHTML = '<p class="form-done">Thank you. We have your message and will be in touch.</p>';
        } catch (err) {
          if (btn) { btn.disabled = false; btn.textContent = original; }
          let note = form.querySelector('.form-error');
          if (!note) {
            note = el('p', 'form-error');
            form.appendChild(note);
          }
          note.textContent = contact
            ? 'That did not send. Please email ' + contact + ' instead.'
            : 'That did not send. Please try again.';
        }
      });
    } else {
      /* no form service connected yet — fall back to an email link */
      const subject = form.getAttribute('data-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        location.href = 'mailto:' + contact + '?subject=' + encodeURIComponent('NEUK: ' + subject);
      });
      const note = el('p', 'form-note');
      note.textContent = 'Forms are not connected yet, so this opens your email instead.';
      form.parentElement.appendChild(note);
    }
  });


  /* --- optional Luma calendar embed ---------------------------------------- */

  const calSlot = $('#luma-calendar');
  if (calSlot) {
    const src = (typeof SITE !== 'undefined' && SITE.lumaCalendarEmbed) ? SITE.lumaCalendarEmbed : '';
    if (src) {
      calSlot.innerHTML = '<iframe src="' + esc(src) + '" class="luma-embed" ' +
        'title="NEUK SynBio events on Luma" loading="lazy" ' +
        'allow="fullscreen; payment" frameborder="0"></iframe>';
    } else if (calSlot.parentElement) {
      calSlot.parentElement.hidden = true;
    }
  }

  loadLuma();


  /* --- current year in footer --------------------------------------------- */

  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
