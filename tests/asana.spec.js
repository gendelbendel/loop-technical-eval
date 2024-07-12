const { test, expect } = require("@playwright/test");
const { loadTestData } = require("../lib/testParser");

const testCases = loadTestData(["name", "leftNav", "column", "card_title"]);

const asana = {
  url: "https://app.asana.com/-/login",
  email: process.env.ASANA_USER_EMAIL,
  password: process.env.ASANA_USER_PASSWORD,
};

test.describe("Asana Data-Driven Tests", () => {
  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      await test.step("Login to Asana", async () => {
        // Login to Asana
      });

      await test.step("Navigate to the project page", async () => {
        // Navigate to the project page
      });

      await test.step("Verify the card is within the right column", async () => {
        // Verify the card is within the right column
      });
    });
  });
});
