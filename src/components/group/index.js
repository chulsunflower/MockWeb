import React from 'react';
import cls from 'classnames';
import './style.less';

// horizontal layout components
function HGroup(props) {
    const { style, className, children, hAlign, vAlign, ...rest } = props;
    const finalClassName = cls('group','h-group', className);
    let finalStyle = style;
    if (hAlign) {
        finalStyle = {...style, justifyContent: hAlign};
    }
    if (vAlign) {
        finalStyle = { ...style, alignItems: vAlign };
    }
    
    return <div style={finalStyle} className={finalClassName} {...rest}>{children}</div>
}

// vertical layout components
function VGroup(props) {
    const { style, className, children, hAlign, vAlign, ...rest } = props;
    const finalClassName = cls('group','v-group', className);
    let finalStyle = style;
    if (hAlign) {
        finalStyle = {...style, alignItems: hAlign};
    }
    if (vAlign) {
        finalStyle = { ...style, justifyContent: vAlign };
    }
    return <div style={finalStyle} className={finalClassName} {...rest}>{children}</div>
}

export { HGroup, VGroup };