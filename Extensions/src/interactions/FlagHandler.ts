import { FormBuilder } from "../ui/FormBuilder";
import { ReportSender } from "../core/ReportSender";

export class FlagHandler {
  private sender = new ReportSender();

  createFlagForm(target: Element): void {
    const form = document.createElement('div');
    form.className = 'flag-form';

    const title = FormBuilder.createFormTitle('Report an Issue');
    const note = FormBuilder.createTextArea('Describe the issue...');
    const buttonContainer = FormBuilder.createButtonContainer();

    const cancelBtn = FormBuilder.createCancelButton(() => this.removeForm(form));
    const submitBtn = FormBuilder.createSubmitButton(() => this.sender.send(target, note.value, form));

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);
    form.appendChild(title);
    form.appendChild(note);
    form.appendChild(buttonContainer);

    document.body.appendChild(form);
  }

  private removeForm(form: HTMLElement): void {
    document.body.removeChild(form);
  }

  createFlagButton(target: Element): HTMLElement {
    const flag = document.createElement('div');
    flag.className = 'flag-btn';
    flag.textContent = '🚩';
    flag.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.createFlagForm(target);
    };
    return flag;
  }

  addFlagButtonOnHover(element: HTMLElement): void {
    element.addEventListener('mouseenter', () => {
      if (!element.querySelector('.flag-btn')) {
        element.appendChild(this.createFlagButton(element));
      }
    });
    element.addEventListener('mouseleave', () => {
      const flag = element.querySelector('.flag-btn');
      if (flag) element.removeChild(flag);
    });
  }

  handleLinkBehavior(linkElement: HTMLElement): void {
    linkElement.addEventListener('click', (e) => {
      const flagBtn = linkElement.querySelector('.flag-btn');
      if (flagBtn) {
        e.preventDefault();
        e.stopPropagation();
        flagBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
  }
}