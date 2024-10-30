import { CSSResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './button.styles';
import { Component } from '../../models';

/**
 * Button component that behaves like a button using ARIA roles.
 *
 * @tagname button
 *
 * @slot default - This is a default/unnamed slot
 *
 * @cssprop --custom-property-name - Description of the CSS custom property
 */
class Button extends Component {
    @property({ type: Boolean }) active: boolean = true;

    @property({ type: Boolean }) disabled: boolean = false;

    @property({ type: Boolean }) softDisabled: boolean = false;

    @property({ type: String }) override ariaLabel: string = '';

    constructor() {
      super();
      this.active = false;
    }

    public override render() {
      return html`
            <div
                role="button"
                tabindex="${this.disabled ? '-1' : '0'}"
                aria-label="${this.ariaLabel}"
                aria-disabled="${this.disabled}"
                @click="${this.handleClick}"
                @keydown="${this.handleKeyDown}"
                @keyup="${this.handleKeyUp}"
                @focus="${this.handleFocus}"
                @blur="${this.handleFocus}"
                class="${classMap({ button: true, disabled: this.disabled, 'btn-active': this.active })}"
            >
                <slot></slot>
            </div>
        `;
    }

    private handleClick(event: MouseEvent) {
      if (!this.disabled) {
        console.log('Button clicked', event.target);
      }
    }

    private handleFocus(event: FocusEvent) {
      if (this.softDisabled) {
        event.preventDefault();
      }
    }

    private handleKeyDown(event: KeyboardEvent) {
      if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault(); // Prevent scrolling when space is pressed
        this.active = true;
      }
    }

    private handleKeyUp(event: KeyboardEvent) {
      if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
        this.active = false; // Reset active state
        this.handleClick(event as unknown as MouseEvent);
        this.active = false;
      }
    }

    public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Button;
