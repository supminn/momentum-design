import { CSSResult, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { Component } from '../../models';
import { DisabledMixin } from '../../utils/mixins/DisabledMixin';
import checkboxStyles from '../checkbox/checkbox.styles';
import { ICON_NAME } from './decorativecheckbox.constants';

/**
 * This is a decorative component that is styled to look as a checkbox option.
 * It has 2 properties - checked and disabled.
 *
 * We are using the same styling that has been created for the `mdc-checkbox` component.
 *
 */
class DecorativeCheckbox extends DisabledMixin(Component) {
  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ type: Boolean, reflect: true }) indeterminate = false;

  public override render() {
    const checkboxIconContent = (this.checked || this.indeterminate) ? html`
      <mdc-icon
        class="icon"
        name="${this.indeterminate ? ICON_NAME.INDETERMINATE : ICON_NAME.CHECKED}"
        size="1"
        length-unit="rem"
      ></mdc-icon>
    ` : nothing;

    return html`<div class="container mdc-focus-ring">
      <div class="icon-container">${checkboxIconContent}</div>
    </div>`;
  }

  public static override styles: Array<CSSResult> = [...checkboxStyles];
}

export default DecorativeCheckbox;
