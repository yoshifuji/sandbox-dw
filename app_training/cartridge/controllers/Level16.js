'use strict';

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

var URLUtils = require('dw/web/URLUtils');

/**
 * Lv16. Tokenの検証
 */
function show() {
	// token有り/無し検証用変数（デバッグ用コード）
	var needsToken = (request.httpParameterMap.nonetoken.stringValue != 1);
	app.getForm('level16').clear();
	app.getView({
		ContinueURL : URLUtils.https('Level16-Confirm'),
		needsToken : needsToken
	// デバッグ用コード
	}).render('level16/show');
}

exports.Show = guard.ensure([ 'get' ], show);

function confirm() {
	// サブミットされると、ベースバリデーションが実行される。
	// ベースバリデーションはフォームのxmlで定義されている
	var emailForm = app.getForm('level16.group01.email');
	app.getForm('level16').handleAction({
		confirm : function() {
			var isEmailValid = emailForm.object.validationResult.valid;
			var postEmail = emailForm.value();

			// token検証（CSRF対策用コード）
			var CSRFProtection = require('dw/web/CSRFProtection');
			if (!CSRFProtection.validateRequest()) {
				//app.getModel('Customer').logout();
				app.getView().render('csrf/csrffailed');
				return null;
			}

			if (isEmailValid) {
				app.getView({
					postEmail : postEmail
				}).render('level16/confirm');
			}
		},
		// エラーの場合は、表示するビューを指定するのみでよい
		// それで、エラーの場合のメッセージは自動で表示される
		error : function() {
			app.getView().render('level16/show');
		}
	});
}
exports.Confirm = guard.ensure([ 'post' ], confirm);
