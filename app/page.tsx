"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [briefOpen, setBriefOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let opened = false;
    const onScroll = () => {
      const work = document.getElementById("work");
      const trigger = work ? work.offsetTop - window.innerHeight * 0.18 : window.innerHeight * 1.8;
      if (!opened && window.scrollY > trigger) {
        opened = true;
        setBriefOpen(true);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBriefOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const openBrief = () => {
    setSent(false);
    setBriefOpen(true);
  };

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="hero" id="home">
        <Image className="hero-image" src="/images/fashion-hero.jpg" alt="Fashion-портрет кампании Altera" fill priority sizes="100vw" />
        <div className="hero-wash" aria-hidden="true" />
        <header className="header">
          <a className="brand" href="#home" aria-label="Altera — на главную"><b>ALT</b><i>●</i><b>ERA</b></a>
          <nav aria-label="Основная навигация"><a href="#studio">Studio</a><a href="#work">Work</a><a href="#services">Services</a></nav>
          <button type="button" className="round-menu" onClick={openBrief} aria-label="Обсудить проект"><span /><span /></button>
        </header>

        <div className="hero-title" aria-label="Fashion and branding">
          <span>FASHION</span>
          <span><em>&amp;</em> BRANDING</span>
        </div>
        <div className="hero-side"><span>Independent identity studio</span><span>Moscow · Berlin</span></div>
        <div className="hero-bottom">
          <p>We make fashion brands impossible to scroll past.</p>
          <button type="button" onClick={openBrief}>Start a project <b>↗</b></button>
          <span>Scroll to discover ↓</span>
        </div>
        <div className="issue-stamp"><small>AL/26</small><b>NEW<br />IDENTITY</b></div>
      </section>

      <section className="studio" id="studio">
        <div className="studio-head"><span>01 / The studio</span><p>Strategy, image and digital presence<br />as one unmistakable system.</p><span>Since 2018</span></div>
        <h2>ONE IDEA<br /><i>MANY FORMS</i></h2>
        <div className="studio-grid">
          <div className="studio-shot perfume"><Image src="/images/fashion-about-1.jpg" alt="Предметная съёмка парфюма" fill sizes="28vw" /></div>
          <div className="studio-copy">
            <span className="asterisk">✳</span>
            <p>We build fashion identities that live everywhere — from a campaign frame to an e-commerce experience.</p>
            <a href="#work">Meet the point of view <b>→</b></a>
          </div>
          <div className="studio-shot glasses"><Image src="/images/fashion-about-2.jpg" alt="Fashion-съёмка в цветных очках" fill sizes="28vw" /></div>
        </div>
        <div className="ticker" aria-hidden="true"><span>ART DIRECTION · BRAND IDENTITY · DIGITAL · CAMPAIGNS · </span><span>ART DIRECTION · BRAND IDENTITY · DIGITAL · CAMPAIGNS · </span></div>
      </section>

      <section className="work" id="work">
        <div className="work-head"><p>Selected work</p><h2>IMAGE IS<br /><i>THE MESSAGE</i></h2><span>2024—2026</span></div>
        <div className="projects">
          <article className="project project-wide">
            <div className="project-image"><Image src="/images/fashion-project-1.jpg" alt="Кампания After Water" fill sizes="(max-width: 760px) 100vw, 46vw" /></div>
            <div className="project-meta"><span>01 / Beauty campaign</span><h3>AFTER WATER</h3><b>↗</b></div>
          </article>
          <article className="project">
            <div className="project-image"><Image src="/images/fashion-project-2.jpg" alt="Кампания Skin No.04" fill sizes="(max-width: 760px) 100vw, 27vw" /></div>
            <div className="project-meta"><span>02 / Brand launch</span><h3>SKIN NO.04</h3><b>↗</b></div>
          </article>
          <article className="project">
            <div className="project-image"><Image src="/images/fashion-project-3.jpg" alt="Кампания Soft Armour" fill sizes="(max-width: 760px) 100vw, 27vw" /></div>
            <div className="project-meta"><span>03 / Editorial</span><h3>SOFT ARMOUR</h3><b>↗</b></div>
          </article>
        </div>
        <div className="services" id="services"><span>Brand strategy</span><span>Art direction</span><span>Digital experience</span><button type="button" onClick={openBrief}>Work with us ↗</button></div>
        <footer><a className="brand" href="#home"><b>ALT</b><i>●</i><b>ERA</b></a><p>hello@altera-studio.com</p><p>Instagram · Behance · LinkedIn</p></footer>
      </section>

      {briefOpen && (
        <div className="brief-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBriefOpen(false); }}>
          <section className="brief-card" role="dialog" aria-modal="true" aria-labelledby="brief-title">
            <button className="brief-close" type="button" onClick={() => setBriefOpen(false)} aria-label="Закрыть форму">×</button>
            <div className="brief-poster"><span>NEW BUSINESS / 26</span><strong>READY<br />TO LOOK<br /><i>DIFFERENT?</i></strong><small>Moscow · worldwide</small></div>
            <div className="brief-form">
              {!sent ? (
                <>
                  <p>Tell us what you are building</p>
                  <h2 id="brief-title">LET&apos;S MAKE<br />IT <i>VISIBLE.</i></h2>
                  <form onSubmit={submitBrief}>
                    <label>Your name<input name="name" autoComplete="name" placeholder="Name / company" required /></label>
                    <label>How do we reach you?<input name="contact" placeholder="Email or Telegram" required /></label>
                    <label>What do you need?<select name="service" defaultValue="identity"><option value="identity">Brand identity</option><option value="campaign">Campaign / art direction</option><option value="digital">Website / digital</option><option value="full">Full launch</option></select></label>
                    <button type="submit">Send the brief <b>↗</b></button>
                    <small>By sending this form you agree to personal data processing.</small>
                  </form>
                </>
              ) : (
                <div className="brief-success" aria-live="polite"><span>✓</span><p>Brief received</p><h2>WE&apos;LL BE<br />IN <i>TOUCH.</i></h2><button type="button" onClick={() => setBriefOpen(false)}>Back to the work →</button></div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
