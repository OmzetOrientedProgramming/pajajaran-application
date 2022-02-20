import { render, screen } from '../test-utils';
import Home from '../../pages/index';

test('renders a title', () => {
  const { container, getByText } = render(<Home />);
  // console.log(container);
  // console.log(getByText);
  expect(getByText('Airlangga Web')).toBeInTheDocument();
  // expect(container.firstChild).toMatchInlineSnapshot(`
  //   <h1>Hello, World!</h1>
  // `)
});
