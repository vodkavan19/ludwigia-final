import { Fragment } from 'react';

import parse from 'html-react-parser';
import reactStringReplace from 'react-string-replace';

import Quote from './Quote';

function StringHasQuote({ htmlStr, references }) {
    const quotePattern = /\[(\d+)\]/g

    const parsedHtml = parse(htmlStr, {
        replace: (node) => {
            if (node.type === 'text' && quotePattern.test(node.data)) {
                return (
                    <Fragment>
                        {reactStringReplace(node.data, quotePattern, (item, idx) => (
                            <Quote
                                key={idx}
                                quote={parseInt(item)}
                                quoteLink={references[parseInt(item) - 1].link}
                            />
                        ))}
                    </Fragment>
                )
            }
            return node;
        }
    });

    return (
        <Fragment>
            {parsedHtml}
        </Fragment>
    )
}

export default StringHasQuote;