import React from 'react';
import './style.less';
import { HGroup } from '../group';
import cls from 'classnames';

import defaultAvatar from '../../assets/jack.png';
import {avatarMap} from '../../constants';

export default function Card(props) {
    
    const {data, style, className, onClick} = props;
    const { name, role, team, avatar } = data;

    function handleClick() {
        onClick(data);
    }

    const clz = cls('member-card', className);
    return (
        <HGroup hAlign="flex-start" className={clz} style={style} onClick={handleClick}>
            <img src={avatarMap[avatar]} alt="" className="avatar"></img>
            <div>
                <div className="main-title">{name}</div>
                <div className="sub-title">{role}</div>
                <div className="desc">{team}</div>
            </div>
        </HGroup>
    );
}

Card.defaultProps = {
    data: {},
    onClick: () => {}
}