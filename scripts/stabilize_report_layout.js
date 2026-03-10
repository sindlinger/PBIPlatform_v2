#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_ROOT = path.join(ROOT, "TJPB_Honorarios_Intuitivo.Report/definition");
const BOOKMARKS_PATH = path.join(REPORT_ROOT, "bookmarks/bookmarks.json");

const CLUTTER_BY_PAGE = {
  f1a9c2e7d4b86350a1f2: [
    "1d2bf754849f2eb3a1c4",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
    "3e202c899a219224eeda",
    "3fea9ba1c661c6351617",
    "1739478bd49483122228",
    "22ba063c90e68076b970",
    "1048cefdb040cdce33a1",
    "1ec0e6adc7607be01bdd",
    "b694d29a4c11a137c61b",
    "f67a89c63b41e2a74038",
    "f50b5f3f7adbc05538c2",
    "af3f9894527568b0e740",
    "fba41a1b2b97999cb526",
    "7db8e1e4e0e07260615d",
    "b8d44ef6ce0756956055",
    "b727836e5487c202b4ac",
    "6f0d087c1e76a073b65c",
    "3a3188eca02b6073755a",
  ],
  b2d4e6f8a1c34567d890: [
    "1d2bf754849f2eb3a1c4",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
    "3e202c899a219224eeda",
    "3fea9ba1c661c6351617",
    "1739478bd49483122228",
    "22ba063c90e68076b970",
    "1048cefdb040cdce33a1",
    "1ec0e6adc7607be01bdd",
    "b694d29a4c11a137c61b",
    "f67a89c63b41e2a74038",
    "f50b5f3f7adbc05538c2",
    "af3f9894527568b0e740",
    "fba41a1b2b97999cb526",
    "7db8e1e4e0e07260615d",
    "b8d44ef6ce0756956055",
    "b727836e5487c202b4ac",
    "6f0d087c1e76a073b65c",
    "3a3188eca02b6073755a",
  ],
  c3e5f7a9b2d46810e123: [
    "1d2bf754849f2eb3a1c4",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
    "3e202c899a219224eeda",
    "3fea9ba1c661c6351617",
    "1739478bd49483122228",
    "22ba063c90e68076b970",
    "1048cefdb040cdce33a1",
    "1ec0e6adc7607be01bdd",
    "b694d29a4c11a137c61b",
    "f67a89c63b41e2a74038",
    "f50b5f3f7adbc05538c2",
    "af3f9894527568b0e740",
    "fba41a1b2b97999cb526",
    "7db8e1e4e0e07260615d",
    "b8d44ef6ce0756956055",
    "b727836e5487c202b4ac",
    "6f0d087c1e76a073b65c",
    "3a3188eca02b6073755a",
  ],
  "480be36186f85cc3c324": [
    "1d2bf754849f2eb3a1c4",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
    "94a45d6d2279208770ef",
    "3e202c899a219224eeda",
    "3fea9ba1c661c6351617",
    "1739478bd49483122228",
    "22ba063c90e68076b970",
    "1048cefdb040cdce33a1",
    "f67a89c63b41e2a74038",
    "1ec0e6adc7607be01bdd",
    "f8b1564b60ef32bcfa87",
    "f50b5f3f7adbc05538c2",
    "af3f9894527568b0e740",
    "fba41a1b2b97999cb526",
    "7db8e1e4e0e07260615d",
    "b8d44ef6ce0756956055",
    "b727836e5487c202b4ac",
    "6f0d087c1e76a073b65c",
    "3a3188eca02b6073755a",
  ],
};

const CHART_TYPE_TOGGLE_PAGES = {
  f1a9c2e7d4b86350a1f2: {
    navigatorId: "9c4a2d1e7b8f4a11b001",
    bookmarkGroupId: "7ab3e915c24d4f998102",
    bookmarkGroupDisplayName: "Tipo de grafico Varas",
    modeLabelId: "f8b1564b60ef32bcfa87",
    defaultBookmarkId: "f5d1f44f0ecb4688a001",
    bookmarks: {
      hist: "f5d1f44f0ecb4688a001",
      line: "f5d1f44f0ecb4688a002",
      bar: "f5d1f44f0ecb4688a003",
      area: "f5d1f44f0ecb4688a004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    wrappers: {
      hist: "gf1a9c2e7d4b86301",
      line: "gf1a9c2e7d4b86302",
      bar: "gf1a9c2e7d4b86303",
      area: "gf1a9c2e7d4b86304",
    },
    visuals: {
      hist: "07c5dfc89d70d1658ac3",
      line: "c35f2c23e04ae096e02f",
      bar: "cdc1b6c2cd04d7b04dd7",
      area: "e1f2a3b4c5d6e7f80910",
    },
  },
  b2d4e6f8a1c34567d890: {
    navigatorId: "9c4a2d1e7b8f4a11b002",
    bookmarkGroupId: "7ab3e915c24d4f998103",
    bookmarkGroupDisplayName: "Tipo de grafico Peritos",
    modeLabelId: "f8b1564b60ef32bcfa87",
    defaultBookmarkId: "f5d1f44f0ecb4688b001",
    bookmarks: {
      hist: "f5d1f44f0ecb4688b001",
      line: "f5d1f44f0ecb4688b002",
      bar: "f5d1f44f0ecb4688b003",
      area: "f5d1f44f0ecb4688b004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    wrappers: {
      hist: "gb2d4e6f8a1c34501",
      line: "gb2d4e6f8a1c34502",
      bar: "gb2d4e6f8a1c34503",
      area: "gb2d4e6f8a1c34504",
    },
    visuals: {
      hist: "07c5dfc89d70d1658ac3",
      line: "c35f2c23e04ae096e02f",
      bar: "cdc1b6c2cd04d7b04dd7",
      area: "f1e2d3c4b5a697887766",
    },
  },
  c3e5f7a9b2d46810e123: {
    navigatorId: "9c4a2d1e7b8f4a11b003",
    bookmarkGroupId: "7ab3e915c24d4f998104",
    bookmarkGroupDisplayName: "Tipo de grafico Especialidades",
    modeLabelId: "f8b1564b60ef32bcfa87",
    defaultBookmarkId: "f5d1f44f0ecb4688c001",
    bookmarks: {
      hist: "f5d1f44f0ecb4688c001",
      line: "f5d1f44f0ecb4688c002",
      bar: "f5d1f44f0ecb4688c003",
      area: "f5d1f44f0ecb4688c004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    wrappers: {
      hist: "gc3e5f7a9b2d46801",
      line: "gc3e5f7a9b2d46802",
      bar: "gc3e5f7a9b2d46803",
      area: "gc3e5f7a9b2d46804",
    },
    visuals: {
      hist: "07c5dfc89d70d1658ac3",
      line: "c35f2c23e04ae096e02f",
      bar: "cdc1b6c2cd04d7b04dd7",
      area: "a1b2c3d4e5f607182736",
    },
  },
};

