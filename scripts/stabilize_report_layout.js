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
  fe4687310000e672d410: ["497f294b2027826219b5", "7a0a375c13acb32abc97"],
  d4f6a8c0b3e57921f234: ["497f294b2027826219b5", "7a0a375c13acb32abc97"],
  a6f4e2b9c1d34780ef12: ["497f294b2027826219b5", "7a0a375c13acb32abc97"],
  e5a1b2c3d4f60789ab01: ["497f294b2027826219b5", "7a0a375c13acb32abc97"],
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
  if (!value || !expr || !Array.isArray(select) || !select[0]?.Measure) return;
  const entity = MEASURE_ENTITY_BY_NAME[measureProperty] || "Measure";

  select[0].Measure.Expression.SourceRef.Source = "m";
  select[0].Measure.Property = measureProperty;
  select[0].Name = `${entity}.${measureProperty}`;
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

function setChartMeasure(pageId, visualId, measureProperty) {
  const filePath = visualPath(pageId, visualId);
  if (!fs.existsSync(filePath)) return;
  const visual = readJson(filePath);
  const projection = visual.visual?.query?.queryState?.Y?.projections?.[0];
  if (!projection) return;
  const entity = MEASURE_ENTITY_BY_NAME[measureProperty] || "Measure";

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

function buildTopNFilter({ entity, property, top, measureEntity, factEntity, factProperty, aggFunction }) {
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
                    From: [
                      {
                        Name: "f",
                        Entity: entity,
                        Type: 0,
                      },
                    ],
                    Select: [
                      {
                        Column: {
                          Expression: {
                            SourceRef: {
                              Source: "f",
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
                        Expression: {
                          Aggregation: {
                            Expression: {
                              Column: {
                                Expression: {
                                  SourceRef: {
                                    Source: "f",
                                  },
                                },
                                Property: factProperty,
                              },
                            },
                            Function: aggFunction,
                          },
                        },
                      },
                    ],
                    Top: top,
                  },
                },
              },
              Type: 2,
            },
            {
              Name: "f",
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
                            Source: "f",
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
    factProperty: measure.sortProperty ?? "ValorArbitrado",
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
    factEntity: measure.entity,
    factProperty: measure.sortProperty ?? "ValorArbitrado",
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

function configureOverviewSummary() {
  const bookmarks = readJson(BOOKMARKS_PATH);
  const { pageId, left, right } = OVERVIEW_SUMMARY_CONFIG;

  setBarChartBinding(
    pageId,
    left.charts.comarcas,
    { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    5
  );
  setBarChartBinding(
    pageId,
    left.charts.varas,
    { entity: "FactPericias", property: "JuizoExibicao", displayName: "Vara" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    5
  );
  setTreemapBinding(
    pageId,
    right.charts.peritos,
    { entity: "FactPericias", property: "PeritoNomeExibicao", displayName: "Perito" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    5
  );
  setTreemapBinding(
    pageId,
    right.charts.especialidades,
    { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    5
  );

  for (const [key, groupId] of Object.entries(right.groups)) {
    setPosition(pageId, groupId, right.groupPositions[key]);
    setHidden(pageId, groupId, key !== "peritos");
  }
  setHidden(pageId, left.groups.comarcas, false);
  setHidden(pageId, left.groups.varas, true);

  Object.values(left.titles).forEach(({ titleId, subtitleId, title, subtitle }) => {
    setTextLabel(pageId, titleId, title);
    setTextLabel(pageId, subtitleId, subtitle);
  });
  Object.values(right.titles).forEach(({ titleId, subtitleId, title, subtitle }) => {
    setTextLabel(pageId, titleId, title);
    setTextLabel(pageId, subtitleId, subtitle);
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
  delete rightNavigator.isHidden;
  writeJson(visualPath(pageId, right.navigatorId), rightNavigator);

  writeJson(BOOKMARKS_PATH, bookmarks);
}

function configureComarcasBlueprint() {
  const bookmarks = readJson(BOOKMARKS_PATH);
  const cfg = COMARCAS_BLUEPRINT_CONFIG;
  const pageId = cfg.pageId;

  setBarChartBinding(
    pageId,
    cfg.leftToggle.charts.valor,
    { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    10
  );
  setBarChartBinding(
    pageId,
    cfg.leftToggle.charts.qtd,
    { entity: "FactPericias", property: "ComarcaExibicao", displayName: "Comarca" },
    { entity: "Measure", property: "Qtd Perícias Base", displayName: "Qtd Perícias Base", sortProperty: "NumeroPericia", aggFunction: 5 },
    10
  );
  setTreemapBinding(
    pageId,
    cfg.rightToggle.charts.peritos,
    { entity: "FactPericias", property: "PeritoNomeExibicao", displayName: "Perito" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    10
  );
  setTreemapBinding(
    pageId,
    cfg.rightToggle.charts.especialidades,
    { entity: "FactPericias", property: "EspecialidadeExibicao", displayName: "Especialidade" },
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
    10
  );
  setBarChartBinding(
    pageId,
    cfg.operational.chartId,
    cfg.operational.dimension,
    { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
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
  });
  Object.values(cfg.rightToggle.titles).forEach(({ titleId, subtitleId, title, subtitle }) => {
    setTextLabel(pageId, titleId, title);
    setTextLabel(pageId, subtitleId, subtitle);
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
      cfg.entityColumn,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
      cfg.ranking.topN
    );
    setBarChartBinding(
      pageId,
      cfg.ranking.altChartId,
      cfg.entityColumn,
      { entity: "Measure", property: "Qtd Perícias Base", displayName: "Qtd Perícias Base", sortProperty: "NumeroPericia", aggFunction: 5 },
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
      cfg.operational.dimension,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
      cfg.operational.topN
    );
    setTextLabel(pageId, cfg.operational.titleId, cfg.operational.title);
    setTextLabel(pageId, cfg.operational.subtitleId, cfg.operational.subtitle);
    setHidden(pageId, cfg.operational.subtitleId, false);

    setTreemapBinding(
      pageId,
      cfg.financial.chartId,
      cfg.financial.dimension,
      { entity: "Measure", property: "Valor Arbitrado Base", displayName: "Valor Arbitrado Base", sortProperty: "ValorArbitrado" },
      cfg.financial.topN
    );
    setTextLabel(pageId, cfg.financial.titleId, cfg.financial.title);
    setTextLabel(pageId, cfg.financial.subtitleId, cfg.financial.subtitle);

    createOrUpdateDetailTable(pageId, cfg.detail.visualId, cfg.detail.title, [
      buildColumnProjection(cfg.entityColumn.entity, cfg.entityColumn.property, cfg.entityColumn.displayName),
      buildColumnProjection(cfg.secondaryColumn.entity, cfg.secondaryColumn.property, cfg.secondaryColumn.displayName),
      buildMeasureProjection("Measure", "Qtd Perícias Base", "Qtd Perícias"),
      buildMeasureProjection("Measure", "Valor Arbitrado Base", "Valor Arbitrado"),
      buildMeasureProjection("Measure", "Saldo a Receber Base", "Saldo Pendente"),
      buildMeasureProjection("FactPericias", "Ticket Médio", "Ticket Médio"),
    ]);
  }

  writeJson(BOOKMARKS_PATH, bookmarks);
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
  cleanTrendLowerRow();
  hideTitleOverlays();
  extendEntityPages();
  configureOverviewSummary();
  configureComarcasBlueprint();
  configureEntityAnalysisPages();
  console.log("Layout estabilizado: grupos de bookmark recriados e overlays ocultados.");
}

main();
