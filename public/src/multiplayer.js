function generateRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
  
    for (let i = 0; i < 6; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return roomId;
  }
  import { getFirestore, collection, addDoc } from "firebase/firestore";

  const db = getFirestore();
  
  async function createRoom() {
    const roomId = generateRoomId();
  
    try {
      await addDoc(collection(db, "rooms"), {
        id: roomId,
        players: [],
        
      });
      console.log("Room created with ID: ", roomId);
      return roomId;
    } catch (e) {
      console.error("Error creating room: ", e);
      return null;
    }
  }
  import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

//   const db = getFirestore();
  
  async function joinRoom(roomId, player) {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("id", "==", roomId));
    const roomSnapshot = await getDocs(roomQuery);
  
    if (roomSnapshot.empty) {
      console.log("No room found with this ID.");
      return false;
    } else {
      const roomData = roomSnapshot.docs[0].data();
      if (roomData.players.length < 2) { 
        await updateDoc(doc(db, "rooms", roomSnapshot.docs[0].id), {
          players: [...roomData.players, player],
        });
        console.log("Joined room with ID: ", roomId);
        return true;
      } else {
        console.log("Room is full.");
        return false;
      }
    }
  }
  import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";

//   const db = getFirestore();
  
  function listenToRoomChanges(roomId, onRoomChanged) {
    const roomRef = collection(db, "rooms");
    const roomQuery = query(roomRef, where("id", "==", roomId));
  
    const unsubscribe = onSnapshot(roomQuery, (snapshot) => {
      if (!snapshot.empty) {
        const roomData = snapshot.docs[0].data();
        onRoomChanged(roomData); 
      }
    });
  
    return unsubscribe; 
  }
    