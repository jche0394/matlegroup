import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { BrandStory } from "./components/BrandStory";
import { Services } from "./components/Services";
import { HomeServices } from "./components/Services/HomeServices";
import { HowItWorks } from "./components/HowItWorks";
import { PullQuote } from "./components/PullQuote";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FirstVisitModal } from "./components/FirstVisitModal/FirstVisitModal";
import { FaqPage } from "./pages/Faq/FaqPage";

function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <HomeServices />
      <HowItWorks />
      <PullQuote />
      <Contact />
    </main>
  );
}

function ServicesPage() {
  return (
    <main>
      <Services />
      <Contact />
    </main>
  );
}

function HowItWorksPage() {
  return <main />;
}

function ContactPage() {
  return <main />;
}

function PrivacyPage() {
  return (
    <main>
      <section style={{ padding: "140px 60px 100px", maxWidth: 960, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 42,
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "var(--stone)", fontStyle: "italic", fontSize: 14 }}>
            Last updated: April 25, 2025
          </p>
        </header>

        <div style={{ color: "var(--walnut)", lineHeight: 1.8, fontWeight: 300, fontSize: 15 }}>
          <p style={{ marginBottom: 24 }}>
            Mantle Home Management ("we", "our", or "us") is committed to protecting your
            privacy in the context of in‑home and property management. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when we
            manage your home, coordinate contractors, and provide related services. We
            operate in Melbourne, Victoria, Australia, and comply with the Privacy Act
            1988 (Cth) and the Australian Privacy Principles. Please read this privacy
            policy carefully. If you do not agree with the terms of this privacy policy,
            please do not provide us with your personal information or engage our
            services.
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: 16 }}>
              Because we manage real homes and properties, we collect information that you
              provide directly to us and information we generate in the course of looking
              after your home:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Personal Information:</strong> Your name, contact details (email,
                phone number), billing details and any information you provide when
                contacting us, requesting a consultation or engaging us.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Property Information:</strong> Address of the property or
                properties we manage, access instructions (for example key locations,
                alarm codes as agreed), maintenance history, photos or videos taken for
                inspection and reporting, and notes about preferences (for example, which
                rooms or items require special care).
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Contractor and Supplier Information:</strong> Details of trades,
                suppliers and other providers we coordinate on your behalf in connection
                with your property.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Website and Technical Data:</strong> Limited technical
                information, such as IP address and basic analytics, when you visit our
                website or complete an online form.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: 16 }}>
              We use the information we collect primarily so we can safely and efficiently
              manage your home:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Service Delivery:</strong> To respond to enquiries, assess your
                needs, and deliver in‑home and property management services, including
                inspections, maintenance coordination and project management.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Home and Contractor Coordination:</strong> To schedule and manage
                contractors and suppliers, provide them with the information they need to
                attend your property, and to keep records of works completed.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Website and Service Improvement:</strong> To understand how our
                website and services are used so we can refine and improve them over
                time.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Client Communication:</strong> To send you updates about activity
                at your property, upcoming visits, inspection reports and, where you
                agree, occasional updates about our services. You can opt out of
                non‑essential marketing at any time.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Legal and Compliance:</strong> To comply with our legal
                obligations and to protect our rights, property and safety, and that of
                our clients and partners.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              3. Disclosure of Information
            </h2>
            <p style={{ marginBottom: 16 }}>
              We may share your information in the following circumstances:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Service Providers:</strong> With trusted third parties who help us
                deliver our services (for example, IT providers, cloud storage, accounting
                and contractor management tools). These providers are required to handle
                your information securely and only for the purposes we specify.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Contractors and Trades:</strong> With contractors and trades
                engaged to work on your property, to the extent necessary for them to
                perform the agreed works.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Legal Requirements:</strong> Where required to do so by law or in
                response to a valid legal request.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Business Transactions:</strong> In connection with a merger, sale
                or reorganisation of our business, subject to appropriate confidentiality
                protections.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              4. Data Security
            </h2>
            <p style={{ marginBottom: 16 }}>
              We take reasonable steps to protect your personal information from misuse,
              interference, loss, unauthorised access, modification or disclosure. This
              includes using secure systems, limiting access to authorised personnel and
              working only with reputable service providers.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage
              is completely secure. While we strive to protect your personal information,
              we cannot guarantee its absolute security.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              5. Your Rights
            </h2>
            <p style={{ marginBottom: 16 }}>
              Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you
              may have rights to:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                request access to the personal information we hold about you
              </li>
              <li style={{ marginBottom: 8 }}>
                request correction of any inaccurate, out-of-date or incomplete
                information
              </li>
              <li style={{ marginBottom: 8 }}>
                make a complaint if you believe we have breached your privacy rights.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              6. Contact Us
            </h2>
            <p style={{ marginBottom: 8 }}>
              If you have any questions about this Privacy Policy or how we handle your
              personal information, please contact us at:
            </p>
            <p style={{ marginBottom: 4 }}>
              <strong>Mantle Home Management</strong>
            </p>
            <p style={{ marginBottom: 4 }}>Melbourne, Victoria, Australia</p>
            <p style={{ marginBottom: 4 }}>Email: hello@mantlegroup.com.au</p>
          </section>
        </div>
      </section>
    </main>
  );
}

