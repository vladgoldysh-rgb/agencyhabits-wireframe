// Application State & Wireframe Renderer for AgencyHabits Redesign

const STATE = {
  activePageId: 'home',
  showAnnotations: true,
  podcastSearchQuery: '',
  podcastCurrentPage: 1,
  foundationActiveTab: 'positioning',
  showSectionNotes: true,
  deviceView: 'desktop',
  currentCategory: 'Business Development',
  currentArticle: {
    category: 'Business Development',
    title: 'How to Scale Agency BD Beyond the Founder',
    author: 'Peter Kang',
    date: 'Apr 28, 2026'
  }
};

// Global Nav HTML Helper
function getHeaderHTML(activePageId) {
  return `
    <header class="wf-nav">
      <a href="#" class="wf-logo" onclick="navigateTo('home')">AgencyHabits</a>
      <nav class="wf-nav-links">
        <a href="#" class="wf-nav-link ${activePageId === 'articles' ? 'active' : ''}" onclick="navigateTo('articles')">Articles</a>
        <a href="#" class="wf-nav-link ${activePageId === 'podcast' ? 'active' : ''}" onclick="navigateTo('podcast')">Podcast</a>
        <a href="#" class="wf-nav-link ${activePageId === 'events' ? 'active' : ''}" onclick="navigateTo('events')">Events</a>
        <a href="#" class="wf-nav-link ${activePageId === 'tools' ? 'active' : ''}" onclick="navigateTo('tools')">Tools</a>
      </nav>
    </header>
  `;
}

// Global Newsletter CTA HTML Helper
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

