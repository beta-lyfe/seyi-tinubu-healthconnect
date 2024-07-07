import { Hono } from "hono";
import { ConsultationRouter } from "./consultation"
import { APIResponse, toJsonResponse } from "@/shared/utils/response";

export const ServicesRouter = new Hono()
  .get('/', c => toJsonResponse(c, APIResponse.ok('Welcome to Beta Lyfe API')))
  .route("/consultation", ConsultationRouter)
