<template>
  <div>
    <!-- <div id="container">
      <a id="selectfiles" href="javascript:void(0);" class="btn">测试上传</a>
      <a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
    </div> -->
    <Card>
      <div class="clearfix" style="margin-bottom: 10px;">
        <div class="pull-left">
          <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
            <Icon type="md-add" />&nbsp;&nbsp;添加
          </Button>
          <!-- <Button @click="handleInfo" class="search-btn" type="success" style="margin-right:5px">
          <Icon type="ios-crop-outline" />&nbsp;&nbsp;相关文章设置</Button>-->
          <!-- <Button @click="handleCreate" class="search-btn" type="primary" style="margin-right:5px">
          <Icon type="md-add"/>&nbsp;&nbsp;生成</Button>-->
        </div>
        <div class="pull-right">
          <Cascader
            :data="casdata"
            @on-change="handleChange"
            change-on-select
            @on-clear="handleChange"
          >
            <!-- <a href="javascript:void(0)">选择</a> -->
          </Cascader>
        </div>
      </div>
      <tables
        class="self-table-wrap"
        ref="tables"
        stripe
        v-model="tableData"
        :columns="columns"
        @on-edit="handleEdit"
        @on-change="handleChangestatus"
        @on-delete="handleDelete"
      />
      <div style="margin-top:10px;text-align:right;">
        <Page
          :total="page.total"
          :current="page.index"
          :page-size="page.size"
          @on-change="handleOnChange"
          show-sizer
          size="small"
          :page-size-opts="[10,20,50,100,]"
          @on-page-size-change="handleOnChangeSize"
        />
      </div>
    </Card>
    <div>
      <ModelDialog
        :status="modelStatus"
        @handlerModelDialogOk="handlerModelDialogOk"
        @handlerModelDialogCancel="handlerModelDialogCancel"
      >
        <CreateForm
          ref="CreateForm"
          :formInline="createForm.formInline"
          :ruleInline="createForm.ruleInline"
          :casdata="casdata"
          v-if="modelStatus.name=='CreateForm'"
        />
        <EditForm
          ref="EditForm"
          :formInline="editForm.formInline"
          :ruleInline="editForm.ruleInline"
          :casdata="casdata"
          v-if="modelStatus.name=='EditForm'"
        />
      </ModelDialog>
    </div>
  </div>
