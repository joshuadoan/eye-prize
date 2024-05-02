import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import "@testing-library/jest-dom";
import App, { CAT_FACT_URL, Fact } from "./App";

// Mock cat fact response
const CatFactFixture: Fact = {
  _id: "1234",
  text: "This is a fact",
  updatedAt: new Date().toString(),
}

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays a cat fact", async () => {
  // Mock the server to return a single cat fact.
  server.use(
    http.get(CAT_FACT_URL, () => {
      return HttpResponse.json([
        CatFactFixture,
      ]);
    })
  );
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
  // Mock the server to return an error
  server.use(
    http.get(CAT_FACT_URL, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<App />);

  await screen.findByText("There was an issue loading this page.");
});
