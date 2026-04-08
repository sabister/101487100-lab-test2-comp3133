# 101487100-lab-test2-comp3133

**COMP 3133 – Lab Test 2 | Student: 101487100**

Harry Potter Character Browser built with Angular 17 + Angular Material.

## Features

- **Character List** – Displays all HP characters with image, name, and house
- **Filter by House** – Dropdown to filter characters by Gryffindor, Slytherin, Hufflepuff, or Ravenclaw
- **Character Details** – Full profile page: name, species, house, wizard, ancestry, wand (wood/core/length), actor, image
- **Angular Material** – Cards, toolbar, spinner, select, chips, divider
- **Routing** – `/characters`, `/characters/filter`, `/characters/:id`

## Getting Started

```bash
npm install
ng serve
```

Open `http://localhost:4200`

## Build

```bash
ng build
```

Output goes to `dist/101487100-lab-test2-comp3133/browser/`

## Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` and configure the service
5. Build command: `npm install && npm run build`
6. Start command: `npx serve dist/101487100-lab-test2-comp3133/browser -l 3000 --single`

## API Reference

- All characters: `https://hp-api.onrender.com/api/characters`
- By house: `https://hp-api.onrender.com/api/characters/house/:house`
- By ID: `https://hp-api.onrender.com/api/character/:id`
