// AI-Assisted
import { expect } from '@playwright/test';

import { ComponentsPage, test } from '../../../config/playwright/setup';
import StickerSheet from '../../../config/playwright/setup/utils/Stickersheet';
import { LINK_SIZES, DEFAULTS as LINK_DEFAULTS } from '../link/link.constants';

type SetupOptions = {
  componentsPage: ComponentsPage;
  disabled?: boolean;
  softDisabled?: boolean;
  active?: boolean;
  inline?: boolean;
  inverted?: boolean;
  linkSize?: string;
  role?: string;
  children?: string;
  ariaLabel?: string;
  addPageFooter?: boolean;
};

const setup = async (args: SetupOptions) => {
  const { componentsPage, ...restArgs } = args;

  const html = `
    ${restArgs.addPageFooter ? '<div id="wrapper">' : ''}
    <mdc-linkbutton
      ${restArgs.disabled ? 'disabled' : ''}
      ${restArgs.softDisabled ? 'soft-disabled' : ''}
      ${restArgs.active ? 'active' : ''}
      ${restArgs.inline ? 'inline' : ''}
      ${restArgs.inverted ? 'inverted' : ''}
      ${restArgs.linkSize ? `link-size="${restArgs.linkSize}"` : ''}
      ${restArgs.role ? `role="${restArgs.role}"` : ''}
      ${restArgs.ariaLabel ? `aria-label="${restArgs.ariaLabel}"` : ''}
    >
      ${restArgs.children || 'Linkbutton'}
    </mdc-linkbutton>
    ${restArgs.addPageFooter ? '<div id="content"><p>Test content</p></div></div>' : ''}
  `;

  await componentsPage.mount({ html, clearDocument: true });

  const linkbutton = componentsPage.page.locator('mdc-linkbutton').first();
  await linkbutton.waitFor();
  return linkbutton;
};

const INVERTED_BG_STYLE = 'background: var(--mds-color-theme-inverted-background-normal); padding: 5px 0;';

test.use({ viewport: { width: 400, height: 800 } });

