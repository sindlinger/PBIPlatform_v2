#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_ROOT = path.join(ROOT, "TJPB_Honorarios_Intuitivo.Report/definition");
const BOOKMARKS_PATH = path.join(REPORT_ROOT, "bookmarks/bookmarks.json");
const MEASURE_ENTITY_BY_NAME = {
  "Valor Arbitrado": "FactPericias",
  "Qtd Perícias": "FactPericias",
  "Peritos Distintos": "FactPericias",
  "Valor Médio por Perícia": "FactPericias",
  "Saldo a Receber Base": "Measure",
};

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
const CHART_TYPE_LEGACY_HEADER_GROUP_ID = "2b44ca5113ee00cb1bf5";
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

const PRIMARY_CHART_ENTITY_TITLES = {
  fe4687310000e672d410: "Visão geral | Valor Arbitrado ao longo do tempo",
  d4f6a8c0b3e57921f234: "Comarcas | Valor Arbitrado ao longo do tempo",
  a6f4e2b9c1d34780ef12: "RM João Pessoa | Valor Arbitrado ao longo do tempo",
  e5a1b2c3d4f60789ab01: "RM Campina Grande | Valor Arbitrado ao longo do tempo",
  f1a9c2e7d4b86350a1f2: "Varas | Valor Arbitrado ao longo do tempo",
  b2d4e6f8a1c34567d890: "Peritos | Valor Arbitrado ao longo do tempo",
  c3e5f7a9b2d46810e123: "Especialidades | Valor Arbitrado ao longo do tempo",
};

const MAP_BOX_CONFIG = {
  fe4687310000e672d410: {
    pageId: "fe4687310000e672d410",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f92",
    navigatorSourcePageId: "d4f6a8c0b3e57921f234",
    navigatorSourceVisualId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1fe4687310000m01",
    bookmarkGroupDisplayName: "Overview Mapa Nomes",
    bookmarks: {
      map: { id: "b1fe4687310000m01", displayName: "Mapa" },
      names: { id: "b1fe4687310000m02", displayName: "Nomes" },
    },
    namesTableId: "fe46mapnames000001",
    namesTitle: "Nomes exibidos no mapa | Visão geral",
  },
  d4f6a8c0b3e57921f234: {
    pageId: "d4f6a8c0b3e57921f234",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1d4a9f0e2c34ab18d00",
    bookmarkGroupDisplayName: "Comarcas Mapa Nomes",
    bookmarks: {
      map: { id: "b1d4a9f0e2c34ab18d01", displayName: "Mapa" },
      names: { id: "b1d4a9f0e2c34ab18d02", displayName: "Nomes" },
    },
    namesTableId: "d4f6mapnames000001",
    namesTitle: "Nomes exibidos no mapa | Comarcas",
  },
  a6f4e2b9c1d34780ef12: {
    pageId: "a6f4e2b9c1d34780ef12",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f91",
    bookmarkGroupId: "c1a6a9f0e2c34ab18f00",
    bookmarkGroupDisplayName: "RM Joao Pessoa Mapa Nomes",
    bookmarks: {
      map: { id: "b1a6a9f0e2c34ab18f01", displayName: "Mapa" },
      names: { id: "b1a6a9f0e2c34ab18f02", displayName: "Nomes" },
    },
    namesTableId: "a6f4mapnames000001",
    namesTitle: "Nomes exibidos no mapa | RM João Pessoa",
  },
  e5a1b2c3d4f60789ab01: {
    pageId: "e5a1b2c3d4f60789ab01",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f93",
    navigatorSourcePageId: "d4f6a8c0b3e57921f234",
    navigatorSourceVisualId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1e5a1b2c3d4f6070a1",
    bookmarkGroupDisplayName: "RM Campina Mapa Nomes",
    bookmarks: {
      map: { id: "b1e5a1b2c3d4f6070a1", displayName: "Mapa" },
      names: { id: "b1e5a1b2c3d4f6070a2", displayName: "Nomes" },
    },
    namesTableId: "e5a1mapnames000001",
    namesTitle: "Nomes exibidos no mapa | RM Campina Grande",
  },
  f1a9c2e7d4b86350a1f2: {
    pageId: "f1a9c2e7d4b86350a1f2",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f94",
    navigatorSourcePageId: "d4f6a8c0b3e57921f234",
    navigatorSourceVisualId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1f1a9maptoggle001",
    bookmarkGroupDisplayName: "Varas Mapa Nomes",
    bookmarks: {
      map: { id: "b1f1a9maptoggle001", displayName: "Mapa" },
      names: { id: "b1f1a9maptoggle002", displayName: "Nomes" },
    },
    namesTableId: "f1a9mapnames000001",
    namesTitle: "Nomes exibidos no mapa | Varas",
    boxPosition: { x: 834, y: 360, z: 20520, width: 400, height: 240, tabOrder: 20520 },
  },
  b2d4e6f8a1c34567d890: {
    pageId: "b2d4e6f8a1c34567d890",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f95",
    navigatorSourcePageId: "d4f6a8c0b3e57921f234",
    navigatorSourceVisualId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1b2d4maptoggle001",
    bookmarkGroupDisplayName: "Peritos Mapa Nomes",
    bookmarks: {
      map: { id: "b1b2d4maptoggle001", displayName: "Mapa" },
      names: { id: "b1b2d4maptoggle002", displayName: "Nomes" },
    },
    namesTableId: "b2d4mapnames000001",
    namesTitle: "Nomes exibidos no mapa | Peritos",
    boxPosition: { x: 834, y: 360, z: 20520, width: 400, height: 240, tabOrder: 20520 },
  },
  c3e5f7a9b2d46810e123: {
    pageId: "c3e5f7a9b2d46810e123",
    mapVisualId: "8f6d1b81e9832be53e52",
    legendId: "54ef9ab629d981721784",
    navigatorId: "9d1e2f3a4b5c6d7e8f96",
    navigatorSourcePageId: "d4f6a8c0b3e57921f234",
    navigatorSourceVisualId: "9d1e2f3a4b5c6d7e8f90",
    bookmarkGroupId: "c1c3e5maptoggle001",
    bookmarkGroupDisplayName: "Especialidades Mapa Nomes",
    bookmarks: {
      map: { id: "b1c3e5maptoggle001", displayName: "Mapa" },
      names: { id: "b1c3e5maptoggle002", displayName: "Nomes" },
    },
    namesTableId: "c3e5mapnames000001",
    namesTitle: "Nomes exibidos no mapa | Especialidades",
    boxPosition: { x: 834, y: 360, z: 20520, width: 400, height: 240, tabOrder: 20520 },
  },
};

const METROPOLITAN_PAGE_FILTERS = {
  a6f4e2b9c1d34780ef12: {
    slug: "rmjp",
    values: ["João Pessoa", "Joao Pessoa", "Bayeux", "Cabedelo", "Conde", "Santa Rita"],
  },
  e5a1b2c3d4f60789ab01: {
    slug: "rmcg",
    values: [
      "Alagoa Nova",
      "Boqueirão",
      "Boqueirao",
      "Campina Grande",
      "Ingá",
      "Inga",
      "Pocinhos",
      "Queimadas",
      "Umbuzeiro",
    ],
  },
};

const METROPOLITAN_FILTER_SKIP_VISUAL_TYPES = new Set([
  "textbox",
  "shape",
  "image",
  "pageNavigator",
  "bookmarkNavigator",
  "slicer",
]);

const STANDARD_PRIMARY_CHART_POSITION = {
  x: 216.45834164877184,
  y: 206,
  z: 8000,
  height: 154,
  width: 602.2904309925042,
  tabOrder: 0,
};

const STANDARD_PRIMARY_CHART_NAV_POSITION = {
  x: 670,
  y: 188,
  z: 35000,
  height: 14,
  width: 118,
  tabOrder: 20500,
};

const STANDARD_NAV_THEME = {
  selectedFill: "#0B7F7E",
  selectedOutline: "#0B7F7E",
  defaultOutline: "#475569",
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
      measure: "Qtd Perícias",
      formatString: "'#,0'",
    },
  },
};

const DETAIL_EXTRA_CHARTS = {
  f1a9c2e7d4b86350a1f2: {
    chartId: "va11aa22bb33cc44dd55",
    measure: "Qtd Perícias",
    title: "Qtd Pericias ao Longo do Tempo",
    subtitle: "Historico de volume por periodo",
    highlightTitle: "Destaque de Varas",
    cardId: "f67a89c63b41e2a74038",
  },
  b2d4e6f8a1c34567d890: {
    chartId: "pe11aa22bb33cc44dd55",
    measure: "Valor Médio por Perícia",
    title: "Valor Medio por Pericia ao Longo do Tempo",
    subtitle: "Historico do valor medio por periodo",
    highlightTitle: "Destaque de Peritos",
    cardId: "f67a89c63b41e2a74038",
  },
  c3e5f7a9b2d46810e123: {
    chartId: "es11aa22bb33cc44dd55",
    measure: "Qtd Perícias",
    title: "Qtd Pericias ao Longo do Tempo",
    subtitle: "Historico do volume por especialidade",
    highlightTitle: "Destaque de Especialidades",
    cardId: "f67a89c63b41e2a74038",
  },
};

const TITLE_OVERLAY_HIDE = {
  fe4687310000e672d410: ["497f294b2027826219b5", "7a0a375c13acb32abc97", "7b7b87384705d25179b0", "b368d39809ec2230a90e"],
  d4f6a8c0b3e57921f234: ["497f294b2027826219b5", "7a0a375c13acb32abc97", "7b7b87384705d25179b0", "b368d39809ec2230a90e"],
  a6f4e2b9c1d34780ef12: ["497f294b2027826219b5", "7a0a375c13acb32abc97", "7b7b87384705d25179b0", "b368d39809ec2230a90e"],
  e5a1b2c3d4f60789ab01: ["497f294b2027826219b5", "7a0a375c13acb32abc97", "7b7b87384705d25179b0", "b368d39809ec2230a90e"],
  f1a9c2e7d4b86350a1f2: [
    "7371b1ce6104fb8e1064",
    "94a45d6d2279208770ef",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
  ],
  b2d4e6f8a1c34567d890: [
    "7371b1ce6104fb8e1064",
    "94a45d6d2279208770ef",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
  ],
  c3e5f7a9b2d46810e123: [
    "7371b1ce6104fb8e1064",
    "94a45d6d2279208770ef",
    "25e0de9a58874d1a36db",
    "ffcf14e5603b23436829",
    "5af0fe7f69a26356dd74",
  ],
  "480be36186f85cc3c324": [
    "7371b1ce6104fb8e1064",
    "94a45d6d2279208770ef",
    "5af0fe7f69a26356dd74",
    "ffcf14e5603b23436829",
  ],
};

const TENDENCIA_STRAY_LOWER_ROW_HIDE = [
  "066019ba059cc7614a8b",
  "a3fd999b18168eab6ea9",
  "ab7dded9cc785816772d",
  "c59c9e94f2ac24805c9b",
  "5715f23ae7323c710a25",
  "0641c7fbed87452465c7",
];

const EXTRA_CHART_SLOT = {
  x: 202.9902077860043,
  y: 248.9859087652257,
  z: 4000,
  width: 622.4217817052782,
  height: 170,
  tabOrder: 18000,
};

const EXTRA_CHART_INNER_POSITION = {
  x: 13.451158347265345,
  y: 34.239312156675425,
  width: 612.6391210890853,
  height: 126,
  z: 0,
  tabOrder: 0,
};

const EXTRA_CHART_HEADER_POSITION = {
  x: 0,
  y: 0,
  width: 104.8076923076923,
  height: 41.34615384615385,
  z: 0,
  tabOrder: 1000,
};

const EXTRA_CHART_SUBHEADER_POSITION = {
  x: 0,
  y: 15.384615384615387,
  width: 178.84615384615384,
  height: 41.34615384615385,
  z: 1000,
  tabOrder: 0,
};

const BOOKMARK_STABILIZE_SKIP_PAGES = new Set([
  ...Object.keys(CHART_TYPE_TOGGLE_PAGES),
  ...Object.keys(TOP_GRAPH_PAGES),
]);

const ENTITY_PAGE_CANVAS_CONFIG = {
  d4f6a8c0b3e57921f234: {
    height: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelId: "aa00bb11cc22dd33ee52",
  },
  f1a9c2e7d4b86350a1f2: {
    height: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee62",
  },
  b2d4e6f8a1c34567d890: {
    height: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee72",
  },
  c3e5f7a9b2d46810e123: {
    height: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee82",
  },
};

const SIDEBAR_LAYOUT_CONFIG = {
  fe4687310000e672d410: {
    pageHeight: 900,
    displayOption: "FitToWidth",
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelId: "aa00bb11cc22dd33ee42",
    titleOverlayId: "07d4da210de09608d4fb",
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
  },
  d4f6a8c0b3e57921f234: {
    pageHeight: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelId: "aa00bb11cc22dd33ee52",
    titleOverlayId: "07d4da210de09608d4fb",
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
  },
  f1a9c2e7d4b86350a1f2: {
    pageHeight: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee62",
    titleOverlayId: "b3ca9db4dc5f60ce98f2",
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
  },
  b2d4e6f8a1c34567d890: {
    pageHeight: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee72",
    titleOverlayId: "b3ca9db4dc5f60ce98f2",
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
  },
  c3e5f7a9b2d46810e123: {
    pageHeight: 980,
    displayOption: "FitToWidth",
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelId: "aa00bb11cc22dd33ee82",
    titleOverlayId: "b3ca9db4dc5f60ce98f2",
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
  },
};

const VARIATION_LABELS_BY_PAGE = {
  fe4687310000e672d410: ["2346d05958531b1c0e70", "0698e7cbde04a3e75c43", "9e5c2c97509007d8206a", "d8c53201b61254046ba2", "8ed644355c0522d96e45"],
  d4f6a8c0b3e57921f234: ["2346d05958531b1c0e70", "0698e7cbde04a3e75c43", "9e5c2c97509007d8206a", "d8c53201b61254046ba2", "8ed644355c0522d96e45"],
  f1a9c2e7d4b86350a1f2: ["0161e6456000a5d02753", "38e72cead61c48ba1686", "bff85559182dcd273b08", "ea0b234db0d4e47d3222"],
  b2d4e6f8a1c34567d890: ["0161e6456000a5d02753", "38e72cead61c48ba1686", "bff85559182dcd273b08", "ea0b234db0d4e47d3222"],
  c3e5f7a9b2d46810e123: ["0161e6456000a5d02753", "38e72cead61c48ba1686", "bff85559182dcd273b08", "ea0b234db0d4e47d3222"],
};

const OVERVIEW_SUMMARY_CONFIG = {
  pageId: "fe4687310000e672d410",
  left: {
    navigatorId: "e4f886c778183b7d6274",
    bookmarkGroupId: "overview-summary-left-toggle",
    bookmarkGroupDisplayName: "Resumo Overview Left",
    defaultBookmarkId: "overview-left-comarcas",
    buttonPosition: {
      x: 235.76642335766422,
      y: 440.1459854014598,
      z: 20000,
      height: 21.8978102189781,
      width: 191.970802919708,
      tabOrder: 16000,
    },
    groups: {
      comarcas: "216b5a259063013b5d69",
      varas: "b76ef7c0bcd3318585d6",
    },
    bookmarks: {
      comarcas: { id: "overview-left-comarcas", displayName: "Comarcas" },
      varas: { id: "overview-left-varas", displayName: "Varas" },
    },
    charts: {
      comarcas: "cd3d55d60e6c404b02c7",
      varas: "317b187a9471457a326e",
    },
    titles: {
      comarcas: {
        titleId: "04ae690c03b1748a60e1",
        subtitleId: "bb6dc63c95c92ece933a",
        title: "Top 5 Comarcas por Valor",
        subtitle: "Resumo executivo",
      },
      varas: {
        titleId: "81808ee2e04cb5a44453",
        subtitleId: "06008ec31a834a664a82",
        title: "Top 5 Varas por Valor",
        subtitle: "Resumo executivo",
      },
    },
  },
  right: {
    navigatorId: "86a9222c6d0de10c5604",
    bookmarkGroupId: "overview-summary-right-toggle",
    bookmarkGroupDisplayName: "Resumo Overview Right",
    defaultBookmarkId: "overview-right-peritos",
    buttonPosition: {
      x: 543.3333333333334,
      y: 438.33333333333337,
      z: 23000,
      height: 21.666666666666668,
      width: 191.66666666666669,
      tabOrder: 19000,
    },
    groups: {
      peritos: "0a67c55e012b45db0585",
      especialidades: "781ea67c59c51a0a5292",
    },
    bookmarks: {
      peritos: { id: "overview-right-peritos", displayName: "Peritos" },
      especialidades: { id: "overview-right-especialidades", displayName: "Especialidades" },
    },
    groupPositions: {
      peritos: {
        x: 539.0046296296297,
        y: 473.33333333333337,
        z: 21000,
        width: 269.1666666666667,
        height: 185,
        tabOrder: 25000,
      },
      especialidades: {
        x: 539.1666666666667,
        y: 473.33333333333337,
        z: 22000,
        width: 269.1666666666667,
        height: 185,
        tabOrder: 26000,
      },
    },
    charts: {
      peritos: "dcb76924e59193d0b160",
      especialidades: "ec5fc66339257d3549a0",
    },
    titles: {
      peritos: {
        titleId: "0dec849700348dcb5b4a",
        subtitleId: "695545bd2abe7cd323a2",
        title: "Peritos por Valor",
        subtitle: "Resumo executivo",
      },
      especialidades: {
        titleId: "ff6b88429017dbc20ae9",
        subtitleId: "add260de38365a4d45a7",
        title: "Especialidades por Valor",
        subtitle: "Resumo executivo",
      },
    },
  },
};

