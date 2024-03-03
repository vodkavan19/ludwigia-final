import { Link } from 'react-router-dom';

import * as Scroll from 'react-scroll';
import { Link as LinkScroll } from 'react-scroll'

import Typography from '@mui/material/Typography';
import blue from '@mui/material/colors/blue';
import yellow from '@mui/material/colors/yellow';

const QuoteContainer = ({ children, quote, quoteLink }) => {
    if (quoteLink !== '') {
        return (
            <Link to={quoteLink} target='_blank'>
                {children}
            </Link>
        )
    } else {
        return (
            <LinkScroll to={`reference-${quote}`} spy={true} smooth={true} offset={-80} duration={1000}>
                {children}
            </LinkScroll>
        )
    }
}

function Quote({ quote, quoteLink }) {
    Scroll.Events.scrollEvent.register('end', (to, element) => {
        if((/^reference-\d+$/).test(element.id)) {
            element.style.background = yellow[200]
            element.style.transition= 'background 400ms ease-in-out'
            setTimeout(() => {
                element.style.background = 'unset'
            }, 1200)
        }
    });
    
    return (
        <QuoteContainer quote={quote} quoteLink={quoteLink}>
            <Typography
                component='span' ml={.5}
                color={blue[900]} fontFamily='var(--poppins-font)'
                sx={{
                    cursor: 'pointer',
                    '&:hover': { color: blue[400] }
                }}
            >
                {`[${quote}]`}
            </Typography>
        </QuoteContainer>
    );
}

export default Quote;