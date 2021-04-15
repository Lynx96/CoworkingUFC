<template>
    <div class="admin-pages">
        <Pagetitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
            <div class="admin-pages-tabs">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Artigos" active>
                    <ArticleAdmin />
                  </b-tab>
                  <b-tab title="Categorias">
                    <CategoryAdmin />
                  </b-tab>
                  <b-tab title="Usuários">
                    <UserAdmin />
                  </b-tab>                 
                </b-tabs>
              </b-card>
            </div>
    </div>
  
</template>

<script>
import Pagetitle from '../templates/pageTitle'
import ArticleAdmin from './articleAdmin'
import CategoryAdmin from './categoryAdmin'
import UserAdmin from './userAdmin'

export default {
  name: 'AdminPages',
  components: { Pagetitle, ArticleAdmin, CategoryAdmin, UserAdmin }

}
</script>

<style>

</style>