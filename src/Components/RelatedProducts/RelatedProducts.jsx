import Slider from 'react-slick'
import Relatedproduct from '../RelatedProduct/Relatedproduct';

export default function RelatedProducts({relatedProducts}) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
    };
return (
    <>
        <div className="mt-20">
        <div className="text-center text-4xl mb-10">Another Products</div>
        <Slider {...settings}>
        {relatedProducts.map((product) => (
            <Relatedproduct product={product} key={product._id} />
        ))}
        </Slider>
    </div>
    </>
)
}
