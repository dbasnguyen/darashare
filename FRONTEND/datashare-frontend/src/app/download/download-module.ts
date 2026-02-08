import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Download } from './download/download';

const routes: Routes = [
  { path: '', component: Download }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule {}
