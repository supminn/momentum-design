import Linkbutton from './linkbutton.component';
import { TAG_NAME } from './linkbutton.constants';
import '../icon';

Linkbutton.register(TAG_NAME);

declare global {
  interface HTMLElementTagNameMap {
    ['mdc-linkbutton']: Linkbutton;
  }
}

export default Linkbutton;
