import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap'
import styles from '../css/Machinelearning.module.css'
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';


function Machinelearning() {
    const [classifier,setClassifier] = useState()
    const [webcamElement, setWebcamElement] =useState() 
    const [net,setNet]=useState();

    const timer = ms => new Promise(res => setTimeout(res, ms))

    useEffect(() => {
            setWebcamElement(document.getElementById('webcam'))
            setStart()
            
    }, []);

    useEffect(() => {
        if(net!==null && classifier!==null){
            videoStart()
            setupWebcam()
        }
    }, [net])

    const setStart=async()=>{
        setClassifier(knnClassifier.create())
        setNet(await mobilenet.load())
    }

    const setupWebcam=async()=> {
        return new Promise((resolve, reject) => {
          const navigatorAny = navigator;
          navigator.getUserMedia = navigator.getUserMedia ||
              navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
              navigatorAny.msGetUserMedia;
          if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
              stream => {
                webcamElement.addEventListener('loadeddata',  () => resolve(), false);
                webcamElement.srcObject = stream;
              },
              error => reject());
          } else {
            reject();
          }
        });
    }

    const videoStart=async()=>{
        while(true){
            if (classifier.getNumClasses() > 0) {
                const activation = net.infer(webcamElement, 'conv_preds');
                const result = await classifier.predictClass(activation);
                const classes = ["왼쪽", "전진" , "오른쪽"];
                console.log(result.classIndex)
                document.getElementById('answer').innerText = `
                    ${classes[result.classIndex]}\n
                `
                switch(result.classIndex){
                    case 0: toMove('A'); break;
                    case 1: toMove('B'); break;
                    case 2: toMove('C'); break;
                }
            }
            await timer(2000)
        }
    }


    const addExample = (classId) => {
        const activation = net.infer(webcamElement, 'conv_preds');
        classifier.addExample(activation, classId);
    }

    const toMove=(direct)=>{
        fetch(`http://192.168.4.1/${direct}`)
            .then((response) => console.log("response:", response))
            .catch((error) => console.log("error:", error));
    }

    return (
        <div className={styles.container}>
            <video autoPlay playsInline muted className={styles.video} id="webcam" crossOrigin="anonymous"></video>
            <div className={styles.buttonList}>
                <Button type="button" className={styles.button} variant="primary" onClick={()=>addExample(0)}>
                    <div>Class A</div>
                </Button>
                <Button type="button" className={styles.button} variant="primary" onClick={()=>addExample(1)}>
                    <div>Class B</div>
                </Button>
                <Button type="button" className={styles.button} variant="primary" onClick={()=>addExample(2)}>
                    <div>Class C</div>
                </Button>
            </div>
            <div id="answer" className={styles.answer}></div>
        </div>
    );
}

export default Machinelearning;
