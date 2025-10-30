// src/types/index.ts
export interface User {
    uid: string;
    username: string;
    displayName: string;
    lolId: string;
    pro: boolean;
    balance: number;
    createdAt: number;
    photoURL: string | null;
    admin: boolean;
  }
  
  export interface Message {
    id: string;
    text: string;
    senderId: string;
    senderDisplay: string | null;
    senderHint: string | null;
    replyTo: string | null;
    timestamp: number;
    reactions: { [key: string]: number };
  }
  
  export interface Community {
    id: string;
    title: string;
    description: string;
    type: 'open' | 'private';
    membersCount: number;
    createdAt: number;
  }
  
  export interface Payment {
    userId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    provider: string;
    createdAt: number;
  }