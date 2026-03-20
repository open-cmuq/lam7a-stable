#!/bin/bash
PDF_DIR="public/assets"
OUTPUT_DIR="public/magazine-pages"

for pdf in "$PDF_DIR"/*.pdf; do
  name=$(basename "$pdf" .pdf)
  if [ -d "$OUTPUT_DIR/$name" ]; then
    echo "Skipping $name (already exists)"
    continue
  fi
  mkdir -p "$OUTPUT_DIR/$name"
  pdftoppm -jpeg -r 150 "$pdf" "$OUTPUT_DIR/$name/page"
  echo "Done: $name"
done