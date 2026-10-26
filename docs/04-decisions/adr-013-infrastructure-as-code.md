# ADR-013: Infrastructure as Code Strategy

- **Status**: Accepted
- **Date**: 2026-02-28

## Context

The production infrastructure is one AWS EC2 host with its network and access resources, SSM parameters, and a Cloudflare DNS record ([ADR-021](./adr-021-low-cost-single-host-deployment.md), [ADR-022](./adr-022-cloudflare-edge-instead-of-cloudfront.md)). Manual configuration via the AWS Console introduces significant risks:

**Problems:**

- Lack of change auditability and review process
- Slow environment replication (can't easily recreate the stack)
- No version control for infrastructure changes
- Difficult rollback of infrastructure changes

**Constraints:**

- Must stay within the hosting budget
- Must protect production against accidental destruction
- Must maintain state consistency

**Requirements:**

- Version-controlled infrastructure definitions
- State management with locking to prevent concurrent modifications
- Modular design for replication

## Decision

Adopt **Terraform** as the Infrastructure as Code (IaC) tool, in the separate `open-projects-hub-infra` repository.

**Core Components:**

- **Providers**: AWS (`hashicorp/aws`) and Cloudflare
- **State**: S3 bucket with the native lockfile (no DynamoDB), created by a separate `bootstrap` stack
- **Structure**: `envs/prod` for the production stack and reusable modules (`modules/compute`, `modules/deploy`)
- **Workflow**: CI runs `terraform fmt -check`, `init -backend=false` and `validate` only. Plan and apply are run by hand from a workstation; CI never applies ([ADR-023](./adr-023-credits-account-us-east-2-manual-deploy.md))
- **Secrets**: parameter values are not in Terraform and are set by hand ([ADR-011](./adr-011-secrets-management.md))

**Managed Resources:**

- Compute: one EC2 host, Elastic IP, security group and instance role
- Deploy: the SSM document that deploys a release tag
- Configuration: SSM Parameter Store parameters (names, not values)
- Cost: AWS Budgets
- DNS: the proxied Cloudflare record for the API hostname

## Consequences

### Positive

- Version-controlled infrastructure: all changes are tracked in Git and reviewed through pull requests.
- Reduced configuration drift: Terraform state detects manual changes.
- Clear change history: supports incident response and rollback.
- A small stack that can be recreated from code.
- Guards against accidents: the instance has `prevent_destroy` and termination protection.

### Negative

- State management complexity: the S3 backend must be bootstrapped by hand with local state.
- Learning curve: the team must understand HCL syntax, AWS resource dependencies and state management.
- Plan/apply discipline: `terraform plan` output must always be reviewed before applying, and applies are manual.
- Provider version management: AWS and Cloudflare provider upgrades need governance.
- Destroy risks: `terraform destroy` can delete the production host and its data, which has no backups.
- Terraform needs a Cloudflare API token to plan, apply and destroy.

## Alternatives Considered

### 1. AWS CloudFormation

- Considered for AWS-native IaC with tight service integration
- Not selected because:
  - JSON/YAML syntax is less ergonomic and readable than Terraform HCL
  - Terraform has a more mature module ecosystem and community support
  - Terraform can also manage the Cloudflare record, which CloudFormation cannot
  - Team preference for Terraform based on prior experience

### 2. AWS CDK (Cloud Development Kit)

- Considered for programmatic infrastructure with Python/TypeScript
- Not selected because:
  - It uses CloudFormation underneath, inheriting some AWS resource coverage limitations
  - It is less mature than Terraform for multi-provider orchestration
  - The team lacks CDK experience; Terraform HCL is easier to learn
