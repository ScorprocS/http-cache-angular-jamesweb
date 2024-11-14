import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { JamesWebbApiService, ProgramPartDetail } from '../services/james-webb-api.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [
    CommonModule,MatPaginatorModule
  ],
  template: `<h1>program-detail {{id()}}</h1>

@for(d of programDetails();track d.id){
  <div>
    <h1>{{d.id}}</h1>
    <p>{{d.details.description}}</p>
    @if(d.file_type==='jpg'){
      <img [src]="d.location"/>
    }

</div>

}
<mat-paginator [length]="100"
              [pageSize]="10"
              [pageSizeOptions]="[10]"
              [pageIndex]="pageNumber()"
              (page)="pageEvent($event)"></mat-paginator>
  `,
  styleUrl: './program-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramDetailComponent { 
  readonly #jamesWebbApiService = inject(JamesWebbApiService);
  id = input.required<string>();
  programDetails = signal<ProgramPartDetail[]>([]);
  pageNumber = signal<number>(1);
/*  programDetails = toSignal(this.#jamesWebbApiService.getProgramById(this.id()),{initialValue:[]});*/
  constructor(){
    effect(()=>{
      //this.programDetails =  toSignal(this.#jamesWebbApiService.getProgramById(this.id()),{initialValue:[]});
      this.#jamesWebbApiService.getProgramById(this.id(),this.pageNumber()).subscribe((res)=>this.programDetails.set(res))
    })
  }
  
 
  
  /* programDetails = computed(()=>{
    return  toSignal(this.#jamesWebbApiService.getProgramById(this.id()));
  });*/
   
  pageEvent(event:PageEvent):void{
    //this.pageSize.set(event.pageSize);
    this.pageNumber.set(event.pageIndex);
  }
}
