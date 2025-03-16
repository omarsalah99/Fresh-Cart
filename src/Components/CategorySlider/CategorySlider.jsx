import Slider from 'react-slick'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CategorySlider() {
    const [categoris, setCategoris] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows:true,
        responsive: [
            {
                breakpoint: 576, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3, 
                    slidesToScroll: 1,
                },
            },            {
                breakpoint: 1640,
                settings: {
                    slidesToShow: 4, 
                    slidesToScroll: 1,
                },
            }
        ]
    };
    async function getCategories() {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategoris(data.data)
    }
    useEffect(()=>{
        getCategories()
    },[])
return (
    <>
        <div className="mb-24 h-96">
            <div className="text-center text-4xl mb-10">Shop Populer Category</div>
            <Slider {...settings}>
                {categoris.map((category) => (<><div><img src={category.image} className='w-full h-full object-cover' alt={category.name} /></div></>))}
            </Slider>
        </div>
    </>
)
}
