import React, { useState, useMemo } from 'react';
import { VGroup } from '../components';
import { avatarMap } from '../constants';

const noop = () => {};

export default function MemberEdit(props) {
    const { data, onCreate, onUpdate } = props;
    const { avatar, name, email, role, team, address } = data;

    const [params, setParams] = useState({ avatar, name, email, role, team, address });
    const isCreate = useMemo(() => Object.keys(data).length === 0, [data]);

    function handleChange(name) {
        return e => {
            setParams({ ...params, [name]: e.target.value || e.target.selected });
        }
    }

    function handleSave() {
        const invalid = Object.keys(params).some(key => isEmpty(params[key]));
        if (invalid) {
            return alert('Please ensure your input is correct!');
        }

        const id = Math.random() + Date.now();
        isCreate ? onCreate({id, ...params}) : onUpdate({...data, ...params});
    }

    return (
        <VGroup className="member-edit" vAlign="flex-start">
             <div className="form-group form-item">
                <label>Profile image</label>
                <select className="form-control" value={params.avatar} onChange={handleChange('avatar')}>
                    <option value=''>Please select a profile image</option>
                    { Object.keys(avatarMap).map(key => <option key={key} value={key}>{key}</option>) }
                </select>
            </div>

            <div className="form-group form-item">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter name" value={params.name} onChange={handleChange('name')}/>
            </div>

            <div className="form-group form-item">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={params.email} onChange={handleChange('email')}/>
            </div>

            <div className="form-group form-item">
                <label>Role</label>
                <select className="form-control" value={params.role} onChange={handleChange('role')}>
                    <option value=''>Please select a role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </select>
            </div>

            <div className="form-group form-item">
                <label>Team</label>
                <select className="form-control" value={params.team} onChange={handleChange('team')}>
                    <option value=''>Please select a team</option>
                    <option value="creative">creative</option>
                    <option value="management">management</option>
                    <option value="finance">finance</option>
                </select>
            </div>

            <div className="form-group form-item">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Enter address" value={params.address} onChange={handleChange('address')}/>
            </div>

            <button className="btn btn-success save-btn" onClick={handleSave}>{isCreate ? 'CREATE' : 'UPDATE'} EMPLOYEE</button>
        </VGroup>
    );
}

MemberEdit.defaultProps = {
    data: {},
    onCreate: noop,
    onUpdate: noop
};


function isEmpty(data) {
    return data == null || (typeof data === 'string' && data.trim() === '');
}