import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "yo",
})

export class YoPipe implements PipeTransform {

    public transform(year: number) {
        console.log(year);
        const today = new Date();
        const yearNow = today.getFullYear();

        return `${year} (${yearNow - year} years old)`;
    }

}
