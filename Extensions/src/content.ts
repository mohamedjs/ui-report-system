import { StyleInjector } from "./styles/StyleInjector";
import { FlagHandler } from "./interactions/FlagHandler";

export class UIReportSystem {
  private styleInjector = new StyleInjector();
  private flagHandler = new FlagHandler();

  public start(): void {
    if (document.readyState === 'complete') {
      this.initialize();
    } else {
      window.addEventListener('load', () => this.initialize());
    }
  }

  private initialize(): void {
    setInterval(() => {
      this.styleInjector.inject();
      const elements = document.querySelectorAll('button, a');
      elements.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        if (el.closest('.flag-form')) return;
        el.classList.add('bug-highlight');
        this.flagHandler.addFlagButtonOnHover(el);
        if (el.tagName.toLowerCase() === 'a') {
          this.flagHandler.handleLinkBehavior(el);
        }
      });
    }, 500);
  }
}