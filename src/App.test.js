import { render, screen } from '@testing-library/react';

jest.mock('./components/Navigation', () => () => (
  <nav>
    <span>WasteWizard</span>
  </nav>
));

import App from './pages/home';

test('renders waste analyzer heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Waste Classification/i });
  expect(heading).toBeInTheDocument();
});
