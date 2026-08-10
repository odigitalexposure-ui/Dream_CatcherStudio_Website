import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import Navbar from "../components/Navbar/Navbar";

test("Navbar renders the correct links in order: Home, Gallery, About, Services, Contact", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const desktopNav = screen.getByRole("navigation");
  const linkElements = desktopNav.querySelectorAll("ul > li > a");
  const linkTexts = Array.from(linkElements).map((el) => el.textContent.trim());

  expect(linkTexts).toEqual(["Home", "Gallery", "About", "Services", "Contact"]);
});
