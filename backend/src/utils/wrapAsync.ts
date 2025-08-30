import type { Request, Response, NextFunction } from "express";

export const wrapAsync = async (
  req: Request,
  res: Response,
  next: NextFunction,
  controller: (req: Request, res: Response) => Promise<Response>
) => {
  try {
    await controller(req, res);
  } catch (error) {
    next(error);
  }
};
