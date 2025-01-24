#! /usr/bin/env bash

tsc -b && vite build && rm -rf .vercel/output && mkdir .vercel/output && cp assets/vercel-config.json .vercel/output/config.json && cp -r dist .vercel/output/static
