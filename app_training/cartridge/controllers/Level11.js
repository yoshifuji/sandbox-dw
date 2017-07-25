'use strict';

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var NewsletterModel = require('~/cartridge/scripts/models/NewsletterModel');
var URLUtils = require('dw/web/URLUtils');

/**
 * Lv11. form/*xml 使う
 */
function show() {
    var email = request.httpParameterMap.email.stringValue;
    NewsletterModel.restoreInput(email, app.getForm('level11.Newsletter'));
    app.getView({
        ContinueURL: URLUtils.https('Level11-Register')
    }).render('level11/show');
}
exports.Show = guard.ensure(['get'], show);

function register() {
    // サブミットされると、ベースバリデーションが実行される。
    // ベースバリデーションはフォームのxmlで定義されている
    var newsletterForm = app.getForm('level11.Newsletter');
    var email = newsletterForm.get('email').value();
    app.getForm('level11').handleAction({
        register: function () {
            var newsletter = NewsletterModel.createNewsletterLv11(email, newsletterForm);
            if (newsletter) {
                app.getView({
                    newsletter: newsletter
                }).render('level11/complete');
            } else {
                newsletterForm.get('email').invalidate();
                app.getView().render('level11/show');
            }
        },
        error: function() {
            // エラーの場合は、表示するビューを指定するのみでよい
            // それで、エラーの場合のメッセージは自動で表示される
            app.getView().render('level11/show');
        }
    });
}
exports.Register = guard.ensure(['post'], register);
