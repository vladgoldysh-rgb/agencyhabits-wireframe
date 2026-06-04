# AgencyHabits Wireframes — Update Brief for Antigravity
## Version 2.0 — June 2026
### Based on client ICP doc, objectives brief, and confirmed answers from Ivona

---

## OVERVIEW

This document contains all updates needed to bring the existing wireframes (v1.0) to v2.0. The site has been completely restructured based on client feedback. The core shift: from a media library ("explore everything") to a conversion funnel ("get value immediately, subscribe").

**Three things to update:**
1. Global elements (nav, footer, control bar)
2. Updated existing pages (content + structure changes)
3. New pages to build from scratch

The existing technical infrastructure (canvas scaler, device switcher, annotations system, sidebar nav, accordion, form simulation) stays as-is — only content and structure changes.

---

## PART 1 — GLOBAL CHANGES

---

### 1.1 Remove from control bar (index.html + app.js)

Remove these three buttons from the `.control-bar` entirely:
- `Show 12-Col Grid` button (`id="btn-grid"`, `onclick="toggleGrid()"`)
- `Show Annotations` button (`id="btn-annotations"`, `onclick="toggleAnnotations()"`)
- `Hide Section Notes` button (`id="btn-section-notes"`, `onclick="toggleSectionNotes()"`)

Keep only the device switcher buttons: Desktop (1440px) | Tablet (768px) | Phone (375px)

Also remove from `app.js`:
- `toggleGrid()` function
- `toggleAnnotations()` function
- `toggleSectionNotes()` function
- Remove `STATE.showGrid` and `STATE.showAnnotations` from STATE object
- Keep `STATE.showSectionNotes` but set to `true` permanently (right panel always visible)

In `index.html` remove the right annotation sidebar toggle — keep the sidebar always visible.

---

### 1.2 Update Navigation (getHeaderHTML in app.js)

**Replace current nav:**
```
Articles | Book Recommendations | Tools & Downloads | Podcast | About Us | Contact Us
+ Newsletter button + Foundation App button
```

**With new nav:**
```
Read | Listen | Gather | Tools | Newsletter
```

New `getHeaderHTML` function:
```javascript
function getHeaderHTML(activePageId) {
  return `
    <header class="wf-nav">
      <a href="#" class="wf-logo" onclick="navigateTo('home')">AgencyHabits</a>
      <nav class="wf-nav-links">
        <a href="#" class="wf-nav-link ${activePageId === 'read' ? 'active' : ''}" onclick="navigateTo('read')">Read</a>
        <a href="#" class="wf-nav-link ${activePageId === 'listen' ? 'active' : ''}" onclick="navigateTo('listen')">Listen</a>
        <a href="#" class="wf-nav-link ${activePageId === 'gather' ? 'active' : ''}" onclick="navigateTo('gather')">Gather</a>
        <a href="#" class="wf-nav-link ${activePageId === 'tools' ? 'active' : ''}" onclick="navigateTo('tools')">Tools</a>
        <a href="#" class="wf-nav-link ${activePageId === 'newsletter' ? 'active' : ''}" onclick="navigateTo('newsletter')">Newsletter</a>
      </nav>
    </header>
  `;
}
```

---

### 1.3 Update Footer (getFooterHTML in app.js)

Replace current single-column footer links with three-column layout:

```javascript
function getFooterHTML() {
  return `
    <footer class="wf-footer">
      <div class="wf-footer-top" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;">
        <div>
          <a href="#" class="wf-logo" onclick="navigateTo('home')" style="margin-bottom: 16px; display: inline-block;">AgencyHabits</a>
          <p class="wf-body-small" style="max-width: 280px; color: #666;">Learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies.</p>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Explore</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#" class="wf-footer-link" onclick="navigateTo('read')">Read</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('listen')">Listen</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('gather')">Gather</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('tools')">Tools</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('newsletter')">Newsletter</a>
          </div>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Resources</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#" class="wf-footer-link" onclick="navigateTo('start_here')">Start Here</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('about')">About</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('contact')">Contact</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('books')">Books</a>
          </div>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Barrel</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#" class="wf-footer-link">Barrel Holdings →</a>
            <a href="#" class="wf-footer-link">Sell your agency →</a>
          </div>
        </div>
      </div>
      <div class="wf-footer-bottom">
        <span class="wf-footer-copyright">© 2026 AgencyHabits. A Barrel Holdings product. All rights reserved.</span>
      </div>
    </footer>
  `;
}
```

---

### 1.4 Update Newsletter CTA band (getNewsletterCtaHTML)

Update headline to include ICP-specific signal:

```javascript
function getNewsletterCtaHTML() {
  return `
    <section class="wf-newsletter-cta-band">
      <div class="wf-newsletter-cta-content">
        <span class="wf-label">Weekly Newsletter</span>
        <h2 class="wf-h2" style="margin-bottom: 12px;">Join 1,500+ founders running $750K–$3M agencies.</h2>
        <p class="wf-body" style="margin-bottom: 24px;">Behind-the-scenes content every week. Bonus: Download the Agency Positioning 1-pager we share with our Barrel Holdings agency leaders.</p>
        <div class="wf-newsletter-form">
          <input type="email" class="wf-input-text" placeholder="Enter your email" />
          <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
        </div>
        <p class="wf-body-small" style="margin-top: 12px; color: #888;">No spam. Unsubscribe anytime. Integrated via kit.com.</p>
      </div>
    </section>
  `;
}
```

---

### 1.5 Update sidebar navigation (index.html)

Replace current sidebar menu with new page list:

```html
<nav class="sidebar-menu">
  <div class="menu-section-title">Core Pages</div>
  <div class="menu-item active" data-page-id="home" onclick="navigateTo('home')">
    <span class="menu-item-num">01</span> Home
  </div>
  <div class="menu-item" data-page-id="read" onclick="navigateTo('read')">
    <span class="menu-item-num">02</span> Read (Articles Hub)
  </div>
  <div class="menu-item" data-page-id="article_template" onclick="navigateTo('article_template')">
    <span class="menu-item-num">03</span> Article Detail Template
  </div>
  <div class="menu-item" data-page-id="listen" onclick="navigateTo('listen')">
    <span class="menu-item-num">04</span> Listen (Podcast Hub)
  </div>
  <div class="menu-item" data-page-id="episode_template" onclick="navigateTo('episode_template')">
    <span class="menu-item-num">05</span> Episode Detail Template
  </div>
  <div class="menu-item" data-page-id="gather" onclick="navigateTo('gather')">
    <span class="menu-item-num">06</span> Gather (Events Hub)
  </div>
  <div class="menu-item" data-page-id="tools" onclick="navigateTo('tools')">
    <span class="menu-item-num">07</span> Tools
  </div>
  <div class="menu-item" data-page-id="newsletter" onclick="navigateTo('newsletter')">
    <span class="menu-item-num">08</span> Newsletter
  </div>
  <div class="menu-item" data-page-id="about" onclick="navigateTo('about')">
    <span class="menu-item-num">09</span> About
  </div>
  <div class="menu-item" data-page-id="start_here" onclick="navigateTo('start_here')">
    <span class="menu-item-num">10</span> Start Here
  </div>

  <div class="menu-section-title">Tool Sub-Pages</div>
  <div class="menu-item" data-page-id="foundation" onclick="navigateTo('foundation')">
    <span class="menu-item-num">11</span> Foundation App
  </div>
  <div class="menu-item" data-page-id="kb" onclick="navigateTo('kb')">
    <span class="menu-item-num">12</span> Knowledge Base
  </div>
  <div class="menu-item" data-page-id="bizdev_collection" onclick="navigateTo('bizdev_collection')">
    <span class="menu-item-num">13</span> BD Collection
  </div>
  <div class="menu-item" data-page-id="exit_checklist" onclick="navigateTo('exit_checklist')">
    <span class="menu-item-num">14</span> Exit-Readiness Checklist
  </div>
  <div class="menu-item" data-page-id="goal_template" onclick="navigateTo('goal_template')">
    <span class="menu-item-num">15</span> Goal Setting Template
  </div>

  <div class="menu-section-title">Demoted Pages</div>
  <div class="menu-item" data-page-id="books" onclick="navigateTo('books')">
    <span class="menu-item-num">16</span> Books (footer only)
  </div>
  <div class="menu-item" data-page-id="contact" onclick="navigateTo('contact')">
    <span class="menu-item-num">17</span> Contact
  </div>
</nav>
```

---

## PART 2 — UPDATED EXISTING PAGES

---

### 2.1 HOME PAGE (page id: `home`)

**Update annotations:**
1. Navigation Bar — "New nav: Read · Listen · Gather · Tools · Newsletter. About moved to footer."
2. Hero Section — "ICP-specific reader signal. Single CTA: Start with the latest issue."
3. Barrel Portfolio Strip — "Trust signal. 6 agency logos from Barrel Holdings network."
4. Latest Section — "Three columns: last article / last podcast episode / next Knowledge Share."
5. Topics Tiles — "8 category tiles, each with category color gradient. Links to topic hubs on /read."
6. Tools & Ecosystem — "Ramp-style layout: Foundation App (large left) + BD Collection + Exit Checklist (two right)."
7. Newsletter CTA — "One CTA, at the bottom only. ICP-specific copy: $750K–$3M founders."
8. About Barrel — "Portfolio logos + founder photo + quiet acquisition link."

**Update page structure — replace current home render with:**

