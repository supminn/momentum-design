/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';
import { ComponentsPage, test } from '../../../config/playwright/setup';
import { AVATAR_SIZE, DEFAULTS } from '../avatar/avatar.constants';
import { TYPE as PRESENCE_TYPE } from '../presence/presence.constants';
import { AvatarSize } from '../avatar/avatar.types';
import { IconNames } from '../icon/icon.types';

type SetupOptions = {
  componentsPage: ComponentsPage;
  counter?: number;
  iconName?: IconNames;
  initials?: string;
  size?: AvatarSize;
  src?: string;
  secondButtonForFocus?: boolean;
}

const setup = async (args: SetupOptions) => {
  const { componentsPage, ...restArgs } = args;
  await componentsPage.mount({
    html: `
      ${restArgs.secondButtonForFocus ? '<div id="wrapper">' : ''}
         <mdc-avatarbutton
      aria-label="avatar button"
        ${restArgs.counter ? `counter="${restArgs.counter}"` : ''}
        ${restArgs.iconName ? `icon-name="${restArgs.iconName}"` : ''}
        ${restArgs.initials ? `initials="${restArgs.initials}"` : ''}
        ${restArgs.size ? `size="${restArgs.size}"` : ''}
        ${restArgs.src ? `src="${restArgs.src}"` : ''}
      >
      </mdc-avatarbutton>
      ${restArgs.secondButtonForFocus ? '<mdc-avatarButton initials=\'AV\'></mdc-avatarButton></div>' : ''}
        `,
    clearDocument: true,
  });

  const element = restArgs.secondButtonForFocus
    ? componentsPage.page.locator('div#wrapper')
    : componentsPage.page.locator('mdc-avatarbutton');
  await element.waitFor();

  // always return the first button:
  const firstButton = await componentsPage.page.locator('mdc-avatarbutton').first();
  return firstButton;
};

