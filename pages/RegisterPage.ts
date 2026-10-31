import { Locator, Page } from "@playwright/test";

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
};

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly pageHeading: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailField: Locator;
  private readonly telephoneField: Locator;
  private readonly passwordField: Locator;
  private readonly passwordConfirmField: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly continueButton: Locator;
  private readonly accountCreatedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.pageHeading = page.getByRole("heading", { name: "Register Account", exact: true });
    this.firstNameField = page.getByPlaceholder("First Name", { exact: true });
    this.lastNameField = page.getByPlaceholder("Last Name", { exact: true });
    this.emailField = page.getByPlaceholder("E-Mail", { exact: true });
    this.telephoneField = page.getByPlaceholder("Telephone", { exact: true });
    this.passwordField = page.getByPlaceholder("Password", { exact: true });
    this.passwordConfirmField = page.getByPlaceholder("Password Confirm", { exact: true });
    this.privacyPolicyCheckbox = page.getByRole("checkbox");
    this.continueButton = page.getByRole("button", { name: "Continue", exact: true });
    this.accountCreatedHeading = page.getByRole("heading", {
      name: "Your Account Has Been Created!",
      exact: true,
    });
  }

  /**
   * Checks whether the registration page is displayed.
   * @returns Promise<boolean> - true when the registration heading is visible
   */
  async isRegisterPageExists(): Promise<boolean> {
    return this.pageHeading.isVisible();
  }

  /**
   * Enters the customer's registration details.
   * @param registrationData - Customer details to register
   */
  async fillRegistrationForm(registrationData: RegistrationData): Promise<void> {
    await this.firstNameField.fill(registrationData.firstName);
    await this.lastNameField.fill(registrationData.lastName);
    await this.emailField.fill(registrationData.email);
    await this.telephoneField.fill(registrationData.telephone);
    await this.passwordField.fill(registrationData.password);
    await this.passwordConfirmField.fill(registrationData.password);
  }

  /**
   * Accepts the Privacy Policy.
   */
  async acceptPrivacyPolicy(): Promise<void> {
    await this.privacyPolicyCheckbox.check();
  }

  /**
   * Submits the registration form.
   */
  async submitRegistration(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Checks whether OpenCart displays the account-created confirmation.
   * @returns Promise<boolean> - true when the confirmation heading is visible
   */
  async isAccountCreatedConfirmationExists(): Promise<boolean> {
    return this.accountCreatedHeading.isVisible();
  }
}
