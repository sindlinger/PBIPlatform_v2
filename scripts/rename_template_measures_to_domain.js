#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TARGET_DIRS = [
  path.join(ROOT, "TJPB_Honorarios_Intuitivo.SemanticModel/definition"),
  path.join(ROOT, "TJPB_Honorarios_Intuitivo.Report/definition"),
];

const MEASURE_RENAMES = [
  ["Sales Card Subtitle Tooltip", "Subtítulo Card Valor Arbitrado Tooltip"],
  ["YoY Daily Sales Card Subtitle", "Subtítulo Card Valor Médio por Perícia YoY"],
  ["YoY Orders Total Card Subtitle", "Subtítulo Card Peritos Distintos YoY"],
  ["YoY Units Sold Card Subtitle", "Subtítulo Card Qtd Perícias YoY"],
  ["YoY Sales Card Subtitle", "Subtítulo Card Valor Arbitrado YoY"],
  ["YoY Profit Card Subtitle", "Subtítulo Card Saldo a Receber YoY"],
  ["Label Bar City Sales %", "Rótulo Barra Vara Valor %"],
  ["Label Return Category %", "Rótulo Categoria Retorno %"],
  ["Label City Sales %", "Rótulo Vara Valor %"],
  ["Annual Avg Line Fixed", "Linha Média Anual Fixa"],
  ["Total Sales RM João Pessoa", "Valor Arbitrado RM João Pessoa"],
  ["Total Sales Tooltip", "Valor Arbitrado Tooltip"],
  ["Daily Sales YoY %", "Valor Médio por Perícia YoY %"],
  ["Daily Sales YoY", "Valor Médio por Perícia YoY"],
  ["Orders Total YoY %", "Peritos Distintos YoY %"],
  ["Orders Total YoY", "Peritos Distintos YoY"],
  ["Units Sold YoY %", "Qtd Perícias YoY %"],
  ["Units Sold YoY", "Qtd Perícias YoY"],
  ["Profit YoY %", "Saldo a Receber YoY %"],
  ["Profit YoY", "Saldo a Receber YoY"],
  ["Sales Card Subtitle", "Subtítulo Card Valor Arbitrado"],
  ["Sales MoM Label", "Rótulo Variação Mensal Valor Arbitrado"],
  ["Sales MoM %", "Variação Mensal Valor Arbitrado %"],
  ["Sales MoM", "Variação Mensal Valor Arbitrado"],
  ["Sales YoY %", "Valor Arbitrado YoY %"],
  ["Sales City Label", "Rótulo Vara Valor"],
  ["SMA Sales (N)", "Média Móvel Valor Arbitrado (N)"],
  ["StdDev Sales (N)", "Desvio Padrão Valor Arbitrado (N)"],
  ["Lower Band (N)", "Banda Inferior (N)"],
  ["Upper Band (N)", "Banda Superior (N)"],
  ["SMA Sales 2Y", "Média Móvel Valor Arbitrado 2A"],
  ["SMA Units Sold 2Y", "Média Móvel Qtd Perícias 2A"],
  ["SMA Profit 2Y", "Média Móvel Saldo a Receber 2A"],
  ["SMA Return 2Y", "Média Móvel Retornos 2A"],
  ["Count Orders Returned", "Qtd Retornos"],
  ["Returns YoY %", "Retornos YoY %"],
  ["% Sales Total", "% Valor Arbitrado Total"],
  ["% Sales", "% Valor Arbitrado"],
  ["Avg Order Value", "Valor Médio por Perito"],
  ["Avg Daily Sales", "Média Diária Valor Arbitrado"],
  ["Avg Sales", "Valor Médio por Perícia Base"],
  ["Total Profit", "Saldo a Receber Base"],
  ["Sales Color", "Cor Valor Arbitrado"],
  ["Sales YoY", "Valor Arbitrado YoY"],
  ["Total Sales", "Valor Arbitrado Base"],
  ["Units Sold", "Qtd Perícias Base"],
  ["Orders Total", "Peritos Distintos Base"],
];

const SORTED_RENAMES = [...MEASURE_RENAMES].sort((a, b) => b[0].length - a[0].length);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith(".json") || entry.name.endsWith(".tmdl"))) {
      out.push(fullPath);
    }
  }
  return out;
}

function replaceTmdlContent(content) {
  let next = content;
  for (const [oldName, newName] of SORTED_RENAMES) {
    next = next.replaceAll(`measure '${oldName}'`, `measure '${newName}'`);
    next = next.replaceAll(`[${oldName}]`, `[${newName}]`);
    next = next.replaceAll(`"ConceptualProperty": "${oldName}"`, `"ConceptualProperty": "${newName}"`);
  }
  return next;
}

function transformJsonValue(value) {
  if (Array.isArray(value)) {
    return value.map(transformJsonValue);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = transformJsonValue(child);
    }
    return out;
  }
  if (typeof value !== "string") {
    return value;
  }

  let next = value;
  for (const [oldName, newName] of SORTED_RENAMES) {
    if (next === oldName) {
      next = newName;
      continue;
    }
    if (next === `Measure.${oldName}`) {
      next = `Measure.${newName}`;
      continue;
    }
    if (next === `FactPericias.${oldName}`) {
      next = `FactPericias.${newName}`;
      continue;
    }
  }
  return next;
}

function main() {
  let updatedFiles = 0;

  for (const baseDir of TARGET_DIRS) {
    for (const filePath of walk(baseDir)) {
      const original = fs.readFileSync(filePath, "utf8");
      let updated = original;

      if (filePath.endsWith(".tmdl")) {
        updated = replaceTmdlContent(original);
      } else if (filePath.endsWith(".json")) {
        const parsed = JSON.parse(original);
        updated = JSON.stringify(transformJsonValue(parsed), null, 2);
        if (!updated.endsWith("\n")) updated += "\n";
      }

      if (updated !== original) {
        fs.writeFileSync(filePath, updated, "utf8");
        updatedFiles += 1;
      }
    }
  }

  console.log(`Arquivos atualizados: ${updatedFiles}`);
}

main();
