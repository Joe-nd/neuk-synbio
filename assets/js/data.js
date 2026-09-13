/* ===========================================================================
   NEUK SynBio — CONTENT FILE
   ---------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD A NEW EVENT OR SPEAKER.

   Rules:
     - Keep the punctuation exactly as it is: quotes, colons, commas, braces.
     - Dates must be written "YYYY-MM-DD" (e.g. 2026-03-12).
     - A date of "" means "we don't know" — the entry still shows, but
       without a date and at the bottom of the list.
     - The site works out automatically what is upcoming and what is past.
     - If the page goes blank, you deleted a comma or a bracket. Undo it.
     - Add  draft: true  to any entry to hide it from the live site while
       you check the details. Remove the line to publish it.
     - Every live event gets its own shareable page automatically, built
       from its title. Changing a title changes that page's web address.

   ---------------------------------------------------------------------------
   ITEMS MARKED "CHECK" WERE RECONSTRUCTED FROM YOUR INSTAGRAM AND X POSTS.
   Verify names, titles and affiliations before you go live.
   =========================================================================== */


/* ---------------------------------------------------------------------------
   SITE SETTINGS
   Change these in ONE place and they update across every page.
   --------------------------------------------------------------------------- */

const SITE = {
  /* CHECK: the neuksynbio.com domain has lapsed, so this address may no longer
     work. Put a working address here before you publish — a committee member's
     university address is fine as an interim. */
  contactEmail: "info@neuksynbio.com",

  twitter:   "https://x.com/neuk_synbio",
  instagram: "https://www.instagram.com/neuksynbio/",
  linkedin:  "",     /* leave "" and the link is hidden */

  /* Formspree form endpoint. Sign up free at formspree.io, create a form,
     and paste the ID here (the bit after /f/ in the URL they give you).
     While this is empty, the forms turn into email links instead. */
  formspreeId: "",

  /* Optional. To show your whole Luma calendar on the events page, open your
     Luma calendar, find the embed option, and paste the src URL it gives you
     here. Leave "" and the section simply does not appear. */
  lumaCalendarEmbed: ""
};


/* ---------------------------------------------------------------------------
   EVENTS
   To add one, copy a whole { ... } block, paste it at the top of the list,
   and change the details.
   --------------------------------------------------------------------------- */

