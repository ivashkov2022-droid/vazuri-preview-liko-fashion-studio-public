(() => {
  'use strict';

  const script = document.currentScript || document.querySelector('script[data-vazuri-dock]');
  if (!script) return;

  const mount = () => {
    if (!document.body) return false;
    if (document.querySelector('[data-vazuri-dock-root]')) return true;

    const data = script.dataset;
    const lang = (data.vazuriLang || document.documentElement.lang || 'ru').toLowerCase().startsWith('en') ? 'en' : 'ru';
    const copy = lang === 'en'
      ? {
          navigation: 'VAZURI navigation',
          openNavigation: 'Open VAZURI navigation',
          closeNavigation: 'Close VAZURI navigation',
          channel: 'VAZURI / CASE CHANNEL',
          status: 'Live case',
          projects: 'All projects',
          discuss: 'Discuss a project',
          close: 'Close',
          closeForm: 'Close the form',
          eyebrow: 'VAZURI / New project',
          title: ['Describe', 'the project'],
          lead: 'We will reply personally',
          leadCompact: 'We will reply personally',
          namePlaceholder: 'Your name',
          contactPlaceholder: 'Email or Telegram',
          interest: 'What would you like to create?',
          options: [
            ['Website / digital', 'Website or digital product'],
            ['Brand / art direction', 'Brand and art direction'],
            ['Interactive', 'Interactive experience'],
            ['Project review', 'Project review'],
          ],
          consent: 'I agree to the processing of personal data',
          submit: 'Send request',
          sending: 'Sending…',
          successEyebrow: 'Request received',
          successTitle: 'Thank you.',
          successCopy: 'We will reply personally using the contact you provided.',
          returnToCase: 'Return to the case',
          errors: {
            validation: 'Check the required fields and consent.',
            rate: 'Too many attempts. Please try again in 10 minutes.',
            duplicate: 'We already received this request and will reply shortly.',
            delivery: 'The message could not be delivered. Please try again later.',
            default: 'The message could not be sent. Please try again later.',
          },
        }
      : {
          navigation: 'Навигация VAZURI',
          openNavigation: 'Открыть навигацию VAZURI',
          closeNavigation: 'Закрыть навигацию VAZURI',
          channel: 'VAZURI / CASE CHANNEL',
          status: 'Live case',
          projects: 'Все проекты',
          discuss: 'Обсудить проект',
          close: 'Закрыть',
          closeForm: 'Закрыть форму',
          eyebrow: 'VAZURI / Новый проект',
          title: ['Опишите', 'задачу'],
          lead: 'Ответим лично',
          leadCompact: 'Ответим лично',
          namePlaceholder: 'Ваше имя',
          contactPlaceholder: 'Email или Telegram',
          interest: 'Что нужно сделать?',
          options: [
            ['Сайт / digital', 'Сайт или цифровой продукт'],
            ['Бренд / art direction', 'Бренд и арт-дирекшн'],
            ['Интерактив', 'Интерактивный опыт'],
            ['Разбор проекта', 'Разбор проекта'],
          ],
          consent: 'Соглашаюсь на обработку персональных данных',
          submit: 'Отправить запрос',
          sending: 'Отправляем…',
          successEyebrow: 'Запрос принят',
          successTitle: 'Спасибо.',
          successCopy: 'Ответим лично по указанному вами контакту.',
          returnToCase: 'Вернуться к кейсу',
          errors: {
            validation: 'Проверьте обязательные поля и согласие.',
            rate: 'Слишком много попыток. Повторите через 10 минут.',
            duplicate: 'Мы уже получили эту заявку и скоро ответим.',
            delivery: 'Сообщение не доставлено. Попробуйте немного позже.',
            default: 'Не удалось отправить сообщение. Попробуйте ещё раз.',
          },
        };

    const theme = ['night', 'urban', 'revive', 'sky', 'altera', 'sync', 'relief', 'slides'].includes(data.vazuriTheme)
      ? data.vazuriTheme
      : 'slides';
    const caseKey = {
      night: 'nightshift', urban: 'urban', revive: 'revive', sky: 'skyvilla',
      altera: 'altera', sync: 'scrollsync', relief: 'relief', slides: 'slides',
    }[theme];
    const caseName = data.vazuriCase || 'VAZURI';
    const source = data.vazuriSource || `case-${caseKey}`;
    const returnToken = new URLSearchParams(window.location.search).get('return') || `${lang}-case-${caseKey}`;
    const validReturnToken = /^(ru|en)-(project|case)-(nightshift|hotel|urban|revive|slides|skyvilla|altera|scrollsync|relief)$/.test(returnToken);
    const returnLanguage = validReturnToken ? returnToken.slice(0, 2) : lang;
    const returnAnchor = validReturnToken ? returnToken.replace(/^(ru|en)-/, '') : 'case-slides';
    const projectsUrl = `https://vazuri.io${returnLanguage === 'en' ? '/en' : '/'}?fromCase=${encodeURIComponent(validReturnToken ? returnToken : `${lang}-case-slides`)}#${returnAnchor}`;
    const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[character]);

    const beaconMarkup = {
      night: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M4 28c8 0 11-15 17-15 5 0 8 8 13 10 4 2 8 1 11 5v6H5Z"/><path class="v2-beacon__trace" data-v2-trace pathLength="1" d="M5 33h39v-5c-5-5-9-2-15-7-4-3-5-9-9-9-6 0-9 14-16 15"/><path class="v2-beacon__detail" d="m18 19 5 2m-7 2 5 2M9 29h28"/></svg>`,
      urban: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M17 13h17v24H17zM20 9h11v4H20z"/><path class="v2-beacon__detail" d="M22 7h7m-8 14h9M13 13c-3 2-5 5-6 9m7-4c-2 1-3 3-4 5"/><path class="v2-beacon__trace" data-v2-trace pathLength="1" d="M34 18c8-2 10 3 6 7-3 3-9 2-9 7 0 4 7 5 13 2"/></svg>`,
      revive: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M18 14h15l3 6v17H15V20z"/><path class="v2-beacon__detail" d="M20 10h11v4H20zm2-5h7v5h-7zM19 24h13"/><path class="v2-beacon__fill" d="M17 24h17v11H17z"/><path class="v2-beacon__trace" data-v2-trace pathLength="1" d="M25 5v5h6v4l4 6v17H15V20l3-6h4V5Z"/></svg>`,
      sky: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M12 37V8h26v29z"/><path class="v2-beacon__detail" d="M9 37h32M18 8V4h14v4"/><g class="v2-beacon__windows"><i/><rect data-v2-stage="1" x="17" y="13" width="5" height="4"/><rect data-v2-stage="1" x="28" y="13" width="5" height="4"/><rect data-v2-stage="2" x="17" y="20" width="5" height="4"/><rect data-v2-stage="2" x="28" y="20" width="5" height="4"/><rect data-v2-stage="3" x="17" y="27" width="5" height="4"/><rect data-v2-stage="3" x="28" y="27" width="5" height="4"/><rect data-v2-stage="4" x="23" y="33" width="5" height="4"/></g><path class="v2-beacon__trace" data-v2-trace pathLength="1" d="M12 37V8h26v29H12Z"/></svg>`,
      altera: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M10 8h27l5 5v21H10z"/><circle class="v2-beacon__detail" cx="34" cy="15" r="2.5"/><path class="v2-beacon__detail" d="M16 17h12m-12 5h19m-19 5h15"/><path class="v2-beacon__trace v2-beacon__trace--stitch" data-v2-trace pathLength="1" d="M10 8h27l5 5v21H10V8Z"/></svg>`,
      sync: `<svg viewBox="0 0 50 42" aria-hidden="true"><path class="v2-beacon__base" d="M7 9h36v25H7z"/><path class="v2-beacon__detail" d="M12 14h26M12 29h26M16 9v5m9-5v5m9-5v5m-18 15v5m9-5v5m9-5v5"/><path class="v2-beacon__playhead" data-v2-playhead d="M12 17v9"/><path class="v2-beacon__trace" data-v2-trace pathLength="1" d="M7 34V9h36v25H7Z"/></svg>`,
      relief: `<svg viewBox="0 0 50 42" aria-hidden="true"><g class="v2-beacon__wheel" data-v2-wheel><circle class="v2-beacon__base" cx="25" cy="21" r="15"/><circle class="v2-beacon__detail" cx="25" cy="21" r="4"/><path class="v2-beacon__detail" d="M25 6v11m0 8v11M10 21h11m8 0h11M14.5 10.5l7.7 7.7m5.6 5.6 7.7 7.7m0-21-7.7 7.7m-5.6 5.6-7.7 7.7"/></g><circle class="v2-beacon__trace" data-v2-trace pathLength="1" cx="25" cy="21" r="18"/></svg>`,
      slides: `<span class="v2-console__mark"><strong>VZ</strong><small>CASE / 04</small></span>`,
    }[theme];

    const root = document.createElement('div');
    root.dataset.vazuriDockRoot = '';
    root.dataset.v2CaseConsole = '';
    root.dataset.theme = theme;
    root.innerHTML = `
      <aside class="v2-console" aria-label="${escapeHtml(copy.navigation)}">
        <div class="v2-console__panel" id="v2-console-panel" hidden>
          <div class="v2-console__head">
            <div>
              <p>${escapeHtml(copy.channel)}</p>
              <strong>${escapeHtml(caseName)}</strong>
            </div>
            <span class="v2-console__status">${escapeHtml(copy.status)}</span>
          </div>
          <nav class="v2-console__actions" aria-label="${escapeHtml(copy.navigation)}">
            <a class="v2-console__action" href="${escapeHtml(projectsUrl)}">
              <span>${escapeHtml(copy.projects)}</span><span aria-hidden="true">←</span>
            </a>
            <button class="v2-console__action" type="button" data-v2-brief-open>
              <span>${escapeHtml(copy.discuss)}</span><span aria-hidden="true">↗</span>
            </button>
          </nav>
        </div>
        <button class="v2-console__toggle" type="button" aria-expanded="false" aria-controls="v2-console-panel" aria-label="${escapeHtml(copy.openNavigation)}">
          <span class="v2-console__beacon" data-v2-beacon="${theme}">${beaconMarkup}</span>
          <span class="v2-console__meter" aria-hidden="true"><i></i></span>
          <svg class="v2-console__outline" viewBox="0 0 76 64" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path pathLength="1" d="M75.5 63.5H.5V.5H75.5V63.5"></path>
          </svg>
        </button>
      </aside>
      <div class="v2-brief" hidden>
        <button class="v2-brief__backdrop" type="button" data-v2-brief-close aria-label="${escapeHtml(copy.closeForm)}"></button>
        <section class="v2-brief__drawer" role="dialog" aria-modal="true" aria-labelledby="v2-brief-title" aria-describedby="v2-brief-description">
          <header class="v2-brief__topline">
            <p>${escapeHtml(copy.eyebrow)}</p>
            <button class="v2-brief__close" type="button" data-v2-brief-close aria-label="${escapeHtml(copy.close)}">×</button>
          </header>
          <div class="v2-brief__content">
            <div class="v2-brief__form-state">
              <h2 id="v2-brief-title"><span>${escapeHtml(copy.title[0])}</span><span>${escapeHtml(copy.title[1])}</span></h2>
              <p class="v2-brief__lead" id="v2-brief-description"><span class="v2-brief__lead-full">${escapeHtml(copy.lead)}</span><span class="v2-brief__lead-compact">${escapeHtml(copy.leadCompact)}</span></p>
              <form class="v2-brief__form" autocomplete="off">
                <input class="v2-brief__trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
                <label class="v2-brief__field">
                  <input name="name" autocomplete="off" autocapitalize="words" data-1p-ignore data-lpignore="true" aria-label="${escapeHtml(copy.namePlaceholder)}" placeholder="${escapeHtml(copy.namePlaceholder)}" maxlength="120" required>
                </label>
                <label class="v2-brief__field">
                  <input name="contact" autocomplete="off" autocapitalize="none" data-1p-ignore data-lpignore="true" aria-label="${escapeHtml(copy.contactPlaceholder)}" placeholder="${escapeHtml(copy.contactPlaceholder)}" maxlength="180" required>
                </label>
                <fieldset class="v2-brief__choices">
                  <legend>${escapeHtml(copy.interest)}</legend>
                  <div class="v2-brief__choice-grid">
                    ${copy.options.map(([label, value], index) => `<label><input type="radio" name="interest" value="${escapeHtml(value)}" ${index === 0 ? 'checked' : ''}><span>${escapeHtml(label)}</span></label>`).join('')}
                  </div>
                </fieldset>
                <label class="v2-brief__consent"><input name="consent" type="checkbox" value="yes" required><span>${escapeHtml(copy.consent)}</span></label>
                <button class="v2-brief__submit" type="submit"><span>${escapeHtml(copy.submit)}</span><b aria-hidden="true">↗</b></button>
                <p class="v2-brief__feedback" aria-live="polite"></p>
              </form>
            </div>
            <div class="v2-brief__success" hidden>
              <p>${escapeHtml(copy.successEyebrow)}</p>
              <h2>${escapeHtml(copy.successTitle)}</h2>
              <span>${escapeHtml(copy.successCopy)}</span>
              <button type="button" data-v2-brief-close>${escapeHtml(copy.returnToCase)} <b aria-hidden="true">→</b></button>
            </div>
          </div>
        </section>
      </div>`;

    document.body.append(root);

    const consoleElement = root.querySelector('.v2-console');
    const toggle = root.querySelector('.v2-console__toggle');
    const progressMeter = root.querySelector('.v2-console__meter i');
    const outlineProgress = root.querySelector('.v2-console__outline path');
    const traceProgress = [...root.querySelectorAll('[data-v2-trace]')];
    const stageElements = [...root.querySelectorAll('[data-v2-stage]')];
    const playhead = root.querySelector('[data-v2-playhead]');
    const wheel = root.querySelector('[data-v2-wheel]');
    const panel = root.querySelector('.v2-console__panel');
    const brief = root.querySelector('.v2-brief');
    const drawer = root.querySelector('.v2-brief__drawer');
    const form = root.querySelector('.v2-brief__form');
    const formState = root.querySelector('.v2-brief__form-state');
    const successState = root.querySelector('.v2-brief__success');
    const feedback = root.querySelector('.v2-brief__feedback');
    const submit = root.querySelector('.v2-brief__submit');
    const submitLabel = submit.querySelector('span');
    const briefClose = root.querySelector('.v2-brief__close');
    const nameInput = form.elements.namedItem('name');
    const contactInput = form.elements.namedItem('contact');
    const consentInput = form.elements.namedItem('consent');
    let lastFocus = null;
    let savedScroll = 0;
    let frame = 0;
    let closeTimer = 0;
    let hoverCloseTimer = 0;
    let completionPromptShown = false;
    let lastScrollTop = Math.max(window.scrollY, document.documentElement.scrollTop);
    let wheelAngle = 0;
    let wheelStopTimer = 0;
    const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

    const setConsole = (open, restoreFocus = false) => {
      window.clearTimeout(closeTimer);
      if (open) panel.hidden = false;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? copy.closeNavigation : copy.openNavigation);
      requestAnimationFrame(() => consoleElement.classList.toggle('is-open', open));
      if (!open) closeTimer = window.setTimeout(() => {
        if (!consoleElement.classList.contains('is-open')) panel.hidden = true;
      }, 280);
      if (restoreFocus) toggle.focus();
    };

    const setPageLock = (locked) => {
      if (locked) {
        savedScroll = window.scrollY;
        document.documentElement.classList.add('v2-console-open');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScroll}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        return;
      }
      document.documentElement.classList.remove('v2-console-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScroll);
    };

    const resetBrief = () => {
      formState.hidden = false;
      successState.hidden = true;
      feedback.textContent = '';
      submit.disabled = false;
      submitLabel.textContent = copy.submit;
    };

    const updateFormProgress = () => {
      const completed = [nameInput.value.trim(), contactInput.value.trim(), consentInput.checked]
        .reduce((total, value) => total + Number(Boolean(value)), 0);
      form.style.setProperty('--v2-form-progress', Math.max(0.06, completed / 3).toFixed(3));
    };

    const openBrief = () => {
      setConsole(false);
      resetBrief();
      lastFocus = document.activeElement;
      brief.hidden = false;
      setPageLock(true);
      updateFormProgress();
      requestAnimationFrame(() => {
        brief.classList.add('is-open');
        briefClose?.focus({ preventScroll: true });
      });
      window.setTimeout(() => {
        if (!brief.hidden && !brief.contains(document.activeElement)) briefClose?.focus({ preventScroll: true });
      }, 180);
    };

    const closeBrief = () => {
      if (brief.hidden) return;
      brief.classList.remove('is-open');
      window.setTimeout(() => {
        brief.hidden = true;
        setPageLock(false);
        lastFocus?.focus?.();
      }, 360);
    };

    const trapFocus = (event) => {
      if (event.key !== 'Tab' || brief.hidden) return;
      const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const updateProgress = () => {
      frame = 0;
      const scrollingElement = document.scrollingElement || document.documentElement;
      const viewportHeight = scrollingElement.clientHeight || window.innerHeight;
      const available = Math.max(scrollingElement.scrollHeight - viewportHeight, 1);
      const scrollTop = Math.max(window.scrollY, scrollingElement.scrollTop);
      const remaining = Math.max(0, available - scrollTop);
      const progress = Math.max(0, Math.min(100, (scrollTop / available) * 100));
      const meterScale = Math.max(0.1, progress / 100);
      progressMeter.style.transform = `scaleY(${meterScale.toFixed(4)})`;
      outlineProgress.style.strokeDashoffset = (1 - progress / 100).toFixed(4);
      traceProgress.forEach((path) => { path.style.strokeDashoffset = (1 - progress / 100).toFixed(4); });
      root.style.setProperty('--v2-progress', (progress / 100).toFixed(4));
      stageElements.forEach((element) => element.classList.toggle('is-lit', progress >= Number(element.dataset.v2Stage) * 22));
      if (playhead) playhead.style.transform = `translateX(${(progress * 0.26).toFixed(2)}px)`;
      const delta = scrollTop - lastScrollTop;
      if (wheel && Math.abs(delta) > 0.4) {
        wheelAngle += Math.max(-28, Math.min(28, delta * 0.32));
        wheel.style.transform = `rotate(${wheelAngle.toFixed(2)}deg)`;
        wheel.classList.add('is-scrolling');
        window.clearTimeout(wheelStopTimer);
        wheelStopTimer = window.setTimeout(() => wheel.classList.remove('is-scrolling'), 120);
      }
      lastScrollTop = scrollTop;
      const hasScrollableCase = available > Math.max(220, viewportHeight * 0.35);
      const reachedEnd = hasScrollableCase && scrollTop > 0 && remaining <= Math.max(32, viewportHeight * 0.04);
      if (reachedEnd && !completionPromptShown && brief.hidden) {
        completionPromptShown = true;
        setConsole(true);
      }
    };

    const scheduleProgress = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateProgress);
    };

    const revealCompletedCase = () => {
      if (completionPromptShown || !brief.hidden) return;
      completionPromptShown = true;
      progressMeter.style.transform = 'scaleY(1)';
      outlineProgress.style.strokeDashoffset = '0';
      traceProgress.forEach((path) => { path.style.strokeDashoffset = '0'; });
      stageElements.forEach((element) => element.classList.add('is-lit'));
      root.style.setProperty('--v2-progress', '1');
      setConsole(true);
    };

    toggle.addEventListener('click', () => setConsole(!consoleElement.classList.contains('is-open')));
    consoleElement.addEventListener('pointerenter', () => {
      if (!hoverCapable.matches) return;
      window.clearTimeout(hoverCloseTimer);
      setConsole(true);
    });
    consoleElement.addEventListener('pointerleave', () => {
      if (!hoverCapable.matches) return;
      window.clearTimeout(hoverCloseTimer);
      hoverCloseTimer = window.setTimeout(() => {
        if (brief.hidden) setConsole(false);
      }, 180);
    });
    root.querySelector('[data-v2-brief-open]').addEventListener('click', openBrief);
    root.querySelectorAll('[data-v2-brief-close]').forEach((button) => button.addEventListener('click', closeBrief));
    document.querySelectorAll('[data-vazuri-brief-open]').forEach((element) => element.addEventListener('click', openBrief));
    if (data.vazuriInterceptContact === 'true') {
      document.querySelectorAll('a[href="#contact"], a[href$="/#contact"], a[href$="#contact"]').forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          openBrief();
        });
      });
    }
    document.addEventListener('pointerdown', (event) => {
      if (consoleElement.classList.contains('is-open') && !consoleElement.contains(event.target)) setConsole(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (!brief.hidden) closeBrief();
        else if (consoleElement.classList.contains('is-open')) setConsole(false, true);
        return;
      }
      trapFocus(event);
    });
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    window.addEventListener('scrollend', scheduleProgress);
    window.addEventListener('touchend', scheduleProgress, { passive: true });
    window.addEventListener('scrollslides:final-slide', revealCompletedCase);
    window.addEventListener('vazuri:case-complete', revealCompletedCase);
    window.visualViewport?.addEventListener('resize', scheduleProgress);
    window.visualViewport?.addEventListener('scroll', scheduleProgress);
    nameInput.addEventListener('input', updateFormProgress);
    contactInput.addEventListener('input', updateFormProgress);
    consentInput.addEventListener('change', updateFormProgress);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      submit.disabled = true;
      submitLabel.textContent = copy.sending;
      feedback.textContent = '';
      try {
        const response = await fetch('/lead.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            source,
            language: lang,
            website: formData.get('website') || '',
            name: formData.get('name') || '',
            contact: formData.get('contact') || '',
            company: '',
            message: `${caseName}. ${lang === 'en' ? 'Request' : 'Запрос'}: ${formData.get('interest') || copy.options[0][1]}.`,
            consent: formData.get('consent') || '',
          }),
        });
        const payload = await response.json().catch(() => ({ ok: false, code: 'default' }));
        if (!response.ok || !payload.ok) {
          const error = new Error(payload.code || 'default');
          error.code = payload.code || 'default';
          throw error;
        }
        form.reset();
        formState.hidden = true;
        successState.hidden = false;
        successState.querySelector('button')?.focus();
      } catch (error) {
        const code = error && typeof error === 'object' && 'code' in error ? error.code : 'default';
        feedback.textContent = copy.errors[code] || copy.errors.default;
        submit.disabled = false;
        submitLabel.textContent = copy.submit;
      }
    });

    updateProgress();
    return true;
  };

  if (!mount()) {
    const bodyObserver = new MutationObserver(() => {
      if (mount()) bodyObserver.disconnect();
    });
    bodyObserver.observe(document.documentElement, { childList: true });
    document.addEventListener('DOMContentLoaded', () => {
      if (mount()) bodyObserver.disconnect();
    }, { once: true });
  }
})();
