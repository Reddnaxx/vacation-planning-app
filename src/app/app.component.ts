import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { IconService } from './shared/services/icon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = "ПЛАНИРОВЩИК ОТПУСКОВ";

  constructor(private iconService: IconService) {
    this.iconService.registerIcons()
  }
}
