# DJ Ivan Pashkulev - Booking Platform

Professional DJ booking and promotion platform for Bansko, Bulgaria.

## Tech Stack

- **Framework**: Next.js 14 (React, TypeScript)
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Self-hosted VPS (Docker)
- **CI/CD**: GitHub Actions

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

The application is containerized with Docker and deployed to a self-hosted VPS.

### Docker Build

```bash
docker build -t dj-ivanpashkulev .
docker run -p 3000:3000 dj-ivanpashkulev
```

### CI/CD

GitHub Actions automatically:
- Runs tests and linting on every PR
- Builds Docker image on merge to `main`
- Deploys to production VPS (when configured)

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

Estimated monthly operating cost: **$5-10**

- VPS: $5-10/month
- Domain: Already owned
- SSL: Free (Let's Encrypt)
- Email: Free tier (Resend)
- Payment processing: Pay-per-transaction (Stripe 2.9% + $0.30)

See ADR for detailed cost breakdown and scaling estimates.

## Support

For questions or issues, contact: ivan.pashkulev@gmail.com

## License

Private - All rights reserved
