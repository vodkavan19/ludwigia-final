export const introduction = {
    genus_ref: '',
    sci_name: '',
    author: '',
    debut_year: '',
    avatar: '',
    other_name: [{
        name: '',
        reference: ''
    }],
    vie_name: [{
        name: '', 
        reference: '' 
    }],
    family_description: '',
    takhtajan_system: {
        kingdom: {
            name: '',
            nomenclature: '', 
            reference: '' 
        },
        division: { 
            name: '',
            nomenclature: '',
            reference: '' 
        },
        layer: { 
            name: '',
            nomenclature: '',
            reference: '' 
        },
        order: { 
            name: '',
            nomenclature: '',
            reference: '' 
        },
        family: { 
            name: '',
            nomenclature: '',
            reference: '' 
        },
        genus: { 
            name: '',
            nomenclature: '',
            reference: '' 
        },
        species: { 
            nomenclature: '',
            reference: '' 
        }
    },
}

export const description = { 
    description: ''
}

export const microsurgery = {
    microsurgerys: [{ 
        image: '', 
        caption: '', 
        explains: [{
            content: ''
        }] 
    }]
}

export const distribution = {
    distribution: '',
}

export const phytochemical = {
    phytochemicals: [{
        bio_active: '',
        bio_reference: '',
        chemical_group: '',
        segment: '',
        physical_properties: '',
        spectrum: [],
        chemical_structure: '',
        pharma_effect: ''
    }],
}

export const benefit = {
    benefits: '',
}

export const reference = {
    references: [{
        content: '', 
        link: '' 
    }]
}

export const all = {
    ...introduction,
    ...description,
    ...microsurgery,
    ...distribution,
    ...phytochemical,
    ...benefit,
    ...reference
}