<template>
    <div class="s3-pop-viewer">
        <transition name="fade" mode="out-in" appear>
            <div class="s3-pop-viewer__modal">
                <div class="s3-pop-viewer__modal-header">
                    <div class="s3-pop-viewer__modal-header--label">
                        {{item.Key}}
                    </div>
                    <div class="s3-pop-viewer__modal-header--close">
                        <a href="javascript:void(0);" @click="close">x</a>
                    </div>
                </div>
                <div class="s3-pop-viewer__modal-body">
                    <img :src="image" alt="">
                </div>
                <div class="s3-pop-viewer__modal-footer">

                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 's3PopViewer',
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {
            image: ''
        }
    },
    mounted () {
        this.$s3.getObject(this.item.Key, this.loadItemProgress)
            .then(data => {
                if (this.checkPreview(this.item.Key)) {
                    let suffix = this.item.Key.substr(this.item.Key.lastIndexOf('.'), this.item.Key.length - 1);
                    this.image = `data:image/${suffix};base64,${data.Body.toString('base64')}`;
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        close () {
            this.$emit('close');
        },

        loadItemProgress (p) {

        },

        checkPreview (name) {
            let suffix = name.substr(name.lastIndexOf('.'), name.length - 1);

            return _.indexOf(['.png', '.jpg', '.gif'], suffix) > -1;
        }
    }
}
</script>

<style lang="scss">
.s3-pop-viewer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;

    &__modal {
        height: 500px;
        width: 700px;
        background-color: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2px;
        box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);

        &-header {
            height: 60px;
            display: flex;
            justify-content: space-between;
            line-height: 60px;
            padding: 0 20px;

            &--label {
                font-size: 24px;
                font-weight: bold;
            }
        }

        &-body {
            padding: 0 20px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
