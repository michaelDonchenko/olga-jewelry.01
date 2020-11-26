const admin = require('../firebase')
const User = require('../models/userModel')

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    // console.log('FIREBASE USER:', firebaseUser)
    req.user = firebaseUser
    next()
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send('Invalid or expired token, try re-log to get a new Token.')
  }
}

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user

  const adminUser = await User.findOne({ email }).exec()

  if (adminUser.role !== 'admin') {
    res.status(403).send('Admin resource. Access denied.')
  } else {
    next()
  }
}
