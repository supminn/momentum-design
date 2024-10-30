import { CSSResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './button1.styles';
import { Component } from '../../models';

/**
 * button1 component, which ...
 *
 * @tagname button1
 *
 * @slot default - This is a default/unnamed slot
 *
 * @cssprop --custom-property-name - Description of the CSS custom property
 */
class Button1 extends Component {
  @property({ type: Boolean }) active: boolean = true;

  @property({ type: Boolean }) disabled: boolean = false;

  @property({ type: Boolean }) softDisabled: boolean = false;

  @property({ type: String }) override ariaLabel: string = '';

  public override render() {
    return html`
          <button
              tabindex="${this.disabled ? '-1' : '0'}"
              aria-label="${this.ariaLabel}"
              aria-disabled="${this.disabled}"
              @click="${this.handleClick}"
              class="${classMap({ button: true, disabled: this.disabled })}"
          >
              <slot></slot>
          </button>
      `;
  }

  private handleClick(event: MouseEvent) {
    if (!this.disabled) {
      console.log('Button clicked', event.target);
    }
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Button1;
