# Character Editor

## About

PROJECT IS CURRENTLY A PROTOTYPE

- CLI for D&D character JSON boilerplate
- JSON to PDF and Markdown converter for D&D character sheets
- JSON Schema for D&D characters

## Current Roadmap

- Character feature supports
- Character spellcasting
- Configurable character download locations
- Configurable character json locations
- CLI prompt for character level up
- CLI prompt for generating characters by class, race, background
- 5E fixtures import
- HTML exports
- Creature Schema
- Item Schema
- Spell Schema

## ENV

**Node:** v18.13.0

**NPM:** 8.19.3

## Setup

1. Clone the project ``
2. `npm i`

## NPM Scripts

- `build-types`: Generates Typescript types from schemas in `schemas/`. This should be run after any change is made to a file in the `schemas/` directory.
- `cli`: Runs the project cli. Run `npm run cli -- --help` for more information.
- `eslint`: Runs linting rules against Typescript.