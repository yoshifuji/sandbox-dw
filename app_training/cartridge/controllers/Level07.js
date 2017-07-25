var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
/**  
 * Level 07: 多言語化
 */ 
function helloWorld() {
    app.getView().render('level07/helloWorld');
} 
exports.HelloWorld = guard.ensure(['get'], helloWorld);
