import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dialog-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './dialog-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogActionsComponent {
  @Input({ required: true }) text: string;
}
