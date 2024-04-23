import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dialog-title',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './dialog-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitleComponent {
  @Input({ required: true }) title: string;
  @Input({ required: false }) icon: string;
}
