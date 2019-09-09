import React, { useEffect } from 'react';
import { VGroup, HGroup } from '../components'
import { avatarMap } from '../constants'
import './style.less';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons'

const noop = () => {};

export default function MemberInfo(props) {

    const { data, style, onEdit, onRemove } = props;
    const { id, name, role, team, avatar, address, city, email, className } = data;

    function handleEdit() {
        onEdit(data);
    }

    function handleRemove() {
        onRemove(data);
    }

    function handleShare() {
        const info = JSON.stringify(data);
        copy(info);
        localStorage.setItem('preload', info);
        alert('copy success');
    }

    return (
        <VGroup className="member-info">
            <img src={avatarMap[avatar]} alt="" className="avatar"/>
            <div className="name">{name}</div>
            <div className="email">{email}</div>
            <HGroup className="edit">
                
                <i className="icon" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPen} />
                </i>
                <i className="icon" onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTimes} className="delete"/>
                </i>
            </HGroup>
            <div className="sep"></div>
            <HGroup className="item" hAlign="space-between">
                <div>
                    <div className="role-title">Role</div>
                    <div>{role}</div>
                </div>
                <div>
                    <div className="role-title">Team</div>
                    <div>{team}</div>
                </div>
            </HGroup>
            <div className="sep"></div>
            <HGroup className="item" hAlign="space-between">
                <div>
                    <div className="role-title">Address</div>
                    <div>{address}</div>
                </div>
                <div>
                    <div className="role-title">City</div>
                    <div>{city}</div>
                </div>
            </HGroup>
            <button type="button" className="btn btn-secondary share-btn" onClick={handleShare}>SHARE</button>
        </VGroup>
    );
}

MemberInfo.defaultProps = {
    data: [],
    onEdit: noop,
    onRemove: noop
};