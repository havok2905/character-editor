# Character Editor

## About

PROJECT IS CURRENTLY A PROTOTYPE

- CLI for D&D character JSON boilerplate
- JSON to PDF and Markdown converter for D&D character sheets
- JSON Schema for D&D characters
- Typescript types for D&D development

## Current Roadmap

- Add HTML views and cli command
- Single export command: export-all
- Split type system from CLI project into its own repo and add as dependency

## ENV

**Node:** v18.13.0

**NPM:** 8.19.3

## Setup

1. Clone the project ``
2. `npm i`

## NPM Scripts

- `build-all`: Generates documentation for Typescript types, as well as the Typescript types.
- `build-docs`: Generates documentation for Typescript types.
- `build-types`: Generates Typescript types from schemas in `schemas/`. This should be run after any change is made to a file in the `schemas/` directory.
- `cli`: Runs the project cli. Run `npm run cli -- --help` for more information.
- `eslint`: Runs linting rules against Typescript.