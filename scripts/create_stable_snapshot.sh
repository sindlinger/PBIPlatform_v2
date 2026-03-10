#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP="$(date +%Y%m%d_%H%M%S)"
LABEL="${1:-stable}"
LABEL_SAFE="$(printf '%s' "$LABEL" | tr ' /:' '___')"
SNAP_DIR="$ROOT_DIR/.stable_snapshots/${STAMP}_${LABEL_SAFE}"

REPORT_DEF="$ROOT_DIR/TJPB_Honorarios_Intuitivo.Report/definition"
SEM_DEF="$ROOT_DIR/TJPB_Honorarios_Intuitivo.SemanticModel/definition"
REPORT_SHAPEMAPS="$ROOT_DIR/TJPB_Honorarios_Intuitivo.Report/StaticResources/SharedResources/Shapemaps"

if [[ ! -d "$REPORT_DEF" || ! -d "$SEM_DEF" || ! -d "$REPORT_SHAPEMAPS" ]]; then
  echo "Erro: pastas de definition nao encontradas." >&2
  exit 1
fi

mkdir -p "$SNAP_DIR"
cp -a "$REPORT_DEF" "$SNAP_DIR/report_definition"
cp -a "$SEM_DEF" "$SNAP_DIR/semantic_definition"
cp -a "$REPORT_SHAPEMAPS" "$SNAP_DIR/shapemaps"

{
  echo "snapshot=.stable_snapshots/$(basename "$SNAP_DIR")"
  echo "created_at=$(date --iso-8601=seconds)"
  echo "label=$LABEL"
  echo "git_head=$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || echo 'N/A')"
} > "$SNAP_DIR/SNAPSHOT_INFO.txt"

echo "$SNAP_DIR"
