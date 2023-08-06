import * as React from "react";
import { render } from "@testing-library/react";

import "jest-canvas-mock";

import createBreadcrumbComponents from "../src";

interface TestBreadcrumb {
  label: string;
}

const { BreadcrumbsProvider, Breadcrumbs, Breadcrumb } =
  createBreadcrumbComponents<TestBreadcrumb>();

describe("Common render", () => {
  it("renders without crashing", () => {
    render(
      <BreadcrumbsProvider>
        <Breadcrumbs render={(breadcrumbs) => <>{breadcrumbs.join("")}</>} />
        <Breadcrumb label="First" />
      </BreadcrumbsProvider>,
    );
  });
});

describe("Correctly renders breadcrumbs", () => {
  it("renders breadcrumbs", () => {
    render(
      <BreadcrumbsProvider>
        <Breadcrumbs
          render={(breadcrumbs) => {
            return <>{breadcrumbs.map((b) => b.label).join(" > ")}</>;
          }}
        />
        <Breadcrumb label="First">
          <Breadcrumb label="Second">
            <Breadcrumb label="Third" />
          </Breadcrumb>
        </Breadcrumb>
      </BreadcrumbsProvider>,
    );

    expect(document.body.textContent).toBe("First > Second > Third");
  });
});
