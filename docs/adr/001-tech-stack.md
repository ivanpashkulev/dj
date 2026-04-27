# ADR 001: Tech Stack Selection for DJ Vertical

**Date**: 2026-04-27  
**Status**: Accepted  
**Decision Maker**: DJ Engineering Manager  

## Context

Setting up the technical foundation for dj.ivanpashkulev.com - a DJ booking and promotion platform targeting the Bansko/Bulgaria market. This is the first vertical of the ivanpashkulev.com multi-brand platform.

**Requirements:**
- Public landing page with booking form
- Admin dashboard for managing bookings
- Payment processing integration
- Email notifications
- Basic analytics

**Constraints:**
- Minimal costs, self-hosted infrastructure preferred
- Mobile-first, SEO-optimized
- High code quality
- Deploy independently from other verticals

## Decision

### Frontend & Backend Framework: **Next.js 14 (TypeScript)**

**Why:**
- Full-stack framework: handles both frontend and API routes in one codebase
- Excellent SEO: Server-Side Rendering (SSR) and Static Site Generation (SSG)
- Mobile-first: React-based with responsive design patterns
- Zero cost: free to self-host
- Strong TypeScript support: ensures code quality
- Large community and excellent documentation
- Fast development iteration

**Alternatives considered:**
- Separate frontend (React) + backend (Node/Express): More complexity, harder to deploy
- PHP/Laravel: Good but less modern ecosystem, team less familiar
- WordPress: Low quality code, security concerns, overkill for MVP

### Database: **PostgreSQL**

**Why:**
- Free, open-source, reliable
- Excellent for transactional data (bookings, payments, users)
- Easy to self-host
- Strong data integrity guarantees
- Well-supported by all major hosting providers

**Alternatives considered:**
- MySQL: Similar but PostgreSQL has better JSON support and advanced features
- SQLite: Too limited for production, no concurrent writes
- MongoDB: Overkill for structured booking data, costs more to host reliably

### Hosting: **Self-hosted VPS (Docker)**

**Why:**
- Minimal cost: ~$5-10/month for small VPS (Hetzner, DigitalOcean, or Linode)
- Full control over infrastructure
- Docker containers: easy deployment, rollback, and scaling
- Can host database, app, and nginx on same instance for MVP
- Easy to migrate or scale later

**Alternatives considered:**
- Vercel/Netlify: Free tier exists but has limitations, costs scale quickly
- AWS/GCP: Excellent but overkill for MVP, more expensive
- Shared hosting: Limited control, harder to configure

### Payment Provider: **Stripe**

**Why:**
- No monthly fees: pay-as-you-go (2.9% + $0.30 per transaction)
- Excellent developer experience and documentation
- Supports international payments (important for Bulgaria)
- Strong security and compliance built-in
- Easy integration with Next.js

**Alternatives considered:**
- PayPal: Higher fees, less developer-friendly
- Local Bulgarian payment processor: Limited international support, less documentation

### Email Service: **Resend**

**Why:**
- Free tier: 100 emails/day (sufficient for MVP)
- Simple API, great DX
- Good deliverability
- Easy to self-host SMTP as fallback

**Alternatives considered:**
- SendGrid: Good but more complex pricing
- Self-hosted SMTP: Deliverability issues, maintenance overhead
- AWS SES: Requires AWS account, more setup

### CI/CD: **GitHub Actions**

**Why:**
- Free for public repos
- Free tier for private repos (2000 minutes/month)
- Native GitHub integration
- Easy to configure
- Can deploy to any VPS via SSH

**Alternatives considered:**
- GitLab CI: Similar but team already uses GitHub
- CircleCI/Travis: Additional service to manage, costs money

## Deployment Approach

1. **Development**: `npm run dev` locally on port 3000
2. **Build**: `npm run build` creates production Next.js standalone output
3. **Docker**: Multi-stage build creates minimal production image
4. **CI/CD**: GitHub Actions runs tests + lint, builds Docker image, pushes to VPS
5. **Production**: Docker Compose on VPS (app + PostgreSQL + nginx reverse proxy)
6. **Health checks**: Built into Docker, monitors app availability
7. **Rollback**: Keep last 3 Docker images, quick rollback via Docker tag

## Cost Estimate

| Service | Monthly Cost |
|---------|-------------|
| VPS (2GB RAM, 1 vCPU) | $5-10 |
| Domain (already owned) | $0 |
| SSL (Let's Encrypt) | $0 |
| Email (Resend free tier) | $0 |
| Payment (Stripe) | Pay-per-transaction (2.9% + $0.30) |
| GitHub Actions | $0 (within free tier) |
| **Total** | **$5-10/month** |

**Scaling costs:**
- More traffic: Upgrade VPS to 4GB RAM (~$20/month)
- More emails: Resend paid tier starts at $20/month for 50k emails
- Database needs: Separate DB instance (~$10/month)

## Rollback/Migration Strategy

### Rollback
- Docker images tagged with git commit SHA
- Keep last 3 production images on VPS
- Rollback via `docker-compose up -d app:v1.2.3`
- Database migrations use Prisma with `down` scripts

### Migration to managed services (if needed)
- Next.js: Deploy to Vercel (lift-and-shift, change env vars)
- Database: Export PostgreSQL to managed Postgres (AWS RDS, DigitalOcean Managed DB)
- Email: Already using external service (Resend)
- Payment: Already using external service (Stripe)

## Security Considerations

- HTTPS everywhere: Let's Encrypt certificates via certbot
- Environment variables: Never commit secrets, use `.env.local` in development
- Input validation: Zod schemas on all API routes
- Payment security: PCI compliance handled by Stripe (never store card data)
- Database: Parameterized queries via Prisma ORM (prevents SQL injection)
- Rate limiting: nginx rate limits on API routes
- CORS: Strict origin policies for API routes

## Next Steps

1. Set up local development environment
2. Create CI/CD pipeline with GitHub Actions
3. Provision VPS and configure Docker deployment
4. Implement basic landing page and booking form
5. Integrate Stripe for payments
6. Set up admin dashboard

## Approval

This ADR represents the engineering decision for the DJ vertical tech stack. No budget approval needed for development setup. CEO approval required before:
- Purchasing VPS hosting ($5-10/month)
- Registering Stripe account (no cost until transactions)
- Purchasing SSL certificates (using free Let's Encrypt, so no approval needed)
