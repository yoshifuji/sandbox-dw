'use strict';

/* Script Modules */
var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
//var SystemObjectMgr = require('dw/object/SystemObjectMgr');
var NewsletterModel = require('~/cartridge/scripts/models/PracticeNewsletterModel');

var URLUtils = require('dw/web/URLUtils');
var logger = dw.system.Logger.getLogger('practice');

/**
 * practice. form/*xml
 */
function show() {
    app.getForm('practice').clear();
    app.getView({
        ContinueURL: URLUtils.https('Practice-Confirm')
    }).render('practice/show');
}

exports.Show = guard.ensure(['get'], show);

function confirm() {
    var searchForm = app.getForm('practice.group01.search');
    app.getForm('practice').handleAction({
        confirm: function () {
            var isParamValid = searchForm.object.validationResult.valid;
            var postKeyword = searchForm.value();
            
            //var newsletters = getNewsletters();
            //logger.warn('[001]newsletters is '+ newsletters);

            var newsletter = getNewsletter(postKeyword);
            logger.warn('[001]newsletters is '+ newsletter);
            
            if (isParamValid) {
                app.getView({
                	postKeyword: postKeyword,
                	newsletter: newsletter
                }).render('practice/confirm');
            }
        },
         error: function() {
            // app.getForm('practice.practice.email').invalidate();
            app.getView().render('practice/show');
        }
    });
}
exports.Confirm = guard.ensure(['post'], confirm);

/*
 * retrieve ProductList data from SytemObject
 */
/*
function getProductList(searchKey) {
	//var productList = SystemObjectMgr.querySystemObjects('ProductList', 'ID = {0}', 'ID asc', searchKey);	
	var productList = SystemObjectMgr.getAllSystemObjects('ProductList');
		
	if (empty(productList)) {
        return null;
    } else {
        return {'productlist': productList, 'searchKey': searchKey};
    }
}
*/
/*
 * Retrieve NewsLetters data
 */
function getNewsletters() {
	var newsletters = NewsletterModel.getAllNewsletter();
	//logger.warn('[000]newsletters is '+ newsletters);
	logger.warn('[000]newsletters is '+ JSON.stringify(newsletters));
	
	return newsletters;
}

function getNewsletter(searchKeyword) {
	var newsletter = NewsletterModel.getNewsletter(searchKeyword);
	//logger.warn('[000]newsletters is '+ newsletters);
	logger.warn('[002]newsletters is '+ JSON.stringify(newsletter));
	
	return newsletter;
}

