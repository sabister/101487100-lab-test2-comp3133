import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  template: `
    <div class="site-header">
      <h1 class="site-title" routerLink="/characters">HP Characters</h1>
      <nav class="site-nav">
        <a mat-button routerLink="/characters" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:true}">All Characters</a>
        <a mat-button routerLink="/characters/filter" routerLinkActive="active-link">Filter by House</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .site-header {
      background: #2a2a2a;
      border-bottom: 1px solid #444;
      padding: 1.2rem 2rem 0.8rem;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .site-title {
      font-family: 'Cinzel', serif;
      font-size: 2.4rem;
      font-weight: 700;
      color: #ffffff;
      cursor: pointer;
      margin-bottom: 0.6rem;
      letter-spacing: 0.02em;
    }
    .site-nav { display: flex; justify-content: center; gap: 0.5rem; }
    a { color: #bbbbbb !important; font-family: 'Lato', sans-serif; font-size: 0.85rem !important; }
    .active-link { color: #ffffff !important; text-decoration: underline; }
  `]
})
export class AppComponent {}
