const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function() {
        const programsCount = await app.db('programs').count('id').first()
        const projectsCount = await app.db('projects').count('id').first()
        const reservationsCount = await app.db('reservations').count('id').first()

        const {Stat} = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt': -1 } } )

        const stat = new Stat({
            programs: programsCount.count,
            projects: projectsCount.count,
            reservations: reservationsCount.count,
            createdAt: new Date()

        })

        const changePrograms =  !lastStat || stat.programs !== lastStat.programs
        const changeProjects = !lastStat || stat.projects !== lastStat.projects
        const changeReservations =  !lastStat || stat.reservations !== lastStat.reservations

        if(changePrograms || changeProjects || changeReservations){
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!!!'))
        }


    })
}