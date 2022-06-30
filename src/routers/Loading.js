import React, { useEffect  } from "react";
import loadingPage from '../static/image/loadingPage.png'
import styles from '../css/Loading.module.css'
import { useNavigate } from 'react-router-dom'


function Loading() {
    const history = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{ 
            history('/machinelearning')
        }, 2000)
    },[])

    return (
        <div className={styles.container}>
            {window.innerWidth<window.innerHeight?
                <img className={styles.mainImageWidth} src={loadingPage}/>
                :
                <img className={styles.mainImageHeight} src={loadingPage}/>
            }
        </div>
    );
}

export default Loading;
