<template>
    <v-row v-resize="onResize" :width="windowSize.x" :height="windowSize.y" align="center" justify="center">
        <v-img width="100%" :height="windowSize.y" src="/application/public/images/main.png" style="filter: brightness(1.2)"></v-img>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            windowSize: {
                x: 0,
                y: 0,
            },
            cards: [
                { title: '6.23일 작품', src: 'images/main.png', flex: 'col-sm-12 col-md-7' },
                { title: '화관', src: 'images/flowers.png', flex: 'col-sm-12 col-md-5' },
                { title: '작품2', src: 'images/sketch_2.png', flex: 'col-sm-12 col-md-3' },
                { title: '작품1', src: 'images/sketch_1.png', flex: 'col-sm-12 col-md-5' },
                { title: '1주년', src: 'images/one_year.png', flex: 'col-sm-12 col-md-4' },
            ],
        }),
        mounted() {
            this.onResize()
        },
        methods: {
            onResize () {
                this.windowSize = { x: window.innerWidth, y: window.innerHeight }
            },
        }
    }
</script>
