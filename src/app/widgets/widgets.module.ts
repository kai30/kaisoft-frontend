/**
 * Created by qhyang on 2017/3/9.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { QuillModule } from "../vendors/quill.module";

import { MaterialModule } from "../material.module";

import { HeaderWidgetComponent } from "./header-widget.component";
import { CarouselWidgetComponent } from "./carousel-widget.component";
import { WeatherCardWidgetComponent } from "./weather-card-widget.component";
import { DrawingBoardWidgetComponent } from "./drawing-board-widget.component";
import { RichTextWidgetComponent } from "./rich-text-widget.component";
import { MoonOceanWidgetComponent } from "./moon-ocean-widget.component";
// import { WaterfallWidgetComponent } from "./waterfall-widget.component";
import { PlainWidgetComponent } from "./plain-widget.component";
import { SNSWidgetComponent } from "./sns-widget.component";

import { ThreeImageTransitionDirective } from "./three-image-transition.directive";
import { AnimatedWeatherCardDirective } from "./animated-weather-card.directive";
import { DrawingBoardDirective } from "./drawing-board.directive";
import { EmojiPanelDirective } from "../widgets/emoji-panel.directive";
// import { WaterfallDirective } from "./waterfall.directive";
import { AnimatedBackgroundDirective } from "./animated-background.directive";
import { RichTextDirective } from "./rich-text.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        QuillModule,
        MaterialModule
    ],
    declarations: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        RichTextWidgetComponent,
        MoonOceanWidgetComponent,
        SNSWidgetComponent,
        // WaterfallWidgetComponent,
        PlainWidgetComponent,
        ThreeImageTransitionDirective,
        AnimatedWeatherCardDirective,
        DrawingBoardDirective,
        EmojiPanelDirective,
        // WaterfallDirective,
        AnimatedBackgroundDirective,
        RichTextDirective
    ],
    entryComponents: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        RichTextWidgetComponent,
        MoonOceanWidgetComponent,
        // WaterfallWidgetComponent,
        PlainWidgetComponent,
        SNSWidgetComponent,
    ],
    exports: [
        HeaderWidgetComponent,
        CarouselWidgetComponent,
        WeatherCardWidgetComponent,
        DrawingBoardWidgetComponent,
        RichTextWidgetComponent,
        MoonOceanWidgetComponent,
        // WaterfallWidgetComponent,
        PlainWidgetComponent,
        SNSWidgetComponent
    ]
})
export class WidgetsModule { }