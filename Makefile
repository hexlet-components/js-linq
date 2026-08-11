install:
	pnpm install

docs:
	mkdir -p docs
	pnpm --silent run documentation -- build src/index.js -f md > docs/README.md

build:
	rm -rf dist
	pnpm run build

test:
	pnpm run test

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

publish:
	pnpm publish --access public --no-git-checks

.PHONY: test docs
