# ADR-024: Transactional Email with Resend (SMTP Relay)

- **Status**: Accepted
- **Date**: 2026-10-19
- **Affects**: [ADR-021](./adr-021-low-cost-single-host-deployment.md) (SMTP settings are SSM parameters, previously set to `N/A`), [ADR-011](./adr-011-secrets-management.md) (the SMTP password is a secret)

## Context

Registration creates an unverified administrator and a new workspace, then emails a five-minute verification code. Login is blocked until the code is entered, so without a working mail sender nobody can create an account in production. The password-reset flow needs the same sender.

The first production deploy left every `SMTP_*` parameter at `N/A`. The API logs a failed send and still answers 200, so sign-up looked healthy while no code ever arrived. Production needed a real sender that costs nothing at this volume and can be configured without changing code.

## Decision

| Concern | Decision |
| --- | --- |
| Provider | [Resend](https://resend.com), through its SMTP relay (`smtp.resend.com`, port 587, STARTTLS). The API keeps its generic `SmtpEmailSender` (`aiosmtplib`); no provider SDK is added |
| Sending domain | `send.alonsovndev.com`, verified in Resend (DKIM, SPF and DMARC records published in Cloudflare DNS as DNS-only) |
| Sender address | `no-reply@send.alonsovndev.com` (a full address on the verified domain; a bare domain is rejected) |
| Credentials | `SMTP_USERNAME=resend`; `SMTP_PASSWORD` is a Resend API key |
| Configuration | SSM Parameter Store, `/ophub/prod/SMTP_HOST`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_ADDRESS`. `deploy.sh` skips parameters equal to `N/A`, so the values are set by hand once and survive later deploys |
| Failure behavior | Unchanged: a failed send is logged (`email.send_failed`) and not shown to the user |

## Consequences

- Sign-up works end to end in production; this was confirmed on 2026-10-19 by registering a real account.
- The Terraform stack does not create the parameter values, so a fresh account needs the four SSM values entered manually (documented in the infrastructure README). The API key is never stored in Git.
- Because sends fail silently from the user's point of view, a wrong key or sender is only visible in the API logs.
- The sending domain is new, so the first messages can land in spam until it builds reputation; deliverability notes are in the API repository (`docs/configuration/email-deliverability.md`).
- Retry and rate limiting for email are deferred to EPIC-9.

## Alternatives Considered

1. **Leave `SMTP_*` as `N/A` and read codes from the logs.** Rejected for production: a reviewer or user cannot sign up without access to the host.
2. **Another SMTP provider or a personal mailbox.** Not selected: Resend was already verified for the domain and working in local development, so the same configuration moved to production unchanged.
3. **Amazon SES.** Not tried. It would add another AWS service to an account whose service control policies are restricted (see [ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md)); whether it is usable there is TBD.

## Source References

- [ADR-021: Low-Cost Single-Host Deployment](./adr-021-low-cost-single-host-deployment.md)
- [ADR-023: Credits Account in us-east-2 and Manual Deploys](./adr-023-credits-account-us-east-2-manual-deploy.md)
- [Deployment Architecture](../03-architecture/ops/deployment-architecture.md)
