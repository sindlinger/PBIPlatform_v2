#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MUNICIPIOS_TOPO = path.join(
  ROOT,
  "TJPB_Honorarios_Intuitivo.Report/StaticResources/SharedResources/Shapemaps/paraiba.municipios.topo.json"
);
const COMARCAS_TOPO = path.join(
  ROOT,
  "TJPB_Honorarios_Intuitivo.Report/StaticResources/SharedResources/Shapemaps/paraiba.comarcas.topo.json"
);
const CSV_PATH = path.join(ROOT, "municipios_comarcas_pb_2026_mapa.csv");

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").trim().split(/\r?\n/);
  const rows = [];

  for (const line of lines.slice(1)) {
    const match = line.match(/^([^,]*),([^,]*),(.*)$/);
    if (!match) continue;
    rows.push({
      municipioNorm: match[1].trim(),
      municipio: match[2].trim(),
      comarca: match[3].trim(),
    });
  }

  return rows;
}

function main() {
  const topo = JSON.parse(fs.readFileSync(MUNICIPIOS_TOPO, "utf8"));
  const rows = parseCsv(CSV_PATH);
  const objectName = Object.keys(topo.objects)[0];

  if (!objectName || !topo.objects[objectName]?.geometries) {
    throw new Error("TopoJSON de municipios invalido.");
  }

  const mapping = new Map();
  for (const row of rows) {
    mapping.set(normalize(row.municipioNorm || row.municipio), row);
  }

  const missing = [];
  for (const geometry of topo.objects[objectName].geometries) {
    const originalName = geometry.properties?.name ?? geometry.properties?.municipio;
    const key = normalize(originalName);
    const row = mapping.get(key);

    if (!row) {
      missing.push(originalName);
      continue;
    }

    geometry.properties = {
      ...geometry.properties,
      municipio: row.municipio,
      municipio_norm: row.municipioNorm,
      comarca: row.comarca,
      comarca_mapa: row.comarca,
      name: row.comarca,
      description: row.comarca,
    };
  }

  if (missing.length > 0) {
    throw new Error(
      `Municipios sem comarca mapeada: ${missing.slice(0, 10).join(", ")}${
        missing.length > 10 ? " ..." : ""
      }`
    );
  }

  fs.writeFileSync(COMARCAS_TOPO, `${JSON.stringify(topo, null, 2)}\n`);
  console.log(
    `Arquivo gerado: ${path.relative(ROOT, COMARCAS_TOPO)} (${topo.objects[objectName].geometries.length} geometrias)`
  );
}

main();
