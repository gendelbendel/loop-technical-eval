const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  /**
   * Page used for the Home page, which is default load
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.header = page.getByRole("heading", { name: "Home", level: 1 });
  }

  async isVisible() {
    return await this.header.isVisible();
  }

  async waitForLoad() {
    await this.header.waitFor();
  }
};
