'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

// 同じカードリッジ内のモジュールをロード
var NameGetter = require('~/cartridge/scripts/level03/NameGetter');

/**
 * Level 03: 関数を外部に切り出し
 */
function test() {
    app.getView({
        Name: NameGetter.getName("あいう")
    }).render('level02/test'); //Level 02 と同じ
}

exports.Test = guard.ensure(['get'], test);
