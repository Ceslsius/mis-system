/****************************************************************
 * created by Celsius on 2020-08-11 for application entry file
 ****************************************************************/

/** 封装暴露文件上传接口 */
export const fileUpload = async isMulti => {
    let result = await UploadMethod(isMulti).catch(e => {
        return e;
    });
    if (result) return result;
};

/** 定义文件上传方法 */
const UploadMethod = isMulti => {
    return new Promise((resolve, reject) => {
        /** 创建一个input 元素 */
        let input = document.createElement('input');

        /** 设置通用样式和类型 */
        input.setAttribute('style', ';width: 0; height: 0; overflow: hidden;');
        input.setAttribute('type', 'file');

        /** 是否可以多选 */
        if (isMulti) input.setAttribute('multiple', 'multiple');
        document.body.appendChild(input);

        /** 对change 实践监听 */
        input.addEventListener('change', () => {

            /** 拿到input 元素里边的文件对象 */
            let files = input.files;
            if (files.length > 0) {
                resolve({code: 200, data: files});
            } else {
                reject({code: 400});
            }
        });

        /** 主动触发点击事件 */
        input.click();
    });
}