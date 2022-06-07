<template>
  <div class="page-editor">
    <v-md-editor
      v-model="content"
      height="500px"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    />
  </div>
</template>

<script setup lang="ts">
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror'

// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs
})

type IEmits = {
  (e: 'uploadImage', insertImage: any, files: File[]): void
  (e: 'update:modelValue', value: string): void
}

type IProps = {
  modelValue: string
}

const emits = defineEmits<IEmits>()
const props = defineProps<IProps>()

const content = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    content.value = props.modelValue
  }
)

watch(content, (value) => {
  emits('update:modelValue', value)
})

const handleUploadImage = async (
  event: any,
  insertImage: any,
  files: File[]
) => {
  emits('uploadImage', insertImage, files)
}
</script>

<style scoped lang="less"></style>
