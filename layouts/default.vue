<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="this.getInfo.name" />
      <v-spacer />
      <v-btn
        v-if="!loggedIn"
        icon
        @click="login"
      >
        Login
      </v-btn>
      <v-btn
        v-else
        icon
        @click="logout"
      >
        out
      </v-btn>
    </v-app-bar>
    <v-main>
      <div v-if="loading" class="preloader">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
      </div>
      <v-container v-else>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loggedIn: false,
      loading: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Profile',
          to: '/profile'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Games',
          to: '/games'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    ...mapGetters('info', ['getInfo'])
  },
  mounted () {
    this.setupFirebase()
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$store.commit('info/clearInfo')
      this.$router.push('/login')
    },
    login () {
      this.$router.push('/login')
    },
    setupFirebase () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid
          this.$store.dispatch('info/fetchInfo', uid)
          this.loading = false
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      })
    }
  }
}
</script>

<style>
.preloader {
  margin: auto;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
