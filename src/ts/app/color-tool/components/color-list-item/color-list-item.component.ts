import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Color } from "../../models/colors";

@Component( {
    selector: "li[color-list-item]",
    template: require( "./color-list-item.component.html" ),
    styles  : [ require( "./color-list-item.component.scss" ) ],
} )
export class ColorListItemComponent {
    @Input()
    public color: Color;

    @Output()
    public onDeleteColor = new EventEmitter<number>();

    public deleteColor(colorId: number) {
        this.onDeleteColor.emit(colorId);
    }
}
