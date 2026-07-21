name: Pull Request

description: Describe what this PR changes and how reviewers can verify it.

body:

- type: markdown
  attributes:
  value: | ## Summary
  Brief description of what changed and why.

- type: checkboxes
  id: type
  attributes:
  label: Type of change
  options: - label: Feature - label: Bug fix - label: Refactor - label: Documentation - label: Chore / CI

- type: textarea
  id: test-plan
  attributes:
  label: Test plan
  description: Steps to verify locally
  placeholder: | - [ ] npm run lint - [ ] npm run test - [ ] npm run build - [ ] Manual check in /admin (if CMS schema changed)
  validations:
  required: true

- type: checkboxes
  id: checklist
  attributes:
  label: Checklist
  options: - label: Self-reviewed code - label: No secrets or .env files committed - label: Architecture / docs updated if this is a structural change - label: Conventional Commits used for PR title
