/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const admin = require('firebase-admin')

exports.getProducts = async function (req, res) {
  let result = []
  try {
    if (admin.apps.length < 1) {
      admin.initializeApp()
    }

    const db = admin.firestore()
    const products = db.collection('products')
    const qsnapshot = await products.orderBy('name').get()
    if (!qsnapshot.empty) {
      result = qsnapshot.docs.map(doc => doc.data())
    }
  } catch (err) {
    result = err
  }
  
  res.status(200).send(result)
}
