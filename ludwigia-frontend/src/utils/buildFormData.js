export const buildFormData = (formData, data, parentKey) => {
    if (data == null) data = '';
    if ((typeof data === 'object') && !(data instanceof File)) {
        if (Array.isArray(data) && data.every(item => item instanceof File)) {
            data.forEach(file => {
                formData.append(parentKey, file)
            })
        } else {
            Object.keys(data).forEach(key => {
                buildFormData(
                    formData, data[key],
                    parentKey ? `${parentKey}[${key}]` : key
                );
            });
        }
    } else {
        formData.append(parentKey, data);
    }
}