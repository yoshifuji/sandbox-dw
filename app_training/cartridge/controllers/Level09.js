'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var logger = dw.system.Logger.getLogger('hello');
var name = request.httpParameterMap.name.stringValue;

/**
 * Level 09: カスタムログの表示
 */
function helloWorld() {
    app.getView().render('level01/helloWorld');
    logger.debug('name is '+ name);
    if (name == "") {
        logger.warn('name is empty');
    }
}
exports.HelloWorld = guard.ensure(['get'], helloWorld);
