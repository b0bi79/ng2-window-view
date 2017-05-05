import { Type, ComponentFactory } from '@angular/core';
export declare class WindowViewComponentCache extends Map<Type<any>, ComponentFactory<any>> {
    private static instance;
    private static isCreating;
    constructor();
    static getInstance(): WindowViewComponentCache;
}
