import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });
}


export const verifyToken2 = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.student = student;
        next();
    });
}




// export const authenticateUser = (req, res, next) => {
//   // Get the token from request headers, cookies, or wherever it's sent
//   const token = req.headers.authorization; // Example: "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   // Verify the token
//   jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token is not valid' });
//     } else {
//       // If token is valid, set user information in request object for future use in other middleware or routes
//       req.user = decoded;
//       next();
//     }
//   });
// };

  