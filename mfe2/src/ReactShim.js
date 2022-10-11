import React from 'react'
import { useFederatedComponent } from './remoteReactComponents';

export default ({ url, scope, module, ...rest }) => {
    const { Component: FederatedComponent, errorLoading } = useFederatedComponent(url, scope, module);

    return (
        <React.Suspense fallback="Loading module">
          {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent {...rest} />}
        </React.Suspense>
    )
};
