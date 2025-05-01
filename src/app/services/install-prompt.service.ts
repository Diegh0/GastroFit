import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InstallPromptService {
  private deferredPromptSubject = new BehaviorSubject<any>(null);

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPromptSubject.next(event);
    });
  }

  getPromptEvent$() {
    return this.deferredPromptSubject.asObservable();
  }

  getPromptEvent() {
    return this.deferredPromptSubject.getValue();
  }

  clearPrompt() {
    this.deferredPromptSubject.next(null);
  }
}
