import { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly myAccountLink: Locator;
  private readonly registerLink: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.myAccountLink = page.getByRole("link", { name: /My Account/ }).first();
    this.registerLink = page.getByRole("link", { name: "Register", exact: true }).first();
    this.logoutLink = page.getByRole("link", { name: "Logout", exact: true }).first();
  }

  /**
   * Opens the My Account navigation menu.
   */
  async clickMyAccount(): Promise<void> {
    await this.myAccountLink.click();
  }

  /**
   * Opens the customer registration page.
   */
  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Checks whether the account menu exposes the authenticated logout option.
   * @returns Promise<boolean> - true when the account is authenticated
   */
  async isAuthenticatedAccountNavigationExists(): Promise<boolean> {
    await this.myAccountLink.click();
    return this.logoutLink.isVisible();
  }
}
