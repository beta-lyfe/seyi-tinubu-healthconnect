import { Hono } from "hono";
import { ConsultationRouter } from "./consultation"

export const ServicesRouter = new Hono()
  .route("/consultation", ConsultationRouter)
