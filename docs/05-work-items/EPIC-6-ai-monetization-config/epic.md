# Epic: AI Monetization and Configuration

**Epic Title**: AI Monetization and Configuration
**Epic Key**: EPIC-6
**Summary**: Provide a mechanism for users to utilize AI features, including free credits and integration of their own API keys.
**Labels**: ai, monetization, configuration
**Priority**: Must Have
**Components**: Backend, Frontend
**Fix Version**: MVP-1

---

**Epic Description:**
Problem Statement: The platform's AI features rely on third-party services which have associated costs. Users need a way to try the service and then continue using it with their own billing credentials.

Objective: Implement a system that provides initial free credits for AI usage and allows users to configure their own API keys from supported providers to continue using the service.

Included scope:

- Tracking of AI credit usage per user.
- A "5 free credits" system for new users.
- A settings page for users to input and manage their own API keys (e.g., OpenAI, Gemini).

Excluded scope:

- Direct billing or subscription management.
- Team-based credit pools.
- Complex analytics on credit usage.

Related feature and requirement IDs: F-010

Dependencies:

- [Feature Requirements](../../01-requirements/f-010-ai-credits-and-api-key-management.md)
- [API Contract](../../03-architecture/api/api-contract.md)

Measurable success criteria:

- New users are granted 5 free credits upon account creation.
- Each AI refinement action decrements the credit count.
- Users can add, update, and remove their own API keys.
- Once free credits are exhausted, the system uses the user's API key.

## Release Checklist

- [ ] Version bump in package.json / pyproject.toml
- [ ] CHANGELOG.md updated with epic summary
- [ ] Git tag created (e.g., v0.5.0 for MVP)
- [ ] GitHub release published with notes
- [ ] Deployed to staging/production
- [ ] Smoke test passed

