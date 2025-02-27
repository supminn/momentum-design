import { CSSResult, html, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { v4 as uuidv4 } from 'uuid';
import { DataAriaLabelMixin } from '../../utils/mixins/DataAriaLabelMixin';
import { NameMixin } from '../../utils/mixins/NameMixin';
import { ValueMixin } from '../../utils/mixins/ValueMixin';
import FormfieldWrapper from '../formfieldwrapper/formfieldwrapper.component';
import { DEFAULTS as FORMFIELD_DEFAULTS } from '../formfieldwrapper/formfieldwrapper.constants';
import type { ValidationType } from '../formfieldwrapper/formfieldwrapper.types';
import { ICON_NAME } from './checkbox.constants';
import styles from './checkbox.styles';

/**
 * Checkboxes allow users to select multiple options from a list or turn an item/feature on or off.
 * These are often used in forms, settings, and selections in lists.
 *
 * A checkbox component contains an optional label and an optional helper text.
 *
 * To create a group of checkboxes, use the FormFieldGroup component.
 *
 * @dependency mdc-icon
 *
 * @tagname mdc-checkbox
 *
 * @event change - (React: onChange) Event that gets dispatched when the checkbox state changes.
 * @event focus - (React: onFocus) Event that gets dispatched when the checkbox receives focus.
 *
 * @cssproperty --mdc-checkbox-background-color-hover - Allows customization of the background color on hover.
 * @cssproperty --mdc-checkbox-border-color - Border color in high contrast.
 * @cssproperty --mdc-checkbox-checked-background-color - Background color for a selected checkbox.
 * @cssproperty --mdc-checkbox-checked-background-color-hover - Background color for a selected checkbox when hovered.
 * @cssproperty --mdc-checkbox-checked-pressed-icon-color - Background color for a selected checkbox when pressed.
 * @cssproperty --mdc-checkbox-disabled-background-color - Background color for a disabled checkbox.
 * @cssproperty --mdc-checkbox-disabled-border-color - Border color for a disabled checkbox.
 * @cssproperty --mdc-checkbox-disabled-checked-icon-color - Background color for a disabled, selected checkbox.
 * @cssproperty --mdc-checkbox-disabled-icon-color - Icon color for a disabled checkbox.
 * @cssproperty --mdc-checkbox-icon-background-color - Background color for an unselected checkbox.
 * @cssproperty --mdc-checkbox-icon-border-color - Default background color for an unselected checkbox.
 * @cssproperty --mdc-checkbox-icon-color - Icon color for an unselected checkbox.
 * @cssproperty --mdc-checkbox-pressed-icon-color - Background color for a selected checkbox when pressed.
 */
class Checkbox extends NameMixin(ValueMixin(DataAriaLabelMixin(FormfieldWrapper))) {
  /**
   * Determines whether the checkbox is selected or unselected.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * This property is used to determine the parent checkbox in a nested checkbox group.
   * If any one of the children is unselected, then the parent checkbox will be indeterminate.
   * If all children are either selected or unselected, then the parent checkbox will not be indeterminate.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** @internal */
  private internals: ElementInternals;

  /** @internal */
  static formAssociated = true;

  /** @internal */
  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  constructor() {
    super();

    this.internals = this.attachInternals();
    // Checkbox does not contain helpTextType property.
    this.helpTextType = undefined as unknown as ValidationType;
    this.id = `mdc-input-${uuidv4()}`;
  }

  /**
   * Updates the form value to reflect the current state of the checkbox.
   * If checked, the value is set to either the user-provided value or 'on' if no value is provided.
   * If unchecked, the value is set to null.
   */
  private setFormValue() {
    let actualValue: string | null = null;

    if (this.checked) {
      actualValue = !this.value ? 'on' : this.value;
    }

    this.internals.setFormValue(actualValue);
  }

  /**
   * Toggles the state of the checkbox element.
   * If the element is not disabled, then
   * the checked property is toggled and the indeterminate property is set to false.
   */
  private toggleState(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
    }
  }

  /**
   * Toggles the state of the checkbox element.
   * and dispatch the new change event.
   */
  public handleChange(event: Event): void {
    this.toggleState();
    const EventConstructor = event.constructor as typeof Event;
    this.dispatchEvent(new EventConstructor(event.type, event));
  }

  /**
   * Handles the keydown event on the checkbox.
   * When the user presses Enter, the form is submitted.
   * @param event - The keyboard event.
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.form?.requestSubmit();
    }
  }

  public override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has('checked')) {
      this.setFormValue();
    }
  }

  public override render() {
    const checkboxIconContent = (this.checked || this.indeterminate) ? html`
      <mdc-icon
        class="icon"
        name="${this.indeterminate ? ICON_NAME.INDETERMINATE : ICON_NAME.CHECKED}"
        size="1"
        length-unit="rem"
      ></mdc-icon>
    ` : nothing;
    const helpTextContent = this.helpText ? this.renderHelperText() : nothing;

    return html`
      <div class="container mdc-focus-ring">
        <input
          id="${this.id}"
          type="checkbox"
          class="input"
          name="${ifDefined(this.name)}"
          value="${ifDefined(this.value)}"
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          .disabled="${this.disabled}"
          aria-label="${this.dataAriaLabel ?? ''}"
          aria-describedby="${FORMFIELD_DEFAULTS.HELPER_TEXT_ID}"
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
        />
        <div class="icon-container">${checkboxIconContent}</div>
      </div>
      <div class="text-container">
        ${this.renderLabel()}
        ${helpTextContent}
      </div>
    `;
  }

  public static override styles: Array<CSSResult> = [...FormfieldWrapper.styles, ...styles];
}

export default Checkbox;
