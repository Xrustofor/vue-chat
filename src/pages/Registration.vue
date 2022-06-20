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
      <h2>Реэстрація користувача.</h2>
      <v-text-field
        v-model="login"
        :counter="10"
        :rules="loginRules"
        label="Логін"
        required
      ></v-text-field>
      <v-text-field
        v-model="password" 
        :rules="passwordRules"
        type="password"
        label="Пароль"
        required
      />
       <v-text-field 
        v-model="confirm"
        :rules="confirmRules"
        label="Підтвердження пароля"
        type="password"
        required
      />
        <v-btn
          color="success mt-3"
          class="mr-4"
          :disabled="!isValid"
          @click="send"
        >
          Зареєструватись
        </v-btn>
    </v-form>
  </v-container>
</section>
  
</template>
<script>

 import { mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    data: () => ({
      valid: true,
      login: 'Xrustofor',
      password: 'ouzD6984',
      confirm: 'ouzD6984',
      loginRules: [
        v => !!v || 'Логін обовязковий',
        v => (v && v.length <= 10) || 'Ім’я має містити менше 10 символів',
        v => (v && v.length >= 3) || 'Ім’я має містити не менше 3 символів',
      ],
      passwordRules:[
        v => !!v || 'Пароль обов’язковий',
        v => (v && v.length >= 8) || 'Пароль має містити не менше 8 символів',
      ],
      confirmRules:[
        v => !!v || 'Підтвердження пароля обов’язкове',
        v => (v && v.length >= 8) || 'Пароль має містити не менше 8 символів',
      ],
      select: null,
      checkbox: false,
    }),
    computed:{
      isValid(){
       return this.valid && this.password === this.confirm
      }
    },
    methods: {
      ...mapActions('registration', ['sendRegistration']),
      async send () {
        const data = {
          login: this.login,
          password: this.password,
          confirm: this.confirm,
        }
        if(this.isValid){
          const access = await this.sendRegistration(data);
          if(access){
            this.$router.push('/chat');
          }
        }
        
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