<template>
<v-container>
    <v-card
      class="d-flex flex-column justify-space-between pa-3"
      color="grey lighten-2"
      flat
      tile
      min-height="100%"
      width="100%"
    >
        <div class="d-flex my-2 justify-space-between align-end align-center" style="height: 35px">
            <strong class="mb-2">Публічний чат</strong>
            <span v-if="respondent" class="d-flex align-center">
                {{ respondent  }}
                <v-btn
                    icon
                    color="error"
                    @click="selectUserId = {}"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </span>
        </div>
      <v-card
        class="pa-2 publicchat"
        outlined
        tile
        width="100%"
        height="250"
      >
        <div ref="publicchat" style="overflow:auto; height: 100%; ">
            <ul v-if="publicMessages.length !== 0 ">
                <li v-for="(message, key) in publicMessages" :key="`${key}-${message.socket_id}`">
                    <strong
                        @click="selectUserId = message.id"
                    >
                        {{message.login}}
                    </strong>
                    <strong 
                        v-if="message.respondent"
                        @click="selectUserId = respondent.id"
                    > &rArr; {{message.respondent.login}} :</strong>
                    {{message.text}}
                </li>
            </ul>
            <div style="height: 100px"/>
        </div>
      </v-card>
      <div class="d-flex my-2 justify-space-between align-end align-center" style="height: 35px">
        <strong class="d-flex">Приватний чат</strong>
        <span v-if="privateUser.login" class="d-flex align-center">
            {{ privateUser.login }}
            <v-btn
                icon
                color="error"
                @click="deletetPrivateUser"
                small
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </span>
      </div>
      
      <v-card
        class="pa-2 my-2 private"
        outlined
        tile
        width="100%"
        height="250"
      >
        <div ref="private" style="overflow:auto; height: 100%; ">
            <ul v-if="privateMessages.length !== 0 ">
                <li v-for="(message, key) in privateMessages" :key="`${key}-${message.socket_id}`">
                    <strong
                        @click="setPrivateUser(message)"
                    >
                        {{message.login}}
                    </strong>
                    <strong 
                        v-if="message.respondent"
                        @click="setPrivateUser(message)"
                    > &rArr; {{message.respondent.login}} :</strong>
                    <span class="message">{{message.text}} </span>
                    
                </li>
            </ul>
            <div style="height: 100px"/>
        </div>
      </v-card>
      <v-card
        class="pa-2 d-flex justify-space-between align-end text-center "
        outlined
        tile
        width="100%"
        min-height="100"
      >
      <v-col>
        
       <v-text-field
        :class="privateUser.login ? 'input-text-field' : ''"
        v-model="text"
        label="Введіть повідомлення"
        autofocus
        @keydown="textInput"
      ></v-text-field>
      </v-col>
      <v-btn
          class="my-8 ml-2"
          color="primary"
          dark
          @click="addMessage"
        >
          Відправити
        </v-btn>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>

import io from "socket.io-client";
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
    name: "Chat",
    data(){
        return {
            currentUser: "",
            text: "",
            messages: [],
            selectUserId: {},
            message: {},
            user: {},
            users:[],
            publicMessages: [],
            privateMessages:[]
        }
    },
    watch:{
        users(items){
            this.setUsers(items)
        },
    },
    computed:{
        ...mapGetters({
            privateUser: 'getPrivateUser',
            getUsers: 'getUsers'
        }),
        respondent(){
            let name = '';
            if(this.users.lengh !== 0 && this.selectUserId){
                const candidate = this.users.find(user => user.id === this.selectUserId);
                name = candidate ? candidate.login : ''
            }
            return name;
        }
    },
    async mounted(){
        
        const { id, login } = await this.getUser();
        const user = { id, login }
        this.user = user;
        

        this.socketInstance = await io(process.env.VUE_APP_SOCKET_URL);

        await this.socketInstance.emit('infoUser', this.user);

        await this.socketInstance.on('users', data => {
            this.users = data
        })
        await this.socketInstance.on('enter', data => {
            this.user.socket_id = data.socket_id
             this.publicMessages = [{
                ...this.user,
                text: 'підєднався до чату'
            }];
            this.publicMessages = this.publicMessages.concat(data);
        })
      

        await this.socketInstance.on('message', data => {
            this.publicMessages = this.publicMessages.concat(data);
            const publicchatNote = this.$refs.publicchat;
            if(publicchatNote.scrollHeight){
                publicchatNote.scrollTop = publicchatNote.scrollHeight;
            }
            
        })
        await this.socketInstance.on('privateMessage', data => {
            console.log('privateMessageON:', data)
            this.privateMessages = this.privateMessages.concat(data);
        })

    },

    methods:{
        ...mapActions('chat', ['getUser']),
        ...mapMutations(['setUsers', 'setPrivateUser', 'deletetPrivateUser']),
        textInput(val){
            if(this.privateUser.login && val != ''){
                const strArr = this.text.match(/[\-\.]/g);
                if(strArr){
                    this.text = strArr.join(' ');
                }else{ this.text = '' }
            }
        },
        async addMessage(){
            const message = {
                ...this.user,
                text: this.text,
            }
            
            if(this.privateUser.login){
                const myId = this.user.id;
                const myUser = this.getUsers.find(user => user.id === myId)

                let privateMessage = {
                    ...myUser,
                    respondent: this.privateUser,
                    text: this.text
                }
                this.socketInstance.emit("privateMessage", privateMessage);
                this.privateMessages = this.privateMessages.concat(privateMessage);
                this.text = '';
                return;
            }
            
            if(this.selectUserId && this.users.lengh !== 0){
                const candidate = this.users.find(user => user.id === this.selectUserId);
               message.respondent =  candidate;
            }
            this.publicMessages = this.publicMessages.concat(message);
            await this.socketInstance.emit('message', { ...message });

            const publicchatNote = this.$refs.publicchat;
            if(publicchatNote.scrollHeight){
                publicchatNote.scrollTop = publicchatNote.scrollHeight;
            }

            this.text = '';
        }
    }
}
</script>
<style scoped>
    .input-text-field{
        font-size: 30px;
    }
    ul {
        list-style: none;
    }
     ul li strong {
        cursor: pointer;
    }
     ul li strong:hover{
        opacity: .7;
        transition: linear .3s;
    }
    .private ul li .message {
        font-size: 35px;
    }
</style>
