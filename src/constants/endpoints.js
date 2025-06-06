import { env } from "./config";

export const baseURL = env[1];

export const endpoints = {
  login: "auth/login",
  admin: "admin",
  agent: "agent",
  agentBankAccount: "agent-bank-account",
  package: "package",
  user: "user",
  promotion: "promotion",
  memberOrder: "member-order",
  memberDiscount: "member-discount",
  memberCard: "member-card",
  member: "member",
  category: "category",
  generalStatus: "general",
  paymentType: "payment_type",
  bankType: "bank-type",
  item: "item",
  image: `${baseURL}/storage/images`,
  status: "status",
  point: "point",
  delivery: "delivery-address",
  order: "order",
  faq: "faq",
  location: "location",
  country: "location/country",
  city: "location/city",
  township: "location/township",
  regionAndState: "location/region-and-state",
  region: "location/region-and-state",
  shop: "shop",
  count: "count",
  role: "role",
  permission: "permission",
  exportItem: "export-item",
  importItem: "import-item",
  importCategory: "import-category",
  exportCategory: "export-category",
  exportOrder: "export-order",
  exportShop: "export-shop",
  exportUser: "export-user",
  merchantBankAccount: "merchant-bank-account",
  partner: "partner",
  deposit: "deposit",
  transaction: "transaction",
  repayment: "repayment",
  emailContent: "email-content",
  bonusPoint: "bonus-point",
  promotion: "banner",
  usdt: "wallet/usdt",
  balance: "/balance",
  billing: "/billing_history",
  invoice: "/invoices",
};
