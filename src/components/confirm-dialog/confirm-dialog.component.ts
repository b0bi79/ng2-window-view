import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WindowViewContainerComponent,
         WindowViewHasResult } from '../../';

@Component({
  selector: 'confirm-dialog',
  template: `
  <window-view-container [heading]="title"
                         [size]="size"
                         (close)="onClose()">

    <div class="confirm-dialog-content">
      {{ content }}
      <ng-content></ng-content>
    </div>

    <div panel-footer class="confirm-dialog-button-set">
      <button class="btn btn-primary" (click)="confirm()">
        {{ confirmString }}
      </button>

      <button class="btn btn-default" (click)="deny()">
        {{ denyString }}
      </button>
    </div>

  </window-view-container>
  `,
  styles: [`
  .confirm-dialog-content {
    margin: 12px;
  }
  .confirm-dialog-button-set {
    margin: 0 auto;
    text-align: center;
  }
  `]
})
export class ConfirmDialogComponent implements WindowViewHasResult<boolean> {
  @Input()
  title: string = 'Confirm';

  @Input()
  confirmString: string = 'Ok';

  @Input()
  denyString: string = 'Cancel';

  @Input()
  content: string;

  @Input()
  size: string = 's';

  @Output()
  result: EventEmitter<any> = new EventEmitter();

  @Output()
  dismiss: EventEmitter<any> = new EventEmitter();

  @ViewChild(WindowViewContainerComponent)
  windowViewContainer: WindowViewContainerComponent;

  private _result$: Subject<boolean> = new Subject();

  get result$(): Observable<boolean> { return this._result$.asObservable(); }

  confirm() {
    this._result$.next(true);
    this._result$.complete();
    this.result.emit({ target: this, result: true });
  }

  deny() {
    this._result$.next(false);
    this._result$.complete();
    this.result.emit({ target: this, result: false });
  }

  public onClose() {
    this._result$.complete();
    this.dismiss.emit({ target: this });
  }
}