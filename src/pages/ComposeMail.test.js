import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ComposeMail from "./ComposeMail";
import { Provider } from "react-redux";
import store from "../store/store";

describe("ComposeMail component", () => {
  const originalAlert = window.alert;
  beforeAll(() => {
    window.alert = jest.fn();
  });
  afterAll(() => {
    window.alert = originalAlert;
  });

  test("renders correctly", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ComposeMail />
      </Provider>
    );
    expect(getByText("Compose New Mail")).toBeInTheDocument();
    expect(getByLabelText("To:")).toBeInTheDocument();
    expect(getByLabelText("Subject:")).toBeInTheDocument();
    expect(getByText("Send")).toBeInTheDocument();
  });

  test("displays alert if any field is empty when sending", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ComposeMail />
      </Provider>
    );

    fireEvent.click(getByText("Send"));

    expect(window.alert).toHaveBeenCalledTimes(3); // Expecting alert to be called 3 times
    expect(window.alert).toHaveBeenCalledWith("Enter recipent email");
    expect(window.alert).toHaveBeenCalledWith(
      "Write subject of your composed mail"
    );
    expect(window.alert).toHaveBeenCalledWith(
      "write body of your composed mail"
    );
  });

  // Add more test cases for different scenarios as needed
});
