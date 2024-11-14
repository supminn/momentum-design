import { expect } from '@playwright/test';
import { ComponentsPage, test } from '../../../config/playwright/setup';
import {
  BUTTON_COLORS,
  BUTTON_TYPE,
  BUTTON_VARIANTS,
  DEFAULTS,
  ICON_BUTTON_SIZES,
  PILL_BUTTON_SIZES,
} from './button.constants';

type SetupOptions = {
  componentsPage: ComponentsPage;
  prefixIcon?: string;
  postfixIcon?: string;
  active?: boolean;
  disabled?: boolean;
  softDisabled?: boolean;
  variant?: string;
  size?: number;
  color?: string;
  children?: any;
}

const setup = async (args: SetupOptions) => {
  const { componentsPage, ...restArgs } = args;
  await componentsPage.mount({
    html: `<mdc-button
      ${restArgs.active ? 'active' : ''}
      ${restArgs.disabled ? 'disabled' : ''}
      ${restArgs.softDisabled ? 'soft-disabled' : ''}
      ${restArgs.variant ? `variant="${restArgs.variant}"` : ''}
      ${restArgs.size ? `size="${restArgs.size}"` : ''}
      ${restArgs.color ? `color="${restArgs.color}"` : ''}
      ${restArgs.prefixIcon ? `prefix-icon="${restArgs.prefixIcon}"` : ''}
      ${restArgs.postfixIcon ? `postfix-icon="${restArgs.postfixIcon}"` : ''}
    >
      ${restArgs.children}
    </mdc-button>
      `,
    clearDocument: true,
  });
  const button = componentsPage.page.locator('mdc-button');
  await button.waitFor();
  return button;
};

