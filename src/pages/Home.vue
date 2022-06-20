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
          @click="send"
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
</template>

<script>
 export default {
  name: 'Home',

  data: () => ({
  }),
  methods:{}

};
</script>
<style lang="less" scoped>

</style>