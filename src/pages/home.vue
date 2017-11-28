<template>
    <div class="home">
        <div class="home-header">
            <div class="home-header__upload">
                Upload File
                <input type="file" @change="onFileChange">
            </div>
        </div>
        <div class="home-body">
            <s3-item
                class="home-body__item"
                v-for="item in items"
                :key="item.Key"
                :item="item"
                @click="onItemClick"
            ></s3-item>
        </div>
        <s3-pop-viewer
            v-if="previewItem"
            :item="previewItem"
            @close="onClose"
        ></s3-pop-viewer>
    </div>
</template>

<script>
import axios from 'axios';
import S3Item from '../components/s3-item';
import S3PopViewer from '../components/s3-popviewer';

export default {
    data () {
        return {
            previewItem: null,
            items: []
        }
    },
    mounted () {
        const _this = this;
        axios.get('http://localhost:9092/config').then(function (res) {
            _this.$s3.config({
                accessKeyId: res.data.accessKeyId,
                secretAccessKey: res.data.secretAccessKey
            }, {
                Bucket: res.data.bucket,
                region: res.data.region
            });

            _this.loadS3Items();
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        loadS3Items () {
            this.$s3.listObjects().then(data => {
                this.items = data.Contents;
            }).catch(err => {
                console.log(err);
            });
        },

        onItemClick (item) {
            this.previewItem = item;
        },

        onClose () {
            this.previewItem = null;
        },

        onFileChange (e) {
            let target = e.target;
            let file = target.files[0];

            if (file) {
                this.$s3.upload(file, {
                    filename: file.name
                }).then(data => {
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    },
    components: {
        's3Item': S3Item,
        's3PopViewer': S3PopViewer
    }
}
</script>

<style lang="scss">
.home {
    height: 100%;
    width: 100%;
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;

    &-header {
        height: 160px;
        width: 100%;
        background-color: #212121;
        box-shadow: 0 0 8px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.24);
        z-index: 10;
        text-align: center;
        line-height: 160px;

        &__upload {
            display: inline-block;
            height: 100px;
            width: 140px;
            border: 2px dashed #f0f0f0;
            border-radius: 16px;
            color: #f0f0f0;
            line-height: 100px;
            text-align: center;
            position: relative;

            input {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                cursor: pointer;
            }
        }
    }

    &-body {
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: scroll;
        padding: 0 20px;
    }
}
</style>
