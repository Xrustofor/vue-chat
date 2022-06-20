<template>
<section class="center">
  <v-container 
    fluid
    class="fill-height d-flex d-flex justify-center"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="min-width: 400px"
    >
      <h2>Авторизація</h2>
      <v-text-field
        v-model="login"
        :counter="15"
        :rules="loginRules"
        label="Логін"
        required
      ></v-text-field>
       <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        :counter="10"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        required
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <div>
        <router-link to="/registration">Зареєструватись</router-link>
      </div>
        <v-btn
          color="success mt-3"
          class="mr-4"
          :disabled="!valid"
          @click="send"
        >
          Зареєструватись
        </v-btn>
    </v-form>
  </v-container>
</section>
  
</template>
<script>
  import { mapActions } from "vuex"

  export default {
    data: () => ({
      showPassword: false,
      valid: true,
      login: 'Xrustofor',
      password: 'ouzD6984',
      loginRules: [
        v => !!v || 'Логін обовязковий',
        v => (v && v.length <= 10) || 'Ім’я має містити менше 10 символів',
        v => (v && v.length >= 3) || 'Ім’я має містити не менше 3 символів',
      ],
      passwordRules:[
        v => !!v || 'Пароль обов’язковий',
        v => (v && v.length >= 8) || 'Пароль має містити не менше 8 символів',
      ],
      select: null,
      checkbox: false,
    }),

    methods: {
      ...mapActions('auth', ["auth"]),
      validate () {
        this.$refs.form.validate()
      },
      async send () {
        if(this.valid){
         const result = await this.auth({login: this.login, password: this.password});
         if(result){
          this.$router.push('/chat');
         }
        }
       
        // this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
<style lang="scss" scoped>
  section.center{
    min-height: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>