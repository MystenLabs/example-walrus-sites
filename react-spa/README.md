# SPA example

This is a simple example of a Single Page Application (SPA) that
can be deployed on Walrus Sites.

## Install
```bash
bun install
```

## Run
```bash
bun run dev
```

## Build
```bash
bun run build
```

## Deploy

```bash
bun run build && cp ws-resources.json /dist && site-builder publish /dist
```
