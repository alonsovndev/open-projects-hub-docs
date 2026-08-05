# ADR-013: Infrastructure as Code Strategy

**Status**: Accepted  
**Date**: 2026-02-28  
**Updated**: 2026-08-03 (AWS-focused strategy)

## Context

The platform infrastructure spans multiple AWS services (VPC, RDS, App Runner, S3, CloudFront, ECR, IAM) across development and production environments. Manual configuration via AWS Console introduces significant risks:

**Problems:**

- Configuration drift between environments (dev/prod)
- Lack of change auditability and review process
- Slow environment replication (can't easily recreate staging or disaster recovery)
- No version control for infrastructure changes
- Difficult rollback of infrastructure changes

**Constraints:**

- Must work within AWS Free Tier limits
- Must support multiple environments (dev/staging/prod)
- Must integrate with GitHub-based CI/CD workflows
- Must protect production changes with approval gates
- Must maintain state consistency across team members

**Requirements:**

- Version-controlled infrastructure definitions
- Automated plan/apply workflows
- State management with locking to prevent concurrent modifications
- Modular design for environment replication
- Integration with existing GitHub Actions CI/CD

## Decision

Adopt **Terraform** as the Infrastructure as Code (IaC) tool with the following architecture:

**Core Components:**

- **Provider**: AWS Provider (`hashicorp/aws`) for all infrastructure
- **Workflow**: GitHub Actions for automated `terraform plan` on PRs, `terraform apply` on merge
- **Structure**: Environment-specific configurations with shared modules
- **Secrets**: Sensitive values passed via GitHub Secrets as Terraform variables

**Managed Resources:**

- Networking: VPC, subnets, security groups, NAT gateway
- Compute: AWS App Runner service configurations
- Database: RDS PostgreSQL instances
- Storage: S3 buckets, ECR repositories
- CDN: CloudFront distributions
- Access: IAM roles, policies, service accounts
- Monitoring: CloudWatch + Sentry log groups and alarms

## Consequences

### Positive

- Version-controlled infrastructure — all changes tracked in Git with PR review process
- Repeatable environments — identical dev/staging/prod environments from same Terraform modules
- Reduced configuration drift — Terraform state detects manual changes, enables drift detection
- Clear change history — supports incident response, rollback, and compliance auditing
- AWS-native focus — single provider simplifies module design vs. multi-cloud complexity
- Team collaboration — infrastructure changes reviewed via pull requests like code
- Automated workflows — GitHub Actions runs `terraform plan` on PRs, `terraform apply` on merge to main
- State locking — DynamoDB prevents concurrent modifications and state corruption
- Modular design — reusable modules (VPC, RDS, App Runner) accelerate new environment setup

### Negative

- Initial setup overhead — 1-2 days to structure modules, configure remote state, set up GitHub Actions
- State management complexity — S3 backend + DynamoDB locking requires careful initial configuration
- Learning curve — team must understand Terraform HCL syntax, AWS resource dependencies, state management
- Plan/apply discipline required — must always review `terraform plan` output before applying changes
- Provider version management — need governance for AWS provider upgrades to avoid breaking changes
- Storage costs — S3 state storage and DynamoDB table (though minimal: <$1/month expected)
- Destroy risks — `terraform destroy` can accidentally delete production resources if misused

## Alternatives Considered

### 1. AWS CloudFormation

- Considered for AWS-native IaC with tight service integration
- Not selected because:
  - JSON/YAML syntax less ergonomic and readable than Terraform HCL
  - Terraform has more mature module ecosystem and community support
  - Terraform state management more flexible than CloudFormation stack model
  - Team preference for Terraform based on prior experience

### 2. AWS CDK (Cloud Development Kit)

- Considered for programmatic infrastructure with Python/TypeScript
- Not selected because:
  - Uses CloudFormation underneath, inheriting some AWS resource coverage limitations
  - Less mature than Terraform for multi-service orchestration
  - Smaller community and fewer third-party modules compared to Terraform
  - Team lacks TypeScript/Python IaC experience; Terraform HCL easier to learn
