<template>
    <div class="res-pages">
        <Pagetitle icon="fa fa-calendar" main="Reserva de Horários"
            sub="Cadastro de Programas, Projetos e Reservas" />
            <div class="res-pages-tabs">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Programas" active>
                    <ProgramPage />
                  </b-tab>
                  <b-tab title="Projetos">
                    <ProjectPage />
                  </b-tab>
                  <b-tab title="Reservas">
                    <ReservationPage />
                  </b-tab>                 
                </b-tabs>
              </b-card>
            </div>
    </div>   
</template>

<script>
import Pagetitle from '../templates/pageTitle'
import ProgramPage from './programPage'
import ProjectPage from './projectPage'
import ReservationPage from './reservationPage'

export default {
  name: 'UserReservation',
  components: { Pagetitle, ProgramPage, ProjectPage, ReservationPage }


}
</script>

<style>

</style>