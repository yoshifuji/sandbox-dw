'use strict';

import * as accountPage from './account';
import * as formLogin from './helpers/forms/login';

export const USER_INFO_ICON = '.user-info i';
export const LINK_LOGIN = '.user-links a[href*="account"]';
export const BTN_LOGOUT = 'a.user-logout';
export const REFINEMENT = '.breadcrumb-refinement';
const userPanel = '.user-panel';

export function login (locale) {
    return browser.waitForVisible(USER_INFO_ICON)
        .click(USER_INFO_ICON)
        .waitForVisible(LINK_LOGIN)
        .click(LINK_LOGIN)
        .then(() => formLogin.loginAsDefaultCustomer(locale))
        .then(() => browser.waitForVisible(accountPage.LOGOUT));
}

export function logout () {
    return browser.waitForVisible(USER_INFO_ICON)
        .click(USER_INFO_ICON)
        .waitForVisible(userPanel)
        .click(BTN_LOGOUT)
        .waitForVisible(accountPage.BTN_LOGIN);
}
