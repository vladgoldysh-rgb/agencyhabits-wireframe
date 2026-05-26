# AgencyHabits Wireframes

Interactive wireframes and prototype flow for AgencyHabits.

## Features Included
- **Homepage (Dashboard)**
- **Articles & Article Listing** with categories and search
- **Podcast Section** (Featured Episodes & Podcast Archive)
- **Books Page** with search functionality
- **The List Page** (vertical step progress layouts ready for scroll animations)
- **Newsletter Page** (centered layout headlines)
- **Exit-Readiness Checklist**
- **Foundation App & Events Pages**
- **Responsive Workspace Simulator**: Supports desktop, tablet, and mobile adaptations inside a central viewport canvas.
- **Mobile Access Block Overlay**: A custom full-screen overlay that blocks real smartphone browser viewports, prompting visitors to view on a desktop PC.

## Running Locally
You can run a local server in the project root:
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

## Deployment / Hosting
To host on GitHub Pages:
1. Ensure the code is pushed to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Go to your repository settings on GitHub: **Settings -> Pages**.
3. Under **Build and deployment**, set the **Source** to `Deploy from a branch`.
4. Choose the `main` branch and the `/ (root)` folder.
5. Click **Save**. Within a few minutes, your site will be live at `https://vladgoldysh-rgb.github.io/agencyhabits-wireframe/`.
