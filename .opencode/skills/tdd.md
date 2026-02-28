# Test-Driven Development (TDD) Skill

This skill equips the agent with strict methodologies for Test-Driven Development. Whenever you implement a new feature, component, endpoint, or business logic, you **MUST** follow these rules before writing the implementation code.

## 1. The Core Rule of TDD

**If your test never fails first → you're not doing TDD.**

You must strictly adhere to the Red-Green-Refactor cycle:

- 🔴 **RED:** Write a failing test first. It must fail because the feature does not exist yet.
- 🟢 **GREEN:** Write the absolute minimum amount of code required to make that specific test pass. Do not over-engineer.
- 🔵 **REFACTOR:** Improve the design, clean up the code, and remove duplication while keeping the test suite green.

## 2. The AAA Pattern

Every single test you write MUST follow the **Arrange - Act - Assert** structure. Use whitespace to clearly separate these three phases in your code.

- **Arrange:** Set up the initial state, configure mocks, and define the inputs.
- **Act:** Execute the single function, method, or component render being tested.
- **Assert:** Verify that the output or state changes match the expected result.

**Why we use AAA:**
This structure makes tests:

- Readable
- Deterministic
- Self-documenting
- Maintainable

---

## 💻 AAA Examples by Language

### Python (Pytest) Example

```python
def test_deactivate_user_changes_status_to_false():
    # Arrange
    user = UserEntity(id=uuid4(), email="test@test.com", username="test", is_active=True, created_at=datetime.utcnow())

    # Act
    user.deactivate()

    # Assert
    assert user.is_active is False
```

### TypeScript (React / Jest) Example

```typescript
it('should display the error message when validation fails', async () => {
  // Arrange
  const errorMessage = "Invalid email format";
  render(<LoginForm onSubmit={mockSubmit} />);

  // Act
  const emailInput = screen.getByLabelText(/email/i);
  await userEvent.type(emailInput, 'invalid-email');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
```

## ⚙️ OpenCode Workflow for TDD

When interacting with the user:

1. Write the test file first and run it using the `bash` tool to prove it fails (RED).
2. Show the user the failing test output.
3. Use the `write` or `edit` tools to write the minimum implementation code.
4. Run the test again using the `bash` tool to prove it passes (GREEN).
5. Review the code for refactoring opportunities.