function TermsPage() {
  return (
    <main>
      <section style={{ padding: "140px 60px 100px", maxWidth: 960, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 42,
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Terms of Service
          </h1>
          <p style={{ color: "var(--stone)", fontStyle: "italic", fontSize: 14 }}>
            Last updated: April 25, 2025
          </p>
        </header>

        <div style={{ color: "var(--walnut)", lineHeight: 1.8, fontWeight: 300, fontSize: 15 }}>
          <p style={{ marginBottom: 24 }}>
            These Terms of Service ("Terms") govern your access to and use of the services
            provided by Mantle Home Management ("we", "our" or "us"), a home and property
            management service operating in Melbourne, Victoria, Australia. By engaging us,
            requesting our services or continuing to work with us, you agree to be bound by
            these Terms. If you do not agree to these Terms, please do not use our services.
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              1. Services We Provide
            </h2>
            <p style={{ marginBottom: 16 }}>
              Mantle provides home and property management services, which may include:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                coordination of trades and contractors for repairs, maintenance and small
                projects
              </li>
              <li style={{ marginBottom: 8 }}>
                renovation and project oversight on your behalf (acting as your
                representative with builders and trades)
              </li>
              <li style={{ marginBottom: 8 }}>
                lifestyle home maintenance, including routine checks and preventative
                maintenance planning
              </li>
              <li style={{ marginBottom: 8 }}>
                absentee property management, including inspections, reporting and
                response to issues while you are away.
              </li>
            </ul>
            <p style={{ marginTop: 16 }}>
              The specific scope of services, inclusions and exclusions for your home will
              be set out in a separate proposal, service schedule or engagement letter
              provided to you before work commences.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              2. Your Responsibilities
            </h2>
            <p style={{ marginBottom: 16 }}>
              To allow us to safely and effectively manage your home, you agree to:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                provide accurate and complete information about your property and any
                relevant history or risks
              </li>
              <li style={{ marginBottom: 8 }}>
                provide safe access to the property for our team and agreed contractors,
                including keys, alarm codes or access instructions as needed
              </li>
              <li style={{ marginBottom: 8 }}>
                maintain appropriate home and contents insurance for your property
              </li>
              <li style={{ marginBottom: 8 }}>
                review and approve recommended works, quotes and budgets in a timely
                manner
              </li>
              <li style={{ marginBottom: 8 }}>
                pay our invoices and any pass‑through contractor costs in line with the
                agreed payment terms.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              3. Fees and Payments
            </h2>
            <p style={{ marginBottom: 16 }}>
              Our fees and payment structure will be outlined in your engagement
              documentation and may include retainers, fixed‑fee project work or
              percentage‑based management fees. Unless otherwise stated:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                management or retainer fees are payable monthly in advance
              </li>
              <li style={{ marginBottom: 8 }}>
                project or renovation management fees may be staged across milestones
              </li>
              <li style={{ marginBottom: 8 }}>
                contractor and supplier costs are either paid directly by you or on‑charged
                by us, as agreed.
              </li>
            </ul>
            <p style={{ marginTop: 16 }}>
              Late payment may result in suspension of non‑essential services until
              accounts are brought up to date. Nothing in these Terms limits your rights
              under Australian Consumer Law.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              4. Contractors and Third Parties
            </h2>
            <p style={{ marginBottom: 16 }}>
              Where we recommend or coordinate contractors and suppliers:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                we take care to work with reputable trades and service providers, but they
                operate as independent businesses and remain responsible for their own
                work, warranties and insurances
              </li>
              <li style={{ marginBottom: 8 }}>
                your contract for works is typically with the contractor directly, unless
                otherwise agreed in writing
              </li>
              <li style={{ marginBottom: 8 }}>
                we are not liable for losses arising solely from a contractor&apos;s acts
                or omissions, but we will assist you in working with them to resolve any
                issues where reasonably possible.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              5. Liability
            </h2>
            <p style={{ marginBottom: 16 }}>
              We will provide our services with reasonable care and skill. To the maximum
              extent permitted by law:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                our total liability to you for any claim arising out of our services is
                limited to the amount of fees you have paid us for the relevant service in
                the 12 months before the claim arose
              </li>
              <li style={{ marginBottom: 8 }}>
                we are not liable for indirect or consequential loss, including loss of
                profit, loss of enjoyment or loss of opportunity
              </li>
              <li style={{ marginBottom: 8 }}>
                nothing in these Terms excludes any rights or remedies you may have under
                the Australian Consumer Law that cannot be excluded.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              6. Termination
            </h2>
            <p style={{ marginBottom: 16 }}>
              Either party may end an ongoing engagement by providing the notice period set
              out in the service agreement, or if none is stated, by giving 30 days&apos;
              written notice. On termination:
            </p>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>
                you must pay for all services performed and contractor costs incurred up
                to the effective date of termination
              </li>
              <li style={{ marginBottom: 8 }}>
                we will provide a handover of key information and documentation reasonably
                required for you to continue managing your property.
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 24,
                marginTop: 16,
                marginBottom: 12,
                color: "var(--black)",
              }}
            >
              7. Governing Law and Contact
            </h2>
            <p style={{ marginBottom: 16 }}>
              These Terms are governed by the laws of Victoria, Australia. Any disputes
              will be subject to the non‑exclusive jurisdiction of the courts of
              Victoria.
            </p>
            <p>
              If you have any questions about these Terms or how they apply to your
              engagement with us, please contact Mantle Home Management at
              {" "}
              <strong>hello@mantlegroup.com.au</strong>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

export function App() {
  return (
    <>
      <Nav />
      <FirstVisitModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
         <Route path="/privacy" element={<PrivacyPage />} />
         <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <Footer />
      <Analytics />
    </>
  );
}
