import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IReel } from '../reel.model';

@Component({
  selector: 'jhi-reel-detail',
  templateUrl: './reel-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class ReelDetailComponent {
  reel = input<IReel | null>(null);

  previousState(): void {
    window.history.back();
  }
}
