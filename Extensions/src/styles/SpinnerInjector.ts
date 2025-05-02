export class SpinnerInjector {
  inject(): void {
    if (document.getElementById('spinner-animation')) return;
    const spinnerStyle = document.createElement('style');
    spinnerStyle.id = 'spinner-animation';
    spinnerStyle.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(spinnerStyle);
  }
}