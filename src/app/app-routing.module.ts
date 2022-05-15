import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnarComponent } from './cipher/columnar/columnar.component';
import { EccComponent } from './cipher/ecc/ecc.component';
import { MonoalphabeticComponent } from './cipher/monoalphabetic/monoalphabetic.component';
import { RsaComponent } from './cipher/rsa/rsa.component';
import { ShiftComponent } from './cipher/shift/shift.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"mono", component: MonoalphabeticComponent },
  { path:"shift", component: ShiftComponent },
  { path:"rsa", component: RsaComponent },
  // { path:"ecc", component: EccComponent },
  { path:"col", component: ColumnarComponent },
  // { path:"roll", component: MonoalphabeticComponent },
  // { path:"otp", component: MonoalphabeticComponent },
  { path:"**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
