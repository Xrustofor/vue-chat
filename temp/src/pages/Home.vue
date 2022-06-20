<template>
  <v-container>
    <v-card
        height="fool"
        width="256"
    >
        <v-navigation-drawer permanent>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Application
            </v-list-item-title>
            <v-list-item-subtitle>
                subtext
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
         items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
    }),
  }
</script>
<style lang="less" scoped>

</style>