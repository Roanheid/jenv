# Jenv

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Assessment

Een kleine toelichting voor bepaalde keuzes.

### Mock Service Worker

Voor fake API calls heb ik [Mock Service Worker](https://mswjs.io/) gebruikt. Het voordeel hiervan is dat de api calls, gebruikt in data.service.ts, conform normale api request zijn.
De api mocks zijn gedefinieerd in /mocks/handers.ts.

### Angular Material

Voor het toevoegen van eenvoudige styling heb ik gebruik gemaakt van Angular Material.

### Playwright

Er zijn geen e2e tests toegevoegd, maar er is wel rekening gehouden door data-testid's toe te voegen op interactieve elementen.

### VSCode

In dit scenario heb ik VSCode gerbuikt. Ik heb .vscode/settings.json toegevoegd aan de repo, met het idee dat in een team waar VSCode gerbruikt wordt we zoveel mogelijk dezelfde settings willen hebben om de code zo consistent mogelijk te houden.

---

<br>
<br>

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
