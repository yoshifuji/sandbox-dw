'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Level 06: コンテンツスロットを表示する
 */
function helloWorld() {
    app.getView().render('level06/helloWorld');
}
exports.HelloWorld = guard.ensure(['get'], helloWorld);
