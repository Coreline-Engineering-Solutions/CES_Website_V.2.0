import React from 'react';
import { ToolButtons } from '../components';
import { DashboardServices } from '../constants';

const Tools = () => {
    return (
        <div id="Tools" className='max-container flex flex-wrap justify-center gap-9'>
            {DashboardServices.map((tools, index) => (
                <ToolButtons key={tools.label} index={index} {...tools} />
            ))}
        </div>
    );
}

export default Tools;