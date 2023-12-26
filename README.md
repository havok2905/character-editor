# Character Editor

## About

PROJECT IS CURRENTLY A PROTOTYPE

- CLI for D&D character JSON boilerplate
- JSON to PDF and Markdown converter for D&D character sheets
- JSON Schema for D&D characters
- Typescript types for D&D development

## Current Roadmap

- Split type system from main project and add as dependency

## ENV

**Node:** v18.13.0

**NPM:** 8.19.3

## Setup

1. Clone the project ``
2. `npm i`

## NPM Scripts

- `build-all`: Runs all build commands
- `build-docs`: Generates documentation for Typescript types.
- `build-site`: Generates HTML and PDF files for characters in the build/ directory
- `build-types`: Generates Typescript types from schemas in `schemas/`. This should be run after any change is made to a file in the `schemas/` directory.
- `eslint`: Runs linting rules against Typescript.
- `generate-character`: generates a new blank character json file:
  - `npm run generate-character my-character`
  - `/assets/characters/my-character.character.json`

## Project Directory

- assets/ ( Files you generate that are specific to your project )
  - characters/
    - character-name.character.json ( .character.json is required for schema validation )
  - css/
    - main.css
    - reset.css
  - tokens/
    - token.png ( name referenced in character-name.character.json. Use only the file name and extension )
- bundle/ ( Files will be exported here in a flat format )
  - index.html ( Character directory )
  - character-name.html
  - character-name.pdf
  - main.css
  - reset.css
  - token.png
