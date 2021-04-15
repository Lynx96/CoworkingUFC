exports.up = function(knex, Promise) {
    return knex.schema.createTable('reservations', table =>{
        table.increments('id').primary()        
        table.string('description', 1000).notNull()
        table.string('dateTime').defaultTo(null) 
        table.string('dayTime').notNull()     
        table.integer('projectId').references('id')
            .inTable('projects').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()        
        table.enu('duration', ['30Min', '60Min', '90Min', '120Min'] ).notNull()
        table.enu('activity', ['Pesquisa', 'Extensão', 'Ensino'] ).notNull()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reservations')
  
};
