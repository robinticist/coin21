<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>메인</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="auth" to="/user-info">
                    <v-list-item-action>
                        <v-icon>account_box</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>정보변경</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/pictures">
                    <v-list-item-action>
                        <v-icon>photo_library</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>그림들</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/memo">
                    <v-list-item-action>
                        <v-icon>memory</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>메모</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!--   app bar design    -->
        <v-app-bar v-if="this.$router.currentRoute.path === '/'" app color="transparent">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Coin21</v-toolbar-title>
            <v-spacer></v-spacer>
<!--            <a v-if="auth === false" href="/login" style="color: black">로그인</a>-->
<!--            <a v-else href="/logout" style="color: black">로그아웃</a>-->
        </v-app-bar>

        <v-app-bar v-else app color="white">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Coin21</v-toolbar-title>
            <v-spacer></v-spacer>
<!--            <a v-if="auth === false" href="/login" style="color: black">로그인</a>-->
<!--            <a v-else href="/logout" style="color: black">로그아웃</a>-->
        </v-app-bar>

        <v-main v-if="this.$router.currentRoute.path === '/'" style="padding: 0 0 33px">
            <router-view></router-view>
        </v-main>
        <v-main v-else>
            <router-view></router-view>
        </v-main>

        <v-footer color="black" app>
            <span class="white--text">&copy; 2020, Con21</span>
        </v-footer>
    </v-app>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'App',
        props: {
            source: String,
        },
        data: () => ({
            drawer: false,
            auth: false,
        }),

        mounted() {
            // this.getAuth()
        },

        methods: {
            // getAuth: function () {
            //     axios({
            //         method: 'POST',
            //         url: '/get-auth',
            //     }).then((response) => {
            //         this.auth = response.data.auth
            //     }).catch((ex) => {
            //         /* eslint-disable no-console */
            //         console.log('ERR!!!!! : ', ex)
            //     })
            // },
        },
    }
</script>