const CHART_TYPE_TOP_OUTER_PANEL_ID = "3943a8f5dc4bb830b9ae";
const CHART_TYPE_TOP_INNER_PANEL_ID = "c06e3ec2d2d69b43427e";
const CHART_TYPE_UNUSED_PANEL_IDS = [
  "acee2d020bb8c1c4903b",
  "5c438973c435b483aa95",
];

const TOP_GRAPH_PAGES = {
  fe4687310000e672d410: {
    pageId: "fe4687310000e672d410",
    navigatorId: "9c4a2d1e7b8f4a11b004",
    bookmarkGroupId: "7ab3e915c24d4f998105",
    bookmarkGroupDisplayName: "Tipo de grafico Overview",
    defaultBookmarkId: "f5d1f44f0ecb4688d001",
    topSlotPosition: {
      x: 216.45834164877184,
      y: 234.76901707525406,
      z: 8000,
      height: 132.0984441481931,
      width: 602.2904309925042,
      tabOrder: 0,
    },
    bookmarks: {
      hist: "f5d1f44f0ecb4688d001",
      line: "f5d1f44f0ecb4688d002",
      bar: "f5d1f44f0ecb4688d003",
      area: "f5d1f44f0ecb4688d004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    groups: {
      hist: "gfe4687310000e601",
      line: "gfe4687310000e602",
      bar: "gfe4687310000e603",
      area: "gfe4687310000e604",
    },
  },
  d4f6a8c0b3e57921f234: {
    pageId: "d4f6a8c0b3e57921f234",
    navigatorId: "9c4a2d1e7b8f4a11b005",
    bookmarkGroupId: "7ab3e915c24d4f998106",
    bookmarkGroupDisplayName: "Tipo de grafico Comarcas",
    defaultBookmarkId: "f5d1f44f0ecb4688e001",
    topSlotPosition: {
      x: 216.45834164877184,
      y: 234.76901707525406,
      z: 8000,
      height: 132.0984441481931,
      width: 602.2904309925042,
      tabOrder: 0,
    },
    bookmarks: {
      hist: "f5d1f44f0ecb4688e001",
      line: "f5d1f44f0ecb4688e002",
      bar: "f5d1f44f0ecb4688e003",
      area: "f5d1f44f0ecb4688e004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    groups: {
      hist: "gd4f6a8c0b3e57901",
      line: "gd4f6a8c0b3e57902",
      bar: "gd4f6a8c0b3e57903",
      area: "gd4f6a8c0b3e57904",
    },
  },
  a6f4e2b9c1d34780ef12: {
    pageId: "a6f4e2b9c1d34780ef12",
    navigatorId: "9c4a2d1e7b8f4a11b005",
    bookmarkGroupId: "7ab3e915c24d4f998107",
    bookmarkGroupDisplayName: "Tipo de grafico RM Joao Pessoa",
    defaultBookmarkId: "f5d1f44f0ecb4688f001",
    topSlotPosition: {
      x: 216.45834164877184,
      y: 234.76901707525406,
      z: 8000,
      height: 132.0984441481931,
      width: 602.2904309925042,
      tabOrder: 0,
    },
    bookmarks: {
      hist: "f5d1f44f0ecb4688f001",
      line: "f5d1f44f0ecb4688f002",
      bar: "f5d1f44f0ecb4688f003",
      area: "f5d1f44f0ecb4688f004",
    },
    bookmarkLabels: {
      hist: "Histograma",
      line: "Linha",
      bar: "Barras",
      area: "Área",
    },
    groups: {
      hist: "ga6f4e2b9c1d34701",
      line: "ga6f4e2b9c1d34702",
      bar: "ga6f4e2b9c1d34703",
      area: "ga6f4e2b9c1d34704",
    },
  },
};

