import React, {useState, useEffect} from 'react';
import {Button, Container, Table, Spinner} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//styles
import './Filters.sass';
import 'react-datepicker/dist/react-datepicker.css';

//Utils
import {apiCall} from '../../utils/axios';

//Fake Data
import {fakeData} from '../../fakeData';

const prepareDate = (date, type = '') => {
	const minutes = type === 'start' ? '00:00:00' : '23:59:59';
	return moment(date).format(`YYYY-MM-DD ${minutes}`);
};

export const Filters = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [startDate, setStartDate] = useState(
		prepareDate(Date.now(), 'start')
	);
	const [endDate, setEndDate] = useState(prepareDate(Date.now()));
	const [clientName, setClientName] = useState('');
	const [supplierName, setSupplierName] = useState('');
	const [statistics, setStatistics] = useState([]);

	const getStats = async () => {
		setStatistics([]);
		setIsLoading(true);
		try {
			const data = {
				client: '',
				supplier: '',
				period: {
					startDate,
					endDate,
				},
			};
			const res = await apiCall.getAllStats(JSON.stringify(data));
			setStatistics(res.response.body.clientStatistics || []);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<Calendars
				onStartDateSelect={(date) => {
					setStartDate(prepareDate(date, 'start'));
				}}
				onEndDateSelect={(date) => {
					setEndDate(prepareDate(date));
				}}
			/>
			<LoadBtn isLoading={isLoading} onClick={getStats} />
			<Tables data={statistics} />
		</Container>
	);
};

const LoadBtn = ({isLoading = false, onClick = () => {}}) => {
	return (
		<div className={'Filters__laod-btn-wrap'}>
			{isLoading ? (
				<Button
					onClick={onClick}
					variant="danger"
					disabled
					className="Filters__laod-btn"
				>
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					<span> Loading...</span>
				</Button>
			) : (
				<Button
					onClick={onClick}
					variant="danger"
					className="Filters__laod-btn"
				>
					<span>Load</span>
				</Button>
			)}
		</div>
	);
};

const Tables = ({data}) => {
	return data.map((item, idx) => (
		<TableItem table={item} key={`${item.name}${Math.random() * idx}`} />
	));
};

const TableItem = ({table = {}, idx}) => {
	return (
		<>
			<div className={'Table__title'}>
				<span className={'Table__title-item'}>
					<b>{table?.name}</b>
				</span>
				<span className={'Table__title-item'}>
					total: <b>{table?.totalDuration}</b>
				</span>
			</div>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Code</th>
						<th>Calls</th>
						<th>Min</th>
						<th>Usage</th>
						<th>asd</th>
						<th>acd</th>
						<th>callback</th>
						<th>rate</th>
					</tr>
				</thead>
				<tbody>
					{table.destinations.map((item) => (
						<TableRow item={item} key={`${Math.random() * 100}`} />
					))}
				</tbody>
			</Table>
		</>
	);
};

const TableRow = ({item}) => {
	const [rate, setRate] = useState(1);
	const [usage, setUsage] = useState(1);

	const handleRateChange = (newVal) => {
		setRate(newVal.target.value);
	};

	useEffect(() => {
		const res = rate * +item.durationInMinutes;
		setUsage(res.toFixed(3));
	}, [rate]);

	return (
		<tr>
			<td>{item.destinationCode}</td>
			<td>{item.calls}</td>
			<td>{item.durationInMinutes}</td>
			<td>{usage}</td>
			<td>{item.asr}</td>
			<td>{item.acd}</td>
			<td>{item.callBack}</td>
			<td className={'Table__rate'}>
				<input type="number" value={rate} onChange={handleRateChange} />
			</td>
		</tr>
	);
};

const Calendars = ({
	onStartDateSelect = () => {},
	onEndDateSelect = () => {},
}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const handleDateSelection = (type = 'end', date) => {
		if (type === 'end') {
			setEndDate(date);
			onEndDateSelect(date);
		} else {
			setStartDate(date);
			onStartDateSelect(date);
		}
	};

	return (
		<div className={'calendars__wrap'}>
			<div className="calendar">
				<span className={'calendar__title'}>From:</span>
				<DatePicker
					selected={startDate}
					onChange={(date) => handleDateSelection('start', date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
			</div>
			<div className="calendar">
				<span className={'calendar__title'}>To:</span>
				<DatePicker
					selected={endDate}
					onChange={(date) => handleDateSelection('end', date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
			</div>
		</div>
	);
};
