import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { LocalizacaoComponent } from './pages/localizacao/localizacao.component';
import {FornecedoresComponent} from "./pages/fornecedores/fornecedores.component";
import {ProdutosComponent} from "./pages/produtos/produtos.component";
import {NotasComponent} from "./pages/notas/notas.component";
import {ItensNotaComponent} from "./pages/itens-nota/itens-nota.component";

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'localizacao',
    component: LocalizacaoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'fornecedores',
    component: FornecedoresComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'notas',
    component: NotasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'itensNota',
    component: ItensNotaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
  ]
})
export class AppRoutingModule { }
