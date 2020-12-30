<template>
    <v-container>
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
                <v-expansion-panel-header>Mac OS에서 사용중인 포트 확인</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('lsof')">content_copy</v-icon>
                        </template>
                        <v-text-field id="lsof"
                               readonly
                               value="sudo lsof -i :80"/>
                    </v-alert>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('lsofgrep')">content_copy</v-icon>
                        </template>
                        <v-text-field id="lsofgrep"
                               readonly
                               value="sudo lsof -nP -i4TCP:80 | grep LISTEN"/>
                    </v-alert>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>개발할 때 있으면 좋은 것들!!!</v-expansion-panel-header>
                <v-expansion-panel-content>
                    iterm<br/>
                    Terminus<br/>
                    1password<br/>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>ubuntu에서 php version 변경</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('phpversion71')">content_copy</v-icon>
                        </template>
                        <v-textarea id="phpversion71"
                                    readonly
                                    value="update-alternatives --set php /usr/bin/php7.1
update-alternatives --set phar /usr/bin/phar7.1
update-alternatives --set phar.phar /usr/bin/phar.phar7.1
update-alternatives --set phpize /usr/bin/phpize7.1
update-alternatives --set php-config /usr/bin/php-config7.1">
                        </v-textarea>
                    </v-alert>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('phpversion73')">content_copy</v-icon>
                        </template>
                        <v-textarea id="phpversion73"
                                    readonly
                                    value="update-alternatives --set php /usr/bin/php7.3
update-alternatives --set phar /usr/bin/phar7.3
update-alternatives --set phar.phar /usr/bin/phar.phar7.3
update-alternatives --set phpize /usr/bin/phpize7.3
update-alternatives --set php-config /usr/bin/php-config7.3">
                        </v-textarea>
                    </v-alert>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>METERIAL DESIGN ICONS</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-alert color="yellow" icon="open_in_new">
                        <a href="https://material.io/resources/icons/?icon=memory&style=baseline" target="_blank">
                            https://material.io/resources/icons/?icon=memory&style=baseline
                        </a>
                    </v-alert>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>ubuntu에서 포트 열기/닫기</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('iptables80open')">content_copy</v-icon>
                        </template>
                        <v-text-field id="iptables80open"
                               readonly
                               value="iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT"/>
                    </v-alert>
                    <v-alert color="blue lighten-4">
                        <template slot="append">
                            <v-icon @click="copy('iptables80close')">content_copy</v-icon>
                        </template>
                        <v-text-field id="iptables80close"
                               readonly
                               value="iptables -I OUTPUT 1 -p tcp --dport 80 -j ACCEPT"/>
                    </v-alert>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
        >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false" absolute centered>Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    name: 'MemoComponent',
    data() {
        return {
            windowSize: {
                x: 0,
                y: 0,
            },
            panel: [],
            snackbar: false,
            text: 'copy!!',
            timeout: 2000,
        }
    },

    mounted() {
        this.onResize()
    },
    methods: {
        // Create an array the length of our items
        // with all values as true
        all() {
            this.panel = [...Array(this.items).keys()].map((k, i) => i)
        },
        // Reset the panel
        none() {
            this.panel = []
        },
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },

        copy(id) {
            let copyText = document.getElementById(id)
            copyText.select()
            copyText.setSelectionRange(0, 99999) /* For mobile devices */
            document.execCommand('copy')
            this.snackbar = true
        },
    },
}
</script>

<style scoped>

</style>
