# How to update the website

Everything in this `content` folder can be edited in Excel. You don't need to touch any code.

## 1. Projects: `projects.csv`

Open it in Excel. One row = one project card on the website.

| Column | What to write | Example |
|---|---|---|
| **Status** | `Ongoing` or `Completed` | Ongoing |
| **Client** | Client name (add "via ..." if you worked under a main contractor) | ReNew Power (via Faben India) |
| **Size** | Capacity or quantity | 30 MW solar · 200 MWh BESS · 50 km |
| **Scope** | What *we* did, in one line | Civil, piling, AC/DC works, testing & commissioning |
| **Location** | District, State | Virudhunagar, Tamil Nadu |
| **Photo** | File name of a photo in the `photos` folder, or leave empty | evolta-array.jpg |
| **Show** | `Yes` to show, `No` to hide without deleting | Yes |

- The order of rows is the order on the website. Put the most impressive ones first.
- A project with no photo shows its size on a blue card instead.
- When saving, choose **CSV UTF-8 (Comma delimited)** and keep the same file name. If Excel asks, click **Keep current format**.

## 2. Earlier projects: `earlier-projects.csv`

This is the table under **More track record** on the website. Columns: Customer, Via (main contractor), Type, Location, Size, Scope, Show.

## 3. Photos: the `photos` folder

1. Copy site photos into `content/photos`. Phone photos straight from the camera are fine; the website shrinks them automatically.
2. Use simple names: lower-case words with dashes, e.g. `hexa-bess-foundation.jpg`. Avoid spaces and brackets.
3. Write the same file name in the **Photo** column of `projects.csv`.
4. Use **JPG or PNG**. iPhone HEIC photos may not work. On iPhone, set Settings → Camera → Formats → *Most Compatible*, or export as JPG.
5. Best photos: wide, daylight, the work clearly visible, no people's faces close-up without consent.

## 4. See your changes

Double-click **`start-website.bat`** in the main website folder. The site opens at http://localhost:5173.
While it is running, saving `projects.csv` or adding a photo refreshes the page by itself.

If a photo name is wrong, the black window shows a **WARNING** line telling you which row to fix.

## 5. Publish

After checking on localhost, commit and push to GitHub (including the new files in `src/assets/img`). The live site updates in about 2 minutes.

## Other content

Company numbers, services, team, equipment, leadership, careers and contact details are in `src/data/site.js`. Ask your developer or Claude to change those.
