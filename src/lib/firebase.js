import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, addDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import firebaseConfigData from '../../firebase-applet-config.json'

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Firestore
export const db = getFirestore(app, firebaseConfigData.firestoreDatabaseId || '(default)')

// Google Auth Sign In Helper
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error) {
    console.error('Google Sign-In Error:', error)
    return { user: null, error: error.message }
  }
}

// Logout Helper
export const logoutAdmin = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    console.error('Sign-Out Error:', error)
    return { success: false, error: error.message }
  }
}

// Auth State Listener
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Firestore Portfolio Settings Doc Path
const SETTINGS_DOC_REF = doc(db, 'settings', 'portfolio')

// Subscribe to Portfolio Settings (Realtime)
export const subscribeToPortfolioSettings = (onUpdate, onError) => {
  return onSnapshot(
    SETTINGS_DOC_REF,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data())
      } else {
        onUpdate(null)
      }
    },
    (err) => {
      console.warn('Firestore snapshot listener warning:', err)
      if (onError) onError(err)
    }
  )
}

// Save or Update Portfolio Settings in Firestore
export const savePortfolioSettings = async (settingsData) => {
  try {
    await setDoc(SETTINGS_DOC_REF, settingsData, { merge: true })
    return { success: true }
  } catch (err) {
    console.error('Error saving portfolio settings:', err)
    return { success: false, error: err.message }
  }
}

// Guestbook Realtime Helpers
const GUESTBOOK_COLL = collection(db, 'guestbook')

export const subscribeToGuestbook = (onUpdate) => {
  const q = query(GUESTBOOK_COLL, orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      onUpdate(messages)
    },
    (err) => {
      console.warn('Guestbook listener error:', err)
    }
  )
}

export const addGuestbookMessage = async (msgData) => {
  try {
    await addDoc(GUESTBOOK_COLL, {
      ...msgData,
      createdAt: serverTimestamp(),
      dateStr: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    })
    return { success: true }
  } catch (err) {
    console.error('Error adding guestbook message:', err)
    return { success: false, error: err.message }
  }
}

export const deleteGuestbookMessage = async (messageId) => {
  try {
    await deleteDoc(doc(db, 'guestbook', messageId))
    return { success: true }
  } catch (err) {
    console.error('Error deleting guestbook message:', err)
    return { success: false, error: err.message }
  }
}
