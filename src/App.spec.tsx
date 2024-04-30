import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import "@testing-library/jest-dom";

import App from "./App";
import { CAT_FACT_URL } from "./consts";
import { Fact } from "./types";

// Mock cat fact response
const CatFactFixture: Fact = {
  _id: "1234",
  text: "This is a fact",
  updatedAt: new Date().toString(),
}

// Mock the server to return a single cat fact.
const server = setupServer(
  http.get(CAT_FACT_URL, () => {
    return HttpResponse.json([
      CatFactFixture,
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays a cat fact", async () => {
  render(<App />);

  // Should show loading message until data is fetched
  let loadingText = screen.queryByText('Loading...')
  expect(loadingText).toBeVisible();

  // Should show a cat fact when data is fetched
  expect(await screen.findByText("This is a fact")).toBeVisible();

  // Should hide loading message when data is fetched
  loadingText = screen.queryByText('Loading...')
  expect(loadingText).toBeNull() // it doesn't exist
});

test("handles server error", async () => {
  server.use(
    http.get(CAT_FACT_URL, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<App />);

  // Should show loading message until data is fetched
  let loadingText = screen.queryByText('Loading...')

  // Should show an error message when fetch fails
  expect(loadingText).toBeVisible();

  await screen.findByText("There was an issue loading this page.");
});
