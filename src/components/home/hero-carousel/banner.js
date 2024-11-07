
    



import Image from 'next/image'
const HeroCarousel = ({heroCarousel}) => {


    
      return (
<>
        <div className="relative overflow-hidden bg-red-500 ">
        <div className='w-full  relative '>
            
        <Image
        className="object-cover bg-gray-100 w-full  z-10"
        width={500}
        height={500}
        priority={true}
        
        style={{ objectPosition: 'center center', objectFit: 'cover' }}
        src={heroCarousel[0].image?.sourceUrl}
      
      
       
        altText={heroCarousel[0].name}
        
        />

  </div></div>
       
        </>
      );
    };

export default HeroCarousel







