'use strict';

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

var URLUtils = require('dw/web/URLUtils');

/**
 * Lv08. form/*xml 使う
 *
 */
function show() {
    app.getForm('level08').clear();
    app.getView({
        ContinueURL: URLUtils.https('Level08-Confirm')
    }).render('level08/show');
}

exports.Show = guard.ensure(['get'], show);

function confirm() {
    // サブミットされると、ベースバリデーションが実行される。
    // ベースバリデーションはフォームのxmlで定義されている
    var emailForm = app.getForm('level08.group01.email');
    app.getForm('level08').handleAction({
        confirm: function () {
            var isEmailValid = emailForm.object.validationResult.valid;
            var postEmail = emailForm.value();
            if (isEmailValid) {
                app.getView({
                    postEmail: postEmail
                }).render('level08/confirm');
            }
        },
        // エラーの場合は、表示するビューを指定するのみでよい
        // それで、エラーの場合のメッセージは自動で表示される
         error: function() {
            // app.getForm('level08.level08.email').invalidate();
            // これを実行すると別のxmlファイルのvalue-error属性に定義したエラーメッセージ設定がされる。
            app.getView().render('level08/show');
        }
    });
}
exports.Confirm = guard.ensure(['post'], confirm);
