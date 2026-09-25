"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [briefOpen, setBriefOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "error">("idle");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBriefOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!briefOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [briefOpen]);

  const openBrief = () => {
    setSent(false);
    setFormStatus("idle");
    setBriefOpen(true);
  };

  const submitBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormStatus("sending");

    try {
      await fetch("https://vazuri.ru/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "behance",
          website: data.get("website") || "",
          name: data.get("name") || "",
          contact: data.get("contact") || "",
          company: "",
          message: `Материалы по кейсу ALTERA. Интерес: ${data.get("service") || "разбор айдентики"}.`,
          consent: data.get("consent") || "",
        }),
      }).then((response) => {
        if (!response.ok) throw new Error("send_failed");
      });
      form.reset();
      setSent(true);
      setFormStatus("idle");
    } catch {
      setFormStatus("error");
    }
  };

  const showWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <section className="hero" id="home">
        <Image className="hero-image" src="/images/fashion-hero.jpg" alt="Fashion-портрет кампании Altera" fill priority sizes="100vw" />
        <div className="hero-wash" aria-hidden="true" />
        <header className="header">
          <a className="brand" href="#home" aria-label="Altera — на главную"><b>ALT</b><i>●</i><b>ERA</b></a>
          <nav aria-label="Основная навигация"><a href="#studio">Studio</a><a href="#work">Work</a><a href="#services">Services</a></nav>
          <button type="button" className="round-menu" onClick={showWork} aria-label="Перейти к выбранным работам"><span /><span /></button>
        </header>

        <div className="hero-title" aria-label="Fashion and branding">
          <span>FASHION</span>
          <span><em>&amp;</em> BRANDING</span>
        </div>
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
        <div className="services" id="services"><span>Brand strategy</span><span>Art direction</span><span>Digital experience</span><button type="button" onClick={openBrief}>Получить разбор ↗</button></div>
        <footer><a className="brand" href="#home"><b>ALT</b><i>●</i><b>ERA</b></a><p>hello@altera-studio.com</p><p>Instagram · Behance · LinkedIn</p></footer>
      </section>

      {briefOpen && (
        <div className="brief-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBriefOpen(false); }}>
          <section className="brief-card" role="dialog" aria-modal="true" aria-labelledby="brief-title">
            <button className="brief-close" type="button" onClick={() => setBriefOpen(false)} aria-label="Закрыть форму">×</button>
            <div className="brief-poster"><span>VAZURI / CASE STUDY</span><strong>НОВЫЙ<br />ВИЗУАЛЬНЫЙ<br /><i>ЯЗЫК.</i></strong><small>Айдентика · digital · worldwide</small></div>
            <div className="brief-form">
              {!sent ? (
                <>
                  <p>Материалы по кейсу / ALTERA</p>
                  <h2 id="brief-title">ПОЛУЧИТЬ<br /><i>РАЗБОР?</i></h2>
                  <form onSubmit={submitBrief}>
                    <p className="brief-lead">Отправим подборку приёмов из кейса и обсудим, как развить визуальный язык вашего бренда.</p>
                    <input className="website-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    <label>Ваше имя<input name="name" autoComplete="name" placeholder="Имя / компания" required /></label>
                    <label>Как с вами связаться?<input name="contact" autoComplete="email" placeholder="Email или Telegram" required /></label>
                    <label>Что вам интересно?<select name="service" defaultValue="Разбор айдентики"><option>Разбор айдентики</option><option>Сайт бренда</option><option>Кампания / арт-дирекшн</option><option>Полный запуск</option></select></label>
                    <label className="consent-row"><input name="consent" type="checkbox" required /><span>Соглашаюсь на обработку персональных данных</span></label>
                    <button type="submit">{formStatus === "sending" ? "Отправляем…" : "Получить материалы"} <b>↗</b></button>
                    {formStatus === "error" && <small className="form-error">Не удалось отправить. Напишите нам: hello@vazuri.ru</small>}
                    <small>Никакой рассылки — только материалы по кейсу и ответ по вашему запросу.</small>
                  </form>
                </>
              ) : (
                <div className="brief-success" aria-live="polite"><span>✓</span><p>Запрос принят</p><h2>МАТЕРИАЛЫ<br /><i>В ПУТИ.</i></h2><button type="button" onClick={() => setBriefOpen(false)}>Вернуться к проекту →</button></div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
