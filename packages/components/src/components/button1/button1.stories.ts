import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';
import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';

const render = (args: Args) => html`
  <mdc-button1 ?disabled=${args.disabled} ?softDisabled=${args.softDisabled}>${args.children}</mdc-button1>
  <mdc-button1 ?disabled=${args.disabled} ?softDisabled=${args.softDisabled}>${args.children}</mdc-button1>`;

const meta: Meta = {
  title: 'Work In Progress/button1',
  component: 'mdc-button1',
  render,
  parameters: {
    badges: ['wip'],
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Children (passed into "default" slot)',
    },
    active: {
      control: 'boolean',
      description: 'Active',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled',
      defaultValue: false,
    },
    softDisabled: {
      control: 'boolean',
      description: 'Soft Disabled - disabled with focus',
      defaultValue: false,
    },
    ariaLabel: {
      control: 'text',
      description: 'Aria Label',
    },
    ...classArgType,
    ...styleArgType,
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    class: 'custom-classname',
    style: 'margin-top: 20px;',
    children: 'Click Me',
    active: true,
    disabled: false,
    softDisabled: false,
    ariaLabel: 'my button text',
  },
};
