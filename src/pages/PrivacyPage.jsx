import PageHeader from "../sections/PageHeader";
import { company, contact, legal } from "../data/site";

const UPDATED = "22 November 2026";

export default function PrivacyPage() {
  const a = contact.address;
  return (
    <>
      <PageHeader eyebrow="Privacy notice" title="How we handle your information." lead={`Last updated ${UPDATED}.`} />
      <section className="section">
        <div className="container legal-text">
          <p>{company.legalName} (“Northern Sky”, “we”) respects your privacy. This notice explains what personal information we collect through this website, why, and the choices you have. It is written with India&apos;s Digital Personal Data Protection Act, 2023 in mind.</p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Enquiries:</strong> the name, company, email, phone number, project location, capacity and message you enter in our contact form, or send us by email, phone or WhatsApp.</li>
            <li><strong>Job applications:</strong> your CV and the details in it, when you email it to us.</li>
          </ul>
          <p>We do not use advertising or tracking cookies, and we do not run analytics on this website. Like any website, our hosting provider may keep basic technical logs (such as IP address and browser type) for security.</p>

          <h2>Why we use it</h2>
          <ul>
            <li>To reply to your enquiry and discuss your project.</li>
            <li>To assess job applications and contact candidates.</li>
            <li>To meet legal, tax and record-keeping obligations.</li>
          </ul>
          <p>We use your information only for these purposes. We do not sell or rent it, and we do not send marketing messages unless you ask us to.</p>

          <h2>Who we share it with</h2>
          <p>Only with services we need to run our business, such as our email provider and, when you send the contact form, the form service that delivers it to our inbox. If you contact us on WhatsApp, WhatsApp&apos;s own privacy policy also applies. We may disclose information if the law requires it.</p>
          <p>This website loads fonts from Google Fonts and is hosted on GitHub Pages; these providers may receive your IP address when you visit.</p>

          <h2>How long we keep it</h2>
          <p>We keep enquiry and application details only as long as needed for the purpose above, and then delete them, unless the law requires us to keep them longer.</p>

          <h2>Your choices</h2>
          <p>You can ask us to see, correct or delete the personal information we hold about you, or withdraw your consent, at any time. Email us and we will respond within a reasonable time.</p>

          <h2>Contact</h2>
          <p>
            {company.legalName}<br />
            {a.street}, {a.city} {a.postalCode}, {a.state}<br />
            Email: <a href={`mailto:${contact.email}`}>{contact.email}</a> · Phone: <a href={`tel:${contact.phones[0].replace(/\s/g, "")}`}>{contact.phones[0]}</a><br />
            GSTIN {legal.gstin}
          </p>
          <p className="legal-small">We may update this notice from time to time. The date at the top shows the latest version.</p>
        </div>
      </section>
    </>
  );
}
