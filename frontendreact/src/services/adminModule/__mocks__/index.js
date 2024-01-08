const getMenuInfo = async () => {

    const data = await Promise.resolve({
        data:[
            {
                "_id": "650ed615725e7f6fd38ba0c4",
                "name": "chicken lollipop",
                "category": "starter",
                "subCategory": "nonveg",
                "status": "unavailable",
                "description": "Chicken lollipop is a popular Indo-Chinese appetizer where a frenched chicken drumette is marinated and then batter fried or baked until crisp",
                "imgPath": "../../../assets/NoPath - Copy (2)@2x.png",
                "price": 250,
                "__v": 0,
                "count": 0
            },
            {
              "_id": "650eda89725e7f6fd38ba0cd",
              "name": "Gobi Manchurian",
              "category": "starter",
              "subCategory": "veg",
              "status": "available",
              "description": "Gobi Manchurian is a popular Indo Chinese appetizer made with cauliflower, corn flour, soya sauce, vinegar, chilli sauce, ginger & garlic.",
              "imgPath": "../../../assets/NoPath - Copy (4)@2x.png",
              "price": 50,
              "__v": 0,
              "count": 0
            }
        ]
})
return { data };
}


export { getMenuInfo};