const COMARCAS_BLUEPRINT_CONFIG = {
  pageId: "d4f6a8c0b3e57921f234",
  leftToggle: {
    navigatorId: "e4f886c778183b7d6274",
    bookmarkGroupId: "d4f6-comarcas-ranking",
    bookmarkGroupDisplayName: "Comarcas Ranking",
    defaultBookmarkId: "d4f6-comarcas-ranking-valor",
    groups: {
      valor: "216b5a259063013b5d69",
      qtd: "b76ef7c0bcd3318585d6",
    },
    bookmarks: {
      valor: { id: "d4f6-comarcas-ranking-valor", displayName: "Valor" },
      qtd: { id: "d4f6-comarcas-ranking-qtd", displayName: "Perícias" },
    },
    charts: {
      valor: "cd3d55d60e6c404b02c7",
      qtd: "317b187a9471457a326e",
    },
    titles: {
      valor: {
        titleId: "04ae690c03b1748a60e1",
        subtitleId: "bb6dc63c95c92ece933a",
        title: "Top 10 Comarcas por Valor",
        subtitle: "Ranking financeiro",
      },
      qtd: {
        titleId: "81808ee2e04cb5a44453",
        subtitleId: "06008ec31a834a664a82",
        title: "Top 10 Comarcas por Perícias",
        subtitle: "Ranking de volume",
      },
    },
  },
  rightToggle: {
    navigatorId: "86a9222c6d0de10c5604",
    bookmarkGroupId: "d4f6-comarcas-crossover",
    bookmarkGroupDisplayName: "Comarcas Cruzamentos",
    defaultBookmarkId: "d4f6-comarcas-crossover-peritos",
    groups: {
      peritos: "0a67c55e012b45db0585",
      especialidades: "781ea67c59c51a0a5292",
    },
    bookmarks: {
      peritos: { id: "d4f6-comarcas-crossover-peritos", displayName: "Peritos" },
      especialidades: { id: "d4f6-comarcas-crossover-especialidades", displayName: "Especialidades" },
    },
    charts: {
      peritos: "dcb76924e59193d0b160",
      especialidades: "ec5fc66339257d3549a0",
    },
    titles: {
      peritos: {
        titleId: "0dec849700348dcb5b4a",
        subtitleId: "695545bd2abe7cd323a2",
        title: "Peritos nas Comarcas",
        subtitle: "Cruzamento financeiro",
      },
      especialidades: {
        titleId: "ff6b88429017dbc20ae9",
        subtitleId: "add260de38365a4d45a7",
        title: "Especialidades nas Comarcas",
        subtitle: "Cruzamento financeiro",
      },
    },
  },
  operational: {
    titleId: "383c1f03c460e952a08d",
    subtitleId: "b2d9b7eea3c0e116eac9",
    title: "Varas nas Comarcas",
    subtitle: "Cruzamento operacional",
    chartId: "e85feb694080c3b3bc21",
    dimension: { entity: "FactPericias", property: "JuizoExibicao", label: "Vara" },
    topN: 10,
  },
  detail: {
    visualId: "d4f6detailtable001",
    title: "Tabela detalhe de Comarcas",
    entityColumn: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
  },
};

const ENTITY_BLUEPRINT_CONFIG = {
  f1a9c2e7d4b86350a1f2: {
    pageTitle: "Varas",
    entityColumn: { entity: "FactPericias", property: "JuizoExibicao", displayName: "Vara" },
    secondaryColumn: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
    ranking: {
      groupId: "5147d92f75e43d7a0abf",
      chartId: "5715f23ae7323c710a25",
      headerGroupId: "56522877312f663a7d8b",
      titleId: "066019ba059cc7614a8b",
      subtitleId: "ab7dded9cc785816772d",
      altGroupId: "5147d92f75e43d7a0abg",
      altChartId: "5715f23ae7323c710a26",
      altHeaderGroupId: "56522877312f663a7d8c",
      altTitleId: "066019ba059cc7614a8c",
      altSubtitleId: "ab7dded9cc785816772e",
      navigatorId: "varas-ranking-nav",
      bookmarkGroupId: "varas-ranking-toggle",
      bookmarkGroupDisplayName: "Ranking Varas",
      bookmarks: {
        valor: { id: "varas-ranking-valor", displayName: "Valor" },
        qtd: { id: "varas-ranking-qtd", displayName: "Perícias" },
      },
      titles: {
        valor: { title: "Top 10 Varas por Valor", subtitle: "Ranking financeiro" },
        qtd: { title: "Top 10 Varas por Perícias", subtitle: "Ranking de volume" },
      },
      topN: 10,
    },
    operational: {
      chartId: "va11aa22bb33cc44dd55",
      titleId: "1d2bf754849f2eb3a1c4",
      subtitleId: "5af0fe7f69a26356dd74",
      dimension: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
      title: "Comarcas associadas às Varas",
      subtitle: "Cruzamento operacional",
      topN: 10,
    },
    financial: {
      chartId: "0641c7fbed87452465c7",
      titleId: "a3fd999b18168eab6ea9",
      subtitleId: "c59c9e94f2ac24805c9b",
      dimension: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
      title: "Especialidades associadas às Varas",
      subtitle: "Cruzamento financeiro",
      topN: 10,
    },
    detail: {
      visualId: "f1a9detailtable001",
      title: "Tabela detalhe de Varas",
    },
  },
  b2d4e6f8a1c34567d890: {
    pageTitle: "Peritos",
    entityColumn: { entity: "FactPericias", property: "PeritoNomeExibicao", displayName: "Perito" },
    secondaryColumn: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
    ranking: {
      groupId: "5147d92f75e43d7a0abf",
      chartId: "5715f23ae7323c710a25",
      headerGroupId: "56522877312f663a7d8b",
      titleId: "066019ba059cc7614a8b",
      subtitleId: "ab7dded9cc785816772d",
      altGroupId: "5147d92f75e43d7a0abh",
      altChartId: "5715f23ae7323c710a27",
      altHeaderGroupId: "56522877312f663a7d8d",
      altTitleId: "066019ba059cc7614a8d",
      altSubtitleId: "ab7dded9cc785816772f",
      navigatorId: "peritos-ranking-nav",
      bookmarkGroupId: "peritos-ranking-toggle",
      bookmarkGroupDisplayName: "Ranking Peritos",
      bookmarks: {
        valor: { id: "peritos-ranking-valor", displayName: "Valor" },
        qtd: { id: "peritos-ranking-qtd", displayName: "Perícias" },
      },
      titles: {
        valor: { title: "Top 10 Peritos por Valor", subtitle: "Ranking financeiro" },
        qtd: { title: "Top 10 Peritos por Perícias", subtitle: "Ranking de volume" },
      },
      topN: 10,
    },
    operational: {
      chartId: "pe11aa22bb33cc44dd55",
      titleId: "1d2bf754849f2eb3a1c4",
      subtitleId: "5af0fe7f69a26356dd74",
      dimension: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
      title: "Comarcas associadas aos Peritos",
      subtitle: "Cruzamento operacional",
      topN: 10,
    },
    financial: {
      chartId: "0641c7fbed87452465c7",
      titleId: "a3fd999b18168eab6ea9",
      subtitleId: "c59c9e94f2ac24805c9b",
      dimension: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
      title: "Especialidades associadas aos Peritos",
      subtitle: "Cruzamento financeiro",
      topN: 10,
    },
    detail: {
      visualId: "b2d4detailtable001",
      title: "Tabela detalhe de Peritos",
    },
  },
  c3e5f7a9b2d46810e123: {
    pageTitle: "Especialidades",
    entityColumn: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
    secondaryColumn: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
    ranking: {
      groupId: "5147d92f75e43d7a0abf",
      chartId: "5715f23ae7323c710a25",
      headerGroupId: "56522877312f663a7d8b",
      titleId: "066019ba059cc7614a8b",
      subtitleId: "ab7dded9cc785816772d",
      altGroupId: "5147d92f75e43d7a0abi",
      altChartId: "5715f23ae7323c710a28",
      altHeaderGroupId: "56522877312f663a7d8e",
      altTitleId: "066019ba059cc7614a8e",
      altSubtitleId: "ab7dded9cc785816772g",
      navigatorId: "especialidades-ranking-nav",
      bookmarkGroupId: "especialidades-ranking-toggle",
      bookmarkGroupDisplayName: "Ranking Especialidades",
      bookmarks: {
        valor: { id: "especialidades-ranking-valor", displayName: "Valor" },
        qtd: { id: "especialidades-ranking-qtd", displayName: "Perícias" },
      },
      titles: {
        valor: { title: "Top 10 Especialidades por Valor", subtitle: "Ranking financeiro" },
        qtd: { title: "Top 10 Especialidades por Perícias", subtitle: "Ranking de volume" },
      },
      topN: 10,
    },
    operational: {
      chartId: "es11aa22bb33cc44dd55",
      titleId: "1d2bf754849f2eb3a1c4",
      subtitleId: "5af0fe7f69a26356dd74",
      dimension: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
      title: "Comarcas associadas às Especialidades",
      subtitle: "Cruzamento operacional",
      topN: 10,
    },
    financial: {
      chartId: "0641c7fbed87452465c7",
      titleId: "a3fd999b18168eab6ea9",
      subtitleId: "c59c9e94f2ac24805c9b",
      dimension: { entity: "FactPericias", property: "PeritoNomeExibicao", displayName: "Perito" },
      title: "Peritos associados às Especialidades",
      subtitle: "Cruzamento financeiro",
      topN: 10,
    },
    detail: {
      visualId: "c3e5detailtable001",
      title: "Tabela detalhe de Especialidades",
    },
  },
};

