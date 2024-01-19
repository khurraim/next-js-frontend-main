import React from "react";
import NewHeader from "./components/NewHeader";
import NewFooter from "./components/NewFooter";

const AboutUs = () => {
    return (
        
        <>
        <NewHeader/>
            <main className="main-wrapper innrerPages-waper bg-white">
            <div className="container-lg inner-product">
                <div className="row px-lg-5">
                <div className="col-lg-7 col-md-9 mx-auto">
                    <div href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="product-card">
                    <div className="img-wraper">
                        <img className="img-fluid" src="images/about.png" />
                        {/* <div class="img-bage"><span>new girl</span></div> */}
                    </div>
                    </div>
                    <div className="my-5">
                    <h1 className="sub-heading mb-4">ABOUT US</h1>
                    <p>At GOOD GIRLS GONE BAD we understand well that a happy girl equals a happy client, so we always go the extra mile to make sure that our London girls are happy and looked after. We are a big family, united in the purpose to be the best at what we are doing and we are doing all of that always with a genuine smile on our face and with an open mind and heart. </p>
                    <p>Our escort agency London team provides a 24 hour service and personally interview and train every single lady that collaborates with us. We regularly visit the incall escort locations to ensure that the ladies apartment is sufficiently luxurious and suites our customers’ needs. We only deal with educated serious girls who are not only stunning women with a great body but they are also kind, friendly and with a big heart.</p>
                    <p>We have different girls coming from all around the world, unique looks and individual approaches to life, there is something for everybody, whether you are looking for a relaxed chilled out experience or for a wild party one of the best escorts in London.</p>
                    <p>What our young ladies all have in common is honesty, discretion and passion for the most sensual things in life.</p>
                    <p>Oh, yeah... and they are all HOT HOT HOT, each of them in her own way, any of these girls is guaranteed to blow your mind! Different kind of shapes and sizes, all wonderfully SEXY and SENSUAL, warm lips, soft skin and appetizing curves, our London escort babes will take you to the Wonderland! There’s who’s NAUGHTY and who’s SWEET, who is cheeky or more well behaved, but you can rest assured that at the end of the time spent with any of our lovely London girls, you will be a satisfied man with a sparkle in his eyes.</p>
                    </div>
                </div>
                </div>
            </div>
            </main>
        <NewFooter />
        </>
    
    );
}

export default AboutUs;