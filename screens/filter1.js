import React from "react"
import {Image, View} from "react-native"

const Filter1 = ({
    face : {
        bounds : {
            size :{width : faceWidth, height : faceHeight}
        },
        LEFT_EYE, RIGHT_EYE
    }
})=>{
    const glass_width = faceWidth
    const glass_height = faceHeight * 0.3
    
    const transformAngle = (
        angleRad = Math.atan((RIGHT_EYE.y - LEFT_EYE.y)/(RIGHT_EYE.x - LEFT_EYE.x))
    )=> (angleRad * 180)/Math.PI

    return(
        <View style = {{position : "absolute", 
        left : LEFT_EYE.x-glass_width* 0.67, 
        top : LEFT_EYE.y-glass_height* 0.5}}>
            <Image source={require("../assets/glasses.png")}
            style = {{width: glass_width, height : glass_height,
            resizeMode : "contain", transform : [{rotate: `${transformAngle()}deg`}]
            }} ></Image>
        </View>
    )
}
export default Filter1