// Global Footer HTML Helper
function getFooterHTML() {
  return `
    <footer class="wf-footer">
      <div class="wf-footer-top">
        <div>
          <a href="#" class="wf-logo" onclick="navigateTo('home')" style="margin-bottom: 16px; display: inline-block;">AgencyHabits</a>
          <p class="wf-body-small" style="max-width: 280px; color: #666;">Learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies.</p>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Explore</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#" class="wf-footer-link" onclick="navigateTo('articles')">Articles</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('podcast')">Podcast</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('events')">Events</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('tools')">Tools</a>
          </div>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Resources</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="#" class="wf-footer-link" onclick="navigateTo('about')">About</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('newsletter')">Newsletter</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('partnerships')">Partnerships</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('contact')">Contact</a>
            <a href="#" class="wf-footer-link" onclick="navigateTo('books')">Books</a>
          </div>
        </div>
        <div>
          <p class="wf-label" style="margin-bottom: 16px;">Barrel</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <a href="https://barrel-holdings.com" target="_blank" class="wf-footer-link">Barrel Holdings →</a>
            <a href="https://barrel-holdings.com" target="_blank" class="wf-footer-link">Sell your agency →</a>
          </div>
        </div>
      </div>
      <div class="wf-footer-bottom">
        <span class="wf-footer-copyright">© 2026 AgencyHabits. A Barrel Holdings product. All rights reserved.</span>
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
      { num: 1, title: 'Navigation Bar', body: 'New nav: Articles · Podcast · Events · Tools. Newsletter moved to footer.', top: '40px', left: '160px' },
      { num: 2, title: 'Hero Section', body: 'Free Positioning Audit as primary CTA, Newsletter subscribe as secondary. Revenue bracket eyebrow removed.', top: '180px', left: '120px' },
      { num: 3, title: 'Barrel Portfolio Strip', body: 'Trust signal. 6 agency logos from Barrel Holdings network.', top: '530px', left: '200px' },
      { num: 4, title: 'Latest Section', body: 'Three columns: last article / last podcast episode / next Knowledge Share.', top: '750px', left: '80px' },
      { num: 5, title: 'Start Here Series', body: 'Numbered series path — 3 articles in order. Links to sequential articles.', top: '1200px', left: '80px' },
      { num: 6, title: 'Survey-for-Frameworks', body: 'Email capture in exchange for 5 free frameworks.', top: '1650px', left: '80px' },
      { num: 7, title: 'Explore by Topic', body: '8 category tiles with bold typographic category labels (no images). Direct access to category hubs.', top: '2100px', left: '80px' },
      { num: 8, title: 'Tools & Ecosystem', body: 'Ramp-style layout: Free Positioning Audit (large left) + BD Collection + Exit Checklist (two right).', top: '2600px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('home')}
      
      <!-- Section 1: Hero -->
      <section class="wf-section-pad grid-container" style="padding-top: 100px; padding-bottom: 100px;">
        <div style="grid-column: span 7; display: flex; flex-direction: column; justify-content: center; gap: 24px;">
          <span class="wf-label">For agency founders and operators</span>
          <h1 class="wf-h1">Go behind the scenes of real agency businesses.</h1>
          <p class="wf-body-large">AgencyHabits provides learnings, ideas, and resources for agency operators drawn from Barrel Holdings companies. Barrel Holdings acquires and grows agency businesses.</p>
          <div style="display: flex; gap: 16px; margin-top: 12px; align-items: center;">
            <button class="wf-btn wf-btn-primary" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
            <a href="#home-newsletter-section" style="font-weight: 700; text-decoration: underline; font-size: 14px; color: #000;">Subscribe to the newsletter</a>
          </div>
        </div>
        <div style="grid-column: span 5;">
          <div class="wf-placeholder-box" style="height: 400px; width: 100%; background: linear-gradient(135deg, #1e293b 0%, #334155 100%);">
            <span class="wf-placeholder-label" style="color: #fff;">[Abstract Gradient Hero Image]</span>
          </div>
        </div>
      </section>

      <!-- Section 2: Barrel Portfolio Strip -->
      <section style="padding: 40px 0; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); background: #f8fafc;">
        <div class="grid-container" style="align-items: center;">
          <div style="grid-column: span 12; text-align: center; margin-bottom: 24px;">
            <span class="wf-body-small" style="text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Content drawn from operators running these agencies:</span>
          </div>
          <div style="grid-column: span 12; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;" class="wf-portfolio-strip-logos">
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">BARREL</div>
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">BX STUDIO</div>
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">MATYX</div>
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">AO2</div>
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">VAULTED OAK</div>
            <div style="font-weight: 800; font-size: 20px; color: #94a3b8; font-family: sans-serif;">PRIMA MODE</div>
          </div>
          <div style="grid-column: span 12; text-align: center; margin-top: 16px;">
            <span class="wf-body-small" style="color: #94a3b8; font-style: italic; font-size: 11px;">[Portfolio list to be confirmed by client]</span>
          </div>
        </div>
      </section>

      <!-- Section 3: Latest Section (3-column layout) -->
      <section class="wf-section-pad grid-container">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">What's New</span>
          <h2 class="wf-h2">Latest From the Platform</h2>
        </div>

        <!-- Col 1: Last Article -->
        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('articles')">
          <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);">
            <span class="wf-placeholder-label" style="color: #fff;">[Business Development Hub]</span>
          </div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Business Development</span>
                <span>Peter Kang</span>
              </div>
              <h3 class="wf-h3" style="margin-bottom: 12px; font-size: 18px;">How to Scale Agency BD Beyond the Founder</h3>
              <p class="wf-body-small" style="color: #666; margin-bottom: 12px;">Peter Kang | Apr 28, 2026 | 6 min read</p>
              <p class="wf-body-small">Most agencies plateau at the founder's capacity for sales. Here's the system we use...</p>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px; text-decoration: underline;">Read →</span>
          </div>
        </div>

        <!-- Col 2: Last Podcast Episode -->
        <div style="grid-column: span 4; cursor: pointer;" class="wf-article-card" onclick="navigateTo('episode_template')">
          <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);">
            <span class="wf-placeholder-label" style="color: #fff;">[Podcast Cover Art]</span>
          </div>
          <div class="wf-article-card-content" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
            <div>
              <div class="wf-meta-row" style="margin-bottom: 8px;">
                <span class="wf-category-tag" style="background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: #fff; border: none; font-size: 9px; padding: 2px 6px;">Latest Episode</span>
                <span style="font-size: 11px; color: #666;">44 min</span>
              </div>
              <h3 class="wf-h3" style="margin-bottom: 8px; font-size: 15px; line-height: 1.3; font-weight: 700;">EP.07 — 10 Essential Habits for Running a Successful Agency</h3>
              <p class="wf-body-small" style="color: #555; font-size: 11px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0;">Peter and Sei-Wook walk through the 10 habits that separate growing agencies from founder dependency...</p>
            </div>
            <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Listen & Transcript →</span>
          </div>
        </div>

        <!-- Col 3: Next Knowledge Share -->
        <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('events')">
          <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #10b981 0%, #047857 100%);">
            <span class="wf-placeholder-label" style="color: #fff;">[Knowledge Share Webinar]</span>
          </div>
          <div class="wf-article-card-content">
            <div>
              <div class="wf-meta-row">
                <span class="wf-category-tag">Next Session</span>
                <span style="color: #047857; font-weight: 700;">June 2026</span>
              </div>
              <h3 class="wf-h3" style="margin-bottom: 12px; font-size: 18px;">Agency Positioning Deep Dive</h3>
              <p class="wf-body-small" style="color: #666; margin-bottom: 12px;">Online · Zoom · 60 min · Free</p>
              <p class="wf-body-small">Join 39 registered agency operators for a live framework audit and group discussion.</p>
            </div>
            <span style="font-weight: 700; margin-top: 16px; font-size: 13px; text-decoration: underline;">Register →</span>
          </div>
        </div>
      </section>

      <!-- Section 4: Start Here Series -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); background: #ffffff; align-items: start;">
        <!-- Left Column (Sticky info) -->
        <div style="grid-column: span 4; position: sticky; top: 120px; display: flex; flex-direction: column; gap: 16px;">
          <span class="wf-label" style="letter-spacing: 2px;">START HERE</span>
          <h2 class="wf-h2" style="font-size: 28px; line-height: 1.2; margin: 0;">New to AgencyHabits? Start with these.</h2>
          <p class="wf-body-small" style="color: #666; margin: 0;">A sequenced path for first-time readers.</p>
          <!-- [Series order confirmed by client. Read Next links between articles in series.] -->
        </div>

        <!-- Right Column (Vertical list of cards with sticky stacking effect) -->
        <div style="grid-column: span 8; display: flex; flex-direction: column; gap: 0;">
          <!-- Item 1 -->
          <div style="position: sticky; top: 120px; background: #ffffff; border: 1px solid #cbd5e1; padding: 32px; margin-bottom: 24px; display: flex; gap: 24px; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); border-radius: 4px; z-index: 1; cursor: pointer;" onclick="navigateToArticle('Finance', 'Is Your Agency a Ponzi Scheme?', 'AgencyHabits', 'Dec 2025')">
            <span style="font-size: 36px; font-weight: 800; color: #cbd5e1; line-height: 1; width: 40px; flex-shrink: 0;">01</span>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span class="wf-category-tag" style="background: #eab308; color: #fff; border: none; font-size: 9px; padding: 2px 6px; align-self: flex-start;">FINANCE</span>
              <h3 class="wf-h3" style="font-size: 18px; margin: 4px 0 0 0; font-weight: bold; text-decoration: underline;">Is Your Agency a Ponzi Scheme?</h3>
              <p class="wf-body-small" style="color: #555; margin: 4px 0 12px 0;">The uncomfortable question every founder should ask about their revenue model.</p>
              <span style="font-weight: bold; font-size: 12px; text-decoration: underline;">Read →</span>
            </div>
          </div>

          <!-- Item 2 -->
          <div style="position: sticky; top: 150px; background: #ffffff; border: 1px solid #cbd5e1; padding: 32px; margin-bottom: 24px; display: flex; gap: 24px; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); border-radius: 4px; z-index: 2; cursor: pointer;" onclick="navigateToArticle('Business Development', 'Scaling Your Agency Beyond $2M', 'AgencyHabits', 'May 2026')">
            <span style="font-size: 36px; font-weight: 800; color: #cbd5e1; line-height: 1; width: 40px; flex-shrink: 0;">02</span>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span class="wf-category-tag" style="background: #3b82f6; color: #fff; border: none; font-size: 9px; padding: 2px 6px; align-self: flex-start;">BUSINESS DEVELOPMENT</span>
              <h3 class="wf-h3" style="font-size: 18px; margin: 4px 0 0 0; font-weight: bold; text-decoration: underline;">Scaling Your Agency Beyond $2M</h3>
              <p class="wf-body-small" style="color: #555; margin: 4px 0 12px 0;">The systems, hires, and mindset shifts that separate agencies that plateau from those that don't.</p>
              <span style="font-weight: bold; font-size: 12px; text-decoration: underline;">Read →</span>
            </div>
          </div>

          <!-- Item 3 -->
          <div style="position: sticky; top: 180px; background: #ffffff; border: 1px solid #cbd5e1; padding: 32px; margin-bottom: 24px; display: flex; gap: 24px; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); border-radius: 4px; z-index: 3; cursor: pointer;" onclick="navigateToArticle('Business Development', 'How to Scale Agency BD Beyond the Founder', 'Peter Kang', 'Apr 28, 2026')">
            <span style="font-size: 36px; font-weight: 800; color: #cbd5e1; line-height: 1; width: 40px; flex-shrink: 0;">03</span>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span class="wf-category-tag" style="background: #3b82f6; color: #fff; border: none; font-size: 9px; padding: 2px 6px; align-self: flex-start;">BUSINESS DEVELOPMENT</span>
              <h3 class="wf-h3" style="font-size: 18px; margin: 4px 0 0 0; font-weight: bold; text-decoration: underline;">How to Scale Agency BD Beyond the Founder</h3>
              <p class="wf-body-small" style="color: #555; margin: 4px 0 12px 0;">Most agencies plateau at the founder's capacity for sales. Here's the system we use.</p>
              <span style="font-weight: bold; font-size: 12px; text-decoration: underline;">Read →</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Survey-for-Frameworks -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); background: #fafafa;">
        <div style="grid-column: 2 / span 10; border: 1px solid #cbd5e1; padding: 48px; background: #fff; text-align: center; display: flex; flex-direction: column; gap: 16px; align-items: center;">
          <span class="wf-label" style="color: #3b82f6; margin: 0;">GET 5 FREE FRAMEWORKS</span>
          <h3 class="wf-h3" style="font-size: 26px; margin: 0;">Complete a short survey. Receive our 5 most useful agency frameworks.</h3>
          <p class="wf-body-small" style="color: #555; max-width: 620px; margin: 0 0 8px 0;">Tell us about your agency. We'll send you the exact templates our Barrel Holdings agencies use. [Survey-for-frameworks email capture. 5 specific frameworks TBD — client to confirm which ones.]</p>
          <div class="wf-newsletter-form" style="width: 100%; max-width: 480px; display: flex; gap: 8px;">
            <input type="email" class="wf-input-text" placeholder="Enter your email" style="flex: 1;" />
            <button class="wf-btn wf-btn-primary" style="height: 48px;" onclick="simulateFormSubmit(this, 'Frameworks sent! Check your inbox.')">Get the frameworks →</button>
          </div>
        </div>
      </section>

      <!-- Section 6: Topics - 8 tiles -->
      <section class="wf-section-pad grid-container wf-topics-grid" style="background: #f8fafc; border-top: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">Explore by Topic</span>
          <h2 class="wf-h2">Topics Hubs</h2>
        </div>
        
        <!-- Tile 1 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Business Development'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Business Development</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 2 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Finance'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Finance</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 3 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Leadership'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Leadership</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 4 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Positioning'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Positioning</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        
        <!-- Row 2 -->
        <!-- Tile 5 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Clients'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Clients</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 6 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #22c55e 0%, #15803d 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Talent'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Talent</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 7 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #f97316 0%, #c2410c 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Delivery'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Delivery</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
        <!-- Tile 8 -->
        <div style="grid-column: span 3; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); padding: 32px; height: 160px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; color: #fff;" onclick="STATE.currentCategory = 'Marketing'; navigateTo('category_hub')">
          <h3 class="wf-h3" style="color: #fff; margin: 0;">Marketing</h3>
          <span style="font-weight: 700; font-size: 14px;">Explore →</span>
        </div>
      </section>

      <!-- Section 7: Tools & Ecosystem - Ramp-style -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 40px;">
          <span class="wf-label">The AgencyHabits Platform Ecosystem</span>
          <h2 class="wf-h2">Tools & Community</h2>
        </div>

        <!-- Left card (~60%) -->
        <div style="grid-column: span 7; border: 1px solid var(--wf-border); padding: 48px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; min-height: 420px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="wf-label" style="margin-bottom: 0;">Free Positioning Audit</span>
              <span style="border: 1px solid #000; padding: 2px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Takes just ~60 seconds</span>
            </div>
            <h3 class="wf-h1" style="font-size: 32px; margin-bottom: 16px;">Build Your Agency's Strategic Foundation</h3>
            <p class="wf-body">Define your positioning, ecosystem, ICP, and service offering. Simply paste your website URL. AI reads between the lines and does the rest.</p>
          </div>
          <button class="wf-btn wf-btn-primary" style="align-self: flex-start; margin-top: 32px;" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
        </div>

        <!-- Right column (~40%) -->
        <div style="grid-column: span 5; display: flex; flex-direction: column; gap: 20px;">
          <!-- BD Collection Card -->
          <div style="border: 1px solid var(--wf-border); padding: 32px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
            <span style="position: absolute; top: 12px; right: 12px; background: #000; color: #fff; padding: 2px 8px; font-size: 9px; font-weight: bold; letter-spacing: 0.5px;">PREMIUM</span>
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span class="wf-label">BD Collection</span>
                <span style="border: 1px solid #e2e8f0; background: #f8fafc; padding: 2px 8px; font-size: 11px; font-weight: 700;">$599</span>
              </div>
              <h4 class="wf-h3" style="margin: 4px 0 12px 0;">Real proposals and SOWs from Barrel Holdings agencies.</h4>
            </div>
            <a href="#" onclick="navigateTo('bizdev_collection')" style="font-weight: 700; text-decoration: underline; display: inline-block;">Learn More →</a>
          </div>

          <!-- Exit Checklist Card -->
          <div style="border: 1px solid var(--wf-border); padding: 32px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span class="wf-label">Exit-Readiness Checklist</span>
                <span style="border: 1px solid #e2e8f0; background: #f8fafc; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #047857;">FREE</span>
              </div>
              <h4 class="wf-h3" style="margin: 4px 0 12px 0;">See your agency the way a buyer would.</h4>
            </div>
            <a href="#" onclick="navigateTo('exit_checklist')" style="font-weight: 700; text-decoration: underline; display: inline-block;">Download →</a>
          </div>
        </div>
      </section>

      <!-- Section 8: Newsletter CTA -->
      <div id="home-newsletter-section">
        ${getNewsletterCtaHTML()}
      </div>

      <!-- Section 9: About Barrel -->
      <section class="wf-section-pad grid-container" style="background: #f8fafc; border-top: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 48px;">
          <span class="wf-label">Built by Operators. For Operators.</span>
          <h2 class="wf-h2">We run agencies. This is what we've learned.</h2>
        </div>
        
        <div style="grid-column: span 4;">
          <div class="wf-placeholder-box" style="height: 240px; margin-bottom: 16px;">
            <span class="wf-placeholder-label">[Founder Photo: Peter + Sei-Wook]</span>
          </div>
          <p class="wf-body-small" style="color: #64748b; line-height: 1.6;">AgencyHabits is published by the team at Barrel Holdings - a portfolio of six agency businesses. Everything on this site comes from operators currently running the same plays.</p>
          <div style="margin-top: 16px;">
            <a href="https://barrel-holdings.com" target="_blank" style="color: #0f172a; font-weight: 700; font-size: 14px; text-decoration: underline; display: inline-block;">Thinking about selling your agency? →</a>
          </div>
        </div>

        <div style="grid-column: span 8; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Barrel</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">CPG Commerce & Shopify Plus Partner</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">BX Studio</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">B2B Marketing & Webflow Websites</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Matyx</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Home Services SEO & Local Digital Marketing</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">AO2</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Amazon Operations & Retail Media Management</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Vaulted Oak</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Web Development & Technical Retainer Support</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Prima Mode</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Health & Beauty Amazon Brand Growth</p>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  articles: {
    title: 'ARTICLES (ARTICLES HUB)',
    annotations: [
      { num: 1, title: 'Start Here Series', body: 'Series-based path at the top of the hub. Each article links to the next in sequence.', top: '180px', left: '120px' },
      { num: 2, title: 'Category Row Feed', body: 'Each section showcases 3 article cards with category-specific covers, moved below the series.', top: '750px', left: '80px' }
    ],
    render: () => {
      const categories = [
        { id: 'bd', name: 'Business Development', gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', articles: [
          { title: 'How to Scale Agency BD Beyond the Founder', author: 'Peter Kang', date: 'Apr 28, 2026' },
          { title: 'The Client Pruning Framework', author: 'AgencyHabits', date: 'Apr 14, 2026' },
          { title: 'What Does a Client Actually Buy When They Hire You?', author: 'AgencyHabits', date: 'Mar 17, 2026' }
        ]},
        { id: 'finance', name: 'Finance', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', articles: [
          { title: "Agency Cash Flow: What the P&L Isn't Telling You", author: 'AgencyHabits', date: 'Mar 31, 2026' },
          { title: "Reversing Your Agency's Eroding Profits", author: 'AgencyHabits', date: 'Jan 20, 2026' },
          { title: "Are You Calculating Your Agency's Profits Correctly?", author: 'AgencyHabits', date: 'Dec 2025' }
        ]},
        { id: 'leadership', name: 'Leadership', gradient: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', articles: [
          { title: 'Specializing Requires Commitment', author: 'AgencyHabits', date: 'Jan 6, 2026' },
          { title: 'The Org Chart Exercise Every Agency Founder Should Do', author: 'AgencyHabits', date: 'Nov 2025' },
          { title: 'Mind the Bottom', author: 'AgencyHabits', date: 'Oct 2025' }
        ]},
        { id: 'positioning', name: 'Positioning', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)', articles: [
          { title: 'How to Define Your Agency\'s ICP (Beyond "B2B SaaS")', author: 'Peter Kang', date: 'May 12, 2026' },
          { title: 'The Three Agency Ecosystem Archetypes', author: 'AgencyHabits', date: 'Mar 3, 2026' },
          { title: 'Specialization vs. Positioning', author: 'AgencyHabits', date: 'Feb 2026' }
        ]},
        { id: 'clients', name: 'Clients', gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', articles: [
          { title: 'The Client Pruning Framework', author: 'AgencyHabits', date: 'Apr 14, 2026' },
          { title: 'What Does a Client Actually Buy When They Hire You?', author: 'AgencyHabits', date: 'Mar 17, 2026' },
          { title: 'Client Experience vs. Quality Work', author: 'AgencyHabits', date: 'Dec 2025' }
        ]},
        { id: 'talent', name: 'Talent', gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)', articles: [
          { title: 'Hiring Is the Highest-Leverage Thing You Do', author: 'AgencyHabits', date: 'Sep 2025' },
          { title: 'When to Hire vs. When to Outsource', author: 'AgencyHabits', date: 'Aug 2025' },
          { title: 'How to Build a Team That Doesn\'t Depend on You', author: 'AgencyHabits', date: 'Jul 2025' }
        ]},
        { id: 'delivery', name: 'Delivery', gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)', articles: [
          { title: 'How Agencies Lose Margin on Delivery', author: 'AgencyHabits', date: 'Nov 2025' },
          { title: 'The Project Profitability Framework', author: 'AgencyHabits', date: 'Oct 2025' },
          { title: 'SOPs That Actually Get Used', author: 'AgencyHabits', date: 'Sep 2025' }
        ]},
        { id: 'marketing', name: 'Marketing', gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', articles: [
          { title: 'Why Your Agency Website Says Nothing', author: 'AgencyHabits', date: 'Feb 2026' },
          { title: 'Content Marketing for Agency Operators', author: 'AgencyHabits', date: 'Jan 2026' },
          { title: 'How to Build an Audience While Running a Business', author: 'AgencyHabits', date: 'Dec 2025' }
        ]}
      ];

      let sectionsHTML = '';

      categories.forEach(cat => {
        let cardsHTML = '';
        cat.articles.forEach(art => {
          cardsHTML += `
            <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('${cat.name.replace(/'/g, "\\'")}', '${art.title.replace(/'/g, "\\'")}', '${art.author.replace(/'/g, "\\'")}', '${art.date.replace(/'/g, "\\'")}')">
              <div class="wf-placeholder-box wf-article-card-image" style="background: ${cat.gradient}; height: 160px; display: flex; align-items: center; justify-content: center;">
                <span class="wf-placeholder-label" style="color: rgba(255,255,255,0.75); font-size: 12px; font-weight: bold;">[${cat.name.toUpperCase()} COVER]</span>
              </div>
              <div class="wf-article-card-content" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
                <div>
                  <div class="wf-meta-row" style="margin-bottom: 8px;">
                    <span class="wf-category-tag" style="background: ${cat.gradient}; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">${cat.name.toUpperCase()}</span>
                  </div>
                  <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${art.title}</h4>
                  <span class="wf-body-small" style="color: #666; font-size: 11px;">by ${art.author} · ${art.date}</span>
                </div>
                <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Read →</span>
              </div>
            </div>
          `;
        });

        sectionsHTML += `
          <div id="category-${cat.id}" style="grid-column: span 12; margin-top: 60px; scroll-margin-top: 100px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 24px;">
              <h2 class="wf-h2" style="margin: 0; font-size: 24px; text-transform: uppercase; font-family: sans-serif; letter-spacing: 1px;">${cat.name}</h2>
              <a href="#" class="wf-body-small" style="font-weight: 700; text-decoration: underline;" onclick="STATE.currentCategory = '${cat.name.replace(/'/g, "\\'")}'; navigateTo('category_hub'); return false;">View all →</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
              ${cardsHTML}
            </div>
          </div>
        `;
      });

      return `
        ${getHeaderHTML('articles')}
        
        <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
          <div style="grid-column: span 12; margin-bottom: 32px;">
            <span class="wf-label">AgencyHabits Editorial</span>
            <h1 class="wf-h1" style="font-size: 36px; margin-top: 8px;">Practical thinking for agency operators.</h1>
          </div>

          <!-- Start Here Series Row -->
          <div style="grid-column: span 12; margin-bottom: 24px;">
            <span class="wf-label" style="letter-spacing: 2px;">START HERE</span>
            <h2 class="wf-h2" style="font-size: 24px; margin-top: 8px;">New? Start with these.</h2>
            <p class="wf-body-small" style="color: #666; margin-top: 4px;">[Series-based path. Each article links to the next in the sequence.]</p>
          </div>
          
          <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; margin-bottom: 40px;">
            <!-- Card 1 -->
            <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('Finance', 'Is Your Agency a Ponzi Scheme?', 'AgencyHabits', 'Dec 2025')">
              <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                <span style="position: absolute; top: 12px; left: 12px; background: #000; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">1</span>
                <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 12px;">[FINANCE COVER]</span>
              </div>
              <div class="wf-article-card-content" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
                <div>
                  <div class="wf-meta-row" style="margin-bottom: 8px;">
                    <span class="wf-category-tag" style="background: #eab308; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">FINANCE</span>
                  </div>
                  <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700;">Is Your Agency a Ponzi Scheme?</h4>
                  <span class="wf-body-small" style="color: #666; font-size: 11px;">Read Next → Scaling Your Agency Beyond $2M</span>
                </div>
                <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Read →</span>
              </div>
            </div>
            <!-- Card 2 -->
            <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('Business Development', 'Scaling Your Agency Beyond $2M', 'AgencyHabits', 'May 2026')">
              <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                <span style="position: absolute; top: 12px; left: 12px; background: #000; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">2</span>
                <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 12px;">[BUSINESS DEVELOPMENT COVER]</span>
              </div>
              <div class="wf-article-card-content" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
                <div>
                  <div class="wf-meta-row" style="margin-bottom: 8px;">
                    <span class="wf-category-tag" style="background: #3b82f6; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">BUSINESS DEVELOPMENT</span>
                  </div>
                  <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700;">Scaling Your Agency Beyond $2M</h4>
                  <span class="wf-body-small" style="color: #666; font-size: 11px;">Read Next → How to Scale Agency BD Beyond the Founder</span>
                </div>
                <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Read →</span>
              </div>
            </div>
            <!-- Card 3 -->
            <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('Business Development', 'How to Scale Agency BD Beyond the Founder', 'Peter Kang', 'Apr 28, 2026')">
              <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                <span style="position: absolute; top: 12px; left: 12px; background: #000; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">3</span>
                <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 12px;">[BUSINESS DEVELOPMENT COVER]</span>
              </div>
              <div class="wf-article-card-content" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
                <div>
                  <div class="wf-meta-row" style="margin-bottom: 8px;">
                    <span class="wf-category-tag" style="background: #3b82f6; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">BUSINESS DEVELOPMENT</span>
                  </div>
                  <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700;">How to Scale Agency BD Beyond the Founder</h4>
                  <span class="wf-body-small" style="color: #666; font-size: 11px;">Read Next → Free Positioning Audit</span>
                </div>
                <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Read →</span>
              </div>
            </div>
          </div>

          <!-- Category Sections Feed -->
          ${sectionsHTML}
        </section>

        ${getNewsletterCtaHTML()}
        ${getFooterHTML()}
      `;
    }
  },
  article_template: {
    title: 'ARTICLE TEMPLATE',
    annotations: [
      { num: 1, title: 'TL;DR Block', body: 'Lets time-constrained founders scan key takeaways before reading the full piece.', top: '480px', left: '160px' },
      { num: 2, title: 'Sticky TOC', body: 'Auto-generated from headers. Stays floating in the right rail on desktop.', top: '650px', left: '1000px' },
      { num: 3, title: 'Founder Insight Callout', body: 'Peer-to-peer trenches voice from real agency experience.', top: '1020px', left: '120px' },
      { num: 4, title: 'Numbers Callout Tile', body: 'Benchmark statistics pulled directly into a highlighted tile.', top: '1450px', left: '120px' },
      { num: 5, title: 'Barrel Agency Sidebar', body: 'Trust signal citing real Barrel Holdings portfolio operations data.', top: '1850px', left: '680px' },
      { num: 6, title: 'Mid-article Newsletter CTA', body: 'Inline newsletter subscription form at ~50% scroll height.', top: '2250px', left: '360px' },
      { num: 7, title: 'Contextual Upsell Card', body: 'Custom recommendation driving traffic to the paid BD Collection resource.', top: '3480px', left: '80px' },
      { num: 8, title: 'Sticky Podcast Sidebar', body: 'Desktop only. Displays a contextually relevant podcast episode in the right rail.', top: '880px', left: '1000px' }
    ],
    render: () => {
      const art = STATE.currentArticle || {
        category: 'Business Development',
        title: 'How to Scale Agency BD Beyond the Founder',
        author: 'Peter Kang',
        date: 'Apr 28, 2026'
      };
      
      let categoryGradient = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
      let upsellHTML = '';
      
      const catUpper = art.category.toUpperCase();
      if (catUpper === 'BUSINESS DEVELOPMENT') {
        categoryGradient = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
        upsellHTML = `
          <div style="margin-top: 48px; border: 1px solid #24463d; padding: 32px; background: #f0fdf4; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 4px;">RECOMMENDED FOR THIS TOPIC</span>
              <h4 class="wf-h3" style="margin: 0; font-size: 18px;">The Business Development Collection</h4>
              <p class="wf-body-small" style="margin: 4px 0 0 0; color: #475569;">Real, winning proposals and statements of work from Barrel Holdings agencies.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <span style="font-size: 18px; font-weight: 800; display: block; margin-bottom: 8px;">$599</span>
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('bizdev_collection')">Learn More →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'FINANCE') {
        categoryGradient = 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)';
        upsellHTML = `
          <div style="margin-top: 48px; border: 1px solid #24463d; padding: 32px; background: #f0fdf4; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 4px;">RECOMMENDED FOR THIS TOPIC</span>
              <h4 class="wf-h3" style="margin: 0; font-size: 18px;">The Exit-Readiness Checklist</h4>
              <p class="wf-body-small" style="margin: 4px 0 0 0; color: #475569;">See your agency the way a buyer would. Free checklist download.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <span style="font-size: 18px; font-weight: 800; display: block; margin-bottom: 8px; color: #10b981;">FREE</span>
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('exit_checklist')">Download →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'POSITIONING') {
        categoryGradient = 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)';
        upsellHTML = `
          <div style="margin-top: 48px; border: 1px solid #24463d; padding: 32px; background: #f0fdf4; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 4px;">RECOMMENDED FOR THIS TOPIC</span>
              <h4 class="wf-h3" style="margin: 0; font-size: 18px;">Foundation App positioning audit</h4>
              <p class="wf-body-small" style="margin: 4px 0 0 0; color: #475569;">Get a free 60-second positioning audit for your agency.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <span style="font-size: 18px; font-weight: 800; display: block; margin-bottom: 8px; color: #047857;">FREE</span>
              <button class="wf-btn wf-btn-primary" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'LEADERSHIP') {
        categoryGradient = 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)';
        upsellHTML = `
          <div style="margin-top: 48px; border: 1px solid #24463d; padding: 32px; background: #f0fdf4; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 4px;">RECOMMENDED FOR THIS TOPIC</span>
              <h4 class="wf-h3" style="margin: 0; font-size: 18px;">The Annual Goal Setting Template</h4>
              <p class="wf-body-small" style="margin: 4px 0 0 0; color: #475569;">Align your team on the targets that move your agency forward.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <span style="font-size: 18px; font-weight: 800; display: block; margin-bottom: 8px; color: #f59e0b;">FREE</span>
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('goal_template')">Download →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'CLIENTS') {
        categoryGradient = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)';
      } else if (catUpper === 'TALENT') {
        categoryGradient = 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)';
      } else if (catUpper === 'DELIVERY') {
        categoryGradient = 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)';
      } else if (catUpper === 'MARKETING') {
        categoryGradient = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
      }

      if (!upsellHTML) {
        upsellHTML = `
          <div style="margin-top: 48px; border: 1px solid #24463d; padding: 32px; background: #f0fdf4; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 4px;">RECOMMENDED RESOURCE</span>
              <h4 class="wf-h3" style="margin: 0; font-size: 18px;">Weekly Newsletter</h4>
              <p class="wf-body-small" style="margin: 4px 0 0 0; color: #475569;">Join 1,500+ founders running $750K–$3M agencies.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('newsletter')">Subscribe →</button>
            </div>
          </div>
        `;
      }

      return `
      <div style="position: sticky; top: 0; left: 0; width: 100%; height: 4px; background: #e2e8f0; z-index: 100;">
        <div style="width: 45%; height: 100%; background: #24463d;"></div>
      </div>

      ${getHeaderHTML('articles')}
      
      <!-- Article Header (Unified Hero with Gradient Background) -->
      <section class="grid-container" style="padding-top: 80px; padding-bottom: 80px; position: relative; overflow: hidden; border-bottom: 1px solid var(--wf-border-muted); margin-bottom: 60px;">
        <!-- Background Layer with Opacity -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${categoryGradient}; opacity: 0.4; z-index: 1;"></div>
        
        <div style="grid-column: span 12; display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; z-index: 2; text-align: center;">
          <a href="#" class="wf-category-tag" onclick="navigateTo('read')" style="align-self: center; background: #000; color: #fff; border: none; font-size: 10px; font-weight: bold; letter-spacing: 1px; padding: 4px 12px;">${art.category.toUpperCase()}</a>
          <h1 class="wf-h1" style="max-width: 800px; text-align: center; margin: 8px 0; font-size: 38px; line-height: 1.2;">${art.title}</h1>
          
          <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
            <div class="wf-icon-placeholder wf-icon-circle" style="width: 36px; height: 36px; background: #fff; border: 1px solid #000;"></div>
            <div style="text-align: left;">
              <span style="font-weight: 700; display: block; font-size: 14px; color: #000;">${art.author || 'Peter Kang'}</span>
              <span style="font-size: 12px; color: #333;">Co-founder, Barrel Holdings · ${art.date} · 6 min read</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Layout: Content + Sticky Sidebar -->
      <section class="grid-container" style="padding-bottom: 120px; align-items: start;">
        <div style="grid-column: span 8; display: flex; flex-direction: column; gap: 32px;">
          
          <!-- TL;DR Block -->
          <div style="border: 2px solid #000; padding: 24px; background: #f8fafc; display: flex; flex-direction: column; gap: 12px;">
            <span class="wf-label" style="margin-bottom: 0;">TL;DR</span>
            <ul style="margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px;" class="wf-body">
              <li>Review wins and losses to protect operational margins.</li>
              <li>Systems outperform relationships in business development.</li>
              <li>Defining the wedge is key to scaling beyond founder capacity.</li>
            </ul>
            <a href="#full-piece" style="font-size: 13px; font-weight: 700; color: #000; text-decoration: underline; margin-top: 8px;">Skip to full piece ↓</a>
          </div>

          <div id="full-piece" class="wf-body" style="line-height: 1.8; display: flex; flex-direction: column; gap: 24px;">
            <p class="wf-body-large">A founder we know doubled revenue in 18 months. Not by hiring a sales team. By getting ruthlessly clear on who they were for - and building a repeatable system around that clarity.</p>
            <p>Most agency owners view sales as a dark art or a series of random lunch meetings. In reality, business development is a delivery system. Just like project management, it requires inputs, schedules, and accountability.</p>
            
            <!-- Founder Insight Callout Box -->
            <div style="border-left: 4px solid #24463d; padding: 16px 24px; background: #f0fdf4; margin: 24px 0;">
              <span class="wf-label" style="color: #166534; margin-bottom: 8px;">FROM THE TRENCHES</span>
              <p style="font-style: italic; margin-bottom: 8px;" class="wf-body-large">"We spent three years taking every project that came our way. The moment we defined our ICP - and started saying no to everything outside it - our close rate went from 20% to 65%."</p>
              <span style="font-size: 13px; font-weight: 700; color: #166534;">- Peter Kang, Barrel Holdings</span>
            </div>

            <h2 class="wf-h2" style="font-size: 24px; margin-top: 24px;">1. Systematizing Operations</h2>
            <p>Success requires structured, consistent plays. Founder-led sales are highly effective at first. The founder has the network, the authority, and the deep industry expertise. But it doesn't scale. Eventually, the founder runs out of time, and the agency hits a growth ceiling.</p>
            
            <!-- Numbers Callout Tile -->
            <div style="background: #0f172a; color: #fff; padding: 32px; text-align: center; border-radius: 4px; margin: 24px 0;">
              <span style="font-size: 64px; font-weight: 900; color: #f43f5e; display: block; line-height: 1;">80%</span>
              <span style="font-size: 14px; color: #94a3b8; display: block; max-width: 480px; margin: 12px auto 0 auto;">of agency founders say BD is the highest-leverage thing they do - and the thing they are worst at systematizing.</span>
            </div>

            <!-- Mid-article Newsletter CTA -->
            <div style="border: 1px solid var(--wf-border); padding: 24px; background: #fafafa; margin: 24px 0; display: flex; flex-direction: column; gap: 12px;">
              <h4 class="wf-h3" style="margin: 0; font-size: 16px;">Get actionable advice for agency growth.</h4>
              <p class="wf-body-small" style="margin: 0; color: #555;">Subscribe to get our weekly breakdown of agency positioning, BD, and finance.</p>
              <div style="display: flex; gap: 8px;">
                <input type="email" class="wf-input-text" placeholder="Enter your email" style="flex: 1; height: 38px; font-size: 13px;" />
                <button class="wf-btn wf-btn-primary" style="height: 38px; padding: 0 16px; font-size: 13px;" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
              </div>
            </div>

            <h2 class="wf-h2" style="font-size: 24px; margin-top: 24px;">2. The ICP Prerequisite</h2>
            <p>You cannot scale business development until you define your Ideal Customer Profile. If your team doesn't know exactly who you are selling to, they will waste time chasing bad opportunities. The best way to start is by looking at your data.</p>
            
            <!-- Barrel Agency Sidebar (small box) -->
            <div style="border: 1px solid #cbd5e1; padding: 20px; background: #fff; margin: 24px 0; border-radius: 4px;">
              <span class="wf-label" style="color: #475569; margin-bottom: 6px;">FROM A BARREL AGENCY</span>
              <p class="wf-body-small" style="color: #475569; margin: 0;">"At Barrel, we rebuilt our new business process around a single ICP doc updated quarterly. Every team member knows it. Every proposal references it."</p>
            </div>
          </div>

          <!-- Author Bio -->
          <div style="display: flex; gap: 24px; padding: 32px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-top: 48px; background: #fafafa;">
            <div class="wf-icon-placeholder wf-icon-circle" style="width: 64px; height: 64px; flex-shrink: 0;"></div>
            <div>
              <h4 class="wf-h4" style="margin-bottom: 8px;">Peter Kang</h4>
              <p class="wf-body-small" style="color: #666; margin-bottom: 12px;">Peter has been building and running agencies since 2006. He co-founded Barrel, a digital agency serving CPG brands, and later started Barrel Holdings to acquire and grow agency businesses.</p>
              <a href="#" onclick="navigateTo('articles')" style="font-weight: 700; text-decoration: underline; font-size: 13px; color: #000;">More articles by Peter →</a>
            </div>
          </div>

          <!-- Share Strip -->
          <div class="wf-share-strip" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="font-size: 14px; font-weight: 700;">Send this to a founder friend:</span>
            <div style="display: flex; gap: 8px;">
              <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;">LinkedIn</button>
              <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;">Twitter/X</button>
              <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;" onclick="alert('Link copied!')">Copy Link</button>
            </div>
          </div>

          <!-- Read Next Section -->
          <div style="margin-top: 40px; margin-bottom: 20px;">
            <span class="wf-label" style="letter-spacing: 2px;">READ NEXT</span>
            <h3 class="wf-h3" style="font-size: 20px; margin-top: 8px; margin-bottom: 20px;">You might also like:</h3>
            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px;">
              <!-- Card 1: Same Category -->
              <div class="wf-article-card" style="grid-column: span 4; cursor: pointer;" onclick="navigateToArticle('${art.category.replace(/'/g, "\\'")}', 'The Client Pruning Framework', 'AgencyHabits', 'Apr 14, 2026')">
                <div class="wf-placeholder-box" style="background: ${categoryGradient}; height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span class="wf-placeholder-label" style="font-size: 10px;">[SAME CATEGORY]</span>
                </div>
                <div style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 120px;">
                  <span class="wf-category-tag" style="background: ${categoryGradient}; color: #fff; border: none; font-size: 8px; padding: 1px 4px; align-self: flex-start;">${art.category.toUpperCase()}</span>
                  <h4 style="font-size: 12px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">The Client Pruning Framework</h4>
                  <span style="font-weight: 700; font-size: 11px; text-decoration: underline; margin-top: 8px; display: inline-block;">Read →</span>
                </div>
              </div>
              <!-- Card 2: Adjacent Category -->
              <div class="wf-article-card" style="grid-column: span 4; cursor: pointer;" onclick="navigateToArticle('Finance', 'Agency Cash Flow: What the P&L Isn\'t Telling You', 'AgencyHabits', 'Mar 31, 2026')">
                <div class="wf-placeholder-box" style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span class="wf-placeholder-label" style="font-size: 10px;">[FINANCE]</span>
                </div>
                <div style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 120px;">
                  <span class="wf-category-tag" style="background: #eab308; color: #fff; border: none; font-size: 8px; padding: 1px 4px; align-self: flex-start;">FINANCE</span>
                  <h4 style="font-size: 12px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">Agency Cash Flow: What the P&L Isn't Telling You</h4>
                  <span style="font-weight: 700; font-size: 11px; text-decoration: underline; margin-top: 8px; display: inline-block;">Read →</span>
                </div>
              </div>
              <!-- Card 3: Matching Tool / Resource -->
              <div class="wf-article-card" style="grid-column: span 4; cursor: pointer;" onclick="navigateTo('tools')">
                <div class="wf-placeholder-box" style="background: #000; height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span class="wf-placeholder-label" style="font-size: 10px; color: #fff; background: #000; border-color: #fff;">[TOOL]</span>
                </div>
                <div style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 120px;">
                  <span class="wf-category-tag" style="background: #000; color: #fff; border: none; font-size: 8px; padding: 1px 4px; align-self: flex-start;">FREE AUDIT</span>
                  <h4 style="font-size: 12px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">Free Positioning Audit</h4>
                  <span style="font-weight: 700; font-size: 11px; text-decoration: underline; margin-top: 8px; display: inline-block;">Get Audit →</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contextual Upsell -->
          ${upsellHTML}

        </div>

        <!-- Sticky Right Sidebar -->
        <div style="grid-column: span 4; position: sticky; top: 100px; display: flex; flex-direction: column; gap: 32px; padding-left: 20px;" class="wf-article-sidebar">
          <!-- Sticky TOC -->
          <div style="border: 1px solid #e2e8f0; padding: 24px; background: #fff;">
            <h4 class="wf-h4" style="font-size: 14px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Table of Contents</h4>
            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;" class="wf-body-small">
              <a href="#full-piece" style="color: #000; text-decoration: none; font-weight: 700;">1. Systematizing Operations</a>
              <a href="#full-piece" style="color: #666; text-decoration: none;">2. The ICP Prerequisite</a>
              <a href="#full-piece" style="color: #666; text-decoration: none;">3. Defining the Wedge Offer</a>
              <a href="#full-piece" style="color: #666; text-decoration: none;">4. Building the Sales Machine</a>
              <a href="#full-piece" style="color: #666; text-decoration: none;">5. Operationalizing the Pitch</a>
              <a href="#full-piece" style="color: #666; text-decoration: none;">6. Post-BD Onboarding</a>
            </div>
          </div>

          <!-- Sticky Podcast Sidebar -->
          <div style="border: 1px solid #e2e8f0; padding: 24px; background: #fff;">
            <span class="wf-label">FROM THE PODCAST</span>
            <div class="wf-placeholder-box" style="height: 120px; margin: 12px 0; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-size: 11px;">[Podcast Cover]</span>
            </div>
            <h5 class="wf-h4" style="font-size: 14px; line-height: 1.3;">EP.07 — 10 Essential Habits for Running a Successful Agency</h5>
            <span class="wf-body-small" style="color: #666; display: block; margin-top: 4px;">Duration: 44 min</span>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px;">
              <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;" onclick="navigateTo('episode_template')">Listen & Transcript →</button>
            </div>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
      `;
    }
  },
  books: {
    title: 'BOOKS PAGE',
    annotations: [
      { num: 1, title: 'Topic Filter Tabs', body: 'Filter the 14 book recommendations by category (Finance, Sales, Leadership, etc.).', top: '150px', left: '160px' },
      { num: 2, title: 'Two-Column Grid', body: 'Displays books side-by-side with clear cover placeholders, descriptions, and details.', top: '230px', left: '80px' },
      { num: 3, title: 'External Redirect Link', body: 'Links point out to purchase locations or detailed summaries.', top: '380px', left: '400px' },
      { num: 4, title: 'Footer-only Access', body: 'Books page accessed from footer only — not in main navigation.', top: '40px', left: '600px' }
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
    title: 'TOOLS & ECOSYSTEM',
    annotations: [
      { num: 1, title: 'Stats Row', body: 'Lead with experience, not download counts. 100+ downloads is small — 20 years is strong.', top: '150px', left: '160px' },
      { num: 2, title: 'Foundation + KB Side by Side', body: 'Two AI products, equal prominence.', top: '280px', left: '80px' },
      { num: 3, title: 'Tools Grid', body: "Three cards. Each with who-it's-for + 3 benefit bullets + price.", top: '750px', left: '80px' },
      { num: 4, title: 'Testimonials', body: 'Real quotes confirmed by client.', top: '1350px', left: '80px' },
      { num: 5, title: 'Quiet Barrel Link', body: 'Appears in three places only: here, About, and Finance/Exit articles.', top: '1750px', left: '600px' }
    ],
    render: () => `
      ${getHeaderHTML('tools')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px; text-align: center;">
        <div style="grid-column: span 12;">
          <span class="wf-label">AgencyHabits Platform</span>
          <h1 class="wf-h1" style="max-width: 800px; margin: 0 auto 24px auto;">Built from real Barrel Holdings agency operations.</h1>
        </div>
      </section>

      <!-- Stats Row -->
      <section class="wf-section-pad grid-container" style="background: #000; color: #fff; text-align: center; padding-top: 40px; padding-bottom: 40px;">
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">20 Years</h3>
          <span class="wf-label" style="color: #888;">Agency Experience</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">1,500+</h3>
          <span class="wf-label" style="color: #888;">Newsletter Subscribers</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">60+</h3>
          <span class="wf-label" style="color: #888;">Articles Published</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">100+</h3>
          <span class="wf-label" style="color: #888;">Audits Run</span>
        </div>
      </section>

      <!-- Side-by-side AI tools -->
      <section class="wf-section-pad grid-container">
        <!-- Left: Foundation App -->
        <div style="grid-column: span 6; border: 1px solid var(--wf-border); padding: 40px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 380px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="wf-label" style="margin-bottom: 0; color: #047857;">FREE POSITIONING AUDIT</span>
              <span style="border: 1px solid #000; padding: 2px 8px; font-size: 11px; font-weight: 700;">~60 seconds</span>
            </div>
            <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 12px;">Build Your Agency's Strategic Foundation</h3>
            <p class="wf-body-small" style="color: #475569; margin-bottom: 16px;">Define your positioning, ecosystem, ICP, and service offering. Paste your URL. AI does the rest.</p>
            <p class="wf-body-small" style="color: #94a3b8; font-style: italic;">Used by hundreds of agency owners</p>
          </div>
          <button class="wf-btn wf-btn-primary" style="align-self: flex-start; margin-top: 24px;" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
        </div>

        <!-- Right: Knowledge Base -->
        <div style="grid-column: span 6; border: 1px solid var(--wf-border); padding: 40px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 380px;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="wf-label" style="margin-bottom: 0; color: #0f172a;">KNOWLEDGE BASE · FREE · AI-POWERED</span>
              <span style="border: 1px solid #cbd5e1; background: #f8fafc; padding: 2px 8px; font-size: 11px; font-weight: 700;">Beta</span>
            </div>
            <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 12px;">Search everything AgencyHabits has ever published.</h3>
            <p class="wf-body-small" style="color: #475569; margin-bottom: 16px;">Ask any question about running, growing, or selling your agency. Get answers linked to source articles and podcast episodes.</p>
          </div>
          <button class="wf-btn wf-btn-secondary" style="align-self: flex-start; margin-top: 24px;" onclick="window.open('https://kb.agencyhabits.com', '_blank')">Search the Knowledge Base →</button>
        </div>
      </section>

      <!-- Tools Grid -->
      <section class="wf-section-pad grid-container" style="background: #f8fafc; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 40px; text-align: center;">
          <span class="wf-label">Downloads & Resources</span>
          <h2 class="wf-h2">All Operating Tools</h2>
        </div>

        <!-- Card 1: BD Collection -->
        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px; position: relative;">
          <span class="wf-badge-premium" style="position: absolute; top: 12px; right: 12px;">PREMIUM</span>
          <div>
            <span class="wf-label" style="color: #3b82f6;">BUSINESS DEVELOPMENT</span>
            <div class="wf-placeholder-box" style="height: 120px; margin: 16px 0; background: #eff6ff;">
              <span class="wf-placeholder-label">[BD Collection Mockup]</span>
            </div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Business Development Collection</h3>
            <p class="wf-body-small" style="font-weight: 700; color: #475569; margin-bottom: 12px;">Who it's for: Agency founders doing $1M+ who are tired of losing deals to agencies half their quality.</p>
            <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569; margin-bottom: 0;">
              <li>✓ Real winning proposals from Barrel Holdings agencies</li>
              <li>✓ New business intake framework — 50 questions</li>
              <li>✓ Agency Growth Engine Playbook</li>
            </ul>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #0f172a;">$599</span>
              <button class="wf-btn wf-btn-primary" style="height: 36px; padding: 0 16px; font-size: 13px;" onclick="navigateTo('bizdev_collection')">Learn More →</button>
            </div>
          </div>
        </div>

        <!-- Card 2: Exit Checklist -->
        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px;">
          <div>
            <span class="wf-label" style="color: #10b981;">EXIT PLANNING</span>
            <div class="wf-placeholder-box" style="height: 120px; margin: 16px 0; background: #ecfdf5;">
              <span class="wf-placeholder-label">[Exit Checklist Mockup]</span>
            </div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Exit-Readiness Checklist</h3>
            <p class="wf-body-small" style="font-weight: 700; color: #475569; margin-bottom: 12px;">Who it's for: Founders who want to know what their agency is actually worth — and what's dragging the number down.</p>
            <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569; margin-bottom: 0;">
              <li>✓ See your agency the way a buyer would</li>
              <li>✓ Identifies valuation gaps before they cost you</li>
              <li>✓ Built from real Barrel Holdings acquisition criteria</li>
            </ul>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #10b981;">FREE</span>
              <button class="wf-btn wf-btn-primary" style="height: 36px; padding: 0 16px; font-size: 13px;" onclick="navigateTo('exit_checklist')">Download →</button>
            </div>
          </div>
        </div>

        <!-- Card 3: Annual Goals -->
        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px;">
          <div>
            <span class="wf-label" style="color: #f59e0b;">PLANNING</span>
            <div class="wf-placeholder-box" style="height: 120px; margin: 16px 0; background: #fffbeb;">
              <span class="wf-placeholder-label">[Goal Template Mockup]</span>
            </div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">The Annual Goal Setting Template</h3>
            <p class="wf-body-small" style="font-weight: 700; color: #475569; margin-bottom: 12px;">Who it's for: Founders heading into a new year who want a plan that doesn't get forgotten by March.</p>
            <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569; margin-bottom: 0;">
              <li>✓ One page — no fluff</li>
              <li>✓ The exact template Barrel Holdings agencies use</li>
              <li>✓ Captures revenue, margin, and growth priorities</li>
            </ul>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #f59e0b;">FREE</span>
              <button class="wf-btn wf-btn-primary" style="height: 36px; padding: 0 16px; font-size: 13px;" onclick="navigateTo('goal_template')">Download →</button>
            </div>
          </div>
        </div>

        <!-- Card 4: Survey-for-Frameworks -->
        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 480px;">
          <div>
            <span class="wf-label" style="color: #3b82f6;">FEEDBACK</span>
            <div class="wf-placeholder-box" style="height: 120px; margin: 16px 0; background: #fafafa;">
              <span class="wf-placeholder-label">[Frameworks Bundle Mockup]</span>
            </div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 12px;">5 Free Agency Frameworks</h3>
            <p class="wf-body-small" style="font-weight: 700; color: #475569; margin-bottom: 12px;">Who it's for: Agency founders who want the exact operating templates Barrel Holdings agencies use in exchange for 2 minutes of feedback.</p>
            <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569; margin-bottom: 0;">
              <li>✓ Complete a short 60-second survey</li>
              <li>✓ Get 5 templates (TOC, Org Chart, Client Pruning, etc.)</li>
              <li>✓ Instant PDF/doc download links</li>
            </ul>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #3b82f6;">FREE</span>
              <button class="wf-btn wf-btn-primary" style="height: 36px; padding: 0 16px; font-size: 13px;" onclick="alert('Redirects to survey...')">Get frameworks →</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">What Agency Founders Say</span>
          <h2 class="wf-h2">Success Stories</h2>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #fff;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"This was a no-brainer for me. Decades of agency sales secrets available for download? I'm shocked they were willing to share this wisdom at any price. I started using the templates that same day."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Max Bernstein, Consultant</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #fff;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder. It is filled with actual practical tips for running your agency, and it had a direct impact on the growth of my agency."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Uros Mikic, CEO, Flow Ninja</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #fff;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"The Business Development collection was really helpful for our team. It gave us great insight into where we're doing well and where we could sharpen things."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Jonathan Garyfalakis, CEO, Syatt Media</span>
        </div>
      </section>

      <!-- Quiet Link -->
      <section style="padding: 24px 0; text-align: center; border-bottom: 1px solid var(--wf-border-muted);">
        <a href="https://barrel-holdings.com" target="_blank" style="color: #64748b; font-size: 13px; text-decoration: underline; font-weight: 700;">Built something worth selling? →</a>
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
          <p class="wf-body-small" style="font-weight: 700; color: #0f172a;">Who it's for: Agency founders doing $1M+ who are tired of losing deals to agencies half their quality.</p>
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

      <!-- Preview section (Blurred sample preview) -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 24px;">
          <span class="wf-label">PREVIEW</span>
          <h2 class="wf-h2">See What You Get</h2>
        </div>
        <div style="grid-column: span 12; position: relative; height: 300px; overflow: hidden;">
          <div class="wf-placeholder-box" style="height: 100%; width: 100%; filter: blur(4px); background: #f1f5f9;">
            <span class="wf-placeholder-label">[Confidential Proposal Details / Standard SOW Layout / Intake Questions]</span>
          </div>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #0f172a; color: #fff; padding: 16px 32px; font-weight: bold; text-align: center; border-radius: 4px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); width: calc(100% - 80px); max-width: 480px;">
            <span style="display: block; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">Sample Preview</span>
            <span style="font-size: 16px; display: block;">Detailed SOW and Proposal templates unlocked upon purchase</span>
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

      <!-- Testimonials -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); background: #ffffff;">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">What Agency Founders Say</span>
          <h2 class="wf-h2">Testimonials</h2>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #f8fafc;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"This was a no-brainer for me. Decades of agency sales secrets available for download? I'm shocked they were willing to share this wisdom at any price. I started using the templates that same day."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Max Bernstein, Consultant</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #f8fafc;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder. It is filled with actual practical tips for running your agency, and it had a direct impact on the growth of my agency."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Uros Mikic, CEO, Flow Ninja</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px; background: #f8fafc;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"The Business Development collection was really helpful for our team. It gave us great insight into where we're doing well and where we could sharpen things."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Jonathan Garyfalakis, CEO, Syatt Media</span>
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

      <!-- What's Inside & When to Use -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); background: #ffffff;">
        <div style="grid-column: span 6;">
          <h3 class="wf-h3" style="margin-bottom: 16px;">What's Inside</h3>
          <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
            <li><strong>Financial Benchmarks:</strong> Gross margin targets, client concentration limits, and revenue predictability ratios.</li>
            <li><strong>Operational Audits:</strong> Standard operating procedures check, project profitability tracking, and utilization rates.</li>
            <li><strong>Legal & Corporate Docs:</strong> Core employee agreement reviews, client contract terms, and IP ownership audit.</li>
            <li><strong>Leadership Scorecard:</strong> Evaluating dependency on founders for sales, operations, and key client relations.</li>
          </ul>
        </div>
        <div style="grid-column: span 6;">
          <h3 class="wf-h3" style="margin-bottom: 16px;">When to Use This</h3>
          <p class="wf-body-small" style="margin-bottom: 12px;"><strong>12-18 Months Before Sale:</strong> The ideal runway to fix systemic issues like high client concentration or weak key employees. Altering these metrics takes time.</p>
          <p class="wf-body-small" style="margin-bottom: 12px;"><strong>During Strategic Planning:</strong> Even if you don't intend to sell, running this audit annually keeps your business healthy, highly profitable, and robust.</p>
          <p class="wf-body-small" style="margin-bottom: 0;"><strong>Before Raising Debt or Capital:</strong> Creditors and institutional investors look at the exact same variables when valuing your operational cash flows.</p>
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

      <!-- What's Inside & How Barrel Agencies Use It -->
      <section class="wf-section-pad grid-container" style="border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); background: #ffffff;">
        <div style="grid-column: span 6;">
          <h3 class="wf-h3" style="margin-bottom: 16px;">What's Inside</h3>
          <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
            <li><strong>Financial Targets:</strong> Simple grids to map target revenue, net margins, and monthly billable expectations.</li>
            <li><strong>Strategic Focus Areas:</strong> 3-4 key objectives for the year, with direct owner accountability assigned to each.</li>
            <li><strong>Operational Milestones:</strong> Quarterly checkpoints to ensure your strategic priorities don't get lost in the day-to-day.</li>
            <li><strong>Growth Benchmarks:</strong> Pipeline volume and conversion goals needed to feed your financial objectives.</li>
          </ul>
        </div>
        <div style="grid-column: span 6;">
          <h3 class="wf-h3" style="margin-bottom: 16px;">How Barrel Agencies Use It</h3>
          <p class="wf-body-small" style="margin-bottom: 12px;"><strong>Q4 Prep Session:</strong> In October, each agency GM drafts this one-pager. We iterate on the draft to align on next year's targets.</p>
          <p class="wf-body-small" style="margin-bottom: 12px;"><strong>Monthly Board Meetings:</strong> We print this one-pager and place it at the top of every monthly board pack to track progress.</p>
          <p class="wf-body-small" style="margin-bottom: 0;"><strong>Quarterly Course Corrections:</strong> If market conditions shift, we adjust the key focus areas, keeping the core financial target fixed.</p>
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
      { num: 3, title: 'Team Bios Grid', body: 'Three people: Peter, Sei-Wook, Ivona. Client confirmed Ivona on About page.', top: '920px', left: '80px' },
      { num: 4, title: 'Stats Indicator Row', body: 'Do not hardcode episode count — TBD from client.', top: '1350px', left: '80px' },
      { num: 5, title: 'Barrel Portfolio', body: 'Client to confirm canonical current list before launch.', top: '1550px', left: '80px' },
      { num: 6, title: 'Acquisition Link', body: 'One of three deliberate placements. Quiet text, not a CTA button.', top: '1850px', left: '600px' }
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
          <span class="wf-label">The Team</span>
          <h2 class="wf-h2">Our Leadership & Operations</h2>
        </div>

        <!-- Peter Kang -->
        <div style="grid-column: span 4; display: flex; flex-direction: column; border: 1px solid #000; padding: 24px; gap: 16px;">
          <div class="wf-placeholder-box" style="width: 100%; height: 180px;">
            <span class="wf-placeholder-label">[Headshot: Peter Kang]</span>
          </div>
          <div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 4px;">Peter Kang</h3>
            <span class="wf-body-small" style="font-weight: bold; display: block; margin-bottom: 8px;">Co-founder, Barrel Holdings</span>
            <p class="wf-body-small" style="line-height: 1.4; margin: 0;">Peter has been building and running agencies since 2006. He co-founded Barrel, a digital agency serving CPG and e-commerce brands, and later started Barrel Holdings to acquire and grow agency businesses.</p>
          </div>
        </div>

        <!-- Sei-Wook Kim -->
        <div style="grid-column: span 4; display: flex; flex-direction: column; border: 1px solid #000; padding: 24px; gap: 16px;">
          <div class="wf-placeholder-box" style="width: 100%; height: 180px;">
            <span class="wf-placeholder-label">[Headshot: Sei-Wook Kim]</span>
          </div>
          <div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 4px;">Sei-Wook Kim</h3>
            <span class="wf-body-small" style="font-weight: bold; display: block; margin-bottom: 8px;">Co-founder, Barrel Holdings</span>
            <p class="wf-body-small" style="line-height: 1.4; margin: 0;">Sei-Wook co-founded Barrel alongside Peter and has spent nearly two decades building client relationships and leading agency operations. He brings a deep understanding of how agencies grow and scale.</p>
          </div>
        </div>

        <!-- Ivona Namjesnik -->
        <div style="grid-column: span 4; display: flex; flex-direction: column; border: 1px solid #000; padding: 24px; gap: 16px;">
          <div class="wf-placeholder-box" style="width: 100%; height: 180px;">
            <span class="wf-placeholder-label">[Headshot: Ivona Namjesnik]</span>
          </div>
          <div>
            <h3 class="wf-h3" style="font-size: 18px; margin-bottom: 4px;">Ivona Namjesnik</h3>
            <span class="wf-body-small" style="font-weight: bold; display: block; margin-bottom: 8px;">General Manager, AgencyHabits</span>
            <p class="wf-body-small" style="line-height: 1.4; margin: 0;">Ivona oversees all AgencyHabits content, products, and community — including the podcast, Knowledge Shares, and tools.</p>
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
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">[Episode Count]</h3>
          <span class="wf-label" style="color: #888;">Podcast Episodes</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #fff; margin-bottom: 8px;">60+</h3>
          <span class="wf-label" style="color: #888;">Articles Published</span>
        </div>
      </section>

      <!-- Section 5: Barrel Portfolio -->
      <section class="wf-section-pad grid-container" style="background: #f8fafc; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 32px; text-align: center;">
          <span class="wf-label">Our Agencies</span>
          <h2 class="wf-h2">The Barrel Holdings Portfolio</h2>
          <p class="wf-body-small" style="color: #64748b; margin-top: 8px;">AgencyHabits content is drawn from operators currently running these businesses.</p>
        </div>
        
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Barrel</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">CPG Commerce & Shopify</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">BX Studio</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">B2B Websites & Marketing</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Matyx</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Home Services Digital Marketing</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">AO2</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Amazon and Retail Media</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Vaulted Oak</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Web Development & Support</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 20px; background: #fff;">
            <h4 class="wf-h4" style="margin-bottom: 4px; font-size: 16px;">Prima Mode</h4>
            <p class="wf-body-small" style="color: #666; margin: 0;">Health & Beauty Amazon</p>
          </div>
        </div>
      </section>

      <!-- Section 6: Testimonials -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 48px;">
          <span class="wf-label">Testimonials</span>
          <h2 class="wf-h2">What Agency Founders Say</h2>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"This was a no-brainer for me. Decades of agency sales secrets available for download? I'm shocked they were willing to share this wisdom at any price. I started using the templates that same day."</p>
          <span class="wf-label" style="font-size: 11px;">— Max Bernstein, Consultant</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder. It is filled with actual practical tips for running your agency, and it had a direct impact on the growth of my agency."</p>
          <span class="wf-label" style="font-size: 11px;">— Uros Mikic, CEO, Flow Ninja</span>
        </div>

        <div style="grid-column: span 4; border: 1px solid var(--wf-border-muted); padding: 24px;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 16px;">"The Business Development collection was really helpful for our team. It gave us great insight into where we're doing well and where we could sharpen things."</p>
          <span class="wf-label" style="font-size: 11px;">— Jonathan Garyfalakis, CEO, Syatt Media</span>
        </div>
      </section>

      <!-- Section 7: Quiet Acquisition Link -->
      <section style="padding: 24px 0; text-align: center; border-bottom: 1px solid var(--wf-border-muted); display: flex; flex-direction: column; gap: 8px; align-items: center;">
        <a href="https://barrel-holdings.com" target="_blank" style="color: #64748b; font-size: 13px; text-decoration: underline; font-weight: 700;">Thinking about selling your agency? → barrel-holdings.com</a>
        <a href="#" onclick="navigateTo('partnerships'); return false;" style="color: #64748b; font-size: 13px; text-decoration: underline; font-weight: 700;">Interested in sponsoring us? Partner with AgencyHabits →</a>
      </section>

      ${getNewsletterCtaHTML()}
      ${getFooterHTML()}
    `
  },
  partnerships: {
    title: 'PARTNERSHIPS PAGE',
    annotations: [
      { num: 1, title: 'Hero Section', body: 'Outlines the core partnership pitch to sponsors targeting $750K–$3M agency owners.', top: '150px', left: '160px' },
      { num: 2, title: 'Audience Metrics', body: 'Trust metrics showing newsletter subscriber size, open rate, and podcast reach.', top: '480px', left: '80px' },
      { num: 3, title: 'Sponsorship Options', body: '4 cards covering Newsletter, Welcome Flow, Podcast, and Presenting Sponsor.', top: '850px', left: '80px' },
      { num: 4, title: 'Sponsor Testimonial', body: 'Success stories from previous sponsors to drive conversions.', top: '1450px', left: '80px' },
      { num: 5, title: 'Inquiry Form', body: 'Integrated inquiry form asking for name, email, budget, and campaign goals.', top: '1850px', left: '160px' }
    ],
    render: () => `
      ${getHeaderHTML('partnerships')}

      <!-- Hero Section -->
      <section class="wf-section-pad grid-container" style="padding-top: 80px; padding-bottom: 60px; border-bottom: 1px solid var(--wf-border-muted); text-align: center;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 16px; justify-content: center; align-items: center;">
          <span class="wf-label" style="letter-spacing: 2px;">SPONSORSHIP OPPORTUNITIES</span>
          <h1 class="wf-h1" style="font-size: 48px; line-height: 1.15; margin: 0;">Partner with AgencyHabits</h1>
          <p class="wf-body-large" style="max-width: 620px; color: #333;">Promote your product, service, or tool to 1,500+ highly engaged agency founders, general managers, and operators running $750K–$3M businesses.</p>
          
          <!-- Sponsor Kit Email Capture -->
          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px; align-items: center; width: 100%;">
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center; width: 100%;">
              <a href="#sponsor-form-section" class="wf-btn wf-btn-primary" style="height: 48px; padding: 0 24px; display: inline-flex; align-items: center; text-decoration: none;">Inquire About Partnerships →</a>
              <div style="display: flex; border: 1px solid #000; padding: 4px; background: #fff; max-width: 400px; width: 100%;">
                <input type="email" placeholder="Enter email for Sponsor Kit" style="border: none; padding: 0 12px; font-size: 13px; outline: none; flex: 1; min-width: 150px;" />
                <button class="wf-btn wf-btn-primary" style="height: 40px; padding: 0 16px; font-size: 13px;" onclick="simulateFormSubmit(this, 'Sponsor Kit sent!')">Send Me the Kit →</button>
              </div>
            </div>
            <p class="wf-body-small" style="color: #666; margin: 0;">Want the full numbers? Request our sponsor kit.</p>
          </div>
        </div>
      </section>

      <!-- Stats / Audience Metrics Row -->
      <section class="wf-section-pad grid-container" style="background: #000000; color: #ffffff; text-align: center; padding-top: 40px; padding-bottom: 40px;">
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #ffffff; margin-bottom: 8px; font-size: 32px;">1,500+</h3>
          <span class="wf-label" style="color: #888888; font-size: 9px; letter-spacing: 1px;">Newsletter Subscribers</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #ffffff; margin-bottom: 8px; font-size: 32px;">50.5%</h3>
          <span class="wf-label" style="color: #888888; font-size: 9px; letter-spacing: 1px;">Average Open Rate</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #ffffff; margin-bottom: 8px; font-size: 32px;">70+</h3>
          <span class="wf-label" style="color: #888888; font-size: 9px; letter-spacing: 1px;">Downloads/Episode (7d)</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h1" style="color: #ffffff; margin-bottom: 8px; font-size: 32px;">2,600+</h3>
          <span class="wf-label" style="color: #888888; font-size: 9px; letter-spacing: 1px;">All-Time Downloads</span>
        </div>
      </section>

      <!-- Sponsorship Channels / Cards -->
      <section class="wf-section-pad grid-container" style="background: #f8fafc; border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 40px;">
          <span class="wf-label">Sponsorship Channels</span>
          <h2 class="wf-h2">Available Placements</h2>
        </div>

        <!-- Card 1: Newsletter -->
        <div style="grid-column: span 6;">
          <div class="wf-sponsor-card" style="border: 1px solid #cbd5e1; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 340px;">
            <div>
              <span class="wf-label" style="color: #3b82f6;">WEEKLY EMAIL</span>
              <h3 class="wf-h3" style="font-size: 20px; margin: 8px 0 12px 0;">Weekly Newsletter Placement</h3>
              <p class="wf-body-small" style="color: #555; line-height: 1.5; margin-bottom: 16px;">Secure the primary sponsor slot in our weekly editorial email sent every Tuesday. Includes 150 words of text, custom logo/image, and 2 tracking links.</p>
              <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569;">
                <li>✓ Sent to 1,500+ agency operators</li>
                <li>✓ Single sponsor per issue for maximum focus</li>
                <li>✓ Average click-through rate of 2.8%</li>
              </ul>
            </div>
            <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">Quarterly (12 wks): $5,500</span>
                <a href="#sponsor-form-section" style="font-weight: 700; text-decoration: underline; font-size: 13px; color: #000;">Book Now →</a>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">6-Month (24 wks): $9,600</span>
                <span style="font-size: 11px; color: #ef4444; font-weight: bold;">2 sponsors/mo limit</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Welcome Flow -->
        <div style="grid-column: span 6;">
          <div class="wf-sponsor-card" style="border: 1px solid #cbd5e1; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 340px;">
            <div>
              <span class="wf-label" style="color: #10b981;">AUTOMATED ONBOARDING</span>
              <h3 class="wf-h3" style="font-size: 20px; margin: 8px 0 12px 0;">Welcome Sequence Sponsorship</h3>
              <p class="wf-body-small" style="color: #555; line-height: 1.5; margin-bottom: 16px;">Sponsor our automated 3-part onboarding email sequence sent to every new subscriber. Get evergreen exposure during their peak engagement window.</p>
              <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569;">
                <li>✓ Prominent sponsor placement in every email</li>
                <li>✓ 65%+ open rate on onboarding emails</li>
                <li>✓ Continuous flow of new leads weekly</li>
              </ul>
            </div>
            <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">Quarterly: $900</span>
                <a href="#sponsor-form-section" style="font-weight: 700; text-decoration: underline; font-size: 13px; color: #000;">Book Now →</a>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">6-Month: $1,600</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: Podcast Mid-Roll -->
        <div style="grid-column: span 6; margin-top: 24px;">
          <div class="wf-sponsor-card" style="border: 1px solid #cbd5e1; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 340px;">
            <div>
              <span class="wf-label" style="color: #a855f7;">AUDIO & VIDEO</span>
              <h3 class="wf-h3" style="font-size: 20px; margin: 8px 0 12px 0;">Podcast Mid-Roll Ad Spot</h3>
              <p class="wf-body-small" style="color: #555; line-height: 1.5; margin-bottom: 16px;">A 30-second host-read mid-roll ad spot in our podcast episodes. Includes logo placement on YouTube show notes and permanent backlinks in show transcripts.</p>
              <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569;">
                <li>✓ Host-read by Peter Kang to build peer trust</li>
                <li>✓ Permanent placement in the audio feed</li>
                <li>✓ Dynamic cross-linking to source transcripts</li>
              </ul>
            </div>
            <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">Quarterly: $3,600</span>
                <a href="#sponsor-form-section" style="font-weight: 700; text-decoration: underline; font-size: 13px; color: #000;">Book Now →</a>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; font-weight: 700; color: #000;">6-Month: $6,800</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 4: Presenting Sponsor -->
        <div style="grid-column: span 6; margin-top: 24px;">
          <div class="wf-sponsor-card" style="border: 1px solid #cbd5e1; padding: 32px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 340px; position: relative;">
            <span class="wf-badge-premium" style="position: absolute; top: 12px; right: 12px;">PREMIUM</span>
            <div>
              <span class="wf-label" style="color: #f59e0b;">CROSS-PLATFORM EXCLUSIVITY</span>
              <h3 class="wf-h3" style="font-size: 20px; margin: 8px 0 12px 0;">Presenting Channel Sponsor</h3>
              <p class="wf-body-small" style="color: #555; line-height: 1.5; margin-bottom: 16px;">Exclusivity across all AgencyHabits properties for a calendar quarter. Includes custom co-branded header blocks, logo on homepage, and presenting slots on all platforms.</p>
              <ul class="wf-body-small" style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px; color: #475569;">
                <li>✓ Logo placement on website navigation bar</li>
                <li>✓ Presenting partner shout-outs on all podcasts</li>
                <li>✓ Custom dedicated co-marketing campaign</li>
              </ul>
            </div>
            <div style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 15px; font-weight: 800; color: #000;">$25,000 / 6 months</span>
              <a href="#sponsor-form-section" style="font-weight: 700; text-decoration: underline; font-size: 13px; color: #000;">Inquire →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Sponsor Testimonial -->
      <section class="wf-section-pad grid-container" style="background: #ffffff; border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: 3 / span 8; text-align: center; display: flex; flex-direction: column; gap: 20px; align-items: center;">
          <span class="wf-label" style="color: #10b981;">PARTNER TESTIMONIAL</span>
          <p class="wf-body-large" style="font-style: italic; color: #000; font-weight: 500;">"The AgencyHabits team is great to work with as part of us helping agency owners grow and scale. They've always been focused on making sure everything is a win-win all round and care about authentic, genuine, and helpful content and promotions."</p>
          <span class="wf-label" style="font-size: 12px; margin-bottom: 0;">— [Sponsor name — to be confirmed by client]</span>
        </div>
      </section>

      <!-- Inquiry Form Section -->
      <section id="sponsor-form-section" class="wf-section-pad grid-container" style="border-bottom: none; scroll-margin-top: 100px;">
        <div style="grid-column: span 5; display: flex; flex-direction: column; justify-content: center; gap: 24px; padding-right: 32px;">
          <span class="wf-label">LET'S COLLABORATE</span>
          <h2 class="wf-h1" style="font-size: 36px; margin: 0;">Request Partnership Details</h2>
          <p class="wf-body">Tell us about your organization and your target campaign dates. We'll send you our latest availability calendar and package details in ~24 hours.</p>
          <div style="border-left: 2px solid #000; padding-left: 16px;">
            <p class="wf-body-small" style="font-style: italic;">"The best way to reach agency general managers and founders stage-matched to your tool."</p>
          </div>
        </div>

        <div style="grid-column: span 7;">
          <div style="border: 2px solid #000; padding: 40px; background: #ffffff;">
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div>
                  <label class="wf-label">Contact Name</label>
                  <input type="text" class="wf-input-text" placeholder="Your name" />
                </div>
                <div>
                  <label class="wf-label">Work Email</label>
                  <input type="email" class="wf-input-text" placeholder="Your email address" />
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div>
                  <label class="wf-label">Organization Name</label>
                  <input type="text" class="wf-input-text" placeholder="Company URL or name" />
                </div>
                <div>
                  <label class="wf-label">Estimated Budget</label>
                  <select class="wf-input-text" style="padding: 0 12px; appearance: auto;">
                    <option>Under $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="wf-label">Campaign Objectives & Message</label>
                <textarea class="wf-input-text" style="height: 120px; padding: 12px; font-family: inherit; resize: none;" placeholder="Describe your product and what you hope to achieve..."></textarea>
              </div>

              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Inquiry Sent! We will email you the kit within 24 hours.')">Submit Partnership Inquiry</button>
            </div>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  podcast: {
    title: 'PODCAST (PODCAST HUB)',
    annotations: [
      { num: 1, title: 'Hero Episode', body: 'Latest episode. Links out to Spotify/YouTube — no embedded player for performance.', top: '180px', left: '600px' },
      { num: 2, title: 'Host Intro', body: 'Compact bios for Peter and Sei-Wook (Ivona removed, reflowed to 2-column).', top: '560px', left: '160px' },
      { num: 3, title: 'Episode Cards', body: 'Includes duration, topic badge, and 3 key takeaways.', top: '1150px', left: '80px' },
      { num: 4, title: 'Category Gradients', body: 'Distinct category color gradient covers matching the articles.', top: '1280px', left: '200px' },
      { num: 5, title: 'YouTube Shorts', body: 'Scrollable row of vertical quick takes pulled from YouTube channel.', top: '1780px', left: '80px' },
      { num: 6, title: 'Subscribe Row', body: 'All major streaming platforms plus email subscription in one footer row.', top: '2050px', left: '480px' }
    ],
    render: () => `
      ${getHeaderHTML('podcast')}

      <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
        <div style="grid-column: span 12;">
          <span class="wf-label">AgencyHabits Podcast</span>
          <h1 class="wf-h1">Real conversations from operators currently running the same play.</h1>
          <div style="display: flex; gap: 16px; margin-top: 24px; align-items: center;">
            <a href="https://spotify.com" target="_blank" class="wf-btn wf-btn-secondary" style="height: 40px; padding: 0 20px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Listen on Spotify →</a>
            <a href="https://youtube.com" target="_blank" class="wf-btn wf-btn-secondary" style="height: 40px; padding: 0 20px; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Watch on YouTube →</a>
          </div>
        </div>
      </section>

      <!-- Hero Episode Block (dark background) -->
      <section class="grid-container" style="margin-bottom: 60px;">
        <div class="wf-listen-hero-banner" style="grid-column: span 12; background: #0f172a; color: #fff; padding: 48px; display: grid; grid-template-columns: 1fr 2fr; gap: 48px; align-items: center;">
          <div class="wf-placeholder-box" style="aspect-ratio: 1; width: 100%; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">
            <span class="wf-placeholder-label" style="color: #fff; font-size: 24px; font-weight: 800;">EP.07</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="background: #3b82f6; color: #fff; padding: 2px 8px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Latest Episode</span>
              <span style="font-size: 13px; color: #94a3b8;">44 min</span>
              <span style="font-size: 13px; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">Leadership</span>
            </div>
            <h2 class="wf-h1" style="color: #fff; font-size: 28px; line-height: 1.2; margin: 0; cursor: pointer;" onclick="navigateTo('episode_template')">EP.07 — 10 Essential Habits for Running a Successful Agency</h2>
            <p class="wf-body" style="color: #cbd5e1; margin: 0;">Peter and Sei-Wook walk through the 10 habits that separate growing agencies from ones stuck in founder dependency.</p>
            <div style="display: flex; gap: 16px; margin-top: 12px;">
              <button class="wf-btn wf-btn-primary" style="background: #a855f7; color: #fff; border: none;" onclick="navigateTo('episode_template')">Listen & Transcript →</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Host Intro Row (2-column layout, Ivona removed) -->
      <section class="wf-section-pad grid-container" style="background: #fafafa; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 32px; text-align: center;">
          <span class="wf-label">About the Hosts</span>
          <h2 class="wf-h2">Hosted by Agency Operators</h2>
        </div>
        <div style="grid-column: span 6; text-align: center; padding: 20px;">
          <div class="wf-placeholder-box" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 16px auto;"><span class="wf-placeholder-label">[Peter]</span></div>
          <h4 class="wf-h4" style="margin-bottom: 4px;">Peter Kang</h4>
          <span class="wf-body-small" style="font-weight: 700; color: #666; display: block; margin-bottom: 8px;">Co-founder, Barrel Holdings</span>
          <p class="wf-body-small" style="color: #666; max-width: 440px; margin: 0 auto;">"We share exact insights because we believe agency operators deserve real transparent operational data."</p>
        </div>
        <div style="grid-column: span 6; text-align: center; padding: 20px;">
          <div class="wf-placeholder-box" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 16px auto;"><span class="wf-placeholder-label">[Sei-Wook]</span></div>
          <h4 class="wf-h4" style="margin-bottom: 4px;">Sei-Wook Kim</h4>
          <span class="wf-body-small" style="font-weight: 700; color: #666; display: block; margin-bottom: 8px;">Co-founder, Barrel Holdings</span>
          <p class="wf-body-small" style="color: #666; max-width: 440px; margin: 0 auto;">"Our podcast focuses entirely on the operating mechanics behind agencies, not the standard theory."</p>
        </div>
      </section>

      <!-- Most Popular Episodes Section -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted); background: #ffffff;">
        <div style="grid-column: span 12; margin-bottom: 24px;">
          <span class="wf-label" style="letter-spacing: 2px;">MOST POPULAR</span>
          <h2 class="wf-h2" style="font-size: 24px; margin-top: 8px;">Trending Episodes</h2>
        </div>
        
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
          <!-- Card 1 -->
          <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); height: 140px; display: flex; align-items: center; justify-content: center;">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 14px;">EP.05</span>
            </div>
            <div style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 160px;">
              <div>
                <span class="wf-category-tag" style="background: #3b82f6; color: #fff; border: none; font-size: 9px; padding: 1px 6px;">Business Development</span>
                <h4 class="wf-h3" style="font-size: 14px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">How We'd Generate Leads If We Started Our Agency Today</h4>
              </div>
              <span style="font-weight: 700; font-size: 12px; text-decoration: underline;">Listen →</span>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); height: 140px; display: flex; align-items: center; justify-content: center;">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 14px;">EP.02</span>
            </div>
            <div style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 160px;">
              <div>
                <span class="wf-category-tag" style="background: #eab308; color: #fff; border: none; font-size: 9px; padding: 1px 6px;">Finance</span>
                <h4 class="wf-h3" style="font-size: 14px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">Our Approach to Agency Acquisitions: Valuation Drivers</h4>
              </div>
              <span style="font-weight: 700; font-size: 12px; text-decoration: underline;">Listen →</span>
            </div>
          </div>
          
          <!-- Card 3 -->
          <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box wf-article-card-image" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); height: 140px; display: flex; align-items: center; justify-content: center;">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 14px;">EP.07</span>
            </div>
            <div style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 160px;">
              <div>
                <span class="wf-category-tag" style="background: #a855f7; color: #fff; border: none; font-size: 9px; padding: 1px 6px;">Leadership</span>
                <h4 class="wf-h3" style="font-size: 14px; margin: 4px 0 0 0; line-height: 1.3; font-weight: 700;">10 Essential Habits for Running a Successful Agency</h4>
              </div>
              <span style="font-weight: 700; font-size: 12px; text-decoration: underline;">Listen →</span>
            </div>
          </div>
        </div>
      </section>

      <!-- All Episodes List -->
      <section class="wf-section-pad grid-container">
        <div class="wf-episodes-feed-header" style="grid-column: span 12; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="wf-label">Episodes Feed</span>
            <h2 class="wf-h2">All Episodes</h2>
          </div>
          <div style="display: flex; gap: 12px;">
            <input type="text" class="wf-input-text" placeholder="Search episodes..." style="width: 240px; height: 38px;" onkeyup="filterPodcastArchive(this.value)" />
            <select class="wf-input-text" style="width: 160px; height: 38px; padding: 0 10px; appearance: auto;">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 24px;">
          <!-- EP.07 -->
          <div class="podcast-ep-item" data-title="EP.07 — 10 Essential Habits for Running a Successful Agency" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.07</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.07</span>
                  <span style="font-size: 12px; color: #64748b;">44 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px;">Leadership</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">10 Essential Habits for Running a Successful Agency</h3>
                <div style="font-size: 13px; color: #475569;">
                  <strong>Key Takeaways:</strong>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px;">
                    <li>After-action reviews compound faster than you think</li>
                    <li>Weekly BD meetings only work if they're structured</li>
                    <li>The "mind the bottom" habit is the hardest and most important</li>
                  </ul>
                </div>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>

          <!-- EP.06 (Placeholder / TBD Note) -->
          <div class="podcast-ep-item" data-title="EP.06 — Coming Soon" style="border: 1px solid #e2e8f0; display: flex; padding: 24px; gap: 24px; background: #fafafa; opacity: 0.8;">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: #e2e8f0;">
              <span class="wf-placeholder-label" style="color: #64748b; font-weight: bold;">EP.06</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; flex: 1;">
              <span class="wf-label" style="color: #64748b;">UPCOMING EPISODE</span>
              <h3 class="wf-h3" style="font-size: 18px; margin: 4px 0 8px 0; color: #64748b;">EP.06 — [Title TBD]</h3>
              <p class="wf-body-small" style="color: #94a3b8; margin: 0;">[Episode titles and details TBD — client to provide full episode list]</p>
            </div>
          </div>

          <!-- EP.05 -->
          <div class="podcast-ep-item" data-title="EP.05 — How We'd Generate Leads If We Started Our Agency Today" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.05</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.05</span>
                  <span style="font-size: 12px; color: #64748b;">45 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px; background: #3b82f6;">Business Development</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">How We'd Generate Leads If We Started Our Agency Today</h3>
                <div style="font-size: 13px; color: #475569;">
                  <strong>Key Takeaways:</strong>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px;">
                    <li>LinkedIn outbound still works if you're specific enough</li>
                    <li>Referral systems need to be asked for, not waited for</li>
                    <li>Building an audience is a 2-year play, not a quarter</li>
                  </ul>
                </div>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>

          <!-- EP.04 -->
          <div class="podcast-ep-item" data-title="EP.04 — How Specialization Impacts Your Agency's Growth, Margins, and Valuation" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.04</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.04</span>
                  <span style="font-size: 12px; color: #64748b;">38 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px; background: #14b8a6;">Positioning</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">How Specialization Impacts Your Agency's Growth, Margins, and Valuation</h3>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>

          <!-- EP.03 -->
          <div class="podcast-ep-item" data-title="EP.03 — Are You Calculating Your Agency's Profits Correctly?" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.03</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.03</span>
                  <span style="font-size: 12px; color: #64748b;">42 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px; background: #eab308;">Finance</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">Are You Calculating Your Agency's Profits Correctly?</h3>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>

          <!-- EP.02 -->
          <div class="podcast-ep-item" data-title="EP.02 — Our Approach to Agency Acquisitions: Valuation Drivers and Deal Breakers" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.02</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.02</span>
                  <span style="font-size: 12px; color: #64748b;">35 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px; background: #eab308;">Finance</span>
                  <span style="background: #ef4444; color:#fff; padding: 1px 6px; font-size: 9px; font-weight: bold; text-transform: uppercase;">Most Listened</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">Our Approach to Agency Acquisitions: Valuation Drivers and Deal Breakers</h3>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>

          <!-- EP.01 -->
          <div class="podcast-ep-item" data-title="EP.01 — The Barrel Holdings Origin Story: Building a Portfolio of Agencies" style="border: 1px solid #cbd5e1; display: flex; padding: 24px; gap: 24px; background: #fff; cursor: pointer;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 160px; height: 160px; flex-shrink: 0; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold;">EP.01</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; font-size: 13px;">EP.01</span>
                  <span style="font-size: 12px; color: #64748b;">22 min</span>
                  <span class="wf-category-tag" style="padding: 1px 6px; font-size: 10px; background: #a855f7;">Leadership</span>
                </div>
                <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 12px 0;">The Barrel Holdings Origin Story: Building a Portfolio of Agencies</h3>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 16px;">
                <span style="font-weight: 700; font-size: 13px; text-decoration: underline;">Listen & Transcript →</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 48px; gap: 16px;">
          <span id="podcast-page-prev" style="font-size: 14px; cursor: pointer; color: #888;">← Previous</span>
          <span id="podcast-page-1" style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #000; padding: 2px 6px; cursor: pointer;" onclick="changePodcastPage(1)">1</span>
          <span id="podcast-page-2" style="font-size: 14px; padding: 2px 6px; cursor: pointer;" onclick="changePodcastPage(2)">2</span>
          <span id="podcast-page-next" style="font-size: 14px; cursor: pointer; color: #000;">Next →</span>
        </div>
      </section>

      <!-- YouTube Shorts Section -->
      <section class="wf-section-pad grid-container" style="background: #fafafa; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; margin-bottom: 32px;">
          <span class="wf-label">SHORTS</span>
          <h2 class="wf-h2">Quick takes from the podcast</h2>
          <p class="wf-body-small" style="color:#888; margin-top: 4px;">[Shorts are already published on YouTube. Pull from @TheAgencyHabitsPodcast channel]</p>
        </div>

        <div class="wf-shorts-grid" style="grid-column: span 12; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
          <div style="border: 1px solid #e2e8f0; background: #fff; padding: 12px; text-align: center;">
            <div class="wf-placeholder-box" style="aspect-ratio: 9/16; width: 100%; margin-bottom: 12px;">
              <span class="wf-placeholder-label">[Short Video]</span>
            </div>
            <h4 style="font-size: 13px; margin: 0 0 4px 0; line-height: 1.3;">Why Positioning Exercises Fail</h4>
            <span style="font-size: 11px; color: #888;">58s</span>
          </div>
          <div style="border: 1px solid #e2e8f0; background: #fff; padding: 12px; text-align: center;">
            <div class="wf-placeholder-box" style="aspect-ratio: 9/16; width: 100%; margin-bottom: 12px;">
              <span class="wf-placeholder-label">[Short Video]</span>
            </div>
            <h4 style="font-size: 13px; margin: 0 0 4px 0; line-height: 1.3;">The Truth About Client Pruning</h4>
            <span style="font-size: 11px; color: #888;">42s</span>
          </div>
          <div style="border: 1px solid #e2e8f0; background: #fff; padding: 12px; text-align: center;">
            <div class="wf-placeholder-box" style="aspect-ratio: 9/16; width: 100%; margin-bottom: 12px;">
              <span class="wf-placeholder-label">[Short Video]</span>
            </div>
            <h4 style="font-size: 13px; margin: 0 0 4px 0; line-height: 1.3;">Scale BD Without the Founder</h4>
            <span style="font-size: 11px; color: #888;">55s</span>
          </div>
          <div style="border: 1px solid #e2e8f0; background: #fff; padding: 12px; text-align: center;">
            <div class="wf-placeholder-box" style="aspect-ratio: 9/16; width: 100%; margin-bottom: 12px;">
              <span class="wf-placeholder-label">[Short Video]</span>
            </div>
            <h4 style="font-size: 13px; margin: 0 0 4px 0; line-height: 1.3;">How We Value Agencies</h4>
            <span style="font-size: 11px; color: #888;">60s</span>
          </div>
        </div>
      </section>

      <!-- Subscribe Row -->
      <section class="wf-section-pad grid-container" style="text-align: center; border-bottom: none;">
        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 24px; align-items: center;">
          <h2 class="wf-h2" style="margin: 0;">Listen to real lessons from inside agency businesses.</h2>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="https://spotify.com" target="_blank" class="wf-btn wf-btn-secondary" style="height: 44px; line-height: 42px;">Spotify →</a>
            <a href="https://podcasts.apple.com" target="_blank" class="wf-btn wf-btn-secondary" style="height: 44px; line-height: 42px;">Apple Podcasts →</a>
            <a href="https://youtube.com" target="_blank" class="wf-btn wf-btn-secondary" style="height: 44px; line-height: 42px;">YouTube Channel →</a>
          </div>
          <div style="border-top: 1px solid #e2e8f0; width: 100%; max-width: 480px; margin-top: 24px; padding-top: 24px;">
            <p class="wf-body-small" style="font-weight: bold; margin-bottom: 12px;">Get new episodes in your inbox:</p>
            <div class="wf-newsletter-form">
              <input type="email" class="wf-input-text" placeholder="Enter your email" style="margin-bottom: 0;" />
              <button class="wf-btn wf-btn-primary" onclick="simulateFormSubmit(this, 'Subscribed!')">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  episode_template: {
    title: 'EPISODE DETAIL TEMPLATE',
    annotations: [
      { num: 1, title: 'Key Takeaways', body: '3 bullets at top, scannable for time-constrained founders.', top: '480px', left: '160px' },
      { num: 2, title: 'Transcript', body: 'Full transcript available for every episode — powers Knowledge Base AI.', top: '880px', left: '160px' },
      { num: 3, title: 'Related Articles', body: 'Cross-links podcast content to blog articles on same topic.', top: '1550px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('listen')}

      <section class="wf-section-pad grid-container" style="padding-top: 40px; padding-bottom: 20px;">
        <div style="grid-column: span 12;">
          <a href="#" class="wf-body-small" onclick="navigateTo('listen')" style="font-weight: 700; text-decoration: underline; display: inline-block; margin-bottom: 24px;">← Back to all episodes</a>
        </div>
      </section>

      <!-- Episode Header (Unified Hero with Gradient Background) -->
      <section class="grid-container" style="margin-bottom: 60px; position: relative; overflow: hidden; padding: 80px 0; border-bottom: 1px solid var(--wf-border-muted);">
        <!-- Background Layer with Opacity -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); opacity: 0.4; z-index: 1;"></div>
        
        <div style="grid-column: span 12; display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; z-index: 2; text-align: center;">
          <span class="wf-category-tag" style="background: #000; color: #fff; border: none; font-size: 10px; font-weight: bold; letter-spacing: 1px; padding: 4px 12px;">Leadership</span>
          <div style="font-size: 13px; color: #000; font-weight: bold;">EP.07 | 44 min | Published: June 2026</div>
          <h1 class="wf-h1" style="margin: 8px 0; font-size: 38px; line-height: 1.2; max-width: 800px;">10 Essential Habits for Running a Successful Agency</h1>
          
          <!-- Audio Player Mockup -->
          <div style="margin-top: 16px; border: 1px solid #000; background: #fff; padding: 16px; width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 12px; text-align: left;">
            <div style="font-weight: bold; font-size: 10px; color: #666; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center;">
              <span>[AUDIO PLAYER]</span>
              <span style="font-weight: normal; font-size: 9px; font-style: italic; color: #888;">[Audio player — Framer component. File uploaded via CMS per episode. Supports MP3, WAV, M4A, AAC.]</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 16px; cursor: pointer;">▶</span>
              <div style="flex: 1; height: 4px; background: #ddd; position: relative;">
                <div style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: #000;"></div>
              </div>
              <span style="font-size: 12px; font-family: monospace;">00:00 / 44:00</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 16px; font-size: 14px;">
                <span style="cursor: pointer;">⏮10</span>
                <span style="cursor: pointer;">▶</span>
                <span style="cursor: pointer;">⏭10</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                <span>🔊────</span>
              </div>
            </div>
            <div style="font-size: 10px; color: #888; font-style: italic;">File loaded from Framer CMS</div>
          </div>
          
          <!-- Secondary Outbound Links -->
          <div style="display: flex; gap: 24px; margin-top: 4px; font-size: 13px;">
            <a href="https://spotify.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: underline;">Also on Spotify →</a>
            <a href="https://youtube.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: underline;">Watch on YouTube →</a>
          </div>
        </div>
      </section>

      <!-- Key Takeaways -->
      <section class="wf-section-pad grid-container" style="background: #f8fafc; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); margin-bottom: 48px;">
        <div style="grid-column: span 12;">
          <span class="wf-label">Key Takeaways</span>
          <ul class="wf-body" style="padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin: 12px 0 0 0;">
            <li><strong>After-action reviews compound:</strong> Taking 15 minutes to review wins and losses after a project yields better SOPs and keeps teams from repeating identical margin mistakes.</li>
            <li><strong>Structure weekly BD:</strong> Meetings fail when they are loose chats. Run them like pipeline delivery check-ins with clear CRM columns, dates, and assigned owners.</li>
            <li><strong>Mind the Bottom:</strong> Founders fail when they drag out staff underperformance. Addressing friction points early protects margins and team alignment.</li>
          </ul>
        </div>
      </section>

      <!-- Description & Transcript -->
      <section class="grid-container" style="margin-bottom: 80px;">
        <div style="grid-column: span 8; display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h3 class="wf-h3" style="font-size: 20px; margin-bottom: 12px;">Episode Description</h3>
            <p class="wf-body">In this episode, Peter Kang and Sei-Wook Kim deep dive into the operational habits that separate growing agency businesses from founder-dependent plateaus. Drawing from their experiences at Barrel Holdings companies, they breakdown the exact weekly, monthly, and quarterly schedules they mandate for all portfolio GMs.</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 32px;">
            <h3 class="wf-h3" style="font-size: 20px; margin-bottom: 16px;">Full Transcript</h3>
            <p class="wf-body-small" style="color: #64748b; font-style: italic; margin-bottom: 24px;">[Transcripts available for all episodes — provided by client. Powers KB AI.]</p>
            <div style="border: 1px solid #e2e8f0; padding: 32px; background: #fafafa; font-family: inherit; font-size: 14px; line-height: 1.6; height: 350px; overflow-y: scroll; display: flex; flex-direction: column; gap: 16px;">
              <p><strong>[00:02] Peter Kang:</strong> Welcome back to the AgencyHabits podcast. Today Sei-Wook and I are talking about habits. Specifically, the operating rhythm of agency businesses. Sei-Wook, when you think about why GMs get stuck in founder-dependency, what is the first thing that breaks?</p>
              <p><strong>[01:15] Sei-Wook Kim:</strong> It's always the calendar, Peter. The GM starts firefighting. They spend all day in Slack, and they stop doing the proactive reviews. No after-actions, no pipeline management. It's all reactive.</p>
              <p><strong>[02:44] Peter Kang:</strong> Exactly. And the thing about habits is doing them once doesn't matter. You have to build them into the company's weekly schedule so they are automatic...</p>
              <p><strong>[05:12] Sei-Wook Kim:</strong> Let's talk about the Weekly BD meeting. This is a classic example. Most agencies do them, but they're basically just status chats. "Oh, did you email Bob?" "Yeah, I will tomorrow." That is not a business development meeting. That is an updates chat...</p>
            </div>
          </div>
        </div>

        <div style="grid-column: span 4; padding-left: 24px; position: sticky; top: 100px;">
          <h4 class="wf-h4" style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">Related Articles</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="border: 1px solid #e2e8f0; padding: 16px; background: #fff; cursor: pointer;" onclick="navigateTo('article_template')">
              <span class="wf-label" style="font-size: 9px; color: #a855f7;">Leadership</span>
              <h5 class="wf-h4" style="margin: 4px 0 0 0; font-size: 14px; line-height: 1.3;">Specializing Requires Commitment</h5>
            </div>
            <div style="border: 1px solid #e2e8f0; padding: 16px; background: #fff; cursor: pointer;" onclick="navigateTo('article_template')">
              <span class="wf-label" style="font-size: 9px; color: #3b82f6;">Business Development</span>
              <h5 class="wf-h4" style="margin: 4px 0 0 0; font-size: 14px; line-height: 1.3;">How to Scale Agency BD Beyond the Founder</h5>
            </div>
          </div>
        </div>
      </section>

      <!-- Share Strip -->
      <section class="grid-container" style="padding-bottom: 40px; border-bottom: 1px solid var(--wf-border-muted); margin-bottom: 40px;">
        <div class="wf-share-strip" style="grid-column: span 12; display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
          <span style="font-size: 14px; font-weight: 700;">Send this to a founder friend:</span>
          <div style="display: flex; gap: 8px;">
            <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;">LinkedIn</button>
            <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;">Twitter/X</button>
            <button class="wf-btn wf-btn-secondary" style="height: 32px; font-size: 12px;" onclick="alert('Link copied!')">Copy Link</button>
          </div>
        </div>
      </section>

      ${getNewsletterCtaHTML()}
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
            <p class="wf-body-small" style="color: #000;">"AgencyHabits is actually the ONLY newsletter/website I actually follow as an agency founder." — Uros Mikic, CEO, Flow Ninja</p>
          </div>

          <div style="border-left: 2px solid #000; padding-left: 16px; font-style: italic;">
            <p class="wf-body-small" style="color: #000;">"Peter and Sei-Wook have been a great resource for agency owners." — Max Bernstein, Consultant</p>
          </div>

          <div>
            <span class="wf-label" style="font-size: 10px; margin-bottom: 12px;">Operating Portfolio Agencies</span>
            <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
              <div style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 16px; font-weight: 800; font-size: 12px; color: #94a3b8; font-family: sans-serif;">BARREL</div>
              <div style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 16px; font-weight: 800; font-size: 12px; color: #94a3b8; font-family: sans-serif;">BX STUDIO</div>
              <div style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 16px; font-weight: 800; font-size: 12px; color: #94a3b8; font-family: sans-serif;">MATYX</div>
              <div style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 16px; font-weight: 800; font-size: 12px; color: #94a3b8; font-family: sans-serif;">AO2</div>
            </div>
            <p class="wf-body-small" style="color: #888; margin-top: 8px; font-style: italic;">[Real logos to be provided by client — Barrel, BX Studio, Matyx, AO2, Vaulted Oak, Prima Mode]</p>
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
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Weekly frameworks from operators currently in the seat</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Real numbers, real stories — no "scale to 7-figures" hype</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Tools and templates you can use the same week</span></div>
            <div style="display:flex; gap:8px;"><span>✓</span> <span>Early access to new resources and events</span></div>
          </div>
        </div>
        <div style="grid-column: span 7;">
          <div style="border: 1px solid #000; padding: 24px; background: #fff;">
            <div class="wf-placeholder-box" style="height: 180px; width: 100%; margin-bottom: 16px;">
              <span class="wf-placeholder-label">[Newsletter Screenshot]</span>
            </div>
            <span class="wf-body-small" style="font-weight: bold; color: #888;">Subject: How we think about agency positioning</span>
            <p class="wf-body-small" style="margin-top: 8px;">"This week, we're sharing the framework our agency leaders at Barrel Holdings use to define their positioning..."</p>
            <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" class="wf-btn wf-btn-secondary" style="height: 36px; padding: 0 16px; line-height: 34px; margin-top: 12px; display: inline-block;">Read a sample issue →</a>
          </div>
        </div>
      </section>

      <!-- Past issues Archive -->
      <section class="wf-section-pad grid-container" style="border-bottom: none;">
        <div style="grid-column: span 12; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="wf-label">Past Issues</span>
            <h2 class="wf-h2">Recent Newsletters</h2>
          </div>
          <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" class="wf-btn wf-btn-secondary" style="height: 38px; padding: 0 16px; line-height: 36px;">View full archive →</a>
        </div>

        <div style="grid-column: span 12; display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 19, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">How we think about agency positioning</span>
            <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 12, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">The metrics that actually matter</span>
            <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">May 05, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">Behind the scenes of an agency acquisition</span>
            <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #ddd;">
            <span class="wf-body-small" style="width: 120px; font-weight: bold;">Apr 28, 2026</span>
            <span class="wf-body" style="flex: 1; font-weight: 600;">How to prune your client roster</span>
            <a href="https://crafty-teacher-5104.kit.com/profile" target="_blank" style="color: #000; font-weight: bold; font-size: 13px; text-decoration: none;">Read →</a>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  foundation: {
    title: 'FOUNDATION APP PAGE',
    annotations: [
      { num: 1, title: 'Positioning Audit Hero', body: 'External redirect link to foundation.agencyhabits.com', top: '150px', left: '160px' },
      { num: 2, title: 'Problem/Solution Matrix', body: 'Two-column layout matching common pain points to Foundation tool features.', top: '560px', left: '80px' },
      { num: 3, title: 'Sample Output', body: 'Large blurred/placeholder audit output showing the 4 dimensions of the positioning matrix.', top: '920px', left: '80px' },
      { num: 4, title: 'Output Preview Tabs', body: 'Tabs showcase the 4 dimensions of audit output (Positioning, Ecosystem, ICP, Service Offering).', top: '1350px', left: '80px' },
      { num: 5, title: 'Three-Step Process Flow', body: 'Horizontal layout walking through URL Scan, AI Analysis, and PDF generation.', top: '1850px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('foundation')}

      <!-- Hero (Two-Column) -->
      <section class="wf-section-pad grid-container" style="padding-top: 80px; padding-bottom: 80px; border-bottom: 1px solid var(--wf-border-muted); align-items: center;">
        <!-- Left Column -->
        <div style="grid-column: span 5; display: flex; flex-direction: column; gap: 24px; padding-right: 32px;">
          <span style="border: 1px solid #000; padding: 4px 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; align-self: flex-start;">Free Positioning Audit</span>
          <h1 class="wf-h1" style="font-size: 38px; line-height: 1.15; margin: 0;">Build Your Agency's Strategic Foundation</h1>
          <p class="wf-body-large" style="color: #333; margin: 0;">Define your positioning, ecosystem, ICP, and service offering. Just paste your website URL. AI does the rest in ~60 seconds.</p>
          <div style="margin-top: 8px;">
            <button class="wf-btn wf-btn-primary" style="height: 52px; padding: 0 32px; font-size: 16px;" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
          </div>
          <p class="wf-body-small" style="color: #666; margin: 0;">No credit card required. Export as PDF.</p>
        </div>

        <!-- Right Column: Decorative Audit Illustration -->
        <div style="grid-column: span 7; background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1a2744 100%); border-radius: 4px; min-height: 340px; padding: 36px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">

          <!-- Top label -->
          <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 20px;">Sample Audit Preview</div>

          <!-- Score dot top-right -->
          <div style="position: absolute; top: 28px; right: 28px; width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.35);"></div>
          </div>

          <!-- Top: Badge chips row -->
          <div style="display: flex; gap: 10px; margin-bottom: 28px;">
            <span style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); font-size: 9px; font-weight: 700; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 2px; text-transform: uppercase;">Positioning</span>
            <span style="background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.4); font-size: 9px; font-weight: 700; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 2px; text-transform: uppercase;">ICP</span>
          </div>

          <!-- Middle: Simulated text rows -->
          <div style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
            <div style="height: 8px; background: rgba(255,255,255,0.22); border-radius: 2px; width: 85%;"></div>
            <div style="height: 8px; background: rgba(255,255,255,0.14); border-radius: 2px; width: 65%;"></div>
            <div style="height: 8px; background: rgba(255,255,255,0.18); border-radius: 2px; width: 75%;"></div>
            <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 2px; width: 50%;"></div>
          </div>

          <!-- Bottom: Progress bar -->
          <div style="margin-top: 32px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 9px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 1px;">Audit Progress</span>
              <span style="font-size: 9px; color: rgba(255,255,255,0.35);">~60s</span>
            </div>
            <div style="height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; width: 100%;">
              <div style="height: 100%; width: 70%; background: rgba(255,255,255,0.4); border-radius: 2px;"></div>
            </div>
          </div>

          <!-- Caption -->
          <p style="margin: 20px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.5;">Your positioning, ecosystem, ICP and service offering — structured in 60 seconds.</p>
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
          <span class="wf-label">AUDIT STRUCTURE</span>
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
      <section id="foundation-process" class="wf-section-pad grid-container" style="background: #fafafa; scroll-margin-top: 100px;">
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
          <h4 class="wf-h3">2. AI Analyzed Your Positioning</h4>
          <p class="wf-body-small">Our AI reads between the lines of your website to identify your category, wedge, ICP, and service model. No questionnaire required.</p>
        </div>

        <div style="grid-column: span 4; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div class="wf-icon-placeholder wf-icon-circle" style="width: 48px; height: 48px;"></div>
          <h4 class="wf-h3">3. Get Your Positioning Audit</h4>
          <p class="wf-body-small">Review your complete positioning framework, edit anything, and export a polished PDF to share with your team.</p>
        </div>
      </section>

      <!-- Stats Row -->
      <section class="wf-section-pad grid-container" style="text-align: center; background: #fafafa; border-top: 1px solid var(--wf-border-muted); border-bottom: 1px solid var(--wf-border-muted); padding-top: 40px; padding-bottom: 40px;">
        <div style="grid-column: span 3;">
          <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 8px;">~60 seconds</h3>
          <span class="wf-label">Audit Time</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 8px;">$10K+ value</h3>
          <span class="wf-label">Manual Audit Value</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 8px;">4 key dimensions</h3>
          <span class="wf-label">Key Dimensions</span>
        </div>
        <div style="grid-column: span 3;">
          <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 8px;">Hundreds</h3>
          <span class="wf-label">Of Audits Run</span>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="wf-section-pad grid-container" style="background: #ffffff; border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center; margin-bottom: 32px;">
          <span class="wf-label">FEEDBACK</span>
          <h2 class="wf-h2">What Agency Owners Say</h2>
        </div>
        <div style="grid-column: span 6; border: 1px solid var(--wf-border-muted); padding: 24px; background: #fafafa;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 12px;">"This is the clearest my positioning has ever been. I had it done in under two minutes."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Agency Owner</span>
        </div>
        <div style="grid-column: span 6; border: 1px solid var(--wf-border-muted); padding: 24px; background: #fafafa;">
          <p class="wf-body-small" style="font-style: italic; margin-bottom: 12px;">"We used this to prep for a pitch and it changed how we talked about ourselves."</p>
          <span class="wf-label" style="font-size: 11px; margin-bottom: 0;">— Founder</span>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="wf-section-pad grid-container" style="background: #000; color: #fff; text-align: center; border-bottom: none;">
        <div style="grid-column: 3 / span 8; display: flex; flex-direction: column; gap: 24px; align-items: center;">
          <h2 class="wf-h2" style="color: #fff;">Ready to See Your Positioning?</h2>
          <p class="wf-body" style="color: #ccc; max-width: 600px;">The work that usually costs $10K+ and takes weeks — you'll have a working draft in ~60 seconds.</p>
          <button class="wf-btn wf-btn-secondary" style="border-color: #fff; color: #fff; background: transparent; height: 52px; padding: 0 32px;" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Free Positioning Audit →</button>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  kb: {
    title: 'KNOWLEDGE BASE PAGE',
    annotations: [
      { num: 1, title: 'AI Search Hero', body: 'Offers search description with external redirect button to kb.agencyhabits.com.', top: '150px', left: '160px' },
      { num: 2, title: 'Three Feature Cards', body: 'Breaks down features: Ask Any Question, Real Content Database, Linked Sources.', top: '510px', left: '80px' }
    ],
    render: () => `
      ${getHeaderHTML('kb')}

      <!-- Hero -->
      <section class="wf-section-pad grid-container" style="padding-top: 80px; padding-bottom: 80px; border-bottom: 1px solid var(--wf-border-muted); align-items: center;">
        <!-- Left Column -->
        <div style="grid-column: span 6; display: flex; flex-direction: column; gap: 24px; padding-right: 24px;">
          <span class="wf-label" style="letter-spacing: 2px;">Searchable Archives</span>
          <h1 class="wf-h1" style="font-size: 38px; line-height: 1.15; margin: 0;">Everything AgencyHabits Has Ever Published — Searchable.</h1>
          <p class="wf-body-large" style="color: #333; margin: 0;">An AI-powered knowledge base built on every article, podcast transcript, and resource from AgencyHabits. Ask any question, get structured answers with sources.</p>
          
          <div style="margin-top: 8px;">
            <button class="wf-btn wf-btn-primary" style="height: 52px; padding: 0 32px; font-size: 16px;" onclick="window.open('https://kb.agencyhabits.com', '_blank')">Search the Knowledge Base →</button>
          </div>

          <div style="margin-top: 8px;">
            <p class="wf-body-small" style="color: #666; margin: 0;">Built on full transcripts from [X] podcast episodes + 60+ articles</p>
            <p class="wf-body-small" style="color: #999; font-size: 11px; margin: 4px 0 0 0;">[Episode count TBD — client to confirm]</p>
          </div>
        </div>

        <!-- Right Column (Product Demo) -->
        <div style="grid-column: span 6; border: 1px solid #cbd5e1; padding: 32px; background: #f8fafc; border-radius: 4px; display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; align-items: center;">
            <span class="wf-label" style="color: #64748b; margin: 0; font-size: 10px;">SAMPLE OUTPUT</span>
            <span style="font-size: 11px; color: #94a3b8; font-family: monospace;">9355ms · GPT-4o-mini</span>
          </div>
          <div>
            <p class="wf-body" style="font-weight: bold; margin-bottom: 12px; font-size: 15px; color: #000;">Q: "What makes agencies lose clients?"</p>
            <p class="wf-body-small" style="line-height: 1.6; color: #333; margin: 0;">
              A: Several factors contribute to agencies losing clients:<br/>
              • Unresponsive account management — clients sense it before quality drops<br/>
              • Poor communication and expectation setting during onboarding<br/>
              • Rigid pricing models that don\'t adapt to client needs<br/>
              • Perceived lack of clear ROI from agency work
            </p>
          </div>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; flex-direction: column; gap: 6px;">
            <span class="wf-label" style="font-size: 9px; color: #64748b; margin-bottom: 2px; display: block;">SOURCES</span>
            <a href="https://kb.agencyhabits.com/episodes/ep-10" target="_blank" style="color: #007acc; font-weight: bold; text-decoration: underline; font-size: 12px; display: block;">Episode 10: Why Agencies Lose Clients →</a>
            <a href="https://kb.agencyhabits.com/episodes/ep-33" target="_blank" style="color: #007acc; font-weight: bold; text-decoration: underline; font-size: 12px; display: block;">Episode 33: Your Agency\'s ICP →</a>
          </div>
        </div>
      </section>

      <!-- Feature cards -->
      <section class="wf-section-pad grid-container" style="background: #fafafa; border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 4; border: 1px solid #cbd5e1; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between; border-radius: 4px;">
          <div>
            <div class="wf-icon-placeholder wf-icon-circle" style="width: 40px; height: 40px; margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px; font-size: 16px;">Ask Any Question</h4>
            <p class="wf-body-small" style="color: #555;">Type any question about running, growing, or selling your agency and get custom summaries.</p>
          </div>
        </div>

        <div style="grid-column: span 4; border: 1px solid #cbd5e1; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between; border-radius: 4px;">
          <div>
            <div class="wf-icon-placeholder wf-icon-circle" style="width: 40px; height: 40px; margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px; font-size: 16px;">Get Answers from Real Content</h4>
            <p class="wf-body-small" style="color: #555;">Answers are generated entirely from actual AgencyHabits articles, podcast transcripts, and resources.</p>
          </div>
        </div>

        <div style="grid-column: span 4; border: 1px solid #cbd5e1; padding: 32px; background: #fff; height: 260px; display: flex; flex-direction: column; justify-content: space-between; border-radius: 4px;">
          <div>
            <div class="wf-icon-placeholder wf-icon-circle" style="width: 40px; height: 40px; margin-bottom: 16px;"></div>
            <h4 class="wf-h3" style="margin-bottom: 8px; font-size: 16px;">Linked to Original Sources</h4>
            <p class="wf-body-small" style="color: #555;">Every generated answer links back to the original source article or episode so you can go deeper.</p>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="wf-section-pad grid-container" style="text-align: center; border-bottom: none;">
        <div style="grid-column: span 12;">
          <button class="wf-btn wf-btn-primary" style="height: 52px; padding: 0 32px;" onclick="window.open('https://kb.agencyhabits.com', '_blank')">Explore the Knowledge Base →</button>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  events: {
    title: 'EVENTS (EVENTS HUB)',
    annotations: [
      { num: 1, title: 'Benefits Row', body: 'Short bullets answering \'why should I come?\' for the ICP.', top: '240px', left: '160px' },
      { num: 2, title: 'Knowledge Share Section', body: 'Separate from general events. This is their flagship format — 39 sign-ups.', top: '450px', left: '160px' },
      { num: 3, title: 'Luma Embed', body: 'Client will create lu.ma/agencyhabits. Embed shows both Knowledge Shares and meet-ups automatically.', top: '920px', left: '80px' },
      { num: 4, title: 'Past Events Grid', body: 'Knowledge Shares have YouTube recordings. New York + London meet-ups confirmed.', top: '1280px', left: '80px' },
      { num: 5, title: 'City Form', body: 'Simple: Name + Email + City. Client confirmed they want this.', top: '1900px', left: '160px' }
    ],
    render: () => `
      ${getHeaderHTML('events')}

      <!-- Hero -->
      <section class="wf-section-pad grid-container" style="padding-top: 80px; padding-bottom: 40px; border-bottom: 1px solid var(--wf-border-muted);">
        <div style="grid-column: span 12; text-align: center;">
          <span class="wf-label" style="letter-spacing: 2px;">AgencyHabits Events</span>
          <h1 class="wf-h1" style="font-family: Georgia, serif; font-size: 56px; line-height: 1.1; margin-top: 12px;">Monthly Knowledge Share</h1>
          <p class="wf-body-large" style="margin-top: 16px; color: #333;">A monthly gathering for agency operators to learn, share, and connect.</p>
        </div>
      </section>

      <!-- Benefits Row -->
      <section class="wf-section-pad grid-container" style="padding-top: 40px; padding-bottom: 40px; border-bottom: 1px solid var(--wf-border-muted); background: #fafafa;">
        <div style="grid-column: span 3; border-right: 1px solid #ddd; padding: 12px 24px 12px 0;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Learn from Peers</div>
          <p class="wf-body-small">Learn from operators currently running the same play.</p>
        </div>
        <div style="grid-column: span 3; border-right: 1px solid #ddd; padding: 12px 24px;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Actionable SOPs</div>
          <p class="wf-body-small">Get frameworks you can use the next week.</p>
        </div>
        <div style="grid-column: span 3; border-right: 1px solid #ddd; padding: 12px 24px;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Same-Stage Founders</div>
          <p class="wf-body-small">Connect with founders at the same stage ($750K-$3M).</p>
        </div>
        <div style="grid-column: span 3; padding: 12px 0 12px 24px;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">100% Free</div>
          <p class="wf-body-small">Free - online and in-person sessions.</p>
        </div>
      </section>

      <!-- Flagship Knowledge Share Section -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted); align-items: stretch;">
        <!-- Left Column: Next Session -->
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #cbd5e1; padding: 40px; background: #fff; border-radius: 4px;">
          <div>
            <span class="wf-label" style="color: #3b82f6; margin-bottom: 16px; display: inline-block;">NEXT SESSION · June 2026</span>
            <h2 class="wf-h2" style="font-family: Georgia, serif; font-size: 30px; margin: 0 0 12px 0; line-height: 1.25;">Agency Positioning Deep Dive</h2>
            <p class="wf-body-small" style="margin-bottom: 16px; color: #333;">How to audit your messaging, define your core wedge, and structure your client service tiers for maximum margin.</p>
            <div style="display: flex; flex-direction: column; gap: 6px; font-family: Courier, monospace; font-size: 13px; color: #555; margin-bottom: 24px;">
              <div>Format: Online · Zoom · 60 min · Free</div>
              <div style="font-weight: bold; color: #000;">39 people registered</div>
            </div>
          </div>
          <div>
            <button class="wf-btn wf-btn-primary" style="align-self: flex-start; height: 48px; padding: 0 24px;" onclick="window.open('https://lu.ma/agencyhabits', '_blank')">Register via Luma →</button>
            <span class="wf-body-small" style="color: #888; font-style: italic; display: block; margin-top: 8px; font-size: 11px;">[RSVP via Luma — lu.ma/agencyhabits — client creating this calendar]</span>
          </div>
        </div>

        <!-- Right Column: Last Session Recap -->
        <div style="grid-column: span 6; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #cbd5e1; padding: 40px; background: #fafafa; border-radius: 4px;">
          <div>
            <span class="wf-label" style="color: #666; margin-bottom: 16px; display: inline-block;">LAST SESSION RECAP</span>
            <h2 class="wf-h2" style="font-family: Georgia, serif; font-size: 30px; margin: 0 0 12px 0; line-height: 1.25;">Knowledge Share #4 — Revenue Generation Habits</h2>
            <p class="wf-body-small" style="margin-bottom: 24px; color: #555; line-height: 1.5;">The outreach cadences, pipeline meetings, and review schedules used by Barrel agencies to build predictable pipelines.</p>
          </div>
          <div>
            <a href="https://youtu.be/kVuxABUqZrY" target="_blank" class="wf-btn wf-btn-secondary" style="align-self: flex-start; text-decoration: none; display: inline-block; text-align: center; line-height: 46px; height: 48px; padding: 0 24px;">Watch the recap →</a>
          </div>
        </div>
      </section>

      <!-- Upcoming Events — Luma Embed -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted); background: #ffffff;">
        <div style="grid-column: span 12; margin-bottom: 24px;">
          <span class="wf-label">ALL UPCOMING EVENTS</span>
          <h2 class="wf-h2">Luma Calendar</h2>
        </div>
        <div style="grid-column: span 12; border: 2px dashed #000; padding: 60px; text-align: center; background: #f8fafc;">
          <span style="font-size: 40px; display: block; margin-bottom: 12px;">[Calendar Icon]</span>
          <h4 class="wf-h4" style="font-size: 16px; margin-bottom: 8px;">[Luma Calendar Embed Placeholder]</h4>
          <p class="wf-body-small" style="color: #666; max-width: 600px; margin: 0 auto 16px auto;">lu.ma/agencyhabits embed widget showing all upcoming Knowledge Shares and local operator meet-ups.</p>
          <span class="wf-body-small" style="color: #888; font-style: italic; display: block;">[Luma calendar embed — lu.ma/agencyhabits — to be created by client. Shows both Knowledge Shares and meet-ups.]</span>
        </div>
      </section>

      <!-- Past Events Grid with filtering -->
      <section class="wf-section-pad grid-container" style="border-bottom: 1px solid var(--wf-border-muted); background: #fafafa;">
        <div class="wf-archive-header" style="grid-column: span 12; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span class="wf-label">ARCHIVE</span>
            <h2 class="wf-h2">Past Sessions & Meet-ups</h2>
          </div>
          <!-- Filter Controls -->
          <div style="display: flex; gap: 8px;">
            <select id="gather-filter-type" class="wf-input-text" style="height: 40px; padding: 0 12px; width: 180px; appearance: auto;" onchange="filterGatherEvents()">
              <option value="all">All Types</option>
              <option value="knowledge_share">Knowledge Shares</option>
              <option value="meetup">Meet-ups</option>
            </select>
            <select id="gather-filter-city" class="wf-input-text" style="height: 40px; padding: 0 12px; width: 150px; appearance: auto;" onchange="filterGatherEvents()">
              <option value="all">All Cities</option>
              <option value="online">Online</option>
              <option value="new_york">New York</option>
              <option value="london">London</option>
            </select>
          </div>
        </div>

        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;" id="gather-events-grid">
          <!-- Card 1 -->
          <div class="gather-event-card" data-type="knowledge_share" data-city="online" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; font-size: 10px;">KNOWLEDGE SHARE · ONLINE</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">May 2026</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">Knowledge Share #4 — Revenue Generation Habits</h4>
            </div>
            <a href="https://youtu.be/kVuxABUqZrY" target="_blank" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">Watch recap →</a>
          </div>

          <!-- Card 2 -->
          <div class="gather-event-card" data-type="knowledge_share" data-city="online" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; font-size: 10px;">KNOWLEDGE SHARE · ONLINE</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">April 2026</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">Knowledge Share #3 — Service Tiers & Margin Expansion</h4>
            </div>
            <a href="https://youtu.be/m47PcqH1VXM" target="_blank" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">Watch recap →</a>
          </div>

          <!-- Card 3 -->
          <div class="gather-event-card" data-type="knowledge_share" data-city="online" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; font-size: 10px;">KNOWLEDGE SHARE · ONLINE</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">March 2026</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">Knowledge Share #2 — How to Scale Agency Business Development</h4>
            </div>
            <a href="https://youtu.be/-Os03l5DLYE" target="_blank" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">Watch recap →</a>
          </div>

          <!-- Card 4 -->
          <div class="gather-event-card" data-type="knowledge_share" data-city="online" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; font-size: 10px;">KNOWLEDGE SHARE · ONLINE</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">February 2026</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">Knowledge Share #1 — Defining Your Strategic Ideal Customer Profile</h4>
            </div>
            <a href="https://youtu.be/VEahl_2yKiw" target="_blank" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">Watch recap →</a>
          </div>

          <!-- Card 5 -->
          <div class="gather-event-card" data-type="meetup" data-city="new_york" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #fef3c7; color: #d97706; padding: 2px 6px; font-size: 10px;">MEET-UP · NEW YORK</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">2026</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">New York Operator Meet-up</h4>
              <div class="wf-placeholder-box" style="height: 80px; width: 100%; margin-top: 12px; background: #f1f5f9;"><span class="wf-placeholder-label" style="font-size: 11px;">[Photo Placeholder]</span></div>
            </div>
            <a href="#" onclick="alert('Viewing NY recap photos...'); return false;" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">View recap →</a>
          </div>

          <!-- Card 6 -->
          <div class="gather-event-card" data-type="meetup" data-city="london" style="grid-column: span 4; border: 1px solid #000; background: #fff; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 280px;">
            <div>
              <span class="wf-label" style="background: #fef3c7; color: #d97706; padding: 2px 6px; font-size: 10px;">MEET-UP · LONDON</span>
              <span class="wf-body-small" style="display: block; margin-top: 12px; color: #666; font-weight: bold;">2025</span>
              <h4 class="wf-h4" style="margin-top: 8px; font-family: Georgia, serif; line-height: 1.3;">London Operator Meet-up</h4>
              <div class="wf-placeholder-box" style="height: 80px; width: 100%; margin-top: 12px; background: #f1f5f9;"><span class="wf-placeholder-label" style="font-size: 11px;">[Photo Placeholder — 29 attendees]</span></div>
            </div>
            <a href="#" onclick="alert('Viewing London recap photos...'); return false;" style="font-size: 13px; font-weight: bold; color: #000; text-decoration: underline; margin-top: 12px;">View recap →</a>
          </div>
        </div>
      </section>

      <!-- City meet-up form -->
      <section class="wf-section-pad grid-container" style="border-bottom: none; background: #ffffff;">
        <div style="grid-column: 3 / span 8; border: 2px solid #000; padding: 40px; background: #fff;">
          <h3 class="wf-h2" style="font-size: 24px; margin-bottom: 8px; text-align: center;">Want a meet-up in your city?</h3>
          <p class="wf-body-small" style="margin-bottom: 24px; text-align: center; color: #555;">We're expanding to new cities. Let us know where you are.</p>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 16px;">
              <div style="flex: 1;">
                <label class="wf-label">Name</label>
                <input type="text" id="city-form-name" class="wf-input-text" placeholder="Your name" style="height: 44px;" />
              </div>
              <div style="flex: 1;">
                <label class="wf-label">Email</label>
                <input type="email" id="city-form-email" class="wf-input-text" placeholder="Enter your email" style="height: 44px;" />
              </div>
            </div>
            <div>
              <label class="wf-label">City</label>
              <input type="text" id="city-form-city" class="wf-input-text" placeholder="e.g. Chicago, IL" style="height: 44px;" />
            </div>
            <button class="wf-btn wf-btn-primary" style="height: 48px; margin-top: 8px;" onclick="simulateFormSubmit(this, 'Sent!')">Let us know →</button>
          </div>
        </div>
      </section>

      ${getFooterHTML()}
    `
  },
  category_hub: {
    title: 'CATEGORY HUB',
    annotations: [
      { num: 1, title: 'Category Hub Purpose', body: 'Universal dynamic view presenting articles filterable by category.', top: '40px', left: '160px' },
      { num: 2, title: 'Dynamic Category Intro', body: 'Displays operator-POV intro custom-tailored for the selected topic.', top: '150px', left: '160px' },
      { num: 3, title: 'Tabs Toggle', body: 'Allows switching between standard grid (All Articles) and sequential order list (Read in Order). Series order is set editorially by Ivona per category via Framer CMS field.', top: '300px', left: '80px' },
      { num: 4, title: 'Article Grid / Read In Order List', body: 'Renders either 3-column article cards or a clean vertical list of steps.', top: '550px', left: '80px' },
      { num: 5, title: 'Dynamic Bottom Tool', body: 'Contextual resource promotion matching the active category focus.', top: '1350px', left: '80px' }
    ],
    render: () => {
      // Ensure active tab initialized
      STATE.categoryHubActiveTab = STATE.categoryHubActiveTab || 'all';
      const category = STATE.currentCategory || 'Business Development';
      
      const categories = [
        { id: 'bd', name: 'Business Development', gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', articles: [
          { title: 'How to Scale Agency BD Beyond the Founder', author: 'Peter Kang', date: 'Apr 28, 2026' },
          { title: 'The Client Pruning Framework', author: 'AgencyHabits', date: 'Apr 14, 2026' },
          { title: 'What Does a Client Actually Buy When They Hire You?', author: 'AgencyHabits', date: 'Mar 17, 2026' }
        ]},
        { id: 'finance', name: 'Finance', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', articles: [
          { title: "Agency Cash Flow: What the P&L Isn't Telling You", author: 'AgencyHabits', date: 'Mar 31, 2026' },
          { title: "Reversing Your Agency's Eroding Profits", author: 'AgencyHabits', date: 'Jan 20, 2026' },
          { title: "Are You Calculating Your Agency's Profits Correctly?", author: 'AgencyHabits', date: 'Dec 2025' }
        ]},
        { id: 'leadership', name: 'Leadership', gradient: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', articles: [
          { title: 'Specializing Requires Commitment', author: 'AgencyHabits', date: 'Jan 6, 2026' },
          { title: 'The Org Chart Exercise Every Agency Founder Should Do', author: 'AgencyHabits', date: 'Nov 2025' },
          { title: 'Mind the Bottom', author: 'AgencyHabits', date: 'Oct 2025' }
        ]},
        { id: 'positioning', name: 'Positioning', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)', articles: [
          { title: 'How to Define Your Agency\'s ICP (Beyond "B2B SaaS")', author: 'Peter Kang', date: 'May 12, 2026' },
          { title: 'The Three Agency Ecosystem Archetypes', author: 'AgencyHabits', date: 'Mar 3, 2026' },
          { title: 'Specialization vs. Positioning', author: 'AgencyHabits', date: 'Feb 2026' }
        ]},
        { id: 'clients', name: 'Clients', gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', articles: [
          { title: 'The Client Pruning Framework', author: 'AgencyHabits', date: 'Apr 14, 2026' },
          { title: 'What Does a Client Actually Buy When They Hire You?', author: 'AgencyHabits', date: 'Mar 17, 2026' },
          { title: 'Client Experience vs. Quality Work', author: 'AgencyHabits', date: 'Dec 2025' }
        ]},
        { id: 'talent', name: 'Talent', gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)', articles: [
          { title: 'Hiring Is the Highest-Leverage Thing You Do', author: 'AgencyHabits', date: 'Sep 2025' },
          { title: 'When to Hire vs. When to Outsource', author: 'AgencyHabits', date: 'Aug 2025' },
          { title: 'How to Build a Team That Doesn\'t Depend on You', author: 'AgencyHabits', date: 'Jul 2025' }
        ]},
        { id: 'delivery', name: 'Delivery', gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)', articles: [
          { title: 'How Agencies Lose Margin on Delivery', author: 'AgencyHabits', date: 'Nov 2025' },
          { title: 'The Project Profitability Framework', author: 'AgencyHabits', date: 'Oct 2025' },
          { title: 'SOPs That Actually Get Used', author: 'AgencyHabits', date: 'Sep 2025' }
        ]},
        { id: 'marketing', name: 'Marketing', gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', articles: [
          { title: 'Why Your Agency Website Says Nothing', author: 'AgencyHabits', date: 'Feb 2026' },
          { title: 'Content Marketing for Agency Operators', author: 'AgencyHabits', date: 'Jan 2026' },
          { title: 'How to Build an Audience While Running a Business', author: 'AgencyHabits', date: 'Dec 2025' }
        ]}
      ];

      const CATEGORY_INTROS = {
        'Business Development': 'Scaling agency sales beyond the founder is the single hardest ceiling to crack. These articles outline the exact proposal structures, pipeline cadences, and sales processes used by Barrel Holdings agencies to build predictable, repeatable growth.',
        'Finance': 'Margins are won and lost in the details of utilization, pricing models, and operational overhead. Learn how to calculate true profitability, protect your cash flow, and prepare your agency business for eventual exit or acquisition.',
        'Leadership': 'True leadership means building systems that operate independently of your daily presence. Review the organizational design frameworks, weekly meeting habits, and performance targets we mandate for our agency general managers.',
        'Positioning': 'Without a narrow strategic wedge, your agency is a commodity competing on price. These articles detail how to identify your niche, define your core service offerings, and position your brand to command premium fees.',
        'Clients': 'Retaining and growing existing client relationships is far cheaper than acquiring new ones. Explore our frameworks for client onboarding, expectation management, proactive communication, and strategic client pruning.',
        'Talent': 'Your agency is only as good as the people you recruit, train, and retain. Read our guidelines on hiring leverage, outsourcing strategies, team accountability, and structuring roles to reduce key-person risk.',
        'Delivery': 'Operational inefficiency drains your profit margins before you notice it. Implement standard operating procedures that actually get used, optimize project scoping, and manage delivery timelines with rigor.',
        'Marketing': 'Effective agency marketing isn\'t about vanity metrics; it\'s about building a consistent pipeline of ideal client leads. Learn how to create high-authority content, build an audience, and showcase your agency\'s expertise.'
      };

      const catObj = categories.find(c => c.name === category) || categories[0];
      const introText = CATEGORY_INTROS[category] || 'Learn, share, and connect with agency operators on this topic.';

      // Generate 9 articles
      const categoryArticles = [];
      for (let i = 0; i < 9; i++) {
        const origArt = catObj.articles[i % catObj.articles.length];
        categoryArticles.push({
          title: i < catObj.articles.length ? origArt.title : `${origArt.title} (Part ${Math.floor(i / 3) + 1})`,
          author: origArt.author,
          date: origArt.date
        });
      }

      let gridHTML = '';
      categoryArticles.forEach(art => {
        gridHTML += `
          <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('${category.replace(/'/g, "\\\\'")}', '${art.title.replace(/'/g, "\\\\'")}', '${art.author.replace(/'/g, "\\\\'")}', '${art.date.replace(/'/g, "\\\\'")}')">
            <div class="wf-placeholder-box wf-article-card-image" style="background: ${catObj.gradient}; height: 160px; display: flex; align-items: center; justify-content: center;">
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 12px;">[${category.toUpperCase()} COVER]</span>
            </div>
            <div class="wf-article-card-content" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
              <div>
                <div class="wf-meta-row" style="margin-bottom: 8px;">
                  <span class="wf-category-tag" style="background: ${catObj.gradient}; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">${category.toUpperCase()}</span>
                </div>
                <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${art.title}</h4>
                <span class="wf-body-small" style="color: #666; font-size: 11px;">by ${art.author} · ${art.date}</span>
              </div>
              <span style="font-weight: 700; font-size: 12px; text-decoration: underline; margin-top: auto; display: inline-block;">Read →</span>
            </div>
          </div>
        `;
      });

      // Read in Order Series (Step-by-step sequential links)
      let readInOrderHTML = `
        <div style="grid-column: span 12; border: 1px solid #cbd5e1; padding: 32px; background: #fff; margin-bottom: 40px;">
          <span class="wf-label" style="color: #000; margin-bottom: 8px;">READ IN ORDER</span>
          <h3 class="wf-h3" style="font-size: 18px; margin: 0 0 16px 0;">Step-by-Step Series</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      `;
      
      catObj.articles.forEach((art, idx) => {
        readInOrderHTML += `
          <div style="border-left: 3px solid #000; padding-left: 16px; cursor: pointer;" onclick="navigateToArticle('${category.replace(/'/g, "\\'")}', '${art.title.replace(/'/g, "\\'")}', '${art.author.replace(/'/g, "\\'")}', '${art.date.replace(/'/g, "\\'")}')">
            <span style="font-size: 11px; font-weight: bold; color: #666; display: block; text-transform: uppercase;">Step ${idx + 1}</span>
            <span style="font-weight: 700; font-size: 14px; color: #000; display: block; margin-top: 4px; text-decoration: underline;">${art.title}</span>
          </div>
        `;
      });
      
      readInOrderHTML += `
          </div>
        </div>
      `;

      // Relevant tool card
      let toolCardHTML = '';
      const catUpper = category.toUpperCase();
      if (catUpper === 'BUSINESS DEVELOPMENT') {
        toolCardHTML = `
          <div style="grid-column: span 12; border: 1px solid #cbd5e1; padding: 40px; background: #f0fdf4; border-radius: 4px; display: flex; align-items: center; justify-content: space-between; margin-top: 48px;">
            <div>
              <span class="wf-label" style="color: #166534; margin-bottom: 8px; display: block;">RECOMMENDED FOR THIS TOPIC</span>
              <h3 class="wf-h2" style="margin: 0 0 8px 0; font-size: 24px;">The Business Development Collection</h3>
              <p class="wf-body-small" style="color: #475569; margin: 0;">Real, winning proposals and statements of work from Barrel Holdings agencies.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              <span class="wf-badge-premium">PREMIUM</span>
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('bizdev_collection')">Learn More →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'FINANCE') {
        toolCardHTML = `
          <div style="grid-column: span 12; border: 1px solid #cbd5e1; padding: 40px; background: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: space-between; margin-top: 48px;">
            <div>
              <span class="wf-label" style="color: #475569; margin-bottom: 8px; display: block;">RECOMMENDED FOR THIS TOPIC</span>
              <h3 class="wf-h2" style="margin: 0 0 8px 0; font-size: 24px;">The Exit-Readiness Checklist</h3>
              <p class="wf-body-small" style="color: #475569; margin: 0;">See your agency the way a buyer would. Free checklist download.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              <span style="font-size: 24px; font-weight: 800; color: #10b981;">FREE</span>
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('exit_checklist')">Download →</button>
            </div>
          </div>
        `;
      } else if (catUpper === 'POSITIONING') {
        toolCardHTML = `
          <div style="grid-column: span 12; border: 1px solid #cbd5e1; padding: 40px; background: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: space-between; margin-top: 48px;">
            <div>
              <span class="wf-label" style="color: #047857; margin-bottom: 8px; display: block;">RECOMMENDED FOR THIS TOPIC</span>
              <h3 class="wf-h2" style="margin: 0 0 8px 0; font-size: 24px;">Free Positioning Audit</h3>
              <p class="wf-body-small" style="color: #475569; margin: 0;">Get a free 60-second positioning audit for your agency based on your website URL.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              <span style="font-size: 24px; font-weight: 800; color: #047857;">FREE</span>
              <button class="wf-btn wf-btn-primary" onclick="window.open('https://foundation.agencyhabits.com', '_blank')">Get Your Positioning Audit →</button>
            </div>
          </div>
        `;
      } else {
        toolCardHTML = `
          <div style="grid-column: span 12; border: 1px solid #cbd5e1; padding: 40px; background: #f8fafc; border-radius: 4px; display: flex; align-items: center; justify-content: space-between; margin-top: 48px;">
            <div>
              <span class="wf-label" style="color: #64748b; margin-bottom: 8px; display: block;">JOIN THE COMMUNITY</span>
              <h3 class="wf-h2" style="margin: 0 0 8px 0; font-size: 24px;">Join 1,500+ founders running $750K–$3M agencies.</h3>
              <p class="wf-body-small" style="color: #475569; margin: 0;">Weekly tactical advice and behind-the-scenes insights directly in your inbox.</p>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <button class="wf-btn wf-btn-primary" onclick="navigateTo('newsletter')">Subscribe →</button>
            </div>
          </div>
        `;
      }

      // Related Episodes block matching podcast episodes to active category
      const RELATED_EPISODES = {
        'Business Development': [
          { ep: 'EP.05', title: "How We'd Generate Leads If We Started Our Agency Today", duration: '45 min' },
          { ep: 'EP.07', title: '10 Essential Habits for Running a Successful Agency', duration: '44 min' }
        ],
        'Finance': [
          { ep: 'EP.03', title: "Are You Calculating Your Agency's Profits Correctly?", duration: '42 min' },
          { ep: 'EP.02', title: 'Our Approach to Agency Acquisitions: Valuation Drivers and Deal Breakers', duration: '35 min' }
        ],
        'Leadership': [
          { ep: 'EP.07', title: '10 Essential Habits for Running a Successful Agency', duration: '44 min' },
          { ep: 'EP.01', title: 'The Barrel Holdings Origin Story: Building a Portfolio of Agencies', duration: '22 min' }
        ],
        'Positioning': [
          { ep: 'EP.04', title: 'How Specialization Impacts Your Agency\'s Growth, Margins, and Valuation', duration: '38 min' },
          { ep: 'EP.05', title: "How We'd Generate Leads If We Started Our Agency Today", duration: '45 min' }
        ]
      };
      
      const relatedEps = RELATED_EPISODES[category] || [
        { ep: 'EP.07', title: '10 Essential Habits for Running a Successful Agency', duration: '44 min' },
        { ep: 'EP.05', title: "How We'd Generate Leads If We Started Our Agency Today", duration: '45 min' }
      ];
      
      let relatedEpisodesHTML = `
        <div style="grid-column: span 12; margin-top: 48px; border-top: 1px solid #cbd5e1; padding-top: 48px;">
          <span class="wf-label" style="letter-spacing: 2px;">RELATED EPISODES</span>
          <h2 class="wf-h2" style="font-size: 24px; margin-top: 8px; margin-bottom: 24px;">Listen to the Podcast</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      `;
      
      relatedEps.forEach(ep => {
        relatedEpisodesHTML += `
          <div style="border: 1px solid #cbd5e1; padding: 24px; background: #fff; cursor: pointer; display: flex; gap: 20px; align-items: center;" onclick="navigateTo('episode_template')">
            <div class="wf-placeholder-box" style="width: 80px; height: 80px; flex-shrink: 0; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">
              <span class="wf-placeholder-label" style="color: #fff; font-size: 14px; font-weight: bold;">${ep.ep}</span>
            </div>
            <div>
              <span style="font-size: 11px; color: #64748b; font-weight: bold;">${ep.ep} · ${ep.duration}</span>
              <h4 class="wf-h4" style="margin: 4px 0 0 0; font-size: 16px; line-height: 1.3;">${ep.title}</h4>
            </div>
          </div>
        `;
      });
      
      relatedEpisodesHTML += `
          </div>
        </div>
      `;

      // Tab 2: Read in Order vertical list (with full cards)
      let readInOrderTabHTML = `
        <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; margin-bottom: 40px;">
      `;
      
      catObj.articles.forEach((art, idx) => {
        const stepNum = String(idx + 1).padStart(2, '0');
        readInOrderTabHTML += `
          <div style="grid-column: span 4;" class="wf-article-card" onclick="navigateToArticle('${category.replace(/'/g, "\\\\'")}', '${art.title.replace(/'/g, "\\\\'")}', '${art.author.replace(/'/g, "\\\\'")}', '${art.date.replace(/'/g, "\\\\'")}')">
            <div class="wf-placeholder-box wf-article-card-image" style="background: ${catObj.gradient}; height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
              <span style="position: absolute; top: 12px; left: 12px; background: #000; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">${stepNum}</span>
              <span class="wf-placeholder-label" style="color: #fff; font-weight: bold; font-size: 12px;">[${category.toUpperCase()} COVER]</span>
            </div>
            <div class="wf-article-card-content" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; height: 180px;">
              <div>
                <div class="wf-meta-row" style="margin-bottom: 8px;">
                  <span class="wf-category-tag" style="background: ${catObj.gradient}; color: #fff; border: none; font-size: 9px; padding: 2px 6px;">${category.toUpperCase()}</span>
                </div>
                <h4 class="wf-h3" style="font-size: 15px; margin: 0 0 8px 0; line-height: 1.3; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${art.title}</h4>
                <span class="wf-body-small" style="color: #666; font-size: 11px;">by ${art.author} · ${art.date}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                <span style="font-weight: 700; font-size: 12px; text-decoration: underline; display: inline-block;">Read →</span>
                <span style="font-size: 11px; font-weight: 800; color: #cbd5e1; text-transform: uppercase;">Next →</span>
              </div>
            </div>
          </div>
        `;
      });
      
      readInOrderTabHTML += `
        </div>
      `;

      return `
        ${getHeaderHTML('articles')}
        
        <section class="wf-section-pad grid-container" style="padding-top: 60px; padding-bottom: 40px;">
          <div style="grid-column: span 12; margin-bottom: 40px;">
            <a href="#" class="wf-body-small" onclick="navigateTo('articles')" style="font-weight: 700; text-decoration: underline; display: inline-block; margin-bottom: 16px;">← Back to all topics</a>
            <h1 class="wf-h1" style="font-size: 40px; margin-bottom: 12px;">${category}</h1>
            <p class="wf-body-large" style="max-width: 800px; color: #333;">${introText}</p>
          </div>

          <!-- Tabs Toggle Buttons -->
          <div style="grid-column: span 12; display: flex; gap: 16px; margin-bottom: 32px; border-bottom: 2px solid #cbd5e1; padding-bottom: 16px;">
            <button class="wf-btn ${STATE.categoryHubActiveTab === 'all' ? 'wf-btn-primary' : 'wf-btn-secondary'}" style="height: 38px; padding: 0 24px; font-size: 13px;" onclick="setCategoryHubTab('all')">All Articles</button>
            <button class="wf-btn ${STATE.categoryHubActiveTab === 'order' ? 'wf-btn-primary' : 'wf-btn-secondary'}" style="height: 38px; padding: 0 24px; font-size: 13px;" onclick="setCategoryHubTab('order')">Read in Order</button>
          </div>

          ${STATE.categoryHubActiveTab === 'all' ? `
            <!-- Filters Row -->
            <div style="grid-column: span 12; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 16px; margin-bottom: 32px;">
              <div style="display: flex; gap: 8px; width: 100%; max-width: 480px;">
                <input type="text" class="wf-input-text" placeholder="Search ${category} articles..." style="height: 38px; flex: 1;" />
              </div>
              <div>
                <select class="wf-input-text" style="width: 150px; height: 38px; padding: 0 10px; appearance: auto;">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            <!-- Articles Grid (9 Articles) -->
            <div style="grid-column: span 12; display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
              ${gridHTML}
            </div>

            <!-- Pagination -->
            <div style="grid-column: span 12; display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 60px; font-weight: bold;">
              <span style="cursor: not-allowed; color: #94a3b8;">←</span>
              <span style="cursor: pointer; border-bottom: 2px solid #000; padding: 2px 8px;">1</span>
              <span style="cursor: pointer; color: #64748b; padding: 2px 8px;">2</span>
              <span style="cursor: pointer; color: #64748b; padding: 2px 8px;">3</span>
              <span style="color: #64748b;">...</span>
              <span style="cursor: pointer; color: #000;">Next →</span>
            </div>
          ` : `
            <!-- Tab 2: Read in Order vertical list -->
            ${readInOrderTabHTML}
          `}

          <!-- Contextual Tool -->
          ${toolCardHTML}

          <!-- Related Episodes -->
          ${relatedEpisodesHTML}
        </section>

        ${getNewsletterCtaHTML()}
        ${getFooterHTML()}
      `;
    }
  }
};

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
    <div id="grid-overlay" class="grid-overlay" style="display: none;">
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


  // Update navigation items state in sidebar menu
  document.querySelectorAll('.menu-item').forEach(el => {
    if (el.getAttribute('data-page-id') === STATE.activePageId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Dynamic initializers for interactive widgets on specific pages
  if (STATE.activePageId === 'listen') {
    updatePodcastArchiveDisplay();
  } else if (STATE.activePageId === 'contact') {
    filterContactFAQ('general');
  } else if (STATE.activePageId === 'foundation') {
    switchFoundationTab('positioning');
  }

  // Recalculate canvas zoom scale and scroll height bounds
  updateCanvasScale();
  handleViewportScroll();
  setTimeout(() => {
    updateCanvasScale();
    handleViewportScroll();
  }, 50);
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

// Interactive helper for Gather page filtering
function filterGatherEvents() {
  const typeSelect = document.getElementById('gather-filter-type');
  const citySelect = document.getElementById('gather-filter-city');
  if (!typeSelect || !citySelect) return;

  const selectedType = typeSelect.value;
  const selectedCity = citySelect.value;

  const cards = document.querySelectorAll('.gather-event-card');
  cards.forEach(card => {
    const cardType = card.getAttribute('data-type');
    const cardCity = card.getAttribute('data-city');

    const typeMatch = (selectedType === 'all' || cardType === selectedType);
    const cityMatch = (selectedCity === 'all' || cardCity === selectedCity);

    if (typeMatch && cityMatch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
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
  handleViewportScroll();
}

// Router trigger function
function navigateTo(pageId) {
  if (PAGES[pageId]) {
    STATE.activePageId = pageId;
    renderActivePage();
  }
}

function navigateToArticle(category, title, author, date) {
  STATE.currentArticle = { category, title, author, date };
  navigateTo('article_template');
}

function setCategoryHubTab(tabId) {
  STATE.categoryHubActiveTab = tabId;
  renderActivePage();
  updateCanvasScale();
}

function handleViewportScroll() {
  const viewport = document.getElementById('canvas-viewport');
  const stickyBar = document.getElementById('wf-sticky-mobile-bar');
  if (!viewport || !stickyBar) return;

  if (STATE.deviceView !== 'phone') {
    stickyBar.style.display = 'none';
    return;
  }

  const scrollTop = viewport.scrollTop;
  const scrollHeight = viewport.scrollHeight;
  const clientHeight = viewport.clientHeight;
  const maxScroll = scrollHeight - clientHeight;

  if (maxScroll > 100 && scrollTop > maxScroll * 0.5) {
    stickyBar.style.display = 'flex';
  } else {
    stickyBar.style.display = 'none';
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
  
  // Register scroll event on the canvas viewport container
  const viewport = document.getElementById('canvas-viewport');
  if (viewport) {
    viewport.addEventListener('scroll', handleViewportScroll);
  }
  
  // Update scaling dynamically on window resize
  window.addEventListener('resize', updateCanvasScale);
});
