import jwt from "jsonwebtoken"

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401).json({ success: false, message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded: `, decoded);
    req.user = decoded;
    console.log(`its working?`)
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
}

export { authenticateToken };
