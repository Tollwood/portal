import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import ResetPassword from './ResetPassword';

test('visible html elements', () => {
    const {getByTestId, queryByTestId} = render(<ResetPassword/>);
    expect(getByTestId("reset-password-header")).toHaveTextContent("Passwort zurücksetzen");

    const passwordInput = getByTestId("password-input");
    expectHtmlInput(passwordInput, "password");

    var passwordCondirmInput = getByTestId("password-confirm-input");
    expectHtmlInput(passwordCondirmInput, "password");

    const temporaryPasswordInput = getByTestId("temporary-password-checkbox");
    expectHtmlInput(temporaryPasswordInput,"checkbox");
    expect(getByTestId("temporary-password-checkbox-label")).toHaveTextContent("Temporäres Passwort");

    var errorMessage = queryByTestId("password-confirm-input-error");
    expect(errorMessage).not.toBeInTheDocument();
});


test('should handle password input', () => {

    const {getByTestId} = render(<ResetPassword/>);
    var passwordInput = getByTestId("password-input");
    fireEvent.change(passwordInput, {target: {value: "test"}});
    if (expectHtmlInputElement(passwordInput)) {
        expect((passwordInput).value).toBe("test");
    }
});


test('should handle password-confirm input', () => {
    const value = "confirm";
    const {getByTestId} = render(<ResetPassword/>);
    var input = getByTestId("password-confirm-input");
    fireEvent.change(input, {target: {value: value}});
    if (expectHtmlInputElement(input)) {
        expect((input).value).toBe(value);
    }

});

test('should handle password-confirm input', () => {

    const {getByTestId} = render(<ResetPassword/>);
    var input = getByTestId("password-confirm-input");
    fireEvent.change(input, {target: {value: "confirm"}});
    if (expectHtmlInputElement(input)) {
        expect((input).value).toBe("confirm");
    }

});

test('should show error message on password-confirm-input if it does not match password-input', () => {

    const {getByTestId, queryByTestId} = render(<ResetPassword/>);
    const passwordInput = getByTestId("password-input");
    fireEvent.change(passwordInput, {target: {value: "1234"}});

    const confirmInput = getByTestId("password-confirm-input");
    fireEvent.change(confirmInput, {target: {value: "confirm"}});

    var errorMessage = queryByTestId("password-confirm-input-error");
    expect(errorMessage).not.toBeInTheDocument();

    fireEvent.blur(confirmInput);
    errorMessage = queryByTestId("password-confirm-input-error");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Keine Übereinstimmung");

});

function expectHtmlInput(el: HTMLElement, type: string) {
    expect(el).toBeInTheDocument();
    if (expectHtmlInputElement(el)) {
        expect(el.type).toBe(type);
    }
}

function expectHtmlInputElement(el: HTMLElement): el is HTMLInputElement {
    if (el instanceof HTMLInputElement) {
        return true
    } else {
        const testId = el.getAttribute('data-testid');
        fail(testId + " is not of type HTMLInputElement");
    }
    return false;
}