</template>
<script>
import Tables from "_c/tables";
import pageInfo from "@/libs/page-info";
import ModelDialog from "_c/model-dialog";
import {
  schoolarticleColumn,
  getarticleData,
  getCategoryTree,
  createschoolArticle,
  changeschoolArticle,
  deleteschoolArticle
} from "./api";
import CreateForm from "./forms/create-form";
import CreateFormModel from "./model/create-model";
import EditForm from "./forms/create-form";
import EditFormModel from "./model/create-model";
import plupload from "plupload";
export default {
  components: {
    Tables,
    ModelDialog,
    CreateForm,
    EditForm
  },
  data() {
    return {
      tableData: [],
      columns: [],
      page: {},
      modelStatus: {
        show: false,
        hide: false,
        loading: true,
        title: "",
        name: ""
      },
      createForm: {},
      editForm: {},
      casdata: [],
      category: ""
    };
  },
  methods: {
    // initPlUploader() {
    //   var accessid = "";
    //   var accesskey = "";
    //   var host = "";
    //   var policyBase64 = "";
    //   var signature = "";
    //   var callbackbody = "";
    //   var filename = "";
    //   var key = "";
    //   var expire = 0;
    //   var g_object_name = "";
    //   var g_object_name_type = "";
    //   var timestamp = "";
    //   var now = timestamp = Date.parse(new Date()) / 1000;

    //   function send_request() {
    //     var xmlhttp = null;
    //     if (window.XMLHttpRequest) {
    //       xmlhttp = new XMLHttpRequest();
    //     } else if (window.ActiveXObject) {
    //       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //     }

    //     if (xmlhttp != null) {
    //       // serverUrl 是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
    //       // serverUrl = 'http://88.88.88.88:8888/aliyun-oss-appserver-php/php/get.php'
    //       var serverUrl = "http://pts.suoqoo.com/Public/OssUploads/php/get.php";
    //       xmlhttp.open("GET", serverUrl, false);
    //       xmlhttp.send(null);
    //       return xmlhttp.responseText;
    //     } else {
    //       alert("Your browser does not support XMLHTTP.");
    //     }
    //   }

    //   // 监听选择
    //   function check_object_radio() {
    //     var tt = document.getElementsByName("myradio");
    //     for (var i = 0; i < tt.length; i++) {
    //       if (tt[i].checked) {
    //         g_object_name_type = tt[i].value;
    //         break;
    //       }
    //     }
    //   }

    //   // 获取签名
    //   function get_signature() {
    //     // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
    //     now = timestamp = Date.parse(new Date()) / 1000;
    //     if (expire < now + 3) {
    //       var body = send_request();
    //       var obj = eval("(" + body + ")");
    //       host = obj["host"];
    //       policyBase64 = obj["policy"];
    //       accessid = obj["accessid"];
    //       signature = obj["signature"];
    //       expire = parseInt(obj["expire"]);
    //       callbackbody = obj["callback"];
    //       key = obj["dir"];
    //       return true;
    //     }
    //     return false;
    //   }

    //   function random_string(len) {
    //     len = len || 32;
    //     var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    //     var maxPos = chars.length;
    //     var pwd = "";
    //     for (i = 0; i < len; i++) {
    //       pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    //     }
    //     return pwd;
    //   }

    //   function get_suffix(filename) {
    //     let pos = filename.lastIndexOf(".");
    //     let  suffix = "";
    //     if (pos != -1) {
    //       suffix = filename.substring(pos);
    //     }
    //     return suffix;
    //   }

    //   function calculate_object_name(filename) {
    //     if (g_object_name_type == "local_name") {
    //       g_object_name += "${filename}"
    //     } else if (g_object_name_type == "random_name") {
    //       suffix = get_suffix(filename);
    //       g_object_name = key + random_string(10) + suffix;
    //     }
    //     return "";
    //   }

    //   function get_uploaded_object_name(filename) {
    //     if (g_object_name_type == "local_name") {
    //       tmp_name = g_object_name;
    //       tmp_name = tmp_name.replace("${filename}", filename);
    //       return tmp_name;
    //     } else if (g_object_name_type == "random_name") {
    //       return g_object_name;
    //     }
    //   }

    //   function set_upload_param(up, filename, ret) {
    //     if (ret == false) {
    //       ret = get_signature();
    //     }
    //     g_object_name = key;
    //     if (filename != "") {
    //       let suffix = get_suffix(filename);
    //       calculate_object_name(filename);
    //     }
    //     g_object_name += "${filename}"
    //     var new_multipart_params = {
    //       key: g_object_name,
    //       policy: policyBase64,
    //       OSSAccessKeyId: accessid,
    //       success_action_status: "200", //让服务端返回200,不然，默认会返回204
    //       callback: callbackbody,
    //       signature: signature
    //     };

    //     up.setOption({
    //       url: host,
    //       multipart_params: new_multipart_params
    //     });

    //     up.start();
    //   }

    //   var uploader = new plupload.Uploader({
    //     runtimes: "html5,flash,silverlight,html4",
    //     browse_button: "selectfiles",
    //     //multi_selection: false,
    //     container: document.getElementById("container"),
    //     url: "http://oss.aliyuncs.com",
    //     multi_selection: false,
    //     filters: {
    //       mime_types: [
    //         // 只允许上传图片和zip文件
    //         // {title:"Image files",extensions:"jpg,gif,png,bmp" },
    //         {
    //           title: "files",
    //           extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv,mp3"
    //         }
    //         //{title:"Zip files", extensions:"zip,rar" }
    //       ],
    //       max_file_size: "5000mb", // 最大只能上传10mb的文件
    //       prevent_duplicates: true // 不允许选取重复文件
    //     },
    //     init: {
    //       PostInit: function() {

	// 		document.getElementById('postfiles').onclick = function() {
    //             set_upload_param(uploader, '', false);
    //             return false;
	// 		};
    //       },
    //       FilesAdded: function(up, files) {
    //         var fileCount = document.getElementsByClassName("file-li").length;
    //         console.log(fileCount);
    //         if (fileCount > 0) {
    //           alert("只允许添加1个文件");
    //           return false;
    //         }
    //       },
    //       BeforeUpload: function(up, file) {
    //         check_object_radio();
    //         set_upload_param(up, file.name, true);
    //       },
    //       UploadProgress: function(up, file) {

    //       },
    //       FileUploaded: function(up, file, info) {

    //       },
    //       Error: function(up, err) {

    //       }
    //     }
    //   });
    //   uploader.init();
    // },
    handleQuery() {
      let data = {
        token: this.$store.state.user.token,
        page: this.page,
        cid: this.category || 0
      };
      getarticleData(data).then(res => {
        console.log(res);
        if (res.data.code == "200") {
          if (res.data.data.newsList) {
            this.tableData = res.data.data.newsList;
            this.page.size=res.data.data.pageInfo.PageSize,
            this.page.total=res.data.data.pageInfo.TotalPages*res.data.data.pageInfo.PageSize
          } else {
            this.tableData = [];
          }
        }
      });
    },
    handleCategoryTree() {
      getCategoryTree(this.$store.state.user.token).then(res => {
        console.log(res);
        if (res.data.code == "200") {
          this.casdata = res.data.data.Classification.map(el => {
            (el.value = el.id),
              (el.label = el.cate_name),
              (el.children = el.Classification.map(em => {
                (em.value = em.id), (em.label = em.cate_name);
                return em;
              }));
            return el;
          });
          this.casdata.unshift({ value: "0", label: "全部" });
        }
      });
    },
    handleChange(event) {
      console.log(event);
      console.log(this.category);
      this.category = event[event.length - 1];
      console.log(this.category);

      this.handleQuery();
    },
    // 改变上下架状态
    handleChangestatus(params) {
      let data = {
        token: this.$store.state.user.token,
        id: params.row.id,
        is_show: params.row.is_show == 0 ? "1" : "0"
      };
      changeschoolArticle(data).then(res => {
        if ((res.data.code = "200")) {
          this.handleQuery();
          this.$Notice.success({ desc: "操作成功" });
        } else {
          this.$Notice.error({ desc: "操作失败" });
        }
      });
    },
    // 添加
    handleCreate() {
      let form = {
        id: "",
        title: "",
        cid: [],
        create_name: "",
        vedio_url: '',
        content: "",
        is_top: "0",
        cover: "",
        thumb_img: ''
      };
      this.createForm = EditFormModel.init(form);
      this.setDialogProperty(1000, "添加", "CreateForm");
      // this.$refs.CreateForm.handleRichEditor()
      this.$nextTick(()=>{
        this.$refs.CreateForm.handleRichEditor();
      })
      this.$refs.CreateForm.init()
    },
    getPid(id) {
      let pid = "";
      this.casdata.forEach(el => {
        console.log(el.children);
        if (el.children) {
          el.children.forEach(em => {
            console.log(em);
            if (em.value == id) {
              console.log(el.value);
              pid = el.value;
            }
          });
        }
      });
      return pid;
    },
    handleEdit(params) {
      console.log(params);
      console.log(this.casdata);
      let pid = this.getPid(params.row.cid);
      console.log(pid);
      let form = {
        id: params.row.id,
        title: params.row.title,
        cid: [pid, params.row.cid],
        create_name: params.row.create_name,
        vedio_url: params.row.videoList?params.row.videoList.map(el=>{
          return el.vedio_url
        }):[],
        content: params.row.content,
        is_top: params.row.is_top,
        cover: params.row.cover,
        thumb_img: params.row.thumb_img
      };
      this.editForm = CreateFormModel.init(form);
      this.setDialogProperty(1000, "编辑", "EditForm");
      // this.$refs.EditForm.handleRichEditor()
      this.$nextTick(()=>{
        this.$refs.EditForm.handleRichEditor();
      })
      this.$refs.EditForm.init()
    },
    // 基本信息设置
    handleInfo() {},
    handleDelete(params) {
      deleteschoolArticle({
        token: this.$store.state.user.token,
        id: params.row.id
      }).then(res => {
        if ((res.data.code = "200")) {
          this.handleQuery();
          this.$Notice.success({ desc: "操作成功" });
        } else {
          this.$Notice.error({ desc: "操作失败" });
        }
      });
    },
    // handleCreate() {},
    /* 分页查询 */
    handleOnChange(index) {
      this.page.index = index;
      this.handleQuery();
    },
    /* 分页大小 */
    handleOnChangeSize(size) {
      this.page.size = size;
      this.handleQuery();
    },
    // 弹出框设置
    setDialogProperty(width, title, name) {
      this.modelStatus.show = true;
      this.modelStatus.loading = true;
      this.modelStatus.width = width;
      this.modelStatus.title = title;
      this.modelStatus.name = name;
    },
    /* 对话框确认 */
    handlerModelDialogOk(name) {
      if (name === "CreateForm") {
        this.$refs.CreateForm.validate(valid => {
          if (valid) {
            this.create();
          }
        });
      } else if (name === "EditForm") {
        this.$refs.EditForm.validate(valid => {
          if (valid) {
            this.edit();
          }
        });
      }
      this.modelStatus.loading = false;
      this.$nextTick(() => {
        this.modelStatus.loading = true;
      });
    },
    /* 对话框取消 */
    handlerModelDialogCancel(name) {
      this.$refs[name].resetFields();
      this.$refs[name].handleRichEditor();
      this.$refs[name].init();
      this.$nextTick(()=>{
        this.$refs[name].handleRichEditor();
      })
      // 确保关闭对话框
      this.modelStatus.show = false;
      // 对话框显示footer恢复
      this.modelStatus.hide = false;
    },
    create() {
      console.log(this.createForm.formInline);
      // let create=CreateFromModel.converter(this.createForm.formInline)
      let cid = this.createForm.formInline.cid[
        this.createForm.formInline.cid.length - 1
      ];
      let data = {
        token: this.$store.state.user.token,
        id: this.createForm.formInline.id,
        title: this.createForm.formInline.title,
        cid: cid,
        create_name: this.createForm.formInline.create_name,
        vedio_url: this.createForm.formInline.vedio_url?this.createForm.formInline.vedio_url.join(','):'',
        content: this.createForm.formInline.content,
        is_top: this.createForm.formInline.is_top,
        cover: this.createForm.formInline.cover,
        thumb_img: this.createForm.formInline.thumb_img
      };
      let dat=new FormData()
      for(let i in data){
        console.log(i)
        dat.append(`${i}`,data[i])
      }
      // dat.get(cover)
      // console.log(dat.get(cover))
      createschoolArticle(dat).then(res => {
        console.log(res);
        if (res.data.code == "200") {
          this.handleQuery();
          // 确保关闭对话框
          this.modelStatus.show = false;
          // 对话框显示footer恢复
          this.modelStatus.hide = false;
          this.resetFields('CreateForm')
        }
      });
    },
    edit() {
      console.log(this.editForm.formInline);
      // let create=CreateFromModel.converter(this.createForm.formInline)
      let cid = this.editForm.formInline.cid[
        this.editForm.formInline.cid.length - 1
      ];
      let data = {
        token: this.$store.state.user.token,
        id: this.editForm.formInline.id,
        title: this.editForm.formInline.title,
        cid: cid,
        create_name: this.editForm.formInline.create_name,
        vedio_url: this.editForm.formInline.vedio_url?this.editForm.formInline.vedio_url.join(','):'',
        content: this.editForm.formInline.content,
        is_top: this.editForm.formInline.is_top,
        cover: this.editForm.formInline.cover,
        thumb_img: this.editForm.formInline.thumb_img
      };
      // let vediolist=[]
      // data.vedio_url.forEach(el=>{
      //   if(el.vedio_url!=''||el.vedio_url!=undefined){
      //     vediolist.push[el.vedio_url]
      //   }else{
      //     vediolist.push[el]
      //   }
      // })
      // data.vedio_url=vediolist.join(',')
      let dat=new FormData()
      for(let i in data){
          console.log(i)
          dat.append(`${i}`,data[i])
      }
      // console.log(cid)
      createschoolArticle(dat).then(res => {
        console.log(res);
        if (res.data.code == "200") {
          this.handleQuery();
          // 确保关闭对话框
          this.modelStatus.show = false;
          // 对话框显示footer恢复
          this.modelStatus.hide = false;
          this.resetFields('EditForm')
        }
      });
    }
  },
  mounted() {
    this.columns = schoolarticleColumn;
    this.page = pageInfo.init();
    this.handleQuery();
    this.handleCategoryTree();
    // this.initPlUploader();
  }
};
</script>

