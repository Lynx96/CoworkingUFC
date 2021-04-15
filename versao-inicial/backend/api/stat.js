module.exports = app => {
    const Stat = app.mongoose.model('Statistics', {
        programs: Number,
        projects: Number,
        reservations: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort:{'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    programs: 0,
                    projects: 0,
                    reservations: 0
                }
                res.json(stat || defaultStat)
       })
    }

    return {Stat, get}
}