test('mdc-avatarbutton', async ({ componentsPage }) => {
  const avatarButton = await setup({ componentsPage });

  /**
   * ACCESSIBILITY
   */
  await test.step('accessibility', async () => {
    await componentsPage.accessibility.checkForA11yViolations('avatarbutton-default');
  });
  /**
   * ATTRIBUTES
   */
  await test.step('attributes', async () => {
    await test.step('should fallback to default icon and size to 32 when no attributes are passed', async () => {
      await componentsPage.setAttributes(avatarButton, {});
      const icon = await componentsPage.page.locator('mdc-icon');
      await icon.waitFor();
      await expect(icon).toHaveAttribute('name', DEFAULTS.ICON_NAME);
      await expect(avatarButton).toHaveAttribute('size', DEFAULTS.SIZE.toString());
    });

    await test.step('presence should not be displayed when the avatarButton type is counter', async () => {
      await componentsPage.setAttributes(avatarButton, {
        counter: '10',
        presence: PRESENCE_TYPE.ACTIVE,
      });
      const presence = await componentsPage.page.locator('mdc-presence');
      await expect(presence).not.toBeAttached();
    });

    await test.step('counter should be set to 99+ when more than 99 is passed', async () => {
      await componentsPage.setAttributes(avatarButton, {
        counter: '100',
      });
      const mdcTextElement = await componentsPage.page.locator('mdc-text');
      const textContent = await mdcTextElement.textContent();
      expect(textContent?.trim()).toBe('99+');
    });

    await test.step('counter should be set to 0 when a negative value is passed', async () => {
      await componentsPage.setAttributes(avatarButton, {
        counter: '-12',
      });
      const mdcTextElement = await componentsPage.page.locator('mdc-text');
      const textContent = await mdcTextElement.textContent();
      expect(textContent?.trim()).toBe('0');
    });

    await test.step('should limit the initials to two characters', async () => {
      await componentsPage.setAttributes(avatarButton, {
        initials: 'abcdef',
      });
      const mdcTextElement = await componentsPage.page.locator('mdc-text');
      const textContent = await mdcTextElement.textContent();
      expect(textContent?.trim()).toHaveLength(2);
      expect(textContent?.trim()).toBe('AB');
    });

    await test.step('presence should be displayed when it is set', async () => {
      await componentsPage.setAttributes(avatarButton, {
        presence: PRESENCE_TYPE.ACTIVE,
      });
      await expect(avatarButton).toHaveAttribute('presence', PRESENCE_TYPE.ACTIVE);
    });

    await test.step('should display loading indicator when isTyping is set', async () => {
      await componentsPage.setAttributes(avatarButton, {
        'is-typing': 'true',
      });
      const loadingIndicator = await componentsPage.page.locator('div.loading__wrapper');
      await loadingIndicator.waitFor();
      await expect(loadingIndicator).toBeDefined();
      await expect(avatarButton).toHaveAttribute('is-typing', 'true');
    });

    await test.step('should only accept allowed size', async () => {
      await componentsPage.setAttributes(avatarButton, {
        size: AVATAR_SIZE[88].toString(),
      });
      await expect(avatarButton).toHaveAttribute('size', AVATAR_SIZE[88].toString());
    });
  });

  /**
   * INTERACTIONS
   */
  await test.step('button key pressed and focused events', async () => {
    const avatarbutton = await setup({ componentsPage, secondButtonForFocus: true });
    await componentsPage.page.evaluate(() => {
      const btn = document.getElementsByTagName('mdc-avatarbutton')[0];
      btn.addEventListener('click', () => {
        btn.classList.toggle('btn-listener');
      });
      (btn as HTMLElement).onclick = () => {
        btn.classList.toggle('btn-onclick');
      };

      (btn as HTMLElement).onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const value = e.key === 'Enter' ? 'enter' : 'space';
          btn.textContent = `${value} down`;
        }
      };

      (btn as HTMLElement).onkeyup = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const value = e.key === 'Enter' ? 'enter' : 'space';
          btn.textContent = `${value} up`;
        }
      };
    });

    await test.step('button focus event', async () => {
      await componentsPage.page.keyboard.press('Tab');
      await expect(avatarbutton).toBeFocused();

      await componentsPage.page.keyboard.down('Space');
      await expect(avatarbutton).toHaveClass('pressed');
      // await expect(avatarbutton).toHaveText('space down');
      await componentsPage.page.keyboard.up('Space');
      // await expect(avatarbutton).toHaveText('space up');
      await expect(avatarbutton).toHaveClass('btn-listener btn-onclick');
      await expect(avatarbutton).not.toHaveClass('pressed');

      await componentsPage.page.keyboard.down('Enter');
      // await expect(avatarbutton).toHaveText('enter down');
      await expect(avatarbutton).toHaveClass('pressed');
      await componentsPage.page.keyboard.up('Enter');
      // await expect(avatarbutton).toHaveText('enter up');
      await expect(avatarbutton).not.toHaveClass('pressed');
      await expect(avatarbutton).not.toHaveClass('btn-listener btn-onclick'); // toggled class to remove

      await componentsPage.page.keyboard.press('Tab');
      await expect(avatarbutton).not.toBeFocused();

      // expect second button to be focused (Tab moves away)
      const bothButtons = await componentsPage.page.locator('mdc-avatarbutton').all();
      await expect(bothButtons[1]).toBeFocused();
    });

    await test.step('button click event', async () => {
      await avatarbutton.click();
      await expect(avatarbutton).toHaveClass('btn-listener btn-onclick');
      await avatarbutton.click();
      await expect(avatarbutton).not.toHaveClass('btn-listener btn-onclick');
    });

    await test.step('button click event for disabled', async () => {
      await componentsPage.setAttributes(avatarbutton, { disabled: '' });
      await expect(avatarbutton).toHaveAttribute('disabled');
      await expect(avatarbutton).toBeDisabled();
      await componentsPage.removeAttribute(avatarbutton, 'disabled');
      await expect(avatarbutton).not.toBeDisabled();
    });

    await test.step('button key press event for disabled', async () => {
      await componentsPage.setAttributes(avatarbutton, { disabled: '' });

      await componentsPage.page.keyboard.press('Tab');
      await expect(avatarbutton).not.toBeFocused();

      await componentsPage.page.keyboard.down('Space');
      await expect(avatarbutton).not.toHaveClass('pressed');
      await componentsPage.page.keyboard.up('Space');
      await expect(avatarbutton).not.toHaveClass('btn-listener btn-onclick');

      await componentsPage.page.keyboard.down('Enter');
      await expect(avatarbutton).not.toHaveClass('pressed');
      await expect(avatarbutton).not.toHaveClass('btn-listener btn-onclick');
      await componentsPage.page.keyboard.up('Enter');
    });
  });
});