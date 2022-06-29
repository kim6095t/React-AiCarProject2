import React, { useEffect  } from "react";
import loadingPage from '../static/image/loadingPage.png'
import styles from '../css/Loading.module.css'
import { useNavigate } from 'react-router-dom'

export let mobNet

function Loading() {
    const history = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{ 
            history('/machinelearning')
        }, 2000)
    },[])

    return (
        <div className={styles.container}>
            <img className={styles.mainImage} src={loadingPage}/>
        </div>
    );
}

export default Loading;
