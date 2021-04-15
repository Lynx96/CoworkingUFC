<template>
  <header class="header">
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
        <i class="fa fa-lg" :class="icon"></i>
      </a>
      <h1 class="title">  
            <!-- <img src="../../assets/ufc-logo.png" width="300" height="100" alt="Logo" />         -->
          <router-link to="/"> {{title}}</router-link>
      </h1>
      <userDropdown v-if="!hideUserDropdown" />

  </header>
</template>

<script>
import userDropdown from './userDropdown'

export default {
    name: 'Header',
    components: {userDropdown},
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"  
        }
    },
    methods:{
        toggleMenu(){
            this.$store.commit('toggleMenu')
            
        },        
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .title{
        font-size: 2.0rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
        font-family: Verdana;
        
    }

    .title a {
        color: #fff;
        text-decoration: none;
    }
    .title a:hover {
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;
        
        display: flex;
        justify-content: center;
        align-items: center;

    }

    header.header > a.toggle:hover {
        color: white;
        background-color: rgb(0, 0, 0, 0.2);
        transition: background-color 1s ease-out;
    }

</style>