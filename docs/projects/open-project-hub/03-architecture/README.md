# Architecture Overview

This document provides a high-level overview of the Open Projects Hub architecture. It serves as a central starting point for understanding the system's design, components, and technical decisions.

## 1. Core Architectural Design

The project follows a **Modular Monolith** architecture for the backend, deployed as a single service, with a decoupled frontend application. This approach was chosen to balance development velocity with clear domain separation from the outset.

- **[Architecture Solution Design](./architecture-solution-design.md)**: Describes the overall system design, components, and interactions.
- **[Architecture Styles](./architecture-styles.md)**: Explains the rationale for choosing a Modular Monolith and defines the initial Bounded Contexts.

## 2. Technology Stack

Our technology choices are aimed at creating a modern, scalable, and maintainable platform. The full list of technologies and the reasoning behind their selection is available in the document below.

- **[Technology Stack](./technology-stack.md)**: Details the frameworks, languages, and services used across the stack.

## 3. API and Communication

Communication between the frontend and backend is handled via a RESTful API. For certain asynchronous operations, an event-driven approach is used to enhance reliability and decoupling.

- **[API Design Standards](./api-design-standards.md)**: Defines the conventions for versioning, error handling, and naming.
- **[API Contract](./api-contract.md)**: Specifies the REST API endpoints and data formats.
- **[Event-Driven Architecture](./event-driven-architecture.md)**: Outlines the strategy for asynchronous communication patterns.

## 4. Deployment and Operations

The system is deployed on modern cloud platforms, with a fully automated CI/CD pipeline to ensure reliability and frequent updates.

- **[Deployment Architecture](./deployment-architecture.md)**: Details the infrastructure setup on Vercel, Render, and Supabase.
- **[CI/CD Pipeline](./ci-cd-pipeline.md)**: Describes the automated build, test, and deployment process using GitHub Actions.
- **[Monitoring & Observability](./monitoring-observability.md)**: Outlines the strategy for logging, tracing, and performance monitoring.

## 5. Security

Security is a core consideration in our architecture, from authentication and authorization to data protection and threat modeling.

- **[Security Architecture](./security-architecture.md)**: Lays out the overall security strategy, including authentication and authorization.
- **[Threat Model](./threat-model.md)**: Identifies potential security threats and mitigation strategies.

## 6. Sequence Diagrams

- **[Sequence Diagrams](./sequence-diagrams.md)**: Key user and system interaction flows — authentication, core workflow, and async processing.

## 7. Diagrams and Decision Records

Visual diagrams and detailed decision records provide deeper insight into our architecture.

- **[Diagrams](./diagrams/)**: Contains all architectural diagrams, including C4 models, data flow, and sequence diagrams.
- **[Architecture Decision Records (ADRs)](./adrs/)**: Provides detailed justifications for significant architectural decisions.
