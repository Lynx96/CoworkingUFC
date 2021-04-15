<template>
  <div class="project-page">
    <b-form>
      <input id="project-id" type="hidden" v-model="project.id" />   
          <b-form-group label="Nome:" label-for="project-name">
            <b-form-input
              id="project-name"
              type="text"
              v-model="project.name"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe o nome do Projeto..."
            />
          </b-form-group>         
          <b-form-group label="Descrição:" label-for="project-name">
            <b-form-input
              id="project-description"
              type="text"
              v-model="project.description"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe a Descrição do Projeto..."
            />
          </b-form-group>
           
          <b-form-group v-if="mode === 'save'" label="Programa:" label-for="project-programId">
            <b-form-select id="project-programId"            
            :options="programs" v-model="project.programId" />
          </b-form-group> 
                 
          <b-form-group v-if="mode === 'save'" label="Participantes:" label-for="project-userId">
            <b-form-select id="project-userId"            
            :options="users" v-model="project.userId" />
          </b-form-group>        
          <!-- <b-form-group v-if="mode === 'save'" label="Conteúdo:" label-for="category-content">
            <VueEditor v-model="article.content"
            :disabled="mode === 'remove'"
            placeholder="Informe o Conteúdo do Artigo..."/>                  
          </b-form-group>         -->
            <b-button class="mb-3" variant="primary" v-if="mode === 'save'"
              @click="save">Salvar</b-button>
              <b-button class="mb-3" variant="danger" v-if="mode === 'remove'"
              @click="remove">Excluir</b-button>
            <b-button class="mb-3 ml-2" @click="reset">Cancelar</b-button>              
    </b-form>
    <b-table hover striped :items="projects" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadProject(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button v-if="showButton()" variant="danger" @click="loadProject(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError, userKey } from "../../config/global"
import axios from "axios"

export default {
  name: "ProjectPage",
//   components: { VueEditor },
  data: function () {
    return {
      mode: 'save',
      project: {},
      projects: [],      
      users: [],
      programs: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "programName", label: "Programa", sortable: true },
        { key: "userName", label: "Participantes", sortable: true },
        { key: "actions", label: "Ações", sortable: true },
      ],
    };
  },

  methods: {
    loadProjects() {
      const url = `${baseApiUrl}/projects?page=${this.page}`
      axios.get(url).then((res) => {      
          this.projects = res.data.data
          this.count = res.data.count
          this.limit = res.data.limit          
      })
    },
    reset() {
      this.mode = "save"
      this.project = {}
      this.loadProjects()
    },
    save() {
      const method = this.project.id ? "put" : "post"
      delete this.project["programName"]
      delete this.project["userName"]
      const id = this.project.id ? `/${this.project.id}` : ''
      axios[method](`${baseApiUrl}/projects${id}`, this.project)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.project.id
      axios.delete(`${baseApiUrl}/projects/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    loadProject(project, mode = "save") {
      this.mode = mode  
      this.project = {...project}  
      // axios.get(`${baseApiUrl}/projects/${project.id}`)
      //   .then(res => this.project = res.data)  
  },  
  showButton(){        
        return JSON.parse(localStorage.getItem(userKey)).admin
  }, 
  
  loadPrograms(){
      const url = `${baseApiUrl}/programs`
      axios.get(url).then(res => { 
        this.programs = res.data.data.map(program => {
          return { value: program.id, text: program.name }
        })
      })
    },
    loadUsers(){
      const url = `${baseApiUrl}/users`
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - (${user.email})`}
        })
      })
    }
  },
  watch:{
    page(){
      this.loadProjects()
    }
  },
  mounted() {   
    this.loadPrograms()
    this.loadProjects() 
    this.loadUsers()    
    
  }
}
</script>

<style>

</style>