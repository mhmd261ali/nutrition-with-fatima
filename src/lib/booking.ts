import { dietitian } from "@/data/site-content";

export function getBookingHref() {
  return dietitian.bookingUrl.trim() || "#contact";
}

export function isExternalBooking() {
  return dietitian.bookingUrl.trim().length > 0;
}