const EVENTS = [

  /* --- UPCOMING ----------------------------------------------------------
     lumaEventId turns the register button into a Luma pop-up so people sign
     up without leaving the site. Find the ID on Luma: Manage Event > More >
     Embed. registerUrl is the plain link, used as a fallback.             */
  {
     image: "assets/img/26.10.07.png",
    date: "2026-10-07",
    title: "NEUK Synthetic Biology Seminar I",
    speaker: "Dr Angelo Joshua A. Victoria",
    affiliation: "Yusuf Hamied Department of Chemistry, University of Cambridge",
    venue: "Stephenson Building, Room 1.016, Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    time: "12:00",
    registerUrl: "https://luma.com/4s3vq2id",
    lumaEventId: "evt-EkB0pL6KADpcMTx",
    summary: "Engineering living photoanodes: genetic tools and strain diversity for cyanobacterial bioelectrochemistry. Cyanobacteria can act as living photoanodes in biophotoelectrochemical systems, but getting there means solving bottlenecks in genetic manipulation and extracellular electron transfer. This talk covers both: new genetic tools for strain engineering, and a search through natural cyanobacterial diversity for strains with better electron transfer. Free lunch and drinks. Spaces are limited.",
    recordingUrl: "",
    resourcesUrl: ""
  },

  /* --- PAST EVENTS -------------------------------------------------------- */
  {
    date: "2025-03-27",
    title: "From biomaterials to bioinformatics: engineering functional materials and intracellular circuits",
    speaker: "Gregory Pollard and Hyeyun Jung",
    affiliation: "University of Bristol and Newcastle University",
    venue: "Devonshire Building G21/22, Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Bio-inspired self-healing materials, and moving DNA strand-displacement computing from the test tube into living cells.",
    recordingUrl: "",
    resourcesUrl: ""
  },
  {
    date: "2025-02-27",
    title: "Precision and automation in synthetic biology: advancing detection and data networks",
    speaker: "Dr Bradley Brown, Dr Matthew Crowther and Matt Burridge",
    affiliation: "InvenireX and Newcastle University",
    venue: "Devonshire Building G21/22, Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Real-time nucleic acid detection instrumentation, and how lab automation and network science can streamline biological data. Sponsored by InvenireX.",
    recordingUrl: "",
    resourcesUrl: ""
  },
  {
    date: "2025-01-23",
    title: "Innovating biology: tools and pathways to the future",
    speaker: "Dr Gilly Wang and Dr Ciaran Kelly",
    affiliation: "GitLife Biotech and Northumbria University",
    venue: "Devonshire Building G21/22, Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Version control for genetic engineering, and practical solutions to bottlenecks in engineering biology.",
    recordingUrl: "",
    resourcesUrl: ""
  },
  {
    date: "2024-11-21",
    title: "Empowering today's scientists to become tomorrow's entrepreneurs",
    speaker: "Emma Riley and Emma Corbin",
    affiliation: "Gains.Bio and MarraBio",
    venue: "Cassie Building LT 2.32, Newcastle University",
    city: "Newcastle",
    type: "Careers and industry",
    registerUrl: "",
    summary: "Two founders on the route from research to a biotech startup.",
    recordingUrl: "",
    resourcesUrl: ""
  },
  {
    date: "2024-04-18",
    title: "How can we effectively valorise and visualise biological data for innovation?",
    speaker: "",
    affiliation: "",
    venue: "Devonshire Building G21/22, Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "",
    recordingUrl: "",
    resourcesUrl: ""
  },

  /* --- CHECK: these ran, but we could not confirm the date from your posts.
     Add the correct date and they will slot into the archive automatically. */
  {
    date: "",
    title: "Synthetic living materials",
    speaker: "Professor Chao Zhong",
    affiliation: "Shenzhen Institute of Synthetic Biology",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Sponsored by Merck.",
    draft: true
  },
  {
    date: "",
    title: "Reformatting and reprogramming proteins for therapeutics",
    speaker: "Professor Mark Howarth",
    affiliation: "University of Cambridge",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Studying and controlling the immune system using bacterial superglue.",
    draft: true
  },
  {
    date: "",
    title: "Data driven biology",
    speaker: "Professor Tom Ellis and Dr Tom Howard",
    affiliation: "Imperial College London and Newcastle University",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Sponsored by New England Biolabs and Azenta.",
    draft: true
  },
  {
    date: "",
    title: "Biosolutions for sustainable manufacturing",
    speaker: "Professor Louise Horsfall",
    affiliation: "University of Edinburgh",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "",
    draft: true
  },
  {
    date: "",
    title: "Engineering biology at the nanoscale",
    speaker: "Dr Jonathan Heddle",
    affiliation: "Centre for Programmable Biological Matter, Durham University",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "",
    draft: true
  },
  {
    date: "",
    title: "High-value chemicals and synthetic organelles",
    speaker: "Dr Mauro Rinaldi",
    affiliation: "University of Hull",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Supported by the Biochemical Society Seminar Series Grant.",
    draft: true
  },
  {
    date: "",
    title: "Making genetics and biotechnology accessible through flower design",
    speaker: "Dr Nicholas Desnoyer",
    affiliation: "The Sainsbury Laboratory, Norwich",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "",
    draft: true
  },
  {
    date: "",
    title: "Next generation tools for biotechnology",
    speaker: "Dr Alice Banks and Josh Loh",
    affiliation: "NunaBio and Newcastle University",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Sustainable DNA synthesis, and predicting neutral genomic integration sites for microbial engineering.",
    draft: true
  },
  {
    date: "",
    title: "Women in science: journeys and careers",
    speaker: "Hania Fiaz, Louise Amor-Seabrooke, Dr Patricia Lopez and Ewelina Bien",
    affiliation: "Panel chaired by Ariadne Vidal",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Panel",
    registerUrl: "",
    summary: "Four careers in science, and what shaped them.",
    draft: true
  },
  {
    date: "",
    title: "Biotechnology in the field",
    speaker: "Ariadne Vidal and Katie Convey",
    affiliation: "Newcastle University",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Biohydrogen from agricultural waste, and smart materials for plant virus surveillance.",
    draft: true
  },
  {
    date: "",
    title: "Antimicrobial resistance and bioprinting",
    speaker: "Zoe Bell and Millie Haslington",
    affiliation: "Newcastle University",
    venue: "Newcastle University",
    city: "Newcastle",
    type: "Seminar",
    registerUrl: "",
    summary: "Natural antimicrobials for clinical use, and from bioink to 3D in vitro models.",
    draft: true
  },
  {
    date: "",
    title: "Synthetic biology networking dinner",
    speaker: "",
    affiliation: "",
    venue: "Bamboo Pan Asian, Newcastle",
    city: "Newcastle",
    type: "Networking",
    registerUrl: "",
    summary: "",
    draft: true
  }
];


/* ---------------------------------------------------------------------------
   FEATURED SPEAKERS
   These appear on the homepage and the speaker archive. Keep this to the
   speakers you most want a funder or a new attendee to see.
   "photo" is optional — put images in assets/img/ and write the path here.
   --------------------------------------------------------------------------- */

