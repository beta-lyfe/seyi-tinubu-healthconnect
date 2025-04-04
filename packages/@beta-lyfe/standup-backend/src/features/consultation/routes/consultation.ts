import { Hono } from "hono";

export default new Hono.route("/consultations", (c) => {
  return c.json({ message: "Consultation route" });
}