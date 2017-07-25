'use strict';

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var NewsletterModel = require('~/cartridge/scripts/models/NewsletterModel');

function register() {
    // パラメータからメールアドレスを取得
    var email = request.httpParameterMap.email.stringValue;
    // メールアドレスを検索
    var exists = NewsletterModel.existsByEmail(email);
    // 登録実行
    var newsletter = NewsletterModel.createNewsletter(email, "苗字A", "名前A");
    if (newsletter === null) {
        newsletter = NewsletterModel.getNewsletter(email);
    }
    
    // テンプレへ値を渡す
    app.getView({
        exists: exists,
        newsletter: newsletter
    }).render('level10/newsletterregister');
}
exports.Register = guard.ensure(['get'], register);
