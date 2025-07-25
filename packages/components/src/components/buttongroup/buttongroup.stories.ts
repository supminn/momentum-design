import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';

import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';
import { disableControls, textControls } from '../../../config/storybook/utils';

import { BUTTON_GROUP_ORIENTATION, BUTTON_GROUP_SIZE, BUTTON_GROUP_VARIANT } from './buttongroup.constants';
import '../button';
import '../popover';
import '../tooltip';

const render = (args: Args) =>
  html` <mdc-buttongroup
    variant="${args.variant}"
    orientation="${args.orientation}"
    size="${args.size}"
    ?compact="${args.compact}"
  >
    ${args.children}
  </mdc-buttongroup>`;

const meta: Meta = {
  title: 'Components/buttongroup',
  tags: ['autodocs'],
  component: 'mdc-buttongroup',
  render,
  parameters: {
    badges: ['stable'],
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BUTTON_GROUP_VARIANT),
    },
    orientation: {
      control: 'select',
      options: Object.values(BUTTON_GROUP_ORIENTATION),
    },
    size: {
      control: 'select',
      options: Object.values(BUTTON_GROUP_SIZE),
    },
    compact: {
      control: 'boolean',
    },
    ...classArgType,
    ...styleArgType,
    ...disableControls(['children']),
    ...textControls([
      '--mdc-buttongroup-border-radius',
      '--mdc-buttongroup-border-color',
      '--mdc-buttongroup-divider-color',
    ]),
  },
};

export default meta;

export const Example: StoryObj = {
  args: {
    variant: BUTTON_GROUP_VARIANT.PRIMARY,
    orientation: BUTTON_GROUP_ORIENTATION.HORIZONTAL,
    size: BUTTON_GROUP_SIZE[28],
    compact: false,
    children: html`
      <mdc-button prefix-icon="placeholder-bold" aria-label="icon button"></mdc-button>
      <mdc-button prefix-icon="placeholder-bold" aria-label="icon button"></mdc-button>
      <mdc-button prefix-icon="placeholder-bold" aria-label="icon button"></mdc-button>
    `,
  },
};

export const VerticalGroup: StoryObj = {
  args: {
    variant: BUTTON_GROUP_VARIANT.SECONDARY,
    orientation: BUTTON_GROUP_ORIENTATION.VERTICAL,
    size: BUTTON_GROUP_SIZE[28],
    compact: false,
    children: html`
      <mdc-button prefix-icon="arrow-up-bold" aria-label="arrow up button"></mdc-button>
      <mdc-button prefix-icon="arrow-down-bold" aria-label="arrow down button"></mdc-button>
    `,
  },
};

export const CompactGroup: StoryObj = {
  args: {
    variant: BUTTON_GROUP_VARIANT.SECONDARY,
    orientation: BUTTON_GROUP_ORIENTATION.HORIZONTAL,
    size: BUTTON_GROUP_SIZE[32],
    compact: true,
    children: html`
      <mdc-button prefix-icon="reply-bold" aria-label="reply button"></mdc-button>
      <mdc-button prefix-icon="reactions-bold" aria-label="reactions button"></mdc-button>
      <mdc-button prefix-icon="alert-active-bold" aria-label="alert active button"></mdc-button>
      <mdc-button prefix-icon="forward-message-bold" aria-label="forward message button"></mdc-button>
      <mdc-button prefix-icon="more-bold" aria-label="more button"></mdc-button>
    `,
  },
};

export const SpiltPillButton: StoryObj = {
  args: {
    variant: BUTTON_GROUP_VARIANT.SECONDARY,
    orientation: BUTTON_GROUP_ORIENTATION.HORIZONTAL,
    size: BUTTON_GROUP_SIZE[28],
    compact: false,
    children: html`
      <mdc-button prefix-icon="microphone-muted-bold">Unmute</mdc-button>
      <mdc-button prefix-icon="arrow-down-bold" aria-label="arrow down button"></mdc-button>
    `,
  },
};

export const SpiltIconButton: StoryObj = {
  args: {
    variant: BUTTON_GROUP_VARIANT.SECONDARY,
    orientation: BUTTON_GROUP_ORIENTATION.HORIZONTAL,
    size: BUTTON_GROUP_SIZE[28],
    compact: false,
    children: html`
      <mdc-button prefix-icon="raise-hand-bold" aria-label="raise hand button"></mdc-button>
      <mdc-button prefix-icon="reactions-bold" aria-label="reactions button"></mdc-button>
    `,
  },
};

export const GroupWithPopover: StoryObj = {
  render: () => html`
    <mdc-buttongroup variant="secondary" orientation="horizontal" size="32">
      <mdc-button prefix-icon="camera-on-bold" id="popover-trigger-1">Start Video</mdc-button>
      <mdc-button prefix-icon="arrow-down-bold" id="popover-trigger-2"></mdc-button>
    </mdc-buttongroup>

    <mdc-tooltip id="tooltip1" triggerID="popover-trigger-1" placement="bottom" show-arrow tooltip-type="label">
      <mdc-text>Tooltip explaining Start Video button</mdc-text>
    </mdc-tooltip>
    <mdc-popover
      id="popover1"
      triggerID="popover-trigger-2"
      trigger="click"
      placement="bottom"
      show-arrow
      hide-on-escape
      hide-on-outside-click
    >
      <mdc-text>Settings related to video options</mdc-text>
    </mdc-popover>
  `,
};
