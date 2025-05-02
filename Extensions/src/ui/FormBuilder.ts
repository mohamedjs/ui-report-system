export class FormBuilder {
  static createFormTitle(titleText: string): HTMLDivElement {
    const title = document.createElement('div');
    title.className = 'flag-form-title';
    title.textContent = titleText;
    return title;
  }

  static createTextArea(placeholder: string): HTMLTextAreaElement {
    const textarea = document.createElement('textarea');
    textarea.placeholder = placeholder;
    return textarea;
  }

  static createButtonContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'flex-end';
    return container;
  }

  static createCancelButton(onClickHandler: () => void): HTMLButtonElement {
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.marginRight = '10px';
    cancelBtn.style.background = '#f1f1f1';
    cancelBtn.style.color = '#333';
    cancelBtn.onclick = onClickHandler;
    return cancelBtn;
  }

  static createSubmitButton(onClickHandler: () => void): HTMLButtonElement {
    const submit = document.createElement('button');
    submit.textContent = 'Submit Report';
    submit.onclick = onClickHandler;
    return submit;
  }
}