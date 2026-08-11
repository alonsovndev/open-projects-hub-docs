# ADR-006: Deployment Platform (AWS)

- **Status**: Accepted
- **Date**: 2026-02-28
- **Updated**: 2026-08-03 (AWS migration)

## Context

The project requires fast iteration, preview environments capability, and low-operations hosting for separate frontend and backend deployments. With the strategic decision to consolidate on AWS, the deployment platform must:

- Leverage AWS Free Tier for 12 months to minimize initial costs
- Support Docker-based backend deployments
- Provide CDN and static hosting for React frontend
- Enable automated deployments via GitHub Actions
- Maintain operational simplicity for a small team

## Decision

Deploy infrastructure on **AWS** with the following architecture:

- **Frontend**: Amazon S3 + CloudFront (static hosting with global CDN)
- **Backend**: AWS App Runner (Docker container service with auto-scaling)
- **Database**: Amazon RDS PostgreSQL (managed database service)
- **Storage**: Amazon S3 (for file exports and attachments)
- **Networking**: VPC with public/private subnets, security groups
- **CI/CD**: GitHub Actions orchestrating validation and deployment

### Platform Components

| Component          | AWS Service               | Configuration                                                   |
| ------------------ | ------------------------- | --------------------------------------------------------------- |
| Frontend Hosting   | S3 + CloudFront           | S3 static website + CloudFront CDN with HTTPS (ACM certificate) |
| Backend Compute    | AWS App Runner            | Docker container auto-deploy from ECR, auto-scaling enabled     |
| Database           | RDS PostgreSQL            | db.t3.micro (Free Tier), single-AZ, automated backups           |
| File Storage       | S3                        | Separate bucket for exports/attachments                         |
| Container Registry | Amazon ECR                | Docker image storage for backend                                |
| DNS                | CloudFront default domain | `*.cloudfront.net` (custom domain optional post-MVP)            |
| Secrets            | Environment Variables     | Stored in App Runner configuration (Secrets Manager optional)   |

### Environment Strategy

- **Local**: Docker Compose for development
- **Container**: Docker-based CI testing
- **Dev**: AWS Free Tier serving as production environment initially

## Consequences

### Positive

- **Unified platform**: Single cloud provider simplifies billing, IAM, networking, and monitoring.
- **Free Tier eligible**: 12 months of free hosting (~$0-15/month actual cost).
- **Excellent frontend DX**: CloudFront global CDN with HTTPS, cache control, and fast delivery.
- **Docker-based backend**: App Runner provides container deployment with auto-scaling and health checks.
- **Reduced operational overhead**: Managed services (RDS, App Runner, S3) minimize infrastructure maintenance.
- **Scalability path**: Easy to add Lambda, SQS, ElastiCache, or migrate to ECS Fargate as needs grow.
- **Infrastructure as Code**: Terraform manages all resources with version control and repeatability.
- **CI/CD integration**: GitHub Actions deploy workflow remains familiar, just targets AWS instead of Vercel/Render.

### Negative

- **Higher initial complexity**: VPC setup, security groups, IAM roles more complex than PaaS providers.
- **Setup time**: ~3-5 days for initial AWS infrastructure vs. ~1 day for Vercel/Render.
- **No automatic PR previews**: Unlike Vercel, preview environments require manual setup (not included in MVP).
- **Learning curve**: Team needs AWS fundamentals knowledge (VPC, IAM, CloudFormation/Terraform).
- **Free Tier limits**: After 12 months, costs increase to ~$30-50/month vs. staying on free tiers of multiple platforms.
- **Less out-of-box DX**: No built-in deployment previews, must configure CloudFront cache invalidation.

## Architecture Details

### Frontend Deployment Flow

```
Developer Push → GitHub Actions → Build (Vite) → Deploy to S3 → Invalidate CloudFront Cache
```

- React app built with Vite
- Static assets uploaded to S3 bucket
- CloudFront serves content globally with HTTPS
- Cache invalidation triggered after each deployment

### Backend Deployment Flow

```
Developer Push → GitHub Actions → Build Docker Image → Push to ECR → Deploy to App Runner
```

- FastAPI app packaged in Docker container
- Image pushed to Amazon Elastic Container Registry (ECR)
- App Runner automatically deploys new image
- Zero-downtime rolling deployments
- Health checks ensure stability

### Network Architecture

```
Internet
   │
   ├─→ CloudFront (Frontend) → S3 Bucket
   │
   └─→ App Runner (Backend) → VPC
                                │
                                ├─→ RDS PostgreSQL (Private Subnet)
                                └─→ S3 (File Storage)
```

- Public access: CloudFront (frontend), App Runner endpoint (API)
- Private access: RDS accessible only from App Runner via VPC connector
- Security groups restrict database access to backend service only

## Cost Breakdown (Free Tier Period)

| Service               | Free Tier                   | Expected MVP Usage     | Estimated Cost  |
| --------------------- | --------------------------- | ---------------------- | --------------- |
| App Runner            | 5 GB storage free           | ~2 GB                  | $0              |
| RDS PostgreSQL        | 750 hours/month db.t3.micro | ~720 hours             | $0              |
| S3 (static hosting)   | 5 GB storage, 20K GET       | <1 GB, <10K requests   | $0              |
| S3 (file storage)     | 5 GB, 2K PUT                | <500 MB                | $0              |
| CloudFront            | 1 TB transfer, 10M requests | <10 GB, ~100K requests | $0              |
| ECR                   | 500 MB storage free         | <200 MB                | $0              |
| VPC                   | Free (NAT Gateway not used) | N/A                    | $0              |
| **Total (12 months)** |                             |                        | **~$0-5/month** |

**After Free Tier expires**: ~$30-50/month

## Alternatives Considered

1. **Vercel (Frontend) + Render (Backend) + Supabase (Database)**
   - Original design for multi-platform managed services.
   - Not selected to consolidate on single cloud provider and leverage AWS Free Tier.
   - **Trade-off**: Faster initial setup but higher ongoing costs and multi-platform complexity.

2. **AWS Amplify (Frontend) + Lambda (Backend)**
   - Considered for serverless architecture.
   - Not selected because:
     - Lambda cold starts impact API latency
     - FastAPI designed for long-running container processes
     - Container deployment simpler for team with Docker experience

3. **ECS Fargate + Application Load Balancer**
   - Considered for more control than App Runner.
   - Not selected for MVP due to higher complexity (ALB setup, task definitions, service discovery).
   - **Migration path**: Can move from App Runner to ECS if control needs emerge.

4. **Self-managed EC2 instances**
   - Considered for maximum control.
   - Not selected due to operational burden (patching, scaling, monitoring, load balancing).

5. **Kubernetes (EKS)**
   - Considered for microservices readiness.
   - Not selected due to extreme operational complexity and cost (~$75/month for control plane alone).
