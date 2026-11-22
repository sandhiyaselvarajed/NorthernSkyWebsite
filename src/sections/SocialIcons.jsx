// Round brand-style icon links (LinkedIn, WhatsApp, Google Maps, phone, email).
import { contact, social, mapsUrl } from "../data/site";

const P = {
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.03-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21H9z",
  whatsapp: "M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z",
  maps: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
  phone: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z",
  email: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z",
};

export default function SocialIcons() {
  const items = [
    social.linkedin && { k: "linkedin", href: social.linkedin, label: "Northern Sky on LinkedIn", ext: true },
    contact.whatsapp && { k: "whatsapp", href: `https://wa.me/${contact.whatsapp}`, label: "Chat on WhatsApp", ext: true },
    { k: "maps", href: social.google || mapsUrl, label: "Find us on Google Maps", ext: true },
    { k: "phone", href: `tel:${contact.phones[0].replace(/\s/g, "")}`, label: `Call ${contact.phones[0]}` },
    { k: "email", href: `mailto:${contact.email}`, label: `Email ${contact.email}` },
  ].filter(Boolean);
  return (
    <ul className="social-icons">
      {items.map((i) => (
        <li key={i.k}>
          <a className={`si si--${i.k}`} href={i.href} aria-label={i.label} title={i.label} {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d={P[i.k]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
