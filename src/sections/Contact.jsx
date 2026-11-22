import { useState } from "react";
import { contact, company, social, legal } from "../data/site";
import { useReveal } from "../lib/useReveal";
import logo from "../assets/logo-ns.png";

const TYPES = ["Solar EPC (turnkey)", "Solar installation & commissioning", "Transmission lines", "Civil & site works", "Fencing & boundary walls", "Wind or battery-storage civil", "Other"];

export default function Contact() {
  const ref = useReveal();
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // spam honeypot

    if (!contact.web3formsKey) {
      // No form service configured yet: open the visitor's email app instead.
      const body = `Name: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\nProject type: ${data.type}\nLocation / size: ${data.site}\n\n${data.message}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry – ${data.company || data.name}`)}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: contact.web3formsKey, subject: `Website enquiry – ${data.company || data.name}`, ...data }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const a = contact.address;
  const socials = Object.entries(social).filter(([, url]) => url);

  return (
    <section id="contact" className="section section--dark contact" ref={ref}>
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow eyebrow--light">Get in touch</p>
          <h2>Planning a renewable project? Let&apos;s talk.</h2>
          <p className="lead">Tell us the site, capacity and scope.</p>
          <ul className="contact-list">
            <li><span>Email</span><div className="stack"><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`mailto:${contact.projectsEmail}`}>{contact.projectsEmail}</a></div></li>
            <li><span>Phone</span><div className="stack">{contact.phones.map((p) => (<a key={p} href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>))}</div></li>
            <li><span>WhatsApp</span><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat with us</a></li>
            {social.linkedin && <li><span>LinkedIn</span><a href={social.linkedin} target="_blank" rel="noopener noreferrer">Follow Northern Sky</a></li>}
            <li>
              <span>Head office</span>
              <address>
                {company.legalName}<br />{a.street},<br />{a.city} – {a.postalCode}, {a.state}
              </address>
            </li>
            <li><span>Also in</span>{company.offices.slice(1).join(" · ")}</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          {state === "sent" ? (
            <div className="form-done" role="status">
              <h3>Thank you.</h3>
              <p>{contact.web3formsKey ? "Your enquiry has reached our team. We'll be in touch shortly." : "Your email app should have opened with the details filled in. Just press send."}</p>
              <button type="button" className="btn btn-ghost" onClick={() => setState("idle")}>Send another</button>
            </div>
          ) : (
            <>
              <div className="field-row">
                <label>Name<input name="name" required autoComplete="name" /></label>
                <label>Company<input name="company" autoComplete="organization" /></label>
              </div>
              <div className="field-row">
                <label>Email<input name="email" type="email" required autoComplete="email" /></label>
                <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              </div>
              <label>Project type
                <select name="type" defaultValue={TYPES[0]}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              <label>Site location &amp; capacity<input name="site" placeholder="e.g. Bhuj, Gujarat · 100 MW" /></label>
              <label>Message<textarea name="message" rows="4" /></label>
              <input type="checkbox" name="botcheck" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              {state === "error" && <p className="form-error" role="alert">Something went wrong. Please email {contact.email} directly.</p>}
            </>
          )}
        </form>
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="footer-logo"><img src={logo} alt="" width="26" height="34" /></span>
            <span className="brand-text">
              <span className="brand-name">Northern Sky</span>
              <span className="brand-sub">Developers LLP</span>
            </span>
          </div>
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
            <p>GSTIN {legal.gstin} · Udyam {legal.udyam}{legal.dpiit && " · DPIIT-recognised startup"}</p>
          </div>
          {socials.length > 0 && (
            <ul className="socials">
              {socials.map(([k, url]) => (
                <li key={k}><a href={url} target="_blank" rel="noopener noreferrer">{({ google: "Google Maps", linkedin: "LinkedIn" })[k] || k[0].toUpperCase() + k.slice(1)}</a></li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </section>
  );
}
