/**
 * Test Case: Customer registration
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Open the registration page from My Account
 * 2) Enter unique customer details and accept the Privacy Policy
 * 3) Submit the form and verify account creation and authenticated navigation
 */

import { test, expect } from "../../fixtures/pageFixtures";
import { RandomDataUtil } from "../../utils/dataGenerator";

test("Customer registration flow @master @sanity @regression @web", async ({
  homePage,
  registerPage,
}) => {
  const registrationData = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: RandomDataUtil.getUniqueEmail(),
    telephone: RandomDataUtil.getPhoneNumber(),
    password: RandomDataUtil.getPassword(),
  };

  await test.step("1) Navigate to My Account → Register", async () => {
    await homePage.clickMyAccount();
    await homePage.clickRegister();
  });

  await test.step("2) Verify the registration page is displayed", async () => {
    await expect.poll(() => registerPage.isRegisterPageExists()).toBe(true);
  });

  await test.step("3) Enter unique customer details", async () => {
    await registerPage.fillRegistrationForm(registrationData);
  });

  await test.step("4) Accept the Privacy Policy", async () => {
    await registerPage.acceptPrivacyPolicy();
  });

  await test.step("5) Submit registration and verify account creation", async () => {
    await registerPage.submitRegistration();
    await expect.poll(() => registerPage.isAccountCreatedConfirmationExists()).toBe(true);
  });

  await test.step("6) Verify the new account is available in My Account navigation", async () => {
    await homePage.clickMyAccount();
    await expect.poll(() => homePage.isAuthenticatedAccountNavigationExists()).toBe(true);
  });

  console.log("✅ Customer registration completed successfully.");
});
