# Clé Beauty — Web App

Plataforma da Clé Beauty:

- **Academia** — cursos de automaquiagem pagos. Toda a gente vê o resumo e o programa;
  só quem compra dá play nas aulas em vídeo (a 1ª aula de cada curso é preview grátis).
- **Loja** — produtos de maquilhagem e cabelo com checkout (simulado — não cobra de verdade).
- **Provador virtual** — usa a câmara para aplicar tons de **batom, blush e sobrancelha**
  em tempo real (deteção facial com MediaPipe). Sem conta experimenta-se **1 tom**;
  com conta, todos.
- **Contas** — registo/login com JWT. Sem conta dá para navegar e experimentar 1 filtro;
  com conta dá para comprar, ver a biblioteca de cursos e o histórico de pedidos.

Visual: tons de rosa + preto, tipografia pixel (*Press Start 2P* + *Silkscreen*).

## Stack

| Camada | Tecnologia |
|---|---|
| `backend/` | NestJS 10 + Prisma. Base de dados **SQLite** em dev (troca fácil para Postgres). Auth JWT. |
| `ui/` | Next.js 14 (App Router) + Tailwind. MediaPipe Tasks Vision (FaceLandmarker) no provador. |

## Arrancar em local

Pré-requisitos: Node 18+.

### 1. Backend (porta 4000)

```bash
cd backend
cp .env.example .env
npm install
npm run setup      # prisma generate + db push + seed de dados demo
npm run start:dev
```

API em `http://localhost:4000/api`.
Conta demo criada pelo seed: **demo@clebeauty.com** / **clebeauty123** (já tem 1 curso).

### 2. UI (porta 3000)

```bash
cd ui
cp .env.example .env.local
npm install
npm run dev
```

App em `http://localhost:3000`.

## Passar para Postgres

1. `backend/prisma/schema.prisma` → `provider = "postgresql"`
2. `backend/.env` → `DATABASE_URL` com a connection string do Postgres
3. `cd backend && npm run prisma:migrate`

## Notas

- **Pagamentos**: o endpoint `POST /api/checkout` cria a encomenda e liberta o acesso aos
  cursos sem cobrar nada. Para Stripe real, substituir esse fluxo por uma Stripe Checkout Session.
- **Vídeos dos cursos**: o seed usa um vídeo de amostra público. Em produção, apontar
  `Lesson.videoUrl` para o teu host (Mux, Cloudflare Stream, S3+CloudFront, …).
- **Imagens**: o seed usa `picsum.photos` como placeholder — substituir pelas fotos reais dos produtos.
- **Provador**: o modelo de deteção facial e o runtime WASM são carregados de CDN
  (`jsdelivr` / `storage.googleapis.com`) no browser. Precisa de HTTPS ou `localhost`
  e permissão de câmara.

## API (resumo)

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | — | Criar conta |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | JWT | Utilizador + cursos adquiridos |
| GET | `/api/products` | — | Lista de produtos (`?category=makeup\|hair`, `?filter=true`) |
| GET | `/api/products/filters` | — | Produtos com filtro de provador |
| GET | `/api/products/:id` | — | Detalhe do produto |
| GET | `/api/courses` | — | Lista de cursos (resumo) |
| GET | `/api/courses/:slug` | opcional | Detalhe + aulas (vídeos só se comprado/preview) |
| POST | `/api/checkout` | JWT | Finalizar compra (simulada) |
| GET | `/api/orders` | JWT | Histórico de pedidos |
| GET | `/api/library` | JWT | Cursos adquiridos |
