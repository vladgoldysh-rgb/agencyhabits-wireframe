// Application State & Wireframe Renderer for AgencyHabits Redesign

const STATE = {
  activePageId: 'home',
  showGrid: false,
  showAnnotations: true,
  podcastSearchQuery: '',
  podcastCurrentPage: 1,
  foundationActiveTab: 'positioning',
  showSectionNotes: true,
  deviceView: 'desktop'
};

// Global Nav HTML Helper
function getHeaderHTML(activePageId) {
  return `
    <header class="wf-nav">
      <a href="#" class="wf-logo" onclick="navigateTo('home')">AgencyHabits</a>
      <nav class="wf-nav-links">
        <a href="#" class="wf-nav-link ${activePageId === 'articles' ? 'active' : ''}" onclick="navigateTo('articles')">Articles</a>
        <a href="#" class="wf-nav-link ${activePageId === 'books' ? 'active' : ''}" onclick="navigateTo('books')">Book Recommendations</a>
        <a href="#" class="wf-nav-link ${activePageId === 'tools' ? 'active' : ''}" onclick="navigateTo('tools')">Tools & Downloads</a>
        <a href="#" class="wf-nav-link ${activePageId === 'podcast' ? 'active' : ''}" onclick="navigateTo('podcast')">Podcast</a>
        <a href="#" class="wf-nav-link ${activePageId === 'about' ? 'active' : ''}" onclick="navigateTo('about')">About Us</a>
        <a href="#" class="wf-nav-link ${activePageId === 'contact' ? 'active' : ''}" onclick="navigateTo('contact')">Contact Us</a>
      </nav>
      <div style="display: flex; gap: 12px;">
        <a href="#" class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;" onclick="navigateTo('newsletter')">Newsletter</a>
        <a href="#" class="wf-btn wf-btn-primary" style="height: 36px; padding: 0 16px;" onclick="navigateTo('foundation')">Foundation App</a>
      </div>
    </header>
  `;
}

// Global Newsletter CTA HTML Helper
function getNewsletterCtaHTML() {
  return `
    <section class="wf-newsletter-cta-band">
      <div class="wf-newsletter-cta-content">
        <span class="wf-label">Weekly Newsletter</span>
        <h2 class="wf-h2" style="margin-bottom: 12px;">Join 1,500+ other agency operators and get behind-the-scenes content every week.</h2>
        <p class="wf-body" style="margin-bottom: 24px;">Bonus: Download the Agency Positioning 1-pager that we share with our agency leaders at Barrel Holdings.</p>
        <div class="wf-newsletter-form">
          <input type="email" class="wf-input-text" placeholder="Enter your email" />
          <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
        </div>
        <p class="wf-body-small" style="margin-top: 12px; color: #888;">Newsletter integration via kit.com. Zero spam.</p>
      </div>
    </section>
  `;
}

// Global Footer HTML Helper
function getFooterHTML() {
  return `
    <footer class="wf-footer">
      <div class="wf-footer-top">
        <div>
          <a href="#" class="wf-logo" onclick="navigateTo('home')" style="margin-bottom: 16px; display: inline-block;">AgencyHabits</a>
          <p class="wf-body-small" style="max-width: 300px;">Learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies.</p>
        </div>
        <div class="wf-footer-links">
          <a href="#" class="wf-footer-link" onclick="navigateTo('home')">Home</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('articles')">Articles</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('books')">Book Recs</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('tools')">Tools & Downloads</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('about')">About Us</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('podcast')">Podcast</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('contact')">Contact Us</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('thelist')">The List</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('newsletter')">Newsletter</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('foundation')">Foundation App</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('kb')">Knowledge Base</a>
          <a href="#" class="wf-footer-link" onclick="navigateTo('events')">Events</a>
        </div>
      </div>
      <div class="wf-footer-bottom">
        <span class="wf-footer-copyright">© 2026 AgencyHabits. A Barrel Holdings product. All rights reserved.</span>
        <span class="wf-body-small">GA Tracking Enabled</span>
      </div>
    </footer>
  `;
}

// Simulated interaction helper
function simulateFormSubmit(btn, msg) {
  const input = btn.previousElementSibling;
  if (input && input.value === '') {
    alert('Please enter a valid email.');
    return;
  }
  const oldText = btn.innerHTML;
  btn.innerHTML = msg;
  btn.disabled = true;
  if (input) input.disabled = true;
  setTimeout(() => {
    btn.innerHTML = oldText;
    btn.disabled = false;
    if (input) {
      input.disabled = false;
      input.value = '';
    }
  }, 2000);
}

// Simulated toggle helper for FAQ accordions
function toggleAccordion(el) {
  const item = el.closest('.wf-accordion');
  item.classList.toggle('open');
  const icon = item.querySelector('.wf-accordion-icon');
  if (item.classList.contains('open')) {
    icon.innerHTML = '−';
  } else {
    icon.innerHTML = '+';
  }
}

