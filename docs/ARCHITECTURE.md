# Invoice Management System - Architecture

## Visão Geral

Este documento descreve as decisões arquiteturais para o frontend do Sistema de Gestão de Faturas. O projeto adota princípios de componentização rigorosa e separação de preocupações (Separation of Concerns).

## Decisões Tecnológicas

| Tecnologia | Justificativa |
| :--- | :--- |
| **React 18** | Utilização de recursos modernos como concorrência. Adotado para renderização rápida e flexível do lado do cliente. |
| **Vite** | Ferramenta de build de última geração. Fornece HMR incrivelmente rápido e empacotamento otimizado, reduzindo o tempo de CI/CD. |
| **TypeScript** | Fornece tipagem estática, garantindo a integridade dos contratos de dados (como tipos de `Invoice` e `Product`) durante a fase de compilação. |
| **Tailwind CSS** | Estilização por utilitários (Utility-first). Garante escopo de estilo sem colisão e facilita a manutenção de design tokens. |
| **shadcn/ui** | Componentes baseados no Radix UI. Proporciona acessibilidade (a11y) "out-of-the-box" com customização nativa via Tailwind. |

## Estrutura de Diretórios (Domain-Driven UI)

O diretório `src` está organizado por responsabilidade:

- `components/ui/`: Elementos base e primitivos da interface (botões, inputs). Agem como a fundação de design do sistema.
- `components/invoice/`: Componentes de domínio. Encapsulam a lógica e apresentação diretamente ligadas ao negócio de faturamento.
- `types/`: Definições globais de interfaces TypeScript, funcionando como o "contrato" do domínio de dados.
- `pages/`: Componentes de rotação de alto nível que orquestram os componentes de domínio e lidam com estados globais temporários.

## Princípios de Design e UI/UX

1. **Glassmorphism e Neumorphism Subtil**: Utilização de fundos translúcidos e bordas refinadas para indicar profundidade e hierarquia da informação.
2. **Feedback Imediato**: Operações de mutação (adicionar, editar, deletar itens) possuem *toast notifications* e atualizações otimistas da UI.
3. **Padrão de Cor Dark-First**: Estética dark mode focada em produtividade e redução de fadiga ocular, seguindo padrões de dashboards financeiros e plataformas SaaS enterprise.
