import { Component } from '@angular/core';
import { FireModule } from './fire.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FireModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }
}
