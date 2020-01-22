import App from "./App";
import * as React from "react";
import { render } from "@testing-library/react";

describe("<App />", () => {
    
    it("should display", () => {
        const { getByTestId } = render(<App name="world" />);
        expect(getByTestId("appComponent")).toBeTruthy();
    });
})