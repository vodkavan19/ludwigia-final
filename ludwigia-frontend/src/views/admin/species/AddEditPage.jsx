import mammoth from 'mammoth';
import { Fragment, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router";
import { CustomStepConnector } from "~/components/themeMUI/customComponents";
import RouterBreadcrumbs from "~/components/ui/Breadcrumbs";
import { acceptWordFile } from "~/utils/acceptFileField";
import axiosPublic from "~/utils/axiosPublic";
import { convertDataSpeciesFile } from "~/utils/convertDataSpeciesFile";
import { Speed, UploadFileTwoTone } from "@mui/icons-material";
import { Box, Button, Paper, Step, StepLabel, Stepper, Tooltip, Typography } from "@mui/material";
import Benefit from "./form1/Benefit";
import Description from "./form1/Description";
import Distribution from "./form1/Distribution";
import Introduction from "./form1/Introduction";
import Microsurgery from "./form1/Microsurgery";
import Phytochemical from "./form1/Phytochemical";
import Reference from "./form1/Reference";
import * as initValue from "./initValueForm"

const BREADCRUMBS = [
    { label: 'Trang chủ', link: '/admin/' },
    { label: 'Loài thực vật', link: '/admin/species' }
];

const STEPS = [
    'Giới thiệu',
    'Mô tả',
    'Vi phẩu',
    'Phân bố sinh thái',
    'Hóa thực vật và hoạt tính sinh học',
    'Bộ phận dùng và công dụng',
    'Tài liệu tham khảo'
];

function AddEditPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [genusOptions, setGenusOptions] = useState([])
    const [selectFile, setSelectFile] = useState('')
    const [selectFileData, setSelectFileData] = useState(null)
    const navigate = useNavigate();
    const { state } = useLocation();
    var currentData = state?.data;

    useEffect(() => {
        const controler = new AbortController();

        axiosPublic
            .get('/genus/')
            .then((res) => {
                var options = res.map(
                    ({ _id: value, sci_name: label }) => ({ value, label })
                );
                setGenusOptions(options);
            })
            .catch(() => navigate('/internal-server-error'));

            return () => controler.abort();
    }, [navigate])   

    const generateDefaultValue = (initValue) => {
        var defaultValue = {}
        if(currentData) {
            const keys = Object.keys(initValue)
            keys.forEach(key => {
                if(key === 'genus_ref') {
                    defaultValue[key] = currentData[key]._id 
                } else if(key === 'microsurgerys') {
                    defaultValue[key] = currentData[key].map(item => {
                        return {
                            ...item,
                            explains: item.explains.map(explain => {
                                return { content: explain }; 
                            })
                        }
                    })
                } else {
                    defaultValue[key] = currentData[key]
                }
            });
        } else {
            defaultValue = { ...initValue }
        }
        return defaultValue;
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (genusOptions.length != 0) && (
                    <Introduction 
                        genusOptions={genusOptions}
                        defaultValues={generateDefaultValue(initValue.introduction)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.introduction)}
                        editId={currentData?._id}
                    />
                );
            case 1: 
                return (
                    <Description 
                        defaultValues={generateDefaultValue(initValue.description)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.description)}
                    />
                );
            case 2: 
                return (
                    <Microsurgery
                        defaultValues={generateDefaultValue(initValue.microsurgery)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.microsurgery)}
                    />
                );
            case 3: 
                return (
                    <Distribution
                        defaultValues={generateDefaultValue(initValue.distribution)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.distribution)}
                    />
                );
            case 4: 
                return (
                    <Phytochemical
                        defaultValues={generateDefaultValue(initValue.phytochemical)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.phytochemical)}
                    />
                );
            case 5: 
                return (
                    <Benefit
                        defaultValues={generateDefaultValue(initValue.benefit)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.benefit)}
                    />
                );
            case 6: 
                return (
                    <Reference
                        defaultValues={generateDefaultValue(initValue.reference)}
                        onStepChange={(val) => handleStepChange(val)}
                        fileData={getFileDataByForm(initValue.reference)}
                        editId={currentData?._id}
                    />
                );
        }
    }

    const handleStepChange = (index) => {
        setActiveStep(index);
    }

    const handleSpeciesWordFileChange = async (files) => {
        const file = files[0];
        setSelectFile(file)
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            await mammoth
                .extractRawText({ arrayBuffer: this.result })
                .then((result) => {
                    const speciesData = convertDataSpeciesFile(result.value)
                    setSelectFileData(speciesData)
                })
                .done();
        };
        fileReader.readAsArrayBuffer(file)
    }

    const getFileDataByForm = (formProperty) => {
        if(selectFileData !== null) {
            var result = {};
            const keys = Object.keys(formProperty)
            keys.forEach(key => {
                // eslint-disable-next-line no-prototype-builtins
                if (selectFileData.hasOwnProperty(key)) {
                  result[key] = selectFileData[key];
                }
            });
            return result;
        }
    }

    return (  
        <Fragment>
            <Box className="flex-between" alignItems="center">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        {(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : 'Chỉnh sửa Loài thực vật'
                        }
                    </Typography>
                    <RouterBreadcrumbs
                        prevLink={BREADCRUMBS}
                        homeIcon={<Speed />}
                        currentPage={(currentData == null)
                            ? 'Thêm Loài thực vật'
                            : 'Chỉnh sửa Loài thực vật'
                        }
                    />
                </Box>
                <Box className='flex-center'>
                    {(selectFile instanceof File) && (
                        <Box maxWidth={240} mr={1}>
                            <Typography variant='caption' fontStyle='italic' fontWeight={600}>
                                File đã chọn đễ đọc nội dung:
                            </Typography>
                            <Box display='flex' alignItems='center' justifyContent='end' color='text.accent1'>
                                <Typography variant="body2" fontWeight={500} className='text-eclipse one-line'>
                                    {selectFile.name.substring(0, selectFile.name.lastIndexOf("."))}
                                </Typography>
                                <Typography variant="body2" fontWeight={500} ml={0.125}>
                                    {selectFile.name.substring(selectFile.name.lastIndexOf("."))}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Dropzone accept={acceptWordFile} onDrop={handleSpeciesWordFileChange}>
                        {({ getRootProps, getInputProps }) => (
                            <Box {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Tooltip title={(selectFile instanceof File) && "Chọn lại File"} arrow>
                                    <span>
                                        <Button
                                            variant="outlined" size="large"
                                            startIcon={<UploadFileTwoTone />}
                                            sx={{ 
                                                boxShadow: 2, background: 'white',
                                                '& .MuiButton-startIcon': { mx: 0 } 
                                            }}
                                        >
                                            {!(selectFile instanceof File) && (
                                                <Box component='span' ml={1}>Đọc nội dung File</Box>
                                            )} 
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Box>
                        )}
                    </Dropzone>
                </Box>
            </Box>
            <Paper sx={{ mt: 1, p: 2 }} elevation={2}>
                <Box mx={-2}>
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        connector={<CustomStepConnector />}
                    >
                        {STEPS.map((label, idx) => (
                            <Step key={idx}>
                                <StepLabel /*onClick={() => handleStepChange(idx)}*/ >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box mt={1}>
                    {renderStepContent(activeStep)}
                </Box>
            </Paper>
        </Fragment>
    );
}

export default AddEditPage;