# NEUK SynBio website

A plain static website. No build step, no framework, no dependencies.
It works if you double-click `index.html` on your own computer.

---

## 1. Adding a new event (the thing you will do most often)

1. Open `assets/js/data.js`
2. Find `const EVENTS = [` near the top
3. Copy a whole block, from `{` to `},`, and paste it just after the `[`
4. Change the details. The date must be `"YYYY-MM-DD"`
5. Save, refresh the page

The site works out on its own whether an event is upcoming or past, sorts it,
and puts the soonest one in the highlighted strip at the top of the homepage.
You never edit HTML.

Speakers, committee members, institutions, sponsors and the headline figures
all work the same way, further down the same file.

**If the page goes blank**, you have deleted a comma, a quote or a bracket.
Undo the change and try again.

---

## 2. Each event gets its own page

Every live event automatically gets a shareable web address built from its
title, for example:

```
event.html?id=innovating-biology-tools-and-pathways-to-the-future
```

That page shows the speakers, venue, summary, an "add to calendar" button and,
if you fill them in, links to the recording and the slides:

```
recordingUrl: "https://youtube.com/watch?v=..."
resourcesUrl: "https://drive.google.com/..."
```

Post the event page link on X or Instagram rather than the events page — people
land on the thing you are actually promoting.

Note: the address comes from the title, so changing a title after you have
shared it will break the old link.

---

## 3. Luma registration

Your events already live on Luma, so the site uses Luma for sign-ups rather
than running its own.

Add the Luma event ID to an event in `data.js`:

```
registerUrl: "https://luma.com/4s3vq2id",
lumaEventId: "evt-EkB0pL6KADpcMTx",
```

Every "Register" button for that event then opens Luma's registration pop-up
on top of your page, so nobody leaves the site. `registerUrl` is the plain
link and is used if you leave `lumaEventId` blank.

**Where to find the ID:** on Luma, open the event, go to Manage Event, then
the More tab, then Embed. Luma shows a code snippet with the ID in it.

The Luma script only loads on pages that actually have a register button, so
pages without upcoming events stay fast.

**Optional — your whole calendar:** if you want the full Luma calendar on the
events page, get the embed URL from your Luma calendar and put it in `SITE`:

```
lumaCalendarEmbed: "https://..."
```

Leave it empty and that section does not appear at all.

---

## 4. Connecting the forms

The mailing list box and the enquiry form need a free form service.

1. Sign up at **formspree.io** and create a form
2. They give you a URL like `https://formspree.io/f/abcdwxyz`
3. Put the last part in `assets/js/data.js`:

```
formspreeId: "abcdwxyz"
```

Until you do that, both forms open the visitor's email client instead, and the
page says so. Nothing looks broken either way.

Formspree's free tier covers 50 submissions a month. If the mailing list
outgrows that, move the signup box to MailerLite and leave the enquiry form
on Formspree.

---

## 5. The draft flag

Add `draft: true` to any entry and it disappears from the live site while
staying in the file:

```
{
  date: "",
  title: "Synthetic living materials",
  ...
  draft: true        <-- hidden from visitors
}
```

Twelve past events are currently drafted because we could not confirm their
dates from your social posts. As you confirm each date, add it and delete the
`draft: true` line. The event appears in the archive immediately.

---

## 6. Things that hide themselves

The site never shows an empty box or a placeholder:

| If this is empty | The site shows |
|---|---|
| No upcoming events | "The next season is being scheduled" plus a mailing-list prompt |
| `TEAM` list | The committee section on About disappears entirely |
| `SITE.linkedin` | The LinkedIn link vanishes from the footer |
| A speaker's date | The card renders without a date line |
| `SITE.formspreeId` | Forms open an email instead, and say so |
| `recordingUrl` | The recording panel is not shown on the event page |
| `SITE.lumaCalendarEmbed` | The calendar section on Events disappears |
| `lumaEventId` | The button links straight to Luma instead of popping up |

So you can publish today without anything looking unfinished.

---

## 7. Changing the contact email

`assets/js/data.js`, top of the file, in `SITE`. Change it once and every
`mailto:` link across all eight pages updates.

**The current address may not work.** `neuksynbio.com` has lapsed, so
`info@neuksynbio.com` is likely dead. Put a working address here before you
publish — a committee member's university address is fine for now.

---

## 8. Changing colours or fonts

`assets/css/styles.css`, the `:root` block at the very top. Change a hex code
there and it updates everywhere.

---

## 9. Files

```
index.html          Homepage
about.html          Mission, format, committee, governance, EDI
events.html         Events and speaker archive
event.html          Single event page (one file serves every event)
network.html        Universities and research centres
partners.html       Funders, sponsors, how to sponsor
get-involved.html   Mailing list, propose a talk, host, committee, industry
privacy.html        DRAFT — must be reviewed before publishing
accessibility.html  DRAFT — check the claims are true for your venues
404.html            Shown for broken links
robots.txt          Lets search engines index the site
wrangler.jsonc      Tells Cloudflare this is a static site (deployment only)
.assetsignore       Keeps the README out of the published website

assets/css/         Stylesheet — colours and fonts at the top
assets/js/data.js   ALL CONTENT — this is the file you edit
assets/js/site.js   Rendering logic — leave this alone
assets/img/         Photos, logos, favicon
```

---

## 10. Deploying (no domain needed)

Cloudflare now offers two routes. Either works; the Workers one is what most
new accounts see.

**Route A — Workers (the screen that says "Set up your application")**

`wrangler.jsonc` in this folder is what makes this work. It tells Cloudflare
the repository is a plain static site with no build step. Make sure it is
uploaded to GitHub along with everything else.

1. Sign up free at cloudflare.com
2. Compute / Workers & Pages, then Create, then Import a repository
3. Authorise GitHub and pick `neuk-synbio`
4. Leave **Build command** empty
5. Leave **Deploy command** as `npx wrangler deploy`
6. Click Deploy

**Route B — Pages (if your dashboard still offers it)**

Workers & Pages, then Create, then the **Pages** tab, then Connect to Git.
Framework preset **None**, build command empty, output directory `/`.
`wrangler.jsonc` is ignored on this route and does no harm.



1. Sign up free at **github.com**. Create a new **public** repository called
   `neuk-synbio`.
2. On the repo page choose "uploading an existing file" and drag in the
   *contents* of this folder — not the folder itself. Commit.
3. Sign up free at **cloudflare.com**.
   Workers & Pages → Create → Pages → Connect to Git → authorise GitHub →
   pick `neuk-synbio`.
4. Framework preset: **None**. Build command: **leave empty**.
   Output directory: **/**. Save and deploy.
5. About 30 seconds later the site is live at `neuk-synbio.pages.dev`.

That address is free, permanent, fast and has HTTPS. It is good enough to put
in a funding application.

**Later, when you have a domain:** Cloudflare → your Pages project → Custom
domains → add it. Two clicks, no rebuild, and the `.pages.dev` address keeps
working alongside it.

To update the site after that: edit `data.js` on GitHub in the browser (click
the file, then the pencil icon), commit, and the live site updates in under a
minute.

---

## 11. Before you publish

Search `assets/js/data.js` for **CHECK** and resolve each one:

- Twelve past events need dates
- Confirm which companies sponsored and which were just speakers' employers
- Replace the headline figures with real numbers from your records
- Set a working contact email in `SITE`
- Fill in `TEAM` once you have committee names
- Have `privacy.html` reviewed by a university data protection office
- Connect Formspree so the forms actually send
