# GitHub Pages — Beta 1

## Objetivo
Publicar a aplicação Next.js como site estático em GitHub Pages, inclusive quando o repositório é servido em `https://usuario.github.io/repositorio/`.

## Arquitetura
- `next.config.ts`: `output: "export"`, `trailingSlash: true` e `basePath` por `NEXT_PUBLIC_BASE_PATH`.
- `lib/publicPath.ts`: prefixa assets do diretório `public/` com o mesmo base path.
- `app/encontro/[sceneId]/layout.tsx`: gera estaticamente todos os IDs de Dates conhecidos em `outingScenes`.
- `.github/workflows/pages.yml`: instala dependências, roda QA, gera `out/` e publica usando GitHub Pages Actions.
- `public/.nojekyll`: evita tratamento Jekyll do artifact.

## Configuração no GitHub
1. Settings → Pages → Source: GitHub Actions.
2. Push em main/master ou Actions → Deploy GitHub Pages → Run workflow.
3. Opcional Supabase:
   - Repository variable `NEXT_PUBLIC_SUPABASE_URL`
   - Repository secret `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Abrir a URL exibida no environment `github-pages`.

## Importante
A página normal do repositório (`github.com/...`) continuará exibindo README. Isso é esperado. O jogo é a URL `github.io/...`.

## Rotas
`trailingSlash` faz cada rota exportar um diretório com `index.html`, permitindo refresh direto em `/agencia/`, `/conversa/`, `/desenvolvimento/` e Dates pré-gerados.
