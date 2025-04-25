import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { formatJsonWithBoldKeys, formatArrayWithBoldKeys, formatParameter } from "@app/utils/formatUtils/formatJsonUtil";
import * as utils from "@app/utils/formatUtils/formatJsonUtil";

describe("formatJsonUtil", () => {
  test("formatJsonWithBoldKeys renders a JSON object with bold keys", () => {
    const data = { name: "Alice", age: 30 };
    render(formatJsonWithBoldKeys("User", data));

    expect(screen.getByText("User:")).toBeInTheDocument();
    expect(screen.getByText('"name"')).toBeInTheDocument();
    expect(screen.getByText('"Alice"')).toBeInTheDocument();
    expect(screen.getByText('"age"')).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("formatArrayWithBoldKeys renders an array with elements", () => {
    const data = [{ id: 1 }, { id: 2 }];
    render(formatArrayWithBoldKeys("List", data));

    expect(screen.getByText("List:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("formatParameter renders label and parameter", () => {
    render(formatParameter("Status", <span>OK</span>));

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });
});

describe('formatJsonUtil - null values', () => {
  test('formatJsonWithBoldKeys returns expected JSX for null JSON', () => {
    const result = formatJsonWithBoldKeys('TestLabel', null as any);
    render(<>{result}</>);
    expect(screen.getByText(/TestLabel:/)).toBeInTheDocument();
    expect(screen.queryByText('{')).not.toBeInTheDocument(); // Should not render JSON brackets
  });

  test('formatArrayWithBoldKeys returns expected JSX for null array', () => {
    const result = formatArrayWithBoldKeys('ArrayLabel', null as any);
    render(<>{result}</>);
    expect(screen.getByText(/ArrayLabel:/)).toBeInTheDocument();
    expect(screen.queryByText('[')).not.toBeInTheDocument(); // Should not render array brackets
  });

  test('formatParameter renders nothing for null parameter', () => {
    const result = formatParameter('ParamLabel', null);
    render(<>{result}</>);
    expect(screen.getByText(/ParamLabel:/)).toBeInTheDocument();
    // Find the wrapper and check it doesn't contain extra text
    const labelElement = screen.getByText(/ParamLabel:/).closest('div');
    expect(labelElement?.textContent?.trim()).toBe('ParamLabel:');
  });
});

function TestWrapper({ value }: { value: any }) {
  return <>{(utils as any).formatJsonValue(value)}</>;
}

describe("formatJsonValue - direct", () => {
  test("renders <span>null</span> when value is null", () => {
    render(<TestWrapper value={null} />);
    expect(screen.getByText("null")).toBeInTheDocument();
  });
});