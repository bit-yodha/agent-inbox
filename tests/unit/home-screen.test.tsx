import { render, screen } from '@testing-library/react-native';

import HomeScreen from '@/app/index';

describe('HomeScreen (foundation placeholder)', () => {
  it('renders the product name and tagline', async () => {
    await render(<HomeScreen />);

    expect(screen.getByRole('header', { name: 'Agent Inbox' })).toBeTruthy();
    expect(screen.getByText('All your agents. One inbox.')).toBeTruthy();
  });

  it('states honestly that no agents are connected', async () => {
    await render(<HomeScreen />);

    expect(screen.getByText('Foundation build. No agents are connected yet.')).toBeTruthy();
  });
});
