import { Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterFilterComponent } from './character-filter/character-filter.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/filter', component: CharacterFilterComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent },
];
