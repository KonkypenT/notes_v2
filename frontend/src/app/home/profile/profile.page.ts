import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserState } from '../../shared/store/user/user.state';
import { ProfileFormModel } from '../../shared/models/profile-form.model';
import { UserService } from '../../shared/rest/user.rest';
import { catchError, filter, first, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ROUTING_NAME } from '../../shared/consts/routing.const';
import { UserModel } from '../../shared/models/user.model';
import { resetStore } from '../../shared/functions/reset-store.function';
import { CameraHelperService } from 'src/app/shared/services/camera-helper.service';
import { SetUser, UpdateUserPhoto } from '../../shared/store/user/user.action';
import { ActionCameraType } from '../../shared/enums/action-camera.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  public form = new FormGroup<ProfileFormModel>({
    id: new FormControl<number>(null),
    username: new FormControl<string>({ value: '', disabled: true }, [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>({ value: '', disabled: true }, [Validators.required]),
  });

  public error = '';

  public currentUser: Observable<UserModel> = this.store.select(UserState.getUser);

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private userService: UserService,
    private navCtrl: NavController,
    private cameraHelperService: CameraHelperService,
  ) {}

  public ngOnInit(): void {
    this.subscribeOnCurrentUser();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public save(): void {
    this.error = '';
    this.userService
      .edit(this.form.value)
      .pipe(
        first(),
        catchError((error) => {
          this.error = error.error.message;
          return of(error);
        }),
        filter((result) => !result?.error),
      )
      .subscribe((result) => this.form.patchValue(result));
  }

  public logout(): void {
    this.navCtrl.navigateRoot(ROUTING_NAME.auth).then();
    resetStore(this.store);
    localStorage.setItem('jwt', null);
  }

  public async showActionSheet(): Promise<void> {
    const currentUser = this.store.selectSnapshot(UserState.getUser);
    const result = await this.cameraHelperService.showActionSheet(currentUser.photo);

    if ((result.role === ActionCameraType.Camera || ActionCameraType.Gallery) && result?.data?.dataUrl) {
      this.store.dispatch(new UpdateUserPhoto(result.data.dataUrl));
      const blob = await fetch(result?.data?.dataUrl).then((res) => res.blob());
      this.userService.setPhoto(blob).pipe(first()).subscribe();
    }

    if (result.role === ActionCameraType.Destructive) {
      this.store.dispatch(new UpdateUserPhoto(null));
      this.userService
        .deletePhoto()
        .pipe(first())
        .subscribe((result) => {
          this.store.dispatch(new SetUser(result));
        });
    }
  }

  private subscribeOnCurrentUser(): void {
    this.currentUser.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => this.form.patchValue(user));
  }
}
