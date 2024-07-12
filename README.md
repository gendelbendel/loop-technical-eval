# loop-technical-eval

## Installation

Simply:

```
npm i
```

## Setup

Locally:

- Create a `.env` file
- In that file, define these two variables and set them to your Asana login details:

```
ASANA_USER_EMAIL=
ASANA_USER_PASSWORD=
```

## Running

Simply:

```
npx playwright test
```

## Eval Instructions

### General Details

**Objective**: Write a data-driven test using Playwright by driving the test scenarios from a JSON object. We’ve provided you with the necessary shell; you simply need to write the Playwright code.

**Expected Length**: 1 Hour

**Submission Instructions**:
Please publish your code repo to a public GitHub repository. Post-completion, provide a write-up for the "client" detailing:

- **Challenges and Solutions**: Mention any obstacles encountered and your solutions.
- **Recommendations**: Offer any suggestions for either the tested features or the testing process.

Please email both the GitHub link & write-up document to **REDACTED@EMAIL**🙂

Feel free to respond on LinkedIn as well so we know to expect your evaluation!

### Acceptance Criteria

- Setup and Preparation:
  - Create a new project or workspace specifically for this task.
  - Ensure Playwright and the necessary dependencies are installed and set up.
- Login Automation:
  - Automate the login process to Asana using the provided credentials.
    - https://app.asana.com/-/login
    - Email: REDACTED
    - Password: REDACTED
  - The script should be capable of inputting the email address and password and submit the form successfully.
- Data-Driven Testing Using JSON:
  - Your tests should be driven from the testCases JSON object.
  - Implement a mechanism to read test case data from this JSON object to drive your tests.
  - Each test case will comprise of 3 `test.step`:
    - Navigation: Navigate to the correct `leftNav` item as mentioned in the JSON object.
    - Column Verification: Confirm that the specified `card_title` is present in the designated column.

### Expected Implementation Techniques

- Dynamic Locators:
  - The test dynamically generates locators based on the current test case's data, such as `data.leftNav`, `data.column`, and `data.card_title`. This demonstrates Playwright's flexibility in creating locators at runtime.
