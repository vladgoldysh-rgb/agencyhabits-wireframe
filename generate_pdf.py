import os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class SpecPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_margins(20, 20, 20)
        self.set_auto_page_break(auto=True, margin=20)
        
    def header(self):
        if self.page_no() > 1:
            self.set_font("helvetica", "I", 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, "AgencyHabits Redesign - Technical Specifications & Wireframe Structure", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")
            self.line(20, 28, 190, 28)
            self.ln(5)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("helvetica", "I", 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, f"Page {self.page_no()}", align="C")

def sanitize_text(text):
    replacements = {
        '\u201c': '"', '\u201d': '"',
        '\u2018': "'", '\u2019': "'",
        '\u2013': '-', '\u2014': ' - ',
        '\u2022': '*', '\u20ac': 'EUR',
        '\u00a9': '(c)', '\u2192': '->',
        '\u2190': '<-', '\u2026': '...',
        '\u00a0': ' ', '\u00e9': 'e',
        '\u00f6': 'o', '\u2032': "'",
        '\u00ad': '-', '\u2713': '[check]',
        '\u2611': '[x]', '\u2610': '[ ]',
        '🖥️': '[Desktop]', '🖥': '[Desktop]',
        '🎉': '!', '💡': '[Note]',
        '👉': '->', '✔️': '[check]',
    }
    for orig, rep in replacements.items():
        text = text.replace(orig, rep)
    # Remove any non-ASCII characters completely to avoid crashes
    return ''.join(c for c in text if ord(c) < 128)

def main():
    pdf = SpecPDF()
    pdf.add_page()
    
    # ------------------ COVER PAGE ------------------
    pdf.set_fill_color(30, 41, 59) # Slate 800 dark theme
    pdf.rect(0, 0, 210, 297, "F")
    
    # Elegant grid design overlay
    pdf.set_draw_color(51, 65, 85) # Slate 700
    pdf.set_line_width(0.5)
    for x in range(20, 210, 20):
        pdf.line(x, 0, x, 297)
    for y in range(20, 297, 20):
        pdf.line(0, y, 210, y)
        
    # Title
    pdf.set_y(80)
    pdf.set_font("helvetica", "B", 32)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 15, "AGENCYHABITS", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
    pdf.cell(0, 15, "REDESIGN SPEC", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
    
    # Draw a line
    pdf.set_draw_color(244, 63, 94) # Rose 500 accent
    pdf.set_line_width(2)
    pdf.line(20, 115, 120, 115)
    
    # Subtitle
    pdf.set_y(125)
    pdf.set_font("helvetica", "B", 14)
    pdf.set_text_color(226, 232, 240) # Slate 200
    pdf.cell(0, 8, "Interactive Wireframes & UI Structure Specifications", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
    pdf.set_font("helvetica", "", 12)
    pdf.set_text_color(148, 163, 184) # Slate 400
    pdf.cell(0, 8, "Built for Barrel Holdings Companies", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
    
    # Version & Info
    pdf.set_y(220)
    pdf.set_font("helvetica", "B", 10)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 6, "DOCUMENT INFO:", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("helvetica", "", 10)
    pdf.set_text_color(203, 213, 225) # Slate 300
    pdf.cell(0, 6, "Version: 1.0 (Phase 6 Final Release)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(0, 6, "Author: Antigravity AI Pair Programmer", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(0, 6, "Target Environment: HTML5, CSS3, Vanilla JS", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(0, 6, "Date: June 2026", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    # ------------------ PAGE 2: TABLE OF CONTENTS ------------------
    pdf.add_page()
    pdf.set_text_color(15, 23, 42) # Dark slate
    pdf.set_font("helvetica", "B", 20)
    pdf.cell(0, 10, "Table of Contents", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(5)
    
    toc_items = [
        ("1. Executive Summary & Architecture", 3),
        ("2. Global Presentation & Scaling Mechanics", 4),
        ("3. Typography & Spacing Specifications", 5),
        ("4. Mobile Access Blocker Specifications", 6),
        ("5. Sitemap & Core Pages Specification", 7),
        ("6. Complete Page Content Specifications", 8),
        ("7. Appendices - Key Technical Code Snippets", 13)
    ]
    
    for title, page in toc_items:
        pdf.set_font("helvetica", "", 11)
        pdf.cell(140, 10, title, border="B")
        pdf.set_font("helvetica", "B", 11)
        pdf.cell(0, 10, f"Page {page}", border="B", align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(2)
        
    # ------------------ PAGE 3: SECTION 1: EXEC SUMMARY ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "1. Executive Summary & Architecture", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_draw_color(15, 23, 42)
    pdf.set_line_width(0.5)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    pdf.set_font("helvetica", "", 10)
    summary_text = (
        "This document details the architectural design and structural specifications for the AgencyHabits "
        "Redesign project. Built from a comprehensive audit of existing assets and structured using modern "
        "responsive design methodologies, this specification serves as the blueprint for the static wireframe "
        "and presentation workspace.\n\n"
        "The workspace enables users to view and interact with all 17 prototype pages, configure viewport dimensions "
        "dynamically, review developer annotations, and toggle grids.\n\n"
        "Core Technical Stack:\n"
        "- Structure: HTML5 (Semantic elements: section, aside, nav, article, main, header, footer)\n"
        "- Styling: Vanilla CSS3 (Custom properties, CSS Grid, Flexbox, responsive transformations)\n"
        "- Interaction: Vanilla JavaScript ES6 (State management, DOM templates, event registration)"
    )
    pdf.multi_cell(0, 6, sanitize_text(summary_text))
    pdf.ln(8)
    
    pdf.set_font("helvetica", "B", 12)
    pdf.cell(0, 8, "Repository and Deployment Information", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    repo_text = (
        "- Repository URL: https://github.com/vladgoldysh-rgb/agencyhabits-wireframe.git\n"
        "- Deployment URL: https://vladgoldysh-rgb.github.io/agencyhabits-wireframe/agencyhabits-wireframe/\n"
        "- Deployment Branch: main\n"
        "- Host Provider: GitHub Pages (Root deployment, static build actions)"
    )
    pdf.set_font("helvetica", "B", 10)
    pdf.multi_cell(0, 6, sanitize_text(repo_text))
    
    # ------------------ PAGE 4: SECTION 2: GLOBAL PRESENTATION ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "2. Global Presentation & Scaling Mechanics", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    pdf.set_font("helvetica", "", 10)
    scaling_text = (
        "To ensure that designers and clients can inspect layouts at actual physical widths (Desktop: 1440px, "
        "Tablet: 768px, Phone: 375px) without cropping or layout breakages on smaller screens (such as a MacBook Air), "
        "a customized 'Framer-Like Canvas Scaler' was implemented.\n\n"
        "Mechanic Overview:\n"
        "1. The canvas container locks its width strictly to the active viewport device state (e.g. 1440px width on desktop).\n"
        "2. The inner canvas width is compared against the parent viewport's client width.\n"
        "3. If the available width is less than the target size, a CSS transform (scale) is calculated:\n"
        "   scaleFactor = availableWidth / targetWidth\n"
        "4. The transform is applied to the canvas element. To prevent trailing empty scrollable spaces or overlay "
        "collapses, the outer wrapper's bounding box is adjusted using:\n"
        "   wrapper.style.width = (targetWidth * scaleFactor) + 'px'\n"
        "   wrapper.style.height = (canvasHeight * scaleFactor) + 'px'\n\n"
        "Workspace UI Layout:\n"
        "- Sidebar Navigation: Left-docked list of 17 wireframe pages. Toggles active page state.\n"
        "- Control Header: Center canvas controls. Toggles device views (Desktop, Tablet, Phone)."
    )
    pdf.multi_cell(0, 6, sanitize_text(scaling_text))
    
    # ------------------ PAGE 5: SECTION 3: TYPOGRAPHY & SPACING ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "3. Typography & Spacing Specifications", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    pdf.set_font("helvetica", "", 10)
    spacing_text = (
        "The redesign introduces strict typography and spacing tokens to provide a balanced, modern grid layout "
        "across all responsive breakpoints:\n\n"
        "1. Section Vertical Padding:\n"
        "   - Desktop View: 120px padding-top / padding-bottom\n"
        "   - Tablet/Phone View: 60px padding-top / padding-bottom (Auto-reset height overrides)\n\n"
        "2. Grid Row Gaps:\n"
        "   - Desktop: row-gap: 48px\n"
        "   - Tablet: row-gap: 32px\n"
        "   - Phone: row-gap: 24px\n\n"
        "3. Typography Controls:\n"
        "   - Main Headline (.wf-h1): 48px on Desktop, capped at 24px on Phone to prevent clipping and text overlap.\n"
        "   - Secondary Headline (.wf-h2): 32px on Desktop, capped at 20px on Phone.\n"
        "   - Body Copy (.wf-body): 16px font size with 1.6 line-height.\n\n"
        "4. Layout Overrides for Mobile Viewports:\n"
        "   - Column Resets: Any inline styling declaring grid columns (e.g. style='grid-column: span 7') is "
        "automatically flattened to 'grid-column: 1 / -1 !important' when active inside Tablet or Phone views.\n"
        "   - Section Height Resets: Any height locked inline (e.g. style='height: 820px') is overridden to "
        "'height: auto !important; min-height: 500px !important' to prevent content clipping."
    )
    pdf.multi_cell(0, 6, sanitize_text(spacing_text))
    
    # ------------------ PAGE 6: SECTION 4: MOBILE ACCESS BLOCKER ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "4. Mobile Access Blocker Specifications", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    pdf.set_font("helvetica", "", 10)
    blocker_text = (
        "At the client's request, access to the wireframe specimen is blocked on physical smartphone browsers to "
        "ensure proper viewing quality, while maintaining standard responsive simulation on desktop screens.\n\n"
        "Implementation Details:\n"
        "1. Block Overlay HTML Element:\n"
        "   A full-screen overlay wrapper is added inside index.html as a direct sibling of the main container:\n"
        "   <div class='mobile-block-overlay'>\n"
        "     <div class='mobile-block-content'>\n"
        "       <span class='mobile-block-icon'>[Desktop]</span>\n"
        "       <h2>Desktop Only Access</h2>\n"
        "       <p>Please open this link on a desktop computer or laptop to view the interactive wireframes.</p>\n"
        "     </div>\n"
        "   </div>\n\n"
        "2. CSS Query Breakpoint:\n"
        "   The display rule is tied directly to the window width rather than state variables:\n"
        "   @media (max-width: 767px) {\n"
        "     .mobile-block-overlay { display: flex !important; }\n"
        "   }\n\n"
        "3. Workspace Device Switcher Compatibility:\n"
        "   Since desktop developers and designers use high-resolution screens (e.g. 1440px wide browsers), "
        "changing the canvas state to 'Phone (375px)' scales the inner canvas container without affecting "
        "the main window width. Thus, the CSS media query is not triggered, and previewing works correctly."
    )
    pdf.multi_cell(0, 6, sanitize_text(blocker_text))
    
    # ------------------ PAGE 7: SECTION 5: SITEMAP ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "5. Sitemap & Core Pages Specification", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    pdf.set_font("helvetica", "", 10)
    sitemap_text = (
        "The project maps 18 distinct pages covering the sitemap flow, organized by ID and navigation priority:\n\n"
        "1. home - Home Page (Core hub containing sitemaps, podcast players, list teaser, resources)\n"
        "2. read - Read Page (Articles Listing Hub with category sections and newsletter opt-in)\n"
        "3. category_hub - Category Hub Page (Universal dynamic page presenting articles and tools filtered by topic)\n"
        "4. article_template - Article Detail Template (Standard reading layout with hero, headers, TOC, upsells)\n"
        "5. listen - Listen Page (Podcast Hub featuring latest EP.07, hosts info, Shorts row, subscribe options)\n"
        "6. episode_template - Episode Detail Template (Individual episode detail, notes, transcript, related reads)\n"
        "7. gather - Gather Page (Events Hub with Knowledge Share session, Luma embed, past grid, city meetup form)\n"
        "8. tools - Tools & Downloads (Overview of downloadable checklists, guides, and playbooks)\n"
        "9. newsletter - Newsletter Landing (Hero headline centered, kit.com signup form, recent archive links)\n"
        "10. about - About Us (Origin story, founder letter, General Manager Ivona Namjesnik, agencies grid, stats)\n"
        "11. start_here - Start Here (Curated onboarding for first-time visitors featuring key reads, EP.07, and Foundation App)\n"
        "12. foundation - Foundation App Page (AI strategic positioning audit preview, tabbed sections)\n"
        "13. kb - Knowledge Base Page (Searchable AI answer-engine teaser pointing to kb.agencyhabits.com)\n"
        "14. bizdev_collection - Business Development Collection (Sub-page detailing the $599 resource and benefits)\n"
        "15. exit_checklist - Exit-Readiness Checklist (Sub-page with download form and alignment quote)\n"
        "16. goal_template - Annual Goal Setting Template (Sub-page with goal structure description)\n"
        "17. books - Book Recommendations (14 books filtered by Leadership, Finance, BD, Productivity; footer only)\n"
        "18. contact - Contact Us (Clickable categories FAQ accordion: General, Podcast, Partners, Selling; footer only)"
    )
    pdf.multi_cell(0, 6, sanitize_text(sitemap_text))
    
    # ------------------ PAGES 8+: SECTION 6: CONTENT SPECS ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "6. Complete Page Content Specifications", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    # Read the content document and format it
    content_file = "/Users/vladyslavholdysh/.gemini/antigravity/scratch/agencyhabits-wireframe/AgencyHabits_Content_Document.md"
    if os.path.exists(content_file):
        with open(content_file, "r", encoding="utf-8") as f:
            lines = f.readlines()
            
        pdf.set_font("helvetica", "", 9.5)
        text_accumulator = ""
        
        for line in lines:
            line = sanitize_text(line.strip())
            if not line:
                continue
                
            # Formatting rules based on Markdown elements
            if line.startswith("# "):
                if text_accumulator:
                    pdf.multi_cell(0, 5, text_accumulator)
                    text_accumulator = ""
                pdf.ln(4)
                pdf.set_font("helvetica", "B", 14)
                pdf.set_text_color(244, 63, 94) # Accent
                pdf.cell(0, 8, line[2:], new_x=XPos.LMARGIN, new_y=YPos.NEXT)
                pdf.set_text_color(15, 23, 42)
                pdf.set_font("helvetica", "", 9.5)
            elif line.startswith("## "):
                if text_accumulator:
                    pdf.multi_cell(0, 5, text_accumulator)
                    text_accumulator = ""
                pdf.ln(3)
                pdf.set_font("helvetica", "B", 12)
                pdf.cell(0, 7, line[3:], new_x=XPos.LMARGIN, new_y=YPos.NEXT)
                pdf.set_font("helvetica", "", 9.5)
            elif line.startswith("### "):
                if text_accumulator:
                    pdf.multi_cell(0, 5, text_accumulator)
                    text_accumulator = ""
                pdf.ln(2)
                pdf.set_font("helvetica", "B", 10.5)
                pdf.cell(0, 6, line[4:], new_x=XPos.LMARGIN, new_y=YPos.NEXT)
                pdf.set_font("helvetica", "", 9.5)
            else:
                text_accumulator += line + "\n"
                if len(text_accumulator) > 1500: # Flush to prevent overflow
                    pdf.multi_cell(0, 5, text_accumulator)
                    text_accumulator = ""
                    
        if text_accumulator:
            pdf.multi_cell(0, 5, text_accumulator)
    else:
        pdf.cell(0, 10, "Content document not found. Refer to original workspace repository.", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
    # ------------------ APPENDICES: CODE SNIPPETS ------------------
    pdf.add_page()
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "7. Appendices - Key Technical Code Snippets", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.line(20, 38, 190, 38)
    pdf.ln(5)
    
    # 1. Resize script
    pdf.set_font("helvetica", "B", 11)
    pdf.cell(0, 8, "Appendix A: Framer-Like Viewport Scaling Handler (JavaScript)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(2)
    
    code_resize = (
        "function updateCanvasScale() {\n"
        "  const viewport = document.getElementById('canvas-viewport');\n"
        "  const wrapper = document.getElementById('canvas-scale-wrapper');\n"
        "  const canvas = document.getElementById('wireframe-canvas');\n"
        "  if (!viewport || !wrapper || !canvas) return;\n\n"
        "  // Clear temporary styles to let browser calculate offsetHeight\n"
        "  canvas.style.transform = 'none';\n"
        "  wrapper.style.width = '';\n"
        "  wrapper.style.height = '';\n\n"
        "  const device = STATE.deviceView || 'desktop';\n"
        "  let targetWidth = 1440;\n"
        "  if (device === 'tablet') targetWidth = 768;\n"
        "  if (device === 'phone') targetWidth = 375;\n\n"
        "  const padding = 80; // 40px left + 40px right padding\n"
        "  const availableWidth = Math.max(320, viewport.clientWidth - padding);\n\n"
        "  let scale = 1;\n"
        "  if (availableWidth < targetWidth) {\n"
        "    scale = availableWidth / targetWidth;\n"
        "  }\n\n"
        "  // Set CSS transform scale and wrapper sizes\n"
        "  canvas.style.transform = `scale(${scale})`;\n"
        "  const canvasHeight = canvas.offsetHeight;\n"
        "  wrapper.style.width = `${targetWidth * scale}px`;\n"
        "  wrapper.style.height = `${canvasHeight * scale}px`;\n"
        "}\n\n"
        "window.addEventListener('DOMContentLoaded', () => {\n"
        "  renderActivePage();\n"
        "  updateCanvasScale();\n"
        "  window.addEventListener('resize', updateCanvasScale);\n"
        "});"
    )
    pdf.set_font("courier", "", 8.5)
    pdf.set_fill_color(248, 250, 252) # Light blue/slate
    pdf.multi_cell(0, 4, code_resize, border=1, fill=True)
    pdf.ln(5)
    
    # 2. CSS Breakpoints
    pdf.set_font("helvetica", "B", 11)
    pdf.cell(0, 8, "Appendix B: Grid Flatting & Height Reset Breakpoints (CSS)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(2)
    
    code_css = (
        "/* Responsive styling for Tablet and Phone device view modes */\n"
        ".view-tablet [style*=\"grid-column\"],\n"
        ".view-phone [style*=\"grid-column\"] {\n"
        "  grid-column: 1 / -1 !important;\n"
        "}\n\n"
        ".view-tablet section[style*=\"height:\"],\n"
        ".view-phone section[style*=\"height:\"] {\n"
        "  height: auto !important;\n"
        "  min-height: 500px !important;\n"
        "  padding-top: 60px !important;\n"
        "  padding-bottom: 60px !important;\n"
        "}\n\n"
        "/* Mobile Physical Blocker Overlay query */\n"
        "@media (max-width: 767px) {\n"
        "  .mobile-block-overlay {\n"
        "    display: flex !important;\n"
        "    position: fixed;\n"
        "    top: 0; left: 0; right: 0; bottom: 0;\n"
        "    background-color: #0f172a;\n"
        "    z-index: 9999;\n"
        "    justify-content: center;\n"
        "    align-items: center;\n"
        "  }\n"
        "}"
    )
    pdf.set_font("courier", "", 8.5)
    pdf.multi_cell(0, 4, code_css, border=1, fill=True)
    
    # Output file
    output_pdf_path = "/Users/vladyslavholdysh/.gemini/antigravity/scratch/agencyhabits-wireframe/AgencyHabits_Specification_Structure.pdf"
    pdf.output(output_pdf_path)
    print(f"PDF Successfully generated at: {output_pdf_path}")

if __name__ == "__main__":
    main()
