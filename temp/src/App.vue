<template>
  <v-app>
    <v-navigation-drawer dark app>
      <v-card dark class="pa-2 py-3">
        <v-icon
        large
        color="darken-2"
      >
        mdi-account-group
      </v-icon>
        <span class="ma-3">Список користувачів</span>
      </v-card>
      
    </v-navigation-drawer>
    <v-app-bar
      class="d-flex fill"
      app
      color="primary"
      dark
      height="60"
    >
      <v-icon
        large
        color="darken-2"
      >
        mdi-wechat
      </v-icon>
      <div 
        class="d-flex justify-center ma-2"
       >Доброго вечора ми із України !</div>
    </v-app-bar>

    <v-main>
      <v-container 
        fluid
        class="fill-height"
      >
        <v-card
          class="d-flex flex-column justify-space-between pa-3"
          color="grey lighten-2"
          flat
          tile
          min-height="100%"
          width="100%"
        >
          <v-card
            class="pa-2"
            outlined
            tile
            width="100%"
            min-height="350"
          >
            <div ref="publicchat" style="overflow:auto; max-height: 350px; "></div>
          </v-card>
          <v-card
            class="pa-2 my-2"
            outlined
            tile
            width="100%"
            min-height="250"
          >
            Privite Chat window
          </v-card>
          <v-card
            class="pa-2 d-flex justify-space-between align-end text-center "
            outlined
            tile
            width="100%"
            min-height="100"
          >
           <v-col
            style="border:1px solid #ccc"
           >
            <!-- <v-text-field ref="msg"></v-text-field> -->
           <input ref="msg" type="text" style="border: 1px solid red; width: 100%; padding: 15px;"/>
           </v-col>
           <v-btn
              class="ma-2"
              color="primary"
              dark
            >
              Send
              <v-icon
                dark
                right
              >
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </v-card>
        </v-card>
        
      </v-container>
    </v-main>

    <v-footer 
      app
      dark
    >
      Chat
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    // Home,
  },

  data: () => ({
  }),

  created(){
    
  },
  mounted(){
    const CHAR_RETURN = 13;
    const socket = new WebSocket('ws://localhost:3000');
    const publicchat = this.$refs.publicchat;
    const msg = this.$refs.msg;
    msg.focus();

    const writeLine = (text) => {
      const line = document.createElement('div');
      line.innerHTML = `<p>${text}</p>`;
      publicchat.appendChild(line);
    };
    socket.addEventListener('open', () => {
      writeLine('connected');
    });
    socket.addEventListener('close', () => {
      writeLine('closed');
    });
    socket.addEventListener('message', ({ data }) => {
      writeLine(data);
    });
    msg.addEventListener('keydown', (event) => {
    if (event.keyCode === CHAR_RETURN) {
        const s = msg.value;
        msg.value = '';
        writeLine(s);
        const data = {
          ms: s,
          id: 1
        }

        const json = JSON.stringify(data)

        console.log(json)

        socket.send(json);
      }
    });


  }

};
</script>
