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

    const theme = ['night', 'hotel', 'urban', 'revive', 'sky', 'altera', 'sync', 'relief', 'slides'].includes(data.vazuriTheme)
      ? data.vazuriTheme
      : 'slides';
    const caseKey = {
      night: 'nightshift', hotel: 'hotel', urban: 'urban', revive: 'revive', sky: 'skyvilla',
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

    const arrowCellIndexes = new Set([3, 9, 15, 21, 22, 23, 24, 25, 26, 27, 29, 37, 45]);
    const themeIndex = ['night', 'hotel', 'urban', 'revive', 'slides', 'sky', 'altera', 'sync', 'relief'].indexOf(theme);
    const sequenceMultipliers = [17, 19, 23, 25, 29, 31, 33, 37, 39];
    const sequenceMultiplier = sequenceMultipliers[Math.max(0, themeIndex)];
    const puzzleCells = Array.from({ length: 49 }, (_, index) => {
      const column = index % 7;
      const row = Math.floor(index / 7);
      const order = (index * sequenceMultiplier + Math.max(0, themeIndex) * 5) % 49;
      const direction = (column + row * 2 + Math.max(0, themeIndex)) % 4;
      const offsets = [
        { x: -12, y: 0, rotate: -18 },
        { x: 0, y: -12, rotate: 14 },
        { x: 12, y: 0, rotate: 18 },
        { x: 0, y: 12, rotate: -14 },
      ];
      const start = 0.015 + (order / 48) * 0.72;
      return {
        index, column, row, start, end: Math.min(start + 0.18, 0.9), ...offsets[direction],
      };
    }).filter((piece) => !arrowCellIndexes.has(piece.index));
    const puzzleMarkup = puzzleCells.map((piece) => `
      <rect class="v2-puzzle__piece" data-v2-puzzle-piece data-start="${piece.start.toFixed(4)}" data-end="${piece.end.toFixed(4)}" data-x="${piece.x}" data-y="${piece.y}" data-rotate="${piece.rotate}" x="${3 + piece.column * (50 / 7)}" y="${3 + piece.row * (50 / 7)}" width="${(50 / 7) + 0.08}" height="${(50 / 7) + 0.08}" />`).join('');

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
          <span class="v2-console__beacon" data-v2-beacon="${theme}" aria-hidden="true">
            <svg class="v2-puzzle" viewBox="0 0 56 56" focusable="false"><g class="v2-puzzle__field">${puzzleMarkup}</g></svg>
          </span>
          <svg class="v2-console__outline" viewBox="0 0 56 56" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path class="v2-console__outline-progress" pathLength="1" d="M55.5 55.5H.5V.5H55.5V55.5"></path>
            <path class="v2-console__outline-runner" pathLength="1" d="M55.5 55.5H.5V.5H55.5V55.5"></path>
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
    const outlineProgress = root.querySelector('.v2-console__outline-progress');
    const outlineRunner = root.querySelector('.v2-console__outline-runner');
    const puzzlePieces = [...root.querySelectorAll('[data-v2-puzzle-piece]')];
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
      const progress = Math.max(0, Math.min(1, scrollTop / available));
      outlineProgress.style.strokeDashoffset = (1 - progress).toFixed(4);
      outlineRunner.style.strokeDashoffset = (1.12 - progress).toFixed(4);
      outlineRunner.style.opacity = progress > 0.006 && progress < 0.994 ? '1' : '0';
      puzzlePieces.forEach((piece) => {
        const start = Number(piece.dataset.start || 0);
        const end = Number(piece.dataset.end || 1);
        const offsetX = Number(piece.dataset.x || 0);
        const offsetY = Number(piece.dataset.y || 0);
        const rotation = Number(piece.dataset.rotate || 0);
        const segmentProgress = Math.max(0, Math.min(1, (progress - start) / Math.max(end - start, 0.01)));
        const easedProgress = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
        const remainingMotion = 1 - easedProgress;
        piece.style.opacity = easedProgress.toFixed(3);
        piece.style.transform = `translate(${(offsetX * remainingMotion).toFixed(2)}px, ${(offsetY * remainingMotion).toFixed(2)}px) rotate(${(rotation * remainingMotion).toFixed(2)}deg) scale(${(0.62 + easedProgress * 0.38).toFixed(3)})`;
      });
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
      outlineProgress.style.strokeDashoffset = '0';
      outlineRunner.style.opacity = '0';
      puzzlePieces.forEach((piece) => {
        piece.style.opacity = '1';
        piece.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
      });
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
