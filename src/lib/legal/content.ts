/** Plain-language legal copy for Kleenoil India Pvt. Ltd. Review with counsel before publishing as final. */

export const LEGAL_ENTITY = {
  name: 'Kleenoil India Pvt. Ltd.',
  shortName: 'Kleenoil',
  jurisdiction: 'India',
  placeOfBusiness: 'Bangalore, Karnataka, India',
  contactPath: '/contact',
  privacyEmailPlaceholder: 'privacy@kleenoil.com',
};

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  footerNote: string;
};

export const COOKIE_POLICY: LegalDocument = {
  title: 'Cookie Policy',
  description: 'How Kleenoil India uses cookies and similar technologies on this website.',
  lastUpdated: '31 October 2026',
  intro: [
    `${LEGAL_ENTITY.name} (“Kleenoil”, “we”, “us”) operates this website. This Cookie Policy explains what cookies and similar technologies we use, why we use them, and the choices you have.`,
    'India’s Digital Personal Data Protection Act, 2023 (DPDP Act) regulates personal data. Cookies that process personal data (for example analytics identifiers) generally require a clear opt-in. Strictly necessary cookies that keep the site secure and working do not require separate consent.',
  ],
  sections: [
    {
      heading: 'What are cookies?',
      paragraphs: [
        'Cookies are small text files stored on your device. Similar technologies include local storage, pixels, and scripts that remember preferences or measure how the site is used.',
      ],
    },
    {
      heading: 'Cookies we use',
      paragraphs: [
        'We keep categories limited. We do not load advertising or social media tracking pixels on this site by default.',
      ],
      bullets: [
        'Strictly necessary — security headers, session integrity, form spam protection (honeypot / optional Turnstile), and remembering your cookie preferences. These stay on.',
        'Analytics (optional) — only if you opt in. When enabled and a measurement ID is configured, Google Analytics may set cookies to understand aggregate traffic (pages viewed, approximate location, device type). This is off until you choose “Accept analytics”.',
      ],
    },
    {
      heading: 'Third parties',
      paragraphs: [
        'If you enable analytics, Google may process measurement data under its terms. Media may be delivered from our content host (for example Cloudinary). Fonts are self-hosted via Next.js at build time and do not call Google Fonts in the browser.',
        'We do not embed third-party video players or marketing iframes on page load. Map visuals on this site are first-party graphics unless a page explicitly links you out to Google Maps.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        'On first visit you can accept necessary cookies only, or also enable analytics. You can change this anytime via “Cookie settings” in the site footer or by clearing site data for this domain. Withdrawing analytics consent stops new analytics loading; it does not erase historical reports already stored with the analytics provider.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `Questions about cookies or personal data: use the contact form at ${LEGAL_ENTITY.contactPath} or email ${LEGAL_ENTITY.privacyEmailPlaceholder} (update this address in your live privacy contacts if different).`,
      ],
    },
  ],
  footerNote:
    'This page is informational and does not replace advice from a qualified Indian lawyer. Confirm entity contacts, GSTIN/CIN, and processor list with counsel before treating this as final compliance documentation.',
};

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  description: 'How Kleenoil India collects, uses, and protects personal data on this website.',
  lastUpdated: '31 October 2026',
  intro: [
    `This Privacy Policy describes how ${LEGAL_ENTITY.name}, with place of business in ${LEGAL_ENTITY.placeOfBusiness}, processes personal data when you use this website or submit a form.`,
    'We aim to collect only what is needed to respond to enquiries, operate the site securely, and (only with your opt-in) measure aggregate traffic.',
  ],
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        `${LEGAL_ENTITY.name} is the data fiduciary for personal data collected through this website. For privacy requests, use ${LEGAL_ENTITY.contactPath} or ${LEGAL_ENTITY.privacyEmailPlaceholder}.`,
      ],
    },
    {
      heading: 'Personal data we collect',
      paragraphs: ['Depending on how you use the site, we may process:'],
      bullets: [
        'Identity and contact details you submit (name, work email, company, plant, industry, message) when requesting a consultation or applying for a role.',
        'Technical data needed for security (IP address truncated or logged by hosting, user agent, timestamps) and to prevent abuse.',
        'Optional analytics data if you consent (approximate usage metrics via Google Analytics).',
        'Cookie preference stored locally on your device.',
      ],
    },
    {
      heading: 'Purposes and lawful basis',
      paragraphs: [
        'Enquiry and job forms are processed to respond to your request (legitimate use / consent for the stated purpose under the DPDP Act). Necessary security processing supports fraud and abuse prevention. Analytics run only with your affirmative consent.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We use processors such as our hosting provider (Vercel), database host, email delivery, and media CDN to operate the site. They process data on our instructions. We do not sell personal data. We may disclose data if required by Indian law or to protect legal rights.',
      ],
    },
    {
      heading: 'Retention',
      paragraphs: [
        'Lead and job enquiry records are kept only as long as needed to handle the request and meet ordinary business or legal record needs, then deleted or anonymised. Analytics retention follows the analytics provider settings when analytics is enabled.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Under the DPDP Act you may have rights to access, correction, erasure, and withdrawal of consent where consent is the basis. Contact us using the details above. You may also complain to the Data Protection Board of India once the grievance mechanism applicable to your case is available.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This site is directed at industrial and business users. We do not knowingly collect personal data from children.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update this policy. The “Last updated” date at the top will change when we do. Material changes to analytics or form processing will be reflected in the cookie banner and this page.',
      ],
    },
  ],
  footerNote:
    'Have counsel confirm this policy against your actual processors, cross-border transfers, and HR/applicant handling before relying on it in disputes.',
};

