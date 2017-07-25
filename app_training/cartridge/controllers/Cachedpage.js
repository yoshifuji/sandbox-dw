'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * CachedPage: isml に引数でパラメータ渡して pdict 経由で受け取る
 */
function show() {
    app.getView({
    }).render('cachedpage/test');
}
exports.Show = guard.ensure(['get'], show);