const TOP_GRAPH_VISUALS = {
  fe4687310000e672d410: {
    hist: "b6174e917cba1a6c4b66",
    line: "aa22bb33cc44dd55ee66",
    bar: "bb33cc44dd55ee66ff77",
    area: "ee66ff778899aa00bb11",
  },
  d4f6a8c0b3e57921f234: {
    hist: "b6174e917cba1a6c4b66",
    line: "cc44dd55ee66ff778899",
    bar: "dd55ee66ff778899aa00",
    area: "ff77aa8899bb00cc11dd",
  },
  a6f4e2b9c1d34780ef12: {
    hist: "b6174e917cba1a6c4b66",
    line: "cc44dd55ee66ff778899",
    bar: "dd55ee66ff778899aa00",
    area: "ff77aa8899bb00cc11dd",
  },
};

const RM_JOAO_PESSOA_TOGGLE_CONFIG = {
  pageId: "a6f4e2b9c1d34780ef12",
  left: {
    bookmarkGroupId: "a6f4rmjp-left-toggle",
    bookmarkGroupDisplayName: "RM Joao Pessoa Toggle Left",
    navigatorId: "e4f886c778183b7d6274",
    defaultBookmarkId: "a6f4rmjp-left-category",
    groupIds: {
      category: "216b5a259063013b5d69",
      product: "b76ef7c0bcd3318585d6",
    },
    bookmarks: {
      category: {
        id: "a6f4rmjp-left-category",
        displayName: "Category",
      },
      product: {
        id: "a6f4rmjp-left-product",
        displayName: "Product",
      },
    },
  },
  right: {
    bookmarkGroupId: "a6f4rmjp-right-toggle",
    bookmarkGroupDisplayName: "RM Joao Pessoa Toggle Right",
    navigatorId: "86a9222c6d0de10c5604",
    defaultBookmarkId: "a6f4rmjp-right-range",
    groupIds: {
      specialty: "0a67c55e012b45db0585",
      range: "781ea67c59c51a0a5292",
    },
    bookmarks: {
      specialty: {
        id: "a6f4rmjp-right-specialty",
        displayName: "Especialidade",
      },
      range: {
        id: "a6f4rmjp-right-range",
        displayName: "Faixa de Valor",
      },
    },
  },
};

const RM_CAMPINA_TOGGLE_CONFIG = {
  pageId: "e5a1b2c3d4f60789ab01",
  left: {
    bookmarkGroupId: "e5a1campina-left-toggle",
    bookmarkGroupDisplayName: "RM Campina Toggle Left",
    navigatorId: "e4f886c778183b7d6274",
    defaultBookmarkId: "e5a1campina-left-product",
    groupIds: {
      category: "216b5a259063013b5d69",
      product: "b76ef7c0bcd3318585d6",
    },
    bookmarks: {
      category: {
        id: "e5a1campina-left-category",
        displayName: "Category",
      },
      product: {
        id: "e5a1campina-left-product",
        displayName: "Product",
      },
    },
  },
  right: {
    bookmarkGroupId: "e5a1campina-right-toggle",
    bookmarkGroupDisplayName: "RM Campina Toggle Right",
    navigatorId: "86a9222c6d0de10c5604",
    defaultBookmarkId: "e5a1campina-right-specialty",
    groupIds: {
      specialty: "0a67c55e012b45db0585",
      range: "781ea67c59c51a0a5292",
    },
    bookmarks: {
      specialty: {
        id: "e5a1campina-right-specialty",
        displayName: "Especialidade",
      },
      range: {
        id: "e5a1campina-right-range",
        displayName: "Faixa de Valor",
      },
    },
  },
};

const COMARCAS_TOGGLE_CONFIG = {
  pageId: "d4f6a8c0b3e57921f234",
  left: {
    bookmarkGroupId: "d4f6comarcas-left-toggle",
    bookmarkGroupDisplayName: "Comarcas Toggle Left",
    navigatorId: "e4f886c778183b7d6274",
    defaultBookmarkId: "d4f6comarcas-left-category",
    groupIds: {
      category: "216b5a259063013b5d69",
      product: "b76ef7c0bcd3318585d6",
    },
    bookmarks: {
      category: {
        id: "d4f6comarcas-left-category",
        displayName: "Category",
      },
      product: {
        id: "d4f6comarcas-left-product",
        displayName: "Product",
      },
    },
  },
  right: {
    bookmarkGroupId: "d4f6comarcas-right-toggle",
    bookmarkGroupDisplayName: "Comarcas Toggle Right",
    navigatorId: "86a9222c6d0de10c5604",
    defaultBookmarkId: "d4f6comarcas-right-specialty",
    groupIds: {
      specialty: "0a67c55e012b45db0585",
      range: "781ea67c59c51a0a5292",
    },
    bookmarks: {
      specialty: {
        id: "d4f6comarcas-right-specialty",
        displayName: "Especialidade",
      },
      range: {
        id: "d4f6comarcas-right-range",
        displayName: "Faixa de Valor",
      },
    },
  },
};

