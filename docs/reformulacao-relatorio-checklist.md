# Reformulação do Relatório TJPB Honorários

## Objetivo
Reformular o relatório para uma estrutura estável, legível e padronizada, com visão executiva clara no `Overview` e profundidade analítica nas páginas de entidades.

## Baseline protegido
- Checkpoint local: `.stable_snapshots/20260310_160023_checkpoint_pre_reformulacao`
- Arquivo compactado local: `.stable_snapshots/20260310_160023_checkpoint_pre_reformulacao/TJPB_Honorarios_Intuitivo_checkpoint_20260310_160023.tar.gz`
- Checkpoint remoto: registrar via commit + tag Git
- Checkpoint completo do workspace: `.stable_snapshots/20260310_161704_workspace_full_checkpoint`
- Arquivo completo do workspace: `.stable_snapshots/20260310_161704_workspace_full_checkpoint/PBIPlatform_v2_workspace_full_20260310_161704.tar.gz`
- Branch de arquivo: `checkpoint/full-workspace-20260310_161704`
- Tag de arquivo: `full-workspace-checkpoint-20260310_161704`

## Status atual
- Fase atual: acabamento visual fino e validação no Desktop de `Overview`, `Comarcas`, `RM João Pessoa` e `RM Campina Grande`.
- Concluído com segurança:
  - checkpoints local, remoto e do workspace completo
  - colunas curtas de exibição no modelo
  - correção do `TopN` para ordenar por medida nas páginas analíticas
  - saneamento dos controles/sobras legadas mais críticas
  - remoção do ramo descartado de `metricslicer` no gerador e no modelo
  - normalização dos gráficos superiores para medida explícita
  - limpeza estrutural inicial da página `Cruzamentos`
  - remoção dos resíduos ativos de `Product Name`/`Sub-Category` das páginas visíveis
  - limpeza estrutural principal de `Overview` e `Comarcas`, com blocos inferiores já separados e visuais legados principais ocultos
  - ocultação do wrapper duplicado do gráfico superior em `Varas`, `Peritos` e `Especialidades`
  - renomeação dos grupos ativos das páginas analíticas para nomes de negócio, removendo `PRODUCT`/`ShipMode` do layout ativo
  - realinhamento final dos cards do topo também em `RM Campina Grande`
  - experimento de promoção da navegação para faixa superior revertido; mantido o rail lateral como baseline estável
  - reflow estrutural da página `Cruzamentos` em três faixas (`rankings`, `tendência + aging`, `detalhes`)
  - carga local do TMDL pela stack de modelagem confirmada após as últimas alterações de medidas
- Ainda em aberto:
  - validação final no Power BI Desktop sem cortes/sobreposições
  - fechamento visual dos cards do topo
  - fechamento dos toggles/botões do gráfico e do mapa
  - acabamento das páginas analíticas (`Varas`, `Peritos`, `Especialidades`)

## Princípios de projeto
- `Overview` mostra visão geral; não concentra profundidade analítica.
- `Comarcas`, `Varas`, `Peritos` e `Especialidades` fazem os cruzamentos e detalhamentos.
- `RM João Pessoa` e `RM Campina Grande` seguem o mesmo padrão analítico, com filtro local.
- Evitar alternância de tipo de visual no mesmo slot quando isso reduzir estabilidade.
- Preferir rótulos curtos e contexto no título do bloco.
- Toda caixa visual deve seguir um padrão único: gráfico, mapa, ranking, cruzamento, detalhe.

## Estrutura-alvo por página

### 1. Overview
- [x] Cards executivos base padronizados
- [x] Tendência geral consolidada
- [x] Mapa geral com legenda e toggle `Mapa/Nomes`
- [x] Resumo das 4 entidades no bloco inferior
- [x] Sem tabela analítica grande
- [ ] Sem sobreposição visual

### 2. Comarcas
- [x] Cards da entidade
- [x] Tendência principal da entidade
- [x] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [x] Cruzamento operacional `Comarca x Vara`
- [x] Cruzamento financeiro `Comarca x Especialidade`
- [x] Tabela detalhe exportável
- [x] Rótulos curtos sem prefixo redundante `Comarca`

