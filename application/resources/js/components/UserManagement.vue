<template>
    <v-container>
        <v-data-table :headers="headers" :items="users" :sort-by="sort_key" :sort-desc="true" class="elevation-1" :page.sync="page"
                      :items-per-page="per_page" @page-count="page = $event" :loading="isLoading" loading-text="데이터를 로딩중입니다..." hide-default-footer>
            <v-progress-linear v-show="isLoading" slot="progress" color="pink accent-3" indeterminate :absolute="true"></v-progress-linear>
            <template v-slot:top>
                <v-container style="background-color: #AD1457">
                    <v-row>
                        <v-col class="d-flex pt-7 pl-8" cols="12" sm="10" md="10">
                            <v-label><h2 class="font-weight-black" style="color: white">관리자</h2></v-label>
                        </v-col>
                        <v-col class="d-flex pl-5 pr-5" cols="12" sm="2" md="2">
                            <v-select v-model="per_page" :items="perPageOptions" @change="changePerPage" dark></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:item.role="{item}">
                <span class="d-inline-block">{{item.role === 'admin' ? '전체관리자' : item.role === 'operator' ? '운영자' : item.role === 'viewer' ? '뷰어' : 'guest'}}</span>
            </template>

            <template v-slot:item.created_at="{item}">
                <span class="d-inline-block">{{item.created_at | moment('YYYY-MM-DD')}}</span>
            </template>


            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="userInfoOpen(item)">create</v-icon>
                <v-icon small @click="deleteUser(item)">delete</v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="pink accent-2" @click="initialize" style="color: white">데이터가 없습니다.</v-btn>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
            <v-pagination color="pink accent-2" v-model="page" :length="last_page" @input="pageMove" circle></v-pagination>
        </div>

        <template>
            <v-row justify="center">
                <v-dialog v-model="userInfoDialog" max-width="400">
                    <v-card class="mx-auto" max-width="400">

                        <v-list dense>
                            <v-subheader>회원 정보</v-subheader>
                            <v-list-item-group :item="userInfo" color="pink darken-1">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>account_circle</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{userInfo.name}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>visibility</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-select v-model="userInfo.role" :items="roleOptions" @change="changeUserRole"></v-select>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>date_range</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{userInfo.created_at | moment('YYYY-MM-DD')}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="pink darken-1" text @click="open">수정</v-btn>
                            <v-btn color="pink darken-1" text @click="userInfoClose">닫기</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="350" :value="dialogBtnName">
                    <v-card>
                        <v-card-title class="headline">회원 정보를 {{dialogBtnName}} 하시겠습니까?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="pink darken-1" text @click="dialogBtnName === '수정' ? update() : destroy()">
                                {{dialogBtnName}}
                            </v-btn>
                            <v-btn color="pink darken-1" text @click="close">취소</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <template>
            <v-row justify="center">
                <v-dialog v-model="confirmDialog" persistent max-width="350" :value="message">
                    <v-card>
                        <v-card-title class="headline">{{message}}</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="pink darken-1" text @click="confirmDialog = false">확인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        valid: true,
        isLoading: false,
        dialogBtnName: '수정',

        headers: [
            { text: 'Id', align: 'start', sortable: true, value: 'id' },
            { text: '이름', value: 'name' },
            { text: '권한', value: 'role' },
            { text: '가입일', value: 'created_at' },
            { text: '명령', value: 'actions', sortable: false },
        ],
        users: [
            {id: 1, name: '로빈', role: 'admin', created_at: '2020-01-01 7:07:07' },
            {id: 2, name: '미유', role: 'admin', created_at: '2020-02-01 7:07:07' },
            {id: 3, name: '차드', role: 'admin', created_at: '2020-03-01 7:07:07' },
            {id: 4, name: '에반', role: 'admin', created_at: '2020-04-01 7:07:07' },
            {id: 5, name: '모니카', role: 'admin', created_at: '2020-05-01 7:07:07' }
        ],

        page: 1,
        per_page: 10,
        sort_key: 'created_at',
        last_page: 1,
        perPageOptions: [
            10, 50, 100, 1000,
        ],

        dialog: false,
        userInfoDialog: false,
        confirmDialog: false,

        message: '',

        user_id: null,
        userInfo: {
            'id': '',
            'name': '',
            'role': '',
            'created_at': '',
        },
        role: 'guest',
        roleOptions: [
            { text: '게스트', value: 'guest' },
            { text: '뷰어', value: 'viewer' },
            { text: '운영자', value: 'operator' },
            { text: '전체관리자', value: 'admin' },
        ],
    }),

    mounted() {
        this.initialize()
    },

    methods: {
        initialize() {
            // this.isLoading = true
            const params = {
                page: this.page,
                per_page: this.per_page,
                sort_key: this.sort_key,
            }
            // axios({
            //     method: 'GET', url: '/user/list', params,
            // }).then((response) => {
            //     this.users = response.data.data
            //     this.last_page = response.data.last_page
            //     this.isLoading = false
            // }).catch((ex) => {
            //     this.isLoading = false
            //     console.log('user list ERR!!!!! : ', ex)
            // })
        },

        open() {
            this.dialog = true
        },

        close() {
            this.dialog = false
            this.dialogBtnName = '수정'
        },

        userInfoOpen(user) {
            this.userInfoDialog = true
            this.userInfo = {
                'id': user.id,
                'name': user.name,
                'role': user.role,
                'created_at': user.created_at,
            }
        },
        userInfoClose() {
            this.userInfoDialog = false
            this.userInfo = {
                'id': '',
                'name': '',
                'role': '',
                'created_at': '',
            }
        },

        pageMove(page) {
            this.page = page
            this.initialize()
        },

        changePerPage(perPage) {
            this.per_page = perPage
            this.page = 1
            this.initialize()
        },

        changeUserRole(role) {
            this.userInfo.role = role
        },

        update() {
            const data = {
                role: this.userInfo.role,
            }
            // axios({
            //     method: 'PATCH', url: '/user/' + this.userInfo.id, data,
            // }).then((response) => {
            //     this.confirmDialog = true
            //     this.message = response.data.message
            //     this.initialize()
            // }).catch((ex) => {
            //     console.log('user update ERR!!!!! : ', ex)
            // })
            this.userInfoClose()
            this.close()
        },

        deleteUser(user) {
            this.dialogBtnName = '삭제'
            this.userInfo = {
                'id': user.id,
            }
            this.open()
        },

        destroy() {
            // axios({
            //     method: 'DELETE', url: '/user/' + this.userInfo.id,
            // }).then((response) => {
            //     this.confirmDialog = true
            //     this.message = response.data.message
            //     this.initialize()
            // }).catch((ex) => {
            //     console.log('user destroy ERR!!!!! : ', ex)
            // })
            this.close()
        },
    },
}
</script>

<style scoped>

</style>
