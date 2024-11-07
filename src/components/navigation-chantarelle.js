import Link from 'next/link';

import { useState } from 'react';

import Image from 'next/image'
const Navigation = (props) => {

	
 
	const renderedQuestionsAnswers = props.questionsAnswers.map((item, index) => {
	
		return (
			
			
					<figure  key={item.id} className="effect-oscar ">
						<Image className='w-full h-auto relative ' src={props.profilePic}  />
                    <figcaption className=''>
                        <div>
                            <h2>{item.title	}</h2>
                            <p className='text-sm'>{item.description	}</p>
                        </div>
                        <a href={item.linkarticle	}>vive mo</a>
                    </figcaption>
                    
                    
					
					</figure>
			
			
				
		
		
		);
	  });
	return (
		<nav className="grids  flex flex-wrap ">
		
			
		{renderedQuestionsAnswers}
		
		</nav>
	)
};

export default Navigation;
