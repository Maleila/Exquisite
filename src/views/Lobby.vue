<script>
export default {
    data() {
    },
    methods: { 
    },
    props: {
        playerName: {
        type: String,
        required: true,
        },
        roomCodeJoin: {
        type: String,
        required: true,
        },
    }
}
</script>

<template>
    <div>
        Lobby for game {{ roomCodeJoin }}
        <br>
        players: {{ playerName }}
    </div>

</template>

<style>
</style>