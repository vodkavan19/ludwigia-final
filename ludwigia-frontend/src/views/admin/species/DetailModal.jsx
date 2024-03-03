import { ArrowBack, ArrowForward, Clear, HorizontalRule } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import Slide from '@mui/material/Slide';
import { Fragment, forwardRef, useImperativeHandle, useState } from "react";

import Intro from "~/views/client/species/content/Intro";
import Description from "~/views/client/species/content/Description";
import Microsurgery from "~/views/client/species/content/Microsurgery";
import Distribution from "~/views/client/species/content/Distribution";
import Phytochemicals from "~/views/client/species/content/Phytochemicals";
import Benifits from '~/views/client/species/content/Benefits';
import References from "~/views/client/species/content/References";

function DetailModal(props, ref) {
    const [open, setOpen] = useState(false)
    const [dataSpecies, setDataSpecies] = useState(null)
    const [step, setStep] = useState(1)
    
    useImperativeHandle(ref, () => ({
        onOpenDialog: handleOpenDialog
    }))

    const handleOpenDialog = (data) => {
        setOpen(true),
        setDataSpecies(data)
    }

    const handleCloseDialog = (data) => {
        setStep(1)
        setDataSpecies(null)
        setOpen(false)
    }

    return (  
        <Dialog
            open={open}
            maxWidth='xl'
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            {(dataSpecies) && (
                <Fragment>
                    <DialogTitle 
                        sx={{ py: 1 ,color: 'text.accent1', fontWeight: 700 }} 
                        className="flex-between"
                    >
                        {dataSpecies.short_name}
                        <IconButton onClick={handleCloseDialog}>
                            <Clear />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ height: '75vh' }}>
                        <Slide direction="right" in={step === 1} mountOnEnter unmountOnExit>
                            <Box>
                                <Intro data={dataSpecies} />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 2} mountOnEnter unmountOnExit>
                            <Box>
                                <Description
                                    data={dataSpecies.description}
                                    references={dataSpecies.references}
                                />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 3} mountOnEnter unmountOnExit>
                            <Box>
                                <Microsurgery data={dataSpecies.microsurgerys} />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 4} mountOnEnter unmountOnExit>
                            <Box>
                                <Distribution
                                    data={dataSpecies.distribution}
                                    references={dataSpecies.references}
                                />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 5} mountOnEnter unmountOnExit>
                            <Box>
                                <Phytochemicals
                                    data={dataSpecies.phytochemicals}
                                    references={dataSpecies.references}
                                />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 6} mountOnEnter unmountOnExit>
                            <Box>
                                <Benifits
                                    data={dataSpecies.benefits}
                                    references={dataSpecies.references}
                                />
                            </Box>
                        </Slide>
                        <Slide direction="right" in={step === 7} mountOnEnter unmountOnExit>
                            <Box>
                                <References data={dataSpecies.references} />
                            </Box>
                        </Slide>
                    </DialogContent>
                    <DialogActions 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => setStep(prev => prev - 1)}
                            disabled={(step === 1)}
                        >
                            Quay lại
                        </Button>
                        <Box>
                            {Array.from({ length: 7 }, (_, idx) => idx + 1).map(item => (
                                <HorizontalRule 
                                    key={item}
                                    fontSize="large" 
                                    sx={{ 
                                        color: (item !== step) ? grey[500] : 'text.accent1' 
                                    }} 
                                />
                            ))}
                        </Box>
                        <Button
                            endIcon={<ArrowForward />}
                            onClick={() => setStep(prev => prev + 1)}
                            disabled={(step === 7)}
                        >
                            Tiếp theo
                        </Button>
                    </DialogActions>
                </Fragment>
            )}
        </Dialog>
    );
}

export default forwardRef(DetailModal);