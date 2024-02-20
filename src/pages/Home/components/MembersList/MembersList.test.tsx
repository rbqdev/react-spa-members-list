import { act, render, screen } from "@testing-library/react";
import { MembersList } from "./MembersList";
import userEvent from "@testing-library/user-event";
import { OrderByType } from "@api/sharedTypes";
import apiData from "@api/apiData.json";
import { BrowserRouter } from "react-router-dom";
import { maxMembersPerPage } from "@pages/Home/constants";

const { results } = apiData;
const defaultValues = {
  members: [results[0], results[1]],
  totalMembers: 2,
  currentPage: 1,
  orderedBy: OrderByType.NAME,
  isLoading: false,
  onGoToPage: jest.fn(),
  onNextPage: jest.fn(),
  onPreviousPage: jest.fn(),
};

describe("MembersList", () => {
  it("should render items", () => {
    render(<MembersList {...defaultValues} />, { wrapper: BrowserRouter });
    const elements = screen.getAllByTestId("membersListItem");
    const elementsSkeleton = screen.queryByTestId("membersListItemSkeleton");
    const totalPagesExpected = defaultValues.members.length;
    expect(elements).toHaveLength(totalPagesExpected);
    expect(elementsSkeleton).not.toBeInTheDocument();
  });

  it("should render skeleton items when is loading", () => {
    render(<MembersList {...defaultValues} isLoading={true} />, {
      wrapper: BrowserRouter,
    });
    const elementsSkeleton = screen.queryAllByTestId("membersListItemSkeleton");
    expect(elementsSkeleton).toHaveLength(maxMembersPerPage);
  });

  it("should hide pagination if totalMembers <= maxMembersPerPage", () => {
    render(<MembersList {...defaultValues} totalMembers={8} />, {
      wrapper: BrowserRouter,
    });

    const elements = screen.queryByTestId("paginationArrow");
    expect(elements).not.toBeInTheDocument();
  });
});
