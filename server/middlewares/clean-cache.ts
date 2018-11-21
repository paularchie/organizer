const { clearHash } = require('../services/cache');

export async function cleanCache(key, useUserId, req, res, next) {
  const id = useUserId ? req.user.id : null;
  
  clearHash(key, id);
  await next();
}
