import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MaterialModule } from "../../../../shared/modules/material/material.module";
import { CommonModule } from "@angular/common";
import { MatCardActions } from '@angular/material/card';
import { HistoryInfoCardComponent } from '../history-info-card/history-info-card.component';
import HistoryModel from '../models/history.model';

@Component({
  selector: "app-profile-history-section",
  standalone: true,
  imports: [CommonModule, MaterialModule, ButtonComponent, MatCardActions, HistoryInfoCardComponent],
  templateUrl: "./profile-history-section.component.html",
  styleUrl: "./profile-history-section.component.scss",
})
export class ProfileHistorySectionComponent {
  @Input({ required: true })
  public history!: HistoryModel[];
}
