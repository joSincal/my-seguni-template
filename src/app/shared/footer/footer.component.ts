import { Component } from '@angular/core';

@Component({
  selector: 'footer-cmp',
  standalone: true,
  templateUrl: 'footer.component.html',
})
export class FooterComponent {
  test: Date = new Date();
}
