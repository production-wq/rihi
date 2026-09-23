/**
 * legal.ts
 *
 * Privacy policy and terms copy.
 *
 * -----------------------------------------------------------------------------
 * THIS IS NOT LEGAL ADVICE AND IT IS NOT A SUBSTITUTE FOR COUNSEL
 * -----------------------------------------------------------------------------
 * These pages describe how the site actually works, which is the useful part
 * and the part that has to be accurate. They are written for a referral
 * operation that collects a lead form and passes it to contractors, with no
 * database, no accounts, and no payment processing.
 *
 * Before launch, a lawyer needs to review both, and the placeholders for the
 * operating entity, contact address, and governing state have to be filled in.
 * They are marked below. Shipping with them unfilled would be a real problem,
 * so they are written to be conspicuous rather than to blend in.
 */

export const LEGAL_PLACEHOLDER = "[OPERATING ENTITY, TO BE COMPLETED BEFORE LAUNCH]";

export const PRIVACY = {
  headline: "Privacy policy",
  updated: "Last reviewed September 2026",
  intro:
    "This policy covers what this site collects, why, and who it goes to. The short version: the quote form is the only place we collect anything, and it goes to contractors matched to your project and nowhere else.",
  sections: [
    {
      heading: "What we collect",
      body: [
        "The quote form collects your name, phone number, email address, town, state, the service category you selected, and whatever you write in the project description. Nothing else on this site collects personal information. There is no account to create and no login.",
        "The cost tools run entirely in your browser. What you enter into a calculator is not sent to us, and it is not stored anywhere. If you carry a result through to the quote form, the details appear in the form where you can see them and edit them before sending.",
      ],
    },
    {
      heading: "Who it goes to",
      body: [
        "Your details go to contractors in the network whose service area covers your town and who work in the category you selected. They contact you directly. We do not sell your information, and we do not pass it to anyone who is not a contractor matched to your project.",
        "If a contractor you were matched with takes on your project, they may pay us a referral fee. You are never charged anything.",
      ],
    },
    {
      heading: "Analytics",
      body: [
        "We use Google Analytics to understand which pages people find useful. It records page views, approximate location at the city level, referring site, and device type. It does not receive your name, phone number, or email address, and we do not connect analytics data to a submitted form.",
        "There is no chat widget, no session recording, no heat mapping, and no advertising pixel on this site.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Once your details have gone to a matched contractor, that contractor holds their own copy and their own policy applies, so you would need to contact them separately.",
        "Depending on where you live, you may have specific rights over your personal information. We honour those requests regardless of where you live, because there is no reason to make it complicated.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about this policy go to ${LEGAL_PLACEHOLDER}.`,
      ],
    },
  ],
};

export const TERMS = {
  headline: "Terms and conditions",
  updated: "Last reviewed September 2026",
  intro:
    "The most important term is the first one, and it is the reason this site can tell you things a contractor cannot.",
  sections: [
    {
      heading: "This is a referral service, not a contractor",
      body: [
        "This site does not perform home improvement work. It does not employ trades, hold contractor licenses, or carry contractor insurance. It connects homeowners with independent contractors who do.",
        "Every contractor in the network is an independent business, licensed and insured in the states where they operate. Any contract for work is between you and that contractor. We are not a party to it, we do not warrant the work, and we do not supervise it.",
      ],
    },
    {
      heading: "Cost figures on this site",
      body: [
        "Every price range, calculator output, and cost guide on this site is an estimate for this market based on typical scope. None of it is a quote, and none of it is binding on us or on any contractor. Actual pricing depends on your house, the access, and what turns up once work starts.",
        "Cost data is reviewed periodically and the review date is shown in the cost tools. Figures change. Where a state program, rebate, or tax credit is mentioned, terms change frequently and you should confirm current ones directly with that program before relying on them.",
      ],
    },
    {
      heading: "Using the quote form",
      body: [
        "Submitting the form asks us to match your project with contractors who work in your town. It does not commit you to anything. There is no cost, and no obligation to hire anyone you hear from.",
        "Submit details that are accurate and that are yours to submit. Do not submit someone else's contact details without their knowledge.",
      ],
    },
    {
      heading: "Content on this site",
      body: [
        "The written content, cost data, and page structure on this site belong to us. The photographs illustrating finished work are illustrative renderings of the kinds of housing described, not photographs of projects performed by this business or by any named contractor.",
        "We try hard to be accurate about building practice, codes, and costs, and we correct things when we get them wrong. None of it is a substitute for a contractor looking at your actual house, and none of it is engineering or legal advice.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "We provide this site as it is. We are not liable for the work of any contractor, for any contract you enter into, or for decisions made on the basis of an estimate published here.",
        `These terms are governed by the laws of ${LEGAL_PLACEHOLDER}.`,
      ],
    },
  ],
};
