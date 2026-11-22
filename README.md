# Northern Sky website

## Everyday tasks
| I want to… | Do this |
|---|---|
| **See the website on my computer** | Double-click `start-website.bat`. It opens http://localhost:5173 |
| Update projects | Edit `content/projects.csv` in Excel (see `content/HOW-TO-UPDATE.md`) |
| Update the earlier-projects table | Edit `content/earlier-projects.csv` |
| Add photos | Copy them into `content/photos/` and put the file name in the Photo column |
| Change company numbers, services, team, leadership, careers, contact | Edit `src/data/site.js` |
| Publish | Run `npm.cmd run build` (updates the `docs` folder), then commit and push to `main`. GitHub Pages publishes the `docs` folder in about a minute |

## One-time setup
1. Install **Node.js LTS** from https://nodejs.org (needed for the local preview).
2. Move `MOVE-TO-.github-workflows-deploy.yml` to `.github/workflows/deploy.yml`.
3. GitHub → repo **Settings → Pages → Source: GitHub Actions**. Check the custom domain still shows `northernskydevelopers.com`.
4. Contact form: create a free access key at web3forms.com using contact@northernskydev.com and paste it into `contact.web3formsKey` in `src/data/site.js`. Until then the form opens the visitor's email app.

## Commands (for developers)
- `npm run dev`: local preview with live reload. Also processes `content/` first.
- `npm run build`: production build into `dist/`.
- `npm run images` / `npm run content`: process photos or spreadsheets on their own.

See `CLAUDE.md` for the rules AI assistants must follow when editing this site.
