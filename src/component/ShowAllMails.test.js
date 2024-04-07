import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import ShowAllMail from "./ShowAllMail";
import { getMails } from "../actions/crudApis"; // Import getMails function

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../actions/crudApis"); // Mock getMails function

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("ShowAllMail component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { email: "test@example.com" },
      email: { received: [] },
    });
    useDispatch.mockReturnValue(jest.fn());
  });

  test('renders "Show all mails" text', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    expect(getByText("Show all mails")).toBeInTheDocument();
  });

  test("fetches and displays mails", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    await waitFor(() =>
      expect(getByText("sender1@example.com")).toBeInTheDocument()
    );
    expect(getByText("Subject 1")).toBeInTheDocument();
    expect(getByText("sender2@example.com")).toBeInTheDocument();
    expect(getByText("Subject 2")).toBeInTheDocument();
  });

  test("calls getMails action with correct user email", async () => {
    render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    await waitFor(() => {
      expect(getMails).toHaveBeenCalledWith("test@example.com");
    });
  });

  test("displays error message if data fetching fails", async () => {
    getMails.mockRejectedValueOnce(new Error("Failed to fetch data"));
    const { getByText } = render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    await waitFor(() =>
      expect(getByText("Failed to fetch data")).toBeInTheDocument()
    );
  });

  test('renders "Show all mails" text', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    expect(getByText("Show all mails")).toBeInTheDocument();
  });

  test("fetches and displays mails", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    await waitFor(() =>
      expect(getByText("sender1@example.com")).toBeInTheDocument()
    );
    expect(getByText("Subject 1")).toBeInTheDocument();
    expect(getByText("sender2@example.com")).toBeInTheDocument();
    expect(getByText("Subject 2")).toBeInTheDocument();
  });

  test("calls getMails action with correct user email", async () => {
    render(
      <Provider store={store}>
        <ShowAllMail />
      </Provider>
    );
    await waitFor(() => {
      expect(getMails).toHaveBeenCalledWith("test@example.com");
    });
  });
});
