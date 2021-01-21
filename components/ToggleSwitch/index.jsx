import React from 'react'
import styles from './index.module.css'

export default function ToggleSwitch(props) {
    return (
        <label className={`${styles.switch} ${props.className}`}>
            <input type="checkbox"  {...props} />
                <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}
