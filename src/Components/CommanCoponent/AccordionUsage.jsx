import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

export default function AccordionUsage({ messageHeading, aboutMessage }) {
    const darkModeState = useSelector((state) => state.darkMode)
    return (
        <div>
            <Accordion sx={{ boxShadow: 'none', backgroundColor: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor }}>

                <Typography sx={{ width: '100%' }}>
                    <div className='pr-4 pl-5 font-bold' style={{ fontSize: '13px' }}>
                        {messageHeading}
                    </div>
                    <AccordionSummary >
                        <div className="flex justify-end w-full" aria-controls="panel1-content" id="panel1-header">
                            <button className="bg-gray-300 rounded font-bold px-1" style={{ fontSize: '9px' }}>
                                Details <ExpandMoreIcon style={{ fontSize: '9px' }} />
                            </button>
                        </div>
                    </AccordionSummary>
                </Typography>
                <AccordionDetails>
                    <hr />
                    <div className='pr-4 pl-5 font-bold' style={{ fontSize: '13px' }}>
                        {aboutMessage}
                    </div>


                </AccordionDetails>
            </Accordion>
        </div>
    );
}
