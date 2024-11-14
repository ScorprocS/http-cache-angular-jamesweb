import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { JamesWebbApiService, ProgramPartDetail } from '../services/james-webb-api.service';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-program-image',
  standalone: true,
  imports: [
    CommonModule,MatCard,MatCardTitle,MatCardContent,MatPaginatorModule
  ],
  template: `<h1>All Program images</h1>
<div style="display:flex;flex-direction: column;gap:10px">
  @for(details of programDetails(); track details.id){
    <mat-card>
      <mat-card-title>{{details.id}}</mat-card-title>
      <mat-card-content>
        <img [src]="details.location" [alt]="details.id"/>
      </mat-card-content>
    </mat-card>
  }
</div>
  <mat-paginator [length]="100"
              [pageSize]="pageSize()"
              [pageSizeOptions]="[10]"
              [pageIndex]="pageNumber()"
              (page)="pageEvent($event)"></mat-paginator>
  
  
  `,
  styleUrl: './program-image.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramImageComponent {
  readonly #jamesWebbApiService = inject(JamesWebbApiService);
  programDetails = signal<ProgramPartDetail[]>([]);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);

  constructor(){
    effect(()=>{
      this.#jamesWebbApiService.getAllByFileType('jpg',this.pageNumber(),this.pageSize()).subscribe((res)=>this.programDetails.set(res))
    })
  }

  pageEvent(event:PageEvent):void{
    //this.pageSize.set(event.pageSize);
    this.pageNumber.set(event.pageIndex);

  }

 }
