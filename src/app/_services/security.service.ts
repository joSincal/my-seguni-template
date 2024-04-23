import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  // Privates
  private readonly _urlSecurity = environment.urlSecurity;
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _menus: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}

  //----------------------------------------------------------------------
  // A C C E S S O R S
  //----------------------------------------------------------------------
  /**
   * User
   */
  get user$(): Observable<any> {
    return this._user.asObservable();
  }

  /**
   * Menus
   */
  get menus$(): Observable<any> {
    return this._menus.asObservable();
  }

  //----------------------------------------------------------------------
  // P U B L I C   M E T H O D S
  //----------------------------------------------------------------------

  /**
   * Get User Info
   */
  getUserInfo(): Observable<any> {
    const PARAMS = new HttpParams().set('include-photo', environment.photo);
    return this._http
      .get<any>(`${this._urlSecurity}user/me`, { params: PARAMS })
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        tap((resp) => this._user.next(resp?.data[0]))
      );
  }

  /**
   * Get Menus by User Role
   */
  getMenuTemplateService(): Observable<any> {
    return this._http
      .get<any>(
        `${this._urlSecurity}user/me/service/${
          environment.serviceId
        }${'/resources/type/3'}`
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        tap((resp) => this._menus.next(resp))
      );
  }
}
