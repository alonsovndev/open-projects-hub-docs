# ADR-023: Credits Account in us-east-2 and Manual Deploys (No GitHub OIDC)

- **Status**: Accepted
- **Date**: 2026-10-19
- **Supersedes**: the AWS account, the region (`us-east-1`) and the GitHub OIDC deploy of [ADR-021](./adr-021-low-cost-single-host-deployment.md). The single host, Docker Compose, SSM parameters, Terraform and the Cloudflare edge of [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md) stand.

## Context

The first production stack (ADR-021, ADR-022) was applied in an older AWS account that has no credits: its bill showed only `Usage` records, so the roughly $12.85/month would have gone to a card. The $100 Free Plan credits belong to a second account created on 2026-10-10.

That account is a member of an AWS Organization whose service control policies (SCPs) are outside the project's control. Read-only probes on 2026-10-16 showed:

- EC2 calls succeed only in `us-east-2`; every other region tried (`us-east-1`, `us-west-1`, `us-west-2`, `eu-west-1`, `eu-central-1`, `ap-southeast-1`, `sa-east-1`, `ca-central-1`) returned an explicit SCP deny.
- `iam:ListOpenIDConnectProviders` is explicitly denied. Creating a provider was not tried, but without a usable GitHub OIDC provider no workflow can assume an IAM role.
- S3, SSM, IAM roles and AWS Budgets work.

Whether upgrading the account from the Free Plan lifts these limits was not tested.

## Decision

| Concern | Decision |
| --- | --- |
| Account | The credits account (`044986460195`); the earlier stack in the old account was destroyed on 2026-10-16 |
| Region | `us-east-2` for the state bucket and the whole stack |
| CI to AWS | None. No OIDC provider, no deploy role, no long-lived AWS keys in GitHub |
| Image build | GitHub Actions builds and pushes `ghcr.io/alonsovndev/open-projects-hub-api:<tag>` on a `vX.Y.Z` tag |
| Deploy | A person runs `scripts/deploy-release.sh <tag>` (API repository) with their own AWS credentials. It runs the same restricted `ophub-prod-deploy` SSM document and smoke-tests the API through Cloudflare |
| Teardown | By hand from a workstation (the destroy workflow and role are removed); steps are in the infrastructure README |

## Consequences

- The credits pay for the host. Balance and expiry of the credits are TBD (to be read from Billing).
- A release needs two steps: push the tag (image) and run the script (deploy). Nothing deploys without a person holding AWS credentials, which also removes the risk that anyone able to push a tag deploys as root on the host.
- The cost figures in ADR-021 are `us-east-1` list prices; whether `us-east-2` differs is TBD (not checked). The gross-usage budget makes any difference visible.
- Other SCP limits may appear later; they surface as "explicit deny in a service control policy" errors.
- No audit trail of deploys in GitHub; SSM Run Command history in the account records them.

## Alternatives Considered

1. **Stay in the old account (`us-east-1`, OIDC works).** Rejected: no credits, about $12.85/month on a card.
2. **Credits account with IAM user keys stored as GitHub secrets.** Keeps automatic deploys but adds long-lived keys; not selected.
3. **Ask the organization to lift the SCPs, or upgrade the plan.** Not pursued; may be revisited. If the limits go away, the OIDC deploy of ADR-021 can return.

## Source References

- [ADR-021: Low-Cost Single-Host Deployment](./adr-021-low-cost-single-host-deployment.md)
- [ADR-022: Cloudflare Edge Instead of CloudFront](./adr-022-cloudflare-edge-instead-of-cloudfront.md)
- [Deployment Architecture](../03-architecture/ops/deployment-architecture.md)
