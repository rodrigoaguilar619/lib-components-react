import { verifyHasValue } from '@app/utils/dataUtils/verifyDataUtil';

test('value is not null, not undefined, and not an empty string', () => {
  expect(verifyHasValue('hello')).toBe(true);
  expect(verifyHasValue(123)).toBe(true);
  expect(verifyHasValue(true)).toBe(true);
});

test('value is null', () => {
  expect(verifyHasValue(null)).toBe(false);
});

test('value is undefined', () => {
  expect(verifyHasValue(undefined)).toBe(false);
});

test('value is an empty string', () => {
  expect(verifyHasValue('')).toBe(false);
});