// Database of all pages
const PAGES = {
  home: {
    title: 'HOME PAGE',
    annotations: [
      { num: 1, title: 'Navigation Bar', body: 'Global header. Links to standard content sections. Custom buttons for Newsletter and Foundation App.', top: '40px', left: '160px' },
      { num: 2, title: 'Hero Section', body: 'Editorial layout focusing on B2B media value proposition. Clear reference to parent organization (Barrel Holdings).', top: '180px', left: '120px' },
      { num: 3, title: 'Embedded Newsletter Opt-In', body: 'Primary conversion point, repeated in the footer. Handled via kit.com embed with bonus magnet details.', top: '510px', left: '720px' },
      { num: 4, title: 'Featured Content Grid', body: 'Highlights top articles with large visual weight on the latest piece, followed by a three-column grid.', top: '750px', left: '80px' },
      { num: 5, title: 'Podcast Feature Player', body: 'Simulates audio player UX with episode summary and direct links to Apple/Spotify/YouTube.', top: '1420px', left: '80px' },
      { num: 6, title: 'The List Segment', body: 'High-contrast typographic block driving traffic to the core 10 Habits methodology.', top: '1820px', left: '80px' },
      { num: 7, title: 'Business Development Collection', body: 'Three lead magnet cards showcasing practical templates available for download/purchase.', top: '2150px', left: '80px' },
      { num: 8, title: 'Ramp-style Ecosystem Layout', body: 'A modern multi-column teaser highlighting: Foundation (AI Audit Tool), Knowledge Base (AI Search), and Events.', top: '2720px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('home')}
      
      <!-- Section 1: Hero -->
      <section class="wf-section-pad grid-container" style="padding-top: 100px; padding-bottom: 100px;">
        <div style="grid-column: span 7; display: flex; flex-direction: column; justify-content: center; gap: 24px;">
          <span class="wf-label">Welcome to AgencyHabits</span>
          <h1 class="wf-h1">Go behind the scenes of real agency businesses.</h1>
          <p class="wf-body-large">AgencyHabits provides learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies. Barrel Holdings acquires and grows agency businesses.</p>
          <div style="display: flex; gap: 16px; margin-top: 12px;">
            <button class="wf-btn wf-btn-primary" onclick="navigateTo('newsletter')">Join the Newsletter</button>
            <button class="wf-btn wf-btn-secondary" onclick="navigateTo('articles')">Explore Content</button>
          </div>
        </div>
        <div style="grid-column: span 5;">
          <div class="wf-placeholder-box" style="height: 400px; width: 100%;">
            <span class="wf-placeholder-label">[Abstract Editorial Hero Image]</span>
          </div>
        </div>
      </section>

      <!-- Section 2: Newsletter CTA -->
      ${getNewsletterCtaHTML()}

      <!-- Section 3: Featured Articles -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
          <div>
            <span class="wf-label">From the Blog</span>
            <h2 class="wf-h2">Featured Writing</h2>
          </div>
          <a href="#" onclick="navigateTo('articles')" style="color: #000; font-weight: 600; text-decoration: none;">Read More Articles →</a>
        </div>
        
        <!-- Hero Card -->
        <div class="wf-article-card-large" onclick="navigateTo('article_template')" style="cursor: pointer; margin-bottom: 40px;">
          <div class="wf-placeholder-box wf-article-card-image" style="height: 100%; min-height: 320px; grid-column: span 7;">
            <span class="wf-placeholder-label">[Article Image: Defining ICP]</span>
          </div>
          <div class="wf-article-card-content" style="grid-column: span 5;">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Marketing</span>
                <span>Peter Kang</span>
                <span>May 2026</span>
              </div>
              <h3 class="wf-h2" style="margin-bottom: 16px;">How to Define Your Agency's ICP (Beyond "B2B SaaS")</h3>
              <p class="wf-body">A founder we know got asked at an industry dinner who her agency worked with. "B2B SaaS," she said. The person nodded politely and moved on...</p>
            </div>
            <span style="font-weight: 700; margin-top: 24px; text-decoration: underline;">Read Article →</span>
          </div>
        </div>

        <!-- 3 Grid Articles -->
        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image">
            <span class="wf-placeholder-label">[Article Thumbnail]</span>
          </div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Business Development</span>
              </div>
              <h4 class="wf-h3" style="margin-bottom: 12px; font-size: 18px;">How to Scale Agency BD Beyond the Founder</h4>
              <p class="wf-body-small">Peter Kang | Learn the operational habits required to transition sales from the founder to a scalable growth team.</p>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>

        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image">
            <span class="wf-placeholder-label">[Article Thumbnail]</span>
          </div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Business Development</span>
              </div>
              <h4 class="wf-h3" style="margin-bottom: 12px; font-size: 18px;">The Client Pruning Framework</h4>
              <p class="wf-body-small">Establish rules for identifying, managing, and transitioning low-value clients off your agency roster.</p>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>

        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image">
            <span class="wf-placeholder-label">[Article Thumbnail]</span>
          </div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Finance</span>
              </div>
              <h4 class="wf-h3" style="margin-bottom: 12px; font-size: 18px;">Agency Cash Flow: What the P&L Isn't Telling You</h4>
              <p class="wf-body-small">Unlock the critical operating metrics that distinguish high-performing agencies from those on the brink.</p>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>
      </section>

      <!-- Section 4: Podcast Section -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="wf-label">The AgencyHabits Podcast</span>
            <h2 class="wf-h2">Listen to Real Lessons From Inside Agency Businesses</h2>
          </div>
          <a href="#" onclick="navigateTo('podcast')" style="color: #000; font-weight: 600; text-decoration: none;">All Episodes →</a>
        </div>

        <!-- Featured Player (Left) -->
        <div style="grid-column: span 7; border: 1px solid var(--wf-border); padding: 32px; display: flex; gap: 24px; align-items: center; background: #fafafa;">
          <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0;">
            <span class="wf-placeholder-label">[Podcast Cover]</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <span class="wf-label" style="font-size: 10px; margin-bottom: 0;">Latest Episode — EP.05</span>
            <h3 class="wf-h3">How We'd Generate Leads If We Started Our Agency Today</h3>
            <p class="wf-body-small">Peter Kang and Sei-Wook Kim unpack their fresh playbook for B2B relationship development in 2026. (45 min)</p>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
              <button class="wf-btn wf-btn-primary" style="height: 36px;" onclick="navigateTo('podcast')">
                <span class="wf-icon-placeholder wf-icon-circle" style="width: 14px; height: 14px; margin-right: 6px; border-color: #fff; background: transparent;"></span> Play Episode
              </button>
              <span style="font-size: 12px; color: #888;">Listen on: Spotify / Apple / YT</span>
            </div>
          </div>
        </div>

        <!-- Recent Episodes (Right) -->
        <div style="grid-column: span 5; display: flex; flex-direction: column; gap: 20px; justify-content: center;">
          <div style="border-bottom: 1px solid var(--wf-border-muted); padding-bottom: 16px;">
            <span class="wf-body-small" style="font-weight: 700;">EP.04</span>
            <h4 class="wf-h4" style="margin: 4px 0;" onclick="navigateTo('podcast')">How Specialization Impacts Your Agency's Growth, Margins, and Valuation</h4>
            <span class="wf-body-small">38 min</span>
          </div>
          <div style="border-bottom: 1px solid var(--wf-border-muted); padding-bottom: 16px;">
            <span class="wf-body-small" style="font-weight: 700;">EP.03</span>
            <h4 class="wf-h4" style="margin: 4px 0;" onclick="navigateTo('podcast')">Are You Calculating Your Agency's Profits Correctly?</h4>
            <span class="wf-body-small">42 min</span>
          </div>
        </div>
      </section>

      <!-- Section 5: The List Promo -->
      <section class="wf-section-pad grid-container" style="background: #000; color: #fff;">
        <div style="grid-column: span 5; display: flex; align-items: center;">
          <span style="font-family: Georgia, serif; font-size: 72px; font-weight: 900; letter-spacing: -2px;">The List</span>
        </div>
        <div style="grid-column: span 7; display: flex; flex-direction: column; justify-content: center; gap: 16px;">
          <p class="wf-body-large" style="color: #ccc;">We wouldn't be called AgencyHabits without a list of habits to share, would we?</p>
          <button class="wf-btn wf-btn-secondary" style="border-color: #fff; color: #fff; background: transparent; align-self: flex-start;" onclick="navigateTo('thelist')">Explore our habits →</button>
        </div>
      </section>

      <!-- Section 6: Book Recommendations -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="wf-label">Our Book Recommendations</span>
            <h2 class="wf-h2">Time-Tested Foundation Guides</h2>
          </div>
          <a href="#" onclick="navigateTo('books')" style="color: #000; font-weight: 600; text-decoration: none;">More Book Recommendations →</a>
        </div>

        <div style="grid-column: span 6;" class="wf-book-card">
          <div class="wf-placeholder-box wf-book-cover">
            <span class="wf-placeholder-label">[Book Cover]</span>
          </div>
          <div class="wf-book-info">
            <div>
              <h4 class="wf-h3" style="font-size: 18px;">Managing The Professional Service Firm</h4>
              <span class="wf-body-small" style="font-style: italic;">David Maister</span>
              <p class="wf-body" style="margin-top: 12px;">Time-tested foundational basics for running a professional services business.</p>
            </div>
            <a href="#" onclick="navigateTo('books')" style="color: #000; font-weight: 700; font-size: 13px; text-decoration: underline;">Learn More</a>
          </div>
        </div>

        <div style="grid-column: span 6;" class="wf-book-card">
          <div class="wf-placeholder-box wf-book-cover">
            <span class="wf-placeholder-label">[Book Cover]</span>
          </div>
          <div class="wf-book-info">
            <div>
              <h4 class="wf-h3" style="font-size: 18px;">Straight-Line Leadership</h4>
              <span class="wf-body-small" style="font-style: italic;">Dusan Djukich</span>
              <p class="wf-body" style="margin-top: 12px;">No-nonsense principles on taking ownership and leading through action.</p>
            </div>
            <a href="#" onclick="navigateTo('books')" style="color: #000; font-weight: 700; font-size: 13px; text-decoration: underline;">Learn More</a>
          </div>
        </div>
      </section>

      <!-- Section 7: Business Development Collection -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">Curated Resource Kits</span>
          <h2 class="wf-h2" style="margin-top: 8px;">The Business Development Collection</h2>
          <p class="wf-body" style="max-width: 600px; margin: 12px auto 0 auto;">A specially curated collection of documents to help inspire and systemize your business development activities.</p>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border); padding: 32px; display: flex; flex-direction: column; justify-content: space-between; height: 320px;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">Agency Lead Tracker</h4>
            <p class="wf-body-small">Our best practices for categorizing lead sources and types to track exactly where opportunities originate.</p>
          </div>
          <button class="wf-btn wf-btn-secondary" style="width: 100%; height: 40px;" onclick="navigateTo('tools')">Download</button>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border); padding: 32px; display: flex; flex-direction: column; justify-content: space-between; height: 320px;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">New Business Intake Guide</h4>
            <p class="wf-body-small">Field-tested discovery questions to get deep operational context from your initial client calls.</p>
          </div>
          <button class="wf-btn wf-btn-secondary" style="width: 100%; height: 40px;" onclick="navigateTo('tools')">Download</button>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border); padding: 32px; display: flex; flex-direction: column; justify-content: space-between; height: 320px;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">Winning Proposals & SOWs</h4>
            <p class="wf-body-small">Real proposals for website design, branding, CRO, and retainers from our Barrel Holdings agencies.</p>
          </div>
          <button class="wf-btn wf-btn-primary" style="width: 100%; height: 40px;" onclick="navigateTo('bizdev_collection')">Learn More</button>
        </div>

        <div style="grid-column: span 12; text-align: center; margin-top: 40px;">
          <a href="#" onclick="navigateTo('bizdev_collection')" style="color: #000; font-weight: 700; text-decoration: underline;">Win more deals for your agency →</a>
        </div>
      </section>

      <!-- Section 8: Foundation + KB + Events (Ramp-style layout) -->
      <section class="wf-section-pad grid-container" style="background: #f7f9fa; border-bottom: none;">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">The AgencyHabits Platform Ecosystem</span>
          <h2 class="wf-h2">Tools & Community</h2>
        </div>

        <!-- Left column (tall card, ~60% width) -->
        <div style="grid-column: span 7; border: 1px solid var(--wf-border); padding: 48px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; min-height: 420px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="wf-label" style="margin-bottom: 0;">Foundation App</span>
              <span style="border: 1px solid #000; padding: 2px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Takes just ~60 seconds</span>
            </div>
            <h3 class="wf-h1" style="font-size: 32px; margin-bottom: 16px;">Build Your Agency's Strategic Foundation</h3>
            <p class="wf-body">Define your positioning, ecosystem, ICP, and service offering. Simply paste your website URL. AI reads between the lines and does the rest.</p>
          </div>
          <button class="wf-btn wf-btn-primary" style="align-self: flex-start; margin-top: 32px;" onclick="navigateTo('foundation')">Get Your Free Positioning Audit →</button>
        </div>

        <!-- Right column (stacked cards, ~40% width) -->
        <div style="grid-column: span 5; display: flex; flex-direction: column; gap: 20px;">
          <!-- Top Stacked Card -->
          <div style="border: 1px solid var(--wf-border); padding: 32px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="wf-label">Knowledge Base</span>
              <h4 class="wf-h3" style="margin: 8px 0 12px 0;">Search everything AgencyHabits has ever published.</h4>
              <p class="wf-body-small">AI-powered search across all articles, templates, and podcast transcripts.</p>
            </div>
            <a href="#" onclick="navigateTo('kb')" style="font-weight: 700; text-decoration: underline; margin-top: 16px; display: inline-block;">Explore →</a>
          </div>

          <!-- Bottom Stacked Card -->
          <div style="border: 1px solid var(--wf-border); padding: 32px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="wf-label">Events</span>
              <h4 class="wf-h3" style="margin: 8px 0 12px 0;">Monthly Knowledge Share</h4>
              <p class="wf-body-small">Join fellow agency operators every month for live learning and structured discussion.</p>
            </div>
            <a href="#" onclick="navigateTo('events')" style="font-weight: 700; text-decoration: underline; margin-top: 16px; display: inline-block;">See Upcoming Events →</a>
          </div>
        </div>
      </section>

      <!-- Section 9: Footer Newsletter CTA -->
      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  articles: {
    title: 'ARTICLES — LISTING',
    annotations: [
      { num: 1, title: 'Category Filter Tabs', body: 'Allows horizontal filtering across operational topics. Standard active/inactive states.', top: '160px', left: '160px' },
      { num: 2, title: 'Search Bar', body: 'Right-aligned interactive search box simulating simple queries.', top: '160px', left: '1000px' },
      { num: 3, title: 'Featured Article Card', body: 'A high-impact editorial card pulling in the main Marketing topic and Author data.', top: '230px', left: '160px' },
      { num: 4, title: 'Grid Layout', body: 'Standard 3-column article listing with full real post data and category labels.', top: '650px', left: '80px' },
      { num: 5, title: 'Pagination Module', body: 'Simple navigation widget to move between article list pages.', top: '1540px', left: '600px' }
    ],
    render: () => `
      ${getHeaderHTML('articles')}
      
      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
        <div style="grid-column: span 12;">
          <span class="wf-label">AgencyHabits Editorial</span>
          <h1 class="wf-h1" style="margin-bottom: 32px;">Explore AgencyHabits Content</h1>
        </div>

        <!-- Fundamental-style Featured Layout -->
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; margin-bottom: 48px;">
          <!-- Left: Large Featured Article Card (Span 8) -->
          <div style="grid-column: span 8; border: 1px solid var(--wf-border); display: flex; flex-direction: column; position: relative; height: 480px; cursor: pointer;" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
              <span class="wf-placeholder-label">[Featured Image: Defining ICP]</span>
            </div>
            <!-- Bottom text overlay -->
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; gap: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                <span style="background: #fff; color: #000; padding: 2px 8px;">Marketing</span>
                <span>Peter Kang • May 12, 2026 • 8 min read</span>
              </div>
              <h2 class="wf-h1" style="color: #fff; font-size: 28px; line-height: 1.2; font-weight: 800; border: none; margin: 0; padding: 0;">How to Define Your Agency's ICP (Beyond "B2B SaaS")</h2>
              <p class="wf-body-small" style="color: #ccc; margin-bottom: 0;">A founder we know got asked at an industry dinner who her agency worked with. "B2B SaaS," she said. The person nodded politely and moved on...</p>
            </div>
          </div>
          
          <!-- Right: Two Stacked Featured Article Cards (Span 4) -->
          <div style="grid-column: span 4; display: flex; flex-direction: column; gap: 24px; height: 480px;">
            <!-- Stacked Card 1 -->
            <div style="flex: 1; border: 1px solid var(--wf-border); position: relative; cursor: pointer; overflow: hidden;" onclick="navigateTo('article_template')">
              <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
                <span class="wf-placeholder-label">[Thumbnail: Scale BD]</span>
              </div>
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; font-size: 9px; font-weight: 700; text-transform: uppercase;">
                  <span style="background: #fff; color: #000; padding: 1px 6px;">Business Dev</span>
                  <span>Peter Kang • 6 min read</span>
                </div>
                <h3 class="wf-h3" style="color: #fff; font-size: 16px; line-height: 1.3; margin: 0;">How to Scale Agency BD Beyond the Founder</h3>
              </div>
            </div>
            
            <!-- Stacked Card 2 -->
            <div style="flex: 1; border: 1px solid var(--wf-border); position: relative; cursor: pointer; overflow: hidden;" onclick="navigateTo('article_template')">
              <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
                <span class="wf-placeholder-label">[Thumbnail: Client Pruning]</span>
              </div>
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; font-size: 9px; font-weight: 700; text-transform: uppercase;">
                  <span style="background: #fff; color: #000; padding: 1px 6px;">Business Dev</span>
                  <span>5 min read</span>
                </div>
                <h3 class="wf-h3" style="color: #fff; font-size: 16px; line-height: 1.3; margin: 0;">The Client Pruning Framework</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories & Search Bar (Moved Under Featured Layout) -->
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <div class="wf-filters" style="margin-top: 0; margin-bottom: 0;">
            <div class="wf-filter-tabs">
              <span class="wf-filter-tab active">All</span>
              <span class="wf-filter-tab">Business Development</span>
              <span class="wf-filter-tab">Marketing</span>
              <span class="wf-filter-tab">Finance</span>
              <span class="wf-filter-tab">Leadership</span>
              <span class="wf-filter-tab">Clients</span>
              <span class="wf-filter-tab">Positioning</span>
              <span class="wf-filter-tab">Talent</span>
            </div>
            <div>
              <input type="text" class="wf-input-text" placeholder="Search articles..." style="width: 260px; height: 38px;" />
            </div>
          </div>
        </div>

        <!-- Grid of 9 Articles -->
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 24px;">
          
          <!-- Row 1 -->
          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">How to Scale Agency BD Beyond the Founder</h4>
                <span class="wf-body-small">Peter Kang | Apr 28, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Transitioning sales away from owner relationships requires clear operational habits.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Client Pruning Framework</h4>
                <span class="wf-body-small">Apr 14, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">How to build a client roster that grows alongside your team and financial targets.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Finance</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">Agency Cash Flow: What the P&L Isn't Telling You</h4>
                <span class="wf-body-small">Mar 31, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Why standard profitability metrics lie, and how to track actual cash health.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">What Does a Client Actually Buy When They Hire You?</h4>
                <span class="wf-body-small">Mar 17, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Shift your selling perspective from deliverable outputs to operational outcomes.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Three Agency Ecosystem Archetypes</h4>
                <span class="wf-body-small">Mar 3, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Positioning models that dictate your pricing, team ratios, and delivery mechanisms.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">Scaling Your Agency Beyond $2M</h4>
                <span class="wf-body-small">Feb 17, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">The systems and hiring decisions needed to break past standard boutique bottlenecks.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Metrics That Matter for Your Agency</h4>
                <span class="wf-body-small">Feb 3, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Avoid vanity metrics and focus on utilization, pipeline value, and client LTV.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Finance</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">Reversing Your Agency's Eroding Profits</h4>
                <span class="wf-body-small">Jan 20, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Tactical levers to pull when margins shrink and client retention drops.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

          <div class="wf-article-card" onclick="navigateTo('article_template')">
            <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
            <div class="wf-article-card-content">
              <div>
                <div class="wf-meta-row"><span class="wf-category-tag">Leadership</span></div>
                <h4 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">Specializing Requires Commitment</h4>
                <span class="wf-body-small">Jan 6, 2026</span>
                <p class="wf-body-small" style="margin-top: 10px;">Why choosing a niche is simple in theory, but operationalizing it takes real guts.</p>
              </div>
              <span style="font-weight: 700; margin-top: 20px; font-size: 13px;">Read →</span>
            </div>
          </div>

        </div>

        <!-- Pagination -->
        <div style="grid-column: span 12; display: flex; justify-content: center; align-items: center; margin-top: 60px; gap: 16px;">
          <span style="font-size: 14px; cursor: pointer; color: #888;">← Previous</span>
          <span style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #000; padding: 2px 6px;">1</span>
          <span style="font-size: 14px; cursor: pointer; padding: 2px 6px;">2</span>
          <span style="font-size: 14px; cursor: pointer; padding: 2px 6px;">3</span>
          <span style="font-size: 14px; color: #888;">...</span>
          <span style="font-size: 14px; cursor: pointer;">Next →</span>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  article_template: {
    title: 'ARTICLE TEMPLATE',
    annotations: [
      { num: 1, title: 'Sticky Progress Bar', body: 'Stays anchored to the top of the browser viewport to indicate user reading scroll progress.', top: '5px', left: '400px' },
      { num: 2, title: 'Article Header Block', body: 'Clear categorizing and metadata showing Author, Date, and estimated reading time.', top: '150px', left: '360px' },
      { num: 3, title: 'Full-width Visual Placeholder', body: 'Designated hero block. Wide template style.', top: '350px', left: '80px' },
      { num: 4, title: 'Max-width Content Body', body: 'Centered content body bounded to max ~700px to ensure premium readability standards.', top: '780px', left: '360px' },
      { num: 5, title: 'Pull Quote Stylization', body: 'Distinct styling layout for quotes, providing editorial emphasis.', top: '920px', left: '330px' },
      { num: 6, title: 'Framework Diagram Block', body: 'Embedded diagram placeholder mid-article.', top: '1560px', left: '360px' },
      { num: 7, title: 'Keep Reading Segment', body: 'Three-column article recommendation module below main article content.', top: '1850px', left: '80px' }
    ],
    render: () => `
      <!-- Sticky Reading progress indicator simulation -->
      <div class="wf-reading-progress-container">
        <div class="wf-reading-progress-bar"></div>
      </div>
      
      ${getHeaderHTML('articles')}

      <!-- Article Header -->
      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px; display: grid;">
        <div style="grid-column: 1 / span 12; display: flex; flex-direction: column; align-items: center; text-align: center; margin: 0 auto; max-width: 960px; width: 100%;">
          <span class="wf-category-tag" style="margin-bottom: 16px; display: inline-block;">Marketing</span>
          <h1 class="wf-h1" style="margin-bottom: 20px; text-align: center; width: 100%;">How to Define Your Agency's ICP (Beyond "B2B SaaS")</h1>
          <div style="font-size: 14px; font-weight: 500; display: flex; justify-content: center; gap: 16px; color: #555; align-items: center; width: 100%;">
            <span>By <strong>Peter Kang</strong></span>
            <span>|</span>
            <span>May 12, 2026</span>
            <span>|</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      <!-- Hero Image -->
      <section class="grid-container" style="margin-bottom: 60px;">
        <div style="grid-column: span 12;">
          <div class="wf-placeholder-box" style="height: 480px; width: 100%;">
            <span class="wf-placeholder-label">[Hero Image: Framework Visual]</span>
          </div>
        </div>
      </section>

      <!-- Content Body (Centered max-width columns) -->
      <section class="grid-container" style="margin-bottom: 80px;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 28px;">
          <p class="wf-body-large" style="font-weight: 500; line-height: 1.6; color: #000;">
            A founder we know got asked at an industry dinner who her agency worked with. "B2B SaaS," she said. The person nodded politely and moved on. She realized later that's the same answer given by maybe 200 other agencies at that dinner. It's the answer given by agencies doing branding, agencies doing product strategy, and firms doing paid ads. It means nothing.
          </p>

          <div style="border-left: 4px solid #000; padding-left: 24px; margin: 20px 0; font-style: italic;">
            <p class="wf-body-large" style="color: #000; font-weight: 600;">"B2B SaaS isn't an ICP. It's the first layer of one. And if that's where your answer stops, the downstream effects show up in every part of your business."</p>
          </div>

          <h2 class="wf-h2">1. Firmographics</h2>
          <p class="wf-body">The easy part. Industry, revenue stage, team size, geography, business model, tech stack. Most agencies we talk to stop here, and most stop too shallow. Knowing the revenue bracket matters because it establishes buying potential, but it doesn't give you the triggers that actually open doors.</p>

          <h2 class="wf-h2">2. Buying Triggers</h2>
          <p class="wf-body">Something like 99% of your prospects aren't in market at any given time. The question isn't "who do we want to reach?" It's "what pushes them from not-in-market to in-market?" Common triggers include funding rounds, key hires (like a new CMO), platform migrations, or entering a new market segment.</p>

          <h2 class="wf-h2">3. Success Definition</h2>
          <p class="wf-body">What is the client actually trying to achieve? Not what your agency is good at delivering. What moves the needle for them. If you sell SEO, their success definition isn't "higher rank." It's "reducing paid acquisition costs to stabilize margin." Align your positioning directly to this outcome.</p>

          <h2 class="wf-h2">4. Buying Committee</h2>
          <p class="wf-body">Who actually makes the decision? Who owns the budget? Who's the champion pushing internally? Who's the technical gatekeeper whose nod you need? Your marketing must provide artifacts that help your internal champion sell you up the ladder.</p>

          <h2 class="wf-h2">5. Disqualifiers</h2>
          <p class="wf-body">This is the Charlie Munger "invert, always invert" move. The first four dimensions define who you want. This one defines who you won't work with, even if they show up with money. By setting hard boundaries, you protect agency delivery margins and team morale.</p>

          <div class="wf-placeholder-box" style="height: 320px; width: 100%; margin: 20px 0;">
            <span class="wf-placeholder-label">[Framework Image: Five ICP Dimensions]</span>
          </div>

          <p class="wf-body">Start with your last 10 clients. Take your ICP audit, not a brainstorm. Take your last 10 signed clients. For each one, fill in the five dimensions. Then look at the three or four best ones, the engagements where margins were high, the team was energized, and the work generated clear results.</p>
          
          <div style="margin-top: 40px; border-top: 1px solid var(--wf-border-muted); padding-top: 24px;">
            <a href="#" onclick="navigateTo('articles')" style="color: #000; font-weight: 700; text-decoration: none;">← Back to Articles</a>
          </div>
        </div>
      </section>

      <!-- What's Next / Recommendations -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">Keep Reading</span>
          <h2 class="wf-h2">Related Articles</h2>
        </div>

        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
              <h4 class="wf-h3" style="font-size: 16px; margin-bottom: 8px;">How to Scale Agency BD Beyond the Founder</h4>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>

        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
              <h4 class="wf-h3" style="font-size: 16px; margin-bottom: 8px;">The Client Pruning Framework</h4>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>

        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image"><span class="wf-placeholder-label">[Image Placeholder]</span></div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row"><span class="wf-category-tag">Business Development</span></div>
              <h4 class="wf-h3" style="font-size: 16px; margin-bottom: 8px;">The Three Agency Ecosystem Archetypes</h4>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px;">Read →</span>
          </div>
        </div>
      </section>

      <!-- Newsletter Banner -->
      <section class="wf-newsletter-cta-band">
        <div class="wf-newsletter-cta-content">
          <h2 class="wf-h2" style="margin-bottom: 12px;">Enjoyed this? Join 1,500+ agency operators getting behind-the-scenes content every week.</h2>
          <div class="wf-newsletter-form">
            <input type="email" class="wf-input-text" placeholder="Enter your email" />
            <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  books: {
    title: 'BOOKS PAGE',
    annotations: [
      { num: 1, title: 'Topic Filter Tabs', body: 'Filter the 14 book recommendations by category (Finance, Sales, Leadership, etc.).', top: '150px', left: '160px' },
      { num: 2, title: 'Two-Column Grid', body: 'Displays books side-by-side with clear cover placeholders, descriptions, and details.', top: '230px', left: '80px' },
      { num: 3, title: 'External Redirect Link', body: 'Links point out to purchase locations or detailed summaries.', top: '380px', left: '400px' }
    ],
    render: () => `
      ${getHeaderHTML('books')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
        <div style="grid-column: span 12;">
          <span class="wf-label">Recommended Reading</span>
          <h1 class="wf-h1" style="margin-bottom: 24px;">Our Book Recommendations</h1>
          
          <div class="wf-filters">
            <div class="wf-filter-tabs">
              <span class="wf-filter-tab active">All</span>
              <span class="wf-filter-tab">Leadership</span>
              <span class="wf-filter-tab">Finance</span>
              <span class="wf-filter-tab">Business Development</span>
              <span class="wf-filter-tab">Sales</span>
              <span class="wf-filter-tab">Productivity</span>
            </div>
            <div>
              <input type="text" class="wf-input-text" placeholder="Search books..." style="width: 260px; height: 38px;" />
            </div>
          </div>
        </div>

        <!-- 2-column Grid of 14 Books -->
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          
          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Managing The Professional Service Firm</h4>
                <span class="wf-body-small" style="font-style: italic;">David Maister</span>
                <p class="wf-body-small" style="margin-top: 12px;">Time-tested foundational basics for running a professional services business.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Straight-Line Leadership</h4>
                <span class="wf-body-small" style="font-style: italic;">Dusan Djukich</span>
                <p class="wf-body-small" style="margin-top: 12px;">No-nonsense principles on taking ownership and leading through action.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Implementing Value Pricing</h4>
                <span class="wf-body-small" style="font-style: italic;">Ron Baker</span>
                <p class="wf-body-small" style="margin-top: 12px;">Clear principles behind value pricing & how a firm can go about practicing it.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Atomic Habits</h4>
                <span class="wf-body-small" style="font-style: italic;">James Clear</span>
                <p class="wf-body-small" style="margin-top: 12px;">Leveraging the concept of habits to live a healthier & more productive life.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Getting Things Done</h4>
                <span class="wf-body-small" style="font-style: italic;">David Allen</span>
                <p class="wf-body-small" style="margin-top: 12px;">Building a personal system to be productive & avoid getting overwhelmed.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Leadership and Self-Deception</h4>
                <span class="wf-body-small" style="font-style: italic;">Arbinger Institute</span>
                <p class="wf-body-small" style="margin-top: 12px;">The eye-opening concept of seeing others as people vs. objects.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">The Effective Executive</h4>
                <span class="wf-body-small" style="font-style: italic;">Peter Drucker</span>
                <p class="wf-body-small" style="margin-top: 12px;">Time-tested foundational basics for being an impactful leader in an organization.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Who Not How</h4>
                <span class="wf-body-small" style="font-style: italic;">Dan Sullivan</span>
                <p class="wf-body-small" style="margin-top: 12px;">The power of enlisting others to create leverage and achieve great things.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Scale at Speed</h4>
                <span class="wf-body-small" style="font-style: italic;">Leo Bottary</span>
                <p class="wf-body-small" style="margin-top: 12px;">The 2Y3X framework for driving growth and transformation in an agency business.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Simple Numbers, Straight Talk, Big Profits!</h4>
                <span class="wf-body-small" style="font-style: italic;">Greg Crabtree</span>
                <p class="wf-body-small" style="margin-top: 12px;">Primer on driving profits with clear financial insights and strategies.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Power Questions</h4>
                <span class="wf-body-small" style="font-style: italic;">Andrew Sobel & Jerold Panas</span>
                <p class="wf-body-small" style="margin-top: 12px;">Master the art of questioning to transform conversations and build deeper relationships.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">The Referral Code</h4>
                <span class="wf-body-small" style="font-style: italic;">Bill Cates</span>
                <p class="wf-body-small" style="margin-top: 12px;">Master relationship-based sales & grow your business through referrals.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Getting Naked</h4>
                <span class="wf-body-small" style="font-style: italic;">Patrick Lencioni</span>
                <p class="wf-body-small" style="margin-top: 12px;">The principles of inspiring client loyalty explained through a fascinating business fable.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

          <div class="wf-book-card">
            <div class="wf-placeholder-box wf-book-cover"><span class="wf-placeholder-label">[Cover]</span></div>
            <div class="wf-book-info">
              <div>
                <h4 class="wf-h3" style="font-size: 18px;">Double Your Profits</h4>
                <span class="wf-body-small" style="font-style: italic;">Bob Fifer</span>
                <p class="wf-body-small" style="margin-top: 12px;">78 proven ways to cut costs dramatically and double profits.</p>
              </div>
              <a href="#" style="color: #000; font-weight: 700; font-size: 13px;" onclick="alert('Redirects to purchase page')">Learn More →</a>
            </div>
          </div>

        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  tools: {
    title: 'TOOLS & DOWNLOADS',
    annotations: [
      { num: 1, title: 'Stacked Product Grid', body: 'Alternates visual left / copy right for premium visual flow.', top: '220px', left: '80px' },
      { num: 2, title: 'Buy CTA', body: 'Direct checkout integration for paid collections ($599).', top: '350px', left: '800px' },
      { num: 3, title: 'Free Download Forms', body: 'Triggers navigation to sub-pages with structured email forms.', top: '650px', left: '300px' }
    ],
    render: () => `
      ${getHeaderHTML('tools')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">Barrel Holdings Assets</span>
          <h1 class="wf-h1">Tools & Downloads</h1>
          <p class="wf-body-large" style="margin-top: 8px;">Resources built from real Barrel Holdings agency operations.</p>
        </div>

        <div style="grid-column: span 12;">
          
          <!-- Card 1 -->
          <div class="wf-tool-card">
            <div class="wf-placeholder-box wf-tool-image"><span class="wf-placeholder-label">[Product Mockup: Biz Dev Collection]</span></div>
            <div class="wf-tool-content">
              <span class="wf-label">Paid Resource Collection</span>
              <h3 class="wf-h2" style="margin: 8px 0 16px 0;">The Business Development Collection</h3>
              <p class="wf-body" style="margin-bottom: 24px;">Real, winning proposals and SOWs from Barrel Holdings agencies along with our New Biz Intake Guide and Agency Lead Tracker. Also includes the Agency Growth Engine Playbook.</p>
              <div style="display: flex; gap: 16px; align-items: center;">
                <button class="wf-btn wf-btn-primary" onclick="navigateTo('bizdev_collection')">Buy Now — $599</button>
                <a href="#" style="color: #000; font-weight: 700; text-decoration: underline;" onclick="navigateTo('bizdev_collection')">Learn More</a>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="wf-tool-card wf-tool-card-reverse">
            <div class="wf-placeholder-box wf-tool-image"><span class="wf-placeholder-label">[Product Cover: Exit-Readiness]</span></div>
            <div class="wf-tool-content">
              <span class="wf-label">Free Resource</span>
              <h3 class="wf-h2" style="margin: 8px 0 16px 0;">The Exit-Readiness Checklist</h3>
              <p class="wf-body" style="margin-bottom: 24px;">A comprehensive checklist to help you see your agency the way a buyer would, and close gaps that can increase the value of your agency.</p>
              <button class="wf-btn wf-btn-primary" style="align-self: flex-start;" onclick="navigateTo('exit_checklist')">Free Download</button>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="wf-tool-card">
            <div class="wf-placeholder-box wf-tool-image"><span class="wf-placeholder-label">[Product Cover: Goal Setting]</span></div>
            <div class="wf-tool-content">
              <span class="wf-label">Free Resource</span>
              <h3 class="wf-h2" style="margin: 8px 0 16px 0;">The Annual Goal Setting Template</h3>
              <p class="wf-body" style="margin-bottom: 24px;">A one-page template our Barrel Holdings agencies use to set, and stick to, their financial and strategic goals for the year ahead.</p>
              <button class="wf-btn wf-btn-primary" style="align-self: flex-start;" onclick="navigateTo('goal_template')">Free Download</button>
            </div>
          </div>

        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  bizdev_collection: {
    title: 'BUSINESS DEV COLLECTION',
    annotations: [
      { num: 1, title: 'Mockup Column', body: 'Displays high-fidelity presentation mockup image.', top: '150px', left: '160px' },
      { num: 2, title: 'Paid Checkout Block', body: 'Highlights core pricing and checklist features including New Biz Intake and Proposals.', top: '180px', left: '800px' },
      { num: 3, title: 'Highlights list', body: 'Horizontal breakdown of the 4 included modules with clear numbered segments.', top: '560px', left: '80px' },
      { num: 4, title: 'Product FAQ Accordions', body: 'Custom accordions handling typical doubts like refunds and file formats.', top: '1150px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('tools')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px;">
        <div style="grid-column: span 6;">
          <div class="wf-placeholder-box" style="height: 420px; width: 100%;">
            <span class="wf-placeholder-label">[Folder Mockup: BD Assets]</span>
          </div>
        </div>
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center; gap: 20px;">
          <span class="wf-label">Exclusive Resources</span>
          <h1 class="wf-h1">The Business Development Collection</h1>
          <p class="wf-body">Real, winning proposals and SOWs from Barrel Holdings agencies along with our New Biz Intake Guide and Agency Lead Tracker. Also includes the Agency Growth Engine Playbook.</p>
          <div style="border: 1px solid #000; padding: 20px; background: #fafafa;">
            <p class="wf-body" style="font-weight: bold; margin-bottom: 12px; font-size: 18px;">Price: $599</p>
            <button class="wf-btn wf-btn-primary" style="width: 100%;" onclick="alert('Integrating Checkout Flow')">Buy Now — $599</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 13px;">✓ <strong>New Biz Intake Guide</strong> — Discovery questions.</div>
            <div style="font-size: 13px;">✓ <strong>Agency Lead Tracker</strong> — Source tracking framework.</div>
            <div style="font-size: 13px;">✓ <strong>Winning Proposals & SOWs</strong> — Website, SEO, CRO, & Design.</div>
            <div style="font-size: 13px;">✓ <strong>Agency Growth Engine Playbook</strong> — Growth operating systems.</div>
          </div>
        </div>
      </section>

      <!-- Highlights section -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <h2 class="wf-h2">What's Inside the Collection</h2>
        </div>

        <div style="grid-column: span 6; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: 700; color: #aaa;">01</span>
          <h3 class="wf-h3" style="margin-bottom: 8px;">New Biz Intake Guide</h3>
          <p class="wf-body-small">"The initial call with a prospective client is critical in any new business situation. Drawing from thousands of initial calls with various prospects over the years, we've compiled nearly 50 questions you can draw from to conduct a thorough discovery conversation."</p>
        </div>

        <div style="grid-column: span 6; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: 700; color: #aaa;">02</span>
          <h3 class="wf-h3" style="margin-bottom: 8px;">Agency Lead Tracker</h3>
          <p class="wf-body-small">"We built a simple lead tracker that our agencies use to directly record every lead that comes in so we can track deal progression, opportunity age, and respective CRMs to reflect how we categorize and designate each prospect."</p>
        </div>

        <div style="grid-column: span 6; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: 700; color: #aaa;">03</span>
          <h3 class="wf-h3" style="margin-bottom: 8px;">Winning Proposals & SOWs</h3>
          <p class="wf-body-small">"Get an inside look at how we frame our offering and present our case studies. Includes: 6-Figure Shopify Website Proposal and SOW | Brand Design & Marketing Website Project Proposal & SOW | Webflow Website Proposal and SOW | Ecomm CRO SOW | Ecomm SEO & Email Support Retainer"</p>
        </div>

        <div style="grid-column: span 6; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: 700; color: #aaa;">04</span>
          <h3 class="wf-h3" style="margin-bottom: 8px;">Agency Growth Engine Playbook</h3>
          <p class="wf-body-small">"A complete operating model for agency growth built on five linked systems — Foundation, Expertise, Relationship Development, Pipeline, and Delivery."</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 4;">
          <span class="wf-label">Have Questions?</span>
          <h2 class="wf-h2">Frequently Asked Questions</h2>
        </div>
        <div style="grid-column: span 8;">
          <div class="wf-accordion">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">What kinds of proposals and SOWs are included? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">Includes: 6-Figure Shopify Website Proposal and SOW, Brand Design & Marketing Website Project Proposal & SOW, Webflow Website Proposal and SOW, Ecomm CRO SOW, Ecomm SEO & Email Support Retainer.</div>
          </div>
          <div class="wf-accordion">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">Do you offer refunds? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">Due to the digital nature of these downloadable assets, all sales are final. Please review the details carefully.</div>
          </div>
          <div class="wf-accordion">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">Will this collection help me win more client work? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">These are the exact structures we use to close 6-figure deals across our portfolio. They provide high-quality scaffolding for your team.</div>
          </div>
          <div class="wf-accordion">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">Who are you guys and why should I care? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">We are Peter Kang and Sei-Wook Kim, co-founders of Barrel Holdings. We have run agencies for nearly two decades.</div>
          </div>
          <div class="wf-accordion">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">What format are the files in this collection? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">The documents are provided as Google Doc, Google Sheet, and Notion template links for instant access and editing.</div>
          </div>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  exit_checklist: {
    title: 'EXIT-READINESS CHECKLIST',
    annotations: [
      { num: 1, title: 'Header block', body: 'Introduces checklist value proposition.', top: '150px', left: '160px' },
      { num: 2, title: 'Split Form Column', body: 'Right-aligned email download box configured with kit.com integration tags.', top: '230px', left: '800px' },
      { num: 3, title: 'Extra contextual details', body: 'Highlights how exit-readiness helps build resilience and strong margins even before a sale.', top: '480px', left: '160px' }
    ],
    render: () => `
      ${getHeaderHTML('tools')}

      <section class="wf-section-pad grid-container" style="padding-top: 80px;">
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center; gap: 24px;">
          <span class="wf-label">Free Operational Checklist</span>
          <h1 class="wf-h1">Get Your Agency Exit-Ready</h1>
          <p class="wf-body">A one-page checklist to help you see your agency the way a buyer would, and fix the gaps before they cost you value.</p>
          <div class="wf-placeholder-box" style="height: 300px; width: 100%; max-width: 400px; margin-top: 16px;">
            <span class="wf-placeholder-label">[Checklist Cover Image]</span>
          </div>
        </div>

        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center;">
          <div style="border: 2px solid #000; padding: 40px; background: #ffffff;">
            <h3 class="wf-h2" style="font-size: 22px; margin-bottom: 8px;">Download the Exit-Readiness Checklist</h3>
            <p class="wf-body-small" style="margin-bottom: 24px;">Get the exact framework we use to assess acquisition opportunities, so you can strengthen your agency now, long before you go to market.</p>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label class="wf-label">Your Email</label>
                <input type="email" class="wf-input-text" placeholder="Enter your email" />
              </div>
              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Checklist Sent!')">Send Me the Checklist</button>
              <p class="wf-body-small" style="text-align: center; color: #888;">kit.com form integration. We respect your privacy.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="wf-section-pad grid-container" style="min-height: 500px; align-items: center; display: grid; background: #fafafa; border-bottom: none;">
        <div style="grid-column: 3 / span 8; text-align: center; display: flex; flex-direction: column; gap: 20px; justify-content: center; align-items: center; height: 100%;">
          <p class="wf-body-large" style="font-weight: 500; font-style: italic; margin-bottom: 24px;">
            "You don't need to be selling tomorrow to benefit from exit readiness. The same systems that make your agency more valuable also make it more resilient: stronger margins, steadier pipeline, and a leadership team that doesn't rely on you to keep it all running."
          </p>
          <p class="wf-body">If you've ever wondered how acquirers evaluate agencies, this checklist breaks it down. Inside, you'll find the key metrics, documents, and systems that determine valuation, from client concentration and recurring revenue to leadership depth and operational discipline. Use it to benchmark where you stand today and take the guesswork out of preparing for an exit.</p>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  goal_template: {
    title: 'ANNUAL GOAL TEMPLATE',
    annotations: [
      { num: 1, title: 'Interactive Form Column', body: 'Standard two-column split. Form handles email download, connected directly to kit.com.', top: '230px', left: '800px' },
      { num: 2, title: 'Accountability Details', body: 'Outlines why short, specific goals keep agencies aligned through March and beyond.', top: '480px', left: '160px' }
    ],
    render: () => `
      ${getHeaderHTML('tools')}

      <section class="wf-section-pad grid-container" style="padding-top: 80px;">
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center; gap: 24px;">
          <span class="wf-label">Free Operating Template</span>
          <h1 class="wf-h1">Your 2026 Plan, on One Page</h1>
          <p class="wf-body">A one-page template our Barrel Holdings agencies use to set, and stick to, their financial and strategic goals for the year ahead.</p>
          <div class="wf-placeholder-box" style="height: 300px; width: 100%; max-width: 400px; margin-top: 16px;">
            <span class="wf-placeholder-label">[Goal Template Mockup]</span>
          </div>
        </div>

        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center;">
          <div style="border: 2px solid #000; padding: 40px; background: #ffffff;">
            <h3 class="wf-h2" style="font-size: 22px; margin-bottom: 8px;">Download the 2026 Annual Goal Setting Template</h3>
            <p class="wf-body-small" style="margin-bottom: 24px;">Align your team on the targets that actually move your agency forward, using our standard internal framework.</p>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label class="wf-label">Your best email</label>
                <input type="email" class="wf-input-text" placeholder="Enter your email" />
              </div>
              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Template Sent!')">Send Me the Template</button>
              <p class="wf-body-small" style="text-align: center; color: #888;">kit.com form integration. Safe & secure.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="wf-section-pad grid-container" style="min-height: 500px; align-items: center; display: grid; background: #fafafa; border-bottom: none;">
        <div style="grid-column: 3 / span 8; text-align: center; display: flex; flex-direction: column; gap: 20px; justify-content: center; align-items: center; height: 100%;">
          <p class="wf-body-large" style="font-weight: 500; font-style: italic; margin-bottom: 24px;">
            "Most annual plans end up forgotten by March. This one doesn't. It's short, specific, and designed to help you track progress against the few goals that actually move your agency forward."
          </p>
          <p class="wf-body">Before the start of the new year, we ask our agency leaders to fill out this simple one-pager. It captures the metrics that matter — revenue, margin, and growth priorities — so we start the year aligned on where we're headed and how we'll get there. Use it with your team to define what success looks like in 2026 and stay accountable throughout the year.</p>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  about: {
    title: 'ABOUT US PAGE',
    annotations: [
      { num: 1, title: 'Founder Letter', body: 'Typewriter-styled layout presenting Peter and Sei-Wook\'s intro text.', top: '120px', left: '160px' },
      { num: 2, title: 'Origin Story Section', body: 'Outlines history of Barrel Holdings agency operations.', top: '650px', left: '80px' },
      { num: 3, title: 'Team Bios Grid', body: 'Clean layout for founder headshots and operational profiles.', top: '920px', left: '80px' },
      { num: 4, title: 'Stats Indicator Row', body: 'Four major data values aligned horizontally.', top: '1350px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('about')}

      <!-- Section 1: Founder Letter -->
      <section class="wf-section-pad grid-container" style="padding-top: 60px;">
        <div style="grid-column: 2 / span 10; border: 1px dashed #000; padding: 48px; background: #fafafa; font-family: Courier, monospace;">
          <span style="font-weight: bold; display: block; margin-bottom: 20px;">[Founder Statement / Letter]</span>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">Hello Agency operator,</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">We've been in the agency game for nearly two decades, serving clients, building teams, and grinding in the day-to-day of emails, meetings, and deliverables.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">We love this game so much that we created a portfolio of agency businesses called Barrel Holdings.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">We've been humbled along the way - what works really well for one agency doesn't necessarily translate to another and vice versa.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">The only sure thing is that if you keep on experimenting and being disciplined about learning, you eventually find better ways to do things.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">So instead of overpromising with a "Scale Your Agency" course, we're pulling back the curtain and letting you get a look at some of the things happening across our agencies.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 16px;">Most things on this site are free but there are a few items we'll charge for. We think they're worth it, but no pressure to buy anything. Be sure to sign up for our weekly newsletter.</p>
          <p class="wf-body" style="color: #000; margin-bottom: 24px;">We hope you find a few useful ideas that you'll try in your own firm, and we'd love to hear how things went.</p>
          <p class="wf-body" style="color: #000;">Cheers,<br/><strong>Peter and Sei-Wook</strong><br/>Co-founders, Barrel Holdings</p>
          <p class="wf-body" style="color: #666; margin-top: 24px; font-size: 13px;">P.S. If you want to sell your agency, go to the Barrel Holdings site to see if you're a fit for what we're looking for and send us a note.</p>
        </div>
      </section>

      <!-- Section 2: Origin Story -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 7; display: flex; flex-direction: column; justify-content: center; gap: 16px;">
          <span class="wf-label">Origin Story</span>
          <h2 class="wf-h2">How AgencyHabits Started</h2>
          <p class="wf-body">Barrel Holdings acquires and grows agency businesses. After nearly two decades running agencies ourselves and watching hundreds of operators face the same challenges, we started AgencyHabits to share what we've learned — without the hype of a "Scale Your Agency" course.</p>
        </div>
        <div style="grid-column: span 5;">
          <div class="wf-placeholder-box" style="height: 240px; width: 100%;">
            <span class="wf-placeholder-label">[Origin Image Placeholder]</span>
          </div>
        </div>
      </section>

      <!-- Section 3: Team Profiles -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">The Founders</span>
          <h2 class="wf-h2">Our Leadership Team</h2>
        </div>

        <div style="grid-column: span 6; display: flex; gap: 24px; border: 1px solid #000; padding: 24px;">
          <div class="wf-placeholder-box" style="width: 140px; height: 180px; flex-shrink: 0;">
            <span class="wf-placeholder-label">[Headshot]</span>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 class="wf-h3">Peter Kang</h3>
              <span class="wf-body-small" style="font-weight: bold;">Co-founder, Barrel Holdings</span>
              <p class="wf-body-small" style="margin-top: 10px; line-height: 1.4;">Peter has been building and running agencies since 2006. He co-founded Barrel, a digital agency serving CPG and e-commerce brands, and later started Barrel Holdings to acquire and grow agency businesses.</p>
            </div>
          </div>
        </div>

        <div style="grid-column: span 6; display: flex; gap: 24px; border: 1px solid #000; padding: 24px;">
          <div class="wf-placeholder-box" style="width: 140px; height: 180px; flex-shrink: 0;">
            <span class="wf-placeholder-label">[Headshot]</span>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 class="wf-h3">Sei-Wook Kim</h3>
              <span class="wf-body-small" style="font-weight: bold;">Co-founder, Barrel Holdings</span>
              <p class="wf-body-small" style="margin-top: 10px; line-height: 1.4;">Sei-Wook co-founded Barrel alongside Peter and has spent nearly two decades building client relationships and leading agency operations. He brings a deep understanding of how agencies grow and scale.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Stats Row -->
      <section class="wf-section-pad grid-container" style="background: #000; color: #fff; text-align: center;">
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">1,500+</h3>
          <span class="wf-label" style="color: #888;">Newsletter Subscribers</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">20 Years</h3>
          <span class="wf-label" style="color: #888;">Agency Experience</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">5</h3>
          <span class="wf-label" style="color: #888;">Podcast Episodes</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">60+</h3>
          <span class="wf-label" style="color: #888;">Articles Published</span>
        </div>
      </section>

      <!-- Section 5: Testimonials -->
      <section class="wf-section-pad grid-container" style="border-bottom: none;">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">Testimonials</span>
          <h2 class="wf-h2">What Other Operators Say</h2>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"Peter and Sei-Wook have been a great resource for agency owners. I've learnt a lot from their experience of running agencies at scale."</p>
          <span class="wf-label" style="font-size: 11px;">— Agency Operator</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"Having listened to their podcast and gone through the content on the site, it has given me a lot of confidence in how I run my agency."</p>
          <span class="wf-label" style="font-size: 11px;">— Agency Founder</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"I find it rare to hear from those who've actually done it and still do it today. Excited for the future of this resource."</p>
          <span class="wf-label" style="font-size: 11px;">— Agency Owner</span>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  podcast: {
    title: 'PODCAST PAGE',
    annotations: [
      { num: 1, title: 'Hero Audio Player Block', body: 'Displays podcast cover, EP description, and duration alongside player buttons.', top: '150px', left: '80px' },
      { num: 2, title: 'Hosts Overview', body: 'Profiles Peter and Sei-Wook as the primary hosts.', top: '510px', left: '80px' },
      { num: 3, title: 'Full Episodes Feed', body: 'Lists all five available episodes with standard play icons, durations, and details.', top: '780px', left: '80px' },
      { num: 4, title: 'Distribution Opt-In', body: 'Subscribers can join direct mail distribution lists for new episode updates.', top: '1540px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('podcast')}

      <!-- Podcast Featured Section (Fundamental-style) -->
      <section class="wf-section-pad grid-container" style="padding-top: 60px;">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">Featured Episodes</span>
          <h2 class="wf-h2">The AgencyHabits Podcast</h2>
        </div>
        
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; margin-bottom: 40px;">
          <!-- Left Large Card (EP.05) -->
          <div style="grid-column: span 8; border: 1px solid var(--wf-border); display: flex; flex-direction: column; position: relative; height: 480px; cursor: pointer;">
            <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
              <span class="wf-placeholder-label">[Episode Cover: EP.05]</span>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; gap: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                <span style="background: #fff; color: #000; padding: 2px 8px;">EP.05 (Latest)</span>
                <span>45 mins duration</span>
              </div>
              <h2 class="wf-h1" style="color: #fff; font-size: 28px; line-height: 1.2; font-weight: 800;">How We'd Generate Leads If We Started Our Agency Today</h2>
              <p class="wf-body-small" style="color: #ccc; margin-bottom: 0;">Peter and Sei-Wook share the exact lead generation tactics they'd prioritize if they were starting fresh — from LinkedIn outreach to referral systems to building an audience.</p>
              <div style="display: flex; gap: 12px; margin-top: 8px;">
                <span style="background:#fff; color:#000; padding:6px 12px; font-weight:bold; font-size:12px; display:inline-flex; align-items:center;"><span class="wf-icon-placeholder wf-icon-circle" style="width:10px; height:10px; margin-right:6px; border-color:#000; background:transparent;"></span> Play Episode</span>
              </div>
            </div>
          </div>

          <!-- Right Stacked Cards (EP.04 & EP.03) -->
          <div style="grid-column: span 4; display: flex; flex-direction: column; gap: 24px; height: 480px;">
            <!-- Stacked EP.04 -->
            <div style="flex: 1; border: 1px solid var(--wf-border); position: relative; cursor: pointer; overflow: hidden;">
              <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
                <span class="wf-placeholder-label">[EP.04 Cover]</span>
              </div>
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; font-size: 9px; font-weight: 700; text-transform: uppercase;">
                  <span style="background: #fff; color: #000; padding: 1px 6px;">EP.04</span>
                  <span>38 mins</span>
                </div>
                <h3 class="wf-h3" style="color: #fff; font-size: 15px; line-height: 1.3; margin: 0;">How Specialization Impacts Your Agency's Growth...</h3>
              </div>
            </div>

            <!-- Stacked EP.03 -->
            <div style="flex: 1; border: 1px solid var(--wf-border); position: relative; cursor: pointer; overflow: hidden;">
              <div class="wf-placeholder-box" style="height: 100%; width: 100%; position: absolute; top:0; left:0; z-index: 1;">
                <span class="wf-placeholder-label">[EP.03 Cover]</span>
              </div>
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, transparent 100%); z-index: 2; color: #fff; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; font-size: 9px; font-weight: 700; text-transform: uppercase;">
                  <span style="background: #fff; color: #000; padding: 1px 6px;">EP.03</span>
                  <span>42 mins</span>
                </div>
                <h3 class="wf-h3" style="color: #fff; font-size: 15px; line-height: 1.3; margin: 0;">Are You Calculating Your Agency's Profits Correctly?</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Host Intro -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">About the Hosts</span>
          <h2 class="wf-h2">Meet Peter & Sei-Wook</h2>
        </div>
        
        <div style="grid-column: span 6; display: flex; gap: 20px; align-items: center;">
          <div class="wf-placeholder-box" style="width: 100px; height: 100px; border-radius: 50%;"><span class="wf-placeholder-label">[Peter]</span></div>
          <div>
            <h4 class="wf-h3">Peter Kang</h4>
            <p class="wf-body-small">"We share exact insights because we believe agency operators deserve real transparent operational data."</p>
          </div>
        </div>

        <div style="grid-column: span 6; display: flex; gap: 20px; align-items: center;">
          <div class="wf-placeholder-box" style="width: 100px; height: 100px; border-radius: 50%;"><span class="wf-placeholder-label">[Sei-Wook]</span></div>
          <div>
            <h4 class="wf-h3">Sei-Wook Kim</h4>
            <p class="wf-body-small">"Our podcast focuses entirely on the operating mechanics behind agencies, not the standard theory."</p>
          </div>
        </div>
      </section>

      <!-- Latest Episodes Feed -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="wf-label">Archive</span>
            <h2 class="wf-h2">All Episodes</h2>
          </div>
          <div>
            <input type="text" class="wf-input-text" placeholder="Search episodes..." style="width: 260px; height: 38px;" />
          </div>
        </div>

        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #000;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <span style="font-family: Georgia, serif; font-size: 20px; font-weight: bold; width: 60px;">EP.05</span>
              <div class="wf-placeholder-box" style="width: 50px; height: 50px;"><span class="wf-placeholder-label">[Play]</span></div>
              <div>
                <h4 class="wf-h4">How We'd Generate Leads If We Started Our Agency Today</h4>
                <span class="wf-body-small">45 mins</span>
              </div>
            </div>
            <button class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;">Listen</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #000;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <span style="font-family: Georgia, serif; font-size: 20px; font-weight: bold; width: 60px;">EP.04</span>
              <div class="wf-placeholder-box" style="width: 50px; height: 50px;"><span class="wf-placeholder-label">[Play]</span></div>
              <div>
                <h4 class="wf-h4">How Specialization Impacts Your Agency's Growth, Margins, and Valuation</h4>
                <span class="wf-body-small">38 mins | <span style="border: 1px solid #000; padding: 1px 4px; font-size: 10px; font-weight: bold;">Most Listened</span></span>
              </div>
            </div>
            <button class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;">Listen</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #000;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <span style="font-family: Georgia, serif; font-size: 20px; font-weight: bold; width: 60px;">EP.03</span>
              <div class="wf-placeholder-box" style="width: 50px; height: 50px;"><span class="wf-placeholder-label">[Play]</span></div>
              <div>
                <h4 class="wf-h4">Are You Calculating Your Agency's Profits Correctly?</h4>
                <span class="wf-body-small">42 mins</span>
              </div>
            </div>
            <button class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;">Listen</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #000;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <span style="font-family: Georgia, serif; font-size: 20px; font-weight: bold; width: 60px;">EP.02</span>
              <div class="wf-placeholder-box" style="width: 50px; height: 50px;"><span class="wf-placeholder-label">[Play]</span></div>
              <div>
                <h4 class="wf-h4">Our Approach to Agency Acquisitions: Valuation Drivers and Deal Breakers</h4>
                <span class="wf-body-small">35 mins | <span style="border: 1px solid #000; padding: 1px 4px; font-size: 10px; font-weight: bold;">Most Listened</span></span>
              </div>
            </div>
            <button class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;">Listen</button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #000;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <span style="font-family: Georgia, serif; font-size: 20px; font-weight: bold; width: 60px;">EP.01</span>
              <div class="wf-placeholder-box" style="width: 50px; height: 50px;"><span class="wf-placeholder-label">[Play]</span></div>
              <div>
                <h4 class="wf-h4">The Barrel Holdings Origin Story: Building a Portfolio of Agencies</h4>
                <span class="wf-body-small">22 mins</span>
              </div>
            </div>
            <button class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px;">Listen</button>
          </div>
        </div>

        <!-- Pagination -->
        <div style="grid-column: span 12; display: flex; justify-content: center; align-items: center; margin-top: 60px; gap: 16px;">
          <span style="font-size: 14px; cursor: pointer; color: #888;">← Previous</span>
          <span style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #000; padding: 2px 6px;">1</span>
          <span style="font-size: 14px; cursor: pointer; padding: 2px 6px;">2</span>
          <span style="font-size: 14px; color: #888;">...</span>
          <span style="font-size: 14px; cursor: pointer;">Next →</span>
        </div>
      </section>

      <!-- Podcast Subscribe CTA -->
      <section class="wf-newsletter-cta-band" style="border-bottom: none; background: #fafafa;">
        <div class="wf-newsletter-cta-content">
          <span class="wf-label">Subscribe Now</span>
          <h2 class="wf-h2" style="margin-bottom: 16px;">Listen to real lessons from inside agency businesses.</h2>
          <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 32px;">
            <button class="wf-btn wf-btn-secondary" onclick="alert('Open Spotify')">Spotify</button>
            <button class="wf-btn wf-btn-secondary" onclick="alert('Open Apple Podcasts')">Apple Podcasts</button>
            <button class="wf-btn wf-btn-secondary" onclick="alert('Open YouTube')">YouTube</button>
          </div>
          <p class="wf-body-small" style="margin-bottom: 12px; font-weight: bold;">Get new episodes in your inbox</p>
          <div class="wf-newsletter-form">
            <input type="email" class="wf-input-text" placeholder="Enter your email" />
            <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  contact: {
    title: 'CONTACT US PAGE',
    annotations: [
      { num: 1, title: 'Split Form Columns', body: 'Left side shows client quote verification and trust signs, right side holds form fields.', top: '150px', left: '160px' },
      { num: 2, title: 'Form Input Fields', body: 'Form elements: Name, Email, Topic Dropdown, and Message, with a Send trigger.', top: '230px', left: '800px' },
      { num: 3, title: 'Categorized FAQs', body: 'Interactive accordion lists filtered by sidebar categories (General, Podcast, Selling, etc.).', top: '780px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('contact')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px;">
        <!-- Left: Form details, logos & quotes -->
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: center; gap: 32px;">
          <div>
            <span class="wf-label">Get in Touch</span>
            <h1 class="wf-h1" style="margin-bottom: 16px;">Get in Touch</h1>
            <p class="wf-body">We'd love to hear from you. Let us know what topics you'd love us to write more about, or how we can improve our offering.</p>
          </div>
          
          <div style="border-left: 2px solid #000; padding-left: 16px; font-style: italic;">
            <p class="wf-body-small" style="color: #000;">"Having listened to their podcast and gone through the content on the site, it has given me a lot of confidence." — Agency Founder</p>
          </div>

          <div style="border-left: 2px solid #000; padding-left: 16px; font-style: italic;">
            <p class="wf-body-small" style="color: #000;">"Peter and Sei-Wook have been a great resource for agency owners." — Agency Operator</p>
          </div>

          <div>
            <span class="wf-label" style="font-size: 10px; margin-bottom: 12px;">Operating Portfolio Agencies</span>
            <div style="display: flex; gap: 16px; align-items: center; opacity: 0.5;">
              <span class="wf-icon-placeholder" style="width: 60px; height: 30px;"><span style="font-size: 9px; position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);">Logo</span></span>
              <span class="wf-icon-placeholder" style="width: 60px; height: 30px;"><span style="font-size: 9px; position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);">Logo</span></span>
              <span class="wf-icon-placeholder" style="width: 60px; height: 30px;"><span style="font-size: 9px; position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);">Logo</span></span>
              <span class="wf-icon-placeholder" style="width: 60px; height: 30px;"><span style="font-size: 9px; position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);">Logo</span></span>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div style="grid-column: span 6;">
          <div style="border: 2px solid #000; padding: 40px; background: #ffffff;">
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div>
                <label class="wf-label">Name</label>
                <input type="text" class="wf-input-text" placeholder="Your name" />
              </div>
              <div>
                <label class="wf-label">Email</label>
                <input type="email" class="wf-input-text" placeholder="Your email address" />
              </div>
              <div>
                <label class="wf-label">Topic</label>
                <select class="wf-input-text" style="padding: 0 12px; appearance: auto;">
                  <option>General Inquiry</option>
                  <option>Podcast Pitch / Topic</option>
                  <option>Partnership Inquiry</option>
                  <option>Selling Your Agency</option>
                </select>
              </div>
              <div>
                <label class="wf-label">Message</label>
                <textarea class="wf-input-text" style="height: 120px; padding: 12px; font-family: inherit; resize: none;" placeholder="Tell us what you need..."></textarea>
              </div>
              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Message Sent!')">Send Message</button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section with Sidebar Tabs -->
      <section class="wf-section-pad grid-container" style="border-bottom: none;">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">Common Questions</span>
          <h2 class="wf-h2">Frequently Asked Questions</h2>
        </div>

        <div style="grid-column: span 3; display: flex; flex-direction: column; gap: 8px;">
          <span class="wf-filter-tab active" id="contact-tab-general" style="text-align: left; display: block; border-radius: 0; cursor: pointer;" onclick="filterContactFAQ('general')">General</span>
          <span class="wf-filter-tab" id="contact-tab-podcast" style="text-align: left; display: block; border-radius: 0; cursor: pointer;" onclick="filterContactFAQ('podcast')">Podcast</span>
          <span class="wf-filter-tab" id="contact-tab-partnerships" style="text-align: left; display: block; border-radius: 0; cursor: pointer;" onclick="filterContactFAQ('partnerships')">Partnerships</span>
          <span class="wf-filter-tab" id="contact-tab-selling" style="text-align: left; display: block; border-radius: 0; cursor: pointer;" onclick="filterContactFAQ('selling')">Selling Your Agency</span>
        </div>

        <div style="grid-column: span 9;" id="contact-faq-content">
          <div class="wf-accordion contact-faq-item faq-general">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">What is AgencyHabits? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">AgencyHabits is a B2B media and education platform for agency operators, run by the team at Barrel Holdings. We share real learnings, tools, and ideas drawn from practical operations.</div>
          </div>
          <div class="wf-accordion contact-faq-item faq-general">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">Is the content free? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">Most of the content, templates, checklist resources, and episodes are completely free. We charge for a few premium templates such as the Business Development Collection.</div>
          </div>
          <div class="wf-accordion contact-faq-item faq-podcast" style="display: none;">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">How do I listen to the podcast? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">The AgencyHabits Podcast is available on Spotify, Apple Podcasts, YouTube, and directly on the site.</div>
          </div>
          <div class="wf-accordion contact-faq-item faq-podcast" style="display: none;">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">Can I suggest a podcast topic? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">Yes! You can suggest topics or guest pitches using the contact form above, selecting "Podcast" as your topic dropdown choice.</div>
          </div>
          <div class="wf-accordion contact-faq-item faq-partnerships" style="display: none;">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">How do we partner with AgencyHabits? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">We are open to partnerships with brands serving agency owners. Send us a message using the form above selecting "Partnership Inquiry" and we will review it.</div>
          </div>
          <div class="wf-accordion contact-faq-item faq-selling" style="display: none;">
            <div class="wf-accordion-header" onclick="toggleAccordion(this)">How do I sell my agency to Barrel Holdings? <span class="wf-accordion-icon">+</span></div>
            <div class="wf-accordion-content">Please visit <a href="#" onclick="alert('Redirecting to barrelholdings.com')">barrelholdings.com</a> to see if your agency fits our acquisition criteria and send us a direct message.</div>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  thelist: {
    title: 'THE LIST PAGE',
    annotations: [
      { num: 1, title: 'Introduction Layout', body: 'Outlines the concept of compounding habits to drive agency value.', top: '150px', left: '160px' },
      { num: 2, title: 'Numbered Habits Item List', body: 'Features large serif numbers (1-10) with two-paragraph descriptions and detailed layouts.', top: '350px', left: '160px' },
      { num: 3, title: 'Interspersed Image Placeholders', body: 'Visual placeholders broken up every 3 habits to structure typography-heavy layout.', top: '1350px', left: '160px' }
    ],
    render: () => `
      ${getHeaderHTML('thelist')}

      <section class="grid-container" style="height: 820px; align-items: center; display: grid; border-bottom: 1px solid var(--wf-border-muted); padding-top: 0; padding-bottom: 0;">
        <div style="grid-column: 3 / span 8; text-align: center; display: flex; flex-direction: column; gap: 20px; justify-content: center; align-items: center; height: 100%;">
          <span class="wf-label" style="letter-spacing: 2px; font-size: 14px;">Methodology</span>
          <h1 class="wf-h1" style="font-family: Georgia, serif; font-size: 64px;">The List</h1>
          <p class="wf-body-large" style="color: #000; font-weight: 500;">"The thing about habits is that doing them just once doesn't really amount to much. The key is to work these into your business so that they are easily repeatable and recurring."</p>
          <p class="wf-body">Below are ten habits to get you started. Over time, these activities will compound and create substantial long-term value for your agency, improving alignment, margins, and pipeline flow.</p>
          <div style="border: 1px dashed #000; padding: 16px; background: #fafafa; font-family: Courier, monospace; font-size: 13px; text-align: left; margin-top: 16px; max-width: 600px; width: 100%;">
            <strong>[INTERACTIVE SPEC NOTE]</strong>: This page will feature scroll-triggered animations. As the user scrolls, each habit step text block will activate, and the corresponding bottom image will animate/morph into view to make the vertical scroll journey highly engaging.
          </div>
        </div>
      </section>

      <!-- Numbered List of Habits -->
      <section class="grid-container" style="margin-bottom: 80px;">
        <div style="grid-column: 3 / span 8;">
          
          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">01</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">After-Action Reviews</h2>
              <p class="wf-body" style="margin-bottom: 12px;">After a project or once a quarter for retainers, get together with those involved and find out: what went well, what's not going well, and what can we do to improve? Document these & disseminate learnings to the entire team.</p>
              <p class="wf-body">Let these reviews drive continuous improvement initiatives within the agency, leading to new SOPs, smoother client communication, and better team collaboration.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: After-Action Reviews]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">02</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Weekly Business Development Meeting</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Get together once a week with relevant team members to check in on all active opportunities (new business & existing clients). Align on the status, blockages, and next steps for each opportunity.</p>
              <p class="wf-body">Check in on progress towards financial goals and reflect on recent wins/losses to takeaway concrete pipeline learnings.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: BD Pipeline Matrix]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">03</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Monthly Team Meeting</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Hold a monthly gathering with the entire agency to share important updates and, more importantly, celebrate launches, client wins, and commendable individual performance.</p>
              <p class="wf-body">Prepare structured slides, highlight specific individuals, and involve different team presenters to build momentum and shared purpose.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Team Celebration Session]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">04</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Weekly Outreach Emails</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Regardless of your other marketing efforts, take a few minutes each week to send a pre-determined number of outbound emails to prospects, past partners, or industry peers.</p>
              <p class="wf-body">Consistently hit your outbound quota (2, 5, or 10 per week) without skipping weeks. The compound effects will yield a regular flow of inquiries.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Relationship Tracking Template]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">05</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Monthly Newsletter Email</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Build a structured mailing list of clients, friends, advisors, and advocates. Send a monthly email keeping them in the loop about client work, projects launched, or thought leadership.</p>
              <p class="wf-body">This simple habit keeps your agency top-of-mind for referrals when opportunities arise in their networks.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Campaign Analytics Screenshot]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">06</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Weekly Client Account Check-In</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Conduct a weekly alignment call with all account managers or running client leaders to review the client roster and flag operational risks early.</p>
              <p class="wf-body">Discuss client health, budget utilization, and scope drift to protect delivery margins before problems escalate.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Client Health Matrix]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">07</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Quarterly Business Review</h2>
              <p class="wf-body" style="margin-bottom: 12px;">For key clients, holding a quarterly review helps set the strategic tone. Review achievements from the past quarter, check impact metrics, and align on upcoming roadmaps.</p>
              <p class="wf-body">This elevates the agency from a simple vendor to a strategic partner integrated into the client's growth.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Executive Roadmap Slide]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">08</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Mind the Bottom</h2>
              <p class="wf-body" style="margin-bottom: 12px;">This habit is all about identifying and managing underperformers inside the agency business. Act quickly to identify friction and skill gaps.</p>
              <p class="wf-body">Take structured steps to place employees on PIPs or transition them out to protect team culture and delivery quality.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Performance Review Scaffold]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: 1px solid var(--wf-border-muted);">
            <div>
              <div class="wf-list-item-num">09</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Client Feedback Surveys</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Establish a continuous practice to send client surveys after projects or on a fixed quarterly cycle to score responsiveness, quality, and overall service.</p>
              <p class="wf-body">Use standard metrics (e.g. Net Promoter Score) to benchmark client sentiment objectively.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Survey Questionnaire Template]</span>
            </div>
          </div>

          <div class="wf-list-item" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 540px; padding: 60px 0; border-bottom: none;">
            <div>
              <div class="wf-list-item-num">10</div>
              <h2 class="wf-h2" style="margin-bottom: 12px;">Annual/Quarterly Goals & Priorities</h2>
              <p class="wf-body" style="margin-bottom: 12px;">Make time each quarter (and more dedicated time before the new year) to set financial goals (revenue, profit targets, bookings) and strategic priorities.</p>
              <p class="wf-body">Define key metrics, allocate resources, and establish accountability milestones for the upcoming operating period.</p>
            </div>
            <div class="wf-placeholder-box" style="height: 240px; width: 100%; margin-top: 32px; flex-shrink: 0;">
              <span class="wf-placeholder-label">[Image Placeholder: Strategy Alignment Document]</span>
            </div>
          </div>

        </div>
      </section>

        </div>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  newsletter: {
    title: 'NEWSLETTER PAGE',
    annotations: [
      { num: 1, title: 'Hero Opt-In', body: 'Clean typographic hero with direct kit.com email input field.', top: '150px', left: '160px' },
      { num: 2, title: 'Sample Issue Preview', body: 'Displays screenshot placeholder of a past newsletter issue.', top: '480px', left: '80px' },
      { num: 3, title: 'Archive Feed', body: 'Lists chronological past issues with dates, subjects, and excerpt links.', top: '780px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('newsletter')}

      <section class="grid-container" style="height: 820px; align-items: center; display: grid; border-bottom: 1px solid var(--wf-border-muted); padding-top: 0; padding-bottom: 0;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 24px; align-items: center; justify-content: center; text-align: center; height: 100%;">
          <span class="wf-label" style="letter-spacing: 2px;">Weekly Insights</span>
          <h1 class="wf-h1">Behind-the-scenes content for agency operators. Every week.</h1>
          <p class="wf-body-large">Join 1,500+ agency owners getting real learnings, ideas, and resources from Barrel Holdings companies. No fluff. No vanity metrics. Just what actually works.</p>
          
          <div class="wf-newsletter-form" style="max-width: 600px; width: 100%;">
            <input type="email" class="wf-input-text" placeholder="Enter your email" style="height: 52px;" />
            <button class="wf-btn wf-btn-primary" style="height: 52px; padding: 0 32px;" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
          </div>
          <p class="wf-body-small" style="color: #666;">kit.com form embed integration. No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <!-- Sample preview -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 5; display: flex; flex-direction: column; justify-content: center; gap: 16px;">
          <span class="wf-label">What You'll Get</span>
          <h2 class="wf-h2">A Look Inside</h2>
          <div style="font-size: 14px; line-height: 1.6; display: flex; flex-direction: column; gap: 10px;">
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Weekly articles on operations, positioning, and BD</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Behind-the-scenes insights from Barrel Holdings agencies</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Tools, templates, and checklists (most of them free)</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Early access to new content and products</span></div>
          </div>
        </div>
        <div style="grid-column: span 7;">
          <div style="border: 1px solid #000; padding: 24px; background: #fff;">
            <div class="wf-placeholder-box" style="height: 180px; width: 100%; margin-bottom: 16px;">
              <span class="wf-placeholder-label">[Newsletter Screenshot]</span>
            </div>
            <span class="wf-body-small" style="font-weight: bold; color: #888;">Subject: How we think about agency positioning</span>
            <p class="wf-body-small" style="margin-top: 8px;">"This week, we're sharing the framework our agency leaders at Barrel Holdings use to define their positioning..."</p>
          </div>
        </div>
      </section>

      <!-- Past issues Archive -->
      <section class="wf-section-pad grid-container" style="border-bottom: none;">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">Past Issues</span>
          <h2 class="wf-h2">Recent Newsletters</h2>
        </div>

        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 19, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">How we think about agency positioning</span>
            <a href="#" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 12, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">The metrics that actually matter</span>
            <a href="#" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 05, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">Behind the scenes of an agency acquisition</span>
            <a href="#" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">Apr 28, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">How to prune your client roster</span>
            <a href="#" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  foundation: {
    title: 'FOUNDATION APP PAGE',
    annotations: [
      { num: 1, title: 'Positioning Audit Hero', body: 'Prompts users to enter their URL for a free 60-second positioning audit.', top: '150px', left: '160px' },
      { num: 2, title: 'Problem/Solution Matrix', body: 'Two-column layout matching common pain points to Foundation tool features.', top: '560px', left: '80px' },
      { num: 3, title: 'Output Preview Tabs', body: 'Tabs showcase the 4 dimensions of audit output (Positioning, Ecosystem, ICP, Service Offering).', top: '1050px', left: '80px' },
      { num: 4, title: 'Three-Step Process Flow', body: 'Horizontal layout walking through URL Scan, AI Analysis, and PDF generation.', top: '1560px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('foundation')}

      <!-- Hero -->
      <section class="grid-container" style="height: 820px; align-items: center; display: grid; border-bottom: 1px solid var(--wf-border-muted); padding-top: 0; padding-bottom: 0;">
        <div style="grid-column: 2 / span 10; display: flex; flex-direction: column; gap: 20px; align-items: center; justify-content: center; text-align: center; height: 100%;">
          <span style="border: 1px solid #000; padding: 4px 12px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Takes just ~60 seconds</span>
          <h1 class="wf-h1" style="max-width: 800px;">Build Your Agency's Strategic Foundation</h1>
          <p class="wf-body-large" style="max-width: 600px;">Define your positioning, ecosystem, ICP, and service offering. Just paste your website URL. AI does the rest.</p>
          
          <div style="border: 2px solid #000; padding: 24px; background: #fff; width: 100%; max-width: 600px; margin-top: 24px;">
            <div style="display: flex; gap: 12px;">
              <input type="text" class="wf-input-text" placeholder="https://youragency.com" style="height: 52px; flex: 1;" />
              <button class="wf-btn wf-btn-primary" style="height: 52px;" onclick="alert('Redirecting to foundation.agencyhabits.com')">Get Your Free Positioning Audit →</button>
            </div>
            <p class="wf-body-small" style="margin-top: 12px; color: #666;">No credit card required. Export your positioning audit as PDF.</p>
          </div>
          
          <div style="display: flex; gap: 24px; margin-top: 16px;">
            <a href="#" style="color: #000; font-weight: bold; font-size: 13px;" onclick="alert('Scrolls down to how it works')">See How It Works ↓</a>
          </div>
        </div>
      </section>

      <!-- Problem vs. Solution -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 6; padding-right: 40px; border-right: 1px solid #ddd;">
          <h3 class="wf-h2" style="margin-bottom: 24px; font-size: 22px;">The Problems You Face:</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Can't articulate your differentiation in a compelling way.</p></div>
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Take on clients who aren't ideal fits because positioning isn't clear.</p></div>
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Team members can't consistently explain what you do.</p></div>
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Website and pitch deck say different things.</p></div>
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Know you need clearer focus but can't find time for strategy.</p></div>
            <div style="display:flex; gap:12px;"><span class="wf-icon-placeholder wf-icon-circle" style="width:18px; height:18px; margin-top:2px;"></span> <p class="wf-body-small">Started positioning exercises but never finished them.</p></div>
          </div>
        </div>

        <div style="grid-column: span 6; padding-left: 40px;">
          <h3 class="wf-h2" style="margin-bottom: 24px; font-size: 22px;">How Foundation Addresses Them:</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">Clear positioning statement in 60 seconds.</p></div>
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">ICP defined with who to pursue and who to avoid.</p></div>
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">Shared language your whole team can use.</p></div>
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">One source of truth for all messaging.</p></div>
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">Strategy done automatically — no time investment needed.</p></div>
            <div style="display:flex; gap:12px;"><span>✓</span> <p class="wf-body-small">Finished audit, not another abandoned exercise.</p></div>
          </div>
        </div>
      </section>

      <!-- Output Preview Tabs -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 40px;">
          <span class="wf-label">See What You Get</span>
          <h2 class="wf-h2">Standard Audit Output Structure</h2>
        </div>

        <div style="grid-column: span 12; border: 1px solid #000; background: #fafafa;">
          <div style="display: flex; border-bottom: 1px solid #000; background: #eee;">
            <div id="foundation-tab-positioning" style="padding: 12px 24px; font-weight: bold; border-right: 1px solid #000; background: #fff; cursor: pointer;" onclick="switchFoundationTab('positioning')">Positioning</div>
            <div id="foundation-tab-ecosystem" style="padding: 12px 24px; font-weight: bold; border-right: 1px solid #000; cursor: pointer; color: #666;" onclick="switchFoundationTab('ecosystem')">Ecosystem</div>
            <div id="foundation-tab-icp" style="padding: 12px 24px; font-weight: bold; border-right: 1px solid #000; cursor: pointer; color: #666;" onclick="switchFoundationTab('icp')">Ideal Customer (ICP)</div>
            <div id="foundation-tab-services" style="padding: 12px 24px; font-weight: bold; cursor: pointer; color: #666;" onclick="switchFoundationTab('services')">Service Offering</div>
          </div>
          <div style="padding: 40px; display: flex; gap: 32px; align-items: center;" id="foundation-tab-content">
            <div style="flex: 1;">
              <h4 class="wf-h3" style="margin-bottom: 12px;">Core Positioning Statement</h4>
              <p class="wf-body-small" style="margin-bottom: 16px;">Foundation app generates a structured statement mapping your Category, Target Market, Core Wedge, and Proof Points.</p>
              <div style="border-left: 2px solid #000; padding-left: 16px; font-family: Courier, monospace; font-size: 13px; color: #333;">
                "For [ICP] who struggle with [Trigger], we provide [Category] through [Wedge] backed by [Proof Point]."
              </div>
            </div>
            <div class="wf-placeholder-box" style="width: 300px; height: 180px;"><span class="wf-placeholder-label">[UI]</span></div>
          </div>
        </div>
      </section>

      <!-- How it Works Flow -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">Process Flow</span>
          <h2 class="wf-h2">How It Works</h2>
        </div>

        <div style="grid-column: span 4; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div class="wf-icon-placeholder wf-icon-circle" style="width: 48px; height: 48px;"></div>
          <h4 class="wf-h3">1. Paste Your Website URL</h4>
          <p class="wf-body-small">We scan your site to find positioning signals, client patterns, and proof points. Takes about 30 seconds.</p>
        </div>

        <div style="grid-column: span 4; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div class="wf-icon-placeholder wf-icon-circle" style="width: 48px; height: 48px;"></div>
          <h4 class="wf-h3">2. AI Analyzes Your Positioning</h4>
          <p class="wf-body-small">Our AI reads between the lines of your website to identify your category, wedge, ICP, and service model. No questionnaire required.</p>
        </div>

        <div style="grid-column: span 4; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div class="wf-icon-placeholder wf-icon-circle" style="width: 48px; height: 48px;"></div>
          <h4 class="wf-h3">3. Get Your Positioning Audit</h4>
          <p class="wf-body-small">Review your complete positioning framework, edit anything, and export a polished PDF to share with your team.</p>
        </div>
      </section>

      <!-- Stats Row -->
      <section class="wf-section-pad grid-container" style="text-align: center;">
        <div style="grid-column: span 3;">
          <h3 class="wf-h2">~60 Secs</h3>
          <span class="wf-label">Audit Time</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2">$10K+</h3>
          <span class="wf-label">Manual Audit Value</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2">4 Dimensions</h3>
          <span class="wf-label">Positioning Matrix</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2">Hundreds</h3>
          <span class="wf-label">Of Audits Run</span>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="wf-section-pad grid-container" style="background: #000; color: #fff; text-align: center; border-bottom: none;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 24px; align-items: center;">
          <h2 class="wf-h2" style="color: #fff;">Ready to See Your Positioning?</h2>
          <p class="wf-body" style="color: #ccc; max-width: 600px;">The work that usually costs $10K+ and takes weeks — you'll have a working draft in ~60 seconds.</p>
          <button class="wf-btn wf-btn-secondary" style="border-color: #fff; color: #fff; background: transparent; height: 52px; padding: 0 32px;" onclick="alert('Redirecting to foundation.agencyhabits.com')">Get Your Free Positioning Audit →</button>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  kb: {
    title: 'KNOWLEDGE BASE PAGE',
    annotations: [
      { num: 1, title: 'AI Search Hero', body: 'Offers search query box with note explaining external Next.js app redirects.', top: '150px', left: '160px' },
      { num: 2, title: 'Three Feature Cards', body: 'Breaks down features: Ask Any Question, Real Content Database, Linked Sources.', top: '510px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('kb')}

      <!-- Hero -->
      <section class="grid-container" style="height: 820px; align-items: center; display: grid; border-bottom: 1px solid var(--wf-border-muted); padding-top: 0; padding-bottom: 0;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 24px; align-items: center; justify-content: center; text-align: center; height: 100%;">
          <span class="wf-label" style="letter-spacing: 2px;">Searchable Archives</span>
          <h1 class="wf-h1">Everything AgencyHabits Has Ever Published — Searchable.</h1>
          <p class="wf-body-large">An AI-powered knowledge base built on every article, podcast transcript, and resource from AgencyHabits. Ask any question, get structured answers with sources.</p>
          
          <div style="border: 2px solid #000; padding: 24px; background: #fff; width: 100%; max-width: 600px; margin-top: 16px;">
            <div style="display: flex; gap: 12px;">
              <input type="text" class="wf-input-text" placeholder="Ask a question (e.g., 'How to define ICP?')" style="height: 52px; flex: 1;" />
              <button class="wf-btn wf-btn-primary" style="height: 52px;" onclick="alert('Redirects to AI search tool')">Search →</button>
            </div>
            <p class="wf-body-small" style="margin-top: 12px; color: #888;">[External tool — URL to be confirmed with client before launch]</p>
          </div>
        </div>
      </section>

      <!-- Feature cards -->
      <section class="wf-section-pad grid-container" style="background: #fafafa; border-bottom: none;">
        <div style="grid-column: span 4; border: 1px solid #000; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">Ask Any Question</h4>
            <p class="wf-body-small">Type any question about running, growing, or selling your agency and get custom summaries.</p>
          </div>
        </div>

        <div style="grid-column: span 4; border: 1px solid #000; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">Get Answers from Real Content</h4>
            <p class="wf-body-small">Answers are generated entirely from actual AgencyHabits articles, podcast transcripts, and resources.</p>
          </div>
        </div>

        <div style="grid-column: span 4; border: 1px solid #000; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="wf-icon-placeholder" style="margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px;">Linked to Original Sources</h4>
            <p class="wf-body-small">Every generated answer links back to the original source article or episode so you can go deeper.</p>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="wf-section-pad grid-container" style="text-align: center; border-bottom: none;">
        <div style="grid-column: span 12;">
          <button class="wf-btn wf-btn-primary" onclick="alert('Opening external Search')">Explore the Knowledge Base →</button>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  events: {
    title: 'EVENTS PAGE',
    annotations: [
      { num: 1, title: 'Event Hero', body: 'Introduces monthly webinar / workshop gatherings. Register CTA triggers bottom form.', top: '150px', left: '160px' },
      { num: 2, title: 'Upcoming Events Grid', body: 'Lists future webinars with client note for dynamic date scheduling.', top: '480px', left: '80px' },
      { num: 3, title: 'Past Sessions Archive', body: 'Shows recording availability of past events (e.g. Revenue Generation).', top: '780px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('events')}

      <!-- Hero -->
      <section class="wf-section-pad grid-container" style="padding-top: 80px;">
        <div style="grid-column: span 7; display: flex; flex-direction: column; justify-content: center; gap: 20px;">
          <span class="wf-label">Monthly Operators Meeting</span>
          <h1 class="wf-h1">Monthly Knowledge Share</h1>
          <p class="wf-body-large">A monthly gathering for agency operators to learn, share, and connect.</p>
          <p class="wf-body-small" style="color: #666;">[Format TBD — confirm with client: webinar / live event / workshop]</p>
          <button class="wf-btn wf-btn-primary" style="align-self: flex-start; margin-top: 12px;" onclick="document.getElementById('event-form-section').scrollIntoView({behavior:'smooth'})">Register for Next Event →</button>
        </div>
        <div style="grid-column: span 5;">
          <div class="wf-placeholder-box" style="height: 280px; width: 100%;">
            <span class="wf-placeholder-label">[Event Graphic Placeholder]</span>
          </div>
        </div>
      </section>

      <!-- Upcoming events -->
      <section class="wf-section-pad grid-container" style="background: #fafafa;">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">Live Sessions</span>
          <h2 class="wf-h2">Upcoming Sessions</h2>
          <p class="wf-body-small" style="color:#888; margin-top: 4px;">[Real event dates and titles to be provided by client]</p>
        </div>

        <div style="grid-column: span 6; border: 1px solid #000; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; height: 260px;">
          <div>
            <span class="wf-body-small" style="font-weight: bold; color: #888;">June 2026</span>
            <h3 class="wf-h3" style="margin: 8px 0;">Agency Positioning Deep Dive</h3>
            <p class="wf-body-small">Online Webinar | 60 mins | Interactive Q&A. Learn how to map Category, Wedges, and Target ICP.</p>
          </div>
          <button class="wf-btn wf-btn-secondary" style="align-self: flex-start; height: 36px; padding: 0 16px;" onclick="document.getElementById('event-form-section').scrollIntoView({behavior:'smooth'})">Register →</button>
        </div>

        <div style="grid-column: span 6; border: 1px solid #000; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; height: 260px; opacity: 0.7;">
          <div>
            <span class="wf-body-small" style="font-weight: bold; color: #888;">July 2026</span>
            <h3 class="wf-h3" style="margin: 8px 0;">[Title TBD]</h3>
            <p class="wf-body-small">Format TBD | Operator Discussion Group. Dynamic topic updates upcoming.</p>
          </div>
          <span style="font-size: 13px; font-weight: bold; color: #888;">Details Coming Soon</span>
        </div>
      </section>

      <!-- Past Sessions -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">Archive</span>
          <h2 class="wf-h2">Past Sessions</h2>
          <p class="wf-body-small" style="color:#888; margin-top: 4px;">[Archive content to be confirmed with client]</p>
        </div>

        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 100px; font-weight: bold;">May 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">Revenue Generation Habits</span>
            <span class="wf-body-small" style="background: #eee; padding: 2px 8px; border: 1px solid #000;">Recording Available</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 100px; font-weight: bold;">April 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">How to Think About Agency Pricing</span>
            <span class="wf-body-small" style="background: #eee; padding: 2px 8px; border: 1px solid #000;">Recording Available</span>
          </div>
        </div>
      </section>

      <!-- Registration Form Section -->
      <section id="event-form-section" class="wf-section-pad grid-container" style="min-height: 540px; align-items: center; display: grid; background: #fafafa; border-bottom: none;">
        <div style="grid-column: 3 / span 6; display: flex; flex-direction: column; justify-content: center; height: 100%;">
          <div style="border: 2px solid #000; padding: 40px; background: #ffffff;">
            <h3 class="wf-h2" style="font-size: 22px; margin-bottom: 8px; text-align: center;">Save My Spot</h3>
            <p class="wf-body-small" style="margin-bottom: 24px; text-align: center;">Register for the next live Knowledge Share. kit.com email integration.</p>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label class="wf-label">Name</label>
                <input type="text" class="wf-input-text" placeholder="Your name" />
              </div>
              <div>
                <label class="wf-label">Email</label>
                <input type="email" class="wf-input-text" placeholder="Enter your email" />
              </div>
              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Registered!')">Save My Spot</button>
            </div>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  }
};

// Toggle 12-column grid helper
function toggleGrid() {
  STATE.showGrid = !STATE.showGrid;
  const overlay = document.getElementById('grid-overlay');
  const btn = document.getElementById('btn-grid');
  if (STATE.showGrid) {
    overlay.style.display = 'grid';
    btn.classList.add('active');
  } else {
    overlay.style.display = 'none';
    btn.classList.remove('active');
  }
}

// Toggle annotations helper
function toggleAnnotations() {
  STATE.showAnnotations = !STATE.showAnnotations;
  const btn = document.getElementById('btn-annotations');
  const badges = document.querySelectorAll('.annotation-badge');
  if (STATE.showAnnotations) {
    btn.classList.add('active');
    badges.forEach(b => b.style.display = 'flex');
  } else {
    btn.classList.remove('active');
    badges.forEach(b => b.style.display = 'none');
  }
}

// Render active page
function renderActivePage() {
  const page = PAGES[STATE.activePageId];
  if (!page) return;

  // 1. Update Title display
  document.getElementById('page-title-display').innerText = page.title;

  // 2. Render Page HTML content inside canvas
  const canvas = document.getElementById('wireframe-canvas');
  
  // Reset scroll of viewport first
  document.getElementById('canvas-viewport').scrollTop = 0;
  
  canvas.innerHTML = `
    <!-- Grid overlay container -->
    <div id="grid-overlay" class="grid-overlay">
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
      <div class="grid-overlay-col"></div>
    </div>
    ${page.render()}
  `;

  // Restore device view state
  canvas.className = 'wireframe-canvas view-' + STATE.deviceView;

  // Restore section notes state
  const sidebar = document.getElementById('annotation-sidebar');
  if (sidebar) {
    sidebar.style.display = STATE.showSectionNotes ? 'flex' : 'none';
  }

  // Restore grid state on render
  const overlay = document.getElementById('grid-overlay');
  if (STATE.showGrid) {
    overlay.style.display = 'grid';
  } else {
    overlay.style.display = 'none';
  }

  // 3. Render Annotations sidebar list
  const listContainer = document.getElementById('annotation-list');
  listContainer.innerHTML = '';
  
  if (page.annotations && page.annotations.length > 0) {
    page.annotations.forEach(ann => {
      // Add text details in the sidebar panel
      const item = document.createElement('div');
      item.className = 'annotation-item';
      item.innerHTML = `
        <div class="annotation-item-header">
          <span class="annotation-num">${ann.num}</span>
          <span class="annotation-title">${ann.title}</span>
        </div>
        <div class="annotation-body">${ann.body}</div>
      `;
      listContainer.appendChild(item);

      // Add a visual circular badge overlay directly on the wireframe canvas
      const badge = document.createElement('div');
      badge.className = 'annotation-badge';
      badge.innerText = ann.num;
      badge.style.top = ann.top;
      badge.style.left = ann.left;
      badge.style.display = STATE.showAnnotations ? 'flex' : 'none';
      badge.onclick = () => {
        // Highlight/scroll to sidebar element
        item.style.backgroundColor = '#f6f8fa';
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => item.style.backgroundColor = 'transparent', 1500);
      };
      canvas.appendChild(badge);
    });
  } else {
    listContainer.innerHTML = '<p class="wf-body-small" style="color:#888; font-style:italic;">No annotations for this page.</p>';
  }

  // Update navigation items state in sidebar menu
  document.querySelectorAll('.menu-item').forEach(el => {
    if (el.getAttribute('data-page-id') === STATE.activePageId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Dynamic initializers for interactive widgets on specific pages
  if (STATE.activePageId === 'podcast') {
    updatePodcastArchiveDisplay();
  } else if (STATE.activePageId === 'contact') {
    filterContactFAQ('general');
  } else if (STATE.activePageId === 'foundation') {
    switchFoundationTab('positioning');
  }

  // Recalculate canvas zoom scale and scroll height bounds
  updateCanvasScale();
  setTimeout(updateCanvasScale, 50);
}

// Interactive helper for Contact Page FAQ categorization tabs
function filterContactFAQ(category) {
  const tabs = ['general', 'podcast', 'partnerships', 'selling'];
  tabs.forEach(t => {
    const tabEl = document.getElementById(`contact-tab-${t}`);
    if (tabEl) {
      if (t === category) {
        tabEl.classList.add('active');
      } else {
        tabEl.classList.remove('active');
      }
    }
  });

  const items = document.querySelectorAll('.contact-faq-item');
  items.forEach(item => {
    if (item.classList.contains(`faq-${category}`)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Content definitions for Foundation Tabs
const FOUNDATION_TABS_DATA = {
  positioning: {
    title: 'Core Positioning Statement',
    desc: 'Foundation app generates a structured statement mapping your Category, Target Market, Core Wedge, and Proof Points.',
    example: '"For [ICP] who struggle with [Trigger], we provide [Category] through [Wedge] backed by [Proof Point]."',
    imageLabel: '[UI]'
  },
  ecosystem: {
    title: 'Ecosystem Mapping',
    desc: 'Understand how your agency fits within the wider tech and service partner ecosystem. Identify key alliance opportunities.',
    example: '"Allies: [Platform Partners], [Complementary Agencies]. Growth Channels: [Referral Co-marketing]."',
    imageLabel: '[UI]'
  },
  icp: {
    title: 'Ideal Customer Profile (ICP)',
    desc: 'Define the precise characteristics of high-value client accounts, including key buying triggers and disqualifiers.',
    example: '"Revenue Stage: $10M-$50M ARR. Trigger: New executive hire or platform migration. Disqualifier: Under $5K monthly budget."',
    imageLabel: '[UI]'
  },
  services: {
    title: 'Service Offering Strategy',
    desc: 'Structure your services into clear tiers (Leads, Core delivery, and Land-and-Expand upsells) for maximum operational margin.',
    example: '"Entry Tier: [Positioning Audit]. Core Tier: [Full Strategy & SOP Build]. Retainer: [Fractional Advisory & Systems Check]."',
    imageLabel: '[UI]'
  }
};

// Interactive helper for Foundation App tabs
function switchFoundationTab(tabId) {
  STATE.foundationActiveTab = tabId;
  const tabData = FOUNDATION_TABS_DATA[tabId];
  if (!tabData) return;

  const tabs = ['positioning', 'ecosystem', 'icp', 'services'];
  tabs.forEach(t => {
    const tabEl = document.getElementById(`foundation-tab-${t}`);
    if (tabEl) {
      if (t === tabId) {
        tabEl.style.background = '#fff';
        tabEl.style.color = '#000';
      } else {
        tabEl.style.background = 'transparent';
        tabEl.style.color = '#666';
      }
    }
  });

  const contentEl = document.getElementById('foundation-tab-content');
  if (contentEl) {
    contentEl.innerHTML = `
      <div style="flex: 1;">
        <h4 class="wf-h3" style="margin-bottom: 12px;">${tabData.title}</h4>
        <p class="wf-body-small" style="margin-bottom: 16px;">${tabData.desc}</p>
        <div style="border-left: 2px solid #000; padding-left: 16px; font-family: Courier, monospace; font-size: 13px; color: #333;">
          ${tabData.example}
        </div>
      </div>
      <div class="wf-placeholder-box" style="width: 300px; height: 180px;"><span class="wf-placeholder-label">${tabData.imageLabel}</span></div>
    `;
  }
}

// Interactive helper for Podcast Archive Search
function filterPodcastArchive(query) {
  STATE.podcastSearchQuery = query.toLowerCase();
  STATE.podcastCurrentPage = 1;
  updatePodcastArchiveDisplay();
}

// Interactive helper for Podcast Archive Pagination
function changePodcastPage(page) {
  STATE.podcastCurrentPage = page;
  updatePodcastArchiveDisplay();
}

// Renders filtered and paginated podcast items in UI
function updatePodcastArchiveDisplay() {
  const query = STATE.podcastSearchQuery || '';
  const page = STATE.podcastCurrentPage || 1;
  const itemsPerPage = 3;

  const items = document.querySelectorAll('.podcast-ep-item');
  if (items.length === 0) return;

  let visibleItems = [];
  items.forEach(item => {
    const title = item.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      visibleItems.push(item);
      item.style.display = 'none';
    } else {
      item.style.display = 'none';
    }
  });

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = visibleItems.slice(start, end);
  pageItems.forEach(item => item.style.display = 'flex');

  const prevBtn = document.getElementById('podcast-page-prev');
  const nextBtn = document.getElementById('podcast-page-next');
  const page1 = document.getElementById('podcast-page-1');
  const page2 = document.getElementById('podcast-page-2');

  const totalPages = Math.ceil(visibleItems.length / itemsPerPage);

  if (page1) {
    if (page === 1) {
      page1.style.fontWeight = '700';
      page1.style.borderBottom = '2px solid #000';
    } else {
      page1.style.fontWeight = 'normal';
      page1.style.borderBottom = 'none';
    }
  }

  if (page2) {
    if (totalPages < 2) {
      page2.style.display = 'none';
    } else {
      page2.style.display = 'inline';
      if (page === 2) {
        page2.style.fontWeight = '700';
        page2.style.borderBottom = '2px solid #000';
      } else {
        page2.style.fontWeight = 'normal';
        page2.style.borderBottom = 'none';
      }
    }
  }

  if (prevBtn) {
    if (page === 1) {
      prevBtn.style.color = '#888';
      prevBtn.style.cursor = 'default';
      prevBtn.onclick = null;
    } else {
      prevBtn.style.color = '#000';
      prevBtn.style.cursor = 'pointer';
      prevBtn.onclick = () => changePodcastPage(page - 1);
    }
  }

  if (nextBtn) {
    if (page >= totalPages) {
      nextBtn.style.color = '#888';
      nextBtn.style.cursor = 'default';
      nextBtn.onclick = null;
    } else {
      nextBtn.style.color = '#000';
      nextBtn.style.cursor = 'pointer';
      nextBtn.onclick = () => changePodcastPage(page + 1);
    }
  }
}

// Toggle right annotation sidebar pane
function toggleSectionNotes() {
  STATE.showSectionNotes = !STATE.showSectionNotes;
  const sidebar = document.getElementById('annotation-sidebar');
  const btn = document.getElementById('btn-section-notes');
  if (sidebar && btn) {
    if (STATE.showSectionNotes) {
      sidebar.style.display = 'flex';
      btn.classList.add('active');
      btn.innerHTML = '<span class="wf-icon-placeholder" style="width: 12px; height: 12px; border-color: #666; margin-right: 4px;"></span> Hide Section Notes';
    } else {
      sidebar.style.display = 'none';
      btn.classList.remove('active');
      btn.innerHTML = '<span class="wf-icon-placeholder" style="width: 12px; height: 12px; border-color: #666; margin-right: 4px;"></span> Show Section Notes';
    }
  }
  
  // Recalculate scaling immediately since viewport width changed
  updateCanvasScale();
}

// Switch between Desktop, Tablet, and Mobile canvas view dimensions
function setDeviceView(device) {
  STATE.deviceView = device;
  const canvas = document.getElementById('wireframe-canvas');
  if (!canvas) return;

  const devices = ['desktop', 'tablet', 'phone'];
  devices.forEach(d => {
    const btn = document.getElementById(`btn-device-${d}`);
    if (btn) {
      if (d === device) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  canvas.classList.remove('view-desktop', 'view-tablet', 'view-phone');
  canvas.classList.add(`view-${device}`);

  // Scale the viewport to match the new size
  updateCanvasScale();
}

// Router trigger function
function navigateTo(pageId) {
  if (PAGES[pageId]) {
    STATE.activePageId = pageId;
    renderActivePage();
  }
}

// Recalculate canvas zoom scale dynamically to fit container width (Framer-like behavior)
function updateCanvasScale() {
  const viewport = document.getElementById('canvas-viewport');
  const wrapper = document.getElementById('canvas-scale-wrapper');
  const canvas = document.getElementById('wireframe-canvas');
  if (!viewport || !wrapper || !canvas) return;

  // Clear temporary styles to let browser calculate offsetHeight of unscaled canvas
  canvas.style.transform = 'none';
  wrapper.style.width = '';
  wrapper.style.height = '';

  const device = STATE.deviceView || 'desktop';
  let targetWidth = 1440;
  if (device === 'tablet') targetWidth = 768;
  if (device === 'phone') targetWidth = 375;

  const padding = 80; // 40px left + 40px right padding of .canvas-viewport
  const availableWidth = Math.max(320, viewport.clientWidth - padding);

  let scale = 1;
  if (availableWidth < targetWidth) {
    scale = availableWidth / targetWidth;
  }

  // Set the CSS scale transform on the canvas
  canvas.style.transform = `scale(${scale})`;

  // Adjust wrapper's visual bounding box so the scroll container knows the true scaled size
  const canvasHeight = canvas.offsetHeight;
  wrapper.style.width = `${targetWidth * scale}px`;
  wrapper.style.height = `${canvasHeight * scale}px`;
}

// Initialize application on load
window.addEventListener('DOMContentLoaded', () => {
  renderActivePage();
  updateCanvasScale();
  
  // Update scaling dynamically on window resize
  window.addEventListener('resize', updateCanvasScale);
});
