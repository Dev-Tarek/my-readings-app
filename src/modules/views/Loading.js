import React from 'react';

const Loading = props => {
  	const { loading } = props;
  	return <div className={`app-loading ${loading? 'loaded' : ''}`} style={loading? {opacity: 1} : {opacity: 0}}>
			<div className="lds-dual-ring"></div>
		</div>
}

export default Loading;