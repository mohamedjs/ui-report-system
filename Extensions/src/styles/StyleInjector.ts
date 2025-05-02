export class StyleInjector {
  inject(): void {
    if (document.getElementById('bug-highlight-styles')) return;

    const style = document.createElement('style');
    style.id = 'bug-highlight-styles';
    style.innerHTML = `
      .bug-highlight {
        outline: 2px dashed red !important;
        position: relative;
      }
      .flag-btn {
        position: absolute;
        top: 0;
        right: 0;
        background: rgb(40, 26, 232);
        color: white;
        font-size: 12px;
        padding: 4px 8px;
        cursor: pointer;
        z-index: 9999;
        border-radius: 4px;
        border: 1px solid #0d47a1;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
      }
      .flag-btn:hover {
        background: #0d47a1;
      }
      .flag-form {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 20px;
        z-index: 10000;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        width: 350px;
        font-family: Arial, sans-serif;
      }
      .flag-form textarea {
        width: 100%;
        min-height: 120px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        resize: vertical;
        color: #000;
      }
      .flag-form button {
        background: #1a73e8;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .flag-form button:hover {
        background: #0d47a1;
      }
      .flag-form-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
      }`;
    document.head.appendChild(style);
  }
}