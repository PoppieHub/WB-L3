import {View} from "../../utils/view";
import {ViewTemplate} from "../../utils/viewTemplate";
import html from "./suggestions.tpl.html";

export class Suggestions{
    params: string;
    view: View;

    constructor( params: string) {
        this.params = params;
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render() {
        this.view.root.setAttribute('href', `/catalog`);
        this.view.root.innerText = this.params;
    }
}