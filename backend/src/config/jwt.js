const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"

module.exports = { SECRET_KEY, EXPIRES_IN }
