import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /sweet shop/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render the initial list of sweets', () => {
    render(<Home />);
    expect(screen.getByText('Chocolate Delight')).toBeInTheDocument();
    expect(screen.getByText('Gummy Bears')).toBeInTheDocument();
    expect(screen.getByText('Caramel Chew')).toBeInTheDocument();
  });
}); 