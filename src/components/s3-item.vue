<template>
    <div class="s3-item" @click="onClick">
        <div class="s3-item__content">
            {{item.Key}}
        </div>
        <div class="s3-item__footer">
            LastModified: {{time(item.LastModified)}}
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 's3Item',
    props: {
        item: Object,
        default: {}
    },
    data () {
        return {

        }
    },
    mounted () {
    },
    methods: {
        time (date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },

        onClick () {
            this.$emit('click', this.item);
        }
    }
}
</script>

<style lang="scss">
.s3-item {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin: 10px 0;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);
    transition: box-shadow 300ms;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.12), 0px 8px 8px 0px rgba(0,0,0,0.24);
    }

    &__content {
        flex-grow: 1;
    }
    &__footer {
        height: 44px;
        text-align: center;
        color: #333333;
        font-size: 12px;
        line-height: 44px;
        border-top: 1px solid #eee;
        margin: 0 30px;
    }
}
</style>
