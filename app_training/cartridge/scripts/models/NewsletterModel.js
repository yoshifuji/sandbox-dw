'use strict';

var AbstractModel = require('app_storefront_controllers/cartridge/scripts/models/AbstractModel');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

var NewsletterModel = AbstractModel.extend({
    getCompleteMessage: function () {
        return this.object.custom.lastName + " " +
               this.object.custom.firstName +" さんのメアド " +
               this.object.custom.email + " を登録しました。";
    }
});

/**
* Email が登録済みかチェックする
*
* @param {String} email
* @returns {Boolean} 存在するなら true
*/
NewsletterModel.existsByEmail = function (email) {
    var newsletter = CustomObjectMgr.getCustomObject("Newsletter", email);
    if (newsletter) {
        return true;
    } else {
        return false;
    }
};

/**
* @param {String} email
* @returns {NewsletterModel|null}
*/
NewsletterModel.getNewsletter = function (email) {
    var newsletter = CustomObjectMgr.getCustomObject("Newsletter", email);
    if (newsletter) {
        return new NewsletterModel(newsletter);
    } else {
        return null;
    }
};

/**
 * @param {String} email
 * @param {String} firstName
 * @param {String} lastName
 * @returns {NewsletterModel|null} emailが重複してたらエラーになる
 */
NewsletterModel.createNewsletter = function (email, firstName, lastName) {
    try {
        var newsletter = null;
        Transaction.wrap(function () {
            newsletter = CustomObjectMgr.createCustomObject("Newsletter", email);
            newsletter.custom.email = email;
            newsletter.custom.firstName = firstName;
            newsletter.custom.lastName = lastName;
        });
        return new NewsletterModel(newsletter);
    } catch (e) {
        //重複したらエラーになる
        return null;
    }
};

/**
 * @param {String} email
 * @param {Objcet} form
 * @returns {NewsletterFormModel|false} 
 */
NewsletterModel.createNewsletterLv11 = function (email, form) {
    Transaction.begin();
    var newsletter;
    try {
        newsletter = CustomObjectMgr.createCustomObject("Newsletter", email);
    } catch (e) {
        //重複したらエラーになる
        Transaction.rollback();
        form.get('email').invalidate();
        return false;
    }
    if (!form.copyTo(newsletter)) {
        Transaction.rollback();
        form.invalidate();
        var _obj = {custom:{}};
        form.copyTo(_obj);
        logger.warn('form.copyTo(newsletter) fail :' + JSON.stringify(_obj));
        return false;
    }
    Transaction.commit();
    return new NewsletterModel(newsletter);
};

/**
 * @param {String} email
 * @param {Objcet} form
*/
NewsletterModel.restoreInput = function (email, form) {
    if (email) {
        var newsletter = NewsletterModel.getNewsletter(email);
        if (newsletter) {
            form.copyFrom(newsletter.object);
            return;
        }
    }
    form.clear();
}

module.exports = NewsletterModel;
