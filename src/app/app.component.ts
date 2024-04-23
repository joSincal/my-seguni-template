import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecurityService } from '@services/security.service';
import { Subject, finalize, forkJoin } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BreadcrumbService } from 'xng-breadcrumb';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    NgxSpinnerModule,
    RouterOutlet,
    SidebarComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  // Public
  public loading: boolean = true;
  /**
   * Constructor
   */
  constructor(
    private _securityService: SecurityService,
    private _breadcrumbService: BreadcrumbService
  ) {}

  /**
   * On Init
   */
  ngOnInit() {
    this._getUserInfoAndMenus();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  //----------------------------------------------------------------------
  // P R I V A T E   M E T H O D S
  //----------------------------------------------------------------------

  /**
   * Get User Info
   */
  private _getUserInfoAndMenus(): void {
    forkJoin({
      user: this._securityService.getUserInfo(),
      menus: this._securityService.getMenuTemplateService(),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe();
  }
}
