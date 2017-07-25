var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Level01
 * [isml:isset]
 */
function isSetWork() {
    app.getView().render('level01/isset_work');
}
exports.IsSetWork= guard.ensure(['get'], isSetWork);
