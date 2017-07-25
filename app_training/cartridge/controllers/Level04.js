'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Level 04: GETパラメータを表示
 */
function show() {
    // 参考:
    //   request は Request クラス
    //   httpParameterMap.name は HttpParameter クラス
    var name = request.httpParameterMap.name.stringValue;

    app.getView({
        Name: name
    }).render('level02/test'); //Level 02 と同じ
}
exports.Show = guard.ensure(['get'], show);
