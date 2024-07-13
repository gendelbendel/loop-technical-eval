const { expect } = require("@playwright/test");

exports.SidenavPage = class SidenavPage {
  /**
   * Page used for the sidenav navigation
   * @param {import('@playwright/test').Page} page
   * @param {object} data relevant test data
   */
  constructor(page, data) {
    this.page = page;

    this.leftNav = data.leftNav;

    this.projectsList = page.locator(
      ".SidebarProjectsSectionProjectList-projects"
    );
    this.projectChoiceItem = this.projectsList.getByRole("link", {
      name: this.leftNav,
    });
  }

  /**
   * Clicks on the Project in the sidebar if found
   */
  async navigateToProject() {
    await this.projectChoiceItem.click();
  }
};
