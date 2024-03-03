import axiosPublic from "./axiosPublic";
import { setTempEditorImageIds } from "~/redux/slices/tempImage.slice";

class CustomUploadAdapter {
    constructor(loader, uploadUrl, dispatch) {
        this.loader = loader;
        this.uploadUrl = uploadUrl;
        this.dispatch = dispatch;
    }

    upload() {
        return this.loader.file
            .then(async file => {
                const formData = new FormData();
                formData.append('file', file);

                return await axiosPublic
                    .post(this.uploadUrl, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    .then(res => {
                        if(res && res.fileUrl) {
                            this.dispatch(setTempEditorImageIds(res.fileId))
                            return {
                                default: res.fileUrl
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        throw new Error('Đã có lỗi xảy ra')
                    })
            })
    }
}

export default CustomUploadAdapter;