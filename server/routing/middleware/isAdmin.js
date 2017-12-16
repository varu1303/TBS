module.exports = (req, res, next) => {
  if(!req.isAdminFROMTOKEN) {
    res.status(401).json(responseObj(null, 'Only Admins can get all the Tickets', 401, null))
  } else {
    next();
  }
}