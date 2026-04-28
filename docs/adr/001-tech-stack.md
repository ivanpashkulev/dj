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

### Hosting: **Self-hosted Mac M2 Max (dev-vm) with Cloudflare Tunnel**

**Why:**
- Zero hosting cost: using already-owned Mac M2 Max
- Cloudflare Tunnel: no open inbound ports, secure by default
- Docker containers: easy deployment, rollback, and scaling
- Full control over infrastructure
- SSL/TLS handled by Cloudflare at edge (zero config)
- Can host multiple verticals on same machine

**Alternatives considered:**
- VPS (Hetzner, DigitalOcean): $5-10/month ongoing cost
- Vercel/Netlify: Free tier exists but has limitations, costs scale quickly
- AWS/GCP: Excellent but overkill for MVP, more expensive

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

### CI/CD: **GitHub Actions → GHCR → Automated Deployment PR**

**Why:**
- Free for public repos, free tier for private repos (2000 minutes/month)
- Native GitHub integration
- Build Docker image, push to GHCR automatically
- Open automated PR to devops repo for GitOps deployment
- Board approval before deployment (via PR merge)

**Alternatives considered:**
- Direct SSH deployment: Less secure, no approval gate
- GitLab CI: Similar but team already uses GitHub
- CircleCI/Travis: Additional service to manage, costs money

## Deployment Approach

1. **Development**: `npm run dev` locally on port 3000
2. **Build**: `npm run build` creates production Next.js standalone output
3. **Docker**: Multi-stage build creates minimal production image
4. **CI/CD on merge to main**:
   - GitHub Actions runs lint + type-check + build
   - Builds Docker image, pushes to GHCR tagged with commit SHA
   - Checks out devops repo, updates docker-compose.yml with new image tag
   - Opens automated PR to devops repo
5. **Board review**: Reviews deployment PR, merges when ready
6. **Production**: Pull and restart Docker Compose service on dev-vm
7. **Traffic flow**: Cloudflare Edge → Cloudflare Tunnel → nginx → dj container

## Cost Estimate

| Service | Monthly Cost |
|---------|-------------|
| Hosting (Mac M2 Max dev-vm) | $0 (already owned) |
| Domain (already owned) | $0 |
| SSL (Cloudflare) | $0 |
| Email (Resend free tier) | $0 |
| Payment (Stripe) | Pay-per-transaction (2.9% + $0.30) |
| GitHub Actions | $0 (within free tier) |
| **Total** | **$0/month** |

**Scaling costs:**
- More emails: Resend paid tier starts at $20/month for 50k emails
- Dedicated hosting: Move to VPS (~$10-20/month if dev-vm becomes insufficient)

## Rollback/Migration Strategy

### Rollback
- Docker images tagged with git commit SHA
- devops repo tracks deployment history via git
- Rollback via opening PR with previous image tag
- Database migrations use Prisma with `down` scripts

### Migration to dedicated hosting (if needed)
- Next.js: Lift-and-shift to VPS or Vercel
- Database: Export PostgreSQL to managed Postgres (AWS RDS, DigitalOcean Managed DB)
- Email: Already using external service (Resend)
- Payment: Already using external service (Stripe)

## Security Considerations

- HTTPS everywhere: Cloudflare terminates TLS at edge
- No open inbound ports: Cloudflare Tunnel handles all traffic
- Environment variables: Never commit secrets, use `.env.local` in development
- Input validation: Zod schemas on all API routes
- Payment security: PCI compliance handled by Stripe (never store card data)
- Database: Parameterized queries via Prisma ORM (prevents SQL injection)
- Rate limiting: nginx rate limits on API routes
- CORS: Strict origin policies for API routes

## Next Steps

1. Set up local development environment
2. Create CI/CD pipeline with GitHub Actions
3. Implement basic landing page and booking form
4. Integrate Stripe for payments
5. Set up admin dashboard

## Approval

This ADR represents the engineering decision for the DJ vertical tech stack. Infrastructure is self-hosted (zero ongoing cost), so no budget approval needed.
