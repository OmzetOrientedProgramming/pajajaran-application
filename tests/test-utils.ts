import { render } from "@testing-library/react";
import { AnyRecord } from "dns";
import { ReactElement, JSXElementConstructor } from "react";

interface ProvidersProps {
  children: any
}

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return children;
};


const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };