import { db } from '../utils/db.server' // Asegúrate de importar correctamente tu configuración de Firestore

export async function getUserByEmail(userId: string) {
  try {
    const userQuery = await db
      .collection('users')
      .where('email', '==', userId)
      .limit(1)
      .get()

    if (userQuery.empty) {
      console.log('No matching documents.')
      return null
    }

    // Since we are limiting the results to 1, we can directly get the first document
    const userDoc = userQuery.docs[0]
    const userData = userDoc.data()

    return userData
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}
