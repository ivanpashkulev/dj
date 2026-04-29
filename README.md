# DJ Ivan Pashkulev - Booking Platform

Professional DJ booking and promotion platform for Bansko, Bulgaria.

## Tech Stack

- **Framework**: Next.js 14 (React, TypeScript)
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Self-hosted (Mac M2 Max dev-vm, Docker, Cloudflare Tunnel)
- **CI/CD**: GitHub Actions → GHCR → automated deployment PR

See [docs/adr/001-tech-stack.md](docs/adr/001-tech-stack.md) for full architecture decisions and rationale.

## Local Development Setup

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ivanpashkulev/dj.git
   cd dj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and fill in:
   - `DATABASE_URL`: Your local PostgreSQL connection string
   - Other variables can remain as placeholders for now

4. **Set up database** (once Prisma is integrated)
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
.
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components (TBD)
│   ├── lib/              # Utilities and helpers (TBD)
│   └── types/            # TypeScript types (TBD)
├── docs/
│   └── adr/              # Architecture Decision Records
├── .github/
│   └── workflows/        # CI/CD pipelines
├── public/               # Static assets (TBD)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Deployment

The application is containerized with Docker and deployed to a self-hosted Mac M2 Max dev-vm.

### Deployment Flow

1. Push to `main` branch
2. GitHub Actions builds and pushes Docker image to GHCR (`ghcr.io/ivanpashkulev/dj:<sha>`)
3. Automated PR is opened in the devops repo updating `docker-compose.yml`
4. Board reviews and merges deployment PR
5. Update is pulled and restarted on dev-vm

### Docker Build

```bash
docker build -t dj-ivanpashkulev .
docker run -p 3000:3000 dj-ivanpashkulev
```

### CI/CD

GitHub Actions automatically:
- Runs tests and linting on every PR
- Builds Docker image on merge to `main`
- Pushes image to GHCR tagged with commit SHA
- Opens deployment PR to devops repo

## Infrastructure

- **Host**: Mac M2 Max (dev-vm)
- **Traffic**: Cloudflare Tunnel (HTTPS termination at edge)
- **Reverse proxy**: nginx (routes dj.ivanpashkulev.com to container)
- **Container**: Docker Compose service
- **No open ports**: Cloudflare Tunnel handles inbound traffic

See [ivanpashkulev/devops](https://github.com/ivanpashkulev/devops) for full infrastructure setup.

## Contributing

### Code Quality

- TypeScript strict mode enabled
- ESLint for code style
- Responsive, mobile-first design
- SEO optimized (meta tags, semantic HTML)

### Git Workflow

1. Create feature branch from `main`
2. Make changes, commit with clear messages
3. Push and create Pull Request
4. CI/CD runs checks
5. Merge after review

## Environment Variables

See `.env.example` for required environment variables.

**Never commit `.env.local` or any file containing secrets.**

## Costs

Estimated monthly operating cost: **~$0** (self-hosted infrastructure)

- Hosting: Self-hosted Mac M2 Max (already owned)
- Domain: Already owned
- SSL: Free (Cloudflare)
- Email: Free tier (Resend)
- Payment processing: Pay-per-transaction (Stripe 2.9% + $0.30)

See ADR for detailed cost breakdown and scaling estimates.

## Support

For questions or issues, contact the board.

## License

Private - All rights reserved
