<template>
    <div>
        <Form ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="80" label-position="left">
            <Row>
                <Col span="12">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formInline.title" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="选择分类" prop="cid">
                        <Cascader :data="casdata" @on-change="handleChange" change-on-select @on-clear="handleChange" v-model="formInline.cid">
                        </Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发布者" prop="create_name">
                        <Input v-model="formInline.create_name" placeholder="请输入" />
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="图片" prop="cover">
                        <Upload
                            multiple
                            type="drag"
                            action
                            :before-upload="handleBeforeUpload"
                            v-model="formInline.cover"
                            >
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" v-if="formInline.cover==''"></Icon>
                                <img :src="formInline.cover" alt="" v-else style="height:52px"/>
                                <p>拖动或点击上传</p>
                            </div>
                        </Upload>
                    </FormItem>
                </Col>
            </Row>
                <FormItem label="视频" prop="vedio_url">
                    <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
                    <div id="container">
                        <a id="selectfiles" href="javascript:void(0);" class="btn">选择文件</a>
                        <a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
                    </div>
                    <!-- <input type="file" @change="handleUpload"/> -->
                </FormItem>
            <Row>
                <Col span="24">
                    <FormItem label="详情" prop="content">
                        <editor ref="editor" v-model="formInline.content" :value="formInline.content"/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="是否推荐" prop="is_top">
                <i-Switch v-model="formInline.is_top" :true-value="'1'" :false-value="'0'" @on-change="change" />
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Editor from "_c/editor";
import { Upload } from "../../api"
import plupload from "plupload";

import oss from '@/libs/oss.js'
// import oss from '_c/oss/oss.vue'

