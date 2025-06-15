import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { ILike } from '../like.model';

@Component({
  selector: 'jhi-like-detail',
  templateUrl: './like-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class LikeDetailComponent {
  like = input<ILike | null>(null);

  previousState(): void {
    window.history.back();
  }
}
