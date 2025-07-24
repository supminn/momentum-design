// AI-Assisted
import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import { LINK_SIZES } from '../link/link.constants';
import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';
import { disableControls, hideControls, textControls } from '../../../config/storybook/utils';

const render = (args: Args) =>
  html` <mdc-linkbutton
    @click="${action('onclick')}"
    @keydown="${action('onkeydown')}"
    @focus="${action('onfocus')}"
    @blur="${action('onblur')}"
    ?disabled="${args.disabled}"
    ?soft-disabled="${args['soft-disabled']}"
    ?inline="${args.inline}"
    ?inverted="${args.inverted}"
    link-size="${args['link-size']}"
    role="${args.role}"
    tabindex="${args.tabIndex}"
    aria-label="${args['aria-label']}"
    >${args.children}</mdc-linkbutton
  >`;

const renderWithInvertedBackground = (args: Args) =>
  html` <div style="background-color: var(--mds-color-theme-inverted-background-normal); padding: 8px;">
    ${render(args)}
  </div>`;

const meta: Meta = {
  title: 'Work In Progress/linkbutton',
  tags: ['autodocs'],
  component: 'mdc-linkbutton',
  render,
  parameters: {
    badges: ['wip'],
  },
  argTypes: {
    children: {
      description: 'Text content to be displayed in the linkbutton.',
      control: 'text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the linkbutton completely.',
    },
    'soft-disabled': {
      control: 'boolean',
      description: 'Visually disables the linkbutton but allows focus and events.',
    },
    active: {
      control: 'boolean',
      description: 'Sets the active state of the linkbutton.',
    },
    inline: {
      control: 'boolean',
      description: 'Displays the linkbutton inline with surrounding content.',
    },
    inverted: {
      control: 'boolean',
      description: 'Uses inverted colors suitable for dark backgrounds.',
    },
    'link-size': {
      control: 'select',
      options: Object.values(LINK_SIZES),
      description: 'Size of the linkbutton text.',
    },
    role: {
      control: 'text',
      description: 'ARIA role for the element.',
    },
    tabIndex: {
      control: 'number',
      description: 'Tab index for keyboard navigation.',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the linkbutton.',
    },
    ...hideControls([
      'icon-name',
      'href',
      'target',
      'rel',
      'handleNavigation',
      'prefixIcon',
      'postfixIcon',
      'size',
      'color',
      'variant',
    ]),
    ...disableControls([]),
    ...classArgType,
    ...styleArgType,
    ...textControls([
      '--mdc-link-border-radius',
      '--mdc-link-color-active',
      '--mdc-link-color-disabled',
      '--mdc-link-color-hover',
      '--mdc-link-color-normal',
      '--mdc-link-inverted-color-active',
      '--mdc-link-inverted-color-disabled',
      '--mdc-link-inverted-color-hover',
      '--mdc-link-inverted-color-normal',
    ]),
  },
};

export default meta;

const defaultArgs = {
  children: 'Click me (looks like link, acts like button)',
  disabled: false,
  'soft-disabled': false,
  active: false,
  inline: false,
  inverted: false,
  'link-size': 'large',
  role: 'button',
  tabIndex: 0,
};

export const Example: StoryObj = {
  args: {
    ...defaultArgs,
  },
};

export const LinkButtonSizes: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mdc-linkbutton link-size="large">Large size linkbutton</mdc-linkbutton>
      <mdc-linkbutton link-size="midsize">Midsize size linkbutton</mdc-linkbutton>
      <mdc-linkbutton link-size="small">Small size linkbutton</mdc-linkbutton>
    </div>
  `,
  args: {
    ...defaultArgs,
  },
  argTypes: {
    ...hideControls(['link-size']),
  },
};

export const LinkButtonStates: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mdc-linkbutton>Normal linkbutton</mdc-linkbutton>
      <mdc-linkbutton active>Active linkbutton</mdc-linkbutton>
      <mdc-linkbutton disabled>Disabled linkbutton</mdc-linkbutton>
      <mdc-linkbutton soft-disabled>Soft disabled linkbutton</mdc-linkbutton>
    </div>
  `,
  args: {
    ...defaultArgs,
  },
  argTypes: {
    ...hideControls(['disabled', 'soft-disabled', 'active']),
  },
};

export const InlineLinkButton: StoryObj = {
  render: () => html`
    <p>
      This is a paragraph with an <mdc-linkbutton inline>inline linkbutton</mdc-linkbutton>
      that looks like a link but functions as a button.
    </p>
  `,
  args: {
    ...defaultArgs,
  },
  argTypes: {
    ...hideControls(['inline']),
  },
};

export const LinkButtonInverted: StoryObj = {
  render: renderWithInvertedBackground,
  args: {
    ...defaultArgs,
    inverted: true,
    children: 'Inverted linkbutton',
  },
  argTypes: {
    ...hideControls(['inverted']),
  },
};

export const LinkButtonWithClickHandler: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mdc-linkbutton @click="${action('linkbutton-clicked')}"> Click me to see button behavior </mdc-linkbutton>
      <p>
        <em>Note: This linkbutton looks like a link but triggers a click event when clicked instead of navigating.</em>
      </p>
    </div>
  `,
  args: {
    ...defaultArgs,
  },
};
// End AI-Assisted