const commonTestCases = async (args: SetupOptions, buttonType: string) => {
  const { componentsPage, ...props } = args;
  const button = await setup({
    componentsPage,
    ...props,
  });
  /**
   * ACCESSIBILITY
   */
  await test.step(`accessibility for ${buttonType} button`, async () => {
    await componentsPage.accessibility.checkForA11yViolations(`button-${buttonType}-default`);
  });

  /**
   * VISUAL REGRESSION
   */
  await test.step(`visual-regression for ${buttonType} button`, async () => {
    await componentsPage.visualRegression.takeScreenshot(`mdc-button-${buttonType}-default`, { element: button });
  });

  /**
   * ATTRIBUTES
   */

  await test.step(`attributes for ${buttonType} button`, async () => {
    await test.step('attributes should be present on component by default', async () => {
      await expect(button).toHaveAttribute('variant', DEFAULTS.VARIANT);
      await expect(button).toHaveAttribute('size', DEFAULTS.SIZE.toString());
      await expect(button).toHaveAttribute('color', DEFAULTS.COLOR);
    });
  });

  await test.step('should fallback to default values when invalid attributes are passed', async () => {
    await componentsPage.setAttributes(button, {
      variant: 'invalid',
      color: 'invalid',
      size: 'invalid',
    });
    await expect(button).toHaveAttribute('variant', DEFAULTS.VARIANT);
    await expect(button).toHaveAttribute('size', `${DEFAULTS.SIZE}`);
    await expect(button).toHaveAttribute('color', DEFAULTS.COLOR);
  });

  // Disabled button
  await test.step(`attribute disabled should be present on ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, {
      disabled: 'true',
    });
    await expect(button).toHaveAttribute('disabled');
  });

  await test.step(`accessibility for disabled ${buttonType} button`, async () => {
    await componentsPage.accessibility
      .checkForA11yViolations(`button-${buttonType}-disabled`);
  });

  await test.step(`visual-regression for disabled ${buttonType} button`, async () => {
    await componentsPage.visualRegression
      .takeScreenshot(`mdc-button-${buttonType}-disabled`, { element: button });
    await componentsPage.removeAttribute(button, 'disabled');
  });

  // Soft Disabled button
  await test.step(`attribute soft-disabled should be present on ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, {
      'soft-disabled': 'true',
    });
    await expect(button).toHaveAttribute('soft-disabled');
  });

  await test.step(`accessibility for soft-disabled ${buttonType} button`, async () => {
    await componentsPage.accessibility
      .checkForA11yViolations(`button-${buttonType}-soft-disabled`);
  });

  await test.step(`visual-regression for soft-disabled ${buttonType} button`, async () => {
    await componentsPage.visualRegression
      .takeScreenshot(`mdc-button-${buttonType}-soft-disabled`, { element: button });
    await componentsPage.removeAttribute(button, 'soft-disabled');
  });

  // Active button
  await test.step(`attribute active should be present on ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, {
      active: 'true',
    });
    await expect(button).toHaveAttribute('active');
  });

  await test.step(`accessibility for active ${buttonType} button`, async () => {
    await componentsPage.accessibility.checkForA11yViolations(`button-${buttonType}-active`);
  });

  await test.step(`visual-regression for active ${buttonType} button`, async () => {
    await componentsPage.visualRegression
      .takeScreenshot(`mdc-button-${buttonType}-active`, { element: button });
    await componentsPage.removeAttribute(button, 'active');
  });

  // Active Disabled button
  await test.step(`attribute active and disabled should be present on ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, {
      disabled: 'true',
      active: 'true',
    });
    await expect(button).toHaveAttribute('disabled');
    await expect(button).toHaveAttribute('active');
  });

  await test.step(`accessibility for active and disabled ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, { role: 'button' });
    await componentsPage.accessibility
      .checkForA11yViolations(`button-${buttonType}-active-disabled`);
  });

  await test.step(`visual-regression for active and disabled ${buttonType} button`, async () => {
    await componentsPage.visualRegression
      .takeScreenshot(`mdc-button-${buttonType}-active-disabled`, { element: button });
    await componentsPage.removeAttribute(button, 'disabled');
    await componentsPage.removeAttribute(button, 'active');
  });

  // Soft Disabled button
  await test.step(`attribute active and soft-disabled should be present on ${buttonType} button`, async () => {
    await componentsPage.setAttributes(button, {
      'soft-disabled': 'true',
      active: 'true',
    });
    await expect(button).toHaveAttribute('soft-disabled');
    await expect(button).toHaveAttribute('active');
  });

  await test.step(`accessibility for active and soft-disabled ${buttonType} button`, async () => {
    await componentsPage.accessibility
      .checkForA11yViolations(`button-${buttonType}-active-soft-disabled`);
  });

  await test.step(`visual-regression for active and soft-disabled ${buttonType} button`, async () => {
    await componentsPage.visualRegression
      .takeScreenshot(`mdc-button-${buttonType}-active-soft-disabled`, { element: button });
    await componentsPage.removeAttribute(button, 'soft-disabled');
    await componentsPage.removeAttribute(button, 'active');
  });
};

const testForCombinations = async (args: SetupOptions, buttonType: string) => {
  const { componentsPage, ...props } = args;
  const button = await setup({
    componentsPage,
    ...props,
  });
  const BUTTON_SIZES = buttonType === BUTTON_TYPE.ICON ? ICON_BUTTON_SIZES : PILL_BUTTON_SIZES;
  await Promise.all(Object.values(BUTTON_VARIANTS).map((variant) => (async () => {
    await Promise.all(Object.values(BUTTON_COLORS).map((color) => (async () => {
      await Promise.all(Object.values(BUTTON_SIZES).map((size) => (async () => {
        await test.step(`attribute variant="${variant}",
          color="${color}", size="${size}" should be present on ${buttonType} button`, async () => {
          await componentsPage.setAttributes(button, { variant, color, size: `${size}` });
          await expect(button).toHaveAttribute('variant', variant);
          await expect(button).toHaveAttribute('color', color);
          await expect(button).toHaveAttribute('size', `${size}`);
        });

        await test.step(`visual-regression for variant="${variant}",
          color="${color}", size="${size}" ${buttonType} button`, async () => {
          await componentsPage.visualRegression
            .takeScreenshot(`mdc-button-${buttonType}-${variant}-${color}-${size}`, { element: button });
        });

        await test.step(`accessibility for variant="${variant}",
          color="${color}", size="${size}" ${buttonType} button`, async () => {
          await componentsPage.accessibility.checkForA11yViolations(`button-${buttonType}-${variant}-${color}-${size}`);
        });

        // loop ends here
      })));
    })));
  })));
};

const testForButtonVariants = async (args: SetupOptions, buttonType: string) => {
  const { componentsPage, ...props } = args;
  const button = await setup({
    componentsPage,
    ...props,
  });

  for (const variant of Object.values(BUTTON_VARIANTS)) {
    await test.step(`attribute variant="${variant}" should be present on ${buttonType} button`, async () => {
      await componentsPage.setAttributes(button, { variant });
      await expect(button).toHaveAttribute('variant', variant);
    });
  }
};

const testsToRun = async (componentsPage: ComponentsPage) => {
  await test.step('mdc-button as pill button', async () => {
    const children = 'Button content';
    await commonTestCases({ children, componentsPage }, 'pill');
    await testForCombinations({ children, componentsPage }, 'pill');
    await testForButtonVariants({ children, componentsPage }, 'pill');
  });
};

test.describe.parallel('mdc-button', () => {
  test.use({ viewport: { width: 300, height: 200 } });
  test('standalone', async ({ componentsPage }) => {
    await testsToRun(componentsPage);
  });
});
