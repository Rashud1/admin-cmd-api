import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({
    status:{
        type: Boolean,
        default: false,
        required: true,
        maxLength: 100,
    },
    title:{
     type: Boolean,
        default: false,
        required: true
    },
    price:{
     type: Boolean,
        default: false,
        required: true
    },
    salePrice:{
     type: Number,
        default: 0,
        max: 10000,
        
        
    },
    saleStartDate:{
     type: Boolean,
        default: false,
        
        
    },
    saleEndDate:{
         type: Date,
        default: null,
        
    },
    brand:{
         type: Number,
        default: "",
        maxLength: 50,
        
        
    },
    qty:{
         type: Boolean,
        default: 0,
        required: true
    }, 
    status:{
         type: Boolean,
        default: false,
        required: true
    }, 
    thumbnail:{ 
        type: String,
        default: false,
        maxLength:1000,
      
    },
    images:{
         type: Array,
        
    } ,
    description:{
         type: String,
        default: "",
        required: true,
        maxLength:3000,
    },

    categories:{
    type: Array
     }, 

    slug:{
    type:String,
    required: true,
    maxLength:100,
    default:"",
    unique: true,
    index: 1,
},
},
{
    timestamps: true,
}
    
)



export default mongoose.model("Product", ProductSchema)