export default {
    name: 'CreateForm',
    components: {
        Editor,
        
    },
    props: {
        formInline: Object,
        ruleInline: Object,
        casdata: Array
    },
    data() {
        return {
            category:'',
            caslist:[],
            form: {
            title: '',
            sub_title: '',
            category_id: '',
            description: '',
            status: true
            }

        }
    },
    methods: {
        initPlUploader() {
            var url=''
            var _this=this
            var accessid = "";
            var accesskey = "";
            var host = "";
            var policyBase64 = "";
            var signature = "";
            var callbackbody = "";
            var filename = "";
            var key = "";
            var expire = 0;
            var g_object_name = "";
            var g_object_name_type = "";
            var timestamp = "";
            var now = timestamp = Date.parse(new Date()) / 1000;

            function send_request() {
                var xmlhttp = null;
                if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                if (xmlhttp != null) {
                // serverUrl 是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
                // serverUrl = 'http://88.88.88.88:8888/aliyun-oss-appserver-php/php/get.php'
                var serverUrl = "http://pts.suoqoo.com/Public/OssUploads/php/get.php";
                xmlhttp.open("GET", serverUrl, false);
                xmlhttp.send(null);
                return xmlhttp.responseText;
                } else {
                alert("Your browser does not support XMLHTTP.");
                }
            }

            // 监听选择
            function check_object_radio() {
                var tt = document.getElementsByName("myradio");
                for (var i = 0; i < tt.length; i++) {
                if (tt[i].checked) {
                    g_object_name_type = tt[i].value;
                    break;
                }
                }
            }

            // 获取签名
            function get_signature() {
                // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
                now = timestamp = Date.parse(new Date()) / 1000;
                if (expire < now + 3) {
                var body = send_request();
                var obj = eval("(" + body + ")");
                host = obj["host"];
                policyBase64 = obj["policy"];
                accessid = obj["accessid"];
                signature = obj["signature"];
                expire = parseInt(obj["expire"]);
                callbackbody = obj["callback"];
                key = obj["dir"];
                return true;
                }
                return false;
            }

            function random_string(len) {
                len = len || 32;
                var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
                var maxPos = chars.length;
                var pwd = "";
                for (i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            function get_suffix(filename) {
                let pos = filename.lastIndexOf(".");
                let  suffix = "";
                if (pos != -1) {
                suffix = filename.substring(pos);
                }
                return suffix;
            }

            function calculate_object_name(filename) {
                if (g_object_name_type == "local_name") {
                g_object_name += "${filename}"
                } else if (g_object_name_type == "random_name") {
                suffix = get_suffix(filename);
                g_object_name = key + random_string(10) + suffix;
                }
                return "";
            }

            function get_uploaded_object_name(filename) {
                if (g_object_name_type == "local_name") {
                tmp_name = g_object_name;
                tmp_name = tmp_name.replace("${filename}", filename);
                return tmp_name;
                } else if (g_object_name_type == "random_name") {
                return g_object_name;
                }
            }

            function set_upload_param(up, filename, ret) {
                if (ret == false) {
                ret = get_signature();
                }
                g_object_name = key;
                if (filename != "") {
                let suffix = get_suffix(filename);
                calculate_object_name(filename);
                }
                g_object_name += "${filename}"
                var new_multipart_params = {
                key: g_object_name,
                policy: policyBase64,
                OSSAccessKeyId: accessid,
                success_action_status: "200", //让服务端返回200,不然，默认会返回204
                callback: callbackbody,
                signature: signature
                };

                up.setOption({
                url: host,
                multipart_params: new_multipart_params
                });

                up.start();
            }

            function geturl(url){
                console.log(_this.formInline.vedio_url)
                debugger;
                if(_this.formInline.vedio_url==undefined){
                    url=url
                    _this.formInline.vedio_url=[url]
                }else{
                    _this.formInline.vedio_url.push(url)
                }
            }

            var uploader = new plupload.Uploader({
                runtimes: "html5,flash,silverlight,html4",
                browse_button: "selectfiles",
                //multi_selection: false,
                container: document.getElementById("container"),
                url: "http://oss.aliyuncs.com",
                multi_selection: false,
                filters: {
                mime_types: [
                    // 只允许上传图片和zip文件
                    // {title:"Image files",extensions:"jpg,gif,png,bmp" },
                    {
                    title: "files",
                    extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv,mp3"
                    }
                    //{title:"Zip files", extensions:"zip,rar" }
                ],
                max_file_size: "5000mb", // 最大只能上传10mb的文件
                prevent_duplicates: true // 不允许选取重复文件
                },
                init: {
                PostInit: function() {
                    document.getElementById('ossfile').innerHTML = '';
                    document.getElementById('postfiles').onclick = function() {
                        set_upload_param(uploader, '', false);
                        return false;
                    };
                },
                FilesAdded: function(up, files) {
                    var fileCount = document.getElementsByClassName("file-li").length;
                    console.log(fileCount);
                    if (fileCount > 0) {
                    alert("只允许添加1个文件");
                    return false;
                    }
                    plupload.each(files, function(file) {
                        document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                        +'</div>';
                    });
                },
                BeforeUpload: function(up, file) {
                    check_object_radio();
                    set_upload_param(up, file.name, true);
                },
                UploadProgress: function(up, file) {
                    var d = document.getElementById(file.id);
                    d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                    var prog = d.getElementsByTagName('div')[0];
                    var progBar = prog.getElementsByTagName('div')[0]
                    progBar.style.width= 2*file.percent+'px';
                    progBar.setAttribute('aria-valuenow', file.percent);
                },
                FileUploaded: function(up, file, info) {
                    let url='https://pts2019.oss-cn-beijing.aliyuncs.com/'+file.name
                    geturl(url)
                },
                Error: function(up, err) {
                    
                }
                }
            });
            uploader.init();
        },
        validate(cb) {
            this.$refs.CreateForm.validate(cb)
        },
        resetFields() {
            this.$refs.CreateForm.resetFields()
        },
        handleRichEditor() {
            this.$refs.editor.handleRichEditor(this.formInline.content)
        },
        handleBeforeUpload(file){
            console.log(file)
            Upload(file).then(res=>{
                console.log(res)
                if(res.data.code=="200"){
                    this.formInline.cover=res.data.data.fileUrl
                }else{
                    this.$Notice.error({desc:'上传失败'})
                }
            })
            return false
        },
        async handleUpload(event){
            console.log(event.target.files[0])
            oss.ossUploadFile(event.target.files[0])
        },
        handleProgress(event, file, fileList){
            console.log(file)
        },
        change(){},
        handleChange(event){
            console.log(event)
            console.log(this.category)
            this.category=event[event.length-1]
            console.log(this.category)
        },
    },
    mounted() {
        this.initPlUploader();
        this.handleRichEditor()
        this.caslist=this.casdata.shift()
    }
}
</script>
