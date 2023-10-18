import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from "react-native"
import {Camera} from "expo-camera"
import * as Permissions from "expo-permissions"
import * as FaceDetector from "expo-face-detector"
import Filter1 from "./filter1"

export default class Main extends React.Component{
    constructor(){
        super()
        this.state = {
            hasCameraPermissions : null,
            faces : [],
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFaceDetected = this.onFaceDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    onCameraPermission = (status)=>{
        this.setState({ hasCameraPermissions : status.status == "granted"})
    }

    onFaceDetected=(faces)=>{this.setState({faces:faces})}

    onFaceDetectionError = (error)=>{console.log(error)}

    componentDidMount(){Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)}

    render(){
        const {hasCameraPermissions} = this.state
        if(hasCameraPermissions == null){
            return <View></View>
        }
        else if(hasCameraPermissions == false){
            return <View>
                <Text>NO ACCESS TO CAMERA (►__◄)</Text>
            </View>
        }
        console.log(this.state.faces)
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.safeareaview} />
                <View style = {styles.headingContainer} >
                    <Text style = {styles.titleText} >FRAPP</Text>
                </View>
                <View style = {styles.camera} >
                    <Camera style = {{flex : 1}}
                    type = {Camera.Constants.Type.front}
                    faceDetectorSettings = {{
                        mode : FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks : FaceDetector.FaceDetectorLandmarks.all,
                        runClassification : FaceDetector.FaceDetectorClassifications.all
                    }}
                    onFacesDetected = {this.onFaceDetected}
                    onFacesDetectionError = {this.onFaceDetectionError}
                    />


                    
                     {this.state.faces.map(face=>{
                            return <Filter1 key = {face.faceID}
                            face = {face}/>
                        }
                    )}
                </View>
                <View style=  {styles.filterContainer} ></View>
                <View style = {styles.actionContainer} ></View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container : 
        {
            flex : 1
        },
        safeareaview : 
        {
            marginTop : Platform.OS == "android"? StatusBar.currentHeight: 0
        },
        headingContainer : 
        {
            flex : 0.1,
            justifyContent : 'center',
            alignItems : 'center'
        },
        titleText : 
        {
            fontSize : 30
        },
        camera : {
            flex : 0.65
        },
        filterContainer : {

        },
        actionContainer:{

        }
    }
)