```
Section 1: Hero
- Label: "For agency founders doing $750K–$3M"
- H1: "Go behind the scenes of real agency businesses."
- Body: "AgencyHabits provides learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies."
- Single CTA button: "Start with the latest issue →" (navigateTo('newsletter'))
- Right: [Abstract gradient hero image placeholder]

Section 2: Barrel Portfolio Strip
- Small label: "Content drawn from operators running these agencies:"
- 6 logo placeholders in a row: Barrel | BX Studio | Matyx | AO2 | Vaulted Oak | Prima Mode
- Note annotation: "[Canonical portfolio list to be confirmed by client — some agencies may have exited]"

Section 3: Latest — Three Columns
- Column 1 (left): Last article card
  - Category tag: "Business Development"
  - Title: "How to Scale Agency BD Beyond the Founder"
  - Author: Peter Kang | Date | 6 min read
  - Excerpt: "Most agencies plateau at the founder's capacity for sales. Here's the system we use..."
  - CTA: "Read →" (navigateTo('article_template'))
- Column 2 (center): Last podcast episode
  - [Podcast cover placeholder]
  - Label: "Latest Episode"
  - EP.07 — "10 Essential Habits for Running a Successful Agency"
  - Duration: 44 min
  - Two buttons: "Listen on Spotify →" | "Watch on YouTube →"
  - Note annotation: "[Episode count TBD — client to confirm current number. Do not hardcode '5 episodes'.]"
- Column 3 (right): Next Knowledge Share
  - Label: "Next Knowledge Share"
  - Date: "June 2026"
  - Title: "Agency Positioning Deep Dive"
  - Format: "Online · 60 min · Free"
  - Attendee count: "39 registered"
  - CTA button: "Register →" (navigateTo('gather'))

Section 4: Topics — 8 tiles
- Label: "Explore by topic"
- 8 tiles in a grid (4+4 or 3+3+2):
  - Business Development (blue gradient)
  - Finance (gold gradient)
  - Leadership (purple gradient)
  - Positioning (teal gradient)
  - Clients (magenta gradient)
  - Talent (green gradient)
  - Delivery (orange gradient)
  - Marketing (red gradient)
- Each tile: category name + "→" + gradient background placeholder
- All navigate to read page

Section 5: Tools & Ecosystem — Ramp-style
- Label: "THE AGENCYHABITS PLATFORM ECOSYSTEM"
- H2: "Tools & Community"
- Layout: large left card (~60%) + two stacked right cards (~40%)
- Left card — Foundation App:
  - Label: "FOUNDATION APP"
  - Badge: "TAKES JUST ~60 SECONDS"
  - H3: "Build Your Agency's Strategic Foundation"
  - Body: "Define your positioning, ecosystem, ICP, and service offering. Simply paste your website URL. AI reads between the lines and does the rest."
  - CTA button: "Get Your Free Positioning Audit →" (navigateTo('foundation'))
- Right top card — BD Collection:
  - Label: "BD COLLECTION"
  - Badge: "$599"
  - H4: "Real proposals and SOWs from Barrel Holdings agencies."
  - CTA link: "Learn More →" (navigateTo('bizdev_collection'))
- Right bottom card — Exit Checklist:
  - Label: "EXIT-READINESS CHECKLIST"
  - Badge: "FREE"
  - H4: "See your agency the way a buyer would."
  - CTA link: "Download →" (navigateTo('exit_checklist'))

Section 6: Newsletter CTA
- Use getNewsletterCtaHTML() — one instance only

Section 7: About Barrel
- Label: "BUILT BY OPERATORS. FOR OPERATORS."
- H2: "We run agencies. This is what we've learned."
- Left: [Founder photo placeholder — Peter + Sei-Wook]
- Body: "AgencyHabits is published by the team at Barrel Holdings — a portfolio of six agency businesses. Everything on this site comes from operators currently running the same plays."
- Portfolio grid: 6 logo placeholders with one-liner each
  - Barrel — CPG Commerce & Shopify
  - BX Studio — B2B Websites & Marketing
  - Matyx — Home Services Digital Marketing
  - AO2 — Amazon and Retail Media
  - Vaulted Oak — Web Development & Support
  - Prima Mode — Health & Beauty Amazon
- Note annotation: "[Portfolio list to be confirmed by client]"
- Small quiet text link: "Thinking about selling your agency? →"
```

---

### 2.2 READ PAGE — Articles Hub (new page id: `read`, replaces `articles`)

This replaces the old articles listing. Structure is editorial hub in the style of Ramp Blog — not a flat list.

**Annotations:**
1. Search Bar — "Global search across all articles. Uses existing Framer search index."
2. Featured Article Carousel — "Editorial pick, not algorithmic. Rotates 3–5 featured articles."
3. Category Sections — "8 sections, one per topic. Each shows 3 articles + View all → link to topic hub."
4. Category Order — "Ordered by ICP priority: BD → Finance → Leadership → Positioning → Clients → Talent → Delivery → Marketing."
5. Category Gradients — "Each category has its own color gradient used as article cover. No per-article images needed."
6. Newsletter CTA — "Single CTA at bottom of page."

**Page structure:**

```
Header: H1: "Practical thinking for agency operators."
Search bar (right-aligned): [Search articles... placeholder]

Featured Article Carousel:
- Large card spanning full width
- [Large gradient placeholder — Business Development blue]
- Category: "Business Development"
- Title: "How to Scale Agency BD Beyond the Founder"
- Author: Peter Kang | Apr 28, 2026 | 6 min read
- Excerpt: "Most agencies plateau at the founder's capacity for business development..."
- CTA: "Read Article →"
- Carousel dots below (5 dots)

Category Section 1 — Business Development:
- Section header: "Business Development" (large) + "View all →" (right, navigateTo('topic_bd'))
- 3 article cards in a row, each:
  - [Blue gradient cover placeholder]
  - Label: "BUSINESS DEVELOPMENT"
  - Title (from article list below)
  - Author + Date
  - CTA: "Read →"
- Articles: 
  1. How to Scale Agency BD Beyond the Founder — Peter Kang — Apr 28, 2026
  2. The Client Pruning Framework — Apr 14, 2026
  3. What Does a Client Actually Buy When They Hire You? — Mar 17, 2026

Category Section 2 — Finance:
- Header: "Finance" + "View all →"
- 3 cards with gold gradient covers
- Articles:
  1. Agency Cash Flow: What the P&L Isn't Telling You — Mar 31, 2026
  2. Reversing Your Agency's Eroding Profits — Jan 20, 2026
  3. Are You Calculating Your Agency's Profits Correctly? — Dec 15, 2025

Category Section 3 — Leadership:
- Header: "Leadership" + "View all →"
- 3 cards with purple gradient covers
- Articles:
  1. Specializing Requires Commitment — Jan 6, 2026
  2. The Org Chart Exercise Every Agency Founder Should Do — Nov 2025
  3. Mind the Bottom — Oct 2025

Category Section 4 — Positioning:
- Header: "Positioning" + "View all →"
- 3 cards with teal gradient covers
- Articles:
  1. How to Define Your Agency's ICP (Beyond "B2B SaaS") — Peter Kang — May 12, 2026
  2. The Three Agency Ecosystem Archetypes — Mar 3, 2026
  3. Specialization vs. Positioning — Feb 2026

Category Section 5 — Clients:
- Header: "Clients" + "View all →"
- 3 cards with magenta gradient covers
- Articles:
  1. The Client Pruning Framework — Apr 14, 2026
  2. What Does a Client Actually Buy When They Hire You? — Mar 17, 2026
  3. Client Experience vs. Quality Work — Dec 2025

Category Sections 6–8 (Talent, Delivery, Marketing):
- Same structure, 3 cards each
- Use [Gradient placeholder] for covers
- Use placeholder article titles from existing content

Newsletter CTA at bottom.
```

