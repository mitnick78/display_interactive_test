import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomersPage from "./CustomersPage";
import * as api from "@/api/";

vi.spyOn(api, "fetchCustomers").mockResolvedValue([
  {
    id: 1,
    customer_number: "C001",
    title: "m",
    firstname: "John",
    lastname: "Doe",
    postcode: "75000",
    city: "Paris",
    email: "john@test.com",
  },
]);

function renderComponent() {
  return render(
    <MemoryRouter>
      <CustomersPage />
    </MemoryRouter>
  );
}

describe("CustomersPage", () => {
  it("affiche le titre de la page", async () => {
    renderComponent();

    expect(await screen.findByText(/Liste des clients/i)).toBeInTheDocument();
  });

  it("affiche un client après chargement", async () => {
    renderComponent();

    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });
});