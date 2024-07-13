const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  /**
   * Page used for the login screen of Asana
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, data) {
    this.page = page;

    this.url = data.url;
    this.credsEmail = data.email;
    this.credsPassword = data.password;

    this.emailField = page.locator("input[name=e]");
    this.loginContinueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
    this.passwordField = page.locator("input[name=p]");
    this.loginButton = page.getByRole("button", {
      name: "Log in",
      exact: true,
    });
  }

  /**
   * Navigates to the url provided
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Attempts to login to Asana
   *
   * Note: When running en-masse in parallel, you may hit recaptcha errors
   * @param {Function} [waitFor] an optional function to run, if you wish
   *  to wait for a condition after logging in
   */
  async login(waitFor) {
    await this.emailField.fill(this.credsEmail);
    await this.loginContinueButton.click();
    await this.passwordField.fill(this.credsPassword);
    await this.loginButton.click();
    if (waitFor) {
      await waitFor();
    }
  }
};