---

### 2.3 ARTICLE DETAIL TEMPLATE (page id: `article_template`)

Major update — add all new elements from client brief.

**Annotations:**
1. TL;DR Block — "Max 3 bullets. Lets time-constrained founder scan before reading."
2. Sticky TOC — "Auto-generated from H2 headings. Right rail on desktop."
3. Founder Insight Callout — "Appears every 400–500 words. Peer-to-peer voice from real agency experience."
4. Numbers Callout Tile — "Pulls a specific benchmark or stat from the article into a highlighted block."
5. Barrel Sidebar — "Appears when citing Barrel portfolio data. Strongest trust signal — unique to AgencyHabits."
6. Mid-article Newsletter CTA — "Inline at ~50% scroll. Not a popup."
7. Conversion Order at Footer — "Newsletter CTA appears BEFORE Read Next. Reader just got value — highest intent moment."
8. Contextual Upsell — "Business Development article → BD Collection. Finance article → Exit Checklist. Positioning → Foundation App."
9. Sticky Podcast Sidebar — "Desktop only. Shows relevant episode while reading."

**Page structure:**

```
[Sticky reading progress bar at top — thin line]

Article Header:
- Category tag: "BUSINESS DEVELOPMENT" (clickable → navigateTo('read'))
- H1: "How to Scale Agency BD Beyond the Founder"
- Meta row: Author photo placeholder | "Peter Kang" | "Co-founder, Barrel Holdings" | "Apr 28, 2026" | "6 min read"
- [Blue gradient cover — Business Development color]

TL;DR Block (styled card):
- Label: "TL;DR"
- 3 bullets:
  • "Most agency BD plateaus when it depends entirely on the founder's relationships"
  • "The fix is building systems: ICP clarity, pipeline tracking, and team-led outreach"
  • "Start with your last 10 clients — the pattern is already there"
- Small link: "Skip to full piece ↓"

[Two-column layout: main content left (~700px) + sticky sidebar right]

Main content:
- Intro paragraph: "A founder we know doubled revenue in 18 months. Not by hiring a sales team. By getting ruthlessly clear on who they were for — and building a repeatable system around that clarity..."
  
- [Founder Insight Callout box]:
  Label: "FROM THE TRENCHES"
  Quote: "We spent three years taking every project that came our way. The moment we defined our ICP — and started saying no to everything outside it — our close rate went from 20% to 65%."
  Attribution: "— Peter Kang, Barrel Holdings"

- H2: "1. Why founder-led BD breaks"
- Body paragraph...

- [Numbers Callout Tile]:
  Large number: "80%"
  Context: "of agency founders say BD is the highest-leverage thing they do — and the thing they're worst at systematizing."

- H2: "2. The ICP clarity prerequisite"
- Body paragraph...

- [Barrel Agency Sidebar — small right-aligned box]:
  Label: "FROM A BARREL AGENCY"
  "At Barrel, we rebuilt our new business process around a single ICP doc updated quarterly. Every team member knows it. Every proposal references it."

- H2: "3. Building the pipeline without you"
- Body paragraph...

- [Mid-article Newsletter CTA — inline]:
  "Enjoying this? Join 1,500+ founders getting weekly insights from Barrel Holdings operators."
  Email input + Subscribe button

- H2: "4. The outreach system"
- Body paragraph...

- H2: "5. Measuring what matters"
- Closing paragraph...

Article Footer (in this exact order):
1. Author Bio box:
   [Photo placeholder] | "Peter Kang" | "Co-founder, Barrel Holdings" | Short bio: "Peter has been building agencies since 2006. He co-founded Barrel and later started Barrel Holdings to acquire and grow agency businesses."
   Link: "More articles by Peter →"

2. Share Strip:
   "Send this to a founder friend:"
   LinkedIn button | Twitter/X button | Copy link button

3. Newsletter CTA:
   "Enjoyed this? Join 1,500+ founders running $750K–$3M agencies."
   Email input + Subscribe

4. Read Next (3 cards):
   Label: "KEEP READING"
   - The Client Pruning Framework
   - How to Define Your Agency's ICP
   - The Three Agency Ecosystem Archetypes

5. Contextual Upsell:
   [BD Collection card]
   Label: "RECOMMENDED FOR THIS TOPIC"
   "The Business Development Collection — Real proposals and SOWs from Barrel Holdings agencies."
   "$599 · Learn More →" (navigateTo('bizdev_collection'))

Sticky Sidebar (desktop only, right rail):
- Label: "FROM THE PODCAST"
- [Podcast cover placeholder]
- "EP.07 — 10 Essential Habits for Running a Successful Agency"
- "44 min"
- "Listen on Spotify →" | "Watch on YouTube →"
```

---

### 2.4 LISTEN PAGE (new page id: `listen`, replaces `podcast`)

**Annotations:**
1. Hero Episode — "Latest episode. Links out to Spotify/YouTube — no embedded player (stability reasons)."
2. Host Intro — "Compact. Peter + Sei-Wook + Ivona. Builds trust with new listeners."
3. Episode Cards — "Each card: cover (category gradient) + number + title + duration + topic badge + 3 bullet takeaways."
4. Category Gradients — "Client confirmed topic tags will be provided for all episodes. Same 8-category color system as articles."
5. YouTube Shorts — "Already published. Build as live section, not placeholder."
6. Subscribe Row — "Spotify + Apple + YouTube + email. All outbound links."

**Page structure:**

