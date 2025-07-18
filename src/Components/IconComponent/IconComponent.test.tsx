import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import IconComponent from "./IconComponent";

describe("IconComponent Component", () => {
  it("renders INTEGER icon with correct aria-label", () => {
    render(<IconComponent IconType="INTEGER" />);
    const icon = screen.getByRole("img", { name: "integer icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "integer icon");
  });

  it("renders TEXT icon with correct aria-label", () => {
    render(<IconComponent IconType="TEXT" />);
    const icon = screen.getByRole("img", { name: "text icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "text icon");
  });

  it("renders DATETIME icon with correct aria-label", () => {
    render(<IconComponent IconType="DATETIME" />);
    const icon = screen.getByRole("img", { name: "datetime icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "datetime icon");
  });

  it("renders pinDown icon with correct aria-label", () => {
    render(<IconComponent IconType="pinDown" />);
    const icon = screen.getByRole("img", { name: "pin down icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "pin down icon");
  });

  it("renders pinUp icon with correct aria-label", () => {
    render(<IconComponent IconType="pinUp" />);
    const icon = screen.getByRole("img", { name: "pin up icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "pin up icon");
  });

  it("renders none icon with correct aria-label", () => {
    render(<IconComponent IconType="none" />);
    const icon = screen.getByRole("img", { name: "none icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "none icon");
  });
  it("renders angleRight icon with correct aria-label", () => {
    render(<IconComponent IconType="angleRight" />);
    const icon = screen.getByRole("img", { name: "angle right icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "angle right icon");
  });

  it("renders angleDoubleRight icon with correct aria-label", () => {
    render(<IconComponent IconType="angleDoubleRight" />);
    const icon = screen.getByRole("img", { name: "angle double right icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "angle double right icon");
  });

  it("renders angleLeft icon with correct aria-label", () => {
    render(<IconComponent IconType="angleLeft" />);
    const icon = screen.getByRole("img", { name: "angle left icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "angle left icon");
  });

  it("renders angleDoubleLeft icon with correct aria-label", () => {
    render(<IconComponent IconType="angleDoubleLeft" />);
    const icon = screen.getByRole("img", { name: "angle double left icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "angle double left icon");
  });
  it("renders angleDoubleLeft icon with correct aria-label", () => {
    render(<IconComponent IconType="sortAlphaDown" />);
    const icon = screen.getByRole("img", { name: "sort alpha down icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "sort alpha down icon");
  });
  it("renders angleDoubleLeft icon with correct aria-label", () => {
    render(<IconComponent IconType="sortAlphaUp" />);
    const icon = screen.getByRole("img", { name: "sort alpha up icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "sort alpha up icon");
  });
  it("renders Primary Key icon with correct aria-label", () => {
    render(<IconComponent IconType="primaryKey" />);
    const icon = screen.getByRole("img", { name: "primaryKey icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "primaryKey icon");
    expect(icon).toHaveClass("text-yellow-500");
  });
  it("renders foreign Key icon with correct aria-label", () => {
    render(<IconComponent IconType="foreignKey" />);
    const icon = screen.getByRole("img", { name: "foreignKey icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-gray-700");
  });

  it("renders foreign Key icon with correct aria-label", () => {
    render(<IconComponent IconType="fileInput" />);
    const icon = screen.getByRole("img", { name: "input database file icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-blue-600");
  });
});
