import React, {useState, useEffect} from 'react';
import {Button, Container, Table, Spinner} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

//styles
import './Filters.sass';
import 'react-datepicker/dist/react-datepicker.css';

//Utils
import {apiCall} from '../../utils/axios';

//Fake Data
import {fakeData} from '../../fakeData';

export const Filters = () => {
	const [isLoading, setIsLoading] = useState(false);

	const getStats = async () => {
		setIsLoading(true);
		try {
			const res = await apiCall.getAllStats();
			console.log(res, 'res');
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<Calendars />
			<LoadBtn isLoading={isLoading} onClick={getStats} />
			<Tables data={fakeData} />
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
	return data.map((item) => <TableItem table={item} />);
};

const TableItem = ({table = {}}) => {
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
						<TableRow item={item} />
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
			<td>{item.callack}</td>
			<td className={'Table__rate'}>
				<input type="number" value={rate} onChange={handleRateChange} />
			</td>
		</tr>
	);
};

const Calendars = ({}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	return (
		<div className={'calendars__wrap'}>
			<div className="calendar">
				<span className={'calendar__title'}>From:</span>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
				/>
			</div>
			<div className="calendar">
				<span className={'calendar__title'}>To:</span>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
				/>
			</div>
		</div>
	);
};
