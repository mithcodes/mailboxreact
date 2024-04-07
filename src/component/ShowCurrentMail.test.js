import React from "react";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import ShowCurrentMail from "./ShowCurrentMail";
import store from "../store/store";

// Mocking useSelector
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("ShowCurrentMail component", () => {
  beforeEach(() => {
    useSelector.mockClear();
  });

  test("renders email subject", () => {
    useSelector.mockReturnValueOnce("inbox"); // Mock stack
    useSelector.mockReturnValueOnce(1); // Mock emailId
    useSelector.mockReturnValueOnce([
      {
        id: 1,
        from: "hello@example.com",
        subject: "Test Subject",
        value: "Test Body",
      },
    ]); // Mock receivedEmails
    useSelector.mockReturnValueOnce([]); // Mock sentEmails

    const { getByText } = render(<ShowCurrentMail />);
    expect(getByText("Subject:")).toBeInTheDocument();
  });

  test("renders email body", () => {
    useSelector.mockReturnValueOnce("inbox"); // Mock stack
    useSelector.mockReturnValueOnce(1); // Mock emailId
    useSelector.mockReturnValueOnce([
      {
        id: 1,
        from: "hello@example.com",
        subject: "Test Subject",
        value: "Test Body",
      },
    ]); // Mock receivedEmails
    useSelector.mockReturnValueOnce([]); // Mock sentEmails

    const { getByText } = render(<ShowCurrentMail />);
    expect(getByText("Test Body")).toBeInTheDocument();
  });

  test("renders sent email body", () => {
    useSelector.mockReturnValueOnce("sent"); // Mock stack
    useSelector.mockReturnValueOnce(1); // Mock emailId
    useSelector.mockReturnValueOnce([]); // Mock receivedEmails
    useSelector.mockReturnValueOnce([
      {
        id: 1,
        to: "hello@example.com",
        subject: "Test Subject",
        value: "Test Body",
      },
    ]); // Mock sentEmails

    const { getByText } = render(<ShowCurrentMail />);
    expect(getByText("Test Body")).toBeInTheDocument();
  });

  test("renders default email subject if not found", () => {
    useSelector.mockReturnValueOnce("inbox"); // Mock stack
    useSelector.mockReturnValueOnce(2); // Mock emailId
    useSelector.mockReturnValueOnce([
      {
        id: 1,
        from: "hello@example.com",
        subject: "Test Subject",
        value: "Test Body",
      },
    ]); // Mock receivedEmails
    useSelector.mockReturnValueOnce([]); // Mock sentEmails

    const { getByText } = render(<ShowCurrentMail />);
    expect(getByText("Subject: hello")).toBeInTheDocument(); // Default subject "hello"
  });

  test("renders default email body if not found", () => {
    useSelector.mockReturnValueOnce("inbox"); // Mock stack
    useSelector.mockReturnValueOnce(2); // Mock emailId
    useSelector.mockReturnValueOnce([
      {
        id: 1,
        from: "hello@example.com",
        subject: "Test Subject",
        value: "Test Body",
      },
    ]); // Mock receivedEmails
    useSelector.mockReturnValueOnce([]); // Mock sentEmails

    const { getByText } = render(<ShowCurrentMail />);
    expect(getByText("hello")).toBeInTheDocument(); // Default body "hello"
  });
});
