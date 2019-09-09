import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import title from './assets/affinityid-logo.svg';

import MemberList from './views/list';
import MemberInfo from './views/info';
import MemberEdit from './views/edit';

const titleStyle = {
	display: 'block', margin: '20px auto 20px', width: '100%'
}
const prevList = [{
    id: 0,
    name: 'Jack',
    role: 'admin',
    team: 'creative',
    avatar: 'jack',
	email: 'jack@hotmail.com',
	address: 'New York',
	city: 'New York'
}, {
    id: 1,
    name: 'Andy',
    role: 'employee',
    team: 'creative',
    avatar: 'andy',
	email: 'andy@hotmail.com',
	address: 'New York',
	city: 'New York'
}, {
    id: 2,
    name: 'Donna',
    role: 'admin',
    team: 'creative',
    avatar: 'donna',
	email: 'dona@hotmail.com',
	address: 'New York',
	city: 'New York'
}, {
    id: 3,
    name: 'Mary',
    role: 'admin',
    team: 'creative',
    avatar: 'mary',
	email: 'mary@hotmail.com',
	address: 'New York',
	city: 'New York'
},{
    id: 4,
    name: 'Victoria',
    role: 'admin',
    team: 'creative',
    avatar: 'victoria',
	email: 'victoria@hotmail.com',
	address: 'New York',
	city: 'New York'
}];

export default function App() {

	const [source, setSource] = useState(prevList);
	const [members, setMembers] = useState(prevList);
	const [selected, setSelected] = useState();
	const [editItem, setEditItem] = useState();
	const inputRef = useRef();

	useEffect(() => {
		const keyword = inputRef.current.value;
		const newMembers = source.filter(m => m.name.includes(keyword));
		setMembers(newMembers);
		setSelected(undefined);
	}, [source]);

	useEffect(() => {
		const preload = JSON.parse(localStorage.getItem('preload'));
		if (preload) {
			setSelected(preload);
			// consume
			localStorage.removeItem('preload');
		}
	}, []);

	function goCreate() {
		setSelected(undefined);
		setEditItem({});
	}

	function goEdit(item) {
		setEditItem(item);
		setSelected(undefined);
	}

	function handleSearch(e) {
		if (e.keyCode !== 13) return;
		const keyword = inputRef.current.value;
		const newMembers = source.filter(m => m.name.includes(keyword));
		setMembers(newMembers);
	}

	function handleItemClick(item) {
		setSelected(item);
		setEditItem(undefined);
	}

	function handleRemove(item) {
		const newSource = source.filter(it => it.id !== item.id);
		setSource(newSource);
	}

	function handleCreate(item) {
		const newSource = [...source, item];
		setSource(newSource);
		setSelected(undefined);
		setEditItem(undefined);
	}

	function handleUpdate(item) {
		const targetIndex = source.findIndex(it => it.id === item.id);
		const newSource = [...source.slice(0, targetIndex), item, ...source.slice(targetIndex + 1)];
		setSource(newSource);
		setSelected(undefined);
		setEditItem(undefined);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-4">
					<img src={title} alt="1" style={titleStyle}/>
				</div>
				<div className="col-sm-4">
					<button type="button" className="btn btn-dark" style={titleStyle} onClick={goCreate}>CREATE A NEW EMPLOYEE</button>
				</div>

			</div>

			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-4">
					<input className="form-control" ref={inputRef} type="search" onKeyDown={handleSearch} placeholder="Please input member's name"></input>
					<MemberList list={members} onItemClick={handleItemClick}></MemberList>
				</div>
				<div className="col-sm-4">
					{
						selected && <MemberInfo data={selected} onRemove={handleRemove} onEdit={goEdit}></MemberInfo>
					}
					{
						editItem && <MemberEdit data={editItem} onCreate={handleCreate} onUpdate={handleUpdate}/>
					}
				</div>
				<div className="col-sm-2"></div>
			</div>
		</div>
	);
}