import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InstallPromptService {
  deferredPrompt: any = null;

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  getPromptEvent() {
    return this.deferredPrompt;
  }

  clearPrompt() {
    this.deferredPrompt = null;
  }
}