### 3. Varas
- [x] Cards da entidade
- [x] Tendência principal
- [x] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [x] Cruzamento operacional `Vara x Comarca`
- [x] Cruzamento financeiro `Vara x Especialidade`
- [x] Tabela detalhe exportável
- [x] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 4. Peritos
- [x] Cards da entidade
- [x] Tendência principal
- [x] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [x] Cruzamento operacional `Perito x Comarca`
- [x] Cruzamento financeiro `Perito x Especialidade`
- [x] Tabela detalhe exportável
- [x] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 5. Especialidades
- [x] Cards da entidade
- [x] Tendência principal
- [x] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [x] Cruzamento operacional `Especialidade x Comarca`
- [x] Cruzamento financeiro `Especialidade x Vara`
- [x] Tabela detalhe exportável
- [x] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 6. RM João Pessoa
- [x] Filtro local correto, sem somar o estado inteiro
- [x] Mapa padronizado com legenda e toggle `Mapa/Nomes`
- [x] Bloco abaixo do mapa com `Distribuição por Vara`
- [x] Donut à esquerda e lista de valores à direita
- [x] Mesmo padrão visual das páginas analíticas

### 7. RM Campina Grande
- [x] Filtro local correto, sem somar o estado inteiro
- [x] Mapa padronizado com legenda e toggle `Mapa/Nomes`
- [x] Bloco abaixo do mapa com `Distribuição por Vara`
- [x] Donut à esquerda e lista de valores à direita
- [x] Mesmo padrão visual das páginas analíticas

## Checklist de padronização visual

### Cards do topo
- [x] Altura uniforme
- [x] Alinhamento interno corrigido
- [x] Valores monetários em `R$`
- [ ] Remover `Saldo pendente` quando não fizer sentido no contexto
- [x] Manter conjunto final: `Valor Arbitrado`, `Ticket médio`, `Média diária`, `Qtd Perícias`, `Peritos únicos`
- [ ] Subtítulos de variação legíveis e sem corte

### Caixa de gráfico
- [ ] Mesmo tamanho-base em todas as páginas
- [ ] Título sempre com nome da entidade atual
- [ ] Sem sobreposição entre título, botão e área útil
- [ ] Botões/controles com mesmo padrão visual
- [ ] Contexto atual visível no título ou subtítulo

### Caixa de mapa
- [x] Mesmo padrão em todas as páginas com mapa
- [x] Legenda padronizada
- [x] Toggle `Mapa/Nomes`
- [ ] Sem sobreposição entre título, legenda e conteúdo
- [ ] Contorno e leitura geográfica consistentes

### Ranking
- [ ] Evitar quatro barras idênticas no `Overview`
- [ ] Barra horizontal como padrão para ranking
- [x] Rótulos curtos
- [ ] Valor legível no corpo da barra ou na lateral
- [ ] Alternância estável entre `Valor` e `Perícias`

### Cruzamentos
- [x] Um cruzamento operacional
- [x] Um cruzamento financeiro
- [ ] Escolher visual por legibilidade, não por variedade
- [ ] Preferir matriz/heatmap, barra, treemap ou donut conforme o caso
- [ ] Validar no Desktop o novo reflow da página `Cruzamentos` (rankings no topo, tendência + aging no meio, detalhes embaixo)

## Checklist de modelagem e nomenclatura
- [ ] Confirmar medidas finais de domínio
- [ ] Eliminar herança residual de nomes do template
- [x] Criar/usar colunas curtas para exibição
- [x] Garantir filtros locais corretos das RMs
- [x] Validar relações usadas por mapas e rankings

## Checklist de estabilidade técnica
- [x] Sem erro de schema JSON no report
- [ ] Sem bookmarks inválidos
- [x] Sem visual com propriedade não permitida
- [x] Sem visual branco por relação ambígua
- [x] Sem sobreposição estrutural principal entre grupos/containers

## Checklist de validação final no Desktop
- [ ] Abrir projeto sem popup de erro
- [ ] Navegar por todas as páginas principais
- [ ] Validar filtros e cruzamentos das RMs
- [ ] Validar títulos, rótulos e formatos monetários
- [ ] Validar exportação das tabelas detalhe
- [ ] Validar comportamento dos mapas

## Sequência recomendada de execução
1. Fechar baseline e checkpoint
2. Padronizar cards do topo
3. Padronizar `Overview`
4. Fechar `Comarcas`
5. Replicar padrão em `Varas`, `Peritos`, `Especialidades`
6. Fechar `RM João Pessoa` e `RM Campina Grande`
7. Rodada final de acabamento visual
8. Validação final no Desktop

## Controle de checkpoint
- [x] Checkpoint local criado
- [x] Checkpoint remoto criado por commit/tag
- [ ] Baseline validado no Desktop
- [x] Fase 1 concluída
- [ ] Fase 2 concluída
- [ ] Fase 3 concluída
- [ ] Fase 4 concluída
- [ ] Fase 5 concluída
