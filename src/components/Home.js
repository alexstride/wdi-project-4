import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
//   $( document ).ready(function() {
//
//     scaleVideoContainer();
//
//     initBannerVideoSize('.video-container .poster img');
//     initBannerVideoSize('.video-container .filter');
//     initBannerVideoSize('.video-container video');
//
//     $(window).on('resize', function() {
//         scaleVideoContainer();
//         scaleBannerVideoSize('.video-container .poster img');
//         scaleBannerVideoSize('.video-container .filter');
//         scaleBannerVideoSize('.video-container video');
//     });
//
// });
//
// function scaleVideoContainer() {
//
//     var height = $(window).height() + 5;
//     var unitHeight = parseInt(height) + 'px';
//     $('.homepage-hero-module').css('height',unitHeight);
//
// }
//
// function initBannerVideoSize(element){
//
//     $(element).each(function(){
//         $(this).data('height', $(this).height());
//         $(this).data('width', $(this).width());
//     });
//
//     scaleBannerVideoSize(element);
//
// }

// function scaleBannerVideoSize(element){
//
//     var windowWidth = $(window).width(),
//     windowHeight = $(window).height() + 5,
//     videoWidth,
//     videoHeight;
//
//     $(element).each(function(){
//         var videoAspectRatio = $(this).data('height')/$(this).data('width');
//
//         $(this).width(windowWidth);
//
//         if(windowWidth < 1000){
//             videoHeight = windowHeight;
//             videoWidth = videoHeight / videoAspectRatio;
//             $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
//
//             $(this).width(videoWidth).height(videoHeight);
//         }
//
//         $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
//
//     });
// }

  render() {
    return (
      <div>
        <section className="hero is-fullheight">
          <video src="assets/Workaholic.webm" autoPlay poster="assets/Workaholic.jpg" loop>
            Sorry, your browser doesnt support embedded videos,
            and watch it with your favorite video player!
          </video>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                HomePy
              </h1>
              <h2 className="subtitle">
                Teach Python like a pro
              </h2>
              <div className="home-links">
                <div>
                  <Link to="/pupils/login" className="button is-info">Pupil Login</Link>
                  <Link to="/teachers/login" className="button is-info">Teacher Login</Link>
                </div>
                <Link to="/teachers/register" className="register-link">Create a teacher account</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
