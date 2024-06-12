export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/products",
    "/categories",
    "/account",
    "/home-page",
    "/orders",
    "/payments",
  ],
};
