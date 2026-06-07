import { render, screen } from "@testing-library/react";
import { Box } from "../box.component";

describe("Box Component", () => {
  it("renders with default props", () => {
    render(<Box>Test Content</Box>);
    const box = screen.getByText("Test Content");

    expect(box).toBeInTheDocument();
    expect(box.tagName.toLowerCase()).toBe("div");
    expect(box).toHaveClass("flex");
    expect(box).toHaveClass("flex-row");
    expect(box).toHaveClass("items-stretch");
    expect(box).toHaveClass("justify-start");
    expect(box).toHaveClass("w-full");
    expect(box).toHaveClass("gap-0");
  });

  it("applies custom className", () => {
    render(<Box className="custom-class">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("custom-class");
  });

  it("renders with custom element type", () => {
    render(<Box as="section">Section</Box>);
    expect(screen.getByText("Section").tagName.toLowerCase()).toBe("section");
  });

  it("applies direction classes correctly", () => {
    const { rerender } = render(<Box direction="column">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("flex-col");

    rerender(<Box direction="row">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("flex-row");
  });

  it("applies alignment classes correctly", () => {
    const { rerender } = render(<Box align="start">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("items-start");

    rerender(<Box align="center">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("items-center");

    rerender(<Box align="end">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("items-end");

    rerender(<Box align="stretch">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("items-stretch");
  });

  it("applies justify classes correctly", () => {
    const { rerender } = render(<Box justify="center">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("justify-center");

    rerender(<Box justify="between">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("justify-between");

    rerender(<Box justify="around">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("justify-around");

    rerender(<Box justify="end">Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("justify-end");
  });

  it("applies gap class correctly", () => {
    render(<Box gap={4}>Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("gap-4");
  });

  it("applies wrap class when wrap is true", () => {
    render(<Box wrap>Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("flex-wrap");
  });

  it("applies fullWidth class when fullWidth is true", () => {
    render(<Box fullWidth>Test</Box>);
    expect(screen.getByText("Test")).toHaveClass("w-full");

    const { container } = render(<Box fullWidth={false}>Test</Box>);
    const box = container.firstChild;
    expect(box).not.toHaveClass("w-full");
  });

  it("renders children correctly", () => {
    render(
      <Box>
        <span data-testid="child1">Child 1</span>
        <span data-testid="child2">Child 2</span>
      </Box>,
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
});
