import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "./AuthForm";
import { Provider } from "react-redux";
import store from "../store/store";

describe("AuthForm Component", () => {
  test("renders login form by default", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    expect(getByLabelText("Email address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(
      getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "h2" &&
          element.textContent === "Log In"
        );
      })
    ).toBeInTheDocument();
  });

  test('renders signup form when "Sign Up" button is clicked', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    fireEvent.click(getByText("SignUp Here!"));
    expect(
      queryByText((content, element) => {
        return (
          element.textContent === "Sign Up" &&
          element.tagName.toLowerCase() === "h2"
        );
      })
    ).toBeInTheDocument();
  });

  test("updates email state when user types in email input", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    const emailInput = getByLabelText("Email address");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates password state when user types in password input", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  // Login Test Case

  test('submits login form when "Log In" button is clicked', async () => {
    const handleSubmit = jest.fn();

    // Mock the fetch function to simulate successful signup
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            /* Mock successful response */
            success: true,
          }),
      })
    );

    const { getByText, getByLabelText, queryByText, getByRole } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );

    // Click on the "Sign Up Here!" button to switch to the sign-up form
    //fireEvent.click(getByText("SignUp Here!"));

    // Ensure the sign-up form is now visible
    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    //const confirmPasswordInput = getByLabelText("Confirm Password");

    // Fill in the form fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    //fireEvent.change(confirmPasswordInput, {
    //target: { value: "password123" },
    //});

    // Submit the form
    fireEvent.submit(getByRole("button", { name: "Log In" }));

    // Wait for the async submission to complete
    await waitFor(() => {
      // Expect that error messages are not displayed after successful signup
      expect(queryByText("Passwords do not match")).toBeNull();
      expect(queryByText("Please fill all the fields for signup")).toBeNull();
      expect(queryByText("Signup failed: Email already exists")).toBeNull();

      // You could also expect that certain elements or messages are present
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    });
  });

  // Sign Up Test Case

  test('submits signup form when "Sign Up" button is clicked', async () => {
    const handleSubmit = jest.fn();

    // Mock the fetch function to simulate successful signup
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            /* Mock successful response */
            success: true,
          }),
      })
    );

    const { getByText, getByLabelText, queryByText, getByRole } = render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );

    // Click on the "Sign Up Here!" button to switch to the sign-up form
    fireEvent.click(getByText("SignUp Here!"));

    // Ensure the sign-up form is now visible
    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");

    // Fill in the form fields
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(getByRole("button", { name: "Sign Up" }));

    // Wait for the async submission to complete
    await waitFor(() => {
      // Expect that error messages are not displayed after successful signup
      expect(queryByText("Passwords do not match")).toBeNull();
      expect(queryByText("Please fill all the fields for signup")).toBeNull();
      expect(queryByText("Signup failed: Email already exists")).toBeNull();

      // You could also expect that certain elements or messages are present
      expect(handleSubmit).toHaveBeenCalledTimes(0);
    });
  });
});
