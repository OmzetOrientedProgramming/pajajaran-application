import { screen, cleanup, render } from '@testing-library/react';
import Button from '../../components/Utils/Button';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Util button', () => {
  test('buttonType customPrimary', async () => {
    render(
      <Button buttonType="customPrimary" color="#123456">
        Button
      </Button>
    );

    const styles = getComputedStyle(screen.getByText('Button'));
    expect(styles.backgroundColor).toBe('rgb(18, 52, 86)');
    expect(styles.color).toBe('rgb(255, 255, 255)');
  });

  test('buttonType customSecondary', async () => {
    render(
      <Button buttonType="customSecondary" color="#123456">
        Button
      </Button>
    );

    const styles = getComputedStyle(screen.getByText('Button'));
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles.color).toBe('rgb(18, 52, 86)');
  });
});