export const TERMS_OF_USE: LegalDocument = {
  title: 'Terms of Use',
  description: 'Terms that apply when you browse or use the Kleenoil India website.',
  lastUpdated: '31 October 2026',
  intro: [
    `By using this website you agree to these Terms of Use with ${LEGAL_ENTITY.name}. If you do not agree, do not use the site.`,
  ],
  sections: [
    {
      heading: 'Informational content',
      paragraphs: [
        'Product descriptions, case studies, performance figures, and calculators on this site are for general information. They are not a warranty, guarantee, or offer unless we confirm that in a written contract. Actual results depend on oil condition, duty cycle, installation, and maintenance.',
      ],
    },
    {
      heading: 'No professional advice',
      paragraphs: [
        'Nothing on this site is engineering, legal, or safety advice for your specific plant. Always validate recommendations with qualified personnel and applicable standards.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'Site text, branding, product names, and original media belong to Kleenoil or its licensors. You may not copy them for commercial use without written permission. Third-party names and logos, if shown, remain the property of their owners and do not imply endorsement unless stated.',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'Do not misuse the site (scraping that harms availability, injecting malware, submitting false enquiries, or attempting unauthorised access). We may block abusive traffic.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by Indian law, Kleenoil is not liable for indirect or consequential loss arising from use of this website or reliance on its content. Nothing excludes liability that cannot be excluded under applicable law.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        `These terms are governed by the laws of India. Courts at ${LEGAL_ENTITY.placeOfBusiness} have exclusive jurisdiction, subject to mandatory consumer protections where they apply.`,
      ],
    },
  ],
  footerNote:
    'Commercial supply terms are set out in separate quotations and contracts, not on this website alone.',
};

export const COMPLIANCE_NOTICE: LegalDocument = {
  title: 'Compliance & advertising notice',
  description:
    'How Kleenoil approaches advertising claims, accessibility, and remaining compliance risks.',
  lastUpdated: '31 October 2026',
  intro: [
    'This page summarises how we try to keep marketing and the website aligned with Indian consumer and data rules. It is not a certificate of legal compliance.',
  ],
  sections: [
    {
      heading: 'Advertising and claims',
      paragraphs: [
        'Under the Consumer Protection Act, 2019 and ASCI guidance, we avoid fabricated testimonials and absolute superiority claims that we cannot substantiate. Performance numbers on the site should be read as illustrative or “up to / typical” results unless a published case study or contract says otherwise.',
        'Customer or brand names appear only when we have permission or a factual supply relationship documented by the business. Placeholder “trusted by” logo walls are not used as endorsements.',
      ],
    },
    {
      heading: 'Accessibility',
      paragraphs: [
        'We work toward usable keyboard access, visible focus, form labels, and image alternatives. If you find a barrier, tell us via the contact form so we can fix it.',
      ],
    },
    {
      heading: 'Images and copyright',
      paragraphs: [
        'Editors must only upload images Kleenoil owns or is licensed to use. Stock and AI-generated images need a clear licence record in the media library. Do not upload third-party logos without trademark permission.',
      ],
    },
    {
      heading: 'Data protection',
      paragraphs: [
        'See the Privacy Policy and Cookie Policy. Analytics are opt-in. Form data is used to respond to your request.',
      ],
    },
    {
      heading: 'Open items for business / counsel',
      paragraphs: ['Please confirm and update in CMS or with counsel:'],
      bullets: [
        'Registered office address, GSTIN, and CIN on public pages.',
        'Designated privacy contact email and grievance officer if required for your scale.',
        'Written permission file for every customer logo and named testimonial on the live site.',
        'Evidence file for ISO or other certification badges shown in marketing.',
        'Replacement of any remaining Unsplash or generated placeholder images with owned or licensed product photography.',
        'Whether Google Analytics (or any other tracker) should remain available at all; if unused, leave NEXT_PUBLIC_GA_MEASUREMENT_ID unset.',
      ],
    },
  ],
  footerNote:
    'Laws change. Re-review this site when DPDP Rules, ASCI codes, or your product claims change. This notice does not create warranties beyond your written contracts.',
};
