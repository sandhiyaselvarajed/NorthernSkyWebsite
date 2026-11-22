import { contact } from "../data/site";

export default function WhatsAppButton() {
  if (!contact.whatsapp) return null;
  const text = encodeURIComponent("Hello Northern Sky, I'd like to discuss a project.");
  return (
    <a className="wa-btn" href={`https://wa.me/${contact.whatsapp}?text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-2.2c1.9 1 4 1.6 6 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 23c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4a10.4 10.4 0 1 1 8.9 4.8zm5.7-7.8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.5 8.5 0 0 1-4.2-3.7c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.6 3.6 0 0 0-1.1 2.6 6.2 6.2 0 0 0 1.3 3.3 14.3 14.3 0 0 0 5.5 4.8c2 .9 2.8.9 3.8.8.6-.1 1.8-.8 2.1-1.5s.3-1.4.2-1.5-.3-.2-.6-.3z"/></svg>
    </a>
  );
}
