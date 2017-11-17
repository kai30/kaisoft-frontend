/**
 * Created by qhyang on 2017/4/11.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";
import { LoadingService } from "./loading.service";

@Directive({ selector: "[bsPageLoading]" })
export class PageLoadingDirective implements AfterViewInit {
    @Input("bsPageLoading") page: string;

    constructor(private el: ElementRef, private loadingService: LoadingService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            let jQuery = require("jquery"),
                imagesLoaded = require("imagesloaded");

            imagesLoaded.makeJQueryPlugin(jQuery);
            if (this.page === "earth") {
                jQuery("#parallax-scene .background")
                    .imagesLoaded(() => {
                        this.loadingService.increase(30);
                    });
                jQuery("#parallax-scene .background-front")
                    .imagesLoaded(() => {
                        this.loadingService.increase(30);
                    });
                jQuery(this.el.nativeElement)
                    .imagesLoaded(() => {
                        this.loadingService.finish();
                    });
            }
        }, 300);
    }
}