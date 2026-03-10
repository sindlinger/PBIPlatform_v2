# Reformulação do Relatório TJPB Honorários

## Objetivo
Reformular o relatório para uma estrutura estável, legível e padronizada, com visão executiva clara no `Overview` e profundidade analítica nas páginas de entidades.

## Baseline protegido
- Checkpoint local: `.stable_snapshots/20260310_160023_checkpoint_pre_reformulacao`
- Arquivo compactado local: `.stable_snapshots/20260310_160023_checkpoint_pre_reformulacao/TJPB_Honorarios_Intuitivo_checkpoint_20260310_160023.tar.gz`
- Checkpoint remoto: registrar via commit + tag Git

## Princípios de projeto
- `Overview` mostra visão geral; não concentra profundidade analítica.
- `Comarcas`, `Varas`, `Peritos` e `Especialidades` fazem os cruzamentos e detalhamentos.
- `RM João Pessoa` e `RM Campina Grande` seguem o mesmo padrão analítico, com filtro local.
- Evitar alternância de tipo de visual no mesmo slot quando isso reduzir estabilidade.
- Preferir rótulos curtos e contexto no título do bloco.
- Toda caixa visual deve seguir um padrão único: gráfico, mapa, ranking, cruzamento, detalhe.

## Estrutura-alvo por página

### 1. Overview
- [ ] Cards executivos finais padronizados
- [ ] Tendência geral consolidada
- [ ] Mapa geral com legenda e toggle `Mapa/Nomes`
- [ ] Resumo das 4 entidades no bloco inferior
- [ ] Sem tabela analítica grande
- [ ] Sem sobreposição visual

### 2. Comarcas
- [ ] Cards da entidade
- [ ] Tendência principal da entidade
- [ ] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [ ] Cruzamento operacional `Comarca x Vara`
- [ ] Cruzamento financeiro `Comarca x Especialidade`
- [ ] Tabela detalhe exportável
- [ ] Rótulos curtos sem prefixo redundante `Comarca`

### 3. Varas
- [ ] Cards da entidade
- [ ] Tendência principal
- [ ] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [ ] Cruzamento operacional `Vara x Comarca`
- [ ] Cruzamento financeiro `Vara x Especialidade`
- [ ] Tabela detalhe exportável
- [ ] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 4. Peritos
- [ ] Cards da entidade
- [ ] Tendência principal
- [ ] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [ ] Cruzamento operacional `Perito x Comarca`
- [ ] Cruzamento financeiro `Perito x Especialidade`
- [ ] Tabela detalhe exportável
- [ ] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 5. Especialidades
- [ ] Cards da entidade
- [ ] Tendência principal
- [ ] Ranking lateral `Top 10 por Valor / Top 10 por Perícias`
- [ ] Cruzamento operacional `Especialidade x Comarca`
- [ ] Cruzamento financeiro `Especialidade x Vara`
- [ ] Tabela detalhe exportável
- [ ] Mapa padronizado com legenda e toggle `Mapa/Nomes`

### 6. RM João Pessoa
- [ ] Filtro local correto, sem somar o estado inteiro
- [ ] Mapa padronizado com legenda e toggle `Mapa/Nomes`
- [ ] Bloco abaixo do mapa com `Distribuição por Vara`
- [ ] Donut à esquerda e lista de valores à direita
- [ ] Mesmo padrão visual das páginas analíticas

### 7. RM Campina Grande
- [ ] Filtro local correto, sem somar o estado inteiro
- [ ] Mapa padronizado com legenda e toggle `Mapa/Nomes`
- [ ] Bloco abaixo do mapa com `Distribuição por Vara`
- [ ] Donut à esquerda e lista de valores à direita
- [ ] Mesmo padrão visual das páginas analíticas

## Checklist de padronização visual

### Cards do topo
- [ ] Altura uniforme
- [ ] Alinhamento interno corrigido
- [ ] Valores monetários em `R$`
- [ ] Remover `Saldo pendente` quando não fizer sentido no contexto
- [ ] Manter conjunto final: `Valor Arbitrado`, `Ticket médio`, `Média diária`, `Qtd Perícias`, `Peritos únicos`
- [ ] Subtítulos de variação legíveis e sem corte

### Caixa de gráfico
- [ ] Mesmo tamanho-base em todas as páginas
- [ ] Título sempre com nome da entidade atual
- [ ] Sem sobreposição entre título, botão e área útil
- [ ] Botões/controles com mesmo padrão visual
- [ ] Contexto atual visível no título ou subtítulo

### Caixa de mapa
- [ ] Mesmo padrão em todas as páginas com mapa
- [ ] Legenda padronizada
- [ ] Toggle `Mapa/Nomes`
- [ ] Sem sobreposição entre título, legenda e conteúdo
- [ ] Contorno e leitura geográfica consistentes

### Ranking
- [ ] Evitar quatro barras idênticas no `Overview`
- [ ] Barra horizontal como padrão para ranking
- [ ] Rótulos curtos
- [ ] Valor legível no corpo da barra ou na lateral
- [ ] Alternância estável entre `Valor` e `Perícias`

### Cruzamentos
- [ ] Um cruzamento operacional
- [ ] Um cruzamento financeiro
- [ ] Escolher visual por legibilidade, não por variedade
- [ ] Preferir matriz/heatmap, barra, treemap ou donut conforme o caso

## Checklist de modelagem e nomenclatura
- [ ] Confirmar medidas finais de domínio
- [ ] Eliminar herança residual de nomes do template
- [ ] Criar/usar colunas curtas para exibição
- [ ] Garantir filtros locais corretos das RMs
- [ ] Validar relações usadas por mapas e rankings

## Checklist de estabilidade técnica
- [ ] Sem erro de schema JSON no report
- [ ] Sem bookmarks inválidos
- [ ] Sem visual com propriedade não permitida
- [ ] Sem visual branco por relação ambígua
- [ ] Sem sobreposição estrutural entre grupos/containers

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
- [ ] Checkpoint remoto criado por commit/tag
- [ ] Baseline validado no Desktop
- [ ] Fase 1 concluída
- [ ] Fase 2 concluída
- [ ] Fase 3 concluída
- [ ] Fase 4 concluída
- [ ] Fase 5 concluída
