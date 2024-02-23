import React from 'react';
import { Tooltip } from '@nextui-org/react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoTooltip = ({ content }) => {
    return (
        <div className={`flex justify-center items-center select-none`}>
            <Tooltip
                hideArrow
                color='invert'
                offset={0}
                closeDelay={0}
                css={{ backgroundColor: '#f7f7f7', border: `1px solid #dbdbdb` }}
                content={<p className={`text-[12px] text-black`}>{content}</p>}>
                <HelpOutlineIcon className='text-[16px] text-[gray]' />
            </Tooltip>
        </div>
    )
}

export default InfoTooltip;