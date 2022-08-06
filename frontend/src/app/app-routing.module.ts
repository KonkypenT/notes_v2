import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTING_NAME } from './shared/consts/routing.const';
import { HomePage } from './home/home.page';
import { FriendsPage } from './home/friends/friends.page';
import { CheckFirstVisitGuard } from './shared/guards/check-first-visit.guard';
import { CheckProfileGuard } from './shared/guards/check-profile.guard';

const routes: Routes = [
  {
    path: ROUTING_NAME.permission,
    loadChildren: () =>
      import('./permission-screen/permission-screen.module').then((m) => m.PermissionScreenPageModule),
  },
  {
    path: ROUTING_NAME.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthPageModule),
    canActivate: [CheckFirstVisitGuard],
  },
  {
    path: '',
    redirectTo: `/${ROUTING_NAME.home}/${ROUTING_NAME.groupList}`,
    pathMatch: 'full',
  },
  {
    path: ROUTING_NAME.register,
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: ROUTING_NAME.home,
    component: HomePage,
    canActivate: [CheckFirstVisitGuard, CheckProfileGuard],
    children: [
      {
        path: ROUTING_NAME.groupList,
        loadChildren: () => import('./home/group-list/group-list.module').then((m) => m.GroupListPageModule),
      },
      {
        path: `${ROUTING_NAME.currentGroup}/:id`,
        loadChildren: () =>
          import('./home/group-list/current-group/current-group.module').then((m) => m.CurrentGroupPageModule),
      },
      {
        path: ROUTING_NAME.profile,
        loadChildren: () => import('./home/profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: ROUTING_NAME.friends,
        component: FriendsPage,
        children: [
          {
            path: ROUTING_NAME.myFriends,
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./home/friends/my-friends/my-friends.module').then((m) => m.MyFriendsPageModule),
              },
            ],
          },
          {
            path: ROUTING_NAME.myApplications,
            loadChildren: () =>
              import('./home/friends/my-applications/my-applications.module').then((m) => m.MyApplicationsPageModule),
          },
          {
            path: ROUTING_NAME.applicationsToMe,
            loadChildren: () =>
              import('./home/friends/applications-to-me/applications-to-me.module').then(
                (m) => m.ApplicationsToMePageModule,
              ),
          },
          {
            path: '',
            redirectTo: `/${ROUTING_NAME.home}/${ROUTING_NAME.friends}/${ROUTING_NAME.myFriends}`,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: `/${ROUTING_NAME.home}/${ROUTING_NAME.groupList}`,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
