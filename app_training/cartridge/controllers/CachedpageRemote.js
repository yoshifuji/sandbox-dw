'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * CachedPage: isml に引数でパラメータ渡して pdict 経由で受け取る
 */
function show() {
	var t = new Date();
	
    app.getView({
    	TimeRemote: t
    }).render('cachedpage/test_remote');
}
exports.Show = guard.ensure(['get'], show);