test('mdc-linkbutton', async ({ componentsPage }) => {
  /**
   * ATTRIBUTES
   */
  await test.step('attributes', async () => {
    const linkbutton = await setup({ componentsPage });

    await test.step('default attributes', async () => {
      await expect(linkbutton).toHaveAttribute('link-size', LINK_DEFAULTS.LINK_SIZE);
      await expect(linkbutton).toHaveAttribute('role', 'button');
      await expect(linkbutton).not.toHaveAttribute('disabled');
      await expect(linkbutton).not.toHaveAttribute('soft-disabled');
      await expect(linkbutton).not.toHaveAttribute('active');
      await expect(linkbutton).not.toHaveAttribute('inline');
      await expect(linkbutton).not.toHaveAttribute('inverted');
    });

    await test.step('attribute disabled should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, disabled: true });
      await expect(testLinkbutton).toHaveAttribute('disabled');
    });

    await test.step('attribute soft-disabled should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, softDisabled: true });
      await expect(testLinkbutton).toHaveAttribute('soft-disabled');
    });

    await test.step('attribute active should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, active: true });
      await expect(testLinkbutton).toHaveAttribute('active');
    });

    await test.step('attribute inline should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, inline: true });
      await expect(testLinkbutton).toHaveAttribute('inline');
    });

    await test.step('attribute inverted should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, inverted: true });
      await expect(testLinkbutton).toHaveAttribute('inverted');
    });

    await test.step('attribute link-size should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, linkSize: 'small' });
      await expect(testLinkbutton).toHaveAttribute('link-size', 'small');
    });

    await test.step('attribute role should be settable', async () => {
      const testLinkbutton = await setup({ componentsPage, role: 'tab' });
      await expect(testLinkbutton).toHaveAttribute('role', 'tab');
    });

    await test.step('supports different link sizes', async () => {
      const sizeTests = Object.values(LINK_SIZES).map(async size => {
        const sizedLinkbutton = await setup({ componentsPage, linkSize: size });
        await expect(sizedLinkbutton).toHaveAttribute('link-size', size);
      });

      await Promise.all(sizeTests);
    });
  });

  /**
   * VISUAL REGRESSION AND ACCESSIBILITY
   */
  await test.step('visual-regression and accessibility', async () => {
    const stickerSheet = new StickerSheet(componentsPage, 'mdc-linkbutton');
    stickerSheet.setChildren('Linkbutton');

    // Basic variations
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ disabled: '' });
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ 'soft-disabled': '' });
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ active: '' });
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ inline: '' });
    await stickerSheet.createMarkupWithCombination({});

    // Size variations
    stickerSheet.setAttributes({});
    await stickerSheet.createMarkupWithCombination({ 'link-size': LINK_SIZES });

    // Inverted background variations
    stickerSheet.setAttributes({ inverted: '', style: INVERTED_BG_STYLE });
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ disabled: '', inverted: '', style: INVERTED_BG_STYLE });
    await stickerSheet.createMarkupWithCombination({});
    stickerSheet.setAttributes({ 'soft-disabled': '', inverted: '', style: INVERTED_BG_STYLE });
    await stickerSheet.createMarkupWithCombination({});

    await stickerSheet.mountStickerSheet();
    const container = stickerSheet.getWrapperContainer();

    await test.step('matches screenshot of linkbutton element', async () => {
      await componentsPage.page.mouse.move(0, 0);
      await componentsPage.visualRegression.takeScreenshot('mdc-linkbutton', { element: container });
    });

    await test.step('accessibility', async () => {
      await componentsPage.accessibility.checkForA11yViolations('linkbutton-default');
    });
  });

  /**
   * INTERACTIONS
   */
  await test.step('linkbutton interactions', async () => {
    const linkbutton = await setup({ componentsPage, addPageFooter: true });

    await test.step('functions as button - click triggers events', async () => {
      await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        (lb as any).clickEventFired = false;
        lb?.addEventListener('click', () => {
          (lb as any).clickEventFired = true;
        });
      });

      await linkbutton.click();

      const eventFired = await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        return (lb as any).clickEventFired;
      });

      expect(eventFired).toBe(true);
    });

    await test.step('does not navigate like a link', async () => {
      const originalURL = componentsPage.page.url();
      await linkbutton.click();

      // Verify URL hasn't changed (no navigation occurred)
      await expect(componentsPage.page).toHaveURL(originalURL);
    });

    await test.step('does not focus or activate when disabled', async () => {
      const disabledLinkbutton = await setup({ componentsPage, disabled: true });
      await componentsPage.actionability.pressTab();
      await expect(disabledLinkbutton).not.toBeFocused();
    });

    await test.step('focus and click with keyboard', async () => {
      await componentsPage.actionability.pressTab();
      await expect(linkbutton).toBeFocused();

      await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        (lb as any).keyboardClickFired = false;
        lb?.addEventListener('click', () => {
          (lb as any).keyboardClickFired = true;
        });
      });

      await componentsPage.page.keyboard.press('Enter');

      const eventFired = await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        return (lb as any).keyboardClickFired;
      });

      expect(eventFired).toBe(true);
    });

    await test.step('soft-disabled allows focus but indicates disabled state', async () => {
      const softDisabledLinkbutton = await setup({ componentsPage, softDisabled: true });

      await componentsPage.actionability.pressTab();
      await expect(softDisabledLinkbutton).toBeFocused();
      await expect(softDisabledLinkbutton).toHaveAttribute('aria-disabled', 'true');

      // Still allows click events (behavior should be handled by consumer)
      await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        (lb as any).softDisabledClickFired = false;
        lb?.addEventListener('click', () => {
          (lb as any).softDisabledClickFired = true;
        });
      });

      await softDisabledLinkbutton.click();

      const eventFired = await componentsPage.page.evaluate(() => {
        const lb = document.querySelector('mdc-linkbutton');
        return (lb as any).softDisabledClickFired;
      });

      expect(eventFired).toBe(true);
    });

    await test.step('inline linkbutton integrates with text flow', async () => {
      await componentsPage.mount({
        html: `
          <p>This is a paragraph with an <mdc-linkbutton inline>inline linkbutton</mdc-linkbutton> that should flow with the text.</p>
        `,
        clearDocument: true,
      });

      const inlineLinkbutton = componentsPage.page.locator('mdc-linkbutton[inline]');
      await expect(inlineLinkbutton).toHaveAttribute('inline');
    });
  });

  /**
   * ARIA AND ACCESSIBILITY
   */
  await test.step('accessibility and ARIA', async () => {
    await test.step('has correct default ARIA role', async () => {
      const linkbutton = await setup({ componentsPage });
      await expect(linkbutton).toHaveAttribute('role', 'button');
    });

    await test.step('supports custom ARIA role', async () => {
      const linkbutton = await setup({ componentsPage, role: 'tab' });
      await expect(linkbutton).toHaveAttribute('role', 'tab');
    });

    await test.step('supports aria-label', async () => {
      const linkbutton = await setup({ componentsPage, ariaLabel: 'Custom button label' });
      await expect(linkbutton).toHaveAttribute('aria-label', 'Custom button label');
    });

    await test.step('correctly sets aria-disabled for soft-disabled', async () => {
      const linkbutton = await setup({ componentsPage, softDisabled: true });
      await expect(linkbutton).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
// End AI-Assisted
