"use client";

import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const showWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <section className="hero" id="home">
        <Image className="hero-image" src={`${assetBase}/images/fashion-hero.jpg`} alt="Fashion-портрет кампании Altera" fill priority sizes="100vw" />
        <div className="hero-wash" aria-hidden="true" />
        <header className="header">
          <a className="brand" href="#home" aria-label="Altera — на главную"><b>ALT</b><i>●</i><b>ERA</b></a>
          <nav aria-label="Основная навигация"><a href="#studio">Studio</a><a href="#work">Work</a><a href="#services">Services</a></nav>
          <button type="button" className="round-menu" onClick={showWork} aria-label="Перейти к выбранным работам"><span /><span /></button>
        </header>

        <h1 className="hero-title" aria-label="Fashion and branding">
          <span>FASHION</span>
          <span><em>&amp;</em> BRANDING</span>
        </h1>
        <div className="hero-side"><span>Independent identity studio</span><span>Moscow · Berlin</span></div>
        <div className="hero-bottom">
          <p>We make fashion brands impossible to scroll past.</p>
          <button type="button" onClick={showWork}>View the work <b>↘</b></button>
          <span>Scroll to discover ↓</span>
        </div>
        <div className="issue-stamp"><small>AL/26</small><b>NEW<br />IDENTITY</b></div>
      </section>

      <section className="studio" id="studio">
        <div className="studio-head"><span>01 / The studio</span><p>Strategy, image and digital presence<br />as one unmistakable system.</p><span>Since 2018</span></div>
        <h2>ONE IDEA<br /><i>MANY FORMS</i></h2>
        <div className="studio-grid">
          <div className="studio-shot perfume"><Image src={`${assetBase}/images/fashion-about-1.jpg`} alt="Предметная съёмка парфюма" fill sizes="28vw" /></div>
          <div className="studio-copy">
            <span className="asterisk">✳</span>
            <p>We build fashion identities that live everywhere — from a campaign frame to an e-commerce experience.</p>
            <a href="#work">Meet the point of view <b>→</b></a>
          </div>
          <div className="studio-shot glasses"><Image src={`${assetBase}/images/fashion-about-2.jpg`} alt="Fashion-съёмка в цветных очках" fill sizes="28vw" /></div>
        </div>
        <div className="ticker" aria-hidden="true"><span>ART DIRECTION · BRAND IDENTITY · DIGITAL · CAMPAIGNS · </span><span>ART DIRECTION · BRAND IDENTITY · DIGITAL · CAMPAIGNS · </span></div>
      </section>

      <section className="work" id="work">
        <div className="work-head"><p>Selected work</p><h2>IMAGE IS<br /><i>THE MESSAGE</i></h2><span>2024—2026</span></div>
        <div className="projects">
          <article className="project project-wide">
            <div className="project-image"><Image src={`${assetBase}/images/fashion-project-1.jpg`} alt="Кампания After Water" fill sizes="(max-width: 760px) 100vw, 46vw" /></div>
            <div className="project-meta"><span>01 / Beauty campaign</span><h3>AFTER WATER</h3><b>↗</b></div>
          </article>
          <article className="project">
            <div className="project-image"><Image src={`${assetBase}/images/fashion-project-2.jpg`} alt="Кампания Skin No.04" fill sizes="(max-width: 760px) 100vw, 27vw" /></div>
            <div className="project-meta"><span>02 / Brand launch</span><h3>SKIN NO.04</h3><b>↗</b></div>
          </article>
          <article className="project">
            <div className="project-image"><Image src={`${assetBase}/images/fashion-project-3.jpg`} alt="Кампания Soft Armour" fill sizes="(max-width: 760px) 100vw, 27vw" /></div>
            <div className="project-meta"><span>03 / Editorial</span><h3>SOFT ARMOUR</h3><b>↗</b></div>
          </article>
        </div>
        <div className="services" id="services"><span>Brand strategy</span><span>Art direction</span><span>Digital experience</span><button type="button" data-vazuri-brief-open>Получить разбор ↗</button></div>
        <section className="case-study-note" aria-labelledby="case-study-title">
          <p>VAZURI / Concept case</p>
          <div>
            <h2 id="case-study-title">Editorial branding translated into a digital experience.</h2>
            <p>ALTERA demonstrates how brand strategy, campaign imagery and interface rhythm can form one coherent fashion platform.</p>
          </div>
          <nav aria-label="VAZURI case study links">
            <a href="https://vazuri.io/en#projects">More VAZURI cases ↗</a>
            <button type="button" data-vazuri-brief-open>Discuss a branding project ↗</button>
          </nav>
        </section>
        <footer><a className="brand" href="#home"><b>ALT</b><i>●</i><b>ERA</b></a><p>hello@altera-studio.com</p><p>Instagram · Behance · LinkedIn</p></footer>
      </section>

    </main>
  );
}
