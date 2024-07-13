const { test, expect } = require("@playwright/test");
const { loadTestData } = require("../lib/testParser");
const { LoginPage } = require("../pages/login.page");
const { SidenavPage } = require("../pages/sidenav.page");
const { ProjectPage } = require("../pages/project.page");
const { HomePage } = require("../pages/home.page");

const testCases = loadTestData(["name", "leftNav", "column", "card_title"]);

const asana = {
  url: "https://app.asana.com/-/login",
  email: process.env.ASANA_USER_EMAIL,
  password: process.env.ASANA_USER_PASSWORD,
};

test.describe("Asana Data-Driven Tests", () => {
  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      const loginPage = new LoginPage(page, asana);
      const sidenavPage = new SidenavPage(page, data);
      const projectPage = new ProjectPage(page, data);
      const homePage = new HomePage(page);

      await test.step("Login to Asana", async () => {
        // Login to Asana
        await loginPage.goto();
        await loginPage.login(() => homePage.waitForLoad());
        await expect(
          await homePage.isVisible(),
          "Home page is not visible"
        ).toEqual(true);
      });

      await test.step("Navigate to the project page", async () => {
        // Navigate to the project page
        await sidenavPage.navigateToProject();
        await expect(
          await projectPage.getProjectTitle(),
          "Project title does not match"
        ).toEqual(data.leftNav);
      });

      await test.step("Verify the card is within the right column", async () => {
        // Verify the card is within the right column
        await expect(
          await projectPage.isCardInColumn(data.column, data.card_title),
          `Card ${data.card_title} is not in column ${data.column}`
        ).toEqual(true);
      });
    });
  });
});
