# Contributing

Thank you for your interest in contributing to **nestjs-restate**! This guide covers everything you need to get started.

## Development Setup

### Prerequisites

- [mise](https://mise.jdx.dev/) — manages Node.js version
- [Docker](https://www.docker.com/) — runs the Restate server

```sh
mise install        # Install Node.js 22
yarn install        # Install dependencies
```

### Commands

| Command | Description |
| --- | --- |
| `yarn build` | Build the library (CJS + ESM + types) |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run unit tests in watch mode |
| `yarn test:e2e` | Run E2E tests (requires Docker) |
| `yarn test:coverage` | Run unit tests with coverage |
| `yarn lint` | Check lint and formatting |
| `yarn lint:fix` | Auto-fix lint and formatting |
| `yarn check:types` | Type-check with tsc |
| `yarn check:all` | Run all checks (lint, types, build, test, exports, package) |
| `yarn example:client` | Run SDK client against the example app |

### Running the Example App

The `example/` directory contains a working NestJS app that uses the library.

```sh
# Start the Restate server
yarn docker:up

# Start the example with live-reload (resolves library source directly)
yarn example:dev

# Or build the library first and run against built output
yarn example
```

Once running, the example registers itself with the Restate server automatically.

#### Sending Requests

The easiest way to interact with the example services is the SDK client script:

```sh
yarn example:client
```

This runs all three examples (counter, user session, signup workflow) using `@restatedev/restate-sdk-clients` and prints the results.

<details>
<summary>Or use curl</summary>

**Counter service** (stateless RPC):

```sh
curl -X POST http://localhost:8080/counter/add \
  -H 'content-type: application/json' \
  -d '{"a": 3, "b": 7}'
```

**User session** (virtual object with keyed state):

```sh
# Log in
curl -X POST http://localhost:8080/user-session/alice/login \
  -H 'content-type: application/json' \
  -d '"alice"'

# Get session (shared handler — concurrent reads)
curl -X POST http://localhost:8080/user-session/alice/getSession
```

**Signup workflow** (durable execution with signals):

```sh
# Start a signup workflow
curl -X POST http://localhost:8080/signup/user-123/run \
  -H 'content-type: application/json' \
  -d '{"email": "test@example.com", "name": "Test User"}'

# In another terminal, send the verification signal
curl -X POST http://localhost:8080/signup/user-123/verifyEmail
```

The workflow will block at the `ctx.promise("email-verified")` call until `verifyEmail` is invoked, demonstrating durable execution and signaling.

</details>

#### Stopping

```sh
yarn docker:down
```

## Architecture

```text
lib/
├── decorators/          # @Service, @VirtualObject, @Workflow, @Handler, @Run, @Shared, @InjectClient
├── discovery/           # RestateExplorer — discovers decorated classes via NestJS DiscoveryService
├── endpoint/            # RestateEndpointManager — manages HTTP/2 server lifecycle
├── restate.module.ts    # RestateModule.forRoot() / forRootAsync()
├── restate.constants.ts # DI tokens
└── restate.interfaces.ts # Type definitions
```

## Testing

Unit tests mirror the source structure under `test/unit/`. E2E tests with a real Restate server (via testcontainers) are in `test/e2e/`.

```sh
yarn test          # Unit tests only (fast, no Docker)
yarn test:e2e      # E2E tests (requires Docker)
```

SWC is required for tests because Vitest's esbuild transform doesn't support `emitDecoratorMetadata`, which NestJS dependency injection relies on.

## Pull Request Guidelines

- Keep PRs focused on a single change.
- Include tests for new functionality. If tests are not applicable, explain why in the PR description.
- Update documentation if the change affects the public API.
- Ensure CI passes before requesting review.
- Reference related issues in the PR description (e.g., `Fixes #123`).

## Reporting Bugs

Use the [Bug Report](https://github.com/zackautocracy/nestjs-restate/issues/new?template=bug_report.yml) template. Include a minimal reproduction.

## Requesting Features

Use the [Feature Request](https://github.com/zackautocracy/nestjs-restate/issues/new?template=feature_request.yml) template. Explain the use case and proposed API.

## Questions

For questions and help, use [GitHub Discussions](https://github.com/zackautocracy/nestjs-restate/discussions) instead of issues.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
