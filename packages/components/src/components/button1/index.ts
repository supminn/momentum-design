import Button1 from './button1.component';
import { TAG_NAME } from './button1.constants';

Button1.register(TAG_NAME);

declare global {
    interface HTMLElementTagNameMap {
        ['mdc-button1']: Button1
    }
}

export default Button1;
