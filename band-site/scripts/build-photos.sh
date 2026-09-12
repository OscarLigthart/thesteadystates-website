#!/bin/bash
# Regenerate web-sized photos + photos.json from a folder of originals.
# Usage: ./scripts/build-photos.sh ~/OscarLigthart/"The Steady States - Photos"
set -euo pipefail

SRC="${1:?usage: build-photos.sh <source-folder>}"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$DIR/public/photos"
JSON="$DIR/src/content/photos.json"

rm -rf "$OUT"
mkdir -p "$OUT/thumbs"

# DSCF first (the camera set), then phone shots, then everything else.
listing=$(cd "$SRC" && ls -1 | grep -iE '\.(jpg|jpeg|heic)$' || true)
files=$(printf '%s\n' "$listing" | grep -E '^DSCF' | sort
        printf '%s\n' "$listing" | grep -E '^IMG_' | sort
        printf '%s\n' "$listing" | grep -viE '^(DSCF|IMG_)' | sort)

tmp=$(mktemp)
while IFS= read -r f; do
  [ -n "$f" ] || continue
  # Slugify: spaces and dots in basenames make for miserable URLs.
  base=$(printf '%s' "${f%.*}" | tr -cs '[:alnum:]-' '-' | tr '[:upper:]' '[:lower:]' | sed 's/-*$//')
  sips -Z 1500 -s format jpeg -s formatOptions 74 "$SRC/$f" --out "$OUT/$base.jpg" >/dev/null
  sips -Z 700  -s format jpeg -s formatOptions 68 "$SRC/$f" --out "$OUT/thumbs/$base.jpg" >/dev/null
  sips -g pixelWidth -g pixelHeight "$OUT/$base.jpg" \
    | awk -v s="$base.jpg" '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{printf "  { \"src\": \"%s\", \"w\": %s, \"h\": %s }\n", s, w, h}' >> "$tmp"
done <<< "$files"

{ echo "["; sed '$!s/$/,/' "$tmp"; echo "]"; } > "$JSON"
rm -f "$tmp"

echo "$(grep -c '"src"' "$JSON") photos -> $OUT"
