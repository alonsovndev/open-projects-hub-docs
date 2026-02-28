# GitHub Copilot Instructions for ns_internal-docs-markdown

This repository contains documentation, including development best practices, architectural guidelines, agent specifications, and project documentation.

## Repository Purpose

This is a documentation repository that serves as the central knowledge base for:

- Development best practices and standards
- Architectural patterns and principles
- AI agent specifications and responsibilities
- Project documentation and planning
- Utility templates and tools

## Documentation Standards

### Structure and Organization

- Use clear, hierarchical folder structures organized by topic
- Follow consistent naming conventions: lowercase with hyphens for files (e.g., `clean-architecture.md`)
- Place related documentation together in thematic directories

### Content Guidelines

- Write clear, concise documentation that is actionable and easy to understand
- Include code examples where relevant, properly formatted with syntax highlighting
- Use markdown formatting consistently:
  - Use proper heading hierarchy (# for h1, ## for h2, etc.)
  - Use code blocks with language identifiers
  - Use bullet points and numbered lists appropriately
  - Use tables for structured data comparison

### Documentation Types

1. **README Files**: Provide high-level project overviews with:
   - Project description and purpose
   - Setup instructions
   - Usage examples
   - Contribution guidelines

2. **Architecture Documentation**: Document:
   - System design and architecture patterns
   - Layer responsibilities and boundaries
   - Interface placement guidelines
   - Best practices and principles

3. **Agent Documentation**: Define:
   - Agent purpose and responsibilities
   - Project structure expectations
   - Use cases and examples
   - Integration guidelines

4. **Technical Guides**: Include:
   - Step-by-step instructions
   - Code examples
   - Common patterns
   - Troubleshooting tips

## Architecture Principles

This repository documents projects that follow Clean Architecture and Domain-Driven Design (DDD) principles.

### Clean Architecture Layers

1. **Domain Layer**: Core business logic, entities, value objects, and domain services
   - Technology-agnostic
   - Contains repository interfaces
   - Independent of frameworks

2. **Application Layer**: Use cases and application services
   - Orchestrates domain logic
   - Contains DTOs and application interfaces
   - Defines external service interfaces

3. **Infrastructure Layer**: Technical implementations
   - Database access and ORM models
   - External service integrations
   - Concrete implementations of interfaces

4. **Presentation Layer**: User interaction
   - API endpoints and controllers
   - Web UI components
   - Request/response handling

### Domain-Driven Design

- Use Bounded Contexts to isolate domains
- Design Aggregates and Entities for business logic
- Implement Value Objects for immutable data
- Use Repositories to abstract persistence
- Define Domain Events for system communication

## Development Best Practices

### SOLID Principles

- **Single Responsibility**: Each module/class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes can replace base classes
- **Interface Segregation**: Avoid forcing unnecessary method implementations
- **Dependency Inversion**: Depend on abstractions, not concrete implementations

### Other Key Principles

- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering, write maintainable code
- **DRY (Don't Repeat Yourself)**: Eliminate duplicate logic, centralize reusable code
- **TDD (Test-Driven Development)**: Write tests before implementation

### Code Quality

- Write clear, self-documenting code with meaningful names
- Add comments only when necessary to explain complex logic
- Follow language-specific style guides and conventions
- Ensure high test coverage for domain and application layers
- Use dependency injection for better testability

## Technology-Specific Guidelines

### Python/FastAPI Backend

- Organize code by features (bounded contexts)
- Use type hints for better code clarity
- Implement async/await for I/O operations
- Use Pydantic for validation
- Use SQLAlchemy as ORM
- Write pytest tests with proper fixtures and mocks

### React Frontend

- Use functional components with hooks
- Implement proper state management
- Follow component-based architecture
- Ensure accessibility and responsive design
- Write clean, reusable components

### Documentation

- Maintain changelogs for versioned updates
- Keep API documentation up-to-date (OpenAPI/Swagger)
- Write getting started guides for onboarding
- Include setup instructions and prerequisites
- Provide usage examples and common workflows

## Agent Responsibilities

This repository documents several specialized agents:

### Documentation Agent

- Creates and maintains comprehensive documentation
- Generates READMEs, API docs, and developer guides
- Maintains changelogs and release notes
- Writes user-facing documentation

### Architect Lead Agent

- Defines system architecture and design patterns
- Ensures architectural consistency
- Reviews and approves design decisions
- Provides technical leadership

### UI/UX Agent

- Designs user interfaces and experiences
- Creates prototypes and mockups
- Ensures accessibility and usability
- Defines design systems

### PM Agent

- Manages project planning and coordination
- Defines requirements and acceptance criteria
- Tracks progress and prioritizes tasks
- Facilitates team communication

## Contribution Guidelines

When contributing documentation to this repository:

1. Fork the repository and create a feature branch
2. Write clear, concise commit messages
3. Follow the documentation standards outlined above
4. Ensure your documentation follows existing patterns
5. Test any code examples included in documentation
6. Provide detailed descriptions in pull requests
7. Review existing documentation to maintain consistency

## Best Practices Summary

When working with this repository or projects documented within it:

- Follow Clean Architecture and DDD principles strictly
- Write comprehensive, clear documentation
- Maintain consistent formatting and structure
- Include practical examples and code snippets
- Keep documentation up-to-date with code changes
- Use proper markdown syntax and formatting
- Organize content logically and hierarchically
- Make documentation searchable and navigable
- Test all code examples before documenting
- Review and update documentation regularly
- Include diagrams and visuals where helpful using tools like Mermaid

## License

This repository is proprietary and confidential. All contents are copyright Naranjo Solutions. Unauthorized copying, distribution, or modification is prohibited.
