'use strict';

import * as testData from '../../testData/main';

export const BTN_LOGIN = 'button[name*="_login_login"]';
export const INPUT_EMAIL = '.username input';
export const INPUT_PASSWORD = '.password input';

export const DEFAULT_RETURNING_CUSTOMER = 'testuser1@demandware.com';

/**
 * Fill in login form
 */
export function loginAs (login, password) {
    // After several trials, 30000 yields the fewest number of test failures
    // involving this waitForVisible
    return browser.waitForVisible(INPUT_EMAIL, 30000)
        .setValue(INPUT_EMAIL, login)
        .setValue(INPUT_PASSWORD, password)
        .click(BTN_LOGIN);
}

/**
 * Fill in login form as default customer
 */
export function loginAsDefaultCustomer () {
    return loginAs(DEFAULT_RETURNING_CUSTOMER, testData.defaultPassword);

}
