import "express";

declare global {
  namespace Express {
    /**
 Adding user object in the request for authentication purposes
 */
    interface Request {
      user: {
        userId: string;
        isRegistered: boolean;
        email: string;
      };
    }

    interface User {
      id: string;
      email: string;
      isRegistered: boolean;
      name?: string;
      googleId?: string | null;
      authProvider?: string;
      profilePicture?: string | null;
    }
  }
}