const SPEAKERS = [
  {
    name: "Professor Tom Ellis",
    role: "Professor of Synthetic Genome Engineering, Imperial College London",
    talk: "Data driven biology",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Professor Mark Howarth",
    role: "Professor of Pharmacology, University of Cambridge",
    talk: "Studying and controlling the immune system using bacterial superglue",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Professor Louise Horsfall",
    role: "Professor of Sustainable Biotechnology, University of Edinburgh",
    talk: "Biosolutions for sustainable manufacturing",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Professor Chao Zhong",
    role: "Shenzhen Institute of Synthetic Biology",
    talk: "Synthetic living materials",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Dr Jonathan Heddle",
    role: "Centre for Programmable Biological Matter, Durham University",
    talk: "Engineering biology at the nanoscale",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Dr Ciaran Kelly",
    role: "Assistant Professor of Applied Sciences, Northumbria University",
    talk: "Solutions in engineering biology and biotechnology",
    date: "2025-01-23",
    photo: "",
    link: ""
  },
  {
    name: "Dr Bradley Brown",
    role: "Head of Engineering, InvenireX",
    talk: "Instrumentation for real-time nucleic acid detection",
    date: "2025-02-27",
    photo: "",
    link: ""
  },
  {
    name: "Dr Gilly Wang",
    role: "GitLife Biotech",
    talk: "Genetic engineering with version control",
    date: "2025-01-23",
    photo: "",
    link: ""
  },
  {
    name: "Dr Alice Banks",
    role: "NunaBio",
    talk: "Sustainable DNA synthesis for the next generation of biotechnology",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Dr Tom Howard",
    role: "Reader in Synthetic Biology, Newcastle University",
    talk: "Computational enzyme engineering for biomass breakdown",
    date: "",
    photo: "",
    link: ""
  },
  {
    name: "Emma Riley and Emma Corbin",
    role: "Founders, Gains.Bio and MarraBio",
    talk: "Empowering today's scientists to become tomorrow's entrepreneurs",
    date: "2024-11-21",
    photo: "",
    link: ""
  },
  {
    name: "Dr Mauro Rinaldi",
    role: "University of Hull",
    talk: "High-value chemicals and synthetic organelles",
    date: "",
    photo: "",
    link: ""
  }
];


/* ---------------------------------------------------------------------------
   ORGANISING COMMITTEE
   While this list is empty the committee section on the About page is hidden
   automatically — no placeholder cards go live. Fill it in when you have the
   names, ideally with at least one person per partner institution.
   --------------------------------------------------------------------------- */

/* CHECK: these three are listed as hosts on your Luma event. Add their real
   job titles and institutions, and anyone missing. */
const TEAM = [
  { name: "Leela Ghimire",     role: "Organising committee", does: "", photo: "", link: "" },
  { name: "Bartosz Witek",     role: "Organising committee", does: "", photo: "", link: "" },
  { name: "Joseph Neil-Dwyer", role: "Organising committee", does: "", photo: "", link: "" }
];


/* ---------------------------------------------------------------------------
   INSTITUTIONS in the network
   Change "note" honestly — do not call somewhere a partner before it is one.
   --------------------------------------------------------------------------- */

const INSTITUTIONS = [
  { name: "Newcastle University",     note: "Founding institution and current host" },
  { name: "Northumbria University",   note: "Speakers and attendees" },
  { name: "Durham University",        note: "Speakers and attendees" },
  { name: "University of Sunderland", note: "Joining 2026" },
  { name: "Teesside University",      note: "Joining 2026" }
];


/* ---------------------------------------------------------------------------
   PARTNERS, FUNDERS AND SPONSORS
   tier must be exactly "Funder", "Sponsor" or "Partner".
   logo: optional path, e.g. "assets/img/logo-name.svg"

   CHECK: some of these were read off event posters. A company logo on a
   poster sometimes means "sponsor" and sometimes means "this is where the
   speaker works". Confirm each one before publishing.
   --------------------------------------------------------------------------- */

const PARTNERS = [
  { name: "BBSRC",                     tier: "Funder",  logo: "", url: "https://www.ukri.org/councils/bbsrc/" },
  { name: "The Biochemical Society",   tier: "Funder",  logo: "", url: "https://www.biochemistry.org/" },
  
   { name: "Northstar Ventures",      tier: "sponser",  logo: "", url: "https://www.northstarventures.co.uk/" },
  { name: "JuniperVC",                 tier: "Sponsor", logo: "", url: "https://www.junipervc.com/" },

];


/* ---------------------------------------------------------------------------
   HEADLINE FIGURES  (update after each term — funders read these first)
   CHECK: these are estimates from your public posts. Replace with real
   numbers from your Eventbrite exports and sign-in sheets.
   --------------------------------------------------------------------------- */

const FIGURES = [
  { n: "2019",   label: "Running continuously since" },
  { n: "25+",    label: "Speakers hosted from across the UK and abroad" },
  { n: "1,000+", label: "Researchers and students in the NEUK community" },
  { n: "8",      label: "Companies that have spoken at or sponsored a seminar" }
];
