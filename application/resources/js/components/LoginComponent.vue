<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <v-img src="images/main.png" aspect-ratio="1.7"></v-img>
                <v-form v-model="valid">
                    <v-container>
                        <v-row class="text-center">
                            <div class="col-md-12 col-sm-12">
                                <a href="/login/kakao"><v-img src="images/kakao_login_large_wide.png" width="100%"></v-img></a>
                            </div>
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
        email: '',
        emailRules: [
            v => !!v || '이메일을 입력해 주세요.',
            v => /.+@.+/.test(v) || '이메일 형식이 아닙니다.',
        ],
        show: false,
        password: '',
        rules: {
            required: value => !!value || '비밀번호를 입력해 주세요.',
            min: v => v.length >= 8 || '최소 8글자입니다.',
            emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }),
    mounted() {
        console.log('Login Component mounted.')
    },

    methods: {

    },
}

</script>
