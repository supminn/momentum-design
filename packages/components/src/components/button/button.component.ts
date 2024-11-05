import { CSSResult, html, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
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
      this.initializeButtonAttributes();
    }

    private initializeButtonAttributes() {
      this.role = 'button';
      this.addEventListener('click', this.handleClick);
      this.addEventListener('keydown', this.handleKeyDown);
      this.addEventListener('keyup', this.handleKeyUp);
      this.addEventListener('focus', this.handleFocus);
      this.addEventListener('blur', this.handleBlur);
    }

    public override update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      super.update(changedProperties);

      if (changedProperties.has('disabled')) {
        this.setDisabled(this, this.disabled);
      }
      if (changedProperties.has('softDisabled')) {
        this.setSoftDisabled(this, this.softDisabled);
      }
      if (changedProperties.has('arialabel')) {
        this.setAriaLabel(this, this.ariaLabel);
      }
    }

    private setAriaLabel(element: HTMLElement, ariaLabel: string) {
      if (ariaLabel) {
        element.setAttribute('aria-label', ariaLabel);
      } else {
        element.removeAttribute('aria-label');
      }
    }

    private setSoftDisabled(element: HTMLElement, disabled: boolean) {
      if (disabled) {
        element.setAttribute('aria-disabled', 'true');
      } else {
        element.removeAttribute('aria-disabled');
      }
    }

    private setDisabled(element: HTMLElement, disabled: boolean) {
      if (disabled) {
        element.setAttribute('aria-disabled', 'true');
        element.setAttribute('tabindex', '-1');
      } else {
        element.removeAttribute('aria-disabled');
        element.setAttribute('tabindex', '0');
      }
    }

    public override render() {
      return html`
                <slot></slot>
        `;
    }

    private handleClick(event: MouseEvent) {
      if (!this.disabled && !this.softDisabled) {
        console.log('Button clicked', event.target);
      }
    }

    private handleFocus(event: FocusEvent) {
      if (this.softDisabled) {
        event.preventDefault();
      }
    }

    private handleBlur(event: FocusEvent) {
      if (this.softDisabled) {
        event.preventDefault();
      }
      this.classList.remove('active');
    }

    private handleKeyDown(event: KeyboardEvent) {
      if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        this.classList.add('active');
      }
    }

    private handleKeyUp(event: KeyboardEvent) {
      if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
        this.handleClick(event as unknown as MouseEvent);
        this.classList.remove('active');
      }
    }

    public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Button;
