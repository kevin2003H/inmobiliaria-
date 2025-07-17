import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // <-- Añade esto
// (Opcional) Solo si quieres usar Analytics
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZtH44QwtA2hcGiHbJCRznVm0DXiFBPXs",
  authDomain: "inmobiliaria-bc4f1.firebaseapp.com",
  projectId: "inmobiliaria-bc4f1",
storageBucket: "inmobiliaria-bc4f1.firebasestorage.app",
  messagingSenderId: "364563592237",
  appId: "1:364563592237:web:4cad33e4de7328f60c74a4",
  measurementId: "G-0GDP60GV2F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // <-- Exporta auth
// (Opcional) const analytics = getAnalytics(app);

// export const db = getFirestore(app);