module.exports = app => {
	const { existsOrError } = app.api.validation

	const save = async (req, res) => {
		const reservation = { ...req.body }
		if (req.params.id) reservation.id = req.params.id

		try {

			existsOrError(reservation.projectId, 'Projeto não informado')
			existsOrError(reservation.description, 'Objetivo da reserva não informado')
			existsOrError(reservation.dateTime, 'Horário de início não informado')
			existsOrError(reservation.dayTime, 'Dia da reserva não informado')
			existsOrError(reservation.duration, 'Tempo de reserva não informado')
			existsOrError(reservation.activity, 'Atividade não informada')
			existsOrError(reservation.userId, 'Participante(s) não informado(s)')

		} catch (msg) {
			res.status(400).send(msg)
		}

		if (reservation.id) {
			app.db('reservations')
				.update(reservation)
				.where({ id: reservation.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('reservations')
				.insert(reservation)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const limit = 3 //usado para paginação
	const get = async(req, res) => {
		const page = req.query.page || 1
        const result = await app.db('reservations').count('id').first()
        const count = parseInt(result.count)

		app.db('reservations as reser')
			.join('projects as proj', 'reser.projectId', '=', 'proj.id')
			.join('users as u', 'reser.userId', '=', 'u.id')
			.select(
				'reser.id', 'reser.description', 'reser.dateTime', 'reser.dayTime',
				'reser.duration', 'reser.activity', 'reser.projectId',
				'proj.name as projName', 'reser.userId', 'u.name as userName')
				.limit(limit).offset(page * limit - limit)
				.then(reser => res.json({data: reser, count, limit}))
			.catch(err => res.status(500).send(err))
	}

	/* const getById = (req, res) => {
	app.db('reservations')
	.select('id', 'name', 'responsible', 'year')
	.where({ id: req.params.id })
	.first()
	.then(reservations => res.json(reservations))
	.catch(err => res.status(500).send(err))
	} */

	const remove = async (req, res) => {
		try {
			existsOrError(req.params.id, 'Código da Reserva não informado.')

			const rowsDeleted = await app.db('reservations')
				.where({ id: req.params.id }).del()
			existsOrError(rowsDeleted, 'Reserva não foi encontrada.')

			res.status(204).send()
		} catch (msg) {
			res.status(400).send(msg)
		}
	}

	return { save, get, remove }
}