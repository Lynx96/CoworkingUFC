<template>
  <div class="reservation-page">
    <b-form>
      <input id="reservation-id" type="hidden" v-model="reservation.id" />
      <b-row>
        <b-col md="4" sm="8">
          <b-form-group
            v-if="mode === 'save'"
            label="Projeto:"
            label-for="reservation-projectId"
          >
            <b-form-select
              id="reservation-projectId"
              :options="projects"
              v-model="reservation.projectId"
            />
          </b-form-group>
        </b-col>
        <b-col md="8" sm="8">
          <b-form-group label="Descrição:" label-for="reservation-name">
            <b-form-input
              id="reservation-description"
              type="text"
              v-model="reservation.description"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe o objetivo da atividade para uso da Reserva..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" sm="8">
          <b-form-group
            label="Horário de início:"
            label-for="reservation-dateTime"
          >
            <b-form-timepicker
              id="reservation-dateTime"
              type="time"
              v-model="reservation.dateTime"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe o horário de início da Reserva..."
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="8">
          <b-form-group label="Dia da reserva:" label-for="reservation-dayTime">
            <b-form-datepicker
              id="reservation-dayTime"
              type="date"
              v-model="reservation.dayTime"
              required
              :disabled="mode === 'remove'"
              placeholder="Informe o dia da Reserva..."
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="8">          
          <b-form-group
            label="Duração da Reserva:"
            label-for="reservation-duration"
          >
            <b-form-select
            id="reservation-duration"
            :options="durations"
            v-model="reservation.duration"
            required
            :disabled="mode === 'remove'"
            placeholder="Informe a duração de uso da sala na Reserva..."
            />            
          </b-form-group>
        </b-col> 
      </b-row>        
         <b-row>
           <b-col md="4" sm="8">  
        <b-form-group
          v-if="mode === 'save'"
          label="Tipo de Atividade:"
          label-for="reservation-activity"
        >
          <b-form-select
            id="reservation-activity"
            :options="activities"
            v-model="reservation.activity"
          />
        </b-form-group>
        </b-col>
       <b-col md="8" sm="8"> 
        <b-form-group
          v-if="mode === 'save'"
          label="Participantes:"
          label-for="reservation-userId"
        >
          <b-form-select
            id="reservation-userId"
            :options="users"
            v-model="reservation.userId"
          />
        </b-form-group>
       </b-col>
         </b-row>         
      <b-button
        class="mb-3"
        variant="primary"
        v-if="mode === 'save'"
        @click="save"
        >Salvar</b-button
      >
      <b-button
        class="mb-3"
        variant="danger"
        v-if="mode === 'remove'"
        @click="remove"
        >Excluir</b-button
      >
      <b-button class="mb-3 ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <b-table hover striped :items="reservations" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button 
          variant="warning"
          @click="loadReservation(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button 
          v-if="showButton()"
          variant="danger"
          @click="loadReservation(data.item, 'remove')"
        >
          <i class="fa fa-trash"></i>                 
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    />
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "../../config/global";
import axios from "axios";

export default {
  name: "ReservationPage",  
  data: function () {
    return {
      mode: "save",
      reservation: {},
      reservations: [],
      users: [],
      projects: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "projName", label: "Projeto", sortable: true },
        { key: "userName", label: "Participantes", sortable: true },
        { key: "duration", label: "Tempo de duração", sortable: true },
        { key: "dateTime", label: "Horário de início", sortable: true },
        { key: "dayTime", label: "Dia da reserva", sortable: true },
        { key: "actions", label: "Ações", sortable: true },
      ],
      activities: [
        { value: "Pesquisa", text: "Orientação(pesquisa)" },
        { value: "Extensão", text: "Mentoria/Consultoria" },
        { value: "Ensino", text: "Educação" },
      ],
      durations: 
      [
        { value: "30Min", text: "30 min" },
        { value: "60Min", text: "1 hora" },
        { value: "90Min", text: "1 hora e 30 min" },
        { value: "120Min", text: "2 horas" },
      ],
    }
  },

  methods: {
    loadReservations() {
      const url = `${baseApiUrl}/reservations?page=${this.page}`
      axios.get(url).then((res) => {
        this.reservations = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit
      });
    },
    reset() {
      this.mode = 'save'
      this.reservation = {}
      this.loadReservations()
    },
    showButton(){        
        return JSON.parse(localStorage.getItem(userKey)).admin
    },      
    save(){
      const method = this.reservation.id ? 'put' : 'post'
      delete this.reservation["projName"]
      delete this.reservation["userName"]      
      const id = this.reservation.id ? `/${this.reservation.id}` : ''
      axios[method](`${baseApiUrl}/reservations${id}`, this.reservation)
      .then(() =>{
        this.$toasted.global.defaultSuccess()
        this.reset()
      })
      .catch(showError)
    },
    remove() {
      const id = this.reservation.id;
      axios
        .delete(`${baseApiUrl}/reservations/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },

    loadProjects() {
      const url = `${baseApiUrl}/projects`;
      axios.get(url).then((res) => {
        this.projects = res.data.data.map((project) => {
          return { value: project.id, text: `${project.name}` };
        })
      })
    },
    loadReservation(reservation, mode = "save") {
      this.mode = mode
      this.reservation = { ...reservation }
      // axios.get(`${baseApiUrl}/reservations/${reservation.id}`)
      //   .then(res => this.reservation = res.data)
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - (${user.email})` }
        })
      })
    }
  },
  watch: {
    page() {
      this.loadReservations()
    }
  },
  mounted() {
    this.loadReservations()
    this.loadProjects()
    this.loadUsers()
  },
};
</script>

<style>
</style>