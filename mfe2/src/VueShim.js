import React, { useRef, useState, useEffect } from 'react'
import { getVueComponentMount } from './remoteVueComponent';

export default ({ url, scope, module }) => {
    const ref = useRef(null);
    const [error, setError] = useState(false);

    useEffect(async () => {
        const { mount, errorLoading } = await getVueComponentMount(url, scope, module) || {};
        setError(errorLoading);
        if (mount) {
            console.log('instantiating');
            mount(ref.current);
        }
    }, []);

    const className=`vue-shim ${scope}-${module}`;

    return (
        <div className={className} ref={ref}>{error ? `` : ''}</div>
    )
}
