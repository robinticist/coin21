<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <v-img src="images/main.png" aspect-ratio="1.7"></v-img>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row class="text-center">
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    label="이름"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-md-2"/>
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="이메일"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-md-2"/>
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-btn color="amber darken-2" width="100%" dark v-on:click="update">정보변경</v-btn>
                            </div>
                            <div class="col-md-2"/>
                        </v-row>
                    </v-container>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        valid: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || '이름을 입력해 주세요.',
        ],
        email: '',
        emailRules: [
            v => !!v || '이메일을 입력해 주세요.',
            v => /.+@.+/.test(v) || '이메일 형식이 아닙니다.',
        ],
        user: {}
    }),
    mounted() {
        this.getUser()
    },
    methods: {
        getUser: function () {
            axios({
                method: 'POST',
                url: '/get-user',
            }).then((response) => {
                this.name = response.data.user.name !== null ? response.data.user.name : ''
                this.email = response.data.user.email !== null ? response.data.user.email : ''
                this.user = response.data.user
            }).catch((ex) => {
                /* eslint-disable no-console */
                console.log('ERR!!!!! : ', ex)
            })
        },
        update: function () {
            const data = {
                name: this.name,
                email: this.email,
            }
            axios({
                method: 'PATCH', url: '/user/' + this.user.id, data,
            }).then((response) => {
                alert(response.data.message)
                this.getUser()
            }).catch((ex) => {
                console.log('bookmark update ERR!!!!! : ', ex)
            })
        }
    }
}

</script>
