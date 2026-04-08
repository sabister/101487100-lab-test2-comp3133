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
npx ng serve
```

Open `http://localhost:4200`

## Build

```bash
ng build
```

Output goes to `dist/101487100-lab-test2-comp3133/browser/`



## API Reference

- All characters: `https://hp-api.onrender.com/api/characters`
- By house: `https://hp-api.onrender.com/api/characters/house/:house`
- By ID: `https://hp-api.onrender.com/api/character/:id`
