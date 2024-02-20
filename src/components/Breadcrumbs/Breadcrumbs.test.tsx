import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("should display an array of values divided by an arrow", () => {
    render(<Breadcrumbs breadcrumbs={["bread1", "bread2"]} />);
    const element1 = screen.getByText("bread1 >");
    const element2 = screen.getByText("bread2");
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });
});
