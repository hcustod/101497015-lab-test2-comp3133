import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

// init 
platformBrowser()
  .bootstrapModule(AppModule, {})
  .catch((err) => console.error(err));
