<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Estatísticas dos serviços" />
            <div class="stats">
                <Stat title="Programas" :value="stat.programs"
                    icon="fa fa-folder" color="#d54d50" />
                <Stat title="Projetos" :value="stat.projects"
                    icon="fa fa-file" color="#3bc480" />
                <Stat title="Reservas" :value="stat.reservations"
                    icon="fa fa-calendar" color="#3282cd" />
            </div>
    </div>
 
</template>

<script>
import PageTitle from '../templates/pageTitle'
import Stat from './Stat'
import axios from 'axios'
import {baseApiUrl} from '../../config/global'

export default {
    name: 'Home',
    components: {PageTitle, Stat},
    data: function(){
        return{
            stat: {}
        }
    },
    methods: {
        getStats(){
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)

        }
    },
    mounted(){
        this.getStats()
    }

}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

</style>