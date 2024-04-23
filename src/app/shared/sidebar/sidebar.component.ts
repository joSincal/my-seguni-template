import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  type OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SecurityService } from '@services/security.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          display: 'none',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          display: 'block',
        })
      ),
      transition('collapsed => expanded', animate('300ms ease-out')),
      transition('expanded => collapsed', animate('300ms ease-in')),
    ]),
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  // Public
  public menus = signal<any[]>([]);
  public user = signal<any>(null);

  public menuExpanded: number = 0;

  /**
   * Constructor
   */
  constructor(
    private _securityService: SecurityService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * On Init
   */
  ngOnInit(): void {
    // Subscribe to user changes
    this._securityService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp: any) => {
        this.user.set(resp);
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to menus changes
    this._securityService.menus$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((resp: any) => {
        this._buildMenus(resp);
        this._changeDetectorRef.markForCheck();
      });
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
   * Build Menus
   */
  private _buildMenus(res: any): void {
    if (res.data) {
      this.menus.set(this._getUniqueMenu(res.data, 'route'));
      this.menus.update((menus) => this._sortMenus(menus));
    }
  }

  /**
   * Get Unique Menu
   */
  private _getUniqueMenu(arr: any[], comp: any): any {
    let unique = arr
      .map((e: any) => e[comp])
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);

    return unique;
  }

  /**
   * Sort Menus
   */
  private _sortMenus(arr: any[]): any[] {
    return arr.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }
}
