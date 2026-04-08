import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { HpService } from '../services/hp.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatProgressSpinnerModule,
    MatButtonModule, MatChipsModule, MatDividerModule
  ],
  template: `
    <div class="back-bar">
      <a mat-button routerLink="/characters" class="back-btn">← Back to All Characters</a>
    </div>

    <div class="loading-container" *ngIf="loading">
      <mat-spinner diameter="60" color="accent"></mat-spinner>
      <p>Loading character...</p>
    </div>

    <div class="error-msg" *ngIf="error">{{ error }}</div>

    <div class="details-page" *ngIf="character && !loading">
      <div class="details-card">
        <div class="img-section">
          <img
            [src]="character.image || 'https://placehold.co/400x500/1a1a2e/c9a84c?text=' + character.name[0]"
            [alt]="character.name"
            class="character-portrait"
            (error)="onImgError($event)" />
        </div>
        <div class="info-section">
          <h2 class="char-name" [ngClass]="getHouseClass(character.house)">
            {{ character.name }}
          </h2>

          <mat-divider class="divider"></mat-divider>

          <div class="info-grid">
            <div class="info-row" *ngIf="character.house">
              <span class="label">House</span>
              <span class="value" [ngClass]="getHouseClass(character.house)">{{ character.house }}</span>
            </div>
            <div class="info-row" *ngIf="character.actor">
              <span class="label">Actor</span>
              <span class="value accent">{{ character.actor }}</span>
            </div>
            <div class="info-row">
              <span class="label">Wizard</span>
              <span class="value accent">{{ character.wizard ? 'Yes' : 'No' }}</span>
            </div>
            <div class="info-row" *ngIf="character.species">
              <span class="label">Species</span>
              <span class="value accent">{{ character.species }}</span>
            </div>
            <div class="info-row" *ngIf="character.ancestry">
              <span class="label">Ancestry</span>
              <span class="value accent">{{ character.ancestry }}</span>
            </div>

            <ng-container *ngIf="character.wand">
              <div class="info-row" *ngIf="character.wand.wood">
                <span class="label">Wand Wood</span>
                <span class="value accent">{{ character.wand.wood }}</span>
              </div>
              <div class="info-row" *ngIf="character.wand.core">
                <span class="label">Wand Core</span>
                <span class="value accent">{{ character.wand.core }}</span>
              </div>
              <div class="info-row" *ngIf="character.wand.length">
                <span class="label">Wand Length</span>
                <span class="value accent">{{ character.wand.length }}</span>
              </div>
            </ng-container>

            <div class="info-row" *ngIf="character.patronus">
              <span class="label">Patronus</span>
              <span class="value accent">{{ character.patronus }}</span>
            </div>
            <div class="info-row">
              <span class="label">Alive</span>
              <span class="value" [style.color]="character.alive ? '#2a9d4a' : '#ae0001'">
                {{ character.alive ? 'Yes' : 'No' }}
              </span>
            </div>
          </div>

          <div class="tags-row" *ngIf="character.alternate_names?.length">
            <span class="label">Also known as:</span>
            <mat-chip-set>
              <mat-chip *ngFor="let name of character.alternate_names" class="alias-chip">{{ name }}</mat-chip>
            </mat-chip-set>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-bar {
      padding: 0.8rem 1.5rem;
      background: #2a2a2a;
      border-bottom: 1px solid #444;
    }
    .back-btn { color: #bbbbbb !important; font-size: 0.85rem; }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      gap: 1.5rem;
      color: #999;
      background: #1e1e1e;
    }

    .error-msg {
      text-align: center;
      padding: 3rem;
      color: #ae0001;
      background: #1e1e1e;
    }

    .details-page {
      min-height: calc(100vh - 120px);
      background: #1e1e1e;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 2rem;
    }

    .details-card {
      display: flex;
      gap: 2rem;
      max-width: 860px;
      width: 100%;
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      overflow: hidden;
      padding: 1.5rem;
    }

    @media (max-width: 700px) {
      .details-card { flex-direction: column; gap: 1rem; }
      .img-section { width: 100% !important; }
    }

    .img-section { width: 280px; flex-shrink: 0; }
    .character-portrait {
      width: 100%;
      border-radius: 6px;
      object-fit: cover;
      display: block;
      border: 1px solid #3a3a3a;
    }

    .info-section { flex: 1; display: flex; flex-direction: column; }

    .char-name {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: #dddddd;
    }

    .divider { border-color: #3a3a3a !important; margin-bottom: 1rem !important; }

    .info-grid { display: flex; flex-direction: column; gap: 0.5rem; }

    .info-row { display: flex; align-items: baseline; gap: 0.5rem; font-size: 0.9rem; }
    .label { color: #999; min-width: 110px; font-size: 0.85rem; }
    .value { color: #dddddd; }
    .accent { color: #bbbbbb !important; }

    .tags-row { margin-top: 1.2rem; }
    .alias-chip { background: #333 !important; color: #999 !important; font-size: 0.75rem; }

    .house-gryffindor { color: #ae0001 !important; }
    .house-slytherin   { color: #2a8c4a !important; }
    .house-hufflepuff  { color: #d4a017 !important; }
    .house-ravenclaw   { color: #4a6fa5 !important; }
    .house-none        { color: #dddddd !important; }
  `]
})
export class CharacterDetailsComponent implements OnInit {
  @Input() characterId?: string;
  character: Character | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private hpService: HpService
  ) {}

  ngOnInit(): void {
    const id = this.characterId || this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hpService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character = data[0] ?? null;
          this.loading = false;
          if (!this.character) this.error = 'Character not found.';
        },
        error: () => {
          this.error = 'Failed to load character details.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No character ID provided.';
      this.loading = false;
    }
  }

  getHouseClass(house: string): string {
    if (!house) return 'house-none';
    return 'house-' + house.toLowerCase();
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const name = this.character?.name ?? '?';
    img.src = `https://placehold.co/400x500/1a1a2e/c9a84c?text=${encodeURIComponent(name[0])}`;
  }
}
