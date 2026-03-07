# TJPB Honorários Intuitivo (PBIP)

## Arquivo correto para abrir
- `C:\git\PBIPlatform_v2\TJPB_Honorarios_Intuitivo.pbip`

## O que já está ajustado
- Slicer de ano destravado para **Todos** (sem fixo em 2014/2022).
- Filtro global do relatório que travava em `Orders[Country] = 'United States'` removido.
- Bookmarks de navegação ajustados para não forçar EUA.
- Referências quebradas de medida (`Sales Card subtitule`) corrigidas para `Sales Card Subtitle`.
- `ExcelPath` apontando para:
  - `C:\git\PBIPlatform_v2\EstatisticasPeritos.xlsx`
- Foco financeiro adicionado no modelo:
  - `Gasto Mês Atual`, `Gasto Semana Atual`, `Gasto Ano Atual`
  - `Variação Mensal %`, `Variação Semanal %`, `Variação Anual %`
  - Cruzamentos: `Peritos no Contexto`, `Comarcas no Contexto`, `Varas no Contexto`, `Especialidades no Contexto`
  - Campeão: `Campeão no Contexto`, `Campeão no Contexto (Nome)`, `Campeão no Contexto (Valor)`
  - Campo parâmetro `ParametroMetrica` atualizado com essas métricas.
- Navegação intuitiva no mapa:
  - rótulo de ação “Clique em uma comarca no mapa”
  - gráfico principal “Distribuição por Vara (Comarca Selecionada)” sem limite Top 5
  - tooltip da comarca com “Distribuição por Vara (Top 5)” + campeão no contexto
- Nova página criada:
  - `Financeiro Intuitivo` (separada da página Tendência original)
  - curvas em linha no estilo forecast com foco em gasto mensal/semanal/anual
- Padronização de usabilidade:
  - `Painel Executivo` agora tem curva em linha principal de gasto no tempo
  - `Cruzamentos` recebeu curva em linha dedicada para leitura rápida
- Navegação 1 clique para público leigo:
  - páginas: `Mensal`, `Semanal`, `Anual`, `Comarca`
  - botões grandes horizontais no topo via `pageNavigator`
  - `Comarca` mantém foco no mapa (clique na comarca para filtrar distribuição por vara)
- Página adicional de mapa estratégico:
  - `Mapa João Pessoa e Campina`
  - 3 mapas: `Mapa Geral - Paraíba`, `João Pessoa` (fixo), `Campina Grande` (fixo)
  - ideal para monitorar as duas comarcas com maior volume

## Mapeamento das tabelas (template -> adaptadas)
- `Orders`: derivada de `FactPericias` para manter visuais do template funcionando.
- `People`: derivada de `Orders[Region]`.
- `Returns`: derivada de `FactPericias` (status pendente por `Order ID`).
- `Date`: calendário derivado de `Orders[Order Date]`.
- `Measure`: mantém medidas do template para cards/visuais legados.
- Tabelas de negócio:
  - `FactPericias`
  - `DimComarcas`
  - `DimVaras`
  - `DimPeritos`
  - `DimEspecialidades`
  - `BridgePeritoEspecialidade`
  - `ParametroMetrica`
  - `ParametroDimensao`

## Relacionamentos principais
- `Orders[Order Date]` -> `Date[Date]`
- `FactPericias[Comarca]` -> `DimComarcas[Comarca]`
- `FactPericias[Juizo]` -> `DimVaras[Juizo]`
- `FactPericias[PeritoKey]` -> `DimPeritos[PeritoKey]`
- `FactPericias[Especialidade]` -> `DimEspecialidades[Especialidade]`
- `BridgePeritoEspecialidade` conectando `DimPeritos` e `DimEspecialidades`

## Sequência de atualização recomendada
1. Feche completamente o Power BI Desktop.
2. Reabra `TJPB_Honorarios_Intuitivo.pbip`.
3. Clique em **Atualizar**.
4. Aguarde terminar e valide na página **Painel Executivo**.
