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
                                <v-text-field
                                    v-model="password"
                                    :append-icon="passShow ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="passShow ? 'text' : 'password'"
                                    name="password"
                                    label="비밀번호"
                                    hint="8글자 이상입니다."
                                    @click:append="passShow = !passShow"
                                ></v-text-field>
                            </div>
                            <div class="col-md-2"/>
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-text-field
                                    v-model="password"
                                    :append-icon="passConfirmShow ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="passConfirmShow ? 'text' : 'password'"
                                    name="password_confirmation"
                                    label="비밀번호 확인"
                                    hint="8글자 이상입니다."
                                    @click:append="passConfirmShow = !passConfirmShow"
                                ></v-text-field>
                            </div>
                            <div class="col-md-2"/>
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-text-field
                                    v-model="phone"
                                    :rules="phoneRules"
                                    label="휴대폰번호"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-md-2"/>
                            <div class="col-md-2"/>
                            <div class="col-md-8 col-sm-12">
                                <v-btn color="pink darken-1" width="100%" dark>회원가입</v-btn>
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
export default {
    data: () => ({
        valid: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        phone: '',
        phoneRules: [
            v => !!v || 'Phone is required',
            v => (v && v.length <= 10) || 'phone must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || '이메일을 입력해 주세요.',
            v => /.+@.+/.test(v) || '이메일 형식이 아닙니다.',
        ],
        passShow: false,
        passConfirmShow: false,
        password: '',
        passwordConfirmation: '',
        rules: {
            required: value => !!value || '비밀번호를 입력해 주세요.',
            min: v => v.length >= 8 || '최소 8글자입니다.',
            emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }),
    mounted() {
        console.log('register Component mounted.')
    },
}

</script>
