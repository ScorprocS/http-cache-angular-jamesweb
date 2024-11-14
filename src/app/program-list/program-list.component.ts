import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamesWebbApiService } from '../services/james-webb-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  template: `<h1>View program list</h1>
  <div style="display:flex;flex-direction:row;gap:10px">
    @for(program of programList(); track program.program){
      <div>
        <h2>{{program.program}}</h2>
        <button [routerLink]="['/programs',program.program]">View program</button>
    </div>
    }
  </div>
  
  `,
  styleUrl: './program-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramListComponent {

  readonly #jamesWebbApiService = inject(JamesWebbApiService);

  programList = toSignal(this.#jamesWebbApiService.getAllProgram());
 }