const ENTITY_CHART_LABEL_CONFIG = {
  f1a9c2e7d4b86350a1f2: {
    ranking: { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    operational: { entity: "DimComarcas", property: "ComarcaCurta", displayName: "Comarca" },
    financial: { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    detailPrimary: { entity: "FactPericias", property: "JuizoExibicao", displayName: "Vara" },
    detailSecondary: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
  },
  b2d4e6f8a1c34567d890: {
    ranking: { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    operational: { entity: "DimComarcas", property: "ComarcaCurta", displayName: "Comarca" },
    financial: { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    detailPrimary: { entity: "FactPericias", property: "PeritoNomeExibicao", displayName: "Perito" },
    detailSecondary: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
  },
  c3e5f7a9b2d46810e123: {
    ranking: { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    operational: { entity: "DimComarcas", property: "ComarcaCurta", displayName: "Comarca" },
    financial: { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    detailPrimary: { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
    detailSecondary: { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
  },
};

const DETAIL_TABLE_SOURCE_PAGE_ID = "82ff2dfb93623b9eeb6c";
const DETAIL_TABLE_SOURCE_VISUAL_ID = "57b5ea49ef39b6022b88";
const DETAIL_TABLE_POSITION = {
  x: 232,
  y: 716,
  z: 32000,
  width: 1018,
  height: 210,
  tabOrder: 32000,
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function escapeLiteralText(value) {
  return String(value).replace(/'/g, "''");
}

function literalExpr(value) {
  return {
    expr: {
      Literal: {
        Value: `'${escapeLiteralText(value)}'`,
      },
    },
  };
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

function upsertVisual(pageId, visualId, sourceVisualId, transform) {
  const targetPath = visualPath(pageId, visualId);
  const source = readJson(visualPath(pageId, sourceVisualId));
  const next = deepClone(source);
  next.name = visualId;
  if (typeof transform === "function") {
    transform(next);
  }
  ensureDir(path.dirname(targetPath));
  writeJson(targetPath, next);
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
  if (!value || !expr || !Array.isArray(select) || !select[0]) return;
  const entity = MEASURE_ENTITY_BY_NAME[measureProperty] || "Measure";

  if (select[0].Measure) {
    select[0].Measure.Expression.SourceRef.Source = "m";
    select[0].Measure.Property = measureProperty;
    select[0].Name = `${entity}.${measureProperty}`;
  } else {
    select[0] = {
      Measure: {
        Expression: {
          SourceRef: {
            Source: "m",
          },
        },
        Property: measureProperty,
      },
      Name: `${entity}.${measureProperty}`,
    };
  }
  expr.Property = `${entity}.${measureProperty}`;
  const from = expr?.Expression?.Subquery?.Query?.From;
  if (Array.isArray(from) && from[0]) {
    from[0].Entity = entity;
    from[0].Name = "m";
    from[0].Type = 0;
  }
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

function replaceMeasurePropertyInNode(node, oldProperty, newProperty) {
  if (!node || oldProperty === newProperty) return;
  if (Array.isArray(node)) {
    node.forEach((item) => replaceMeasurePropertyInNode(item, oldProperty, newProperty));
    return;
  }
  if (typeof node !== "object") return;

  if (node.Measure?.Property === oldProperty) {
    node.Measure.Property = newProperty;
  }
  if (
    node.Property === oldProperty &&
    (node.Expression?.SourceRef?.Entity === "Measure" ||
      node.Expression?.SourceRef?.Source === "m")
  ) {
    node.Property = newProperty;
  }

  Object.values(node).forEach((value) => replaceMeasurePropertyInNode(value, oldProperty, newProperty));
}

function setCardVisualMeasure(pageId, visualId, measureProperty, sortMeasureProperty = measureProperty) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;

  const visual = readJson(filePath);
  const projection = visual.visual?.query?.queryState?.Values?.projections?.[0];
  if (!projection?.field?.Measure) return;
  const oldProperty = projection.field.Measure.Property;

  projection.field.Measure.Expression.SourceRef.Entity = "Measure";
  projection.field.Measure.Property = measureProperty;
  projection.queryRef = `Measure.${measureProperty}`;
  projection.nativeQueryRef = measureProperty;

  const sortField = visual.visual?.query?.sortDefinition?.sort?.[0]?.field?.Measure;
  if (sortField) {
    sortField.Expression.SourceRef.Entity = "Measure";
    sortField.Property = sortMeasureProperty;
  }

  replaceMeasurePropertyInNode(visual.visual?.objects, oldProperty, measureProperty);
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setCardVisualFontSize(pageId, visualId, fontSize) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;

  const visual = readJson(filePath);
  const labelProps = visual.visual?.objects?.labels?.[0]?.properties;
  if (!labelProps) return;

  labelProps.fontSize = {
    expr: {
      Literal: {
        Value: fontSize,
      },
    },
  };
  writeJson(filePath, visual);
}

function setTextboxFontSize(pageId, visualId, fontSize) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const textRuns =
    visual.visual?.objects?.general?.[0]?.properties?.paragraphs?.[0]?.textRuns;
  if (!Array.isArray(textRuns) || textRuns.length === 0) return;
  textRuns.forEach((run) => {
    run.textStyle = {
      ...(run.textStyle ?? {}),
      fontSize,
    };
  });
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setChartMeasure(pageId, visualId, measureProperty) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const entity = MEASURE_ENTITY_BY_NAME[measureProperty] || "Measure";
  const projection = visual.visual?.query?.queryState?.Y?.projections?.[0];
  if (!projection) return;

  projection.field = {
    Measure: {
      Expression: {
        SourceRef: {
          Entity: entity,
        },
      },
      Property: measureProperty,
    },
  };
  projection.queryRef = `${entity}.${measureProperty}`;
  projection.nativeQueryRef = measureProperty;

  const sortField = visual.visual?.query?.sortDefinition?.sort?.[0]?.field;
  if (sortField?.Measure) {
    sortField.Measure.Expression.SourceRef.Entity = entity;
    sortField.Measure.Property = measureProperty;
  } else if (sortField?.Aggregation) {
    visual.visual.query.sortDefinition.sort[0].field = {
      Measure: {
        Expression: {
          SourceRef: {
            Entity: entity,
          },
        },
        Property: measureProperty,
      },
    };
  }
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setChartFieldParameter(pageId, visualId, entity, property, label = property) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const projection = visual.visual?.query?.queryState?.Y?.projections?.[0];
  if (!projection) return;

  projection.field = {
    Column: {
      Expression: {
        SourceRef: {
          Entity: entity,
        },
      },
      Property: property,
    },
  };
  projection.queryRef = `${entity}.${property}`;
  projection.nativeQueryRef = label;
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function sourceVisualPath(pageId, visualId) {
  return path.join(REPORT_ROOT, "pages", pageId, "visuals", visualId, "visual.json");
}

function upsertVisualFromPage(targetPageId, visualId, sourcePageId, sourceVisualId, transform) {
  const targetPath = visualPath(targetPageId, visualId);
  const source = readJson(sourceVisualPath(sourcePageId, sourceVisualId));
  const next = deepClone(source);
  next.name = visualId;
  if (typeof transform === "function") {
    transform(next);
  }
  ensureDir(path.dirname(targetPath));
  writeJson(targetPath, next);
}

function readPageJson(pageId) {
  return readJson(path.join(REPORT_ROOT, "pages", pageId, "page.json"));
}

function writePageJson(pageId, page) {
  writeJson(path.join(REPORT_ROOT, "pages", pageId, "page.json"), page);
}

function setPosition(pageId, visualId, position) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.position = { ...visual.position, ...position };
  writeJson(filePath, visual);
}

function setHidden(pageId, visualId, hidden) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.isHidden = hidden;
  writeJson(filePath, visual);
}

function setVisualContainerTitle(pageId, visualId, title, fontSize = "10D") {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual = visual.visual || {};
  visual.visual.visualContainerObjects = visual.visual.visualContainerObjects || {};
  visual.visual.visualContainerObjects.title = [
    {
      properties: {
        show: {
          expr: {
            Literal: {
              Value: "true",
            },
          },
        },
        text: literalExpr(title),
        fontSize: {
          expr: {
            Literal: {
              Value: fontSize,
            },
          },
        },
      },
    },
  ];
  writeJson(filePath, visual);
}

function setVisualContainerTitleVisibility(pageId, visualId, visible) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual = visual.visual || {};
  visual.visual.visualContainerObjects = visual.visual.visualContainerObjects || {};
  const titleBlock = visual.visual.visualContainerObjects.title?.[0]?.properties;
  if (!titleBlock) return;
  titleBlock.show = {
    expr: {
      Literal: {
        Value: visible ? "true" : "false",
      },
    },
  };
  writeJson(filePath, visual);
}

function standardizeBookmarkNavigatorVisual(pageId, visualId, options = {}) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  delete visual.isHidden;
  visual.position = {
    ...visual.position,
    ...(options.position ?? {}),
  };
  if (options.height != null) {
    visual.position.height = options.height;
  }
  if (options.width != null) {
    visual.position.width = options.width;
  }
  const textProps = visual.visual?.objects?.text?.[0]?.properties;
  if (textProps && options.fontSize) {
    textProps.fontSize = {
      expr: {
        Literal: {
          Value: options.fontSize,
        },
      },
    };
  }
  const titleProps = visual.visual?.visualContainerObjects?.title?.[0]?.properties;
  if (titleProps) {
    titleProps.show = {
      expr: {
        Literal: {
          Value: "false",
        },
      },
    };
  }
  const fillSelected = visual.visual?.objects?.fill?.[0]?.properties;
  if (fillSelected) {
    fillSelected.fillColor = {
      solid: {
        color: {
          expr: {
            Literal: {
              Value: `'${STANDARD_NAV_THEME.selectedFill}'`,
            },
          },
        },
      },
    };
  }
  const outlineSelected = visual.visual?.objects?.outline?.[0]?.properties;
  if (outlineSelected) {
    outlineSelected.lineColor = {
      solid: {
        color: {
          expr: {
            Literal: {
              Value: `'${STANDARD_NAV_THEME.selectedOutline}'`,
            },
          },
        },
      },
    };
  }
  const outlineDefault = visual.visual?.objects?.outline?.[1]?.properties;
  if (outlineDefault) {
    outlineDefault.show = {
      expr: {
        Literal: {
          Value: "true",
        },
      },
    };
    outlineDefault.lineColor = {
      solid: {
        color: {
          expr: {
            Literal: {
              Value: `'${STANDARD_NAV_THEME.defaultOutline}'`,
            },
          },
        },
      },
    };
  }
  const layoutProps = visual.visual?.objects?.layout?.[0]?.properties;
  if (layoutProps && options.cellPadding) {
    layoutProps.cellPadding = {
      expr: {
        Literal: {
          Value: options.cellPadding,
        },
      },
    };
  }
  writeJson(filePath, visual);
}

function buildColumnProjection(entity, property, displayName) {
  const projection = {
    field: {
      Column: {
        Expression: {
          SourceRef: {
            Entity: entity,
          },
        },
        Property: property,
      },
    },
    queryRef: `${entity}.${property}`,
    nativeQueryRef: property,
  };
  if (displayName) projection.displayName = displayName;
  return projection;
}

function buildMeasureProjection(entity, property, displayName) {
  const projection = {
    field: {
      Measure: {
        Expression: {
          SourceRef: {
            Entity: entity,
          },
        },
        Property: property,
      },
    },
    queryRef: `${entity}.${property}`,
    nativeQueryRef: property,
  };
  if (displayName) projection.displayName = displayName;
  return projection;
}

function buildCategoricalInFilter({ entity, property, values, filterName }) {
  return {
    name: filterName,
    field: {
      Column: {
        Expression: {
          SourceRef: {
            Entity: entity,
          },
        },
        Property: property,
      },
    },
    type: "Categorical",
    filter: {
      Version: 2,
      From: [
        {
          Name: "o",
          Entity: entity,
          Type: 0,
        },
      ],
      Where: [
        {
          Condition: {
            In: {
              Expressions: [
                {
                  Column: {
                    Expression: {
                      SourceRef: {
                        Source: "o",
                      },
                    },
                    Property: property,
                  },
                },
              ],
              Values: values.map((value) => [{ Literal: { Value: `'${value}'` } }]),
            },
          },
        },
      ],
    },
    howCreated: "User",
  };
}

function isColumnFilter(filter, entity, property) {
  return (
    filter?.field?.Column?.Expression?.SourceRef?.Entity === entity &&
    filter?.field?.Column?.Property === property
  );
}

function upsertCategoricalIncludeFilter(visual, { entity, property, values, filterName }) {
  const filterConfig = visual.filterConfig && typeof visual.filterConfig === "object" ? visual.filterConfig : {};
  const filters = Array.isArray(filterConfig.filters) ? [...filterConfig.filters] : [];
  const nextFilter = buildCategoricalInFilter({ entity, property, values, filterName });
  const existingIndex = filters.findIndex((filter) => isColumnFilter(filter, entity, property));
  if (existingIndex >= 0) {
    filters[existingIndex] = nextFilter;
  } else {
    filters.push(nextFilter);
  }
  visual.filterConfig = {
    ...filterConfig,
    filters,
  };
}

function buildTopNFilter({ entity, property, top, measureEntity, factEntity, factProperty, aggFunction }) {
  const subqueryFrom = [
    {
      Name: "d",
      Entity: entity,
      Type: 0,
    },
  ];

  if (measureEntity && measureEntity !== entity) {
    subqueryFrom.push({
      Name: "m",
      Entity: measureEntity,
      Type: 0,
    });
  }

  const orderByExpression =
    measureEntity && measureEntity !== entity
      ? {
          Measure: {
            Expression: {
              SourceRef: {
                Source: "m",
              },
            },
            Property: factProperty,
          },
        }
      : {
          Aggregation: {
            Expression: {
              Column: {
                Expression: {
                  SourceRef: {
                    Source: "d",
                  },
                },
                Property: factProperty,
              },
            },
            Function: aggFunction,
          },
        };

  return {
    filters: [
      {
        name: `${entity}-${property}-${top}`,
        field: {
          Column: {
            Expression: {
              SourceRef: {
                Entity: entity,
              },
            },
            Property: property,
          },
        },
        type: "TopN",
        filter: {
          Version: 2,
          From: [
            {
              Name: "subquery",
              Expression: {
                Subquery: {
                  Query: {
                    Version: 2,
                    From: subqueryFrom,
                    Select: [
                      {
                        Column: {
                          Expression: {
                            SourceRef: {
                              Source: "d",
                            },
                          },
                          Property: property,
                        },
                        Name: "field",
                      },
                    ],
                    OrderBy: [
                      {
                        Direction: 2,
                        Expression: orderByExpression,
                      },
                    ],
                    Top: top,
                  },
                },
              },
              Type: 2,
            },
            {
              Name: "d",
              Entity: entity,
              Type: 0,
            },
          ],
          Where: [
            {
              Condition: {
                In: {
                  Expressions: [
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "d",
                          },
                        },
                        Property: property,
                      },
                    },
                  ],
                  Table: {
                    SourceRef: {
                      Source: "subquery",
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ],
  };
}

function createRankingBarObjects() {
  return {
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
    valueAxis: [
      {
        properties: {
          showAxisTitle: {
            expr: {
              Literal: {
                Value: "false",
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
          innerPadding: {
            expr: {
              Literal: {
                Value: "36L",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "9D",
              },
            },
          },
        },
      },
    ],
    labels: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "true",
              },
            },
          },
          labelPosition: {
            expr: {
              Literal: {
                Value: "'InsideEnd'",
              },
            },
          },
          optimizeLabelDisplay: {
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

function createRankingColumnObjects() {
  return {
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
    valueAxis: [
      {
        properties: {
          showAxisTitle: {
            expr: {
              Literal: {
                Value: "false",
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
          fontSize: {
            expr: {
              Literal: {
                Value: "8D",
              },
            },
          },
          labelOverflow: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
        },
      },
    ],
    labels: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "true",
              },
            },
          },
          labelPosition: {
            expr: {
              Literal: {
                Value: "'OutsideEnd'",
              },
            },
          },
          optimizeLabelDisplay: {
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
        },
      },
    ],
  };
}

function createDonutObjects() {
  return {
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
    labels: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "true",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "6D",
              },
            },
          },
          labelStyle: {
            expr: {
              Literal: {
                Value: "'Category'",
              },
            },
          },
          labelPosition: {
            expr: {
              Literal: {
                Value: "'Inside'",
              },
            },
          },
          labelDisplayUnits: {
            expr: {
              Literal: {
                Value: "0D",
              },
            },
          },
        },
      },
    ],
    legend: [
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

function createTreemapObjects() {
  return {
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
    labels: [
      {
        properties: {
          show: {
            expr: {
              Literal: {
                Value: "true",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "9D",
              },
            },
          },
        },
      },
    ],
  };
}

function setBarChartBinding(pageId, visualId, category, measure, topN) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual.visualType = "clusteredBarChart";
  visual.visual.query = {
    queryState: {
      Category: {
        projections: [buildColumnProjection(category.entity, category.property, category.displayName)],
      },
      Y: {
        projections: [buildMeasureProjection(measure.entity, measure.property, measure.displayName)],
      },
    },
    sortDefinition: {
      sort: [
        {
          field: {
            Measure: {
              Expression: {
                SourceRef: {
                  Entity: measure.entity,
                },
              },
              Property: measure.property,
            },
          },
          direction: "Descending",
        },
      ],
    },
  };
  visual.visual.objects = createRankingBarObjects();
  visual.filterConfig = buildTopNFilter({
    entity: category.entity,
    property: category.property,
    top: topN,
    measureEntity: measure.entity,
    factEntity: measure.entity,
    factProperty: measure.sortProperty ?? measure.property,
    aggFunction: measure.aggFunction ?? 0,
  });
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setDonutChartBinding(pageId, visualId, category, measure, topN) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual.visualType = "donutChart";
  visual.visual.query = {
    queryState: {
      Category: {
        projections: [buildColumnProjection(category.entity, category.property, category.displayName)],
      },
      Y: {
        projections: [buildMeasureProjection(measure.entity, measure.property, measure.displayName)],
      },
    },
    sortDefinition: {
      sort: [
        {
          field: {
            Measure: {
              Expression: {
                SourceRef: {
                  Entity: measure.entity,
                },
              },
              Property: measure.property,
            },
          },
          direction: "Descending",
        },
      ],
    },
  };
  visual.filterConfig = buildTopNFilter({
    entity: category.entity,
    property: category.property,
    top: topN,
    measureEntity: measure.entity,
    factEntity: measure.entity,
    factProperty: measure.sortProperty ?? measure.property,
    aggFunction: measure.aggFunction ?? 0,
  });
  visual.visual.objects = createDonutObjects();
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setColumnChartBinding(pageId, visualId, category, measure, topN) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual.visualType = "clusteredColumnChart";
  visual.visual.query = {
    queryState: {
      Category: {
        projections: [buildColumnProjection(category.entity, category.property, category.displayName)],
      },
      Y: {
        projections: [buildMeasureProjection(measure.entity, measure.property, measure.displayName)],
      },
    },
    sortDefinition: {
      sort: [
        {
          field: {
            Measure: {
              Expression: {
                SourceRef: {
                  Entity: measure.entity,
                },
              },
              Property: measure.property,
            },
          },
          direction: "Descending",
        },
      ],
    },
  };
  visual.visual.objects = createRankingColumnObjects();
  visual.filterConfig = buildTopNFilter({
    entity: category.entity,
    property: category.property,
    top: topN,
    measureEntity: measure.entity,
    factEntity: measure.entity,
    factProperty: measure.sortProperty ?? measure.property,
    aggFunction: measure.aggFunction ?? 0,
  });
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function setTreemapBinding(pageId, visualId, groupField, measure, topN) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  visual.visual.visualType = "treemap";
  visual.visual.query = {
    queryState: {
      Group: {
        projections: [buildColumnProjection(groupField.entity, groupField.property, groupField.displayName)],
      },
      Values: {
        projections: [buildMeasureProjection(measure.entity, measure.property, measure.displayName)],
      },
    },
    sortDefinition: {
      sort: [
        {
          field: {
            Measure: {
              Expression: {
                SourceRef: {
                  Entity: measure.entity,
                },
              },
              Property: measure.property,
            },
          },
          direction: "Descending",
        },
      ],
    },
  };
  visual.visual.objects = createTreemapObjects();
  visual.filterConfig = buildTopNFilter({
    entity: groupField.entity,
    property: groupField.property,
    top: topN,
    measureEntity: measure.entity,
    factEntity: measure.entity,
    factProperty: measure.sortProperty ?? measure.property,
    aggFunction: measure.aggFunction ?? 0,
  });
  delete visual.isHidden;
  writeJson(filePath, visual);
}

function createDetailTableObjects() {
  return {
    columnHeaders: [
      {
        properties: {
          bold: {
            expr: {
              Literal: {
                Value: "false",
              },
            },
          },
          fontSize: {
            expr: {
              Literal: {
                Value: "9D",
              },
            },
          },
          backColor: {
            solid: {
              color: {
                expr: {
                  ThemeDataColor: {
                    ColorId: 0,
                    Percent: 0,
                  },
                },
              },
            },
          },
          fontColor: {
            solid: {
              color: {
                expr: {
                  ThemeDataColor: {
                    ColorId: 7,
                    Percent: 0,
                  },
                },
              },
            },
          },
        },
      },
    ],
    grid: [
      {
        properties: {
          rowPadding: {
            expr: {
              Literal: {
                Value: "5D",
              },
            },
          },
          textSize: {
            expr: {
              Literal: {
                Value: "9D",
              },
            },
          },
        },
      },
    ],
  };
}

function createOrUpdateDetailTable(pageId, visualId, title, columns) {
  upsertVisualFromPage(pageId, visualId, DETAIL_TABLE_SOURCE_PAGE_ID, DETAIL_TABLE_SOURCE_VISUAL_ID, (visual) => {
    visual.position = { ...DETAIL_TABLE_POSITION };
    visual.visual.visualType = "tableEx";
    visual.visual.query = {
      queryState: {
        Values: {
          projections: columns,
        },
      },
      sortDefinition: {
        sort: [
          {
            field: {
              Measure: {
                Expression: {
                  SourceRef: {
                    Entity: "Measure",
                  },
                },
                Property: "Valor Arbitrado Base",
              },
            },
            direction: "Descending",
          },
        ],
      },
    };
    visual.visual.objects = createDetailTableObjects();
    visual.visual.visualContainerObjects = {
      stylePreset: [
        {
          properties: {
            name: {
              expr: {
                Literal: {
                  Value: "'Sparse'",
                },
              },
            },
          },
        },
      ],
      background: [
        {
          properties: {
            show: {
              expr: {
                Literal: {
                  Value: "true",
                },
              },
            },
          },
        },
      ],
      title: [
        {
          properties: {
            show: {
              expr: {
                Literal: {
                  Value: "true",
                },
              },
            },
            text: {
              expr: {
                Literal: {
                  Value: `'${title}'`,
                },
              },
            },
          },
        },
      ],
    };
    delete visual.drillFilterOtherVisuals;
    delete visual.parentGroupName;
    delete visual.isHidden;
  });
}

function createOrUpdateCustomTable(pageId, visualId, position, title, columns) {
  upsertVisualFromPage(pageId, visualId, DETAIL_TABLE_SOURCE_PAGE_ID, DETAIL_TABLE_SOURCE_VISUAL_ID, (visual) => {
    visual.position = { ...position };
    visual.visual.visualType = "tableEx";
    visual.visual.query = {
      queryState: {
        Values: {
          projections: columns,
        },
      },
      sortDefinition: {
        sort: [
          {
            field: {
              Measure: {
                Expression: {
                  SourceRef: {
                    Entity: "Measure",
                  },
                },
                Property: "Valor Arbitrado Base",
              },
            },
            direction: "Descending",
          },
        ],
      },
    };
    visual.visual.objects = createDetailTableObjects();
    visual.visual.visualContainerObjects = {
      stylePreset: [
        {
          properties: {
            name: {
              expr: {
                Literal: {
                  Value: "'Sparse'",
                },
              },
            },
          },
        },
      ],
      background: [
        {
          properties: {
            show: {
              expr: {
                Literal: {
                  Value: "true",
                },
              },
            },
          },
        },
      ],
      title: [
        {
          properties: {
            show: {
              expr: {
                Literal: {
                  Value: "true",
                },
              },
            },
            text: literalExpr(title),
            fontSize: {
              expr: {
                Literal: {
                  Value: "9D",
                },
              },
            },
          },
        },
      ],
    };
    delete visual.drillFilterOtherVisuals;
    delete visual.parentGroupName;
    delete visual.isHidden;
  });
}

function extendEntityPages() {
  for (const [pageId, cfg] of Object.entries(ENTITY_PAGE_CANVAS_CONFIG)) {
    const page = readPageJson(pageId);
    page.height = cfg.height;
    page.displayOption = cfg.displayOption;
    writePageJson(pageId, page);

    setPosition(pageId, cfg.mainBackgroundId, { height: cfg.height });
    setPosition(pageId, cfg.sidebarBackgroundId, { height: cfg.height - 0.0533365658525 });
    setPosition(pageId, cfg.sidebarPanelId, { height: cfg.height - 171 - 30 });
  }
}

function setChartTitle(visual, title) {
  const titleBlock = visual.visual?.visualContainerObjects?.title?.[0]?.properties;
  if (!titleBlock) return;
  titleBlock.show = {
    expr: {
      Literal: {
        Value: "true",
      },
    },
  };
  titleBlock.text = {
    expr: {
      Literal: {
        Value: `'${title}'`,
      },
    },
  };
}

function createExtraChart(pageId, chartId, measureProperty, title) {
  upsertVisual(pageId, chartId, "c35f2c23e04ae096e02f", (visual) => {
    visual.parentGroupName = "acee2d020bb8c1c4903b";
    visual.position = { ...EXTRA_CHART_INNER_POSITION };
    visual.visual.visualType = "lineChart";
    visual.visual.objects = createGenericChartObjects();
    setChartTitle(visual, title);
    delete visual.isHidden;
  });
  setChartMeasure(pageId, chartId, measureProperty);
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
    topInnerPanel.isHidden = true;
    writeJson(visualPath(pageId, CHART_TYPE_TOP_OUTER_PANEL_ID), topOuterPanel);
    writeJson(visualPath(pageId, CHART_TYPE_TOP_INNER_PANEL_ID), topInnerPanel);

    const legacyHeaderGroup = readJson(visualPath(pageId, CHART_TYPE_LEGACY_HEADER_GROUP_ID));
    legacyHeaderGroup.isHidden = true;
    writeJson(visualPath(pageId, CHART_TYPE_LEGACY_HEADER_GROUP_ID), legacyHeaderGroup);

    for (const panelId of CHART_TYPE_UNUSED_PANEL_IDS) {
      const panel = readJson(visualPath(pageId, panelId));
      panel.isHidden = true;
      writeJson(visualPath(pageId, panelId), panel);
    }

    const histWrapper = readJson(visualPath(pageId, cfg.wrappers.hist));
    const wrapperPosition = {
      x: (topOuterPanel.position?.x || 0) + (topInnerPanel.position?.x || 0),
      y: (topOuterPanel.position?.y || 0) + (topInnerPanel.position?.y || 0),
      z: (topOuterPanel.position?.z || 0) + 1000,
      height: topInnerPanel.position?.height || STANDARD_PRIMARY_CHART_POSITION.height,
      width: topInnerPanel.position?.width || STANDARD_PRIMARY_CHART_POSITION.width,
      tabOrder: (topOuterPanel.position?.tabOrder || 0) + 1000,
    };
    const histVisual = readJson(visualPath(pageId, cfg.visuals.hist));
    const baseQuery = deepClone(histVisual.visual.query);
    const baseChildPosition = {
      x: 0,
      y: 0,
      z: 0,
      height: wrapperPosition.height,
      width: wrapperPosition.width,
      tabOrder: 0,
    };
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
      delete wrapper.parentGroupName;
      wrapper.visualGroup.displayName = cfg.bookmarkLabels[key];
      wrapper.isHidden = key !== "hist";
      writeJson(visualPath(pageId, wrapperId), wrapper);

      const visual = readJson(visualPath(pageId, visualId));
      visual.parentGroupName = wrapperId;
      visual.position = { ...baseChildPosition };
      visual.visual.visualType = chartTypes[key];
      visual.visual.query = deepClone(baseQuery);
      visual.visual.objects = createGenericChartObjects();
      visual.isHidden = key !== "hist";
      writeJson(visualPath(pageId, visualId), visual);
      setChartMeasure(pageId, visualId, "Valor Arbitrado Base");
    }

    for (const [bookmarkKey, bookmarkId] of Object.entries(cfg.bookmarks)) {
      writeMinimalVisualDisplayBookmark({
        bookmarkId,
        displayName: cfg.bookmarkLabels[bookmarkKey],
        pageId,
        targetVisualStates: Object.fromEntries(
          Object.entries(cfg.visuals).map(([key, visualId]) => [
            visualId,
            {
              visualType: chartTypes[key],
              hidden: key !== bookmarkKey,
            },
          ])
        ),
      });
    }

    upsertBookmarkGroup(
      bookmarks,
      cfg.bookmarkGroupId,
      cfg.bookmarkGroupDisplayName,
      Object.values(cfg.bookmarks)
    );

    const navigator = readJson(visualPath(pageId, cfg.navigatorId));
    delete navigator.isHidden;
    navigator.position = { ...navigator.position, ...STANDARD_PRIMARY_CHART_NAV_POSITION };
    updateBookmarkSelected(navigator, cfg.defaultBookmarkId);
    navigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
      expr: {
        Literal: {
          Value: `'${cfg.bookmarkGroupId}'`,
        },
      },
    };
    writeJson(visualPath(pageId, cfg.navigatorId), navigator);

    const modeLabel = readJson(visualPath(pageId, cfg.modeLabelId));
    delete modeLabel.isHidden;
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
      group.position = { ...STANDARD_PRIMARY_CHART_POSITION };
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
      const baseChildPosition = {
        x: 0,
        y: 0,
        z: 0,
        height: STANDARD_PRIMARY_CHART_POSITION.height,
        width: STANDARD_PRIMARY_CHART_POSITION.width,
        tabOrder: 0,
      };

      for (const [key, groupId] of Object.entries(groups)) {
        const visualId = childVisuals[key];
        if (!visualId) continue;
        const visual = readJson(visualPath(pageId, visualId));
        visual.parentGroupName = groupId;
        visual.position = { ...baseChildPosition };
        visual.visual.visualType = chartTypes[key];
        visual.visual.query = deepClone(baseQuery);
        visual.visual.objects = createGenericChartObjects();
        visual.isHidden = key !== "hist";
        writeJson(visualPath(pageId, visualId), visual);
        setChartMeasure(pageId, visualId, "Valor Arbitrado Base");
      }

      for (const [key, bookmarkId] of Object.entries(pageBookmarks)) {
        writeMinimalVisualDisplayBookmark({
          bookmarkId,
          displayName: bookmarkLabels[key],
          pageId,
          targetVisualStates: Object.fromEntries(
            Object.entries(childVisuals).map(([stateKey, visualId]) => [
              visualId,
              {
                visualType: chartTypes[stateKey],
                hidden: stateKey !== key,
              },
            ])
          ),
        });
      }
    }

    upsertBookmarkGroup(
      bookmarks,
      bookmarkGroupId,
      bookmarkGroupDisplayName,
      Object.values(pageBookmarks)
    );

    const navigator = readJson(visualPath(pageId, navigatorId));
    delete navigator.isHidden;
    navigator.position = { ...navigator.position, ...STANDARD_PRIMARY_CHART_NAV_POSITION };
    updateBookmarkSelected(navigator, defaultBookmarkId);
    navigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
      expr: {
        Literal: {
          Value: `'${bookmarkGroupId}'`,
        },
      },
    };
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

function removeBookmarkArtifacts(groupIds, bookmarkIds) {
  const bookmarks = readJson(BOOKMARKS_PATH);
  bookmarks.items = bookmarks.items.filter(
    (item) => !groupIds.includes(item.name) && !bookmarkIds.includes(item.name)
  );
  writeJson(BOOKMARKS_PATH, bookmarks);

  for (const bookmarkId of bookmarkIds) {
    const filePath = bookmarkPath(bookmarkId);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
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

function writeMinimalVisualDisplayBookmark({ bookmarkId, displayName, pageId, targetVisualStates }) {
  const targetVisualNames = Object.keys(targetVisualStates);
  const visualContainers = Object.fromEntries(
    Object.entries(targetVisualStates).map(([visualId, state]) => {
      const singleVisual = {
        visualType: state.visualType,
        objects: {},
      };
      if (state.hidden) {
        singleVisual.display = {
          mode: "hidden",
        };
      }
      return [visualId, { singleVisual }];
    })
  );

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
          visualContainers,
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

  setChartMeasure(pageId, "07c5dfc89d70d1658ac3", "Valor Arbitrado");
  setChartMeasure(pageId, "c35f2c23e04ae096e02f", "Qtd Perícias");
  setChartMeasure(pageId, "cdc1b6c2cd04d7b04dd7", "Peritos Distintos");

  for (const chartId of ["07c5dfc89d70d1658ac3", "c35f2c23e04ae096e02f", "cdc1b6c2cd04d7b04dd7"]) {
    const chartPath = visualPath(pageId, chartId);
    const chart = readJson(chartPath);
    chart.visual.visualType = "lineChart";
    chart.visual.objects = createGenericChartObjects();
    delete chart.isHidden;
    writeJson(chartPath, chart);
  }

  const midGroup = readJson(visualPath(pageId, "acee2d020bb8c1c4903b"));
  midGroup.position = {
    x: 202.9902077860043,
    y: 252.22098385602504,
    z: 8000,
    width: 626.0902794363507,
    height: 217,
    tabOrder: 16000,
  };
  delete midGroup.isHidden;
  writeJson(visualPath(pageId, "acee2d020bb8c1c4903b"), midGroup);

  const lowGroup = readJson(visualPath(pageId, "5c438973c435b483aa95"));
  lowGroup.position = {
    x: 202.9902077860043,
    y: 482.61271288873627,
    z: 4000,
    width: 621.8849627250136,
    height: 217,
    tabOrder: 17000,
  };
  delete lowGroup.isHidden;
  writeJson(visualPath(pageId, "5c438973c435b483aa95"), lowGroup);

  setTextLabel(pageId, "1d2bf754849f2eb3a1c4", "Qtd Pericias ao Longo do Tempo");
  setTextLabel(pageId, "5af0fe7f69a26356dd74", "Curva historica de volume");
  setTextLabel(pageId, "25e0de9a58874d1a36db", "Valor Arbitrado ao Longo do Tempo");
  setTextLabel(pageId, "ffcf14e5603b23436829", "Curva historica de gasto");
  setTextLabel(pageId, "f8b1564b60ef32bcfa87", "Modo: escolha o tipo de grafico");
}

function addExtraChartsToDetailPages() {
  for (const [pageId, cfg] of Object.entries(DETAIL_EXTRA_CHARTS)) {
    const chartPanel = readJson(visualPath(pageId, "acee2d020bb8c1c4903b"));
    chartPanel.position = { ...EXTRA_CHART_SLOT };
    delete chartPanel.isHidden;
    writeJson(visualPath(pageId, "acee2d020bb8c1c4903b"), chartPanel);

    createExtraChart(pageId, cfg.chartId, cfg.measure, cfg.title);

    const titleGroup = readJson(visualPath(pageId, "51d63b4f58c8609a1a33"));
    delete titleGroup.isHidden;
    writeJson(visualPath(pageId, "51d63b4f58c8609a1a33"), titleGroup);

    const titleBox = readJson(visualPath(pageId, "1d2bf754849f2eb3a1c4"));
    titleBox.position = { ...EXTRA_CHART_HEADER_POSITION };
    updateTextboxValue(titleBox, cfg.title);
    delete titleBox.isHidden;
    writeJson(visualPath(pageId, "1d2bf754849f2eb3a1c4"), titleBox);

    const subtitleBox = readJson(visualPath(pageId, "5af0fe7f69a26356dd74"));
    subtitleBox.position = { ...EXTRA_CHART_SUBHEADER_POSITION };
    updateTextboxValue(subtitleBox, cfg.subtitle);
    delete subtitleBox.isHidden;
    writeJson(visualPath(pageId, "5af0fe7f69a26356dd74"), subtitleBox);

    const rightTitle = readJson(visualPath(pageId, "1ec0e6adc7607be01bdd"));
    updateTextboxValue(rightTitle, cfg.highlightTitle);
    delete rightTitle.isHidden;
    writeJson(visualPath(pageId, "1ec0e6adc7607be01bdd"), rightTitle);

    const highlightCard = readJson(visualPath(pageId, cfg.cardId));
    delete highlightCard.isHidden;
    writeJson(visualPath(pageId, cfg.cardId), highlightCard);
  }
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

function configureCruzamentosPage() {
  const pageId = "82ff2dfb93623b9eeb6c";
  const page = readPageJson(pageId);
  page.height = 980;
  page.displayOption = "FitToWidth";
  delete page.visibility;
  writePageJson(pageId, page);

  setPosition(pageId, "301f18119397cb656803", { height: 979.9466634341475 });
  setPosition(pageId, "a40efbf69139973c4735", {
    height: 980.2483878672081,
    width: 1109.109147360879,
  });

  [
    "6b882b30e9d35ad7104b",
    "3ae138c0070d9535eab0",
    "54e7fcce680019d79758",
    "15e477a15641386c8885",
    "532a7c0bfd9cd446e505",
    "5e740dcfc97e99a9208d",
    "0694802c908372e455d6",
    "d0ade5bea6e3bfa614d9",
    "89f74e7669fe3e91eb5a",
    "2c123080474d0bc71651",
    "209d2c9fa931e68f2177",
    "b4bd3b8784ca7b06aa9a",
    "db5cdbd9253d5d85ecfa",
    "3e7367399ce208251f7a",
    "3ecd385e0823aad23b76",
  ].forEach((visualId) => setHidden(pageId, visualId, true));
  setHidden(pageId, "055bca1490f437da7149", true);
  setHidden(pageId, "8a25d0234525a8ef9a69", false);
  setHidden(pageId, "feaf95fcf54bcc5d3a2b", true);
  setHidden(pageId, "c9a79e210484f61718be", true);
  setHidden(pageId, "cedc6b6b1891cb3f0963", true);

  setBarChartBinding(
    pageId,
    "7001e63689bf0fe0ad3f",
    { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );
  setBarChartBinding(
    pageId,
    "316e18ad0d4eb3ce8177",
    { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );
  setBarChartBinding(
    pageId,
    "d9d8f17ef9af19daf21f",
    { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );

  setTextLabel(pageId, "658ca0095a407531586f", "Top 10 Varas por Valor");
  setTextLabel(pageId, "fd849ce2439bbbba879b", "Top 10 Peritos por Valor");
  setTextLabel(pageId, "be4d85c8f71b4972f53b", "Top 10 Peritos por Valor");
  setTextLabel(pageId, "228ebdbd38ce5bbddfd6", "Top 10 Especialidades por Valor");

  setHidden(pageId, "fd849ce2439bbbba879b", false);

  setPosition(pageId, "b08f93bb0866e5af89ad", {
    x: 205.9503506981505,
    y: 21.94659732067458,
    width: 318,
    height: 255,
  });
  setPosition(pageId, "66f8a48cf31c935a5b46", {
    x: 562,
    y: 21.94659732067458,
    width: 318,
    height: 255,
  });
  setPosition(pageId, "d581dbe83ada4d298e9d", {
    x: 918,
    y: 21.94659732067458,
    width: 318,
    height: 255,
  });
  setPosition(pageId, "658ca0095a407531586f", {
    x: 16,
    y: 0,
    width: 220,
    height: 36,
  });
  setPosition(pageId, "fd849ce2439bbbba879b", {
    x: 16,
    y: 0,
    width: 220,
    height: 36,
  });
  setPosition(pageId, "228ebdbd38ce5bbddfd6", {
    x: 16,
    y: 0,
    width: 240,
    height: 36,
  });
  setPosition(pageId, "7001e63689bf0fe0ad3f", {
    x: 14,
    y: 52,
    width: 288,
    height: 182,
  });
  setPosition(pageId, "316e18ad0d4eb3ce8177", {
    x: 14,
    y: 52,
    width: 288,
    height: 182,
  });
  setPosition(pageId, "d9d8f17ef9af19daf21f", {
    x: 14,
    y: 52,
    width: 288,
    height: 182,
  });

  createOrUpdateCustomTable(
    pageId,
    "57b5ea49ef39b6022b88",
    {
      x: 205.9503506981505,
      y: 618,
      z: 18000,
      height: 230,
      width: 318,
      tabOrder: 17000,
    },
    "Detalhe de Varas",
    [
      buildColumnProjection("FactPericias", "JuizoExibicao", "Vara"),
      buildColumnProjection("FactPericias", "ComarcaExibicao", "Comarca"),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
    ]
  );
  createOrUpdateCustomTable(
    pageId,
    "5ab18e24ca23a9b7614d",
    {
      x: 562,
      y: 618,
      z: 22000,
      height: 230,
      width: 318,
      tabOrder: 21000,
    },
    "Detalhe de Peritos",
    [
      buildColumnProjection("FactPericias", "PeritoNomeExibicao", "Perito"),
      buildColumnProjection("FactPericias", "EspecialidadeExibicao", "Especialidade"),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
    ]
  );
  createOrUpdateCustomTable(
    pageId,
    "5ff5982cc919326c4378",
    {
      x: 918,
      y: 618,
      z: 23000,
      height: 230,
      width: 318,
      tabOrder: 22000,
    },
    "Detalhe de Especialidades",
    [
      buildColumnProjection("FactPericias", "EspecialidadeExibicao", "Especialidade"),
      buildColumnProjection("FactPericias", "ComarcaExibicao", "Comarca"),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
    ]
  );

  if (fs.existsSync(visualPath(pageId, "a7c5b2d9f1840e63c2ab"))) {
    const trend = readJson(visualPath(pageId, "a7c5b2d9f1840e63c2ab"));
    trend.visual.visualType = "lineChart";
    trend.visual.objects = createGenericChartObjects();
    trend.position = {
      ...trend.position,
      x: 205.9503506981505,
      y: 318,
      width: 676,
      height: 250,
      tabOrder: 23000,
    };
    writeJson(visualPath(pageId, "a7c5b2d9f1840e63c2ab"), trend);
    setChartMeasure(pageId, "a7c5b2d9f1840e63c2ab", "Valor Arbitrado Base");
    setVisualContainerTitle(pageId, "a7c5b2d9f1840e63c2ab", "Tendência de Valor Arbitrado", "10D");
  }

  setPosition(pageId, "8a25d0234525a8ef9a69", {
    x: 918,
    y: 318,
    width: 318,
    height: 250,
  });
  if (fs.existsSync(visualPath(pageId, "8a25d0234525a8ef9a69"))) {
    const agingGroup = readJson(visualPath(pageId, "8a25d0234525a8ef9a69"));
    if (agingGroup.visualGroup) agingGroup.visualGroup.displayName = "Distribuição por Aging";
    writeJson(visualPath(pageId, "8a25d0234525a8ef9a69"), agingGroup);
  }
  if (fs.existsSync(visualPath(pageId, "a91c817375176beaccfc"))) {
    const agingHeader = readJson(visualPath(pageId, "a91c817375176beaccfc"));
    if (agingHeader.visualGroup) agingHeader.visualGroup.displayName = "Cabeçalho Aging";
    agingHeader.position = {
      ...agingHeader.position,
      x: 8,
      y: 0,
      width: 302,
      height: 32,
    };
    writeJson(visualPath(pageId, "a91c817375176beaccfc"), agingHeader);
  }
  setPosition(pageId, "bc9521bfb3bbaeccb209", {
    x: 0,
    y: 0,
    width: 210,
    height: 32,
  });
  setTextLabel(pageId, "bc9521bfb3bbaeccb209", "Distribuição por Aging");
  setPosition(pageId, "3b4618b308b187a14feb", {
    x: 0,
    y: 34,
    width: 318,
    height: 190,
  });
  setTreemapBinding(
    pageId,
    "3b4618b308b187a14feb",
    { entity: "FactPericias", property: "AgingFaixa", displayName: "Aging" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    6
  );
  setVisualContainerTitle(pageId, "3b4618b308b187a14feb", "Distribuição por Aging", "10D");
  setVisualContainerTitleVisibility(pageId, "3b4618b308b187a14feb", false);
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

function hideTitleOverlays() {
  for (const [pageId, visualIds] of Object.entries(TITLE_OVERLAY_HIDE)) {
    for (const visualId of visualIds) {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) continue;
      const visual = readJson(filePath);
      visual.isHidden = true;
      writeJson(filePath, visual);
    }
  }
}

function cleanTrendLowerRow() {
  const pageId = "480be36186f85cc3c324";
  for (const visualId of TENDENCIA_STRAY_LOWER_ROW_HIDE) {
    const filePath = visualPath(pageId, visualId);
    if (!fs.existsSync(filePath)) continue;
    const visual = readJson(filePath);
    visual.isHidden = true;
    writeJson(filePath, visual);
  }
}

function configureSidebarLayouts() {
  for (const [pageId, cfg] of Object.entries(SIDEBAR_LAYOUT_CONFIG)) {
    const page = readPageJson(pageId);
    page.height = cfg.pageHeight;
    page.displayOption = cfg.displayOption;
    writePageJson(pageId, page);

    setPosition(pageId, cfg.mainBackgroundId, {
      height: cfg.pageHeight,
    });
    setPosition(pageId, cfg.sidebarBackgroundId, {
      height: cfg.pageHeight - 0.0533365658525,
    });
    setPosition(pageId, cfg.sidebarPanelId, {
      y: 171,
      height: cfg.pageHeight - 200,
    });
    setHidden(pageId, cfg.titleOverlayId, true);
    setPosition(pageId, cfg.pageNavigatorId, {
      x: 8,
      y: 182,
      width: 158,
      height: 300,
    });
    setPosition(pageId, cfg.yearLabelId, {
      x: 18,
      y: 530,
      width: 145,
      height: 30,
    });
    setPosition(pageId, cfg.yearSlicerId, {
      x: 12,
      y: 555,
      width: 151.63123955099115,
      height: 54,
    });
    setPosition(pageId, cfg.monthLabelId, {
      x: 18,
      y: 635,
      width: 167,
      height: 30,
    });
    setPosition(pageId, cfg.monthSlicerId, {
      x: 12,
      y: 660,
      width: 151.63123955099115,
      height: 53,
    });
  }
}

function simplifyVariationLabels() {
  for (const [pageId, visualIds] of Object.entries(VARIATION_LABELS_BY_PAGE)) {
    visualIds.forEach((visualId) => {
      setTextLabel(pageId, visualId, "Var");
      setTextboxFontSize(pageId, visualId, "10pt");
    });
  }
}

function configureOverviewSummary() {
  const bookmarks = readJson(BOOKMARKS_PATH);
  const { pageId, left, right } = OVERVIEW_SUMMARY_CONFIG;
  const overviewPage = readPageJson(pageId);
  overviewPage.height = 900;
  overviewPage.displayOption = "FitToWidth";
  writePageJson(pageId, overviewPage);

  setPosition(pageId, "cbb9050b7ce28900e44a", {
    height: 900,
    width: 1108.0851063829787,
  });
  setPosition(pageId, "0325c4e7ec01108ac90b", {
    height: 899.9466634341475,
  });
  setPosition(pageId, "aa00bb11cc22dd33ee42", {
    y: 171,
    height: 700,
  });
  setHidden(pageId, "66f7c5422ecb46c4a0fa", true);
  setHidden(pageId, "c8938c6da410891b5040", true);
  setHidden(pageId, left.navigatorId, true);
  setHidden(pageId, right.navigatorId, true);
  setHidden(pageId, "e1b04cb7aad1837227ba", true);
  setHidden(pageId, "e85feb694080c3b3bc21", true);
  setHidden(pageId, "8bf3bac09e4e3528d02a", true);
  setHidden(pageId, "db2731d2e8a48055475a", true);
  setHidden(pageId, "fec209241e28d2185094", true);
  setPosition(pageId, "5d705d8ba8a6c89a0671", {
    x: 202.9902077860043,
    y: 446,
    width: 1048,
    height: 390,
  });
  setPosition(pageId, "4add58a884080dc1479c", {
    y: 165.09121764955452,
    height: 276,
  });

  setBarChartBinding(
    pageId,
    left.charts.comarcas,
    { entity: "Orders", property: "State Mapa", displayName: "Comarca" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    5
  );
  setColumnChartBinding(
    pageId,
    left.charts.varas,
    { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    5
  );
  setBarChartBinding(
    pageId,
    right.charts.peritos,
    { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    5
  );
  setTreemapBinding(
    pageId,
    right.charts.especialidades,
    { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    5
  );

  const layout = {
    comarcas: {
      groupId: left.groups.comarcas,
      headerId: "37ebee5606422016e610",
      titleId: "04ae690c03b1748a60e1",
      subtitleId: "bb6dc63c95c92ece933a",
      chartId: left.charts.comarcas,
      groupPos: { x: 232, y: 470, width: 470, height: 160, z: 19000, tabOrder: 2000 },
    },
    varas: {
      groupId: left.groups.varas,
      headerId: "c6edf0bd562dde90d345",
      titleId: "81808ee2e04cb5a44453",
      subtitleId: "06008ec31a834a664a82",
      chartId: left.charts.varas,
      groupPos: { x: 735, y: 470, width: 470, height: 160, z: 19100, tabOrder: 2100 },
    },
    peritos: {
      groupId: right.groups.peritos,
      headerId: "76b36fe27595d22aab08",
      titleId: "0dec849700348dcb5b4a",
      subtitleId: "695545bd2abe7cd323a2",
      chartId: right.charts.peritos,
      groupPos: { x: 232, y: 652, width: 470, height: 160, z: 19200, tabOrder: 2200 },
    },
    especialidades: {
      groupId: right.groups.especialidades,
      headerId: "9a2fb820725e4b63c670",
      titleId: "ff6b88429017dbc20ae9",
      subtitleId: "add260de38365a4d45a7",
      chartId: right.charts.especialidades,
      groupPos: { x: 735, y: 652, width: 470, height: 160, z: 19300, tabOrder: 2300 },
    },
  };

  for (const cfg of Object.values(layout)) {
    setPosition(pageId, cfg.groupId, cfg.groupPos);
    setPosition(pageId, cfg.headerId, {
      x: 0,
      y: 0,
      width: cfg.groupPos.width,
      height: 34,
    });
    setPosition(pageId, cfg.titleId, {
      x: 0,
      y: 0,
      width: 260,
      height: 28,
    });
    setPosition(pageId, cfg.chartId, {
      x: 0,
      y: 28,
      width: cfg.groupPos.width,
      height: 126,
    });
    setHidden(pageId, cfg.groupId, false);
    setHidden(pageId, cfg.subtitleId, true);
  }

  setTextLabel(pageId, layout.comarcas.titleId, "Top 5 Comarcas por Valor");
  setTextLabel(pageId, layout.varas.titleId, "Top 5 Varas por Valor");
  setTextLabel(pageId, layout.peritos.titleId, "Top 5 Peritos por Valor");
  setTextLabel(pageId, layout.especialidades.titleId, "Top 5 Especialidades por Valor");

  setTextboxMeasure(pageId, "c1ffe8209c0d20ba00a9", "Valor Médio por Perícia Base", "R$ #,0.00;(R$ #,0.00);R$ #,0.00");
  setTextLabel(pageId, "bfb0cddd400eb2900509", "Ticket médio");
  setHidden(pageId, "bfb0cddd400eb2900509", false);
  setTextLabel(pageId, "608d654032270cbb431d", "Média diária");
  ["f3de4e402caca2606d87", "608d654032270cbb431d", "4ffb18dd757aab970d7b", "53c66d29d5a7934b053c", "bfb0cddd400eb2900509"].forEach((visualId) => {
    setTextboxFontSize(pageId, visualId, "12pt");
  });

  writeMinimalGroupBookmark({
    bookmarkId: left.bookmarks.comarcas.id,
    displayName: left.bookmarks.comarcas.displayName,
    pageId,
    targetVisualNames: Object.values(left.groups),
    hiddenStates: {
      [left.groups.comarcas]: false,
      [left.groups.varas]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: left.bookmarks.varas.id,
    displayName: left.bookmarks.varas.displayName,
    pageId,
    targetVisualNames: Object.values(left.groups),
    hiddenStates: {
      [left.groups.comarcas]: true,
      [left.groups.varas]: false,
    },
  });
  upsertBookmarkGroup(bookmarks, left.bookmarkGroupId, left.bookmarkGroupDisplayName, [
    left.bookmarks.comarcas.id,
    left.bookmarks.varas.id,
  ]);

  writeMinimalGroupBookmark({
    bookmarkId: right.bookmarks.peritos.id,
    displayName: right.bookmarks.peritos.displayName,
    pageId,
    targetVisualNames: Object.values(right.groups),
    hiddenStates: {
      [right.groups.peritos]: false,
      [right.groups.especialidades]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: right.bookmarks.especialidades.id,
    displayName: right.bookmarks.especialidades.displayName,
    pageId,
    targetVisualNames: Object.values(right.groups),
    hiddenStates: {
      [right.groups.peritos]: true,
      [right.groups.especialidades]: false,
    },
  });
  upsertBookmarkGroup(bookmarks, right.bookmarkGroupId, right.bookmarkGroupDisplayName, [
    right.bookmarks.peritos.id,
    right.bookmarks.especialidades.id,
  ]);

  const leftNavigator = readJson(visualPath(pageId, left.navigatorId));
  leftNavigator.position = { ...left.buttonPosition };
  updateBookmarkSelected(leftNavigator, left.defaultBookmarkId);
  leftNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: {
      Literal: {
        Value: `'${left.bookmarkGroupId}'`,
      },
    },
  };
  writeJson(visualPath(pageId, left.navigatorId), leftNavigator);

  const rightNavigator = readJson(visualPath(pageId, right.navigatorId));
  rightNavigator.position = { ...right.buttonPosition };
  updateBookmarkSelected(rightNavigator, right.defaultBookmarkId);
  rightNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: {
      Literal: {
        Value: `'${right.bookmarkGroupId}'`,
      },
    },
  };
  rightNavigator.isHidden = true;
  writeJson(visualPath(pageId, right.navigatorId), rightNavigator);

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function standardizePrimaryChartBoxes() {
  const navigatorConfigs = [
    ...Object.values(TOP_GRAPH_PAGES).map((cfg) => ({
      pageId: cfg.pageId,
      navigatorId: cfg.navigatorId,
      visualIds: Object.values(TOP_GRAPH_VISUALS[cfg.pageId] || {}),
    })),
    ...Object.entries(CHART_TYPE_TOGGLE_PAGES).map(([pageId, cfg]) => ({
      pageId,
      navigatorId: cfg.navigatorId,
      visualIds: Object.values(cfg.visuals || {}),
    })),
  ];

  for (const cfg of navigatorConfigs) {
    standardizeBookmarkNavigatorVisual(cfg.pageId, cfg.navigatorId, {
      position: STANDARD_PRIMARY_CHART_NAV_POSITION,
      height: 12,
      width: 104,
      fontSize: "4D",
      cellPadding: "0L",
    });

    const title = PRIMARY_CHART_ENTITY_TITLES[cfg.pageId];
    if (!title) continue;
    cfg.visualIds.forEach((visualId) => {
      setVisualContainerTitle(cfg.pageId, visualId, title, "9D");
    });
  }
}

function standardizeMapBoxes() {
  const bookmarks = readJson(BOOKMARKS_PATH);

  for (const cfg of Object.values(MAP_BOX_CONFIG)) {
    if (!fs.existsSync(visualPath(cfg.pageId, cfg.mapVisualId))) {
      upsertVisualFromPage(
        cfg.pageId,
        cfg.mapVisualId,
        "d4f6a8c0b3e57921f234",
        "8f6d1b81e9832be53e52",
        (visual) => {
          delete visual.isHidden;
        }
      );
    }
    if (!fs.existsSync(visualPath(cfg.pageId, cfg.legendId))) {
      upsertVisualFromPage(
        cfg.pageId,
        cfg.legendId,
        "d4f6a8c0b3e57921f234",
        "54ef9ab629d981721784",
        (visual) => {
          delete visual.parentGroupName;
          delete visual.isHidden;
        }
      );
    }

    const mapFilePath = visualPath(cfg.pageId, cfg.mapVisualId);
    if (!fs.existsSync(mapFilePath)) continue;

    if (!fs.existsSync(visualPath(cfg.pageId, cfg.navigatorId)) && cfg.navigatorSourcePageId && cfg.navigatorSourceVisualId) {
      upsertVisualFromPage(
        cfg.pageId,
        cfg.navigatorId,
        cfg.navigatorSourcePageId,
        cfg.navigatorSourceVisualId,
        (visual) => {
          delete visual.isHidden;
        }
      );
    }

    const mapVisual = readJson(mapFilePath);
    if (cfg.boxPosition) {
      mapVisual.position = { ...mapVisual.position, ...cfg.boxPosition };
      delete mapVisual.isHidden;
      writeJson(mapFilePath, mapVisual);
    }
    const mapPosition = { ...mapVisual.position };
    const navigatorPosition = {
      x: Math.max(0, Math.round((mapPosition.x || 0) + (mapPosition.width || 0) - 68)),
      y: Math.max(0, Math.round((mapPosition.y || 0) - 14)),
      z: (mapPosition.z || 0) + 5000,
      height: 12,
      width: 64,
      tabOrder: (mapPosition.tabOrder || 0) + 5000,
    };

    standardizeBookmarkNavigatorVisual(cfg.pageId, cfg.navigatorId, {
      position: navigatorPosition,
      height: 12,
      width: 64,
      fontSize: "4D",
      cellPadding: "0L",
    });

    setPosition(cfg.pageId, cfg.legendId, {
      x: mapPosition.x,
      y: mapPosition.y + mapPosition.height + 6,
      width: mapPosition.width,
      height: 18,
      z: mapPosition.z + 4000,
      tabOrder: mapPosition.tabOrder + 4000,
    });
    const legendPath = visualPath(cfg.pageId, cfg.legendId);
    if (fs.existsSync(legendPath)) {
      const legendVisual = readJson(legendPath);
      delete legendVisual.parentGroupName;
      delete legendVisual.isHidden;
      writeJson(legendPath, legendVisual);
    }

    setTextLabel(
      cfg.pageId,
      cfg.legendId,
      "Legenda: claro = menor valor | escuro = maior valor | botão Nomes = lista"
    );
    setTextboxFontSize(cfg.pageId, cfg.legendId, "7pt");

    createOrUpdateCustomTable(
      cfg.pageId,
      cfg.namesTableId,
      {
        ...mapPosition,
        z: (mapPosition.z || 0) + 1000,
        tabOrder: (mapPosition.tabOrder || 0) + 1,
      },
      cfg.namesTitle,
      [
        buildColumnProjection("Orders", "State Mapa", "Nome"),
        buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
      ]
    );
    setHidden(cfg.pageId, cfg.namesTableId, true);
    setVisualContainerTitleVisibility(cfg.pageId, cfg.namesTableId, false);

    writeMinimalVisualDisplayBookmark({
      bookmarkId: cfg.bookmarks.map.id,
      displayName: cfg.bookmarks.map.displayName,
      pageId: cfg.pageId,
      targetVisualStates: {
        [cfg.mapVisualId]: {
          visualType: "shapeMap",
          hidden: false,
        },
        [cfg.namesTableId]: {
          visualType: "tableEx",
          hidden: true,
        },
      },
    });

    writeMinimalVisualDisplayBookmark({
      bookmarkId: cfg.bookmarks.names.id,
      displayName: cfg.bookmarks.names.displayName,
      pageId: cfg.pageId,
      targetVisualStates: {
        [cfg.mapVisualId]: {
          visualType: "shapeMap",
          hidden: true,
        },
        [cfg.namesTableId]: {
          visualType: "tableEx",
          hidden: false,
        },
      },
    });

    upsertBookmarkGroup(
      bookmarks,
      cfg.bookmarkGroupId,
      cfg.bookmarkGroupDisplayName,
      [cfg.bookmarks.map.id, cfg.bookmarks.names.id]
    );

    const navigator = readJson(visualPath(cfg.pageId, cfg.navigatorId));
    updateBookmarkSelected(navigator, cfg.bookmarks.map.id);
    navigator.visual.objects.bookmarks[0].properties.bookmarkGroup = literalExpr(cfg.bookmarkGroupId);
    writeJson(visualPath(cfg.pageId, cfg.navigatorId), navigator);
  }

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function applyMetropolitanFilters() {
  for (const [pageId, cfg] of Object.entries(METROPOLITAN_PAGE_FILTERS)) {
    const visualsDir = path.join(REPORT_ROOT, "pages", pageId, "visuals");
    if (!fs.existsSync(visualsDir)) continue;

    for (const entry of fs.readdirSync(visualsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const filePath = path.join(visualsDir, entry.name, "visual.json");
      if (!fs.existsSync(filePath)) continue;

      const visual = readJson(filePath);
      const visualType = visual?.visual?.visualType;
      if (!visualType || METROPOLITAN_FILTER_SKIP_VISUAL_TYPES.has(visualType)) continue;

      upsertCategoricalIncludeFilter(visual, {
        entity: "Orders",
        property: "State Mapa",
        values: cfg.values,
        filterName: `flt_${cfg.slug}_${entry.name.slice(0, 8)}`,
      });

      writeJson(filePath, visual);
    }
  }
}

function compactTopKpiCards() {
  const topPages = [
    "fe4687310000e672d410",
    "d4f6a8c0b3e57921f234",
    "a6f4e2b9c1d34780ef12",
    "e5a1b2c3d4f60789ab01",
    "f1a9c2e7d4b86350a1f2",
    "b2d4e6f8a1c34567d890",
    "c3e5f7a9b2d46810e123",
  ];
  const outerGroups = [
    "c27b164dcb574ce0774a",
    "023d9031bdc059cb91e5",
    "0b182f50da018a3c0ecc",
    "96fb689035d3de660b04",
    "8ae84b03c92891ceb709",
  ];
  const innerGroups = [
    "44907662101800700ecc",
    "5b9d2604747920a48a6e",
    "c5c8629e334896c41696",
    "c25572076e890d9dc34a",
    "bce8872da1da18e40493",
  ];
  const shellTextboxes = [
    "57bd32d86e050743c456",
    "57fb7ea088dba8840545",
    "604d45c9638bb1606852",
    "c960bd069b6605e6eeda",
    "606dec8a30465c5b9d0b",
  ];

  for (const pageId of topPages) {
    outerGroups.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      visual.position.height = 132;
      writeJson(filePath, visual);
    });

    innerGroups.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      visual.position.height = 124;
      writeJson(filePath, visual);
    });

    shellTextboxes.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      if (visual.position?.height) visual.position.height = 126;
      writeJson(filePath, visual);
    });
  }
}

function compactTopKpiInternals() {
  const topPages = [
    "fe4687310000e672d410",
    "d4f6a8c0b3e57921f234",
    "a6f4e2b9c1d34780ef12",
    "e5a1b2c3d4f60789ab01",
    "f1a9c2e7d4b86350a1f2",
    "b2d4e6f8a1c34567d890",
    "c3e5f7a9b2d46810e123",
  ];
  const titleIds = [
    "f3de4e402caca2606d87",
    "bfb0cddd400eb2900509",
    "608d654032270cbb431d",
    "4ffb18dd757aab970d7b",
    "53c66d29d5a7934b053c",
  ];
  const valueIds = [
    "66b0c66366547de4d305",
    "c1ffe8209c0d20ba00a9",
    "146b4b2456c5190541a0",
    "0ef44800ed7ba9b2a451",
    "8db4fab56170d3c4a670",
  ];
  const varIds = [
    "2346d05958531b1c0e70",
    "8ed644355c0522d96e45",
    "d8c53201b61254046ba2",
    "0698e7cbde04a3e75c43",
    "9e5c2c97509007d8206a",
  ];
  const deltaCardIds = [
    "6bdc2989401065a6a9c8",
    "09ac7c2dade205a90b7e",
    "76679585a806334163ed",
    "7787568665e3205bb6c2",
    "8156d8700ccc9862e851",
  ];
  const parentGroups = [
    "44907662101800700ecc",
    "5b9d2604747920a48a6e",
    "c5c8629e334896c41696",
    "c25572076e890d9dc34a",
    "bce8872da1da18e40493",
  ];

  for (const pageId of topPages) {
    titleIds.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      const targetParent = parentGroups[titleIds.indexOf(visualId)];
      if (targetParent) visual.parentGroupName = targetParent;
      visual.position = {
        ...visual.position,
        x: 10,
        y: 8,
        height: 20,
        width: 150,
      };
      writeJson(filePath, visual);
      setTextboxFontSize(pageId, visualId, "9pt");
    });

    valueIds.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      const targetParent = parentGroups[valueIds.indexOf(visualId)];
      if (targetParent) visual.parentGroupName = targetParent;
      visual.position = {
        ...visual.position,
        x: 10,
        y: 30,
        height: 30,
        width: 152,
      };
      writeJson(filePath, visual);
      setTextboxFontSize(pageId, visualId, "13pt");
    });

    varIds.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      const targetParent = parentGroups[varIds.indexOf(visualId)];
      if (targetParent) visual.parentGroupName = targetParent;
      visual.position = {
        ...visual.position,
        x: 10,
        y: 67,
        height: 10,
        width: 20,
      };
      writeJson(filePath, visual);
      setTextboxFontSize(pageId, visualId, "6pt");
    });

    deltaCardIds.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      const targetParent = parentGroups[deltaCardIds.indexOf(visualId)];
      if (targetParent) visual.parentGroupName = targetParent;
      visual.position = {
        ...visual.position,
        x: 24,
        y: 63,
        height: 18,
        width: 138,
      };
      writeJson(filePath, visual);
      setCardVisualFontSize(pageId, visualId, "7D");
    });

    const duplicateSecondCardId = "db2731d2e8a48055475a";
    const duplicatePath = visualPath(pageId, duplicateSecondCardId);
    if (fs.existsSync(duplicatePath)) {
      const duplicateVisual = readJson(duplicatePath);
      if (duplicateVisual.parentGroupName) {
        duplicateVisual.isHidden = true;
        writeJson(duplicatePath, duplicateVisual);
      }
    }
  }
}

function standardizeTopKpiContent() {
  const topPages = [
    "fe4687310000e672d410",
    "d4f6a8c0b3e57921f234",
    "a6f4e2b9c1d34780ef12",
    "e5a1b2c3d4f60789ab01",
    "f1a9c2e7d4b86350a1f2",
    "b2d4e6f8a1c34567d890",
    "c3e5f7a9b2d46810e123",
  ];
  const titleIds = [
    "f3de4e402caca2606d87",
    "bfb0cddd400eb2900509",
    "608d654032270cbb431d",
    "4ffb18dd757aab970d7b",
    "53c66d29d5a7934b053c",
  ];
  const valueIds = [
    "66b0c66366547de4d305",
    "c1ffe8209c0d20ba00a9",
    "146b4b2456c5190541a0",
    "0ef44800ed7ba9b2a451",
    "8db4fab56170d3c4a670",
  ];
  const deltaCardIds = [
    "6bdc2989401065a6a9c8",
    "09ac7c2dade205a90b7e",
    "76679585a806334163ed",
    "7787568665e3205bb6c2",
    "8156d8700ccc9862e851",
  ];
  const cards = [
    {
      title: "Valor Arbitrado",
      measure: "Valor Arbitrado Base",
      format: "R$ #,0.00;(R$ #,0.00);R$ #,0.00",
      deltaMeasure: "Subtítulo Card Valor Arbitrado YoY",
      sortMeasure: "Valor Arbitrado YoY %",
    },
    {
      title: "Ticket médio",
      measure: "Valor Médio por Perícia Base",
      format: "R$ #,0.00;(R$ #,0.00);R$ #,0.00",
      deltaMeasure: "Subtítulo Card Valor Médio por Perícia YoY",
      sortMeasure: "Valor Médio por Perícia YoY %",
    },
    {
      title: "Média diária",
      measure: "Média Diária Valor Arbitrado",
      format: "R$ #,0.00;(R$ #,0.00);R$ #,0.00",
      deltaMeasure: "Subtítulo Card Valor Arbitrado YoY",
      sortMeasure: "Valor Arbitrado YoY %",
    },
    {
      title: "Qtd Perícias",
      measure: "Qtd Perícias Base",
      format: "0",
      deltaMeasure: "Subtítulo Card Qtd Perícias YoY",
      sortMeasure: "Qtd Perícias YoY %",
    },
    {
      title: "Peritos únicos",
      measure: "Peritos Distintos Base",
      format: "0",
      deltaMeasure: "Subtítulo Card Peritos Distintos YoY",
      sortMeasure: "Peritos Distintos YoY %",
    },
  ];

  for (const pageId of topPages) {
    cards.forEach((card, index) => {
      setTextLabel(pageId, titleIds[index], card.title);
      setTextboxMeasure(pageId, valueIds[index], card.measure, card.format);
      setCardVisualMeasure(pageId, deltaCardIds[index], card.deltaMeasure, card.sortMeasure);
    });
  }
}

function ensureTopKpiParentBinding() {
  const topPages = [
    "fe4687310000e672d410",
    "d4f6a8c0b3e57921f234",
    "a6f4e2b9c1d34780ef12",
    "e5a1b2c3d4f60789ab01",
  ];
  const parentGroups = [
    "44907662101800700ecc",
    "5b9d2604747920a48a6e",
    "c5c8629e334896c41696",
    "c25572076e890d9dc34a",
    "bce8872da1da18e40493",
  ];
  const visualSets = [
    [
      "f3de4e402caca2606d87",
      "bfb0cddd400eb2900509",
      "608d654032270cbb431d",
      "4ffb18dd757aab970d7b",
      "53c66d29d5a7934b053c",
    ],
    [
      "66b0c66366547de4d305",
      "c1ffe8209c0d20ba00a9",
      "146b4b2456c5190541a0",
      "0ef44800ed7ba9b2a451",
      "8db4fab56170d3c4a670",
    ],
    [
      "2346d05958531b1c0e70",
      "8ed644355c0522d96e45",
      "d8c53201b61254046ba2",
      "0698e7cbde04a3e75c43",
      "9e5c2c97509007d8206a",
    ],
    [
      "6bdc2989401065a6a9c8",
      "09ac7c2dade205a90b7e",
      "76679585a806334163ed",
      "7787568665e3205bb6c2",
      "8156d8700ccc9862e851",
    ],
  ];

  for (const pageId of topPages) {
    for (const visualIds of visualSets) {
      visualIds.forEach((visualId, index) => {
        const filePath = visualPath(pageId, visualId);
        if (!fs.existsSync(filePath)) return;
        const visual = readJson(filePath);
        visual.parentGroupName = parentGroups[index];
        writeJson(filePath, visual);
      });
    }
  }
}

function finalizeTopKpiLayout() {
  const topPages = [
    "fe4687310000e672d410",
    "d4f6a8c0b3e57921f234",
    "a6f4e2b9c1d34780ef12",
    "e5a1b2c3d4f60789ab01",
    "f1a9c2e7d4b86350a1f2",
    "b2d4e6f8a1c34567d890",
    "c3e5f7a9b2d46810e123",
  ];
  const outerGroups = [
    "c27b164dcb574ce0774a",
    "023d9031bdc059cb91e5",
    "0b182f50da018a3c0ecc",
    "96fb689035d3de660b04",
    "8ae84b03c92891ceb709",
  ];
  const innerGroups = [
    "44907662101800700ecc",
    "5b9d2604747920a48a6e",
    "c5c8629e334896c41696",
    "c25572076e890d9dc34a",
    "bce8872da1da18e40493",
  ];
  const shellTextboxes = [
    "57bd32d86e050743c456",
    "57fb7ea088dba8840545",
    "604d45c9638bb1606852",
    "c960bd069b6605e6eeda",
    "606dec8a30465c5b9d0b",
  ];

  for (const pageId of topPages) {
    outerGroups.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      visual.position = {
        ...visual.position,
        height: 132,
      };
      writeJson(filePath, visual);
    });

    innerGroups.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      visual.position = {
        ...visual.position,
        height: 124,
      };
      writeJson(filePath, visual);
    });

    shellTextboxes.forEach((visualId) => {
      const filePath = visualPath(pageId, visualId);
      if (!fs.existsSync(filePath)) return;
      const visual = readJson(filePath);
      visual.position = {
        ...visual.position,
        height: 126,
      };
      writeJson(filePath, visual);
    });
  }
}

function configureComarcasBlueprint() {
  const bookmarks = readJson(BOOKMARKS_PATH);
  const cfg = COMARCAS_BLUEPRINT_CONFIG;
  const pageId = cfg.pageId;

  // Hide legacy containers that still leak into the map/cross block.
  setHidden(pageId, "c8938c6da410891b5040", true);
  setHidden(pageId, "e1b04cb7aad1837227ba", true);
  setHidden(pageId, "8bf3bac09e4e3528d02a", true);
  setHidden(pageId, "db2731d2e8a48055475a", true);

  setBarChartBinding(
    pageId,
    cfg.leftToggle.charts.valor,
    { entity: "Orders", property: "State Mapa", displayName: "Comarca" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );
  setBarChartBinding(
    pageId,
    cfg.leftToggle.charts.qtd,
    { entity: "Orders", property: "State Mapa", displayName: "Comarca" },
    { entity: "Measure", property: "Qtd Perícias Base", displayName: "Qtd Perícias Base", sortProperty: "Qtd Perícias Base", aggFunction: 0 },
    10
  );
  setTreemapBinding(
    pageId,
    cfg.rightToggle.charts.peritos,
    { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );
  setTreemapBinding(
    pageId,
    cfg.rightToggle.charts.especialidades,
    { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    10
  );
  setBarChartBinding(
    pageId,
    cfg.operational.chartId,
    { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    cfg.operational.topN
  );
  setTextLabel(pageId, cfg.operational.titleId, cfg.operational.title);
  setTextLabel(pageId, cfg.operational.subtitleId, cfg.operational.subtitle);
  setHidden(pageId, cfg.leftToggle.groups.valor, false);
  setHidden(pageId, cfg.leftToggle.groups.qtd, true);
  setHidden(pageId, cfg.rightToggle.groups.peritos, false);
  setHidden(pageId, cfg.rightToggle.groups.especialidades, true);

  Object.values(cfg.leftToggle.titles).forEach(({ titleId, subtitleId, title, subtitle }) => {
    setTextLabel(pageId, titleId, title);
    setTextLabel(pageId, subtitleId, subtitle);
    setHidden(pageId, subtitleId, true);
  });
  Object.values(cfg.rightToggle.titles).forEach(({ titleId, subtitleId, title, subtitle }) => {
    setTextLabel(pageId, titleId, title);
    setTextLabel(pageId, subtitleId, subtitle);
    setHidden(pageId, subtitleId, true);
  });

  writeMinimalGroupBookmark({
    bookmarkId: cfg.leftToggle.bookmarks.valor.id,
    displayName: cfg.leftToggle.bookmarks.valor.displayName,
    pageId,
    targetVisualNames: Object.values(cfg.leftToggle.groups),
    hiddenStates: {
      [cfg.leftToggle.groups.valor]: false,
      [cfg.leftToggle.groups.qtd]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: cfg.leftToggle.bookmarks.qtd.id,
    displayName: cfg.leftToggle.bookmarks.qtd.displayName,
    pageId,
    targetVisualNames: Object.values(cfg.leftToggle.groups),
    hiddenStates: {
      [cfg.leftToggle.groups.valor]: true,
      [cfg.leftToggle.groups.qtd]: false,
    },
  });
  upsertBookmarkGroup(bookmarks, cfg.leftToggle.bookmarkGroupId, cfg.leftToggle.bookmarkGroupDisplayName, [
    cfg.leftToggle.bookmarks.valor.id,
    cfg.leftToggle.bookmarks.qtd.id,
  ]);

  writeMinimalGroupBookmark({
    bookmarkId: cfg.rightToggle.bookmarks.peritos.id,
    displayName: cfg.rightToggle.bookmarks.peritos.displayName,
    pageId,
    targetVisualNames: Object.values(cfg.rightToggle.groups),
    hiddenStates: {
      [cfg.rightToggle.groups.peritos]: false,
      [cfg.rightToggle.groups.especialidades]: true,
    },
  });
  writeMinimalGroupBookmark({
    bookmarkId: cfg.rightToggle.bookmarks.especialidades.id,
    displayName: cfg.rightToggle.bookmarks.especialidades.displayName,
    pageId,
    targetVisualNames: Object.values(cfg.rightToggle.groups),
    hiddenStates: {
      [cfg.rightToggle.groups.peritos]: true,
      [cfg.rightToggle.groups.especialidades]: false,
    },
  });
  upsertBookmarkGroup(bookmarks, cfg.rightToggle.bookmarkGroupId, cfg.rightToggle.bookmarkGroupDisplayName, [
    cfg.rightToggle.bookmarks.peritos.id,
    cfg.rightToggle.bookmarks.especialidades.id,
  ]);

  const leftNavigator = readJson(visualPath(pageId, cfg.leftToggle.navigatorId));
  updateBookmarkSelected(leftNavigator, cfg.leftToggle.defaultBookmarkId);
  leftNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: { Literal: { Value: `'${cfg.leftToggle.bookmarkGroupId}'` } },
  };
  writeJson(visualPath(pageId, cfg.leftToggle.navigatorId), leftNavigator);

  const rightNavigator = readJson(visualPath(pageId, cfg.rightToggle.navigatorId));
  updateBookmarkSelected(rightNavigator, cfg.rightToggle.defaultBookmarkId);
  rightNavigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
    expr: { Literal: { Value: `'${cfg.rightToggle.bookmarkGroupId}'` } },
  };
  writeJson(visualPath(pageId, cfg.rightToggle.navigatorId), rightNavigator);

  createOrUpdateDetailTable(pageId, cfg.detail.visualId, cfg.detail.title, [
    buildColumnProjection(cfg.detail.entityColumn.entity, cfg.detail.entityColumn.property, cfg.detail.entityColumn.displayName),
    buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
    buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
    buildMeasureProjection("Measure", "Saldo a Receber Base", "Saldo Pendente"),
    buildMeasureProjection("FactPericias", "Ticket Médio", "Ticket Médio"),
  ]);

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function configureEntityAnalysisPages() {
  const bookmarks = readJson(BOOKMARKS_PATH);

  for (const [pageId, cfg] of Object.entries(ENTITY_BLUEPRINT_CONFIG)) {
    const labelCfg = ENTITY_CHART_LABEL_CONFIG[pageId] || {
      ranking: cfg.entityColumn,
      operational: cfg.operational.dimension,
      financial: cfg.financial.dimension,
      detailPrimary: cfg.entityColumn,
      detailSecondary: cfg.secondaryColumn,
    };

    upsertVisual(pageId, cfg.ranking.altGroupId, cfg.ranking.groupId, (visual) => {
      visual.position = deepClone(visual.position);
      visual.visualGroup = deepClone(visual.visualGroup);
      visual.visualGroup.displayName = "Ranking Perícias";
      visual.isHidden = true;
      delete visual.parentGroupName;
    });
    upsertVisual(pageId, cfg.ranking.altChartId, cfg.ranking.chartId, (visual) => {
      visual.parentGroupName = cfg.ranking.altGroupId;
      delete visual.isHidden;
    });
    upsertVisual(pageId, cfg.ranking.altHeaderGroupId, cfg.ranking.headerGroupId, (visual) => {
      visual.isHidden = true;
      delete visual.parentGroupName;
    });
    upsertVisual(pageId, cfg.ranking.altTitleId, cfg.ranking.titleId, (visual) => {
      visual.parentGroupName = cfg.ranking.altHeaderGroupId;
      delete visual.isHidden;
    });
    upsertVisual(pageId, cfg.ranking.altSubtitleId, cfg.ranking.subtitleId, (visual) => {
      visual.parentGroupName = cfg.ranking.altHeaderGroupId;
      delete visual.isHidden;
    });

    upsertVisualFromPage(pageId, cfg.ranking.navigatorId, "d4f6a8c0b3e57921f234", "e4f886c778183b7d6274", (visual) => {
      visual.position = {
        x: 235.76642335766422,
        y: 440.1459854014598,
        z: 20000,
        height: 21.8978102189781,
        width: 191.970802919708,
        tabOrder: 17000,
      };
      delete visual.parentGroupName;
      delete visual.isHidden;
    });

    setBarChartBinding(
      pageId,
      cfg.ranking.chartId,
      labelCfg.ranking,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
      cfg.ranking.topN
    );
    setBarChartBinding(
      pageId,
      cfg.ranking.altChartId,
      labelCfg.ranking,
      { entity: "Measure", property: "Qtd Perícias Base", displayName: "Qtd Perícias Base", sortProperty: "Qtd Perícias Base", aggFunction: 5 },
      cfg.ranking.topN
    );
    setTextLabel(pageId, cfg.ranking.titleId, cfg.ranking.titles.valor.title);
    setTextLabel(pageId, cfg.ranking.subtitleId, cfg.ranking.titles.valor.subtitle);
    setTextLabel(pageId, cfg.ranking.altTitleId, cfg.ranking.titles.qtd.title);
    setTextLabel(pageId, cfg.ranking.altSubtitleId, cfg.ranking.titles.qtd.subtitle);
    setHidden(pageId, cfg.ranking.groupId, false);
    setHidden(pageId, cfg.ranking.altGroupId, true);
    setHidden(pageId, cfg.ranking.headerGroupId, false);
    setHidden(pageId, cfg.ranking.altHeaderGroupId, true);
    setHidden(pageId, cfg.ranking.subtitleId, true);
    setHidden(pageId, cfg.ranking.altSubtitleId, true);

    writeMinimalGroupBookmark({
      bookmarkId: cfg.ranking.bookmarks.valor.id,
      displayName: cfg.ranking.bookmarks.valor.displayName,
      pageId,
      targetVisualNames: [
        cfg.ranking.groupId,
        cfg.ranking.altGroupId,
        cfg.ranking.headerGroupId,
        cfg.ranking.altHeaderGroupId,
      ],
      hiddenStates: {
        [cfg.ranking.groupId]: false,
        [cfg.ranking.altGroupId]: true,
        [cfg.ranking.headerGroupId]: false,
        [cfg.ranking.altHeaderGroupId]: true,
      },
    });
    writeMinimalGroupBookmark({
      bookmarkId: cfg.ranking.bookmarks.qtd.id,
      displayName: cfg.ranking.bookmarks.qtd.displayName,
      pageId,
      targetVisualNames: [
        cfg.ranking.groupId,
        cfg.ranking.altGroupId,
        cfg.ranking.headerGroupId,
        cfg.ranking.altHeaderGroupId,
      ],
      hiddenStates: {
        [cfg.ranking.groupId]: true,
        [cfg.ranking.altGroupId]: false,
        [cfg.ranking.headerGroupId]: true,
        [cfg.ranking.altHeaderGroupId]: false,
      },
    });
    upsertBookmarkGroup(bookmarks, cfg.ranking.bookmarkGroupId, cfg.ranking.bookmarkGroupDisplayName, [
      cfg.ranking.bookmarks.valor.id,
      cfg.ranking.bookmarks.qtd.id,
    ]);

    const navigator = readJson(visualPath(pageId, cfg.ranking.navigatorId));
    updateBookmarkSelected(navigator, cfg.ranking.bookmarks.valor.id);
    navigator.visual.objects.bookmarks[0].properties.bookmarkGroup = {
      expr: { Literal: { Value: `'${cfg.ranking.bookmarkGroupId}'` } },
    };
    writeJson(visualPath(pageId, cfg.ranking.navigatorId), navigator);

    setBarChartBinding(
      pageId,
      cfg.operational.chartId,
      labelCfg.operational,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
      cfg.operational.topN
    );
    setTextLabel(pageId, cfg.operational.titleId, cfg.operational.title);
    setTextLabel(pageId, cfg.operational.subtitleId, cfg.operational.subtitle);
    setHidden(pageId, cfg.operational.subtitleId, false);

    setTreemapBinding(
      pageId,
      cfg.financial.chartId,
      labelCfg.financial,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
      cfg.financial.topN
    );
    setTextLabel(pageId, cfg.financial.titleId, cfg.financial.title);
    setTextLabel(pageId, cfg.financial.subtitleId, cfg.financial.subtitle);

    createOrUpdateDetailTable(pageId, cfg.detail.visualId, cfg.detail.title, [
      buildColumnProjection(labelCfg.detailPrimary.entity, labelCfg.detailPrimary.property, labelCfg.detailPrimary.displayName),
      buildColumnProjection(labelCfg.detailSecondary.entity, labelCfg.detailSecondary.property, labelCfg.detailSecondary.displayName),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
      buildMeasureProjection("Measure", "Saldo a Receber Base", "Saldo Pendente"),
      buildMeasureProjection("FactPericias", "Ticket Médio", "Ticket Médio"),
    ]);

    // Remove o bloco legado que estava poluindo o miolo das páginas analíticas.
    ["acee2d020bb8c1c4903b", "51d63b4f58c8609a1a33", "1ec0e6adc7607be01bdd", "f67a89c63b41e2a74038", "3943a8f5dc4bb830b9ae"].forEach((visualId) => {
      setHidden(pageId, visualId, true);
    });

    const rankingGroupPath = visualPath(pageId, cfg.ranking.groupId);
    if (fs.existsSync(rankingGroupPath)) {
      const rankingGroup = readJson(rankingGroupPath);
      rankingGroup.visualGroup = rankingGroup.visualGroup || {};
      rankingGroup.visualGroup.displayName = "Ranking principal";
      writeJson(rankingGroupPath, rankingGroup);
    }

    const financialGroupPath = visualPath(pageId, "1c1410e9e295d87af163");
    if (fs.existsSync(financialGroupPath)) {
      const financialGroup = readJson(financialGroupPath);
      financialGroup.visualGroup = financialGroup.visualGroup || {};
      financialGroup.visualGroup.displayName = "Cruzamento financeiro";
      writeJson(financialGroupPath, financialGroup);
    }
  }

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function ensureRmCampinaOperationalChart() {
  const targetPageId = "e5a1b2c3d4f60789ab01";
  const targetVisualId = "e85feb694080c3b3bc21";
  if (!fs.existsSync(visualPath(targetPageId, targetVisualId))) {
    upsertVisualFromPage(targetPageId, targetVisualId, "a6f4e2b9c1d34780ef12", targetVisualId, (visual) => {
      delete visual.parentGroupName;
      delete visual.isHidden;
      visual.position = {
        x: 868,
        y: 420,
        z: 15000,
        width: 381,
        height: 225,
        tabOrder: 11000,
      };
    });
  }
}

function configureMetroOperationalCharts() {
  const measure = {
    entity: "Measure",
    property: "Valor Arbitrado Base",
    displayName: "Valor Arbitrado Base",
    sortProperty: "Valor Arbitrado Base",
  };

  ensureRmCampinaOperationalChart();

  setDonutChartBinding(
    "a6f4e2b9c1d34780ef12",
    "e85feb694080c3b3bc21",
    { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    measure,
    10
  );
  setPosition("a6f4e2b9c1d34780ef12", "e85feb694080c3b3bc21", {
    x: 868.75,
    y: 460,
    z: 15000,
    width: 220,
    height: 185,
    tabOrder: 11000,
  });
  setVisualContainerTitle(
    "a6f4e2b9c1d34780ef12",
    "e85feb694080c3b3bc21",
    "Distribuição por Vara | RM João Pessoa",
    "10D"
  );
  createOrUpdateCustomTable(
    "a6f4e2b9c1d34780ef12",
    "a6f4rmvaralist001",
    {
      x: 1094,
      y: 490,
      z: 15010,
      width: 152,
      height: 146,
      tabOrder: 11010,
    },
    "Valores por vara | RM João Pessoa",
    [
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor"),
      buildColumnProjection("DimVaras", "JuizoCurto", "Vara"),
    ]
  );
  setVisualContainerTitleVisibility("a6f4e2b9c1d34780ef12", "a6f4rmvaralist001", false);

  setDonutChartBinding(
    "e5a1b2c3d4f60789ab01",
    "e85feb694080c3b3bc21",
    { entity: "DimVaras", property: "JuizoCurto", displayName: "Vara" },
    measure,
    10
  );
  setPosition("e5a1b2c3d4f60789ab01", "e85feb694080c3b3bc21", {
    x: 868,
    y: 420,
    z: 15000,
    width: 220,
    height: 225,
    tabOrder: 11000,
  });
  setVisualContainerTitle(
    "e5a1b2c3d4f60789ab01",
    "e85feb694080c3b3bc21",
    "Distribuição por Vara | RM Campina Grande",
    "10D"
  );
  createOrUpdateCustomTable(
    "e5a1b2c3d4f60789ab01",
    "e5a1rmvaralist001",
    {
      x: 1092,
      y: 450,
      z: 15010,
      width: 154,
      height: 184,
      tabOrder: 11010,
    },
    "Valores por vara | RM Campina Grande",
    [
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor"),
      buildColumnProjection("DimVaras", "JuizoCurto", "Vara"),
    ]
  );
  setVisualContainerTitleVisibility("e5a1b2c3d4f60789ab01", "e5a1rmvaralist001", false);
}

function configureResidualLegacyCharts() {
  const valorMeasure = {
    entity: "Measure",
    property: "Valor Arbitrado Base",
    displayName: "Valor Arbitrado Base",
    sortProperty: "Valor Arbitrado Base",
  };

  setBarChartBinding(
    "e5a1b2c3d4f60789ab01",
    "cd3d55d60e6c404b02c7",
    { entity: "DimEspecialidades", property: "EspecialidadeCurta", displayName: "Especialidade" },
    valorMeasure,
    10
  );
  setBarChartBinding(
    "e5a1b2c3d4f60789ab01",
    "317b187a9471457a326e",
    { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    valorMeasure,
    10
  );
  setBarChartBinding(
    "480be36186f85cc3c324",
    "5715f23ae7323c710a25",
    { entity: "DimPeritos", property: "PeritoCurto", displayName: "Perito" },
    valorMeasure,
    5
  );
}

function configureDefaultPieCharts() {
  setDonutChartBinding(
    COMARCAS_BLUEPRINT_CONFIG.pageId,
    COMARCAS_BLUEPRINT_CONFIG.operational.chartId,
    COMARCAS_BLUEPRINT_CONFIG.operational.dimension,
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "Valor Arbitrado Base" },
    COMARCAS_BLUEPRINT_CONFIG.operational.topN
  );

  configureMetroOperationalCharts();
  configureResidualLegacyCharts();
}

function standardizeMetropolitanPages() {
  const metroPages = {
    a6f4e2b9c1d34780ef12: {
      displayName: "RM João Pessoa",
      pageHeight: 980,
      mainBackgroundId: "cbb9050b7ce28900e44a",
      sidebarBackgroundId: "0325c4e7ec01108ac90b",
      sidebarPanelId: "aa00bb11cc22dd33ee52",
      titleOverlayId: "07d4da210de09608d4fb",
      pageNavigatorId: "3c9eb8b9053b22bcd99f",
      yearLabelId: "0b1ad6f613de09bd0dbe",
      yearSlicerId: "72c2ba702fe2952b0f6b",
      monthLabelId: "ac264f11a941630246ff",
      monthSlicerId: "65c02e07e18d7728119a",
      legacyTopSlicerId: "66f7c5422ecb46c4a0fa",
      legacyTopShapeId: "c8938c6da410891b5040",
      legacyRightGroupId: "e1b04cb7aad1837227ba",
      legacyRightTitleId: "8bf3bac09e4e3528d02a",
      detailVisualId: "a6f4detailtable001",
    },
    e5a1b2c3d4f60789ab01: {
      displayName: "RM Campina Grande",
      pageHeight: 980,
      mainBackgroundId: "cbb9050b7ce28900e44a",
      sidebarBackgroundId: "0325c4e7ec01108ac90b",
      titleOverlayId: "07d4da210de09608d4fb",
      pageNavigatorId: "3c9eb8b9053b22bcd99f",
      yearLabelId: "0b1ad6f613de09bd0dbe",
      yearSlicerId: "72c2ba702fe2952b0f6b",
      monthLabelId: "ac264f11a941630246ff",
      monthSlicerId: "65c02e07e18d7728119a",
      legacyTopSlicerId: "66f7c5422ecb46c4a0fa",
      legacyTopShapeId: "c8938c6da410891b5040",
      legacyRightGroupId: "e1b04cb7aad1837227ba",
      legacyRightTitleId: "8bf3bac09e4e3528d02a",
      detailVisualId: "e5a1detailtable001",
    },
  };

  for (const [pageId, cfg] of Object.entries(metroPages)) {
    const page = readPageJson(pageId);
    page.height = cfg.pageHeight;
    page.displayOption = "FitToWidth";
    delete page.visibility;
    writePageJson(pageId, page);

    setPosition(pageId, cfg.mainBackgroundId, {
      height: cfg.pageHeight,
      width: 1108.0851063829787,
    });
    setPosition(pageId, cfg.sidebarBackgroundId, {
      height: cfg.pageHeight - 0.0533365658525,
    });
    if (cfg.sidebarPanelId && fs.existsSync(visualPath(pageId, cfg.sidebarPanelId))) {
      setPosition(pageId, cfg.sidebarPanelId, {
        y: 171,
        height: cfg.pageHeight - 200,
      });
    }

    setHidden(pageId, cfg.titleOverlayId, true);
    setPosition(pageId, cfg.pageNavigatorId, {
      x: 8,
      y: 182,
      width: 158,
      height: 300,
    });
    setPosition(pageId, cfg.yearLabelId, {
      x: 18,
      y: 750,
      width: 145,
      height: 30,
    });
    setPosition(pageId, cfg.yearSlicerId, {
      x: 12,
      y: 775,
      width: 151.63123955099115,
      height: 54,
    });
    setPosition(pageId, cfg.monthLabelId, {
      x: 18,
      y: 855,
      width: 167,
      height: 30,
    });
    setPosition(pageId, cfg.monthSlicerId, {
      x: 12,
      y: 880,
      width: 151.63123955099115,
      height: 53,
    });

    setHidden(pageId, cfg.legacyTopSlicerId, true);
    setHidden(pageId, cfg.legacyTopShapeId, true);
    setHidden(pageId, cfg.legacyRightGroupId, true);
    setHidden(pageId, cfg.legacyRightTitleId, true);

    createOrUpdateDetailTable(pageId, cfg.detailVisualId, `Detalhe Analítico | ${cfg.displayName}`, [
      buildColumnProjection("DimVaras", "JuizoCurto", "Vara"),
      buildColumnProjection("DimEspecialidades", "EspecialidadeCurta", "Especialidade"),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
      buildMeasureProjection("FactPericias", "Ticket Médio", "Ticket Médio"),
    ]);
  }
}

function finalizePageCleanup() {
  const overviewPageId = "fe4687310000e672d410";
  ["8bf3bac09e4e3528d02a", "db2731d2e8a48055475a", "fec209241e28d2185094"].forEach((visualId) => {
    setHidden(overviewPageId, visualId, true);
  });

  const comarcasPageId = COMARCAS_BLUEPRINT_CONFIG.pageId;
  ["c8938c6da410891b5040", "e1b04cb7aad1837227ba", "8bf3bac09e4e3528d02a", "db2731d2e8a48055475a", "fec209241e28d2185094", "59445bbfe4c2c70b7160"].forEach((visualId) => {
    setHidden(comarcasPageId, visualId, true);
  });

  const rmJoaoPessoaPageId = "a6f4e2b9c1d34780ef12";
  ["fec209241e28d2185094"].forEach((visualId) => {
    setHidden(rmJoaoPessoaPageId, visualId, true);
  });

  const cruzamentosPageId = "82ff2dfb93623b9eeb6c";
  ["3e7367399ce208251f7a", "3ecd385e0823aad23b76", "055bca1490f437da7149"].forEach((visualId) => {
    setHidden(cruzamentosPageId, visualId, true);
  });
  setHidden(cruzamentosPageId, "8a25d0234525a8ef9a69", false);

  removeBookmarkArtifacts(
    ["4d4a5aa650873e37334c", "8bfbff69a59555005e30"],
    [
      "ca6bc2673331094a0626",
      "5001cf6c5c4a12cd0d80",
      "be2c1b7bbca893bdcd42",
      "ce01212141deed8bc050",
    ]
  );
}

function sanitizeSensitiveVisualSchemas() {
  const pagesRoot = path.join(REPORT_ROOT, "pages");
  for (const pageId of fs.readdirSync(pagesRoot)) {
    const visualsDir = path.join(pagesRoot, pageId, "visuals");
    if (!fs.existsSync(visualsDir)) continue;

    for (const visualId of fs.readdirSync(visualsDir)) {
      const filePath = path.join(visualsDir, visualId, "visual.json");
      if (!fs.existsSync(filePath)) continue;

      const visual = readJson(filePath);
      const visualType = visual?.visual?.visualType;
      if (!visualType) continue;

      if (visualType === "slicer" || visualType === "tableEx") {
        delete visual.drillFilterOtherVisuals;
        if (visual.visual) {
          delete visual.visual.drillFilterOtherVisuals;
        }
        writeJson(filePath, visual);
      }
    }
  }
}

const TOP_NAV_LAYOUT_CONFIG = {
  fe4687310000e672d410: {
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelIds: ["aa00bb11cc22dd33ee41", "aa00bb11cc22dd33ee42"],
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
    titleOverlayIds: ["07d4da210de09608d4fb"],
  },
  d4f6a8c0b3e57921f234: {
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelIds: ["aa00bb11cc22dd33ee51", "aa00bb11cc22dd33ee52"],
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
    titleOverlayIds: ["07d4da210de09608d4fb"],
  },
  f1a9c2e7d4b86350a1f2: {
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelIds: ["aa00bb11cc22dd33ee61", "aa00bb11cc22dd33ee62"],
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
    titleOverlayIds: ["b3ca9db4dc5f60ce98f2"],
  },
  b2d4e6f8a1c34567d890: {
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelIds: ["aa00bb11cc22dd33ee71", "aa00bb11cc22dd33ee72"],
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
    titleOverlayIds: ["b3ca9db4dc5f60ce98f2"],
  },
  c3e5f7a9b2d46810e123: {
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelIds: ["aa00bb11cc22dd33ee81", "aa00bb11cc22dd33ee82"],
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
    titleOverlayIds: ["b3ca9db4dc5f60ce98f2"],
  },
  a6f4e2b9c1d34780ef12: {
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelIds: ["aa00bb11cc22dd33ee51", "aa00bb11cc22dd33ee52"],
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
    titleOverlayIds: ["07d4da210de09608d4fb"],
  },
  e5a1b2c3d4f60789ab01: {
    mainBackgroundId: "cbb9050b7ce28900e44a",
    sidebarBackgroundId: "0325c4e7ec01108ac90b",
    sidebarPanelIds: [],
    pageNavigatorId: "3c9eb8b9053b22bcd99f",
    yearLabelId: "0b1ad6f613de09bd0dbe",
    yearSlicerId: "72c2ba702fe2952b0f6b",
    monthLabelId: "ac264f11a941630246ff",
    monthSlicerId: "65c02e07e18d7728119a",
    titleOverlayIds: ["07d4da210de09608d4fb"],
  },
  "480be36186f85cc3c324": {
    mainBackgroundId: "602d61c16500ea288cdc",
    sidebarBackgroundId: "71d424213bef4ecba9fd",
    sidebarPanelIds: [],
    pageNavigatorId: "82a71ddf3d9cfc3071cb",
    yearLabelId: "7b9674f786248db06ec7",
    yearSlicerId: "d61893b8024d73344e50",
    monthLabelId: "a36e96c0b8c299e25767",
    monthSlicerId: "550de89675d60d2a7478",
    titleOverlayIds: ["b3ca9db4dc5f60ce98f2"],
  },
  "82ff2dfb93623b9eeb6c": {
    mainBackgroundId: "a40efbf69139973c4735",
    sidebarBackgroundId: "301f18119397cb656803",
    sidebarPanelIds: [],
    pageNavigatorId: "90ef7133d4dc72c8b01c",
    yearLabelId: "9664cd3d5cf425f02640",
    yearSlicerId: "345887e07b9731b60c0e",
    monthLabelId: "4589da918d8d51e29e33",
    monthSlicerId: "ee8a2f8166853578bf1e",
    titleOverlayIds: ["e309cc1f1d3c9195aeac"],
  },
};

function findRootLogoVisualId(pageId) {
  const visualsDir = path.join(REPORT_ROOT, "pages", pageId, "visuals");
  if (!fs.existsSync(visualsDir)) return null;
  for (const visualId of fs.readdirSync(visualsDir)) {
    const filePath = path.join(visualsDir, visualId, "visual.json");
    if (!fs.existsSync(filePath)) continue;
    const visual = readJson(filePath);
    if (visual.parentGroupName) continue;
    const visualType = visual.visual?.visualType || visual.singleVisual?.visualType;
    const position = visual.position || {};
    if (visualType === "image" && (position.x ?? 9999) < 170 && (position.y ?? 9999) < 50) {
      return visualId;
    }
  }
  return null;
}

function setPageNavigatorOrientation(pageId, visualId, literalValue) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const layout = visual.visual?.objects?.layout?.[0]?.properties;
  if (!layout) return;
  layout.orientation = {
    expr: {
      Literal: {
        Value: literalValue,
      },
    },
  };
  const textObjects = visual.visual?.objects?.text;
  if (Array.isArray(textObjects)) {
    for (const textObject of textObjects) {
      textObject.properties = textObject.properties || {};
      textObject.properties.fontSize = {
        expr: {
          Literal: {
            Value: "7D",
          },
        },
      };
    }
  }
  writeJson(filePath, visual);
}

function shiftRootVisualsLeft(pageId, deltaX, excludedIds = new Set()) {
  const visualsDir = path.join(REPORT_ROOT, "pages", pageId, "visuals");
  if (!fs.existsSync(visualsDir)) return;
  for (const visualId of fs.readdirSync(visualsDir)) {
    if (excludedIds.has(visualId)) continue;
    const filePath = path.join(visualsDir, visualId, "visual.json");
    if (!fs.existsSync(filePath)) continue;
    const visual = readJson(filePath);
    if (visual.parentGroupName) continue;
    const position = visual.position || {};
    const x = position.x;
    if (typeof x !== "number" || x < 170) continue;
    visual.position = { ...position, x: x - deltaX };
    writeJson(filePath, visual);
  }
}

function promoteNavigationToTopBar() {
  const pageIds = Object.keys(TOP_NAV_LAYOUT_CONFIG);
  for (const pageId of pageIds) {
    const cfg = TOP_NAV_LAYOUT_CONFIG[pageId];
    const logoId = findRootLogoVisualId(pageId);

    setPosition(pageId, cfg.mainBackgroundId, {
      x: 0,
      width: 1280,
    });
    setHidden(pageId, cfg.sidebarBackgroundId, true);
    for (const visualId of cfg.sidebarPanelIds) {
      setHidden(pageId, visualId, true);
    }
    for (const visualId of cfg.titleOverlayIds) {
      setHidden(pageId, visualId, true);
    }

    const visualsDir = path.join(REPORT_ROOT, "pages", pageId, "visuals");
    if (fs.existsSync(visualsDir)) {
      for (const visualId of fs.readdirSync(visualsDir)) {
        const filePath = path.join(visualsDir, visualId, "visual.json");
        if (!fs.existsSync(filePath)) continue;
        const visual = readJson(filePath);
        if (visual.parentGroupName) continue;
        const position = visual.position || {};
        const x = position.x;
        const visualType = visual.visual?.visualType || visual.singleVisual?.visualType;
        if (
          typeof x === "number" &&
          x < 170 &&
          visualType === "shape" &&
          ![cfg.sidebarBackgroundId, cfg.pageNavigatorId].includes(visualId)
        ) {
          visual.isHidden = true;
          writeJson(filePath, visual);
        }
        if (
          typeof x === "number" &&
          x < 170 &&
          visualType === "textbox" &&
          ![cfg.yearLabelId, cfg.monthLabelId].includes(visualId)
        ) {
          visual.isHidden = true;
          writeJson(filePath, visual);
        }
      }
    }

    setHidden(pageId, cfg.mainBackgroundId, false);

    if (logoId) {
      setPosition(pageId, logoId, {
        x: 12,
        y: 6,
        width: 38,
        height: 38,
      });
      setHidden(pageId, logoId, false);
    }

    setPageNavigatorOrientation(pageId, cfg.pageNavigatorId, "0D");
    setPosition(pageId, cfg.pageNavigatorId, {
      x: 66,
      y: 8,
      width: 760,
      height: 22,
    });

    setPosition(pageId, cfg.yearLabelId, {
      x: 850,
      y: 10,
      width: 34,
      height: 18,
    });
    setTextboxFontSize(pageId, cfg.yearLabelId, "7pt");
    setPosition(pageId, cfg.yearSlicerId, {
      x: 884,
      y: 6,
      width: 132,
      height: 26,
    });

    setPosition(pageId, cfg.monthLabelId, {
      x: 1028,
      y: 10,
      width: 36,
      height: 18,
    });
    setTextboxFontSize(pageId, cfg.monthLabelId, "7pt");
    setPosition(pageId, cfg.monthSlicerId, {
      x: 1064,
      y: 6,
      width: 132,
      height: 26,
    });

    shiftRootVisualsLeft(
      pageId,
      145,
      new Set([
        cfg.mainBackgroundId,
        cfg.sidebarBackgroundId,
        cfg.pageNavigatorId,
        cfg.yearLabelId,
        cfg.yearSlicerId,
        cfg.monthLabelId,
        cfg.monthSlicerId,
        logoId,
        ...cfg.sidebarPanelIds,
        ...cfg.titleOverlayIds,
      ].filter(Boolean))
    );
  }
}

function restoreSidebarRails() {
  for (const [pageId, cfg] of Object.entries(SIDEBAR_LAYOUT_CONFIG)) {
    setHidden(pageId, cfg.mainBackgroundId, false);
    setHidden(pageId, cfg.sidebarBackgroundId, false);
    setHidden(pageId, cfg.sidebarPanelId, false);
    setPageNavigatorOrientation(pageId, cfg.pageNavigatorId, "1D");
    setPosition(pageId, cfg.pageNavigatorId, {
      x: 8,
      y: 182,
      width: 158,
      height: 300,
    });
    setPosition(pageId, cfg.yearLabelId, {
      x: 18,
      y: 530,
      width: 145,
      height: 30,
    });
    setPosition(pageId, cfg.yearSlicerId, {
      x: 12,
      y: 555,
      width: 151.63123955099115,
      height: 54,
    });
    setPosition(pageId, cfg.monthLabelId, {
      x: 18,
      y: 635,
      width: 167,
      height: 30,
    });
    setPosition(pageId, cfg.monthSlicerId, {
      x: 12,
      y: 660,
      width: 151.63123955099115,
      height: 54,
    });
  }

  const extraPages = {
    a6f4e2b9c1d34780ef12: {
      mainBackgroundId: "cbb9050b7ce28900e44a",
      sidebarBackgroundId: "0325c4e7ec01108ac90b",
      sidebarPanelId: "aa00bb11cc22dd33ee52",
      pageNavigatorId: "3c9eb8b9053b22bcd99f",
      yearLabelId: "0b1ad6f613de09bd0dbe",
      yearSlicerId: "72c2ba702fe2952b0f6b",
      monthLabelId: "ac264f11a941630246ff",
      monthSlicerId: "65c02e07e18d7728119a",
      yearY: 750,
      yearSlicerY: 775,
      monthY: 855,
      monthSlicerY: 880,
      navY: 182,
      navHeight: 300,
    },
    e5a1b2c3d4f60789ab01: {
      mainBackgroundId: "cbb9050b7ce28900e44a",
      sidebarBackgroundId: "0325c4e7ec01108ac90b",
      sidebarPanelId: null,
      pageNavigatorId: "3c9eb8b9053b22bcd99f",
      yearLabelId: "0b1ad6f613de09bd0dbe",
      yearSlicerId: "72c2ba702fe2952b0f6b",
      monthLabelId: "ac264f11a941630246ff",
      monthSlicerId: "65c02e07e18d7728119a",
      yearY: 750,
      yearSlicerY: 775,
      monthY: 855,
      monthSlicerY: 880,
      navY: 182,
      navHeight: 300,
    },
    "480be36186f85cc3c324": {
      mainBackgroundId: "602d61c16500ea288cdc",
      sidebarBackgroundId: "71d424213bef4ecba9fd",
      sidebarPanelId: null,
      pageNavigatorId: "82a71ddf3d9cfc3071cb",
      yearLabelId: "7b9674f786248db06ec7",
      yearSlicerId: "d61893b8024d73344e50",
      monthLabelId: "a36e96c0b8c299e25767",
      monthSlicerId: "550de89675d60d2a7478",
      yearY: 425.54573680439455,
      yearSlicerY: 448.7795557678529,
      monthY: 518.4810126582279,
      monthSlicerY: 541.7148316216861,
      navY: 165,
      navHeight: 240,
    },
    "82ff2dfb93623b9eeb6c": {
      mainBackgroundId: "a40efbf69139973c4735",
      sidebarBackgroundId: "301f18119397cb656803",
      sidebarPanelId: null,
      pageNavigatorId: "90ef7133d4dc72c8b01c",
      yearLabelId: "9664cd3d5cf425f02640",
      yearSlicerId: "345887e07b9731b60c0e",
      monthLabelId: "4589da918d8d51e29e33",
      monthSlicerId: "ee8a2f8166853578bf1e",
      yearY: 425.54573680439455,
      yearSlicerY: 448.7795557678529,
      monthY: 518.4810126582279,
      monthSlicerY: 541.7148316216861,
      navY: 203.1234256926952,
      navHeight: 240.30226700251887,
    },
  };

  for (const [pageId, cfg] of Object.entries(extraPages)) {
    setHidden(pageId, cfg.mainBackgroundId, false);
    setHidden(pageId, cfg.sidebarBackgroundId, false);
    if (cfg.sidebarPanelId) setHidden(pageId, cfg.sidebarPanelId, false);
    setPageNavigatorOrientation(pageId, cfg.pageNavigatorId, "1D");
    setPosition(pageId, cfg.pageNavigatorId, {
      x: 8,
      y: cfg.navY,
      width: 158,
      height: cfg.navHeight,
    });
    setPosition(pageId, cfg.yearLabelId, {
      x: 18,
      y: cfg.yearY,
      width: 145,
      height: 30,
    });
    setPosition(pageId, cfg.yearSlicerId, {
      x: 12,
      y: cfg.yearSlicerY,
      width: 151.63123955099115,
      height: 54,
    });
    setPosition(pageId, cfg.monthLabelId, {
      x: 18,
      y: cfg.monthY,
      width: 167,
      height: 30,
    });
    setPosition(pageId, cfg.monthSlicerId, {
      x: 12,
      y: cfg.monthSlicerY,
      width: 151.63123955099115,
      height: 54,
    });
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
  addExtraChartsToDetailPages();
  fixCruzamentosOverlap();
  configureCruzamentosPage();
  cleanTrendLowerRow();
  hideTitleOverlays();
  configureSidebarLayouts();
  simplifyVariationLabels();
  extendEntityPages();
  configureOverviewSummary();
  configureComarcasBlueprint();
  configureEntityAnalysisPages();
  configureDefaultPieCharts();
  standardizeMetropolitanPages();
  standardizeTopKpiContent();
  compactTopKpiCards();
  compactTopKpiInternals();
  standardizePrimaryChartBoxes();
  standardizeMapBoxes();
  applyMetropolitanFilters();
  finalizePageCleanup();
  ensureTopKpiParentBinding();
  finalizeTopKpiLayout();
  restoreSidebarRails();
  sanitizeSensitiveVisualSchemas();
  console.log("Layout estabilizado: grupos de bookmark recriados e overlays ocultados.");
}

main();
