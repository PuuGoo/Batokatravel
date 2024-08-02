import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Catelogy } from '../db';
@Component({
  selector: 'app-catelogy-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './catelogy-card.component.html',
  styleUrl: './catelogy-card.component.css',
})
export class CatelogyCardComponent {
  @Input() catelogy!: Catelogy;
}
