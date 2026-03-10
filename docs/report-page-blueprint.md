# Blueprint de Paginas do Relatorio

## Overview
- Objetivo: visao geral executiva do tribunal
- Cards: Valor Arbitrado, Quantidade de Pericias, Ticket Medio, Saldo Pendente, Peritos Unicos
- Tendencia geral: evolucao do Valor Arbitrado com seletor de periodo
- Mapa geral: Paraiba com destaque de comarcas
- Destaques: 4 cards curtos com campeoes do contexto
- Comparativo resumido das entidades: Comarcas, Varas, Peritos, Especialidades
- Sem tabela detalhada
- Sem cruzamentos profundos

## Comarcas
- Objetivo: aprofundar distribuicao territorial
- Cards: Valor Arbitrado, Qtd de Pericias, Ticket Medio, Saldo Pendente, Peritos Unicos
- Grafico principal: evolucao temporal da comarca selecionada
- Ranking lateral: Top 10 Comarcas por Valor ou Top 10 Comarcas por Pericias
- Cruzamento operacional: Comarca x Vara
- Cruzamento financeiro: Comarca x Especialidade
- Tabela detalhe exportavel: Comarca, Qtd de Pericias, Valor Arbitrado, Ticket Medio, Saldo Pendente, Participacao
- Extras: mapa e ranking sincronizados

## Varas
- Objetivo: aprofundar demanda por vara
- Cards: Valor Arbitrado, Qtd de Pericias, Ticket Medio, Saldo Pendente, Comarca Relacionada
- Grafico principal: evolucao temporal da vara selecionada
- Ranking lateral: Top 10 Varas por Valor ou Top 10 Varas por Pericias
- Cruzamento operacional: Vara x Comarca
- Cruzamento financeiro: Vara x Especialidade
- Tabela detalhe exportavel: Vara, Comarca, Qtd de Pericias, Valor Arbitrado, Ticket Medio, Saldo Pendente
- Extras: comparacao da vara contra media da comarca

## Peritos
- Objetivo: aprofundar concentracao por profissional
- Cards: Valor Arbitrado, Qtd de Pericias, Ticket Medio, Saldo Pendente, Comarcas Atendidas
- Grafico principal: evolucao temporal do perito selecionado
- Ranking lateral: Top 10 Peritos por Valor ou Top 10 Peritos por Pericias
- Cruzamento operacional: Perito x Comarca
- Cruzamento financeiro: Perito x Especialidade
- Tabela detalhe exportavel: Perito, Qtd de Pericias, Valor Arbitrado, Ticket Medio, Saldo Pendente, Comarcas Atendidas
- Extras: usar o rotulo visual "Peritos unicos" em vez de "Peritos Distintos"

## Especialidades
- Objetivo: aprofundar custo e volume por tipo de pericia
- Cards: Valor Arbitrado, Qtd de Pericias, Ticket Medio, Saldo Pendente, Peritos Unicos
- Grafico principal: evolucao temporal da especialidade selecionada
- Ranking lateral: Top 10 Especialidades por Valor ou Top 10 Especialidades por Pericias
- Cruzamento operacional: Especialidade x Comarca
- Cruzamento financeiro: Especialidade x Vara
- Tabela detalhe exportavel: Especialidade, Qtd de Pericias, Valor Arbitrado, Ticket Medio, Saldo Pendente, Peritos Unicos
- Extras: matriz de concentracao entre especialidades caras e volumosas

## Padrao comum das 4 entidades
- Mesmo layout-base
- Mesmo controle de periodo
- Mesmo toggle de metrica principal
- Mesmo toggle de ranking por valor/pericias
- Dois cruzamentos fixos por pagina
- Uma tabela detalhe no rodape
- Drill-through para detalhe da selecao atual
