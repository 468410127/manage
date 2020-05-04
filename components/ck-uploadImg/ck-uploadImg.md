###### ckUploadImg 使用说明 ######



> 引入组件：

```
import ckUploadImg from '@/components/ck-uploadImg/ck-uploadImg.vue'

export default {
	components:{
		ckUploadImg
	},
}
```

> 使用组件
> returnImgUrl是获取七牛云回传回来的图片hash值，
> initImgList是数组[]类型,是七牛云图片回显的完整路径，例为['http://xxx.xxx.xx/fdcada376748444ba957c96ff8c6d160']
> selectNum是设定可以选择多少张图片
> 代码中，选择图片ico用的是ColorUI组件库，可以小程序中搜索“ColorUI组件库”，cuIcon-roundclosefill为删除图片ico，cuIcon-cameraadd为添加图片ico,如果你没有使用“ColorUI组件库”，请更换为自己的图片ico矢量库

```
<ck-upload-img @returnImgUrl="getImgUrl" :initImgList="urls" :selectNum=3></ck-upload-img>
```
