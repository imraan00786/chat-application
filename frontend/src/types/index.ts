  export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
  }
  
  export interface Message {
    id: string;
    groupId: string;
    senderId: string;
    content: string;
    type: 'text' | 'image';
    timestamp: string;
    readBy: string[];
  }
  
  export interface Group {
    id: string;
    name: string;
    ownerId: string;
    members: User[];
  }
