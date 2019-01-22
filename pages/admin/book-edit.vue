<template>
  <div class="p-book-edit">
    <h1 class="title">{{ id?'编辑书籍':'添加书籍' }}</h1>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label>标题 *</label>
          <input v-model="form.title" required class="input" />
        </div>

        <div class="field">
          <label>副标题</label>
          <input v-model="form.subtitle" class="input" />
        </div>

        <div class="columns">
          <div class="column field">
            <label>作者 *</label>
            <input v-model="form.author" required class="input" />
          </div>

          <div class="column field">
            <label>ISBN *</label>
            <input v-model="form.isbn" required class="input" />
          </div>
        </div>

        <div class="columns">
          <div class="column field">
            <label>发布日期 *</label>
            <b-datepicker v-model="form.publishDate" required />
          </div>

          <div class="column field">
            <label>标签 *</label>
            <b-taginput v-model="form.tags" :data="filteredTags" :before-adding="beforeAddTag" field="name" ellipsis allow-new autocomplete @typing="getFilteredTags" />
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="cover">
          <input v-model="form.cover" type="hidden" />
          <div class="uploader" @click="uploadPhoto">
            <img v-if="form.cover" :src="$imgUrl(form.cover,'w180')">
            <i v-else class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>介绍 *</label>
      <textarea v-model="form.intro" required class="textarea"></textarea>
    </div>

    <div class="field">
      <label>目录</label>
      <textarea v-model="form.toc" class="textarea"></textarea>
    </div>

    <div class="field">
      <label>下载地址 *</label>
      <div class="columns">
        <div class="column">
          <div v-for="(link,index) in form.links" :key="index" class="field has-addons">
            <b-select v-model="link.format" placeholder="选择格式">
              <option v-for="item in formatOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="disableFormat(item)">
              </option>
            </b-select>
            <p class="control is-expanded">
              <input v-model="link.url" placeholder="下载链接" class="input" />
            </p>
            <p v-if="form.links.length>1" class="control">
              <a class="button" @click="removeLink(index)">移除</a>
            </p>
          </div>
        </div>
        <div class="column is-1" style="display:flex">
          <button :disabled="form.links.length==5" class="button" style="align-self:flex-end;" @click="addLink">添加</button>
        </div>
      </div>
    </div>

    <a class="button is-primary" @click="submit">保 存</a>
  </div>
</template>

<script>
import { bookApi, tagApi, accountApi } from '@/api/admin'
import { openFileDialog } from '../../utils'

export default {
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        title: '',
        subtitle: '',
        author: '',
        isbn: '',
        tags: [],
        cover: '',
        publishDate: null,
        intro: '',
        toc: '',
        links: [{ format: null, url: '' }]
      },
      formatOptions: [
        { value: 1, label: 'PDF' },
        { value: 2, label: 'AZW3' },
        { value: 3, label: 'EPUB' },
        { value: 4, label: 'MOBI' },
        { value: 7, label: '压缩包' }
      ],
      filteredTags: []
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  mounted() {
    if (this.id) {
      bookApi.getEdit(this.id).then(data => {
        data.publishDate = new Date(data.publishDate)
        this.form = data
      })
    }
  },

  methods: {
    uploadPhoto() {
      openFileDialog('jpg|jpeg|gif|png', e => {
        accountApi.uploadFile(e.target.files[0]).then(data => {
          this.form.cover = data.key
        })
      })
    },

    getFilteredTags(text) {
      tagApi.search({ keyword: text }).then(data => {
        this.filteredTags = data.map(x => x.name)
      })
    },

    beforeAddTag(input) {
      this.form.tags.push({ name: input })
      return false
    },

    disableFormat(option) {
      return this.form.links.findIndex(x => x.format === option.value) > -1
    },

    addLink() {
      this.form.links.push({ format: null, url: '' })
    },

    removeLink(index) {
      this.form.links.splice(index, 1)
    },

    submit() {
      if (this.id) {
        bookApi.update(this.id, this.form).then(x => {
          this.$toast.open('提交成功！')
          this.$router.push('/admin')
        })
      } else {
        bookApi.create(this.form).then(x => {
          this.$toast.open('提交成功！')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.p-book-edit {
  .select select option:disabled {
    color: #999;
  }
  .cover {
    position: absolute;
    top: 115px;
    right: 40px;
    .uploader {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 240px;
      border: 1px dashed #ccc;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        border-color: #409eff;
      }
      .el-icon-plus {
        font-size: 20px;
      }
    }
  }
}
</style>