```
H1: "The AgencyHabits Podcast"
Subtext: "Real conversations from operators currently running the same play."

Hero Episode Block (full width, dark background):
- Left: [Podcast cover art placeholder — square]
- Right:
  - Label: "LATEST EPISODE"
  - Episode number + title: "EP.07 — 10 Essential Habits for Running a Successful Agency"
  - Duration: "44 min"
  - Topic badge: "Leadership"
  - Short description: "Peter and Sei-Wook walk through the 10 habits that separate growing agencies from ones stuck in founder dependency..."
  - Two buttons: "Listen on Spotify →" | "Watch on YouTube →"
  - Note annotation: "[No embedded player — outbound links only for stability and performance]"

Host Intro (2-column):
- [Peter Kang photo placeholder] | "Peter Kang" | "Co-founder, Barrel Holdings" | One sentence
- [Sei-Wook Kim photo placeholder] | "Sei-Wook Kim" | "Co-founder, Barrel Holdings" | One sentence
- [Ivona Namjesnik photo placeholder] | "Ivona Namjesnik" | "General Manager, AgencyHabits" | One sentence

All Episodes:
- Section header: "All Episodes"
- Search bar: [Search episodes...]
- Sort: Newest | Oldest | Most Popular
- Episode cards (list layout):

  EP.07 — 10 Essential Habits for Running a Successful Agency
  [Leadership gradient cover] | 44 min | Topic: Leadership
  Takeaways:
  • After-action reviews compound faster than you think
  • Weekly BD meetings only work if they're structured
  • The "mind the bottom" habit is the hardest and most important
  "Listen →" | "Watch →"

  EP.06 — [Title TBD]
  [Gradient cover] | Duration TBD | Topic: TBD
  Note annotation: "[Episode titles and details TBD — client to provide full episode list]"

  EP.05 — How We'd Generate Leads If We Started Our Agency Today
  [Business Development gradient] | 45 min | Topic: Business Development
  Takeaways:
  • LinkedIn outbound still works if you're specific enough
  • Referral systems need to be asked for, not waited for
  • Building an audience is a 2-year play, not a quarter
  "Listen →" | "Watch →"

  EP.04 — How Specialization Impacts Your Agency's Growth, Margins, and Valuation
  [Positioning gradient] | 38 min | Topic: Positioning
  "Listen →" | "Watch →"

  EP.03 — Are You Calculating Your Agency's Profits Correctly?
  [Finance gradient] | 42 min | Topic: Finance
  "Listen →" | "Watch →"

  EP.02 — Our Approach to Agency Acquisitions: Valuation Drivers and Deal Breakers
  [Finance gradient] | 35 min | Most Listened badge
  "Listen →" | "Watch →"

  EP.01 — The Barrel Holdings Origin Story: Building a Portfolio of Agencies
  [Leadership gradient] | 22 min
  "Listen →" | "Watch →"

Pagination: ← | 1 | 2 | →

YouTube Shorts Section:
- Label: "SHORTS"
- H3: "Quick takes from the podcast"
- Horizontal scroll row of 4 short video thumbnails
- Each: [Video thumbnail placeholder — vertical format] + short title + duration
- Note annotation: "[Shorts are already published on YouTube. Pull from @TheAgencyHabitsPodcast channel]"

Subscribe Row:
- H3: "Listen to real lessons from inside agency businesses."
- Three platform buttons: Spotify | Apple Podcasts | YouTube
- Divider
- "Get new episodes in your inbox:"
- Email input + Subscribe button (kit.com)
```

---

### 2.5 EPISODE DETAIL TEMPLATE (new page id: `episode_template`)

New page — individual episode pages confirmed by client (full transcripts available).

**Annotations:**
1. Transcript — "Full transcript available for every episode — powers Knowledge Base AI."
2. Key Takeaways — "3 bullets at top, scannable for time-constrained founders."
3. Related Articles — "Cross-links podcast content to blog articles on same topic."

**Page structure:**

```
[Back to all episodes ←]

Episode Header:
- Category tag + Topic badge
- H1: "10 Essential Habits for Running a Successful Agency"
- EP.07 | 44 min | Leadership | Published: June 2026
- [Podcast cover placeholder]
- Two buttons: "Listen on Spotify →" | "Watch on YouTube →"

Key Takeaways (TL;DR style):
- Label: "KEY TAKEAWAYS"
- 3 bullets

Episode Description:
- Full show notes paragraph

Transcript:
- Label: "FULL TRANSCRIPT"
- [Long text block — transcript content]
- Note annotation: "[Transcripts available for all episodes — provided by client]"

Related Articles (3 cards):
- Articles on same topic category

Newsletter CTA at bottom.
```

---

### 2.6 GATHER PAGE (new page id: `gather`, replaces `events`)

**Annotations:**
1. Benefits Row — "Short bullets answering 'why should I come?' for the ICP."
2. Knowledge Share Section — "Separate from general events. This is their flagship format — 39 sign-ups."
3. Luma Embed — "Client will create lu.ma/agencyhabits. Embed shows both Knowledge Shares and meet-ups automatically."
4. Past Events Grid — "Knowledge Shares have YouTube recordings. New York + London meet-ups confirmed."
5. City Form — "Simple: Name + Email + City. Client confirmed they want this."

**Page structure:**

