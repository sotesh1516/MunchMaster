const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/api-dev').then(() => console.log('connected'))

const foodSchema = new mongoose.Schema(
    {
       "breakfast": [
        {
            type: Schema.Types.Mixed,
            required: true
        }
       ],

       "lunch/Dinner": [
         {
            type: Schema.Types.Mixed,
            required: true
         }
       ]
       
 
    },
     
)

const OwensAndHokieGrill = new mongoose.model("OwensAndHokieGrill", foodSchema)

let freshens = [
    {
        label: "Acai Berry Smoothie",
        ServingSize: 21,
        Calories: 443,
        TotalFat: 5.4,
        SaturatedFat: 1.1,
        TransFat: 0,
        Cholestrol: 0,
        Sodium: 32.4


    }
]
