import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:()=>import('./program-list/program-list.component').then(m=>m.ProgramListComponent)
    },
    {
        path:'programs/:id',
        loadComponent:()=>import('./program-detail/program-detail.component').then(m=>m.ProgramDetailComponent)
    },
    {
        path:'images',
        loadComponent:()=>import('./program-image/program-image.component').then(m=>m.ProgramImageComponent)
    },
];
