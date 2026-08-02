import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAShPFnVlvf0SMTNUCmb-C9t09S0ru11Co",
  authDomain: "rama-re.firebaseapp.com",
  projectId: "rama-re",
  storageBucket: "rama-re.firebasestorage.app",
  messagingSenderId: "726711550930",
  appId: "1:726711550930:web:f5f53c57ed3feac5b67e0b",
  measurementId: "G-7W73QXEHQ9"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize analytics only on the client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
