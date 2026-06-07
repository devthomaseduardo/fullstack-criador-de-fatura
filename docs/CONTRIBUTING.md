# Guia de Contribuição

Obrigado por considerar contribuir para o Sistema de Gestão de Faturas. Seguimos padrões rigorosos para manter a qualidade e sustentabilidade do código.

## Ambiente de Desenvolvimento

1. Certifique-se de usar Node.js na versão 18 ou superior.
2. Instale as dependências via `npm install`.
3. Inicie o servidor via `npm run dev`.

## Padrões de Código

- Utilize **TypeScript** estritamente. Evite o uso de `any`.
- Formate o código e obedeça as regras de linting configuradas (`npm run lint`).
- Evite lógica de negócios acoplada nos componentes de `ui/`.

## Padrão de Commits (Conventional Commits)

Nós utilizamos a especificação do [Conventional Commits](https://www.conventionalcommits.org/). Todos os pull requests serão analisados com base neste padrão.

**Formatos aceitos:**
- `feat:` (nova funcionalidade)
- `fix:` (correção de bug)
- `refactor:` (refatoração de código que não corrige um bug nem adiciona funcionalidade)
- `style:` (formatação, ponto e vírgula ausente, etc.)
- `docs:` (mudanças apenas na documentação)
- `chore:` (atualização de tarefas de build, gerenciador de pacotes)

**Exemplo:**
`feat(invoice): adiciona cálculo dinâmico de impostos baseados na região`

## Pull Requests

- Descreva detalhadamente o que foi resolvido.
- Se a sua PR introduzir mudanças visuais, inclua capturas de tela (screenshots) de antes e depois.
- Certifique-se de que a CI (Build & Lint) está passando antes de solicitar uma revisão.
