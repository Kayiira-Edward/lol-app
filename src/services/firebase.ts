// src/services/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  setDoc 
} from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// Firestore data functions
export async function getTrendingCommunities() {
  try {
    const communitiesRef = collection(db, 'communities');
    const q = query(communitiesRef, orderBy('membersCount', 'desc'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting trending communities:', error);
    return [];
  }
}

export async function getAllCommunities() {
  try {
    const communitiesRef = collection(db, 'communities');
    const snapshot = await getDocs(communitiesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting all communities:', error);
    return [];
  }
}

export async function searchCommunities(searchTerm: string) {
  try {
    const communitiesRef = collection(db, 'communities');
    const snapshot = await getDocs(communitiesRef);
    const allCommunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return allCommunities.filter(community => 
      community.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching communities:', error);
    return [];
  }
}

export async function joinCommunity(communityId: string, userId: string) {
  try {
    const communityRef = doc(db, 'communities', communityId);
    const communitySnap = await getDoc(communityRef);
    
    if (communitySnap.exists()) {
      const community = communitySnap.data();
      await updateDoc(communityRef, {
        membersCount: (community.membersCount || 0) + 1
      });
      
      // Add user to community members subcollection
      const membersRef = collection(db, 'communities', communityId, 'members');
      await addDoc(membersRef, {
        userId,
        joinedAt: Date.now()
      });
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error joining community:', error);
    return false;
  }
}

export async function createCommunity(communityData: any) {
  try {
    const communitiesRef = collection(db, 'communities');
    const docRef = await addDoc(communitiesRef, {
      ...communityData,
      createdAt: Date.now(),
      membersCount: 1,
      type: 'open'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
}

export async function getUserChats(userId: string) {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user chats:', error);
    return [];
  }
}

export async function createUserProfile(userId: string, userData: any) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: Date.now(),
      pro: false,
      balance: 0,
      lolId: generateLolId()
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// Helper function to generate LOL ID
function generateLolId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default app;