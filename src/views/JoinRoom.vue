<script>
import { ref as dbRef, onValue, get } from "firebase/database";
import InkButtonEnter from "@/views/buttons/InkButtonEnter.vue";
import { useDatabase } from "vuefire";
import { nextTick } from "vue";

export default {
  components: {
    InkButtonEnter,
  },
  mounted() {
    // const db = useDatabase();
    // const firebaseDB = dbRef(db, "/");

    // //pulls existing roomcodes from firebase
    // onValue(firebaseDB, (snapshot) => {
    //     const data = snapshot.val();
    //     const roomCodeData = Object.keys(data);
    //     this.roomCodes = roomCodeData;
    // });

    this.focusInput();
  },
  data() {
    return {
      playerName: "",
      roomCode: "",
      submit: false,
      roomCodes: "",
      started: false,
    };
  },
  methods: {
    submitPlayer() {
      const db = useDatabase();
      const startedFB = dbRef(db, this.roomCode + "/gameAttributes");

      // Check if the game has already started
      onValue(startedFB, (snapshot) => {
        const data = snapshot.val();
        const start = Object.values(data);
        this.started = start[0];
      });

      get(dbRef(db, this.roomCode)).then((snapshot) => {
        const data = snapshot.exists();

        //checks for valid roomCode
        if (this.roomCode == "") {
          alert("Input room code");
        } else if (!data) {
          alert("Invalid room code");
        } else if (this.started) {
          alert("Game already started");
        } else {
          this.$emit("enterRoomCode", this.roomCode);
        }
      }); //Checks if entered roomCode exists in database
    },
    focusInput() {
      nextTick(() => {
        // Without the try and catch: Error message is: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'focus')
        // Need a try and catch block b/c you can only access the ref after the component is mounted. So the first render this.$ref.storyInput is going to be null and raise a promise error.
        //This try and catch block doesn't change the overall logic of this method and only serves as a way to reduce any errors on console.
        //Reference: https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
        try {
          document.getElementById("codeInput").focus();
        } catch (ex) {
          // Print out the error message
          console.log("Error detected: " + ex);
        }
      });
    },
  },
};
</script>

<template>
  <div id="enterRoom">
    <br />
    <br />
    Room Code:
    <div class="prompt">{{ roomCode }}&nbsp;</div>
    <br />
    <br />
    <input id="codeInput" @keydown.enter="submitPlayer" v-model="roomCode" />
    <br />
    <br />
    <div class="enter-roomcode">
      <InkButtonEnter @click="submitPlayer" />
    </div>
  </div>
</template>

<style scoped>
.enter-roomcode {
  text-align: center;
  width: 18vh;
  margin: 0 auto;
}
</style>
