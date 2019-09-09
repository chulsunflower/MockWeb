import React from 'react';

import { Card, VGroup } from '../components';

const roleContainerStyle = {marginBottom: 10, width: '100%'};
const roleTitleStyle = { font: '15px Arial', fontWeight: 'bold', color: '#827e99', marginBottom: 10 };

export default function MemberList(props) {

    const { list, gap, onItemClick } = props;

    function renderRoleList(role, partialList, key) {
       return (
            <div style={roleContainerStyle} key={key}>
                <div style={roleTitleStyle}>
                    {role}
                </div>
                { partialList.map(item => <Card data={item} key={item.id} style={{ marginBottom: gap }} onClick={onItemClick}/>) }
            </div>
        );
    }

    const roleGroup = groupByRole(list);
    const elements =  Object.keys(roleGroup).map((role, index) => {
        const value = roleGroup[role];
        return renderRoleList(role, value, index);
    });

    return <VGroup vAlign="flex-start" style={{marginTop: 20}}>{elements}</VGroup>
        
}

MemberList.defaultProps = {
    list: [],
    gap: 20,
    onItemClick: () => {}
};

// group members by role
function groupByRole(data) {
    return data.reduce((acc, current) => {
        const { role } = current;
        if (role in acc) {
            acc[role].push(current);
        } else {
            acc[role] = [current];
        }
        return acc;
    }, {});
}