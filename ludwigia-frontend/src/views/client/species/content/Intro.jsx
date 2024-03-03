import { Fragment } from 'react';
import ContentCollapse from '~/components/ui/ContentCollapse';
import Quote from '~/components/ui/Quote';
import ScienceName from '~/components/ui/ScienceName';
import StringHasQuote from '~/components/ui/StringHasQuote';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

function Intro({ data }) {

    return (
        <Grid container columns={16} spacing={6}>
            <Grid xs={10}>
                <Box display='flex' alignItems='center'>
                    <Typography color='text.accent1' fontWeight={700} mr={1}>Tên khoa học:</Typography>
                    <Box fontStyle='italic'><ScienceName name={data.sci_name} /></Box>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' fontWeight={700} mr={1.5} sx={{ whiteSpace: 'nowrap' }}>Tên khác:</Typography>
                    <ContentCollapse 
                        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} 
                    >
                        {data.other_name.map((item, idx) => (
                            <Box key={idx}>
                                <ScienceName name={item.name} />
                                {item.reference && (
                                    <Quote
                                        quote={item.reference}
                                        quoteLink={data.references[item.reference - 1].link}
                                    />
                                )}
                            </Box>
                        ))}
                    </ContentCollapse>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' component='span' fontWeight={700} mr={1} sx={{ whiteSpace: 'nowrap' }}>
                        Tên tiếng Việt:
                    </Typography>
                    <Box>
                        {data.vie_name.map((item, idx) => (
                            <Fragment key={idx}>
                                <Typography component='span'>{item.name}</Typography>
                                {item.reference && (
                                    <Quote
                                        quote={item.reference}
                                        quoteLink={data.references[item.reference - 1].link}
                                    />
                                )}
                                {idx !== data.vie_name.length - 1 ? ', ' : '.'}
                            </Fragment>
                        ))}
                    </Box>
                </Box>
                <Box mt={2} display='flex'>
                    <Typography color='text.accent1' component='span' fontWeight={700} mr={1}>
                        Họ:
                    </Typography>
                    <Box>
                        <StringHasQuote
                            htmlStr={data.family_description}
                            references={data.references}
                        />
                    </Box>
                </Box>
                {(data.author !== '' && data.debut_year) && (
                    <Box mt={2}>
                        <Typography component='i' mr={.75}>{data.short_name}</Typography>
                        được {data.author} mô tả lần đầu tiên năm {data.debut_year}.
                    </Box>
                )}
                <Box mt={2}>
                    <Typography component='i' mr={.75}>{data.short_name}</Typography>
                    được phân loại theo hệ thống của Takhtajan như sau:
                    {Object.values(data.takhtajan_system).map((level, idx) => (
                        <Box key={idx} ml={8 + (idx * 3.5)} mt={.5}>
                            <Typography component='span' color='text.accent1' fontWeight={700} mr={1}>
                                {level.name || 'Loài'}
                            </Typography>
                            <Typography component={level.name ? 'span' : 'i'}>
                                {`(${level.nomenclature})`}
                            </Typography>
                            {level.reference && (
                                <Quote
                                    quote={level.reference}
                                    quoteLink={data.references[level.reference - 1].link}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Grid>
            <Grid xs={6}>
                <Box
                    width='100%' maxHeight='75%' mt={6}
                    borderRadius='8px' overflow='hidden'
                    sx={{ aspectRatio: 1/1, boxShadow: 4 }}
                >
                    <Box
                        component='img'
                        src={data.avatar.fileUrl} alt=''
                        width='100%' height='100%'
                        sx={{ objectFit: 'cover' }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Intro;