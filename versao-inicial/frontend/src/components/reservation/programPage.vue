<template>
  <div class="program-page">
    <b-form>
      <input id="program-id" type="hidden" v-model="program.id" />
      <b-row>
        <b-col md="4" sm="8">
          <b-form-group label="Nome:" label-for="program-name">
            <b-form-input
              id="program-name"
              type="text"
              v-model="program.name"
              required 
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Programa..."
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="8">
          <b-form-group label="Responsável:" label-for="program-responsible">
            <b-form-input
              id="program-responsible"
              type="text"
              v-model="program.responsible"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Responsável pelo Programa..."
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="8">
          <b-form-group label="Ano:" label-for="program-year">            
            <b-form-input
              id="program-year"
              type="text"
              v-model="program.year"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o ano do Programa..."
            />
          </b-form-group>
        </b-col>
      </b-row>      
      <b-row>
        <b-col xs="12">
          <b-button class="mb-3" variant="primary" v-if="mode === 'save'"
          @click="save">Salvar </b-button>
        <b-button class="mb-3" variant="danger" v-if="mode === 'remove'"
          @click="remove">Excluir</b-button>
        <b-button class="mb-3 ml-2" @click="reset">Cancelar</b-button>
        </b-col>        
      </b-row>
    </b-form>
    <b-table hover striped :items="programs" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadProgram(data.item)" class="mr-2">
         <i class="fa fa-pencil"></i>
        </b-button>
        <b-button v-if="showButton()" variant="danger" @click="loadProgram(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "../../config/global";
import axios from "axios";

export default {
  name: "ProgramPage",
  data: function () {
    return {
      
      mode: "save",
      program: {},
      programs: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "responsible", label: "Responsável", sortable: true },
        { key: "year", label: "Ano", sortable: true },        
        { key: "actions", label: "Ações" },
      ],     
      
    }
  },

  methods: {
    loadPrograms() {
      const url = `${baseApiUrl}/programs?page=${this.page}`
      axios.get(url).then((res) => {
        this.programs = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit
      })
    },
    reset(){
      this.mode = 'save'
      this.program = {}
      this.loadPrograms()
    },
    showButton(){        
        return JSON.parse(localStorage.getItem(userKey)).admin
    },           
    save(){
      const method = this.program.id ? 'put' : 'post'
      const id = this.program.id ? `/${this.program.id}` : ''
      axios[method](`${baseApiUrl}/programs${id}`, this.program)
      .then(() =>{
        this.$toasted.global.defaultSuccess()
        this.reset()
      })
      .catch(showError)
    },
    remove() {
      const id = this.program.id
      axios.delete(`${baseApiUrl}/programs/${id}`)
      .then(() =>{
        this.$toasted.global.defaultSuccess()
        this.reset()
      })
      .catch(showError)
    },
    loadProgram(program, mode = 'save'){
      this.mode = mode
      this.program = { ...program }
    }
  },  
   watch:{
    page(){
      this.loadPrograms()
    }
  },
  mounted() {
    this.loadPrograms()
  }
}
</script>

<style>

</style>