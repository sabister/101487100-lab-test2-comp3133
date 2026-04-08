import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HpService } from '../services/hp.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatSelectModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatToolbarModule
  ],
  template: `
    <div class="page-header" [ngClass]="'bg-' + selectedHouse.toLowerCase()">
      <h1>Filter by House</h1>
    </div>

    <div class="filter-section" [ngClass]="'bg-' + selectedHouse.toLowerCase()">
      <mat-form-field appearance="fill" class="house-select">
        <mat-label>Select a House</mat-label>
        <mat-select [(ngModel)]="selectedHouse" (ngModelChange)="onHouseChange($event)">
          <mat-option *ngFor="let house of houses" [value]="house.value">
            <span [class]="house.cls">{{ house.label }}</span>
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <div class="loading-container" [ngClass]="'bg-' + selectedHouse.toLowerCase()" *ngIf="loading">
      <mat-spinner diameter="50" color="accent"></mat-spinner>
      <p>Loading {{ selectedHouse }} members...</p>
    </div>

    <div class="error-msg" *ngIf="error">
      <p>{{ error }}</p>
    </div>

    <div class="count-label" [ngClass]="'bg-' + selectedHouse.toLowerCase()" *ngIf="!loading && characters.length > 0">
      <span [class]="getHouseClass(selectedHouse)">{{ selectedHouse }}</span>
      — {{ characters.length }} characters
    </div>

    <div class="characters-grid" [ngClass]="'bg-' + selectedHouse.toLowerCase()" *ngIf="!loading && !error && characters.length > 0">
      <mat-card
        class="character-card"
        *ngFor="let char of characters"
        [routerLink]="['/characters', char.id]">
        <div class="card-image-wrap">
          <img
            [src]="char.image || 'https://placehold.co/300x400/1a1a2e/c9a84c?text=' + char.name[0]"
            [alt]="char.name"
            class="character-img"
            (error)="onImgError($event, char.name)" />
        </div>
        <mat-card-content class="card-content">
          <h3 class="char-name">{{ char.name }}</h3>
          <p class="char-actor" *ngIf="char.actor">Actor: {{ char.actor }}</p>
          <p class="char-house" [ngClass]="getHouseClass(char.house)">
            {{ char.house }}
          </p>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="empty-msg" *ngIf="!loading && !error && characters.length === 0 && selectedHouse">
      <p>No characters found for {{ selectedHouse }}.</p>
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      padding: 1.5rem 1rem;
      border-bottom: 1px solid #444;
      transition: background 0.4s ease;
    }
    h1 {
      font-family: 'Cinzel', serif;
      color: #ffffff;
      font-size: 1.6rem;
      margin-bottom: 0.3rem;
    }
    .subtitle { color: rgba(255,255,255,0.7); font-size: 0.85rem; }

    /* House backgrounds */
    .bg-gryffindor { background: #5a0000 !important; }
    .bg-slytherin   { background: #0a3d1f !important; }
    .bg-hufflepuff  { background: #5a4500 !important; }
    .bg-ravenclaw   { background: #0d1f3c !important; }

    .filter-section {
      display: flex;
      justify-content: center;
      padding: 1.5rem 1rem 1rem;
      transition: background 0.4s ease;
    }
    .house-select { width: 260px; }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 40vh;
      gap: 1.5rem;
      color: rgba(255,255,255,0.8);
      transition: background 0.4s ease;
    }

    .error-msg, .empty-msg {
      text-align: center;
      padding: 3rem;
      color: #999;
    }
    .error-msg { color: #ae0001; }

    .count-label {
      text-align: center;
      padding: 0.8rem;
      color: rgba(255,255,255,0.8);
      font-size: 0.85rem;
      transition: background 0.4s ease;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      padding: 1rem 1.5rem 2rem;
      transition: background 0.4s ease;
    }

    .character-card {
      background: rgba(0,0,0,0.35) !important;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px !important;
      cursor: pointer;
      overflow: hidden;
      padding: 0 !important;
    }
    .character-card:hover { border-color: rgba(255,255,255,0.4); }
    .card-overlay { display: none; }
    .view-label { display: none; }

    .card-image-wrap {
      width: 100%;
      aspect-ratio: 3/4;
      overflow: hidden;
      background: rgba(0,0,0,0.2);
    }
    .character-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .card-content {
      padding: 0.8rem !important;
      text-align: center;
    }
    .char-name {
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      color: #ffffff;
      margin-bottom: 0.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .char-actor { font-size: 0.78rem; color: rgba(255,255,255,0.6); margin-bottom: 0.2rem; }
    .char-house { font-size: 0.78rem; font-weight: 700; }
    .house-gryffindor { color: #ff6b6b !important; }
    .house-slytherin   { color: #6bffaa !important; }
    .house-hufflepuff  { color: #ffd966 !important; }
    .house-ravenclaw   { color: #7ab3ff !important; }
    .house-none        { color: #aaa !important; }
  `]
})
export class CharacterFilterComponent implements OnInit {
  characters: Character[] = [];
  loading = false;
  error = '';
  selectedHouse = 'Gryffindor';

  houses = [
    { value: 'Gryffindor', label: 'Gryffindor', cls: 'house-gryffindor' },
    { value: 'Slytherin',  label: 'Slytherin',  cls: 'house-slytherin'  },
    { value: 'Hufflepuff', label: 'Hufflepuff', cls: 'house-hufflepuff' },
    { value: 'Ravenclaw',  label: 'Ravenclaw',  cls: 'house-ravenclaw'  },
  ];

  constructor(private hpService: HpService) {}

  ngOnInit(): void {
    this.loadHouse(this.selectedHouse);
  }

  onHouseChange(house: string): void {
    this.loadHouse(house);
  }

  loadHouse(house: string): void {
    this.loading = true;
    this.error = '';
    this.characters = [];
    this.hpService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load characters for this house.';
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
