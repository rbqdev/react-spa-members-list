import { act, render, screen } from "@testing-library/react";
import { SearchBarResultsItem } from "./SearchBarResultsItem";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const defaultValues = {
  email: "user@test.com",
  fistName: "User",
  lastName: "Test",
  pictureUrl: "https://randomuser.me/api/portraits/thumb/men/11.jpg",
  onCloseSearchBar: jest.fn(),
};

describe("SearchBarResultsItem", () => {
  it("should render item info", () => {
    render(<SearchBarResultsItem {...defaultValues} />, {
      wrapper: BrowserRouter,
    });

    const avatarFallback = screen.getByTestId("saerchbarAvatarFallback");
    const label = screen.getByText(
      `${defaultValues.fistName} ${defaultValues.lastName}`
    );
    expect(avatarFallback).toHaveTextContent("UT");
    expect(label).toBeInTheDocument();
  });

  it("should navigate to details page when user click on item", async () => {
    render(<SearchBarResultsItem {...defaultValues} />, {
      wrapper: BrowserRouter,
    });

    const element = screen.getByTestId("searchBarItemLink");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(element);
    });

    const expectedPathname = "/member/dXNlckB0ZXN0LmNvbQ==";
    expect(window.location.pathname).toEqual(expectedPathname);
    expect(defaultValues.onCloseSearchBar).toHaveBeenCalled();
  });
});
