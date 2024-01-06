import { ViewTemplate } from "../../utils/viewTemplate";
import html from "./searchSuggestions.tpl.html";
import { View } from "../../utils/view";
import suggestions from "../../utils/suggestions.json"
import { getRandom } from "../../utils/helpers";
import { Suggestions } from "../suggestions/suggestions";

type ProductComponentParams = { [key: string]: any };

export class SearchSuggestions {
    params: ProductComponentParams;
    view: View;
    suggestions: string[];
    currentSuggestions: string[];

    constructor(params: ProductComponentParams = {}) {
        this.params = params;
        this.view = new ViewTemplate(html).cloneView();
        this.suggestions = suggestions;
        this.currentSuggestions = [];
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    getSuggestions() {
        this.currentSuggestions =  getRandom(this.suggestions, 3);
    }

    render() {
        this.getSuggestions();

        this.currentSuggestions.forEach((suggestions, index)=> {
            const SuggestionsComp = new Suggestions(suggestions);
            const asd = `searchSuggestions_${++index}`;
            SuggestionsComp.render();
            SuggestionsComp.attach(this.view[asd]);
        })
    }
}

export const SearchSuggestionsComp = new SearchSuggestions(html);
