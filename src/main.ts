import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

(async () => {
  // use mock server for development
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
