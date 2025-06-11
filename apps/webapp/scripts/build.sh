#!/usr/bin/env bash

# vite build && \
nx vite:build && \
    pnpm lint && \
    rm -rf .vercel/output && \
    mkdir -p .vercel/output && \
    cp assets/vercel-config.json .vercel/output/config.json && \
    cp -r dist .vercel/output/static