const KPI_TEXTBOX_FIXES = {
  f1a9c2e7d4b86350a1f2: {
    primary: {
      labelId: "6c0677c0a3030b809b8c",
      valueId: "b12f05ed128090ccb600",
      label: "Variacao Mensal (%)",
      measure: "Variação Mensal %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
    secondary: {
      labelId: "6c8d5882eee0b47898c1",
      valueId: "8d3b844d9e399d19bb03",
      label: "Variacao Anual (%)",
      measure: "Variação Anual %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
  },
  b2d4e6f8a1c34567d890: {
    primary: {
      labelId: "6c0677c0a3030b809b8c",
      valueId: "b12f05ed128090ccb600",
      label: "Variacao Mensal (%)",
      measure: "Variação Mensal %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
    secondary: {
      labelId: "6c8d5882eee0b47898c1",
      valueId: "8d3b844d9e399d19bb03",
      label: "Variacao Anual (%)",
      measure: "Variação Anual %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
  },
  c3e5f7a9b2d46810e123: {
    primary: {
      labelId: "6c0677c0a3030b809b8c",
      valueId: "b12f05ed128090ccb600",
      label: "Variacao Mensal (%)",
      measure: "Variação Mensal %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
    secondary: {
      labelId: "6c8d5882eee0b47898c1",
      valueId: "8d3b844d9e399d19bb03",
      label: "Variacao Anual (%)",
      measure: "Variação Anual %",
      formatString: "'0.0%;-0.0%;0.0%'",
    },
  },
  "480be36186f85cc3c324": {
    primary: {
      labelId: "6c0677c0a3030b809b8c",
      valueId: "b12f05ed128090ccb600",
      label: "Gasto Ano Atual",
      measure: "Gasto Ano Atual",
      formatString: "'R$ #,##0;(R$ #,##0);R$ #,##0'",
    },
    secondary: {
      labelId: "6c8d5882eee0b47898c1",
      valueId: "8d3b844d9e399d19bb03",
      label: "Qtd Pericias",
      measure: "Units Sold",
      formatString: "'#,0'",
    },
  },
};

const BOOKMARK_STABILIZE_SKIP_PAGES = new Set([
  ...Object.keys(CHART_TYPE_TOGGLE_PAGES),
  ...Object.keys(TOP_GRAPH_PAGES),
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readGitHeadJson(relativePath) {
  try {
    const raw = execSync(`git show HEAD:${relativePath}`, {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function visualPath(pageId, visualId) {
  return path.join(REPORT_ROOT, "pages", pageId, "visuals", visualId, "visual.json");
}

function bookmarkPath(bookmarkId) {
  return path.join(REPORT_ROOT, "bookmarks", `${bookmarkId}.bookmark.json`);
}

function pageVisualsDir(pageId) {
  return path.join(REPORT_ROOT, "pages", pageId, "visuals");
}

function findWrappedChildVisualId(pageId, parentGroupId) {
  const visualsDir = pageVisualsDir(pageId);
  if (!fs.existsSync(visualsDir)) return null;

  for (const visualId of fs.readdirSync(visualsDir)) {
    const filePath = path.join(visualsDir, visualId, "visual.json");
    if (!fs.existsSync(filePath)) continue;
    const visual = readJson(filePath);
    if (visual.parentGroupName === parentGroupId && visual.visual?.visualType) {
      return visualId;
    }
  }

  return null;
}

function groupId(pageId, index) {
  return `g${pageId.slice(0, 14)}${String(index + 1).padStart(2, "0")}`;
}

function groupName(label, index) {
  return `${label} ${index + 1}`;
}

function stabilizeBookmarkGroups() {
  const bookmarks = readJson(BOOKMARKS_PATH);

  for (const bookmarkGroup of bookmarks.items) {
    if (!bookmarkGroup.displayName?.startsWith("Período ")) continue;
    if (!Array.isArray(bookmarkGroup.children) || bookmarkGroup.children.length === 0) continue;

    const childBookmarks = bookmarkGroup.children.map((id) => readJson(bookmarkPath(id)));
    const first = childBookmarks[0];
    const pageId = first.explorationState.activeSection;
    if (BOOKMARK_STABILIZE_SKIP_PAGES.has(pageId)) continue;
    const targetRefs = [...first.options.targetVisualNames];
    const bookmarkTargets = targetRefs.map((targetRef, index) => {
      const targetFilePath = visualPath(pageId, targetRef);
      const targetVisual = fs.existsSync(targetFilePath) ? readJson(targetFilePath) : null;
      const alreadyGrouped = Boolean(targetVisual?.visualGroup);
      const desiredGroupId = alreadyGrouped ? targetRef : groupId(pageId, index);
      const sourceVisualId = alreadyGrouped ? findWrappedChildVisualId(pageId, targetRef) : targetRef;

      if (!sourceVisualId) {
        throw new Error(`Nao foi possivel localizar o visual filho do grupo ${targetRef} na pagina ${pageId}.`);
      }

      return {
        sourceVisualId,
        desiredGroupId,
      };
    });
    const desiredGroupIds = bookmarkTargets.map((target) => target.desiredGroupId);

    bookmarkTargets.forEach(({ sourceVisualId, desiredGroupId }, index) => {
      const visualId = sourceVisualId;
      const filePath = visualPath(pageId, visualId);
      const repoRelativePath = path
        .relative(ROOT, filePath)
        .split(path.sep)
        .join("/");
      const visual = readJson(filePath);
      const targetGroupId = desiredGroupId;
      const groupDir = path.join(REPORT_ROOT, "pages", pageId, "visuals", targetGroupId);
      const groupFilePath = path.join(groupDir, "visual.json");
      const existingGroup = fs.existsSync(groupFilePath) ? readJson(groupFilePath) : null;
      const originalVisual = readGitHeadJson(repoRelativePath);
      const sourcePosition =
        originalVisual?.position ??
        (visual.parentGroupName === targetGroupId && existingGroup?.position
          ? existingGroup.position
          : visual.position);
      const existingGroupParent =
        existingGroup?.parentGroupName && existingGroup.parentGroupName !== targetGroupId
          ? existingGroup.parentGroupName
          : null;
      const originalParentGroupName =
        originalVisual?.parentGroupName ??
        (visual.parentGroupName === targetGroupId
          ? existingGroupParent
          : visual.parentGroupName);

      ensureDir(groupDir);
      const groupVisual = {
        $schema:
          "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.6.0/schema.json",
        name: targetGroupId,
        position: {
          x: sourcePosition.x,
          y: sourcePosition.y,
          z: sourcePosition.z,
          height: sourcePosition.height,
          width: sourcePosition.width,
          tabOrder: sourcePosition.tabOrder ?? 0,
        },
        visualGroup: {
          displayName: groupName(bookmarkGroup.displayName, index),
          groupMode: "ScaleMode",
        },
        isHidden: index !== 0,
      };

      if (originalParentGroupName) {
        groupVisual.parentGroupName = originalParentGroupName;
      }

      writeJson(groupFilePath, groupVisual);

      visual.parentGroupName = targetGroupId;
      visual.position = {
        x: 0,
        y: 0,
        z: 0,
        height: sourcePosition.height,
        width: sourcePosition.width,
        tabOrder: 0,
      };
      delete visual.isHidden;
      writeJson(filePath, visual);
    });

    childBookmarks.forEach((bookmark) => {
      const section = bookmark.explorationState.sections[pageId];
      const hiddenTargets = new Set();

      for (const [visualId, state] of Object.entries(section.visualContainers ?? {})) {
        if (state.singleVisual?.display?.mode === "hidden") {
          hiddenTargets.add(visualId);
        }
      }

      const activeGroupId =
        desiredGroupIds.find((gid) => section.visualContainerGroups?.[gid]?.isHidden === false) ??
        bookmarkTargets.find((target) => !hiddenTargets.has(target.sourceVisualId))?.desiredGroupId ??
        desiredGroupIds[0];

      section.visualContainers = Object.fromEntries(
        Object.entries(section.visualContainers ?? {}).filter(
          ([visualId]) => !bookmarkTargets.some((target) => target.sourceVisualId === visualId)
        )
      );

      section.visualContainerGroups = section.visualContainerGroups ?? {};
      desiredGroupIds.forEach((gid, index) => {
        section.visualContainerGroups[gid] = {
          isHidden: gid !== activeGroupId,
        };
      });

      bookmark.options.targetVisualNames = desiredGroupIds;
      writeJson(bookmarkPath(bookmark.name), bookmark);
    });
  }
}

function updateBookmarkSelected(visual, bookmarkId) {
  const bookmarkObj = visual.visual?.objects?.bookmarks?.[0];
  if (!bookmarkObj) return;
  bookmarkObj.properties.selectedBookmark = {
    expr: {
      Literal: {
        Value: `'${bookmarkId}'`,
      },
    },
  };
}

function updateTextboxValue(visual, value) {
  const textRuns =
    visual.visual?.objects?.general?.[0]?.properties?.paragraphs?.[0]?.textRuns;
  if (!Array.isArray(textRuns) || textRuns.length === 0) return;
  textRuns[0].value = value;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createGenericChartObjects() {
  return {
    labels: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
        },
      },
    ],
    valueAxis: [
      {
        properties: {
          start: {
            expr: {
              Literal: {
                Value: "0D",
              },
            },
          },
          labelDisplayUnits: {
            expr: {
              Literal: {
                Value: "1000D",
              },
            },
          },
          showAxisTitle: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "8D",
              },
            },
          },
          italic: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
          fontFamily: {
            expr: {
              Literal: {
                Value: "'wf_standard-font_light, helvetica, arial, sans-serif'",
              },
            },
          },
        },
      },
    ],
    dataPoint: [
      {
        properties: {
          fill: {
            solid: {
              color: {
                expr: {
                  Literal: {
                    Value: "'#1E88E5'",
                  },
                },
              },
            },
          },
        },
      },
    ],
    categoryAxis: [
      {
        properties: {
          showAxisTitle: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
          fontFamily: {
            expr: {
              Literal: {
                Value: "'wf_standard-font_light, helvetica, arial, sans-serif'",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "8D",
              },
            },
          },
        },
      },
    ],
    zoom: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
        },
      },
    ],
  };
}

function setTextboxMeasure(pageId, visualId, measureProperty, formatString) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;

  const visual = readJson(filePath);
  const value =
    visual.visual?.objects?.values?.[0]?.properties;
  const expr =
    value?.expr?.expr?.Min?.Expression?.Column;
  const select = expr?.Expression?.Subquery?.Query?.Select;
  if (!value || !expr || !Array.isArray(select) || !select[0]?.Measure) return;

  select[0].Measure.Property = measureProperty;
  select[0].Name = `Measure.${measureProperty}`;
  expr.Property = `Measure.${measureProperty}`;
  if (value.formatString?.expr?.Literal) {
    value.formatString.expr.Literal.Value = formatString;
  }
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setTextLabel(pageId, visualId, value) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  updateTextboxValue(visual, value);
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setChartMeasure(pageId, visualId, measureProperty) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const projection = visual.visual?.query?.queryState?.Y?.projections?.[0];
  if (!projection) return;

  projection.field = {
    Measure: {
      Expression: {
        SourceRef: {
          Entity: "Measure",
        },
      },
      Property: measureProperty,
    },
  };
  projection.queryRef = `Measure.${measureProperty}`;
  projection.nativeQueryRef = measureProperty;
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function fixSideKpis() {
  for (const [pageId, pageFix] of Object.entries(KPI_TEXTBOX_FIXES)) {
    for (const fix of Object.values(pageFix)) {
      setTextLabel(pageId, fix.labelId, fix.label);
      setTextboxMeasure(pageId, fix.valueId, fix.measure, fix.formatString);
    }
  }
}

function fixChartTypeTogglePages() {
  const bookmarks = readJson(BOOKMARKS_PATH);

  for (const [pageId, cfg] of Object.entries(CHART_TYPE_TOGGLE_PAGES)) {
    const topOuterPanel = readJson(visualPath(pageId, CHART_TYPE_TOP_OUTER_PANEL_ID));
    const topInnerPanel = readJson(visualPath(pageId, CHART_TYPE_TOP_INNER_PANEL_ID));
    delete topOuterPanel.isHidden;
    delete topInnerPanel.isHidden;
    writeJson(visualPath(pageId, CHART_TYPE_TOP_OUTER_PANEL_ID), topOuterPanel);
    writeJson(visualPath(pageId, CHART_TYPE_TOP_INNER_PANEL_ID), topInnerPanel);

    for (const panelId of CHART_TYPE_UNUSED_PANEL_IDS) {
      const panel = readJson(visualPath(pageId, panelId));
      panel.isHidden = true;
      writeJson(visualPath(pageId, panelId), panel);
    }

    const histWrapper = readJson(visualPath(pageId, cfg.wrappers.hist));
    const wrapperPosition = { ...histWrapper.position };
    const wrapperParent = histWrapper.parentGroupName;
    const histVisual = readJson(visualPath(pageId, cfg.visuals.hist));
    const baseQuery = deepClone(histVisual.visual.query);
    const baseChildPosition = { ...histVisual.position };
    const chartTypes = {
      hist: "clusteredColumnChart",
      line: "lineChart",
      bar: "clusteredBarChart",
      area: "areaChart",
    };

    for (const key of Object.keys(cfg.wrappers)) {
      const wrapperId = cfg.wrappers[key];
      const visualId = cfg.visuals[key];
      const wrapper = readJson(visualPath(pageId, wrapperId));
      wrapper.position = { ...wrapperPosition };
      wrapper.parentGroupName = wrapperParent;
      wrapper.visualGroup.displayName = cfg.bookmarkLabels[key];
      wrapper.isHidden = key !== "hist";
      writeJson(visualPath(pageId, wrapperId), wrapper);

      const visual = readJson(visualPath(pageId, visualId));
      visual.parentGroupName = wrapperId;
      visual.position = { ...baseChildPosition };
      visual.visual.visualType = chartTypes[key];
      visual.visual.query = deepClone(baseQuery);
      visual.visual.objects = createGenericChartObjects();
      writeJson(visualPath(pageId, visualId), visual);
    }

    for (const [bookmarkKey, bookmarkId] of Object.entries(cfg.bookmarks)) {
      const bookmark = readJson(bookmarkPath(bookmarkId));
      bookmark.displayName = cfg.bookmarkLabels[bookmarkKey];
      const section = bookmark.explorationState.sections[pageId];
      section.visualContainers = {};
      section.visualContainerGroups = Object.fromEntries(
        Object.entries(cfg.wrappers).map(([key, wrapperId]) => [
          wrapperId,
          { isHidden: key !== bookmarkKey },
        ])
      );
      bookmark.options.targetVisualNames = Object.values(cfg.wrappers);
      writeJson(bookmarkPath(bookmarkId), bookmark);
    }

    upsertBookmarkGroup(
      bookmarks,
      cfg.bookmarkGroupId,
      cfg.bookmarkGroupDisplayName,
      Object.values(cfg.bookmarks)
    );

    const navigator = readJson(visualPath(pageId, cfg.navigatorId));
    updateBookmarkSelected(navigator, cfg.defaultBookmarkId);
    writeJson(visualPath(pageId, cfg.navigatorId), navigator);

    const modeLabel = readJson(visualPath(pageId, cfg.modeLabelId));
    updateTextboxValue(modeLabel, "Modo: escolha o tipo de grafico");
    writeJson(visualPath(pageId, cfg.modeLabelId), modeLabel);
  }

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function fixTopGraphPages() {
  const bookmarks = readJson(BOOKMARKS_PATH);

  for (const cfg of Object.values(TOP_GRAPH_PAGES)) {
    const {
      pageId,
      navigatorId,
      topSlotPosition,
      bookmarks: pageBookmarks,
      bookmarkLabels,
      groups,
      defaultBookmarkId,
      bookmarkGroupId,
      bookmarkGroupDisplayName,
    } = cfg;
    const groupIds = Object.values(groups);
    const childVisuals = TOP_GRAPH_VISUALS[pageId];
    const groupStates = {
      [pageBookmarks.hist]: {
        [groups.hist]: false,
        [groups.line]: true,
        [groups.bar]: true,
        [groups.area]: true,
      },
      [pageBookmarks.line]: {
        [groups.hist]: true,
        [groups.line]: false,
        [groups.bar]: true,
        [groups.area]: true,
      },
      [pageBookmarks.bar]: {
        [groups.hist]: true,
        [groups.line]: true,
        [groups.bar]: false,
        [groups.area]: true,
      },
      [pageBookmarks.area]: {
        [groups.hist]: true,
        [groups.line]: true,
        [groups.bar]: true,
        [groups.area]: false,
      },
    };

    for (const [key, groupId] of Object.entries(groups)) {
      const group = readJson(visualPath(pageId, groupId));
      group.position = { ...topSlotPosition };
      group.isHidden = key !== "hist";
      writeJson(visualPath(pageId, groupId), group);
    }

    if (childVisuals) {
      const chartTypes = {
        hist: "clusteredColumnChart",
        line: "lineChart",
        bar: "clusteredBarChart",
        area: "areaChart",
      };
      const histVisual = readJson(visualPath(pageId, childVisuals.hist));
      const baseQuery = deepClone(histVisual.visual.query);
      const baseChildPosition = { ...histVisual.position };

      for (const [key, groupId] of Object.entries(groups)) {
        const visualId = childVisuals[key];
        if (!visualId) continue;
        const visual = readJson(visualPath(pageId, visualId));
        visual.parentGroupName = groupId;
        visual.position = { ...baseChildPosition };
        visual.visual.visualType = chartTypes[key];
        visual.visual.query = deepClone(baseQuery);
        visual.visual.objects = createGenericChartObjects();
        delete visual.isHidden;
        writeJson(visualPath(pageId, visualId), visual);
      }
    }

    for (const [key, bookmarkId] of Object.entries(pageBookmarks)) {
      const bookmark = readJson(bookmarkPath(bookmarkId));
      bookmark.displayName = bookmarkLabels[key];
      const section = bookmark.explorationState.sections[pageId];
      section.visualContainers = {};
      section.visualContainerGroups = Object.fromEntries(
        Object.entries(groupStates[bookmarkId]).map(([groupId, isHidden]) => [groupId, { isHidden }])
      );
      bookmark.options.targetVisualNames = groupIds;
      writeJson(bookmarkPath(bookmarkId), bookmark);
    }

    upsertBookmarkGroup(
      bookmarks,
      bookmarkGroupId,
      bookmarkGroupDisplayName,
      Object.values(pageBookmarks)
    );

    const navigator = readJson(visualPath(pageId, navigatorId));
    updateBookmarkSelected(navigator, defaultBookmarkId);
    writeJson(visualPath(pageId, navigatorId), navigator);
  }

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function upsertBookmarkGroup(bookmarks, groupId, displayName, children) {
  const index = bookmarks.items.findIndex((item) => item.name === groupId);
  const group = {
    displayName,
    name: groupId,
    children,
  };
  if (index >= 0) {
    bookmarks.items[index] = group;
  } else {
    bookmarks.items.push(group);
  }
}

function writeMinimalGroupBookmark({ bookmarkId, displayName, pageId, targetVisualNames, hiddenStates }) {
  const bookmark = {
    $schema:
      "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/bookmark/2.0.0/schema.json",
    displayName,
    name: bookmarkId,
    options: {
      applyOnlyToTargetVisuals: true,
      targetVisualNames,
      suppressData: true,
    },
    explorationState: {
      version: "1.0",
      activeSection: pageId,
      sections: {
        [pageId]: {
          visualContainers: {},
          visualContainerGroups: Object.fromEntries(
            Object.entries(hiddenStates).map(([groupId, isHidden]) => [groupId, { isHidden }])
          ),
        },
      },
    },
  };

  writeJson(bookmarkPath(bookmarkId), bookmark);
}

function fixBottomTogglePage(toggleConfig) {
  const bookmarks = readJson(BOOKMARKS_PATH);
  const { pageId } = toggleConfig;

  const leftTargetVisuals = Object.values(toggleConfig.left.groupIds);
  const rightTargetVisuals = Object.values(toggleConfig.right.groupIds);

  writeMinimalGroupBookmark({
    bookmarkId: toggleConfig.left.bookmarks.category.id,
    displayName: toggleConfig.left.bookmarks.category.displayName,
    pageId,
    targetVisualNames: leftTargetVisuals,
    hiddenStates: {
      [toggleConfig.left.groupIds.category]: false,
      [toggleConfig.left.groupIds.product]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: toggleConfig.left.bookmarks.product.id,
    displayName: toggleConfig.left.bookmarks.product.displayName,
    pageId,
    targetVisualNames: leftTargetVisuals,
    hiddenStates: {
      [toggleConfig.left.groupIds.category]: true,
      [toggleConfig.left.groupIds.product]: false,
    },
  });
  upsertBookmarkGroup(
    bookmarks,
    toggleConfig.left.bookmarkGroupId,
    toggleConfig.left.bookmarkGroupDisplayName,
    [
      toggleConfig.left.bookmarks.category.id,
      toggleConfig.left.bookmarks.product.id,
    ]
  );

  writeMinimalGroupBookmark({
    bookmarkId: toggleConfig.right.bookmarks.specialty.id,
    displayName: toggleConfig.right.bookmarks.specialty.displayName,
    pageId,
    targetVisualNames: rightTargetVisuals,
    hiddenStates: {
      [toggleConfig.right.groupIds.specialty]: false,
      [toggleConfig.right.groupIds.range]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: toggleConfig.right.bookmarks.range.id,
    displayName: toggleConfig.right.bookmarks.range.displayName,
    pageId,
    targetVisualNames: rightTargetVisuals,
    hiddenStates: {
      [toggleConfig.right.groupIds.specialty]: true,
      [toggleConfig.right.groupIds.range]: false,
    },
  });
  upsertBookmarkGroup(
    bookmarks,
    toggleConfig.right.bookmarkGroupId,
    toggleConfig.right.bookmarkGroupDisplayName,
    [
      toggleConfig.right.bookmarks.specialty.id,
      toggleConfig.right.bookmarks.range.id,
    ]
  );

  writeJson(BOOKMARKS_PATH, bookmarks);

  const leftCategoryPath = visualPath(pageId, toggleConfig.left.groupIds.category);
  const leftProductPath = visualPath(pageId, toggleConfig.left.groupIds.product);
  const rightSpecialtyPath = visualPath(pageId, toggleConfig.right.groupIds.specialty);
  const rightRangePath = visualPath(pageId, toggleConfig.right.groupIds.range);

  const leftCategory = readJson(leftCategoryPath);
  const leftProduct = readJson(leftProductPath);
  const rightSpecialty = readJson(rightSpecialtyPath);
  const rightRange = readJson(rightRangePath);
  leftCategory.isHidden =
    toggleConfig.left.defaultBookmarkId !== toggleConfig.left.bookmarks.category.id;
  leftProduct.isHidden =
    toggleConfig.left.defaultBookmarkId !== toggleConfig.left.bookmarks.product.id;
  rightSpecialty.isHidden =
    toggleConfig.right.defaultBookmarkId !== toggleConfig.right.bookmarks.specialty.id;
  rightRange.isHidden =
    toggleConfig.right.defaultBookmarkId !== toggleConfig.right.bookmarks.range.id;
  writeJson(leftCategoryPath, leftCategory);
  writeJson(leftProductPath, leftProduct);
  writeJson(rightSpecialtyPath, rightSpecialty);
  writeJson(rightRangePath, rightRange);

  const leftNavigator = readJson(visualPath(pageId, toggleConfig.left.navigatorId));
  const rightNavigator = readJson(visualPath(pageId, toggleConfig.right.navigatorId));

  updateBookmarkSelected(leftNavigator, toggleConfig.left.defaultBookmarkId);
  updateBookmarkSelected(rightNavigator, toggleConfig.right.defaultBookmarkId);

  leftNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: {
      Literal: {
        Value: `'${toggleConfig.left.bookmarkGroupId}'`,
      },
    },
  };
  rightNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: {
      Literal: {
        Value: `'${toggleConfig.right.bookmarkGroupId}'`,
      },
    },
  };

  writeJson(visualPath(pageId, toggleConfig.left.navigatorId), leftNavigator);
  writeJson(visualPath(pageId, toggleConfig.right.navigatorId), rightNavigator);
}

function restoreTrendCharts() {
  const pageId = "480be36186f85cc3c324";
  for (const groupId of ["3943a8f5dc4bb830b9ae", "acee2d020bb8c1c4903b", "5c438973c435b483aa95"]) {
    const group = readJson(visualPath(pageId, groupId));
    delete group.isHidden;
    writeJson(visualPath(pageId, groupId), group);
  }
}

function fixTrendPage() {
  const pageId = "480be36186f85cc3c324";

  setChartMeasure(pageId, "07c5dfc89d70d1658ac3", "Total Sales");
  setChartMeasure(pageId, "c35f2c23e04ae096e02f", "Units Sold");
  setChartMeasure(pageId, "cdc1b6c2cd04d7b04dd7", "Orders Total");

  setTextLabel(pageId, "1d2bf754849f2eb3a1c4", "Qtd Pericias ao longo do tempo");
  setTextLabel(pageId, "5af0fe7f69a26356dd74", "Curva historica");
  setTextLabel(pageId, "25e0de9a58874d1a36db", "Peritos ao longo do tempo");
  setTextLabel(pageId, "ffcf14e5603b23436829", "Curva historica");
}

function fixCruzamentosOverlap() {
  const pageId = "82ff2dfb93623b9eeb6c";
  for (const visualId of ["c9a79e210484f61718be", "cedc6b6b1891cb3f0963"]) {
    const filePath = visualPath(pageId, visualId);
    if (!fs.existsSync(filePath)) continue;
    const visual = readJson(filePath);
    visual.isHidden = true;
    writeJson(filePath, visual);
  }
}

function hideClutter() {
  for (const [pageId, visualIds] of Object.entries(CLUTTER_BY_PAGE)) {
    for (const visualId of visualIds) {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) continue;
      const visual = readJson(filePath);
      visual.isHidden = true;
      writeJson(filePath, visual);
    }
  }
}

function main() {
  stabilizeBookmarkGroups();
  fixChartTypeTogglePages();
  fixTopGraphPages();
  fixBottomTogglePage(COMARCAS_TOGGLE_CONFIG);
  fixBottomTogglePage(RM_JOAO_PESSOA_TOGGLE_CONFIG);
  fixBottomTogglePage(RM_CAMPINA_TOGGLE_CONFIG);
  hideClutter();
  fixSideKpis();
  restoreTrendCharts();
  fixTrendPage();
  fixCruzamentosOverlap();
  console.log("Layout estabilizado: grupos de bookmark recriados e overlays ocultados.");
}

main();
