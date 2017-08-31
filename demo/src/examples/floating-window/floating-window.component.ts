import { Component, ViewChild } from '@angular/core';
import { WindowViewContainerComponent,
         WindowViewService } from '../../../../src';

@Component({
  selector: 'app-floating-window',
  templateUrl: './floating-window.component.html'
})
export class FloatingWindowComponent {

  title: string;

  /**
   * Following setting are necessary.
   * 
   * 1. If enable `floating` and provide `WindowViewLayerService`,
   *    `WindowViewContainerComponent` will auto hide it's container.
   *    Without container, user can touch anything under that window view.
   * 
   * 2. Click on background of `WindowViewContainerComponent` will trigger
   *    close event. For multi-floating-window case, we have to disable it.
   */
  floating: boolean = true;

  showBackground: boolean = false;

  @ViewChild(WindowViewContainerComponent)
  windowViewContainer: WindowViewContainerComponent;

  constructor(private windowView: WindowViewService) {
    this.title = `Floating Window ${windowView.length}`;
  }

  /**
   * Passby property position for setup
   */
  get position(): { x: number, y: number } { return this.windowViewContainer.position; }

  set position(value: { x: number, y: number }) { this.windowViewContainer.position = value; }

  closeWindow() {
    /**
     * Because order of closing window no longer stable.
     * We have remove window with specific target.
     */
    this.windowView.removeByInstance(this);
  }
}
