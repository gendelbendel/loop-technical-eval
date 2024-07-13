const { expect } = require("@playwright/test");

exports.ProjectPage = class ProjectPage {
  /**
   * Page used when on an individual Project's page
   * @param {import('@playwright/test').Page} page page from test spec
   */
  constructor(page) {
    this.page = page;

    this.projectTitleText = page.locator(
      ".ProjectPageHeaderProjectTitle-shadow"
    );
  }

  /**
   *
   * @returns the Project's title as shown at the top
   */
  async getProjectTitle() {
    return await this.projectTitleText.textContent();
  }

  /**
   * Checks to see if the specified card is under the specified column
   * @param {string} column the column name to search
   * @param {string} cardTitle the card title searching for
   * @returns {boolean} whether the card is under the specified column
   */
  async isCardInColumn(column, cardTitle) {
    const columnLocator = this.page.locator(".BoardColumn").filter({
      has: this.page.getByRole("heading", { level: 3, name: column }),
    });
    const cardLocator = columnLocator
      .locator(".BoardCardLayout")
      .filter({ hasText: cardTitle });

    await cardLocator.scrollIntoViewIfNeeded();
    return await cardLocator.isVisible();
  }
};