```
H1: "Monthly Knowledge Share"
Subtext: "A monthly gathering for agency operators to learn, share, and connect."

Benefits Row (4 short items):
✓ Learn from operators currently running the same play
✓ Get frameworks you can use the next week
✓ Connect with founders at the same stage
✓ Free — online and in-person

Knowledge Share Section:
- Label: "NEXT SESSION"
- Card: 
  - Date: "June 2026"
  - Title: "Agency Positioning Deep Dive"
  - Format: "Online · Zoom · 60 min · Free"
  - "39 people registered"
  - CTA button: "Register →" (links to Luma)
  - Note annotation: "[RSVP via Luma — lu.ma/agencyhabits — client creating this calendar]"
- Last session recap:
  - Label: "LAST SESSION"
  - "Knowledge Share #4 — Revenue Generation Habits"
  - "Watch the recap →" (links to https://youtu.be/kVuxABUqZrY)

Upcoming Events — Luma Embed:
- Label: "ALL UPCOMING EVENTS"
- [Luma calendar embed placeholder — full width]
- Note annotation: "[Luma calendar embed — lu.ma/agencyhabits — to be created by client. Shows both Knowledge Shares and meet-ups.]"

Past Events Grid:
- Label: "PAST SESSIONS"
- Search bar + Sort: Newest | By type (Knowledge Share / Meet-up) | By city
- Event cards (grid layout):

  Knowledge Share #4 — Revenue Generation Habits
  Badge: "KNOWLEDGE SHARE · ONLINE"
  Date: May 2026
  "Watch recap →" → https://youtu.be/kVuxABUqZrY

  Knowledge Share #3
  Badge: "KNOWLEDGE SHARE · ONLINE"
  Date: April 2026
  "Watch recap →" → https://youtu.be/m47PcqH1VXM

  Knowledge Share #2
  Badge: "KNOWLEDGE SHARE · ONLINE"  
  Date: March 2026
  "Watch recap →" → https://youtu.be/-Os03l5DLYE

  Knowledge Share #1
  Badge: "KNOWLEDGE SHARE · ONLINE"
  Date: February 2026
  "Watch recap →" → https://youtu.be/VEahl_2yKiw

  New York Meet-up
  Badge: "MEET-UP · NEW YORK"
  Date: 2026
  [Photo placeholder]
  "View recap →"

  London Meet-up
  Badge: "MEET-UP · LONDON"
  Date: 2025
  [Photo placeholder — 29 attendees]
  "View recap →"

"Bring AgencyHabits to your city" Form:
- H3: "Want a meet-up in your city?"
- Subtext: "We're expanding to new cities. Let us know where you are."
- Name | Email | City
- CTA: "Let us know →"
```

---

### 2.7 TOOLS PAGE (page id: `tools`)

**Annotations:**
1. Stats Row — "Lead with experience, not download counts. 100+ downloads is small — 20 years is strong."
2. Foundation + KB Side by Side — "Two AI products, equal prominence."
3. Tools Grid — "Three cards. Each with who-it's-for + 3 benefit bullets + price."
4. Testimonials — "Real quotes confirmed by client."
5. Quiet Barrel Link — "Appears in three places only: here, About, and Finance/Exit articles."

**Page structure:**

```
H1: "Built from real Barrel Holdings agency operations."

Stats Row (4 items):
- 20 Years | Agency Experience
- 1,500+ | Newsletter Subscribers  
- 60+ | Articles Published
- $599 | BD Collection
- Note annotation: "[Do not show download counts — 100 total is too small at this stage. Client recommendation.]"

Foundation App + Knowledge Base — Side by Side:
Left card (Foundation App):
- Label: "FOUNDATION APP · FREE"
- H3: "Build Your Agency's Strategic Foundation"
- Body: "Define your positioning, ecosystem, ICP, and service offering. Paste your URL. AI does the rest."
- Badge: "~60 seconds"
- CTA button: "Get Your Free Positioning Audit →" (navigateTo('foundation'))
- Small trust line: "Used by hundreds of agency owners"

Right card (Knowledge Base):
- Label: "KNOWLEDGE BASE · FREE · AI-POWERED"
- H3: "Search everything AgencyHabits has ever published."
- Body: "Ask any question about running, growing, or selling your agency. Get answers linked to source articles and podcast episodes."
- CTA link: "Search the Knowledge Base →" (navigateTo('kb'))
- Note annotation: "[Knowledge Base URL confirmed: kb.agencyhabits.com]"

Tools Grid (3 columns):
Card 1 — BD Collection:
- Label: "BUSINESS DEVELOPMENT"
- [Product mockup placeholder]
- H3: "The Business Development Collection"
- "Who it's for: Agency founders doing $1M+ who are tired of losing deals to agencies half their quality."
- Benefits:
  ✓ Real winning proposals from Barrel Holdings agencies
  ✓ New business intake framework — 50 questions
  ✓ Agency Growth Engine Playbook
- Price: "$599"
- CTA button: "Learn More →" (navigateTo('bizdev_collection'))

Card 2 — Exit Checklist:
- Label: "EXIT PLANNING"
- [Product mockup placeholder]
- H3: "The Exit-Readiness Checklist"
- "Who it's for: Founders who want to know what their agency is actually worth — and what's dragging the number down."
- Benefits:
  ✓ See your agency the way a buyer would
  ✓ Identifies valuation gaps before they cost you
  ✓ Built from real Barrel Holdings acquisition criteria
- Price: "Free"
- CTA button: "Download →" (navigateTo('exit_checklist'))

Card 3 — Annual Goals:
- Label: "PLANNING"
- [Product mockup placeholder]  
- H3: "The Annual Goal Setting Template"
- "Who it's for: Founders heading into a new year who want a plan that doesn't get forgotten by March."
- Benefits:
  ✓ One page — no fluff
  ✓ The exact template Barrel Holdings agencies use
  ✓ Captures revenue, margin, and growth priorities
- Price: "Free"
- CTA button: "Download →" (navigateTo('goal_template'))

Testimonials Section:
- Label: "WHAT AGENCY FOUNDERS SAY"
- 3 quote cards:

  Quote 1: "This was a no-brainer for me. Decades of agency sales secrets available for download? I'm shocked they were willing to share this wisdom at any price. I started using the templates that same day."
  — Max Bernstein, Consultant

  Quote 2: "AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder. It is filled with actual practical tips for running your agency, and it had a direct impact on the growth of my agency."
  — Uros Mikic, CEO, Flow Ninja

  Quote 3: "The Business Development collection was really helpful for our team. It gave us great insight into where we're doing well and where we could sharpen things."
  — Jonathan Garyfalakis, CEO, Syatt Media

Quiet Barrel Link:
- Small text, bottom of page: "Built something worth selling? →"
- Note annotation: "[Barrel acquisition link. Appears in 3 places only: Tools, About, Finance/Exit articles. Never homepage CTA.]"
```

