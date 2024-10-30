import { css } from 'lit';

const styles = css`
  :host {
    display: inline-block;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #7965c6;
    color: white;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s, border-color 0.3s;
  }

  .button:hover {
    background-color: #0056b3;
    border-color: #004085;
  }

  .button.disabled {
    background-color: #e0e0e0;
    border-color: #d0d0d0;
    color: #a0a0a0;
    cursor: not-allowed;
  }

  .button:active {
    background-color: #2c8500;
    border-color: #003057;
  }
  .button:focus {
    outline: 0.125rem solid #f5fb3c;
  }
`;

export default [styles];
