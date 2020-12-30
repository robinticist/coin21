<template>
    <v-container fluid>
        <div class="row justify-content-center">
            <v-col
                v-for="card in cards"
                :key="card.title"
                :class="card.flex"
            >
                <v-card>
                    <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        width="100%"
                        style="filter: brightness(1.5)"
                    >
                        <v-card-title v-text="card.title"></v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </div>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        windowSize: {
            x: 0,
            y: 0,
        },
        cards: [
            { title: '6.23일 작품', src: '/application/public/images/flowers.png', flex: 'col-sm-12 col-md-6' },
            { title: '화관', src: '/application/public/images/flowers.png', flex: 'col-sm-12 col-md-6' },
            { title: '작품2', src: '/application/public/images/sketch_2.png', flex: 'col-sm-12 col-md-6' },
            { title: '작품1', src: '/application/public/images/sketch_1.png', flex: 'col-sm-12 col-md-6' },
            { title: '1주년', src: '/application/public/images/one_year.png', flex: 'col-sm-12 col-md-6' },
        ],

        cardInfo: {},
    }),
    mounted() {
        this.onResize()
    },
    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
    },
}
</script>
