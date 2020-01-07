import firestore from '@react-native-firebase/firestore'
import { AsyncStorage } from 'react-native'

const db = firestore()
const batch = db.batch()

const getUser = async () => JSON.parse(await AsyncStorage.getItem('user'))

export { getUser, db, batch }
