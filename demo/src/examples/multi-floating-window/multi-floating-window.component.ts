import { Component, ComponentRef } from '@angular/core';
import { WindowViewService,
         WindowViewLayerService } from '../../../../src';
import { FloatingWindowComponent } from '../floating-window/floating-window.component';

@Component({
  selector: 'app-multi-floating-window',
  templateUrl: 'multi-floating-window.component.html',
  providers: [
    WindowViewService,
    WindowViewLayerService
  ]
})
export class MultiFloatingWindowComponent {

  constructor(private windowView: WindowViewService) {}

  openWindow() {
    this.windowView.pushBareDynamicWindow(FloatingWindowComponent).then( simpleWindow => {
      let lastWindow: FloatingWindowComponent = this.windowView.getInstanceAt(this.windowView.length - 2);
      if (lastWindow) {
        let position: { x: number, y: number } = lastWindow.position;
        position.x += 400;
        simpleWindow.position = position;
      }
    });
  }

}
