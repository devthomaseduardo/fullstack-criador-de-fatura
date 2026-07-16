# Sistema de Gestão de Faturas

[![CI](https://github.com/thomas-ed/Sistema-de-Gest-o-de-Faturas/actions/workflows/ci.yml/badge.svg)](https://github.com/thomas-ed/Sistema-de-Gest-o-de-Faturas/actions/workflows/ci.yml)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=devthomaseduardo&repo=fullstack-criador-de-fatura&color=orange" alt="Repository Views" />
</p>

Um sistema moderno, rápido e eficiente para geração e gestão de faturas, focado em alta performance e experiência do usuário profissional. Construído com arquitetura baseada em componentes escaláveis.

## 🚀 Visão Geral de Negócio

Emissões manuais de faturas são propensas a erros e consomem tempo produtivo valioso. Esta aplicação resolve este problema ao prover uma interface centralizada e inteligente onde profissionais e empresas podem cadastrar clientes, injetar itens de faturamento (produtos ou serviços), e imediatamente exportar contratos e faturas padronizadas em PDF, prontas para disparo.

## 🛠 Arquitetura e Tecnologias

A aplicação foi desenhada focando em manutenibilidade e performance:

- **Core**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) (Rápido HMR e build otimizado)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Design System**: [shadcn/ui](https://ui.shadcn.com/) para primitivação de UI acessível.
- **Exportação**: Geração nativa de PDF com `react-to-print`.

Para um detalhamento técnico completo de nossas escolhas arquiteturais, veja nossa documentação de [Arquitetura](docs/ARCHITECTURE.md).

## ⚙️ Instalação e Execução (Local)

Requisitos: Node.js (18.x ou superior).

```bash
# Clone o repositório
git clone https://github.com/seu_usuario/Sistema-de-Gest-o-de-Faturas.git

# Acesse a pasta do projeto
cd Sistema-de-Gest-o-de-Faturas

# Instale as dependências
npm install

# Inicie o ambiente de desenvolvimento local
npm run dev
```
O servidor estará acessível em `http://localhost:5173`.

## 🧪 Qualidade de Código e Testes

Garantimos a integridade do código utilizando tipagem estática forte e linters configurados.

```bash
# Validação de regras de estilo e anti-patterns
npm run lint

# Checagem estática de tipagem Typescript
npx tsc --noEmit
```

## 📚 Estrutura de Diretórios

O repositório está organizado segundo padrões limpos e focados no domínio.

```
├── .github/          # Fluxos de Integração Contínua (GitHub Actions)
├── docs/             # Documentação Arquitetural e Operacional
├── src/              # Source code da aplicação
│   ├── components/   # UI System (ui/) e Domínio (invoice/)
│   ├── types/        # Contratos de tipagem globais do TypeScript
│   ├── pages/        # Views e componentes de roteamento
│   └── lib/          # Helpers, utils e integrações (ex: Tailwind merge)
└── tailwind.config.ts# Configuração do Design System global
```

## 🤝 Contribuição

Interessado em escalar o projeto conosco? Leia nosso [Guia de Contribuição](docs/CONTRIBUTING.md) para detalhes sobre o fluxo de desenvolvimento, setup do ambiente e padrões estritos de _Conventional Commits_.

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

> **📊 Visualizações deste repositório**  
> O badge acima mostra o número de visualizações únicas deste README (atualizado automaticamente via [komarev.com](https://komarev.com/ghpvc)).  
> Obrigado pela visita! Se o projeto te inspirou, considere deixar uma estrela ⭐️.

**Padrão aplicado em todos os repositórios de Thomas Eduardo.**