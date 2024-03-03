import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import teal from '@mui/material/colors/teal';

import Quote from '~/components/ui/Quote';
import StringHasQuote from '~/components/ui/StringHasQuote';

function Phytochemicals({ data, references }) {

    const dataByGroup = data.reduce((groups, current) => {
        const index = groups.findIndex(item => item.group === current.chemical_group);
        if (index === -1) {
            groups.push({ group: current.chemical_group, elements: [current] });
        } else {
            groups[index].elements.push(current);
        }
        return groups;  
    }, []);

    return (data.length === 1 && data[0].bio_active.toLowerCase() === 'chưa được công bố') 
        ? (<Box textAlign='center' pb={6} mt={4}>Chưa được công bố</Box>)
        : (
        <Box 
            sx={{ 
                '& table, & th, & td': {
                    fontSize: 16,
                    border: '4px solid white',
                    backgroundColor: teal[50],
                },
                '& th, & td': {
                    p: 1, 
                    '& *': { 
                        margin: '0px !important',
                        px: 0,
                        '&:not(:last-child)': {
                            paddingBottom: 1
                        }
                    },
                    '& ul': {
                        paddingLeft: 2.5
                    },
                },
                '& th': {
                    fontWeight: 600,
                    textAlign: 'center',
                }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width='10%'>Hoạt chất</TableCell>
                        <TableCell width='9%'>Phân đoạn</TableCell>
                        <TableCell width='24%'>Tính chất vật lý</TableCell>
                        <TableCell width='9%'>Quang phổ</TableCell>
                        <TableCell width='24%'>Cấu trúc hóa học</TableCell>
                        <TableCell width='24%'>Hoạt tính sinh học</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataByGroup && dataByGroup.map((groupData, index) => (
                        <Fragment key={index}>
                            <TableRow>
                                <TableCell colSpan={6} sx={{ bgcolor: `${teal[500]} !important` }}>
                                    <Typography 
                                        variant='h6' lineHeight={1.2} textAlign='center'
                                        fontWeight={700} fontStyle='italic' color='white' 
                                    >
                                        {groupData.group !== '' ? groupData.group : 'Các hợp chất khác'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            {groupData.elements.map((element, idx) => (
                                <TableRow key={idx}>
                                    <TableCell align='center'>
                                        {element.bio_active} 
                                        {element.bio_reference && (
                                            <Quote
                                                quote={element.bio_reference}
                                                quoteLink={references[element.bio_reference - 1].link}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {(element.segment !== '') ? element.segment : 'Chưa được đề cập'}
                                    </TableCell>
                                    <TableCell>
                                        {(element.physical_properties !== '') 
                                            ? (
                                                <StringHasQuote
                                                    htmlStr={element.physical_properties}
                                                    references={references}
                                                />
                                            ) 
                                            : 'Chưa được công bố'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {element.spectrum.map((item, i) => (
                                            <Box key={i}>{item}</Box>
                                        ))}
                                    </TableCell>
                                    <TableCell align='center' sx={{ backgroundColor: 'white !important' }}>
                                        <Box 
                                            component='img' width='100%'
                                            src={element.chemical_structure.fileUrl} alt=''
                                        />
                                    </TableCell>
                                    <TableCell sx={{ alignItems: 'justify' }}>
                                        {(element.pharma_effect !== '')
                                            ? (
                                                <StringHasQuote
                                                    htmlStr={element.pharma_effect}
                                                    references={references}
                                                />
                                            )
                                            : 'Chưa được công bố'
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export default Phytochemicals;