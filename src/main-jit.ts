/**
 * Created by qhyang on 2017/2/13.
 */

import "reflect-metadata";
import "zone.js";
import "hammerjs";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { getTranslationProviders } from "./app/i18n-providers";
import { AppModule } from "./app/app.module";

import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
    enableProdMode();
}

// Detect user language
if (!sessionStorage.getItem("locale")) {
    sessionStorage.setItem("locale", window.navigator.language || "en-US");
}

getTranslationProviders().then((providers: any) => {
    const options = { providers };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
});
