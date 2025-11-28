import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// use async to make sure the Mock Server Worker is initialized
// before the Angular bootstrap runs.
(async () => {
  // use mock server only for development
  if (!environment.production) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
})();
