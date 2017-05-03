import {Component, Input} from "@angular/core";

@Component({
    selector: "th[headerCol]",
    template: `
{{colName}}
                        <span *ngIf="isColSorted">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
`,
})
export class CarTableHeaderColComponent {
    @Input('headerCol') // reuse and assign value to this attribute
    public colName: string;

    @Input()
    public isColSorted: boolean;

    @Input()
    public sortOrder: number;
}
