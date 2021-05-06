import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({name, ...rest}){
    const inputRef = useRef(null)
    const {fieldName, registerField, defaultValue, error} = useField(name)

    
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path:'value'
        })
    }, [fieldName, registerField ])

    return(
        <div>
            <input ref={inputRef} defaultValue={defaultValue} {...rest} />

            {/* se tiver erro: */}
            {error && <span style={{color:'#f00'}}>{error}</span>}
        </div>
    )
}

//defaultValue={defaultValue} vai trazer um valor pre-definido no App.js > const initialData