/**
 * Created by qhyang on 2017/9/15.
 */

import { Subscription } from "rxjs";
import { Directive, ElementRef, AfterViewInit, OnDestroy, EventEmitter, Input, Output } from "@angular/core";

import { BomService } from "../bom.service";

const jQuery = require("jquery"),
    $container = jQuery(`
    <div style="position: fixed; z-index: 1000; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%;"></div>
`);

@Directive({ selector: "[color-picker]" })
export class ColorPickerDirective implements AfterViewInit, OnDestroy {
    @Input("color-picker") color: string | null;
    @Output() onPicked = new EventEmitter<string>();
    subscriptions: Subscription[] = [];

    constructor(private el: ElementRef, private bomService: BomService) { }

    ngAfterViewInit() {
        const $overlay = jQuery(`
                <div id="hslPicker" style="display: none; position: absolute; width: 410px; pointer-events: auto; z-index: 1000; box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);"></div>
            `),
            $el = jQuery(this.el.nativeElement);

        $container.append($overlay)
            .appendTo(document.body);

        const updateOverlayPosition = () => {
            const offset = $el.offset();

            $overlay.offset({
                top: offset.top + 60,
                left: offset.left + $el.width() - 380
            });
        };

        this.subscriptions.push(this.bomService.onWindowResize().subscribe(() => {
            updateOverlayPosition();
        }));

        require("colorjoe/css/colorjoe");

        const colorjoe = require("colorjoe");

        setTimeout(() => {
            const joe = colorjoe.hsl($overlay.get(0), this.color || "hsla(1, 1, 1, 0.54)", [
                "alpha",
                "currentColor",
                ["fields", {space: "HSLA", limit: 100}],
                "hex",
                "close"
            ]);

            joe.on("done", (color: any) => {
                this.onPicked.emit(color.cssa());
            });
        }, 200);

        const $switch = $el.find(".color-picker__switch"),
            $picker = jQuery("#hslPicker");

        $switch.bind("click", () => {
            if ($picker.css("display") === "none") {
                $picker.css("display", "block");
                updateOverlayPosition();
            } else {
                $picker.css("display", "none");
            }
        });
        $el.bind("click", (e: any) => {
            e.stopPropagation()
        });
        this.subscriptions.push(this.bomService.onDocumentClick().subscribe(() => {
            $picker.css("display", "none");
        }));

        $el.find("input").first().bind("click", () => {
            $picker.css("display", "block");
            updateOverlayPosition();
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        $container.remove();
    }
}
