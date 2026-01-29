// @ts-nocheck
/* eslint-disable no-unused-vars */

// Force UTC timezone for consistent date/time behavior across all tests
process.env.TZ = 'UTC';

require('@testing-library/jest-dom');
const { expect } = require('@jest/globals');

// Ensure expect is picked up from Jest
global.expect = expect;

// Setup DOM globals only if Element exists (for JSDOM environment)
if (typeof Element !== 'undefined') {
  Element.prototype.scrollTo = () => {};
}

// Setup window globals only in browser environment
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock DOM APIs that aren't available in jsdom
global.PointerEvent =
  global.PointerEvent ||
  function (type, init) {
    const event = new MouseEvent(type, init);
    event.pointerId = init?.pointerId || 1;
    event.pointerType = init?.pointerType || 'mouse';
    return event;
  };

global.ClipboardEvent =
  global.ClipboardEvent ||
  function (type, init) {
    const event = new Event(type, init);
    event.clipboardData = init?.clipboardData || null;
    return event;
  };

// Mock React useLayoutEffect to avoid warnings in JSDOM
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

// Suppress React warnings during tests to avoid test failures from pre-existing key warnings
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    if (
      message.includes('Warning: Each child in a list should have a unique "key" prop') ||
      message.includes('React keys must be passed directly to JSX without using spread')
    ) {
      return;
    }

    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    if (
      message.includes('Warning: Each child in a list should have a unique "key" prop') ||
      message.includes('React keys must be passed directly to JSX without using spread')
    ) {
      return;
    }

    originalWarn.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
