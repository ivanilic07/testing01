"use client";

import { useEffect } from "react";

export default function ActiveRehabPage() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    const sectionIds = [
      "hero",
      "start",
      "sta-nudimo",
      "ukljuceno",
      "usluge",
      "zakazivanje",
      "iskustva",
      "video",
      "faq",
      "galerija",
    ];
    const navLinks = Array.from(document.querySelectorAll(".nav a"));
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && id) {
            navLinks.forEach((link) =>
              link.classList.toggle("active", link.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) activeObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <style>{`
        :root { --bg:#111317; --bg-elev:#11161d; --brand:#3B82F6; --brand-dark:#1E40AF; --glass:rgba(255,255,255,0.06); --stroke:rgba(255,255,255,0.08); --text:#e6e8eb; --muted:rgba(230,232,235,0.75); --nav-h:64px; --radius:14px; --shadow:0 10px 30px rgba(0,0,0,0.35); }
        body:where(.active-rehab) { margin:0; color:var(--text); background:var(--bg); }
        html { scroll-behavior:smooth; }
        .overlay { background:linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35)); padding:calc(40px + var(--nav-h)) 20px 80px; text-align:left; min-height:100vh; }
        h1 { font-size:56px; margin-bottom:12px; font-weight:800; letter-spacing:-0.02em; }
        p { font-size:18px; line-height:1.7; max-width:720px; margin:0 auto 40px; font-weight:400; }
        header { position:fixed; top:0; left:0; right:0; height:var(--nav-h); backdrop-filter:saturate(180%) blur(10px); background:rgba(9,13,18,0.6); border-bottom:1px solid var(--stroke); z-index:1000; }
        .nav { max-width:1100px; margin:0 auto; height:100%; display:flex; align-items:center; justify-content:space-between; padding:0 16px; }
        .nav ul { list-style:none; display:flex; gap:18px; margin:0; padding:0; }
        .nav a { color:var(--muted); text-decoration:none; font-weight:600; opacity:1; padding:8px 10px; border-radius:8px; transition:background .2s ease, color .2s ease; }
        .nav a:hover, .nav a.active { color:#fff; background:rgba(59,130,246,0.12); }
        .brand { display:flex; align-items:center; gap:10px; color:var(--text); font-weight:700; letter-spacing:.5px; text-decoration:none; }
        .brand-dot { width:10px; height:10px; border-radius:50%; background:var(--brand); box-shadow:0 0 0 6px rgba(59,130,246,0.15); }
        .hero { max-width:1100px; margin:0 auto 30px; display:grid; grid-template-columns:1.2fr .8fr; align-items:center; gap:24px; }
        .hero p { color:var(--muted); }
        .eyebrow { display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid rgba(59,130,246,0.35); border-radius:999px; background:rgba(59,130,246,0.08); color:#cfe0ff; font-size:12px; font-weight:600; letter-spacing:.02em; margin-bottom:14px; }
        .highlight { background:linear-gradient(90deg, #60A5FA, #3B82F6 60%, #1E40AF); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .hero-cta { display:flex; gap:12px; flex-wrap:wrap; margin-top:20px; }
        .btn, .button, button { padding:10px; font-size:16px; border-radius:8px; border:none; cursor:pointer; font-weight:500; }
        .button { display:inline-block; text-decoration:none; background:linear-gradient(180deg, var(--brand), #2F6FE0); color:#fff; box-shadow:0 8px 20px rgba(59,130,246,0.35); transition:transform .15s ease, box-shadow .2s ease, background .2s ease; }
        .button:hover { background:linear-gradient(180deg, #4C8CF7, var(--brand)); box-shadow:0 12px 26px rgba(59,130,246,0.45); transform:translateY(-1px); }
        .btn-secondary { background:transparent; border:1px solid rgba(59,130,246,0.35); color:#cfe0ff; }
        .btn-secondary:hover { border-color:rgba(59,130,246,0.6); background:rgba(59,130,246,0.06); }
        .hero-figure { display:flex; align-items:end; justify-content:center; position:relative; }
        .hero-figure img { width:100%; max-width:480px; height:auto; object-fit:contain; filter:drop-shadow(0 30px 40px rgba(0,0,0,0.6)); mix-blend-mode:multiply; isolation:isolate; border-radius:16px; }
        @keyframes slideInRight { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
        .enter-from-right { animation: slideInRight 7000ms ease-out 150ms both; }
        .testimonials { display:flex; gap:12px; overflow:auto; padding-bottom:6px; scroll-snap-type:x mandatory; }
        .section { margin:60px auto; max-width:1100px; padding:20px; background-color:var(--glass); border:1px solid var(--stroke); border-radius:var(--radius); box-shadow:var(--shadow); text-align:left; }
        .section h2 { font-size:30px; margin-bottom:20px; font-weight:800; letter-spacing:-0.01em; display:inline-flex; align-items:center; gap:10px; position:relative; }
        .section h2:after { content:""; display:inline-block; width:36px; height:4px; background:linear-gradient(90deg, var(--brand), transparent); border-radius:2px; opacity:.9; }
        form { display:flex; flex-direction:column; gap:15px; }
        input[type="date"], input[type="text"], input[type="email"] { width:100%; padding:10px; font-size:16px; border-radius:8px; border:none; }
        iframe { width:100%; height:400px; border:none; border-radius:10px; }
        .services { max-width:1100px; margin:40px auto 0; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .card { background:linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); border:1px solid var(--stroke); border-radius:var(--radius); overflow:hidden; transition:transform .18s ease, box-shadow .2s ease, border-color .2s ease; }
        .card:hover { transform:translateY(-3px); box-shadow:0 16px 36px rgba(0,0,0,0.45); border-color:rgba(59,130,246,0.35); }
        .card img { width:100%; height:200px; object-fit:cover; display:block; }
        .card .card-body { padding:18px; }
        .card h3 { margin:0 0 8px; font-size:20px; }
        .card p { margin:0; font-size:15px; color:var(--muted); }
        .steps { max-width:1100px; margin:40px auto 0; display:grid; grid-template-columns:repeat(5,1fr); gap:12px; }
        .step { background:var(--glass); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; }
        .offer { max-width:1100px; margin:40px auto 0; display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
        .included { max-width:1100px; margin:40px auto 0; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .included .inc { background:var(--glass); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; }
        .faq { max-width:900px; margin:40px auto 0; }
        .faq details { background:var(--glass); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px 16px; margin-bottom:10px; }
        .gallery { max-width:1100px; margin:40px auto 0; display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .gallery img { width:100%; height:220px; object-fit:cover; display:block; border-radius:10px; border:1px solid var(--stroke); transition:transform .18s ease, box-shadow .2s ease, border-color .2s ease; }
        .gallery img:hover { transform:translateY(-3px); box-shadow:0 16px 36px rgba(0,0,0,0.45); border-color:rgba(59,130,246,0.35); }
        .reveal { opacity:0; transform:translateY(18px); transition:opacity 600ms ease, transform 600ms ease; }
        .reveal.show { opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
        @media (max-width: 600px) {
          h1 { font-size:40px; }
          p { font-size:18px; }
          .section { margin:30px auto; padding:16px; }
          .section h2 { font-size:24px; }
          iframe { height:300px; }
          .hero { grid-template-columns:1fr; text-align:center; }
          .hero-cta { justify-content:center; }
          .services, .steps, .offer, .included, .gallery { grid-template-columns:1fr; }
        }
      `}</style>

      <header>
        <nav className="nav">
          <a href="#hero" className="brand"><span className="brand-dot"></span> Active Rehab</a>
          <ul>
            <li><a href="#start">Start</a></li>
            <li><a href="#sta-nudimo">Nudimo</a></li>
            <li><a href="#ukljuceno">Uključeno</a></li>
            <li><a href="#usluge">Usluge</a></li>
            <li><a href="#zakazivanje">Zakazivanje</a></li>
            <li><a href="#iskustva">Iskustva</a></li>
            <li><a href="#video">Video</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#galerija">Galerija</a></li>
          </ul>
        </nav>
      </header>
      <div className="overlay">
        <section className="hero reveal" id="hero">
          <div>
            <div className="eyebrow">Evidence-based coaching</div>
            <h1><span className="highlight">Rehab i treninzi</span><br />za snažnije, zdravije telo</h1>
            <p>Personalizovani planovi rehabilitacije i treninga uz stručnu podršku. Jasne smernice, održiv napredak i rešenja po tvojoj meri.</p>
            <div className="hero-cta">
              <a className="btn-secondary button" href="#usluge">Pogledaj usluge</a>
              <a className="button" href="#zakazivanje">Zakaži termin</a>
            </div>
          </div>
          <div className="hero-figure reveal">
            <img className="enter-from-right" src="/active-rehab/veljko.png" alt="veljko active rehab" />
          </div>
        </section>

        <div className="section reveal" id="trust">
          <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap",justifyContent:"center",maxWidth:1100,margin:"0 auto"}}>
            <span style={{color:"var(--muted)",fontWeight:600}}>Poverenje klijenata</span>
            <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(59,130,246,0.6)"}}></span>
            <span style={{color:"var(--muted)"}}>Rehab • Coaching • Resilience</span>
            <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(59,130,246,0.6)"}}></span>
            <span style={{color:"var(--muted)"}}>Evidence-based</span>
          </div>
        </div>

        <div className="section reveal" id="start">
          <h2>🚀 Start Here</h2>
          <div className="steps">
            <div className="step"><h3>Korak 1 — Upoznaj nas</h3><p>Pročitaj ko smo i kako radimo. Pogledaj video i blog savete.</p></div>
            <div className="step"><h3>Korak 2 — Da li smo dobar fit?</h3><p>Od rekreativaca do sportista — plan prilagođavamo tvojim ciljevima.</p></div>
            <div className="step"><h3>Korak 3 — Šta da očekuješ</h3><p>Jasan plan, smernice i progres koji prati tvoj tempo.</p></div>
            <div className="step"><h3>Korak 4 — Posvećenost</h3><p>Mi dajemo strukturu i podršku, ti donosiš kontinuitet.</p></div>
            <div className="step"><h3>Korak 5 — Prijava</h3><p>Popuni formu za zakazivanje i kreni — spremni smo.</p></div>
          </div>
        </div>

        <div className="section reveal" id="zakazivanje">
          <h2>📅 Zakazivanje termina</h2>
          <form action="https://formsubmit.co/ivan.ilic.1998@gmail.com" method="POST">
            <label htmlFor="name">Ime i prezime</label>
            <input id="name" type="text" name="name" placeholder="Vaše ime" autoComplete="name" required />
            <label htmlFor="email">Email adresa</label>
            <input id="email" type="email" name="email" placeholder="Vaš email" autoComplete="email" required />
            <label htmlFor="datum">Željeni datum</label>
            <input id="datum" type="date" name="datum" required />
            <input type="hidden" name="_subject" value="Nova rezervacija termina" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{display:"none"}} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input type="hidden" name="_next" value="/active-rehab#hvala" />
            <button type="submit" className="button">Zakaži termin</button>
          </form>
        </div>

        <div className="section reveal" id="sta-nudimo">
          <h2>🧭 Šta nudimo</h2>
          <div className="offer">
            <article className="card"><div className="card-body"><h3>Konsultacije</h3><p>Online ili uživo sesija: analiza stanja, smernice, početni plan.</p><a className="button" href="#zakazivanje">Zakaži konsultaciju</a></div></article>
            <article className="card"><div className="card-body"><h3>Vođeni coaching</h3><p>Nedeljni programi, stalna komunikacija i postepena progresija.</p><a className="button" href="#zakazivanje">Započni program</a></div></article>
          </div>
        </div>

        <div className="section reveal" id="ukljuceno">
          <h2>📦 Šta je uključeno</h2>
          <div className="included">
            <div className="inc"><h3>Detaljna anamneza</h3><p>Pregled istorije i potreba pre početka rada.</p></div>
            <div className="inc"><h3>Procena pokreta</h3><p>Video/uživo analiza položaja i vežbi.</p></div>
            <div className="inc"><h3>Plan i progresija</h3><p>Jasne vežbe i progres praćen tvog oporavka.</p></div>
            <div className="inc"><h3>Video primeri</h3><p>Demonstracije vežbi i uputstva.</p></div>
            <div className="inc"><h3>Podrška</h3><p>Redovni check-in i prilagođavanje plana.</p></div>
            <div className="inc"><h3>Fokus na ciljeve</h3><p>Trening i rehabilitacija usmereni na rezultat.</p></div>
          </div>
        </div>

        <h2 className="section reveal" id="usluge">🧩 Usluge</h2>
        <div className="section" style={{background:"transparent", boxShadow:"none", border:"none", paddingTop:0}}>
          <div className="services" id="usluge-grid">
            <article className="card"><img src="/active-rehab/fizikalna-terapija.jpg" alt="Fizikalna terapija" /><div className="card-body"><h3>Fizikalna terapija</h3><p>Individualni tretmani za oporavak posle povreda i hroničnih bolova.</p></div></article>
            <article className="card"><img src="/active-rehab/personalni-trening.jpg" alt="Personalni treninzi" /><div className="card-body"><h3>Personalni treninzi</h3><p>Programi prilagođeni vašim ciljevima i mogućnostima uz stalni nadzor.</p></div></article>
            <article className="card"><img src="/active-rehab/ishrana.jpg" alt="Ishrana" /><div className="card-body"><h3>Ishrana</h3><p>Stručne smernice i planovi ishrane za bolji rezultat i zdravlje.</p></div></article>
          </div>
        </div>

        <div className="section reveal" id="iskustva">
          <h2>⭐ Iskustva korisnika</h2>
          <div className="testimonials">
            <article className="card" style={{minWidth:300,scrollSnapAlign:"start"}}><div className="card-body"><p>„Posle povrede kolena, vratio sam se treninzima brže nego što sam očekivao.“</p><p style={{marginTop:10,color:"#9fb6ff"}}>— Marko S.</p></div></article>
            <article className="card" style={{minWidth:300,scrollSnapAlign:"start"}}><div className="card-body"><p>„Stručni i puni razumevanja. Oporavak mi je bio lakši uz njihovu podršku.“</p><p style={{marginTop:10,color:"#9fb6ff"}}>— Jelena T.</p></div></article>
            <article className="card" style={{minWidth:300,scrollSnapAlign:"start"}}><div className="card-body"><p>„Kombinacija treninga i rehabilitacije je pun pogodak!“</p><p style={{marginTop:10,color:"#9fb6ff"}}>— Nemanja R.</p></div></article>
          </div>
        </div>

        <div className="section reveal" id="video">
          <h2>🎥 Edukativni video</h2>
          <iframe src="https://www.youtube.com/embed/i_ohtG0DKrw" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>

        <div className="section reveal" id="faq">
          <h2>❓ Česta pitanja</h2>
          <div className="faq">
            <details><summary>Radite li sa početnicima?</summary><p>Da. Plan prilagođavamo tvom nivou i ciljevima.</p></details>
            <details><summary>Da li je moguć online rad?</summary><p>Da. Konsultacije i coaching mogu biti potpuno online.</p></details>
            <details><summary>Koliko brzo se vide rezultati?</summary><p>Zavisi od ciljeva i kontinuiteta. Progres merimo svake nedelje.</p></details>
          </div>
        </div>

        <div className="section reveal" id="galerija">
          <h2>🖼️ Galerija</h2>
          <div className="gallery">
            <img className="reveal" src="/active-rehab/fizikalna-terapija.jpg" alt="Galerija 1" />
            <img className="reveal" src="/active-rehab/personalni-trening.jpg" alt="Galerija 2" />
            <img className="reveal" src="/active-rehab/ishrana.jpg" alt="Galerija 3" />
            <img className="reveal" src="/active-rehab/trening-1.jpg" alt="Galerija 4" />
            <img className="reveal" src="/active-rehab/trening-2.jpg" alt="Galerija 5" />
            <img className="reveal" src="/active-rehab/terapija-1.jpg" alt="Galerija 6" />
          </div>
        </div>

        <div id="hvala" className="section reveal" aria-live="polite">
          <h2>✅ Hvala na prijavi</h2>
          <p>Uspešno ste poslali zahtev za termin. Odgovorićemo vam u najkraćem roku.</p>
        </div>
      </div>
    </div>
  );
}


