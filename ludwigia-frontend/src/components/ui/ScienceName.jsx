import { Fragment } from 'react';

import Typography from '@mui/material/Typography';

const arrLabel = [
    'subspecies', 'ssp.', 'subsp.', 
    'varietas', 'variety', 'var.',
    'subvarietas', 'subvariety', 'subvar.', 
    'forma', 'form', 'f.',
    'subforma', 'subform', 'subf.'
]

function ScienceName({ name }) {

    const findPositionSpace = (idxSpace) => {
        var position = 0;
        for (let i = 1; i <= idxSpace; i++) {
            position = name.indexOf(' ', position + 1);
        }
        return position;
    }

    return (
        <Fragment>
            <Typography component='i'>
                {name.substring(0, findPositionSpace(2))}
            </Typography>
            {arrLabel.some(item => name.substring(findPositionSpace(2)).includes(item))
                ? (
                    <Fragment>
                        <Typography component='span' pl={.25}>
                            {name.substring(findPositionSpace(2), findPositionSpace(3))}
                        </Typography>
                        <Typography component='i'>
                            {name.substring(findPositionSpace(3), findPositionSpace(4))}
                        </Typography>
                        <Typography component='span' pl={.25}>
                            {name.substring(findPositionSpace(4))}
                        </Typography>
                    </Fragment>
                )
                : (
                    <Typography component='span' pl={.25}>
                        {name.substring(findPositionSpace(2))}
                    </Typography>
                )
            } 
        </Fragment>
    );
}

export default ScienceName;