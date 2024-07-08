import React from 'react';
import { ToolButtons } from '../components';
import { services } from '../constants';

const Tools = () => {
    return (
        <div id="Tools" className='max-container flex flex-wrap justify-center gap-9'>
            {services.map((tools, index) => (
                <ToolButtons key={tools.label} index={index} {...tools} />
            ))}
        </div>
    );
}

export default Tools;