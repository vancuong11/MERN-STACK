export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

export const renderOptions = (options) => {
    let result = [];
    if (options) {
        result = options.map((opt) => {
            return {
                value: opt,
                label: options.opt,
            };
        });
    }
    result.push({
        label: 'Thêm type',
        value: 'add_type',
    });
    return result;
};
