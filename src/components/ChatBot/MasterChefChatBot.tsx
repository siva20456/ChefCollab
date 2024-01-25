import React, { useEffect } from 'react'
import Header from '../ChefHome/Header'

const ChatBot = () => {




  return (
    <>
      <Header />
      <div className='container' style={{ marginTop: 150 }}>
        <div className="row col-12 justify-content-center">
          <h4 className="text-success" style={{ fontSize: 30,marginBottom:50  }}>MasterChef ChatBot</h4>
        </div>
        <iframe
          title="Gradio App"
          src="Gradio" //https://sivashankar-chef-0.hf.space
          width="100%"
          height="500px"
          frameBorder="0"
        />
      </div>
    </>

  )
}

export default ChatBot