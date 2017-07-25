/**
* Description of the Controller and the logic it provides
*
* @module  controllers/Level01
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
// var myFunction = function(){
//     return 'myFunction';
// }

/* Exports of the controller */
///**
// * @see {@link module:controllers/Level01~myFunction} */
//exports.MyFunction = myFunction;
'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Level 01: Hello World を表示する
 */
function helloWorld() {
    app.getView().render('level01/helloWorld');
}
exports.HelloWorld = guard.ensure(['get'], helloWorld);

/**
 * Level01
 * [isml:isset]
 */
function isSetWork() {
    app.getView().render('level01/isset_work');
}
exports.IsSetWork= guard.ensure(['get'], isSetWork);

/*
 * [isml:isinclude template]
 */
function isIncludeWork() {
    app.getView().render('level01/isinclude_work');
}
exports.IsIncludeWork = guard.ensure(['get'], isIncludeWork);


var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * [isml:iscomponent]
 */
function isComponentWork() {
    app.getView().render('level01/iscomponent_work');
}
exports.IsComponentWork = guard.ensure(['get'], isComponentWork);

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * [isml:isdecorate template]
 */
function isDecorateWork() {
    app.getView().render('level01/isdecorate_work');
}
exports.IsDecorateWork = guard.ensure(['get'], isDecorateWork);