---

### 2.8 NEWSLETTER PAGE (page id: `newsletter`)

**Annotations:**
1. Public Archive — "Client confirmed: public archive exists at crafty-teacher-5104.kit.com/profile"
2. kit.com — "Primary newsletter platform. All forms integrate here."

**Page structure:**

```
H1: "Behind-the-scenes thinking for agency operators. Every Friday."
Subtext: "Join 1,500+ founders running $750K–$3M agencies. Real learnings, no vanity metrics."
kit.com form: Email input + Subscribe button
Fine print: "No spam. Unsubscribe anytime."

What You'll Get (4 benefits):
✓ Weekly frameworks from operators currently in the seat
✓ Real numbers, real stories — no "scale to 7-figures" hype
✓ Tools and templates you can use the same week
✓ Early access to new resources and events

Sample Issue Preview:
- [Newsletter screenshot placeholder]
- Subject line: "How we think about agency positioning"
- Preview text: "This week, we're sharing the framework our agency leaders at Barrel Holdings use to define their positioning..."
- CTA: "Read a sample issue →"
- Note annotation: "[Public archive: crafty-teacher-5104.kit.com/profile — use for archive list below]"

Archive — Past Issues:
- Label: "PAST ISSUES"
- List format (date + subject + Read →):
  1. May 19, 2026 — How we think about agency positioning — Read →
  2. May 12, 2026 — The metrics that actually matter — Read →
  3. May 5, 2026 — Behind the scenes of an agency acquisition — Read →
  4. Apr 28, 2026 — How to prune your client roster — Read →
- "View full archive →" → crafty-teacher-5104.kit.com/profile
```

---

### 2.9 ABOUT PAGE (page id: `about`)

**Annotations:**
1. Founder Letter — "Keep exactly as-is. This is the strongest brand moment on the site."
2. Team — "Three people: Peter, Sei-Wook, Ivona. Client confirmed Ivona on About page."
3. Stats Row — "Do not hardcode episode count — TBD from client."
4. Barrel Portfolio — "Client to confirm canonical current list before launch."
5. Acquisition Link — "One of three deliberate placements. Quiet text, not a CTA button."

**Updated page structure:**

```
Section 1 — Founder Letter: [Keep exactly as current version]

Section 2 — Origin Story:
H2: "How AgencyHabits Started"
Body: "Barrel Holdings acquires and grows agency businesses. After nearly two decades running agencies ourselves and watching hundreds of operators face the same challenges, we started AgencyHabits to share what we've learned — without the hype of a 'Scale Your Agency' course."

Section 3 — Team (UPDATE: add Ivona):
H2: "The Team"
Three cards:
- [Peter Kang photo placeholder] | "Peter Kang" | "Co-founder, Barrel Holdings" | Bio
- [Sei-Wook Kim photo placeholder] | "Sei-Wook Kim" | "Co-founder, Barrel Holdings" | Bio
- [Ivona Namjesnik photo placeholder] | "Ivona Namjesnik" | "General Manager, AgencyHabits" | "Ivona oversees all AgencyHabits content, products, and community — including the podcast, Knowledge Shares, and tools."

Section 4 — Stats Row (UPDATE: remove hardcoded episode count):
- 1,500+ Newsletter Subscribers
- 20 Years Agency Experience  
- 60+ Articles Published
- [Episode count] Podcast Episodes
- Note annotation: "[Episode count TBD — client to confirm current number before publishing]"

Section 5 — Barrel Portfolio:
H2: "Our Agencies"
Body: "AgencyHabits content is drawn from operators currently running these businesses."
Grid: 6 logo placeholders + one-liners (same as homepage About Barrel section)
Note annotation: "[Canonical portfolio list to be confirmed by client — some agencies may have exited]"

Section 6 — Testimonials:
Same 3 quotes from Tools page

Section 7 — Quiet Acquisition Link:
Small text: "Thinking about selling your agency?" + "→ barrel-holdings.com"
Note annotation: "[Acquisition link. Appears in 3 places only: here, footer, Finance/Exit articles.]"
```

---

### 2.10 FOUNDATION APP PAGE (page id: `foundation`)

**Annotations:**
1. Sample Output — "Client to provide real audit example. Not Fivecube — reader or Barrel agency, anonymized."
2. Problem/Solution — "Two columns: problems left, solutions right. Not just a list of pain points."

**Updates to current Foundation page:**

Keep existing structure but add/update:

1. Update CTA link annotation: `[Links to foundation.agencyhabits.com]`
2. Add Sample Output section after "A Complete Audit in Four Sections":
```
Section: "SEE WHAT YOU GET"
H3: "A real audit. In 60 seconds."
[Large blurred/placeholder audit output — shows 4 tabs: Positioning / Ecosystem / Ideal Customer / Service Offering]
Body: "This is a real audit generated for a real agency in under 60 seconds."
Note annotation: "[Sample output to be provided by client — real reader or Barrel agency, anonymized]"
CTA: "Get yours →" (links to foundation.agencyhabits.com)
```
3. Update Stats row: `~60 seconds | $10K+ value | 4 key dimensions | Hundreds of audits run`
4. Add Testimonials section before Final CTA:
```
2 quote placeholders:
"This is the clearest my positioning has ever been. I had it done in under two minutes." — Agency Owner
"We used this to prep for a pitch and it changed how we talked about ourselves." — Founder
Note annotation: "[Real testimonials to be provided by client]"
```

---

### 2.11 KNOWLEDGE BASE PAGE (page id: `kb`)

