'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Level 02: isml に引数でパラメータ渡して pdict 経由で受け取る
 */
function show() {
    var name = "あいう";

    app.getView({
        Name: name
    }).render('level02/test');
}
exports.Show = guard.ensure(['get'], show);
