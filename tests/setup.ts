import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Global test setup for Vitest + React Testing Library.
// Add shared mocks and polyfills here as the project grows.

// Mock environment variables for unit tests
vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000');
vi.stubEnv('PAYLOAD_SECRET', 'test-secret-key-minimum-32-characters-long');
