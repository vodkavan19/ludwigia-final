import * as Yup from 'yup';

export const VALIDATE_INTRODUCTION_FORM = Yup.object().shape({
    genus_ref: Yup.string().trim()
        .required('Vui lòng chọn một trong các lựa chọn!'),
    sci_name: Yup.string().trim()
        .required('Vui lòng không để trống trường này!'),
    author: Yup.string().trim()
        .required('Vui lòng không để trống trường này!'),
    debut_year: Yup.string().trim()
        .max(4, 'Vui lòng nhập năm đúng định dạng!'),
    avatar: Yup.mixed()
        .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
            if (typeof value === 'object' && value.fileUrl) return true;
            return value && value.length;
        })
        .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
            if (typeof value === 'object' && value.fileUrl) return true;
            return value && (value[0].size <= 5 * 1024 * 1024)
        }),
    other_name: Yup.array()
        .of(Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        })),
    vie_name: Yup.array()
        .of(Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        })),
    family_description: Yup.string().trim()
        .required('Vui lòng không để trống trường này!'),
    takhtajan_system: Yup.object().shape({
        kingdom: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        division: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        layer: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        order: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        family: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        genus: Yup.object().shape({
            name: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        }),
        species: Yup.object().shape({
            nomenclature: Yup.string().trim()
                .required('Vui lòng không để trống trường này!')
        })
    }),
})

export const VALIDATE_DESCRIPTION_FORM = Yup.object().shape({
    description: Yup.string().trim()
        .required('Vui lòng không để trống trường này!')
})

export const VALIDATE_MICROSURGERY_FORM = Yup.object().shape({
    microsurgerys: Yup.array()
        .of(Yup.object().shape({
            image: Yup.mixed()
                .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && value.length;
                })
                .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && (value[0].size <= 5 * 1024 * 1024)
                }),
            caption: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
        })),
})
   
export const VALIDATE_DISTRIBUTION_FORM = Yup.object().shape({
    distribution: Yup.string().trim()
        .required('Vui lòng không để trống trường này!'),
})
    

export const VALIDATE_PHYTOCHEMICAL_FORM = Yup.object().shape({
    phytochemicals: Yup.array()
        .of(Yup.object().shape({
            bio_active: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            chemical_group: Yup.string().trim(),
            segment: Yup.string().trim(),
            physical_properties: Yup.string().trim(),
            spectrum: Yup.array()
                .of(Yup.string().trim())
                .min(1, 'Vui lòng không để trống trường này!'),
            chemical_structure: Yup.mixed()
                .test('required', 'Vui lòng chọn hình ảnh tải lên!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && value.length;
                })
                .test('fileSize', 'Dung lượng hình ảnh vượt quá 5 MB!', value => {
                    if (typeof value === 'object' && value.fileUrl) return true;
                    return value && (value[0].size <= 5 * 1024 * 1024)
                }),
            pharma_effect: Yup.string().trim().trim()
        })),
})
    
export const VALIDATE_BENEFIT_FORM = Yup.object().shape({
    benefits: Yup.string().trim()
        .required('Vui lòng không để trống trường này!'),
})
    

export const VALIDATE_REFERENCE_FORM = Yup.object().shape({
    references: Yup.array()
        .of(Yup.object().shape({
            content: Yup.string().trim()
                .required('Vui lòng không để trống trường này!'),
            link: Yup.string().trim()
                .url('Vui lòng nhập đúng định dạng một URL!')
        }))
})