import CategorySchema from "./Category.schema.js";



export const addCategory = newCat =>{
    console.log(newCat, "from model");
    return CategorySchema(newCat).save();
    
};

export const getAllCats = () =>{
    return CategorySchema.find();
};

export const getACat = (_id) =>{
    return CategorySchema.findById(_id);
};

export const deleteCat = (_id) =>{
    return CategorySchema.findByIdAndDelete(_id);
};


export const updateCat = ({_id, ...rest}) =>{
    return CategorySchema.findByIdAndUpdate(_id, rest, {new: true });
};
