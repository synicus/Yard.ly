import React from 'react'
import WorkerInfo from './workerInfo.jsx'
import EquipmentServicesInfo from './equipmentServicesInfo.jsx'
import RequestMaker from './requestMaker.jsx'
import {
	workersUpdateRoute,
	workersShowRoute,
	requestsWorkerRoute,
	requestsUserRoute,
	requestsFilterRoute,
} from '../../server/routes.js'
import WorkerRequestList from './workerRequestList.jsx'
import axios from 'axios'


class WorkerProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			workerRequests: [],
			userWorkerRequests: [],
			worker: {
				username: '',
				password: '',
				services: {
					Mowing: false,
					TreeTrimming: false,
					Edging: false,
					Weedeating: false,
					HedgeTrimming: false,
					Fertilizing: false,
					Aerating: false,
					Mulching: false,
					Weeding: false,
					Planting: false,
					GrassSeeding: false,
				},
				equipment: {
					LawnMower: false,
					Weedeater: false,
					MulchTruck: false,
					Edger: false,
					HedgeTrimmer: true,
					Chainsaw: false,
					LawnAerator: false,
					Seeder: false,
				},
				area: '',
				firstName: '',
				lastName: '',
				contactInfo: {
					phoneNumber: '',
					email: '',
				},
				rate: 10,
				requests: [],
				image: '',
				address: {
					address: '',
					city: '',
					state: '',
					zipcode: '',
				},
			},
			date: null,
			user: {
				_id: '5970ae7ae2aa44b1b406fdd6',
				requests: [],
				addresses: [
					{
						zipcode: '78633',
						state: 'Texas',
						city: 'Austin',
						address: '223 Great Frontier dr',
					},
					{
						zipcode: '78633',
						state: 'Texas',
						city: 'Austin',
						address: '223333 Great Frontier dr',
					},
					{
						zipcode: '78633',
						state: 'Texas',
						city: 'Austin',
						address: '3444433 Great Frontier dr',
					},
				],
				address: {
					zipcode: '78633',
					state: 'Texas',
					city: 'Georgetown',
					address: '124 Great Frontier dr',
				},
			},
			userId: undefined,
		}
		// this.submitContactInfo = this.submitContactInfo.bind(this)
		this.submitEmail = this.submitEmail.bind(this)
		this.submitPhone = this.submitPhone.bind(this)
		this.submitArea = this.submitArea.bind(this)
		this.getWorker = this.getWorker.bind(this)
		this.updateWorker = this.updateWorker.bind(this)
		this.changeEquipment = this.changeEquipment.bind(this)
		this.onEquipmentClick = this.onEquipmentClick.bind(this)
		this.changeService = this.changeService.bind(this)
		this.onServicesClick = this.onServicesClick.bind(this)
		this.submitImage = this.submitImage.bind(this)
		this.updateUser = this.updateUser.bind(this)
		// this.updateRequest = this.updateRequest.bind(this)
		this.getWorkerRequests = this.getWorkerRequests.bind(this)
		this.getUserWorkerRequests = this.getUserWorkerRequests.bind(this)
		this.onAcceptRequestClick = this.onAcceptRequestClick.bind(this)
	}
	submitEmail(e) {
		e.preventDefault()
		var worker = this.state.worker
		worker.contactInfo.email = e.target.email.value !== ''
			? e.target.email.value
			: worker.contactInfo.email
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}
	submitPhone(e) {
		e.preventDefault()
		var worker = this.state.worker
		worker.contactInfo.phoneNumber = e.target.phoneNumber.value !== ''
			? e.target.phoneNumber.value
			: worker.contactInfo.phoneNumber
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}
	submitArea(e) {
		e.preventDefault()
		var worker = this.state.worker
		worker.area = e.target.area.value !== '' ? e.target.area.value : worker.area
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}
	submitImage(e) {
		e.preventDefault()
		var worker = this.state.worker
		console.log(e.target.image.value)
		worker.image = e.target.image.value !== ''
			? e.target.image.value
			: worker.image
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}

	getWorker(id) {
		fetch('/api'.concat(workersShowRoute(id)), {
			headers: { 'Content-type': 'application/json' },
			method: 'GET',
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(data => {
				this.setState({ worker: data })
			})
	}
	getWorkerRequests(wid) {
		fetch('/api'.concat(requestsWorkerRoute(wid)), {
			headers: { 'Content-type': 'application/json' },
			method: 'GET',
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(requests => {
				console.log('~~~~~~~worker', requests)
				this.setState({ workerRequests: requests })
			})
			.then(() => {
				console.log('~~~~~~state', this.state)
			})
	}

	getUserWorkerRequests(uid, wid) {
		fetch('/api'.concat(requestsFilterRoute(uid, wid)), {
			headers: { 'Content-type': 'application/json' },
			method: 'GET',
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(requests => {
				console.log('~~~~~~~requestsUserWorker', requests)
				this.setState({ userWorkerRequests: requests })
			})
			.then(() => {
				console.log('~~~~~~state', this.state)
			})
	}

	updateWorker(id, worker) {
		fetch('/api'.concat(workersUpdateRoute(id)), {
			headers: { 'Content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify(worker),
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(data => {
				console.log('data', data)
				if (data) {
					this.setState({ worker: data }, () =>
						console.log('this.state after update', this.state.worker),
					)
				}
			})
			.then(() => {
				this.getWorker(this.props.worker._id)
			})
			.then(() => {
				document.getElementById('email').value = ''
				document.getElementById('phoneNumber').value = ''
				document.getElementById('area').value = ''
				document.getElementById('image').value = ''
			})
			.catch(err => {
				console.log(err)
			})
	}
	updateUser(id, user) {
		fetch('/api'.concat(usersUpdateRoute(id)), {
			headers: { 'Content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify(user),
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText)
				return res.json()
			})
			.then(data => {
				console.log('data', data)
				if (data) {
					this.setState({ user: data }, () =>
						console.log('this.state after update', this.state.user),
					)
				}
			})
			.then(() => {
				this.getWorker(this.props.user._id)
			})
			.then(() => {
				document.getElementById('email').value = ''
				document.getElementById('phoneNumber').value = ''
				document.getElementById('area').value = ''
				document.getElementById('image').value = ''
			})
			.catch(err => {
				console.log(err)
			})
	}
	onEquipmentClick(e) {
		this.changeEquipment(e)
	}
	changeEquipment(type) {
		var worker = this.state.worker
		worker.equipment[type] = !worker.equipment[type]
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}
	onServicesClick(e) {
		this.changeService(e)
	}
	onAcceptRequestClick(id, request) {
		this.acceptRequest(id, request)
	}
	changeService(type) {
		var worker = this.state.worker
		worker.services[type] = !worker.services[type]
		this.setState(
			{
				worker: worker,
			},
			() => this.updateWorker(this.state.worker._id, this.state.worker),
		)
	}
	componentDidMount() {
		console.log('HELLO WORKD')
		this.getWorker(this.props.location.pathname.slice(9))
		this.getWorkerRequests(this.props.location.pathname.slice(9))
		this.getUserWorkerRequests(this.state.user._id, this.props.location.pathname.slice(9))
		this.getUserWorkerRequests(
			this.state.user._id,
			this.props.location.pathname.slice(9),
		)

		axios({
			method: 'get',
			url: '/api/session'
		}).then((res) => {
			console.log('kjlkjkljklj;', res)
			this.setState({ userId: res.data.user._id })
		}).catch(console.log)
		console.log(this.state, 'this is state')
	}
	render() {
		return (
			<div>
				<div>Worker profile</div>
				<div>{this.state.worker.firstName} {this.state.worker.lastName}</div>
				<WorkerInfo
					worker={this.state.worker}
					submitArea={this.submitArea}
					submitEmail={this.submitEmail}
					submitPhone={this.submitPhone}
					userId={this.state.userId}
				/>
				<EquipmentServicesInfo
					submitImage={this.submitImage}
					worker={this.state.worker}
					onEquipmentClick={this.onEquipmentClick}
					onServicesClick={this.onServicesClick}
					userId={this.state.userId}
				/>
				<RequestMaker
					updateRequest={this.updateRequest}
					user={this.state.user}
					worker={this.state.worker}
					addresses={this.state.user.addresses}
				/>
				<WorkerRequestList
					worker={this.state.worker}
					onAcceptRequestClick={this.onAcceptRequestClick}
					requests={this.state.userWorkerRequests}
				/>
			</div>
		)
	}
}

export default WorkerProfile
