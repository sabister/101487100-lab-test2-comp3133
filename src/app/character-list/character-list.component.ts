import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HpService } from '../services/hp.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressSpinnerModule, MatChipsModule],
  template: `
    <div class="page-header">
      <p class="subtitle">{{ characters.length }} characters from the Harry Potter universe</p>
    </div>

    <div class="loading-container" *ngIf="loading">
      <mat-spinner diameter="60" color="accent"></mat-spinner>
      <p>Summoning characters...</p>
    </div>

    <div class="error-msg" *ngIf="error">
      <p>{{ error }}</p>
    </div>

    <div class="characters-grid" *ngIf="!loading && !error">
      <mat-card
        class="character-card"
        *ngFor="let char of characters"
        [routerLink]="['/characters', char.id]">
        <div class="card-image-wrap">
          <img
            [src]="char.image || 'https://placehold.co/300x400/1a1a2e/c9a84c?text=' + char.name"
            [alt]="char.name"
            class="character-img"
            (error)="onImgError($event, char.name)" />
          <div class="card-overlay">
            <span class="view-label">View Details</span>
          </div>
        </div>
        <mat-card-content class="card-content">
          <h3 class="char-name">{{ char.name }}</h3>
          <p class="char-house" [ngClass]="getHouseClass(char.house)">
            {{ char.house || 'No House' }}
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      padding: 1.5rem 1rem;
      background: #2a2a2a;
      border-bottom: 1px solid #444;
    }
    h1 {
      font-family: 'Cinzel', serif;
      color: #dddddd;
      font-size: 1.6rem;
      margin-bottom: 0.3rem;
    }
    .subtitle { color: #999; font-size: 0.85rem; }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
      gap: 1.5rem;
      color: #999;
    }

    .error-msg {
      text-align: center;
      padding: 3rem;
      color: #ae0001;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      padding: 1.5rem;
      background: #1e1e1e;
    }

    .character-card {
      background: #2a2a2a !important;
      border: 1px solid #3a3a3a;
      border-radius: 6px !important;
      cursor: pointer;
      overflow: hidden;
      padding: 0 !important;
    }
    .character-card:hover {
      border-color: #666;
    }

    .card-image-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      overflow: hidden;
      background: #333;
    }
    .character-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card-overlay { display: none; }
    .view-label { display: none; }

    .card-content {
      padding: 0.8rem !important;
      text-align: center;
    }
    .char-name {
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      color: #dddddd;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .char-house {
      font-size: 0.78rem;
      font-weight: 700;
    }
    .house-gryffindor { color: #ae0001 !important; }
    .house-slytherin   { color: #2a8c4a !important; }
    .house-hufflepuff  { color: #d4a017 !important; }
    .house-ravenclaw   { color: #4a6fa5 !important; }
    .house-none        { color: #666 !important; }
  `]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  loading = true;
  error = '';

  constructor(private hpService: HpService) {}

  ngOnInit(): void {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load characters. Please try again later.';
        this.loading = false;
      }
    });
  }

  getHouseClass(house: string): string {
    if (!house) return 'house-none';
    return 'house-' + house.toLowerCase();
  }

  onImgError(event: Event, name: string): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://placehold.co/300x400/1a1a2e/c9a84c?text=${encodeURIComponent(name[0])}`;
  }
}
