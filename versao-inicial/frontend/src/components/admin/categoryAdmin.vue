<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />   
          <b-form-group label="Categoria:" label-for="category-name">
            <b-form-input
              id="category-name"
              type="text"
              v-model="category.name"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe o nome da Categoria..."
            />
          </b-form-group>   
          <b-form-group label="Categoria Pai:" label-for="category-parentId">
            <b-form-select id="category-parentId"
            :disabled="mode === 'remove'"
            :options="categories" v-model="category.parentId" />
          </b-form-group>        
            <b-button class="mb-3" variant="primary" v-if="mode === 'save'"
              @click="save">Salvar</b-button>
              <b-button class="mb-3" variant="danger" v-if="mode === 'remove'"
              @click="remove">Excluir</b-button>
            <b-button class="mb-3 ml-2" @click="reset">Cancelar</b-button>              
    </b-form>
    <b-table hover striped :items="categories" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "../../config/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações", sortable: true },
      ],
    };
  },

  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        //this.categories = res.data;
        this.categories = res.data.map(category =>{
          return {...category, value: category.id, text: category.path}
        });
      });
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    },
  },
  mounted() {
    this.loadCategories();
  }
}
</script>

<style>
</style>