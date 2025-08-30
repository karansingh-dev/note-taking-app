import express, { type NextFunction } from "express";
import type { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const router = express.Router();

type authType = "noauth" | "protected";

function get(
  route: string,
  auth: authType,
  controller: (
    req: Request,
    res: Response,

  ) => Promise<Response> 
) {
  if (auth == "noauth") {
    return router.get(
      route,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  } else {
    return router.get(
      route,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  }
}
function post(
  route: string,
  auth: authType,
  controller: (req: Request, res: Response) => Promise<Response>
) {
  if (auth == "noauth") {
    return router.post(
      route,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  } else {
    return router.post(
      route,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  }
}
function put(
  route: string,
  auth: authType,
  controller: (req: Request, res: Response) => Promise<Response>
) {
  if (auth == "noauth") {
    return router.put(
      route,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  } else {
    return router.put(
      route,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  }
}
function del(
  route: string,
  auth: authType,
  controller: (req: Request, res: Response) => Promise<Response>
) {
  if (auth == "noauth") {
    return router.delete(
      route,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  } else {
    return router.delete(
      route,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        wrapAsync(req, res, next, controller);
      }
    );
  }
}

const creatApi = () => ({
  get,
  post,
  put,
  delete: del,
});

export const api = creatApi();
