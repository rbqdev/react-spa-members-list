import { act, render, screen } from "@testing-library/react";
import { MembersListPagination } from "./MembersListPagination";
import userEvent from "@testing-library/user-event";

const defaultValues = {
  totalMembers: 20,
  currentPage: 1,
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  goToPage: jest.fn(),
};

describe("MembersListPagination", () => {
  it("should render total of pages expected", () => {
    render(<MembersListPagination {...defaultValues} />);

    const elements = screen.getAllByTestId("paginationItemButton");
    const totalPagesExpected = 3;
    expect(elements).toHaveLength(totalPagesExpected);
  });

  it("should disable first page if is equal to currentPage", () => {
    render(<MembersListPagination {...defaultValues} />);

    const elements = screen.getAllByTestId("paginationItemButton");
    const arrows = screen.getAllByTestId("paginationArrow");

    // First item
    expect(elements[0]).toBeDisabled();
    // Arrow left
    expect(arrows[0]).toBeDisabled();
    // Arrow right
    expect(arrows[1]).not.toBeDisabled();
  });

  it("should call the func `goToPage` with index", async () => {
    render(<MembersListPagination {...defaultValues} />);

    const elements = screen.getAllByTestId("paginationItemButton");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(elements[1]);
    });

    expect(defaultValues.goToPage).toHaveBeenCalledWith(2);
  });

  it("should call the func `nextPage`", async () => {
    render(<MembersListPagination {...defaultValues} />);

    const arrows = screen.getAllByTestId("paginationArrow");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(arrows[1]);
    });

    expect(defaultValues.nextPage).toHaveBeenCalled();
  });

  it("should call the func `previousPage` if is not fisrt page", async () => {
    render(<MembersListPagination {...defaultValues} currentPage={2} />);

    const arrows = screen.getAllByTestId("paginationArrow");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(arrows[0]);
    });

    expect(defaultValues.previousPage).toHaveBeenCalled();
  });

  it("should show `paginationItemEllipsis` when have more than 6 pages", async () => {
    render(<MembersListPagination {...defaultValues} totalMembers={200} />);

    const ellipsis = screen.getAllByTestId("paginationItemEllipsis");

    expect(ellipsis[0]).toBeInTheDocument();
  });
});
