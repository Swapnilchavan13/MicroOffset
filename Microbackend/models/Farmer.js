const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema(
{
    stageNumber:{
        type:Number,
        required:true
    },

    fertilizerName:{
        type:String,
        default:""
    },

    areaApplied:{
        type:String,
        default:""
    },

    remarks:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:""
    },

    video:{
        type:String,
        default:""
    },

    location:{
        latitude:Number,
        longitude:Number,
        address:String
    },

    submittedAt:{
        type:Date,
        default:Date.now
    }
},
{
    _id:false
}
);

/* ------------------------- */
/* Fertilizer Record */
/* ------------------------- */

const FertilizerRecordSchema=new mongoose.Schema({

    fertilizerName:String,

    quantity:Number,

    unit:String,

    image:String,

    latitude:Number,

    longitude:Number,

    remarks:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

},{_id:false});


/* ------------------------- */
/* Water Record */
/* ------------------------- */

const WaterRecordSchema=new mongoose.Schema({

    irrigationType:String,

    motorPower:String,

    startTime:String,

    endTime:String,

    duration:Number,

    estimatedWater:Number,

    image:String,

    latitude:Number,

    longitude:Number,

    remarks:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

},{_id:false});


/* ------------------------- */
/* Harvest Record */
/* ------------------------- */

const HarvestRecordSchema=new mongoose.Schema({

    crop:String,

    yield:Number,

    unit:String,

    image:String,

    latitude:Number,

    longitude:Number,

    remarks:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

},{_id:false});



const FarmerSchema=new mongoose.Schema({

/* ========================= */
/* Registration */
/* ========================= */

farmerId:String,

villageCode:String,

formDate:{
    type:Date,
    default:Date.now
},

fieldOfficer:String,

fieldOfficerMobile:String,



/* ========================= */
/* Personal */
/* ========================= */

name:{
    type:String,
    required:true
},

fatherName:String,

mobileNumber:{
    type:String,
    required:true,
    unique:true
},

whatsappNumber:String,

age:String,

village:String,

post:String,

tehsil:String,

district:String,

state:{
    type:String,
    default:"Uttar Pradesh"
},



/* ========================= */
/* Farm */
/* ========================= */

totalLandAcre:Number,

totalLandBigha:Number,

b3AreaAcre:Number,

b3AreaBigha:Number,

khasraNumber:String,

cropName:String,

soilType:String,

soilTestDone:Boolean,



/* ========================= */
/* Irrigation */
/* ========================= */

irrigationSource:String,

motorPower:String,

pumpType:String,

irrigationHours:Number,



/* ========================= */
/* Fertilizers */
/* ========================= */

fertilizers:[String],

otherFertilizer:String,



/* ========================= */
/* Problems */
/* ========================= */

problems:[String],

otherProblem:String,

averageYield:String,



/* ========================= */
/* B3 */
/* ========================= */

b3Quantity:Number,

batchNumber:String,

distributionDate:String,

usageDate:String,

recommendedUsage:String,

photoVerification:Boolean,

videoVerification:Boolean,

fieldVisit:Boolean,



/* ========================= */
/* Soil */
/* ========================= */

soilSampleId:String,

gps:{

    latitude:Number,

    longitude:Number

},

baselineSoilTest:Boolean,

photoTaken:Boolean,



/* ========================= */
/* Agreement */
/* ========================= */

agreementAccepted:Boolean,



/* ========================= */
/* OLD STAGE SYSTEM */
/* ========================= */

progress:{
type:[Boolean],
default:[
false,
false,
false,
false,
false,
false
]
},

stages:{
type:[StageSchema],
default:[]
},



/* ========================= */
/* NEW RECORDS */
/* ========================= */

fertilizerRecords:{
type:[FertilizerRecordSchema],
default:[]
},

waterRecords:{
type:[WaterRecordSchema],
default:[]
},

harvestRecords:{
type:[HarvestRecordSchema],
default:[]
}

},{
timestamps:true
});

module.exports=mongoose.model("Farmer",FarmerSchema);