**Update annotation:**
Change `[External tool - URL TBD]` to `[Knowledge Base URL confirmed: kb.agencyhabits.com]`

Update CTA button text and link:
```
CTA: "Search the Knowledge Base →" → kb.agencyhabits.com
```

---

### 2.12 CONTACT PAGE (page id: `contact`)

Minor updates only — keep existing structure, update trust signals:

Replace placeholder testimonials with confirmed ones:
```
"AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder."
— Uros Mikic, CEO, Flow Ninja

"Peter and Sei-Wook have been a great resource for agency owners."
— Max Bernstein, Consultant
```

---

## PART 3 — NEW PAGES TO BUILD FROM SCRATCH

---

### 3.1 START HERE PAGE (new page id: `start_here`)

Short curated page. Accessed from footer. Not in main nav.

**Annotations:**
1. Purpose — "For first-time visitors who don't know where to begin."
2. Curated Articles — "Hand-picked by Ivona. These 3 specific articles confirmed by client."
3. Entry Episode — "EP.07 confirmed by client as best entry point for new listeners."

**Page structure:**

```
H1: "New here? Start with these."
Subtext: "If you run a $750K–$3M agency and you're tired of figuring it out alone — here's where to begin."

Curated Reads:
Label: "READ THESE FIRST"
3 article cards (confirmed by client, in this order):
1. "Is Your Agency a Ponzi Scheme?" — Finance
2. "Scaling Your Agency Beyond $2M" — Business Development  
3. "How to Scale Agency BD Beyond the Founder" — Business Development

Featured Episode:
Label: "THEN LISTEN TO THIS"
- EP.07 — "10 Essential Habits for Running a Successful Agency"
- [Podcast cover placeholder]
- "44 min · Leadership"
- "This episode is the best first listen — broad enough to be useful wherever you are."
- "Listen on Spotify →" | "Watch on YouTube →"
- Note annotation: "[Confirmed by client as best entry point for new listeners]"

Foundation App CTA:
Label: "AND RUN THIS"
- [Foundation App card]
- "Before anything else — get a 60-second positioning audit."
- "Get Your Free Positioning Audit →" (navigateTo('foundation'))

Newsletter CTA:
- "If nothing else — get the weekly email."
- getNewsletterCtaHTML()
```

---

## PART 4 — PAGES TO KEEP AS-IS (minor copy updates only)

- **BD Collection** (`bizdev_collection`) — Add testimonials section (3 real quotes from client). Add "Who it's for" line. Add blurred sample preview placeholder. Otherwise keep existing.
- **Exit Checklist** (`exit_checklist`) — Add "What's inside" bullets + "When to use this" section. Keep existing.
- **Goal Template** (`goal_template`) — Add "What's inside" + "How Barrel agencies use it" section. Keep existing.
- **Books** (`books`) — Keep exactly as-is. Demoted to footer. Add note annotation: "[Books page accessed from footer only — not in main navigation]"

---

## PART 5 — PAGES TO REMOVE

Remove these pages entirely from PAGES object and sidebar:
- `podcast` — replaced by `listen`
- `articles` — replaced by `read`
- `contact` — keep but demote (footer only, remove from sidebar or move to bottom)
- `thelist` — The List content folds into Read hub as an article. Remove as standalone page or keep in demoted section.

---

## SUMMARY CHECKLIST

**Global:**
- [ ] Remove Show Grid / Show Annotations / Hide Section Notes buttons from control bar
- [ ] Update getHeaderHTML — new 5-item nav
- [ ] Update getFooterHTML — 3-column layout
- [ ] Update getNewsletterCtaHTML — ICP-specific copy

**Updated pages:**
- [ ] home — new structure (Barrel strip, Latest 3-col, Topics 8-tiles, Tools Ramp-style, About Barrel)
- [ ] read — new editorial hub replacing articles
- [ ] article_template — add TL;DR, TOC, callouts, conversion order fix
- [ ] listen — replace podcast page
- [ ] episode_template — new
- [ ] gather — replace events page
- [ ] tools — new structure + real testimonials
- [ ] newsletter — add archive link
- [ ] about — add Ivona, fix episode count
- [ ] foundation — add sample output + testimonials
- [ ] kb — update URL annotation

**New pages:**
- [ ] start_here — build from scratch

**Removed:**
- [ ] podcast (replaced by listen)
- [ ] articles (replaced by read)

---

## CONTENT REFERENCE — KEY CONFIRMED DATA

**Newsletter archive:** https://crafty-teacher-5104.kit.com/profile
**Knowledge Base URL:** https://kb.agencyhabits.com
**Foundation App URL:** https://foundation.agencyhabits.com
**YouTube channel:** https://www.youtube.com/@TheAgencyHabitsPodcast/videos

**Knowledge Share recordings:**
- KS #4: https://youtu.be/kVuxABUqZrY
- KS #3: https://youtu.be/m47PcqH1VXM
- KS #2: https://youtu.be/-Os03l5DLYE
- KS #1: https://youtu.be/VEahl_2yKiw

**Meet-up cities:** New York + London

**Start Here articles (confirmed by client, in order):**
1. "Is Your Agency a Ponzi Scheme?"
2. "Scaling Your Agency Beyond $2M"
3. "How to Scale Agency BD Beyond the Founder"

**Best entry podcast episode (confirmed by client):** EP.07 — "10 Essential Habits for Running a Successful Agency"

**BD Collection testimonials (confirmed by client):**
1. Max Bernstein, Consultant
2. Uros Mikic, CEO, Flow Ninja
3. Jonathan Garyfalakis, CEO, Syatt Media

**Hero copy ICP signal:** "$750K–$3M" (not $1M–$3M — client ICP starts at $750K)

**Episode count:** DO NOT hardcode — client to confirm current number

**Barrel portfolio:** DO NOT finalize — client to confirm canonical current list
EOF