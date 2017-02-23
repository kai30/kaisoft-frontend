/**
 * Created by qhyang on 2017/2/17.
 */

import {Component, OnInit} from "@angular/core";

@Component({
    selector: "crystal-nav",
    template: `<!--Created by qhyang on 2017/2/21.

--><nav><ul class="ripple"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Services</a></li><li><a href="#">Contact</a></li></ul></nav>`,
    styles: [window../crystal-nav.component.scss]
})
export class CrystalNavComponent implements OnInit {
    ngOnInit() {
        let jquery = window.jquery;
        window.jquery.ripples;
        jquery(".ripple").ripples();
    }
}