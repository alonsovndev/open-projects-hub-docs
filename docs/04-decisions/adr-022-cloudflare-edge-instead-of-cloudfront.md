# ADR-022: Cloudflare Edge Instead of CloudFront

- **Status**: Accepted
- **Date**: 2026-10-14, revised 2026-10-15
- **Supersedes**: the CloudFront entry point, the S3-behind-CloudFront frontend hosting and the plain-HTTP origin leg of [ADR-021](./adr-021-low-cost-single-host-deployment.md). Everything else in ADR-021 stands.

## Context

The first production apply (ADR-021 design) created 34 of 39 resources and stopped at the CloudFront distribution: AWS answered "Your account must be verified before you can add new CloudFront resources". Terraform cannot fix this; only an AWS Support case can, and its response time is unknown (TBD). Nothing can be released without a public entry point.

The project owner already owns the domain `alonsovndev.com`, managed in Cloudflare. ADR-021 assumed there was no custom domain.

On 2026-10-15 the web app was deployed on Cloudflare Workers (static assets, built by Cloudflare from the web repository) at `https://oph.alonsovndev.com`. The first revision of this ADR had Caddy on the EC2 host serving the web build too; that is no longer needed.

## Decision

Host the web app on Cloudflare Workers and put Cloudflare (free plan) in front of the API host on EC2. CloudFront is dropped.

| Component | Choice |
| --- | --- |
| Web app | Cloudflare Workers static assets at `https://oph.alonsovndev.com`, deployed by Cloudflare Builds from GitHub; not managed by Terraform and not on AWS |
| API name | `https://api-oph.alonsovndev.com`: one proxied A record to the host's Elastic IP, managed with the Terraform Cloudflare provider. One label under the zone, so the free Universal certificate covers it |
| Viewer TLS | Cloudflare edge certificate, SSL/TLS mode Full, Always Use HTTPS on |
| Origin TLS | Caddy listens on 443 with its own local-CA certificate (`tls internal`) |
| API routing | Caddy proxies `/v1/*` to the API container and answers 404 elsewhere |
| Cross-origin | Credentialed CORS: `CORS_ORIGINS` and `FRONTEND_BASE_URL` set to the web origin, `CORS_ALLOW_CREDENTIALS=true`; the web build sets `VITE_API_BASE_URL` to the API origin |
| Sessions | The `SameSite=Lax` refresh cookie is sent because both hostnames share the registrable domain `alonsovndev.com` |
| Host exposure | The security group admits TCP 443 only from a managed prefix list built from Cloudflare's published IPv4 ranges |
| Viewer address | Caddy copies `CF-Connecting-IP` into `X-Forwarded-For` |
| Database | Unchanged (ADR-021): PostgreSQL container on the same host, no published port |

## Consequences

### Positive

- No dependency on the AWS CloudFront verification; the work already applied in AWS (EC2, roles, SSM parameters, budgets) is kept.
- The origin leg is now encrypted (ADR-021 accepted plain HTTP).
- No cost: the Cloudflare free plan and the already-owned domain. The AWS bill is unchanged at about $12.85/month.
- The web app no longer loads the 1 GB host, needs no S3 hand-off bucket and no web deploy role; AWS holds only the API.
- A domain in a DNS zone we control also allows an email sending domain later (SPF and DKIM records).

### Negative

- **Cross-origin API calls.** CORS preflights add a round trip, and the API must keep the exact web origin and `CORS_ALLOW_CREDENTIALS=true` in its configuration. Web preview deployments run on other origins and cannot sign in.
- **Origin certificate is not validated.** Full mode accepts Caddy's local-CA certificate, so a party able to intercept traffic between Cloudflare and AWS could impersonate the origin. Upgrade path: a Cloudflare Origin CA certificate on Caddy and SSL mode Full (strict).
- **No shared secret header.** Cloudflare's IP ranges are shared by all its customers; another Cloudflare account could proxy to this host if it learned the Elastic IP. Authenticated Origin Pulls or a Cloudflare request-header rule would close this.
- **Two providers.** Web, DNS and edge are in Cloudflare; compute and secrets are in AWS. Terraform needs a Cloudflare API token to plan, apply and destroy.
- API and web are released separately, so API changes must stay compatible with the web build in production.
- Cloudflare's free plan waits up to 100 seconds for the origin, longer than CloudFront's 60 seconds.

## Alternatives Considered

1. ### Wait for the AWS Support case
   - Zero redesign, 5 resources left to apply.
   - Not selected: response time is unknown and nothing could be released meanwhile. It remains possible to return to CloudFront later.
2. ### CloudFront with the custom domain
   - Same verification block.
3. ### HTTPS on the Elastic IP without a domain (Let's Encrypt IP certificate or sslip.io)
   - Let's Encrypt IP certificates became generally available on 2026-01-15 and need the short-lived profile; Caddy support is recent. sslip.io shares a rate limit with all its users.
   - Not selected: the owned domain is more robust.
4. ### Caddy on the host serves the web build too (first revision of this ADR)
   - Same origin, no CORS, but needs an S3 hand-off bucket, an SSM publish document and a web deploy role, and loads the small host.
   - Not selected: the web app was deployed on Cloudflare Workers first.
5. ### Same origin through a Worker that forwards `/v1/*` to the host
   - No CORS or cookie changes, but adds Worker code and a Workers invocation on every API call.
   - Not selected: the API already supports credentialed cross-origin sessions, so no code is needed.
6. ### Cloudflare Origin CA certificate with Full (strict) from day one
   - Stronger origin authentication, but needs a manual certificate download and storing the certificate and key in SSM. Deferred as the upgrade path.
