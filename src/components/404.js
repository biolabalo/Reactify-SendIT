import '../css/404.css';
// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

const NotFoundPage = () => (

  <div className="bg-purple">
          <div className="stars">
              <div className="custom-navbar">
                  <div className="brand-logo">
                     <p className='SendIT'>SendIT</p>
                  </div>

              </div>
              <div className="central-body">
                  <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
                    <Link to ='/' className="btn-go-home">   <span> GO BACK HOME </span>  </Link>

              </div>
              <div className="objects">
                  <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                  <div className="earth-moon">
                      <img className ="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                      <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                  </div>
                  <div className="box_astronaut">
        <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                  </div>
              </div>
              <div className="glowing_stars">
                  <div className="star"></div>
                  <div className="star"></div>
                  <div className="star"></div>
                  <div className="star"></div>
                  <div className="star"></div>

              </div>

          </div>

    </div>
);


export default NotFoundPage;
