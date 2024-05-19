import { Request } from "express";

export interface AuthenticatedRequest<
  Params = {}, 
  ResBody = {}, 
  ReqBody = {}, 
  ReqQuery = {}
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  userId?: string;
}